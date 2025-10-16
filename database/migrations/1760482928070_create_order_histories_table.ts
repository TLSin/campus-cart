import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_history_id')
      table.integer('student_id').unsigned().references('student_id').inTable('users').onDelete('CASCADE')
      table.decimal('total_amount', 10, 2)
      table.decimal('shipping_fee', 10, 2)
      table.string('status').defaultTo('Pending')
      table.string('payment_method')
      table.string('shipping_address')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}