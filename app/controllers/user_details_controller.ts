import type { HttpContext } from '@adonisjs/core/http'
import Program from '#models/program'
import Campus from '#models/campus'

export default class UserDetailsController {

    async show({ inertia, auth}: HttpContext){
        const user  = auth.user
        const program = await Program.find(user?.programId)
        const campus = await Campus.find(user?.campusId)


        return inertia.render('userPage', {
            user: {
                id: user?.studentId,
                fName: user?.firstName,
                lName: user?.lastName,
                email: user?.email,
                program: program?.program,
            }
        })
    }

    async edit({ inertia, auth}: HttpContext){

    }
}