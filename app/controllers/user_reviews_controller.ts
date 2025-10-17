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
        await StudentReview.create({
            studentId: user.studentId,
            groupId,
            reviews,
        })
        return response.status(201).send({ message: 'Review successfully submitted' })
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