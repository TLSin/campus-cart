// import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
export default class Program extends BaseModel {
  @column({ isPrimary: true })
  declare programId: number

  @column()
  declare program: string

  @hasMany(() => User, {
    foreignKey: 'programId',
  })
  declare programDetail: HasMany<typeof User>
}