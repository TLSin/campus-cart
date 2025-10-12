import StudentReview from '#models/student_review'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserReviewsController {
    async store({ request, response, auth }: HttpContext) {
        const user = auth.user
        if (!user){
            return response.unauthorized('Login required')
        }

        const { productId, rate, reviews } = request.only(['productId', 'rate', 'reviews'])
        await StudentReview.create({
            studentId: user.studentId,
            productId,
            rate,
            reviews,
        })

    }
}