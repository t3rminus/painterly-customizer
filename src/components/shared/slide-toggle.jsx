import { twMerge } from 'tailwind-merge';

export function SlideToggle({ children, className, containerClassName, visible }) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-1 overflow-y-hidden transition-[grid-template-rows] grid-rows-[0fr] -mx-8 px-8',
        !!visible && 'grid-rows-[1fr]',
        containerClassName
      )}
    >
      <div className="min-h-0">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
