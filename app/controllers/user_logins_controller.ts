import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { loginValidator } from '#validators/auth'
import User from '#models/user'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import { sendEmail } from '#services/mailjet_service'
import Otp from '#models/otp'

export default class UserLoginsController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ request, response, inertia, session }: HttpContext) {
    let { studentNo, password } = await request.validateUsing(loginValidator)

    const studentNoError = 'Incorrect Student Number'
    const passwordError = 'Incorrect Password'

    const user = await User.findBy('student_no', studentNo)
    if (!user) {
      console.log(studentNoError)
      return inertia.render('login', { studentNo, message: studentNoError })

    }

    const pass = await hash.use('scrypt').verify(user.password, password)
    if (!pass) {
      console.log(passwordError)
      return inertia.render('login', { password, message: passwordError })
    }

    // OTP implementation logic
    const otpCode = crypto.randomInt(100000, 999999).toString()
    const expiredAt = DateTime.now().plus({ minutes: 5 })

    await Otp.query().where('student_id', user.studentId).delete()

    await Otp.create({
      studentId: user.studentId,
      otpCode: otpCode,
      expiredAt: expiredAt,
    })

    // Using mailjet to send an otp
    try {
      await sendEmail({
        toEmail: user.email,
        toName: user.firstName || undefined,
        fromEmail: 'bioljohn0213@gmail.com',
        fromName: 'Dormio',
        subject: 'Your One-Time Password',
        htmlPart:
          `
          <h1>Your OTP Code</h1>
          <p>Hi ${user.firstName || 'User'},</p>
          <p>Your one-time password (OTP) for login is: <strong>${otpCode}</strong>.
          It is valid for 5 minutes. Please enter it on the verification page to continue.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
        `,
      })
    } catch(error) {
      console.error('MailJet OTP Email Error', error)
      return inertia.render('login', { message: 'Login successful, but failed to send OTP email. Please try again.' })
    }

    await session.flash('otp_student_no', user.studentNo)

    // console.log(studentNo)
    // console.log(password)
    // console.log(otpCode)
    // console.log(user)


    return response.redirect().toPath('/verifyOtp')
  }
}