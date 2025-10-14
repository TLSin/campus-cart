import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Group from './group.js'

export default class Description extends BaseModel {
  @column({ isPrimary: true })
  declare descriptionId: number

  @column()
  declare groupId: number
  
  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Group, {
    foreignKey: 'groupId',
  })
  declare group: HasMany<typeof Group>
}