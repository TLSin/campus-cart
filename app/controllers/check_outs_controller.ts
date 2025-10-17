import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import OrderHistory from '#models/order_history'
import OrderLineItem from '#models/order_line_item'
import db from '@adonisjs/lucid/services/db'
import CartItem from '#models/cart_item'
import { createGCashCharge } from '#services/xendit_services'

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

    async store({ request, response, auth }: HttpContext) {
        const user = auth.user!

        const { shippingAddress, paymentMethod } = request.only(['cartItemIds', 'shippingAddress', 'paymentMethod'])

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
        // const selectedItemIds: number[] = cartItemIds.map(Number)

        if (selectedItemIds.length === 0) {
            return response.badRequest({ message: 'No Items selected for checkout' })
        }

        const cart = await Cart.query()
            .where('studentId', user.studentId)
            .preload('items', (itemQuery) => {
                itemQuery
                    .whereIn('cart_item_id', selectedItemIds)
                    .preload('product')
            }).first()

        console.log(cart)

        const cartItems = cart?.items.filter(item => item.product) || []

        console.log(cartItems)
        // const cartItems = await CartItem.query()
        //     .whereIn('cart_item_id', selectedItemIds)
        //     .andWhereHas('cart', (cartQuery) => {
        //         cartQuery.where('student_id', user.studentId)
        //     })
        //     .preload('product')
        //     .exec()

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

        await db.transaction(async (trx) => {
            order = await OrderHistory.create({

                studentId: user.studentId,
                totalAmount: totalAmount,
                shippingFee: shippingFee,
                status: (paymentMethod === 'COD' ? 'Pending' : 'Awaiting Payment'),
                paymentMethod: paymentMethod,
                shippingAddress: shippingAddress,
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

        if (paymentMethod === 'COD') {
            await CartItem.query()
                .whereIn('cart_item_id', selectedItemIds)
                .delete()

            return response.redirect().toRoute('orderResult', {
                orderId: order!.orderHistoryId,
                paymentType: 'COD'
            })
        } else if (paymentMethod === 'GCash') {
            const externalId = `ORDER${order!.orderHistoryId}-${Date.now()}`

            try {
                const chargeResult = await createGCashCharge(externalId, totalAmount)
                order!.xenditTransactionId = externalId
                await order!.save()

                return response.redirect(chargeResult.checkoutUrl)
            } catch (error) {
                order!.status = 'Payment Failed'
                await order!.save()
                return response.redirect().toRoute('paymentFailure', {
                    orderId: order!.orderHistoryId,
                    message: 'Failed to initiate payment with Xendit.'
                })
            }
        }

        return response.badRequest('Invalid payment method selected.')
        // return response.redirect().toRoute('resultPage', { success: true })
    }

    async paymentSuccess({ request, inertia, response }: HttpContext) {
        const queryParams = request.qs()
        const externalId = queryParams.external_id || queryParams.orderId

        if (!externalId) {
            return inertia.render('ResultPage', {
                success: false,
                message: 'Payment verification failed: Missing transaction ID.',
                details: queryParams
            })
        }
        try {
            const order = await OrderHistory.query()
                .where('xenditExternalId', externalId)
                .orWhere('orderHistoryId', externalId)
                .firstOrFail()

            order.status = 'Processing'
            await order.save()

            const lineItems = await OrderLineItem.query().where('orderHistoryId', order.orderHistoryId)
            const productIds = lineItems.map(item => item.productId)

            const cart = await Cart.findBy('studentId', order.studentId)
            if (cart) {
                await CartItem.query()
                    .where('cartId', cart.cartId)
                    .whereIn('productId', productIds)
                    .delete()
            }

            return inertia.render('ResultPage', {
                success: true,
                message: 'Payment was successful! Your order has been placed and is being processed.',
                details: queryParams
            })
        } catch (error) {
            console.error('Payment Success Handler Error:', error)
            return inertia.render('ResultPage', {
                success: false,
                message: 'Payment was successful, but the order could not be finalized. Please contact support with the transaction details.',
                details: queryParams
            })
        }
    }

    async paymentFailure({ request, inertia }: HttpContext) {
        const queryParams = request.qs()
        const externalId = queryParams.external_id || queryParams.orderId

        if (externalId) {
            try {
                // Find the order and update its status
                const order = await OrderHistory.query()
                    .where('xenditExternalId', externalId)
                    .first()

                if (order) {
                    order.status = 'Cancelled'
                    await order.save()
                }

            } catch (error) {
                console.warn('Could not locate or update failed order:', externalId)
            }
        }

        return inertia.render('ResultPage', {
            success: false,
            message: 'Payment failed or was cancelled. Please check your details and try again.',
            details: queryParams
        })
    }

    async renderResult({ inertia, request, response }: HttpContext) {
        const queryParams = request.qs()
        const orderId = queryParams.orderId
        const paymentType = queryParams.paymentType

        if (!orderId || paymentType !== 'COD') {
            return response.redirect().toRoute('cartPage')
        }

        try {
            const order = await OrderHistory.find(orderId)

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
                orderId: order.orderHistoryId,
                paymentType: paymentType,
            })
        } catch (error) {
            console.error('Render Result Error:', error)
            return inertia.render('orderResult', {
                success: false,
                message: 'An unexpected error occurred while finalizing your order.',
                details: queryParams
            })
        }
    }
}