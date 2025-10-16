import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import Product from '#models/product'
import OrderHistory from '#models/order_history'
import OrderLineItem from '#models/order_line_item'


export default class CheckOutsController {
    async show({ inertia, auth }: HttpContext) {
        const user = auth.user

        if (!user) {
            // Should be handled by middleware, but a safeguard is useful
            return inertia.render('/login')
        }

        // 1. Fetch the user's cart with items and their products preloaded
        const cart = await Cart.query()
            .where('studentId', user.studentId)
            .preload('items', (itemQuery) => {
                itemQuery.preload('product')
            })
            .first()

        const cartItems = cart?.items || []

        // Calculate totals (Merchandise Subtotal)
        const merchandiseSubtotal = cartItems.reduce((sum, item) => {
            // Safely calculate subtotal, assuming price is available on the product
            const price = item.product?.productPrice || 0
            return sum + (price * item.quantity)
        }, 0)

        const shippingFee = 40.00 // Example fixed shipping fee
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
                quantity: item.quantity,
                productName: item.product?.productName || 'Unknown Product',
                productPrice: item.product?.productPrice || 0,
                imgUrl: item.product?.imgUrl,
                size: 'NA',
            })),
            merchandiseSubtotal,
            shippingFee,
            totalAmount,
        })
    }

    async store({ request, response, auth }: HttpContext) {
        const user = auth.user!

        
    }
}