import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import OrderHistory from '#models/order_history'
import OrderLineItem from '#models/order_line_item'
import db from '@adonisjs/lucid/services/db'
import CartItem from '#models/cart_item'
import { createGCashPaymentIntent, PaymentIntentResult } from '#services/paymongo_service'

export default class CheckOutsController {
    async show({ inertia, auth, request, response }: HttpContext) {
        const user = auth.user

        if (!user) {
            return inertia.render('/login')
        }

        let { cartItemIds } = request.qs()
        let selectedItemIds: number[] = []

        if (cartItemIds) {
            if (Array.isArray(cartItemIds)) {
                selectedItemIds = cartItemIds.map((id: string | number) => Number(id))
            } else {
                selectedItemIds = [Number(cartItemIds)]
            }
        }

        if (selectedItemIds.length === 0) {
            return inertia.render('cartPage', {
                cartItems: [],
                subtotal: (0).toFixed(2),
                user: {
                    fName: user.firstName
                }
            })
        }

        const cart = await Cart.query()
            .where('studentId', user.studentId)
            .preload('items', (itemQuery) => {
                itemQuery
                    .whereIn('cart_item_id', selectedItemIds)
                    .preload('product')
            })
            .first()

        const cartItems = cart?.items || []

        if (cartItems.length !== selectedItemIds.length) {
            return response.redirect().toRoute('cartPage')
        }

        const merchandiseSubtotal = cartItems.reduce((sum, item) => {
            const price = item.product?.productPrice || 0
            return sum + (price * item.quantity)
        }, 0)

        const shippingFee = 40.00
        const totalAmount = merchandiseSubtotal + shippingFee

        // Prepare data to be sent to the frontend component
        return inertia.render('checkOut', {
            user: {
                fName: user.firstName,
                address: user.address,
                contactNo: user.contactNo,
            },
            cartItems: cartItems.map(item => ({
                id: item.cartItemId,
                productId: item.productId,
                quantity: item.quantity,
                productName: item.product!.productName || 'Unknown Product',
                productPrice: item.product!.productPrice || 0,
                imgUrl: item.product!.imgUrl,
                size: 'NA',
            })),
            merchandiseSubtotal,
            shippingFee,
            totalAmount,
            cartItemIds: selectedItemIds,
        })
    }

    async store({ request, response, auth, inertia }: HttpContext) {
        const user = auth.user!

        const { shippingAddress, paymentMethod } = request.only(['shippingAddress', 'paymentMethod'])

        // console.log('Payment method', paymentMethod, typeof (paymentMethod))

        const rawCartItemIds = request.input('cartItemIds')

        let selectedItemIds: number[] = []

        // console.log(selectedItemIds)
        // console.log(rawCartItemIds)
        // console.log(shippingAddress)
        // console.log(paymentMethod)

        if (Array.isArray(rawCartItemIds)) {
            selectedItemIds = rawCartItemIds.map(Number)
            // return response.badRequest({ message: 'Invalid or missing cart Item IDs.' })
            // console.log(selectedItemIds)
        } else if (typeof rawCartItemIds === 'string') {
            // It's a stringified JSON array (e.g., "[60, 61]"). Parse it.
            try {
                const parsedIds = JSON.parse(rawCartItemIds)
                if (Array.isArray(parsedIds)) {
                    selectedItemIds = parsedIds.map(Number)
                } else if (typeof parsedIds === 'number') {
                    selectedItemIds = [parsedIds]
                }
            } catch (e) {
                const singleId = Number(rawCartItemIds)
                if (!isNaN(singleId)) {
                    selectedItemIds = [singleId]
                }
            }
        } else if (typeof rawCartItemIds === 'number') {
            selectedItemIds = [rawCartItemIds]
        }

        selectedItemIds = selectedItemIds.filter(id => !isNaN(id) && id > 0)

        if (selectedItemIds.length === 0) {
            return response.badRequest({ message: 'No Items selected for checkout' })
        }

        const cart = await Cart.query()
            .where('studentId', user.studentId)
            .preload('items', (itemQuery) => {
                itemQuery
                    .whereIn('cart_item_id', selectedItemIds)
                    .preload('product')
            }).firstOrFail()

        const cartItems = cart?.items.filter(item => item.product) || []

        if (cartItems.length === 0 || cartItems.length !== selectedItemIds.length) {
            return response.badRequest({ message: 'Selected cart items not found or do not belong to user.' })
        }

        const merchandiseSubtotal = cartItems.reduce((sum, item) => {
            const price = item.product!.productPrice || 0
            return sum + (price * item.quantity)
        }, 0)

        const shippingFee = 40.00
        const totalAmount = merchandiseSubtotal + shippingFee

        let order: OrderHistory | null = null

        const externalId = `ORDER_${user.studentId}_${Date.now()}`

        // let paymentIntentResult: PaymentIntentResult | null = null

        await db.transaction(async (trx) => {
            order = await OrderHistory.create({
                studentId: user.studentId,
                totalAmount: totalAmount,
                shippingFee: shippingFee,
                status: (paymentMethod === 'COD' ? 'Pending' : 'Awaiting Payment'),
                paymentMethod: paymentMethod,
                shippingAddress: shippingAddress,
                xenditExternalId: paymentMethod === 'GCash' ? externalId : null,
            }, { client: trx })

            const lineItemsData = cartItems.map(item => {
                const productPrice = item.product!.productPrice || 0
                return {
                    orderHistoryId: order!.orderHistoryId,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: productPrice,
                    productName: item.product!.productName || 'Unknown Product'
                }
            })

            await OrderLineItem.createMany(lineItemsData, { client: trx })

            if (paymentMethod === 'COD') {
                await CartItem.query({ client: trx })
                    .whereIn('cart_item_id', selectedItemIds)
                    .delete()
            }

        })

        if (!order) {
            return response.internalServerError({ message: 'Failed to create order.' })
        }

        if (paymentMethod === 'COD') {
            if (order!.status === 'Pending') {
                await CartItem.query()
                    .whereIn('cart_item_id', selectedItemIds)
                    .delete()
            }

            return response.redirect().toRoute('orderResult', {
                orderId: order!.orderHistoryId,
                paymentType: 'COD'
            })
        } else if (paymentMethod === 'GCash') {
            const fullName = `${user.firstName || ''} ${user.lastName || ''}`

            const userBilling = {
                name: fullName || 'Guest Customer',
                email: user.email,
                phone: user.contactNo || null,
                address: shippingAddress,
            }
            try {
                const paymentIntentResult = await createGCashPaymentIntent(externalId, totalAmount, userBilling)
                // order!.xenditExternalId = paymentIntentResult.paymentIntentId
                // console.log('DEBUG: Payment Intent Result: ', paymentIntentResult)
                order!.status = 'Awaiting Payment'
                await order!.save()

                // console.log(paymentIntentResult.checkoutUrl)
                return inertia.render('checkOut', {checkOutUrl: paymentIntentResult.checkoutUrl})
                // return response.ok({
                //     checkoutUrl: paymentIntentResult.checkoutUrl
                // })

                // if(request.header('X-Inertia')){
                //     // return response.redirect(paymentIntentResult.checkoutUrl)
                // }
            } catch (error) {
                order!.status = 'Payment Failed'
                console.error('PayMongo Payment Intent Failed:', error)
                
                await order!.save()
                return response.redirect().toRoute('paymentFailure', {
                    orderId: order!.orderHistoryId,
                    message: 'Failed to initiate payment with Xendit.'
                })
            }
        }

        return response.badRequest('Invalid payment method selected.')
    }

    async paymentSuccess({ request, inertia, response, auth }: HttpContext) {
        const user = auth.user

        if (!user) {
            return response.redirect().toRoute('login')
        }

        const queryParams = request.qs()
        const externalId = queryParams.order_id

        if (!externalId) {
            return inertia.render('orderResult', {
                success: false,
                message: 'Payment verification failed: Missing transaction ID.',
                details: queryParams
            })
        }
        try {
            const order = await OrderHistory.query()
                .where('xenditExternalId', externalId)
                .firstOrFail()

            // console.log(order)

            if (order.status === 'Awaiting Payment') {
                order.status = 'Processing'
                await order.save()

                const cart = await Cart.findBy('studentId', order.studentId)
                if (cart) {
                    const lineItems = await OrderLineItem.query()
                        .where('orderHistoryId', order.orderHistoryId)

                    const lineItemProductIds = lineItems.map(item => item.productId)

                    // Delete the cart items that correspond to the ordered products
                    await CartItem.query()
                        .where('cartId', cart.cartId)
                        .whereIn('productId', lineItemProductIds)
                        .delete()
                }
            }

            // const lineItems = await OrderLineItem.query()
            //     .where('orderHistoryId', order.orderHistoryId)
            // const productIds = lineItems.map(item => item.productId)


            return inertia.render('orderResult', {
                success: true,
                message: 'Payment was successful! Your order has been placed and is being processed.',
                details: queryParams
            }, {
                user: user ? {
                    id: user.studentId,
                    fName: user.firstName,
                } : null
            })
        } catch (error) {
            console.error('Payment Success Handler Error:', error)
            return inertia.render('orderResult', {
                success: false,
                message: 'Payment was successful, but the order could not be finalized. Please contact support with the transaction details.',
                details: queryParams
            }, {
                user: user ? {
                    id: user.studentId,
                    fName: user.firstName,
                } : null
            })
        }
    }

    async paymentFailure({ request, inertia, auth }: HttpContext) {
        const user = auth.user

        if (!user) {
            return inertia.render('login')
        }

        const queryParams = request.qs()
        // const externalId = queryParams.external_id

        // if (externalId) {
        //     try {

        //         const order = await OrderHistory.query()
        //             .where('xenditExternalId', externalId)
        //             .first()

        //         console.log(order)
        //         if (order) {
        //             order.status = 'Cancelled'
        //             await order.save()
        //         }

        //     } catch (error) {
        //         console.warn('Could not locate or update failed order:', externalId)
        //     }
        // }

        return inertia.render('orderResult', {
            success: false,
            message: 'Payment failed or was cancelled. Please check your details and try again.',
            details: queryParams
        }, {
            user: user ? {
                id: user.studentId,
                fName: user.firstName,
            } : null
        })
    }

    async renderResult({ inertia, request, response, auth }: HttpContext) {
        const user = auth.user

        if (!user) {
            return inertia.render('login')
        }

        const queryParams = request.qs()
        const orderId = queryParams.orderId
        const paymentType = queryParams.paymentType

        if (!orderId || paymentType !== 'COD') {
            return response.redirect().toRoute('cartPage')
        }

        try {
            const order = await OrderHistory.query()
                .where('orderHistoryId', orderId)
                .preload('items')
                .firstOrFail()

            if (!order) {
                return inertia.render('orderResult', {
                    success: false,
                    message: 'Order not found.',
                    details: queryParams
                })
            }
            return inertia.render('orderResult', {
                success: true,
                message: 'Your Cash on Delivery (COD) order has been successfully placed and is pending confirmation.',
                orderId: order.serialize(),
                paymentType: paymentType,
            }, {
                user: user ? {
                    id: user.studentId,
                    fName: user.firstName,
                } : null
            })
        } catch (error) {
            console.error('Render Result Error:', error)
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.notFound('Order not found.')
            }
            return inertia.render('orderResult', {
                success: false,
                message: 'An unexpected error occurred while finalizing your order.',
                details: queryParams
            }, {
                user: user ? {
                    id: user.studentId,
                    fName: user.firstName,
                } : null
            })
        }
    }
}