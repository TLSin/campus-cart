import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Campus from '#models/campus'
import Program from '#models/program'
import { signUpValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
    
    async show({ inertia }: HttpContext) {
        return inertia.render('signUp')
    }

    async store( {response, request, inertia }: HttpContext) {    
        const payload = await request.validateUsing(signUpValidator)

        payload.firstName = payload.firstName.toUpperCase().trim()
        payload.lastName = payload.lastName.toUpperCase().trim()
        payload.email = payload.email.toLowerCase().trim()
        payload.stNum = payload.stNum.toUpperCase().trim()
        
        const campusRecord = await Campus.query().where('campus', payload.campus).first()
        if(!campusRecord){
            return inertia.render('signUp', { campusRecord, message: 'Invalid Campus' })
        }

        const programRecord = await Program.firstOrCreate(
            { program: payload.program },
            { program: payload.program},
        )
        if(!programRecord){
            return inertia.render('signUp', { programRecord, message: 'Invalid Program' })
        }

        const hashPassword = await hash.use('scrypt').make(payload.password)
        if(!hashPassword){
            return inertia.render('signUp', { message: 'Invalid password' })
        }

        console.log(payload)

        await User.create({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: hashPassword,
            studentNo: payload.stNum,
            campusId: campusRecord.campusId,
            programId: programRecord.programId,
        })

        return response.redirect('/login')
    }

}