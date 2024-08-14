const fs = require('node:fs/promises');
const path = require('node:path');
const { Pool } = require('pg');
const {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider
} = require('kysely');

async function migrateToLatest() {
  const db = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString: process.env.POSTGRES_URL })
    })
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, 'migrations')
    })
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`Migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`Failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('Failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
