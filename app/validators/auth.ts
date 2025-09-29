import dbConfig from '#config/database'
import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
    vine.object({
        firstName: vine.string(),
        lastName: vine.string(),
        email: vine.string().normalizeEmail().unique(async(db, value, _field) => {
            const result = await db.from('users').select('id').where('email', value)
            return result.length ? false : true
        }),
        password: vine.string().minLength(8),
        stNum: vine.string().maxLength(11).unique(async(db, value, _field) => {
            const result = await db.from('users').select('id').where('student_no', value)
            return result.length ? false : true
        }),
        campus: vine.string(),
        program: vine.string(),
    })
)