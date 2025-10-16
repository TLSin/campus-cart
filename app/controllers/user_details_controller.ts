import type { HttpContext } from '@adonisjs/core/http'
import Program from '#models/program'
import Campus from '#models/campus'
import User from '#models/user'
import { updateUserValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'

export default class UserDetailsController {

    async show({ inertia, auth}: HttpContext){
        const user  = auth.user
        const program = await Program.find(user?.programId)
        const campus = await Campus.find(user?.campusId)

        console.log(
            user?.studentId,
            user?.firstName,
            user?.lastName,
            user?.email,
            program?.program,
            campus?.campus,
            user?.studentNo,
            user?.address,
            user?.contactNo,
            user?.password
        )

        return inertia.render('userPage', {
            user: user ? {
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
            } 
            : 
            null
        })
    }

    async store({ request, response, auth}: HttpContext){
        let { firstName, lastName, emailValue, confirmPassword, newPassword, currentPassword, addressValue, contactNumber, } = await request.validateUsing(updateUserValidator)

        const user = await User.find(auth.user?.studentId)
        console.log(user)
        if(!user){
            return response.abort('User not found')
        }
        
        const passwordToVerify = currentPassword || confirmPassword
        const isCurrentPasswordValid = await hash.use('scrypt').verify(user.password, passwordToVerify)

        if(!isCurrentPasswordValid){
            return response.status(403).send({ message: 'Incorrect Current Password'})
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
        })

        console.log(user)

        if(newPassword && newPassword.length > 0){
            user.password = await hash.use('scrypt').make(newPassword)
        }

        await user.save()
        console.log(user)
        return response.status(200).send({ message: 'User Updated'})
    }
}