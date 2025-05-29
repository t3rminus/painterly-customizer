'use server';
import { getOptionsByUser as dbGetOptionsByUser } from '@/lib/db/option';

export const getOptionsByUser = async (userId) => {
  const options = await dbGetOptionsByUser(userId);
  return options.map((o) => ({
    id: o.id,
    description: o.description,
    authors: o.authors,
    tags: o.tags,
    status: o.status,
    preview: `data:image/png;base64,${Buffer.from(o.preview).toString('base64')}`
  }));
}