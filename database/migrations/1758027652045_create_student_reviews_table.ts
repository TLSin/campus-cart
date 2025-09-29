import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'student_reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('review_id')
      table.integer('student_id').unsigned().references('student_id').inTable('users').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('product_id').inTable('products').onDelete('CASCADE')
      table.integer('rate').notNullable().defaultTo(0)
      table.text('reviews').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}