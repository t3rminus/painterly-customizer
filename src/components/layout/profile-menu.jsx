import { getUser } from '@/lib/auth';
import { LoginCard } from '@/components/shared/login-card';
import { signOut } from './actions';
import { twMerge } from 'tailwind-merge';

export async function ProfileMenu({ top, ...props}) {
  const user = await getUser();

  return (
    <div {...props}>
      <div
        className={twMerge('dropdown -mx-4 block', top ? 'dropdown-end' : 'dropdown-top')}
      >
        <LoginCard
          user={user}
          className="h-auto p-2 btn btn-ghost text-left font-normal w-full hover:bg-neutral-content/20"
        />
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 bg-base-100 text-base-content shadow-lg rounded-box w-full"
        >
          <li>
            <a href={'/profile'}>My Profile</a>
          </li>
          <li>
            <form action={signOut} className="relative block h-8">
              <button
                type="submit"
                className="absolute top-0 left-0 w-full h-full text-left p-[inherit]"
              >
                Sign Out
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}
