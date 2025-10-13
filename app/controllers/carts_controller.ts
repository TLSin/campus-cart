import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import ProductImage from '#models/product_image'

export default class CartsController {
    async store({ inertia, auth, request }: HttpContext) {
        const user = auth.user
        const { productId } = request.only(['productId'])

        const cart = await Cart.firstOrCreate({ studentId: user?.studentId })

        const existingItem = await CartItem.query()
        .where('cart_id', cart.cartId)
        .andWhere('product_id', productId)
        .first()

        if(existingItem) {
            existingItem.quantity++
            await existingItem.save()
        }
        else {
            await CartItem.create({
                cartId: cart.cartId,
                productId: productId,
                quantity: 1,
            })
        }
        if(!user) {
            return inertia.render('errors/unauthorized')
        }
        return inertia.render('cartPage', { user })
    }

    async index({ auth, inertia }: HttpContext) {
        const user = auth.user!

        const cart = await Cart.query().where('student_id', user.studentId).first()

        let cartItems: any[] = []
        let subtotal = 0

        if (cart) {
            const items = await CartItem.query()
                .where('cart_id', cart.cartId)
                .preload('product')
                .exec()
            
            cartItems = items.map(item => {
                const product = item.product
                const productPrice = product.productPrice
                const itemTotal = productPrice * item.quantity
                subtotal += itemTotal

                return {
                    cartItemId: item.cartItemId,
                    productId: product.productId,
                    productName: product.productName,
                    productPrice: product.productPrice,
                    quantity: item.quantity,
                    // imgUrl:product.images.length > 0 ? product.images[0].imgUrl,
                    itemTotal: itemTotal.toFixed(2)
                }
            })
        }
        return inertia.render('cartPage', { 
            cartItems: cartItems,
            subtotal: subtotal.toFixed(2),
            user: { fName: user.firstName },
        })
    }

    async update({ params, request, response}:HttpContext){
        const { cartItemId } = params
        const { quantity } = request.only(['quantity'])

        const item = await CartItem.findOrFail(cartItemId)

        if (quantity && quantity > 0){
            item.quantity = quantity
            await item.save()
        }
        return response.redirect().back()
    }

    async destroy({ params, response }: HttpContext) {
        const { cartItemId } = params

        const item = await CartItem.findOrFail(cartItemId)
        await item.delete()

        return response.redirect().back()
    }
}