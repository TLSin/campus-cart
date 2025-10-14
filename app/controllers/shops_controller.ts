import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ShopsController {
    async show({inertia, auth, params}: HttpContext){
        const user = auth.user

        const clickedProducts = await Product.query()
        .where('productId', params.productId)
        .preload('group')
        .preload('category')
        .first()

        if(!clickedProducts){
            return inertia.render('errors/notFound')
        }

        const mainProducts = await Product.query()
        .where('groupId', clickedProducts.groupId)
        .andWhere('main', true)
        .first()

        const groupName = clickedProducts.group.groupName

        const productData = {
            ...clickedProducts.$attributes,
            productName: groupName,
            imgUrl: mainProducts ? mainProducts.imgUrl : clickedProducts.imgUrl,
        }

        const subImages = await Product.query()
        .where('groupId', clickedProducts.groupId)
        .andWhereNot('productId', clickedProducts.productId)
        .select('imgUrl')

        let finalSubImages = subImages.map((img) => img.imgUrl)

        if(mainProducts && mainProducts.productId !== clickedProducts.productId && !finalSubImages.includes(mainProducts.imgUrl)){
            finalSubImages = [clickedProducts.imgUrl, ...finalSubImages].filter((img) => img !== null)
        } else if (!mainProducts && clickedProducts.imgUrl){
            finalSubImages = finalSubImages.filter(img => img !== clickedProducts.imgUrl).filter((img): img is string => img !== null)
        } else {
            finalSubImages = finalSubImages.filter((img): img is string => img !== null)
        }

        console.log(productData)
        console.log(subImages)

        return inertia.render('products', {
            product: {
                ...productData,
                subImages: finalSubImages,
            },
            user: 
                user ? {
                id: user?.studentNo,
                fName: user?.firstName,
            }
            : null,
        })
    }
}