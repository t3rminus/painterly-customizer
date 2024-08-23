const { sql } = require('kysely');

module.exports = {
  async up(db) {
    await db.schema
      .alterTable('user')
      .addColumn('email', 'text', (col) => col.unique())
      .execute();

    await db
      .updateTable('user')
      .set((eb) => ({
        email: eb.ref('user')
      }))
      .execute();

    await db.schema
      .alterTable('user')
      .dropColumn('user')
      .alterColumn('email', (col) => col.setNotNull())
      .execute();
  },
  async down(db) {
    await db.schema
      .alterTable('user')
      .addColumn('user', 'text', (col) => col.unique())
      .execute();

    await db
      .update('user')
      .set((eb) => ({
        user: eb.ref('email')
      }))
      .execute();

    await db.schema
      .alterTable('user')
      .dropColumn('email')
      .alterColumn('user', (col) => col.unique().setNotNull())
      .execute();
  }
};