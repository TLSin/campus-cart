import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Campus from './campus.js'
import Program from './program.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare studentId: number

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column()
  declare studentNo: string
  
  @column()
  declare campusId: number
  
  @column()
  declare programId: number
  
  @column()
  declare status: boolean
  
  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
  
  @belongsTo(() => Campus, {
    foreignKey: 'campusId',
  })
  declare campus: BelongsTo<typeof Campus>

  @belongsTo(() => Program, {
    foreignKey: 'programId',
  })
  declare program: BelongsTo<typeof Program>

  @hasMany(() => User, {
    foreignKey: 'studentId',
  })
  declare users: HasMany<typeof User>
}