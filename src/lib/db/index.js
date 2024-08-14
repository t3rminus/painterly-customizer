import pg from 'pg';
import { Kysely, PostgresDialect, sql } from 'kysely';
const { Pool } = pg;

export const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.POSTGRES_URL })
  })
});

// SEE: https://kysely.dev/docs/recipes/relations
// These are just jsonArrayFrom and jsonArrayFrom but with names that make more contextual sense
export function manyRelation(expr) {
  return sql`(select coalesce(json_agg(agg), '[]') from ${expr} as agg)`;
}

export function oneRelation(expr) {
  return sql`(select to_json(obj) from ${expr} as obj)`;
}