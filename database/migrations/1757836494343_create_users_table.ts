import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('student_id').notNullable()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('email', 100).notNullable().unique()
      table.string('student_no').notNullable()
      table.string('password').notNullable()
      table.integer('campus_id').unsigned().references('campus_id').inTable('campuses').onDelete('CASCADE')
      table.integer('program_id').unsigned().references('program_id').inTable('programs').onDelete('CASCADE')
      table.boolean('status').defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}