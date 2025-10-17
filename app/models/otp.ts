import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Otp extends BaseModel {
  @column({ isPrimary: true })
  declare otpId: number

  @column()
  declare studentId: number

  @column()
  declare otpCode: string

  @column()
  declare expiredAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey : 'studentId'
  })
  declare user: BelongsTo<typeof User>
  
}