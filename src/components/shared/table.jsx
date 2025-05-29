import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import { TableHeader } from './table-header';
import { SkeletonText } from './skeleton-text';

export const getRowContent = (row, fields, field) => {
  if (row === null) {
    if (typeof fields[field].skeleton === 'number') {
      return <SkeletonText lines={fields[field].skeleton} />;
    } else if (typeof fields[field].skeleton === 'function') {
      return fields[field].skeleton();
    } else {
      return <SkeletonText lines={2} />;
    }
  } else {
    let result = '';
    if (typeof fields[field] === 'string') {
      result = row[fields[field]];
    }
    if (fields[field].render && typeof fields[field].render === 'function') {
      result = fields[field].render(row);
    } else if (typeof fields[field].render === 'string') {
      result = row[fields[field].render];
    }
    if (result === null && field === '_rowfooter' || field === '_rowheader') {
      return null;
    } else {
      return result || '––';
    }
  }
};

export const getHeaderContent = (fields, field) => {
  if (fields[field].header && typeof fields[field].header === 'function') {
    return fields[field].header();
  } else if (fields[field].header) {
    return fields[field].header;
  }
  return field;
};

export const RenderRowFn = (fields) => {
  const fieldKeys = Object.keys(fields).filter((key) => /^[^_]/.test(key));
  const rowHeader = fields?._rowheader;
  const rowFooter = fields?._rowfooter;

  const RenderRow = (row, rowIdx) => {
    const rowHeaderContent = rowHeader && getRowContent(row, fields, '_rowheader');
    const rowFooterContent = rowFooter && getRowContent(row, fields, '_rowfooter');
    return (
      <Fragment key={rowIdx}>
        {!!rowHeader && !!rowHeaderContent && (
          <div
            className={twMerge(
              'gridtable-rowfooter',
              rowIdx % 2 === 1 ? 'gridtable-odd' : 'gridtable-even',
              rowHeader.className
            )}
          >
            {rowHeaderContent}
          </div>
        )}
        {fieldKeys.map((fieldKey, colIdx) => (
          <div
            key={`row-${rowIdx}-${colIdx}`}
            className={twMerge(
              'gridtable-cell',
              !!rowFooter && 'border-b-0',
              rowIdx % 2 === 1 ? 'gridtable-odd' : 'gridtable-even',
              fields[fieldKey].className
            )}
            style={{ maxWidth: fields[fieldKey].width }}
          >
            {getRowContent(row, fields, fieldKey)}
          </div>
        ))}
        {!!rowFooter && !!rowFooterContent && (
          <div
            className={twMerge(
              'gridtable-rowfooter',
              rowIdx % 2 === 1 ? 'gridtable-odd' : 'gridtable-even',
              rowFooter.className
            )}
          >
            {rowFooterContent}
          </div>
        )}
      </Fragment>
    );
  };
  RenderRow.displayName = 'RenderRow';
  return RenderRow;
};

export function Table({
  data = [],
  className,
  fields = { Content: {} },
  noData = 'There are no entries to display.',
  columnHeadings = true,
  onSort,
  footer,
  header,
  loading
}) {
  const loadingRows = loading === true ? 6 : loading;
  const fieldKeys = Object.keys(fields).filter((key) => /^[^_]/.test(key));
  const gridTemplate = fieldKeys
    .map((k) => fields[k].width || 'auto')
    .join(' ');
  return (
    <div className={twMerge('bg-base-100 w-full rounded-md overflow-hidden', className)}>
      {!!header && (
        <div className="gridtable-topheader w-full overflow-x-auto">
          {header}
        </div>
      )}
      <div
        className="gridtable w-full overflow-x-auto"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {!!columnHeadings && <TableHeader fields={fields} onSort={onSort} />}
        {!columnHeadings && <div className="border-b col-span-full" />}
        {!loadingRows && !data.length && (
          <div className={'gridtable-cell items-center col-span-full'}>
            {noData}
          </div>
        )}
        {!!loadingRows && Array(loadingRows).fill(null).map(RenderRowFn(fields))}
        {!!data.length && data.map(RenderRowFn(fields))}
      </div>
      {!!footer && <div className="gridtable-footer">{footer}</div>}
    </div>
  );
}
