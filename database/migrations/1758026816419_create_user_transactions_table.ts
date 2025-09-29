import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('transaction_id')
      table.integer('student_id').unsigned().references('student_id').inTable('users').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('product_id').inTable('products').onDelete('CASCADE')
      table.timestamp('created_at')
      table.integer('quantity').notNullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}