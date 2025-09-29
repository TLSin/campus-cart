import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Campus from '#models/campus'
import Program from '#models/program'
import { signUpValidator } from '#validators/auth'

export default class UsersController {
    async store( {response, request }: HttpContext) {    
        const user = await request.validateUsing(signUpValidator)

        user.firstName = user.firstName.toUpperCase().trim()
        user.lastName = user.lastName.toUpperCase().trim()
        return response.redirect().toRoute('/')
    }
}