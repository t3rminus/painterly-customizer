'use client';
import { Button } from '@/components/shared/button';
import { TextureForm } from '@/components/submit/texture-form';
import { useState } from 'react';

export function SubmitForm() {
  const [textures, setTextures] = useState([]);
  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => setTextures((t) => [...t, {}])}>New Texture Option</Button>
      </div>
      <form>
        <h3 className="font-bold pb-4">My Textures</h3>
        {textures.map((texture, idx) => (
          <TextureForm texture={texture} key={idx} />
        ))}
      </form>
    </div>
  );
};