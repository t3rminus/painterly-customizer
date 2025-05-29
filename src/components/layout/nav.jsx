import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ProfileMenu } from './profile-menu';

export function Nav({ user, className, vertical = false }) {
  return (
    <nav
      className={twMerge(
        'flex gap-8 h-full justify-start',
        vertical && 'flex-col',
        className
      )}
    >
      <Link href="/" className="flex items-center p-4">
        Home
      </Link>
      <Link href="/customizer" className="flex items-center p-4">
        Customizer
      </Link>
      <Link href="/submissions" className="p-4 flex items-center">
        Submit a Texture
      </Link>
      {!user && (
        <Link
          href="/auth/login"
          className={twMerge('block p-4', !vertical && 'ms-auto me-0')}
        >
          Login
        </Link>
      )}
      {user && (
        <div className={twMerge('', !vertical && 'ms-auto me-4')}>
          <ProfileMenu top={!vertical} />
        </div>
      )}
    </nav>
  );
}