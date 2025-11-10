'use client';
import { AddOutline, ChevronForwardOutline } from '@raresail/react-ionicons';
import { ImageBase64 } from '../shared/image-base64';
import { Input } from '../shared/input';
import { Select, SelectCreatable } from '../shared/select';
import { Button } from '../shared/button';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { getOptionShape, saveOption } from './actions';

export function TextureForm({ option, authors, categories, groups }) {
  // console.log(option);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: option?.id,
      description: option?.description,
      authors: option?.authors?.map?.((a) => ({ value: a, label: a })),
      category: option?.category,
      group: option?.group,
      preview: option?.preview
    }
  });
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
          if (option?.textures) {
            shape.forEach((shape, idx) => {
              const existingTexture = option.textures.find(t => t.path === shape.path);
              if (existingTexture) {
                console.log(existingTexture.source);
                setValue(`texture.${idx}.source`, existingTexture.source);
              }
            });
          }
          setShape(shape.map(s => ({ ...s, isCustom: false })));
        } else {
          setShape(false);
        }
      }
    })();
  }, [group, option?.textures, setValue]);

  const addSimple = useCallback(() => {
    setShape([...shape, {}]);
  }, [shape]);

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
            previewClassName="[image-rendering:pixelated]"
            {...register('preview')}
          />
        </div>
        <div className="ml-2 grid grid-cols-2 gap-4 w-full">
          <Input
            label="Option Description"
            placeholder="I want ..."
            inputClassName="w-full h-12"
            {...register('description', {
              required: 'Please enter a description'
            })}
            error={errors.name}
            instruction="Typically something like &ldquo;I want red roses as my red flowers.&rdquo; or &ldquo;Make my Ender crystal particle effects into runes.&rdquo;"
            instructionClassName="text-xs whitespace-normal"
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
            instruction="Please include anyone who contributed to the texture."
            instructionClassName="text-xs whitespace-normal"
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
            instruction="The name of the texture, such as  &ldquo;Cobblestone&rdquo; or &ldquo;Jungle Logs&rdquo;. May end up changing multiple actual texture files."
            instructionClassName="text-xs whitespace-normal"
          />
          {shape !== null && (
            <div className="col-span-2">
              <h4 className="label">Texture Files</h4>
              <div className="border-1 border-input p-4 rounded-sm flex flex-col gap-4">
                {!!shape?.length &&
                  shape
                    .map((tex, idx) => {
                      return (
                        <div key={idx}>
                          <div className="flex gap-4 items-center">
                            <ImageBase64
                              {...register(`texture.${idx}.source`, {
                                required: 'Please select a texture file'
                              })}
                              error={!!errors?.texture?.[idx]}
                              icon={null}
                              className="w-10 h-10"
                              containerClassName="w-auto"
                              placeholder={
                                !!tex.placeholder && (
                                  <img
                                    src={tex.placeholder}
                                    alt="Texture Placeholder"
                                    className="grayscale opacity-40 [image-rendering:pixelated]"
                                  />
                                )
                              }
                            />
                            <ChevronForwardOutline />
                            {tex.isCustom === false && (
                              <>
                                <span>
                                  {tex.path?.[0] === '_'
                                    ? `Texture Variable: ${tex.path.replace(
                                        /^_/,
                                        ''
                                      )}`
                                    : tex.path}
                                </span>
                                <input
                                  type="hidden"
                                  readOnly
                                  value={tex.path}
                                  {...register(`texture.${idx}.path`)}
                                />
                              </>
                            )}
                            {tex.isCustom !== false && (
                              <Input {...register(`texture.${idx}.path`)} label="Pack File Path" />
                            )}
                          </div>
                          {!!errors?.texture?.[idx]?.message && (
                            <div className="label pb-0 mt-1">
                              <span className="label-text-alt text-error">
                                {errors?.texture?.[idx]?.message}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                {!shape?.length && (
                  <div>
                    There are currently no texture files for this group.
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-4">
                <Button className="btn btn-sm btn-primary" onClick={addSimple}>
                  <AddOutline className="w-4 h-4" strokeWidth={64} />
                  Add Simple Texture
                </Button>
                <Button className="btn btn-sm btn-primary" disabled>
                  <AddOutline className="w-4 h-4" strokeWidth={64} />
                  Add Texture Variable
                </Button>
                <Button className="btn btn-sm btn-primary" disabled>
                  <AddOutline className="w-4 h-4" strokeWidth={64} />
                  Add Composed Texture
                </Button>
              </div>
            </div>
          )}
          {shape !== null && <Button type="submit">Save</Button>}
        </div>
      </div>
    </form>
  );
}