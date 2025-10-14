import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import Category from '#models/category'

export default class ResultsController {
    async show({ auth, inertia, params }: HttpContext) {
        const user = auth.user

        const categoryId = params.id

        let category = null

        if (categoryId) {
            category = await Category.query()
                .where('categoryId', categoryId)
                .preload('products') 
                .first()    
        }

        console.log(category)

        const categoryData =  category ? {
            id: category.categoryId,
            name: category.categoryName,
            products: category.products.map(product => product.serialize()),
            
        } : null

        console.log(categoryData)

        return inertia.render('resultPage', {
            user: user ? {
                id: user.studentId,
                fName: user.firstName,
            } : null,
            category: categoryData
        })
    }



}