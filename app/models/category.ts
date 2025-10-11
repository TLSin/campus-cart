// import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare categoryId: number
  
  @column()
  declare categoryName: string

  @hasMany(() => Category, {
    foreignKey: 'categoryId',
  })
  declare category: HasMany<typeof Category>
}