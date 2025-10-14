import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import Description from './description.js'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  declare groupId: number

  @column()
  declare groupName: string

  @column()
  declare productId: number

  @column()
  declare text: string

  @column()
  declare descriptionId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // @hasMany(() => Group, {
  //   foreignKey: 'groupId',
  // })
  // declare group: HasMany<typeof Group>

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => Description, {
    foreignKey: 'descriptionId',
  })
  declare description: BelongsTo<typeof Description>
}