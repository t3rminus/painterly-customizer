'use client';
import { FileButton } from '@/components/shared/file-button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import JSZip from 'jszip';
import { TextureForm } from '@/components/submit/texture-form';

const groupingExclude = [
  'black',
  'blue',
  'brown',
  'cyan',
  'gray',
  'green',
  'lime',
  'magenta',
  'orange',
  'pink', 'purple', 'red', 'white', 'yellow', 'light', 'back', 'side', 'top', 'overlay', 'front', 'open', 'bottom', 'on', 'off', 'powered',
  'stage0', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7',
  'lit', 'pane', 'stem', 'lucy','wild','layer'
]

export function SubmitForm() {
  const { handleSubmit, register } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const submitFn = (data) => console.log(data);

  const handleUploaded = (file) => {
    setIsLoading(true);
    if (file.type === 'image/png') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImages((images) => [...images, { data: reader.result }]);
        setIsLoading(false);
      };
      reader.onerror = (err) => {
        alert('An error ocurred opening your file.');
        console.error(err);
        setIsLoading(false);
      };
    } else if (file.type === 'application/zip') {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const zip = new JSZip();
        await zip.loadAsync(reader.result);
        const newImages = [];
        for (const file of Object.values(zip.files)) {
          if (!file.dir && /\.png$/.test(file.name)) {
            const data = await zip.file(file.name).async('uint8array');
            const fileReader = new FileReader();
            fileReader.onload = () => {
              let name = file.name;

              let [, groupingName] = /\/([^/]+)\.png$/.exec(name);
              const pathParts = name.replace(/\.png$/, '').split('/');
              let grouping;
              do {
                const part = pathParts.pop();
                if (part) {
                  grouping = part
                    .split('_')
                    .filter(
                      (part) =>
                        !groupingExclude.includes(part) &&
                        !/^[0-9]+$/.test(part) &&
                        part.length > 0
                    )
                    .join('_');
                } else {
                  break;
                }
              } while (!grouping);
              const versionParts = /^([0-9]+)[-_]([0-9]+)([-_]([0-9]+))?\/(.+)$/.exec(name);
              if (versionParts?.length === 6) {
                name = versionParts[5];
                const version = versionParts[4]
                  ? `${versionParts[1]}.${versionParts[2]}.${versionParts[4]}`
                  : `${versionParts[1]}.${versionParts[2]}`;
                newImages.push({ data: fileReader.result, path: name, version });
              } else {
                newImages.push({ data: fileReader.result, path: name });
              }
            }
            fileReader.readAsDataURL(new Blob([data], { type: 'image/png' }));
          }
        }
        setImages((images) => [...images, ...newImages]);
        setIsLoading(false);
      }
      reader.onerror = (err) => {
        alert('An error ocurred opening your file.');
        console.error(err);
        setIsLoading(false);
      };
    } else {
      alert('Invalid file type');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold pb-4">Upload Your Texture(s)</h3>
        <FileButton
          fileTypes="image/png,application/zip"
          onChange={handleUploaded}
          disabled={isLoading}
        >
          {isLoading && 'Please wait...'}
          {!isLoading && 'Select File'}
        </FileButton>
        <p>
          (Only png images or zip files containing png images are supported.)
        </p>
      </div>
      <form onSubmit={handleSubmit(submitFn)}>
        <h3 className="font-bold pb-4">My Texture Info</h3>
        {images.map((image, idx) => (
          <TextureForm image={image.data} path={image.path} version={image.version} key={idx} />
        ))}
      </form>
    </div>
  );
}