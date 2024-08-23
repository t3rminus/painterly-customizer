const { sql } = require('kysely');

module.exports = {
  async up(db) {
    await db.schema
      .alterTable('option-group')
      .addColumn('order', 'integer', (col) =>
        col.defaultTo(0).notNull()
      )
      .execute();
    await db.schema
      .alterTable('option')
      .addColumn('order', 'integer', (col) => col.defaultTo(0).notNull())
      .addColumn('status', sql`status`, (col) => col.defaultTo('pending').notNull())
      .execute();
    await db.schema
      .alterTable('category')
      .addColumn('order', 'integer', (col) => col.defaultTo(0).notNull())
      .execute();
  },
  async down(db) {
    await db.schema.alterTable('option-group').dropColumn('order').execute();
    await db.schema.alterTable('category').dropColumn('order').execute();
    await db.schema
      .alterTable('option')
      .dropColumn('order')
      .dropColumn('status')
      .execute();
  }
};