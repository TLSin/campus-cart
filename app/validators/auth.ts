import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
    vine.object({
        firstName: vine.string(),
        lastName: vine.string(),
        email: vine.string().normalizeEmail().unique(async(db, value, _field) => {
            const result = await db.from('users').select('student_id').where('email', value)
            return result.length ? false : true
        }),
        password: vine.string().minLength(8),
        stNum: vine.string().maxLength(11).unique(async(db, value, _field) => {
            const result = await db.from('users').select('student_id').where('student_no', value)
            return result.length ? false : true
        }),
        campus: vine.string(),
        program: vine.string(),
    })
)

export const loginValidator = vine.compile(
    vine.object({
        studentNo: vine.string().maxLength(11).toUpperCase().trim(),
        password: vine.string(),
    })
)