import { db } from '.';

export const getOptions = () => {
  return db.selectFrom('option').selectAll().execute();
};
