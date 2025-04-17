import { ImageBase64 } from '../shared/image-base64';
import { Input } from '../shared/input';
import { Select } from '../shared/select';
import { Textarea } from '../shared/textarea';

export function TextureForm() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body flex-row items-start">
        <div className="w-32">
          <ImageBase64 label="Preview" placeholder="" accept="image/png" />
        </div>
        <div className="ml-2 flex flex-col gap-4">
          <Input label="Option Name" placeholder="I want ..." />
          <Textarea
            label="Authors (one per line)"
            placeholder="Rhodox..."
          />
          <Select
            label="Test Select Option"
            options={[
              { label: 'One', value: 1 },
              { label: 'Option Two', value: 2 },
              { label: 'Option Three', value: 3 },
              { label: 'Quatre', value: 4 }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
