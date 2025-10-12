// import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'


export default class Campus extends BaseModel {
  @column({ isPrimary: true })
  declare campusId: number

  @column()
  declare campus: string

  @hasMany(() => User, {
    foreignKey: 'campusId',
  })
  declare user: HasMany<typeof User>
}