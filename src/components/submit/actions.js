'use server';
import { getUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { getOptionShape as dbGetOptionShape } from '@/lib/db/texture';

const base64ToBuffer = (str) => {
  if (!str) {
    return null;
  }
  return Buffer.from(str?.replace(/^data:image\/png;base64,/, ''), 'base64');
}

export async function getOptionShape(group) {
  if (/^[0-9]+/.test(group.value)) {
    const textures = await dbGetOptionShape(group.value);
    if (textures && textures.length) {
      return textures.map((t) => ({
        path: t.path,
        compose: t.compose,
        placeholder: t.source ? `data:image/png;base64,${Buffer.from(t.source).toString('base64')}` : null,
        version: t.version
      }));
    }
  }
  return false;
}

export async function saveOption(data) {
  const user = await getUser();
  let result = null;
  await db.transaction().execute(async (txn) => {
    if (data.id) {
      // Nothing yet
    } else {
      const option = await txn.insertInto('option').values({
        description: data.name,
        authors: JSON.stringify(data.authors.map(a => a.value)),
        optionGroup: data.group.value,
        user: user.id,
        status: 'pending',
        preview: base64ToBuffer(data.preview) || base64ToBuffer(data.texture?.[0]?.source)
      })
        .returningAll()
        .executeTakeFirst();

      for (const texture of data.texture) {
        await txn
          .insertInto('texture')
          .values({
            option: option.id,
            path: texture.path,
            source: base64ToBuffer(texture.source)
          })
          .execute();
      }
      result = option.id;
    }
  });
  return result;
}