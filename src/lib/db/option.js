import { sql } from 'kysely';
import { db } from '.';

export const getOptions = () => {
  return db
    .selectFrom('option')
    .selectAll()
    .where('status', '=', 'active')
    .orderBy('order')
    .execute();
};

export const getAuthors = async () => {
  const results = await db
    .selectFrom('option')
    .select(sql`jsonb_array_elements_text(authors)`.as('author'))
    .where('authors', 'is not', null)
    .distinct()
    .orderBy('author')
    .execute();

  return results.map(r => r.author);
};

export const getOptionsByUser = async (user) => {
  return db
    .selectFrom('option')
    .selectAll()
    .where('user', '=', user)
    .orderBy('optionGroup')
    .orderBy('order')
    .execute();
}