import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { loginValidator } from '#validators/auth'
import User from '#models/user'

export default class UserLoginsController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ request, response, auth }: HttpContext) {
    let { studentNo, password } = await request.validateUsing(loginValidator)

    const user = await User.findBy('student_no', studentNo)
    if(!user){
      return response.abort('User not found')
    }

    const pass = await hash.use('scrypt').verify(user.password, password)
    if(!pass){
      return response.abort('Incorrect Password')
    }

    await auth.use('web').login(user)

    console.log(studentNo)
    console.log(password)
    console.log(user)

    return response.redirect().toPath('/')
  }
}