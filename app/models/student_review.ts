import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Group from './group.js'

export default class StudentReview extends BaseModel {
  @column({ isPrimary: true })
  declare reviewId: number

  @column()
  declare studentId: number
  
  @column()
  declare groupId: number
  
  @column()
  declare rate: number

  @column()
  declare reviews: string
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'studentId',
  })
  declare student: BelongsTo<typeof User>

  @belongsTo(() => Group, {
    foreignKey: 'groupId',
  })
  declare product: BelongsTo<typeof Group>
}