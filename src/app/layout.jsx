import { PageLayout } from '@/components/layout/page-layout';
import './globals.css';
import { getUser } from '@/lib/auth';

export const metadata = {
  title: 'Painterly Customizer',
  description: '',
};

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <PageLayout user={user}>
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
