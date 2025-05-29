import { repeat } from '@/lib/utils';

export function SkeletonText({ lines = 2 }) {
  return (
    <div className="w-full">
      {repeat(lines, (idx) => (
        <div key={idx} className="skeleton inline-block w-full h-[0.65em]" />
      ))}
    </div>
  );
}