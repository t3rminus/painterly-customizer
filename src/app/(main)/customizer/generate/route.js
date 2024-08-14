import { NextResponse } from 'next/server';
import { parseFormData } from 'parse-nested-form-data';
import archiver from 'archiver';
import { getTexturesForOptions } from '@/lib/db/texture';

export async function POST(req) {
  const formData = parseFormData(await req.formData());
  console.log(formData);
  const archive = archiver('zip');

  const options = Object.values(formData.options);
  const textures = await getTexturesForOptions(options);
  textures.forEach(texture => {
    if (!texture.compose) {
      archive.append(texture.source, { name: texture.path })
    }
  });

  const mcmeta = {
    pack: {
      pack_format: 20,
      description: 'WIP Cusomizer Generated',
      supported_formats: {
        min_inclusive: 16,
        max_inclusive: 34
      }
    }
  };

  archive.append(JSON.stringify(mcmeta, null, 2), { name: 'pack.mcmeta' });
  archive.finalize();

  return new NextResponse(archive, {
    headers: {
      'Content-type': 'application/zip',
      'Content-disposition': 'attachment; filename="out.zip"'
    }
  });
}