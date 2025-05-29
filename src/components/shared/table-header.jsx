'use client';
import { Fragment, useMemo, useState } from 'react';
import { ChevronDownOutline, ChevronUpOutline } from '@raresail/react-ionicons';
import { serializeSort, unserializeSort } from '@/lib/utils';
import { getHeaderContent } from './table';
import { twMerge } from 'tailwind-merge';

export function TableHeader({ fields = [], onSort }) {
  const [ sort, setSort ] = useState('');
  const sortObj = useMemo(() => unserializeSort(sort), [sort]);

  const cycleSort = (key) => {
    if (sortObj[key] === 'ASC') {
      sortObj[key] = 'DESC';
    } else if (sortObj[key] === 'DESC') {
      delete sortObj[key];
    } else {
      sortObj[key] = 'ASC';
    }
    const strSort = serializeSort(sortObj);
    setSort(strSort);
    if (onSort) {
      onSort(strSort || null);
    }
  };

  const fieldKeys = Object.keys(fields).filter((key) => /^[^_]/.test(key));

  return (
    <>
      {fieldKeys.map((key) => (
        <Fragment key={key}>
          {!!fields[key].sort && (
            <button
              type="button"
              onClick={() => cycleSort(fields[key].sort)}
              className={twMerge(
                'gridtable-header text-left whitespace-nowrap',
                fields[key].headerClassName
              )}
            >
              <span className="inline-block whitespace-normal align-middle">
                {getHeaderContent(fields, key)}
              </span>
              {sortObj[fields[key].sort] === 'ASC' && (
                <ChevronUpOutline className="ml-1 inline-block icon-sm align-middle" />
              )}
              {sortObj[fields[key].sort] === 'DESC' && (
                <ChevronDownOutline className="ml-1 inline-block icon-sm align-middle" />
              )}
              {!sortObj[fields[key].sort] && (
                <span className="ml-1 inline-block w-3.5 align-middle" />
              )}
            </button>
          )}
          {!fields[key].sort && (
            <div
              className={twMerge(
                'gridtable-header',
                fields[key].headerClassName
              )}
            >
              {getHeaderContent(fields, key)}
            </div>
          )}
        </Fragment>
      ))}
    </>
  );
}