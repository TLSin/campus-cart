import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import ProductImage from '#models/product_image'

export default class ProductsController {
    async index({ inertia, auth }: HttpContext){
        const user = auth.user

        const products = await Product.all()

        const productIds = products.map(p => p.productId)
        const images = await ProductImage.query().whereIn('product_id', productIds)

        const productsWithImages = products.map(product => {
            const image = images.find(img => img.productId === product.productId)
            return {
                ...product.$attributes,
                imgUrl: image ? image.imgUrl : null,
            }
        })

        const dailyProducts = productsWithImages.slice(0, 6)  
        const topProducts = productsWithImages.slice(6, 12)
        const feature = productsWithImages.slice(12, 16) 

        console.log(productsWithImages)
        return inertia.render('home', { dailyProducts, topProducts, feature,
            user: user ? {
                id:user.studentId,
                fName: user.firstName,
            }
            : null
         })
    }

    async show({ params, inertia, auth }: HttpContext) {
        const user = auth.user
        const product = await Product.find(params.id)
        if(!product){
            return inertia.render('errors/notFound')
        }

        const image = await ProductImage.query().where('product_id', product.productId).first()
        return inertia.render('home', {
            product: {
                ...product.$attributes,
                imageUrl: image ? image.imgUrl : null,
            },
            user: user ? {
                id:user.studentId,
                fName: user.firstName,
            }
            : null
        })
    }
}