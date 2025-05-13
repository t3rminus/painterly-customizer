module.exports = {
  async up(db) {
    await db.schema
      .alterTable('texture')
      .alterColumn('compose', (col) => col.setDataType('jsonb'))
      .execute();
  },
  async down(db) {
    await db.schema
      .alterTable('texture')
      .alterColumn('compose', (col) => col.setDataType('json'))
      .execute();
  }
};