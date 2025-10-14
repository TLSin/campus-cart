import type { HttpContext } from '@adonisjs/core/http'

export default class CheckOutsController {
    async show({ inertia, auth }: HttpContext) {
        const user = auth.user

        return inertia.render('checkOut', {
            user: {
                id: user?.studentNo,
                fName: user?.firstName,
            }
        })
    }
}