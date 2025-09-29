// import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare categoryId: number

  @column()
  declare productId: number
  
  @column()
  declare categoryName: string

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  declare category: BelongsTo<typeof Product>
}