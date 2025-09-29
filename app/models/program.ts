// import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
export default class Program extends BaseModel {
  @column({ isPrimary: true })
  declare programId: number

  @column()
  declare program: string

  @hasOne(() => User, {
    foreignKey: 'programId',
  })
  declare programDetail: HasOne<typeof User>
}