import type { HttpContext } from '@adonisjs/core/http'
import Program from '#models/program'
import Campus from '#models/campus'
import User from '#models/user'
import { updateUserValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import OrderHistory from '#models/order_history'
import OrderLineItem from '#models/order_line_item'

export default class UserDetailsController {

    async show({ inertia, auth }: HttpContext) {
        const user = auth.user
        if (!user) {
            if (!user) {
                return inertia.render('login')
            }
        }
        const program = await Program.find(user?.programId)
        const campus = await Campus.find(user?.campusId)

        const orderHistories = await OrderHistory
            .query()
            .where('studentId', user.studentId)
            .preload('items', (query) => {
                query.preload('product')
            })
            .orderBy('createdAt', 'desc')
            .exec()

        const ordersData = orderHistories.map(order => ({
            orderHistoryId: order.orderHistoryId,
            totalAmount: parseFloat(order.totalAmount),
            shippingFee: parseFloat(order.shippingFee),
            status: order.status,
            paymentMethod: order.paymentMethod,
            shippingAddress: order.shippingAddress,
            createdAt: order.createdAt.toFormat('MMM dd, yyyy'),
            items: order.items.map(item => ({
                id: item.orderLineId,
                productName: item.productName,
                price: parseFloat(item.price),
                quantity: item.quantity,
                imgurl: item.product?.imgUrl || null,
            }))
        }))

        // console.log(
        //     // user?.studentId,
        //     // user?.firstName,
        //     // user?.lastName,
        //     // user?.email,
        //     // program?.program,
        //     // campus?.campus,
        //     // user?.studentNo,
        //     // user?.address,
        //     // user?.contactNo,
        //     // user?.password,
        //     ordersData,
            
        // )

        return inertia.render('userPage', {
            user: {
                id: user?.studentId,
                fName: user?.firstName,
                lName: user?.lastName,
                email: user?.email,
                password: user?.password,
                program: program?.program,
                campus: campus?.campus,
                studentNo: user?.studentNo,
                address: user?.address,
                contactNo: user?.contactNo,
            },
            orderHistories: ordersData,
        })
    }
    
    async store({ request, response, auth, inertia }: HttpContext) {
        try{
            let { firstName, lastName, emailValue, confirmPassword, newPassword, currentPassword, addressValue, contactNumber, } = await request.validateUsing(updateUserValidator)
        
            const user = await User.find(auth.user?.studentId)
            // console.log(user)
            if (!user) {
                return response.abort('User not found')
            }
        
            const passwordToVerify = currentPassword || confirmPassword
            const isCurrentPasswordValid = await hash.use('scrypt').verify(user.password, passwordToVerify)
        
            if (!isCurrentPasswordValid) {
                const currentPassError = 'Incorrect Current Password.'
                return inertia.render('/userPage', {
                    error: true, 
                    message: currentPassError,
                    type: 'password',
                })
            }
        
            if(newPassword !== confirmPassword ){
                const passwordError = 'Confirm Password does not match the newPassword'
                // console.log(passwordError)
                return inertia.render('/userPage', {
                    error: true,                
                    message: passwordError,
                    type: 'password'
                })
            }
        
            firstName = firstName.toUpperCase().trim()
            lastName = lastName.toUpperCase().trim()
            emailValue = emailValue.toLowerCase().trim()
            newPassword = newPassword?.trim()
            addressValue = addressValue?.toUpperCase().trim()
            contactNumber = contactNumber?.trim()
        
        
            user.merge({
                firstName: firstName,
                lastName: lastName,
                email: emailValue,
                address: addressValue,
                contactNo: contactNumber,
                updatedAt: DateTime.now()
            })
        
            // console.log(user)
        
            if (newPassword && newPassword.length > 0) {
                user.password = await hash.use('scrypt').make(newPassword)
            }
        
            await user.save()
            // console.log(user)

            return inertia.render('/userPage', { 
                message: 'User details updated successfully.',
                user:{
                    fName: user.firstName,
                    lName: user.lastName,
                    email: user.email,
                    address: user.address,
                    contactNo: user.contactNo
                }
            })

        } catch (error) {
            return inertia.render('/userPage', {
                error: true,
                message: 'An error occured while updating user details.'
            })
        }
    }
}