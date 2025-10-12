import type { HttpContext } from '@adonisjs/core/http'

export default class ShopsController {
    async index({inertia, auth}: HttpContext){
        const user = auth.user

        return inertia.render('shopPage', {
            user: {
                id: user?.studentNo,
                fName: user?.firstName,
            }
        })
    }
}