import { gravatarUri } from '@/lib/gravatar';
import { avatarInitials } from '@/lib/utils';

export function LoginCard({ className, user }) {
  return (
    <div className={className}>
      <div
        className={'flex gap-3 justify-start items-center w-full'}
        role="button"
        tabIndex="0"
      >
        <div className="flex-none avatar placeholder bg-neutral text-neutral-content overflow-hidden w-8 h-8 rounded-full relative border border-neutral-content/50">
          <div className="w-full h-full text-xl absolute">
            {avatarInitials(user.name || '')}
          </div>
          <img
            className="w-full h-full absolute"
            src={gravatarUri(user.email)}
            alt="Avatar"
            loading="lazy"
          />
        </div>
        <div className="flex-auto text-sm overflow-hidden">
          <div className="font-bold truncate ...">
            {user?.name || `User #${user?.id}`}
          </div>
          {user?.email && (
            <div className="text-xs truncate ...">{user.email}</div>
          )}
        </div>
      </div>
    </div>
  );
}