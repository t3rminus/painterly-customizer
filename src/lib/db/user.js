import { db } from '.';

export const getUserById = async (id) => {
  return db
    .selectFrom('user')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirstOrThrow();
};

export const getUserByEmail = async (email) => {
  return db
    .selectFrom('user')
    .selectAll()
    .where('user', '=', email)
    .executeTakeFirstOrThrow();
};

export const updateLastLogin = async (id) => {
  return db
    .updateTable('user')
    .set({
      lastLogin: new Date()
    })
    .where('id', '=', id)
    .execute();
}

export const listUsers = async ({ limit = 10, offset = 0, sort }) => {
  // TODO: Querying / Projection
  let dataQuery = db
    .selectFrom('user')
    .select(['id', 'user', 'name', 'role', 'lastLogin'])
    .offset(offset)
    .limit(limit);

  const totalQuery = db.selectFrom('admin').select(({ fn }) => fn.countAll());

  if (offset) {
    dataQuery = dataQuery.offset(offset);
  }
  if (limit) {
    dataQuery = dataQuery.limit(limit);
  }

  if (sort && Object.keys(sort).length) {
    Object.keys(sort).forEach((key) => {
      dataQuery = dataQuery.orderBy(
        key,
        !!sort[key] && (sort[key].toLowerCase() === 'desc' ? 'desc' : 'asc')
      );
    });
  }

  /*
  TODO: Searching
  const likeSearch = `%${search}%`;

  if (searchFields && searchFields.length) {
    dataQuery = dataQuery.where((eb) =>
      eb.or(searchFields.map((field) => eb(field, 'ilike', likeSearch)))
    );
    countQuery = countQuery.where((eb) =>
      eb.or(searchFields.map((field) => eb(field, 'ilike', likeSearch)))
    );
  }
  */

  const [data, { count: total = 0 } = {}] = await Promise.all([
    dataQuery.execute(),
    totalQuery.executeTakeFirst()
  ]);

  return { data, total };
};

export const updateUser = async (id, data) => {
  return db
    .updateTable('user')
    .set(data)
    .where('id', '=', id)
    .executeTakeFirst();
}

export const createUser = async (data) => {
  return db
    .insertInto('user')
    .values(data)
    .executeTakeFirst();
};