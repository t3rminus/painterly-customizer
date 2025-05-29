'use client';
import { AddOutline } from '@raresail/react-ionicons';
import { ImageBase64 } from '../shared/image-base64';
import { Input } from '../shared/input';
import { Select, SelectCreatable } from '../shared/select';
import { Button } from '../shared/button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getOptionShape, saveOption } from './actions';

export function TextureForm({ texture, authors, categories, groups }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ defaultValues: texture });
  const [shape, setShape] = useState(null);
  const submitHandler = async (data) => {
    try {
      const id = await saveOption(data);
      setValue('id', id);
    } catch(err) {}
  };

  const category = watch('category');
  const groupOpts =
    (!!category?.value &&
      groups
        .filter((g) => g.category === category.value)
        .map((g) => ({ value: g.id, label: g.name }))) ||
    [];

  const group = watch('group');
  useEffect(() => {
    (async () => {
      if (group) {
        const shape = await getOptionShape(group);
        if (shape) {
          setShape(shape.filter(s => s.placeholder));
        } else {
          setShape(false);
        }
      }
    })();
  }, [group]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="card card-border bg-base-100 not-dark:shadow-sm dark:outline dark:outline-input"
    >
      <input readOnly type="hidden" {...register('id')} />
      <div className="card-body flex-row items-start">
        <div className="w-32">
          <ImageBase64
            label="Preview"
            placeholder=""
            accept="image/png"
            {...register('preview')}
          />
        </div>
        <div className="ml-2 grid grid-cols-2 gap-4 w-full">
          <Input
            label="Option Name"
            placeholder="I want ..."
            inputClassName="w-full h-12"
            {...register('name', {
              required: 'Please enter a name'
            })}
            error={errors.name}
          />
          <SelectCreatable
            label="Authors"
            isMulti
            options={authors.map((a) => ({ label: a, value: a }))}
            inputClassName="w-full"
            placeholder="Type or select..."
            error={errors.authors}
            {...register('authors', {
              required: 'Please type or select one or more authors'
            })}
          />
          <Select
            label="Category"
            inputClassName="w-full h-12"
            options={categories.map((c) => {
              if (c.children?.length) {
                return {
                  label: c.name,
                  options: c.children.map((cc) => ({
                    label: cc.name,
                    value: cc.id
                  }))
                };
              } else {
                return { label: c.name, value: c.id };
              }
            })}
            {...register('category', {
              required: 'Please select a category'
            })}
          />
          <SelectCreatable
            label="Group"
            inputClassName="w-full h-12"
            disabled={!category}
            options={groupOpts}
            {...register('group', {
              required: 'Please select an option group'
            })}
          />
          {shape !== null && (
            <div className="col-span-2">
              <h4 className="label">Texture Files</h4>
              <div className="border-1 border-input p-4 rounded-sm flex flex-col gap-4">
                {shape === false && (
                  <div className="flex gap-4">
                    <Button className="btn btn-sm btn-primary">
                      <AddOutline className="w-4 h-4" strokeWidth={64} /> Add
                      Simple Texture
                    </Button>
                    <Button className="btn btn-sm btn-primary" disabled>
                      <AddOutline className="w-4 h-4" strokeWidth={64} /> Add
                      Texture Variable
                    </Button>
                    <Button className="btn btn-sm btn-primary" disabled>
                      <AddOutline className="w-4 h-4" strokeWidth={64} /> Add
                      Composed Texture
                    </Button>
                  </div>
                )}
                {!!shape?.length &&
                  shape
                    .filter((t) => !!t.placeholder)
                    .map((tex, idx) => (
                      <div key={idx}>
                        <div className="flex gap-4 items-center">
                          <input
                            type="hidden"
                            readOnly
                            value={tex.path}
                            {...register(`texture[${idx}][path]`)}
                          />
                          <ImageBase64
                            {...register(`texture[${idx}][source]`, {
                              required: 'Please select a texture file'
                            })}
                            error={!!errors?.texture?.[idx]}
                            icon={null}
                            className="w-10 h-10"
                            containerClassName="w-auto"
                            placeholder={
                              <img
                                src={tex.placeholder}
                                alt="Texture Placeholder"
                                className="grayscale opacity-40 [image-rendering:pixelated]"
                              />
                            }
                          />
                          <span>
                            {tex.path?.[0] === '_'
                              ? `Texture Variable: ${tex.path.replace(
                                  /^_/,
                                  ''
                                )}`
                              : tex.path}
                          </span>
                        </div>
                        {!!errors?.texture?.[idx]?.message && (
                          <div className="label pb-0 mt-1">
                            <span className="label-text-alt text-error">
                              {errors?.texture?.[idx]?.message}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                {shape && !shape?.length && (
                  <div>Only generated/complex textures</div>
                )}
              </div>
            </div>
          )}
          {shape !== null && <Button type="submit">Save</Button>}
        </div>
      </div>
    </form>
  );
}
