import type { HttpContext } from '@adonisjs/core/http'

export default class SearchesController {
    async search({ request, inertia }: HttpContext) {
        const query = request.input('q', '').trim()
        return inertia.render('searchResults', { query })
    }
}