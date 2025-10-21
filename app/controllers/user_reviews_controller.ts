import StudentReview from '#models/student_review'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Group from '#models/group'

export default class UserReviewsController {
    async store({ request, response, auth }: HttpContext) {
        const user = auth.user
        if (!user) {
            return response.unauthorized('Login required')
        }

        const { groupId, reviews } = request.only(['groupId', 'reviews'])
        if (!groupId || !reviews || typeof reviews !== 'string' || reviews.trim().length === 0) {
            return response.badRequest({ message: 'Missing or invalid groupId or review content.' })
        }
        
        try {
            await StudentReview.create({
                studentId: user.studentId,
                groupId,
                reviews,
                // 'rate' column is intentionally omitted here as requested by you.
                // Make sure the 'rate' column in your StudentReview model is now nullable or has a default value.
            })
            
            return response.redirect().back()
        } catch (error) {
            // FIX 2: Add robust error handling
            console.error('Error submitting review:', error)
            return response.redirect().back()
        }
    }

    async show({ inertia, params }: HttpContext) {
        const groupId = params.groupId
        const studentReviews = await StudentReview.query()
            .where('groupId', groupId)
            .preload('student', (query) => {
                query.select(['firstName', 'lastName', 'studentId'])
            })
            .orderBy('createdAt', 'desc')
            .exec()

        const reviewsData = studentReviews.map(review => ({
            id: review.reviewId,
            studentName: `${review.student.firstName} ${review.student.lastName}`,
            rate: review.rate,
            comment: review.reviews,
            createdAt: review.createdAt.toFormat('LLL dd yyyy'),
        }))

        console.log(reviewsData)

        return inertia.render('products/:id', {
            groupId: groupId,
            reviews: reviewsData,
        })
    }
}