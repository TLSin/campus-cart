import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
    async index({ inertia, auth }: HttpContext) {
        const user = auth.user

        // Fetch all products from the database
        const products = await Product.query().preload('group').preload('category')

        // Group the products based on what its group_id
        const groupProducts = Object.values(
            products.reduce((acc, product) => {
                if(!acc[product.groupId]) {
                    acc[product.groupId] = product
                }
                return acc
            }, {} as Record<number, Product>)
        )

        // Seprate products for different sections
        const dailyProducts = groupProducts
        const feature = groupProducts.slice(0, 8)
        const topProducts = groupProducts.slice(6, 12)

        // console.log(products)

        return inertia.render('home', {
            dailyProducts,
            topProducts, 
            feature,
            user: user ? {
                id: user.studentId,
                fName: user.firstName,
            }
                : null
        })
    }

    async show({ params, inertia, auth }: HttpContext) {
        const user = auth.user
        
        const product = await Product.query()
        .where('productId', params.id)
        .preload('group')
        .preload('category')
        .first()


        if (!product) {
            return inertia.render('errors/notFound')
        }

        return inertia.render('home', {
            product: {
                ...product.$attributes,        
            },
            user: user ? {
                id: user.studentId,
                fName: user.firstName,
            }
                : null
        })
    }
}