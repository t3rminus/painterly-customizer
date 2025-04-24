'use client';
import { AddOutline } from '@raresail/react-ionicons';
import { ImageBase64 } from '../shared/image-base64';
import { Input } from '../shared/input';
import { Select, SelectCreatable } from '../shared/select';
import { Button } from '../shared/button';
import { useForm } from 'react-hook-form';

export function TextureForm({ authors, categories, groups }) {
  const { register, handleSubmit, watch } = useForm();
  const submitHandler = (data) => {
    console.log(data);
  };
  const category = watch('category');
  const groupOpts = (!!category?.value &&
    groups.filter(g => g.category === category.value)
    .map((g) => ({ value: g.id, label: g.name }))) || [];
  console.log(groupOpts);
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="card card-border bg-base-100 shadow-sm"
    >
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
            {...register('name')}
          />
          <SelectCreatable
            label="Authors"
            isMulti
            options={authors.map((a) => ({ label: a, value: a }))}
            inputClassName="w-full"
            {...register('authors')}
          />
          <Select
            label="Category"
            inputClassName="w-full h-12"
            options={categories.map((c) => ({
              label: c.name,
              options: c.children.map((cc) => ({
                label: cc.name,
                value: cc.id
              }))
            }))}
            {...register('category')}
          />
          <Select
            label="Group"
            inputClassName="w-full h-12"
            disabled={!category}
            options={groupOpts}
            {...register('group')}
          />
          <div className="col-span-2">
            <h4 className="label">Texture Files</h4>
            <div className="border-1 border-input p-4 rounded-sm flex flex-col gap-4">
              <div className="flex gap-4">
                <Button className="btn btn-sm btn-primary">
                  <AddOutline className="w-4 h-4" strokeWidth={64} /> Add Simple
                  Texture
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
            </div>
          </div>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
