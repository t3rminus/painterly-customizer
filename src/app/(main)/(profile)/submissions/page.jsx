import { getUser } from '@/lib/auth';
import { getOptionsByUser } from './actions';
import SubmissionsTable from './table';
import Link from 'next/link';

export default async function Profile() {
  const user = await getUser();
  const options = await getOptionsByUser(user.id);

  return (
    <div>
      <div className="flex gap-4 justify-between items-end mb-4">
        <h1 className="text-2xl">My Submissions</h1>
        <Link href="/submissions/new" className="btn btn-primary">
          New Submission
        </Link>
      </div>
      <SubmissionsTable options={options} />
    </div>
  );
}