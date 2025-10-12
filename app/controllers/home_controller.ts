import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  
  async index({ inertia, auth }: HttpContext) {
    await auth.use('web').check()
    
    return inertia.render('/')
  }
  
}