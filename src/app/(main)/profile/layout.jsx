import { getUser, signIn } from '@/lib/auth';
import { getLayoutUrl } from '@/lib/utils-server';

export default async function ProfileLayout({ children }) {
  const user = await getUser();
  if (!user) {
    return signIn(null, { redirectTo: getLayoutUrl() });
  }

  return <>{children}</>;
}
