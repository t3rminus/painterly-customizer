'use client';
import { useState } from 'react';
import { SlideToggle } from '../shared/slide-toggle';
import { IconOpen, IconClose } from '../shared/icons';

export function CollapsingCategory({ name, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="flex items-center gap-2 w-full p-2 mb-2 bg-base-300 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        {!open && <IconOpen className="w-5 h-5" />}
        {open && <IconClose className="w-5 h-5" />}
        {name}
      </button>
      <SlideToggle visible={open} className="px-2">{children}</SlideToggle>
    </div>
  );
}