import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import StudentReview from '#models/student_review'

export default class ShopsController {
    async show({ inertia, auth, params }: HttpContext) {
        const user = auth.user

        const clickedProducts = await Product.query()
            .where('productId', params.productId)
            .preload('group')
            .preload('category')
            .first()

        if (!clickedProducts) {
            return inertia.render('errors/notFound')
        }

        const mainProducts = await Product.query()
            .where('groupId', clickedProducts.groupId)
            .andWhere('main', true)
            .first()

        const groupName = clickedProducts.group.groupName
        const descriptions = clickedProducts.group.text

        const allVariants = await Product.query()
            .where('groupId', clickedProducts.groupId)
            .select('productId', 'productName', 'productPrice', 'imgUrl')
            .orderBy('productId', 'asc')

        const studentReview = await StudentReview.query()
            .where('groupId', clickedProducts.groupId)
            .preload('student')
            .orderBy('createdAt', 'asc')
            .limit(10)

        console.log(descriptions)

        const productData = {
            ...clickedProducts.$attributes,
            productName: groupName,
            imgUrl: mainProducts ? mainProducts.imgUrl : clickedProducts.imgUrl,
            description: descriptions,
            descriptionId: clickedProducts.group.descriptionId,
        }

        const subImages = await Product.query()
            .where('groupId', clickedProducts.groupId)
            .andWhereNot('productId', clickedProducts.productId)
            .select('imgUrl')

        let finalSubImages = subImages.map((img) => img.imgUrl)

        if (mainProducts && mainProducts.productId !== clickedProducts.productId && !finalSubImages.includes(mainProducts.imgUrl)) {
            finalSubImages = [clickedProducts.imgUrl, ...finalSubImages].filter((img) => img !== null)
        } else if (!mainProducts && clickedProducts.imgUrl) {
            finalSubImages = finalSubImages.filter(img => img !== clickedProducts.imgUrl).filter((img): img is string => img !== null)
        } else {
            finalSubImages = finalSubImages.filter((img): img is string => img !== null)
        }

        const reviewForFrontend = studentReview.map(review => ({
            reviewId: review.reviewId,            
            reviews: review.reviews,
            createdAt: review.createdAt.toISODate(),
            studentName: review.student ? `${review.student.firstName} ${review.student.lastName}`.trim() : 'Anonymous Student',
            studentNo: review.student.studentNo,
        }))

        // console.log(productData)
        // console.log(subImages)

        return inertia.render('products', {
            product: {
                ...productData,
                subImages: finalSubImages,
            },
            productVariants: allVariants.map(v => v.$attributes),
            studentReviews: reviewForFrontend,
            user:
                user ? {
                    id: user?.studentNo,
                    fName: user?.firstName,
                }
                    : null,
        })
    }
}