import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import Category from '#models/category'

export default class ResultsController {
    async show({auth, inertia, params}:HttpContext) {
        const user = auth.user
        const category = await Category.query()
            .where('categoryId', params.id)
            .preload('products') // <-- use 'products'
            .first()

        return inertia.render('resultPage', {
            user: user ? {
                id: user.studentId,
                fName: user.firstName,
            } : null,
            category: category ? {
                id: category.categoryId,
                name: category.categoryName,
                products: category.products, // <-- use 'products'
            } : null
        })
    }

    

}