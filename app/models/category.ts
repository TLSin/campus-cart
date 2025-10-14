// import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Product from './product.js'



export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare categoryId: number
  
  @column()
  declare categoryName: string

  @hasMany(() => Product, {
    foreignKey: 'categoryId',
  })
  declare products: HasMany<typeof Product>
}