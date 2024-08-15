import { NextResponse } from 'next/server';
import { parseFormData } from 'parse-nested-form-data';
import archiver from 'archiver';
import { getTexturesForOptions } from '@/lib/db/texture';
import sharp from 'sharp';

const blankImage = (size) => {
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0.0 }
    }
  });
};

export async function POST(req) {
  const formData = parseFormData(await req.formData());
  console.log(formData);
  const archive = archiver('zip');

  const options = Object.values(formData.options);
  const textures = await getTexturesForOptions(options);
  const reference = {};
  textures.filter(t => !t.compose).forEach(texture => {
    reference[texture.path] = texture;
    if (texture.path.indexOf('_') !== 0) {
      archive.append(texture.source, { name: texture.path });
    }
  });

  const composeTextures = textures
    .filter((t) => t.compose);
  for (const texture of composeTextures) {
    if (texture.path.indexOf('_') !== 0) {
      if (Array.isArray(texture.compose)) {
        let result = texture.source ? sharp(texture.source) : blankImage(16);
        const steps = texture.compose
          .map((step) => {
            if (typeof step === 'string' && reference[step]) {
              return { input: reference[step].source };
            } else if (typeof step === 'string') {
              return { input: atob(step) };
            }
            return null;
          })
          .filter((s) => s);
        result = result.composite(steps);
        archive.append(await result.toFormat('png').toBuffer(), {
          name: texture.path
        });
      }
    }
  }

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