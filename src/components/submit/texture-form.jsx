import { Input } from '../shared/input';
import { Textarea } from '../shared/textarea';

export function TextureForm() {
  return (
    <div className="pb-2 flex border rounded-md">
      <div className="w-16 h-16"></div>
      <div className="ml-2">
        <Input label="Option Name" placeholder="I want ..." />
        <Textarea
          inputClassName="input-sm"
          label="Authors (one per line)"
          placeholder="Rhodox..."
        />
      </div>
    </div>
  );
}
