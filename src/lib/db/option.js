import { db } from '.';

export const getOptions = () => {
  return db.selectFrom('option')
    .selectAll()
    .where('status', '=', 'active')
    .orderBy('order')
    .execute();
};
