import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Otp from '#models/otp'
import { otpValidator } from '#validators/auth'
import { DateTime } from 'luxon'

export default class OtpsController {
    async show({ inertia, session, response}: HttpContext){
        const studentNo = session.flashMessages.get('otp_student_no')

        if(!studentNo){
            return response.redirect().toPath('/login')
        }

        return inertia.render('verifyOtp', { studentNo: studentNo as string })
    }

    async verify({ request, response, auth, inertia, session }: HttpContext){
        const { studentNo, otpCode } = await request.validateUsing(otpValidator)
        
        const user = await User.findBy('student_no', studentNo)

        if(!user){
            return inertia.render('verifyOtp',  { studentNo, message: 'Invalid verification attempt or code' })
        }

        const otpRecord = await Otp.query()
        .where('student_id', user.studentId)
        .where('otp_code', otpCode)
        .where('expired_at', '>', DateTime.now().toSQL()!)
        .orderBy('created_at', 'desc')
        .first()

        if(!otpRecord){
            return inertia.render('verifyOtp', { studentNo, message: 'Invalid or expired OTP code.'})
        }

        await auth.use('web').login(user)

        await otpRecord.delete()

        return response.redirect().toPath('/')
    }
}