'use client';
import { Table } from '@/components/shared/table';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const statusColors = {
  pending: 'badge-info',
  active: 'badge-success',
  needswork: 'badge-warning',
  removed: 'badge-error',
  hidden: 'badge-ghost'
};

export default function SubmissionsTable({ options }) {
  return (
    <Table
      noData="You have no submissions to display."
      fields={{
        ' ': {
          width: '4rem',
          render: (row) => (
            <img
              src={row.preview}
              alt="Preview"
              className="w-8 h-8 [image-rendering:pixelated]"
            />
          )
        },
        'Info': {
          render: (row) => (
            <>
              <div className="font-bold">{row.description}</div>
              <div className="text-sm italic">{row.authors.join(', ')}</div>
            </>
          )
        },
        'Tags': {
          width: '14rem',
          render: (row) => row.tags?.map((t, i) => <div key={i} className="badge badge-primary">{t}</div>)
        },
        'Status': {
          width: '8rem',
          render: (row) => (
            <div
              className={twMerge(
                'capitalize badge badge-soft',
                statusColors[row.status]
              )}
            >
              {row.status}
            </div>
          )
        },
        '  ': {
          width: '6rem',
          className: 'items-end',
          render: (row) => (
            <Link
              className="btn btn-primary btn-sm"
              href={`/submissions/${row.id}`}
            >
              Edit
            </Link>
          )
        }
      }}
      data={options}
    />
  );
}