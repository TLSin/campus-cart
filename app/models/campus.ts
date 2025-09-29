// import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'


export default class Campus extends BaseModel {
  @column({ isPrimary: true })
  declare campusId: number

  @column()
  declare campus: string

  @hasOne(() => User, {
    foreignKey: 'campusId',
  })
  declare user: HasOne<typeof User>
}