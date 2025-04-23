'use client';
import { AddOutline } from '@raresail/react-ionicons';
import { ImageBase64 } from '../shared/image-base64';
import { Input } from '../shared/input';
import { Select, SelectCreatable } from '../shared/select';
import { Button } from '../shared/button';

export function TextureForm({ authors, categories, groups }) {
  
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body flex-row items-start">
        <div className="w-32">
          <ImageBase64 label="Preview" placeholder="" accept="image/png" />
        </div>
        <div className="ml-2 grid grid-cols-2 gap-4 w-full">
          <Input
            label="Option Name"
            placeholder="I want ..."
            inputClassName="w-full h-12"
          />
          <SelectCreatable
            label="Authors"
            isMulti
            options={authors.map((a) => ({ label: a, value: a }))}
            inputClassName="w-full"
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
          />
          <Select label="Group" inputClassName="w-full h-12" disabled />
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
        </div>
      </div>
    </div>
  );
}
