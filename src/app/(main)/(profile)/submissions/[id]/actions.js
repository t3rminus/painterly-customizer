'use server';
import { getOption as dbGetOption } from '@/lib/db/option';

const b64Img = (src) => (src instanceof Buffer) && `data:image/png;base64,${src.toString('base64')}`;

export const getOption = async (id, userId) => {
  const option = await dbGetOption(id, userId);
  if (option) {
    return {
      id: option.id,
      description: option.description,
      authors: option.authors,
      category: !!option.category && {
        value: option.category.id,
        label: option.category.name
      },
      group: !!option.group && {
        value: option.group.id,
        label: option.group.name
      },
      textures: option.textures?.map((t) => ({
        ...t,
        source: b64Img(
          Buffer.from(t.source.replace(/^\\x/, ''), 'hex')
        )
      })),
      preview: b64Img(option.preview)
    };
  }
}