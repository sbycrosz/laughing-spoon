import { clsx } from "clsx";

import { ReactComponent as CheckboxOff } from './assets/checkbox-off.svg';
import { ReactComponent as CheckboxOn } from './assets/checkbox-on.svg';
import { find, includes, reject } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { ReactComponent as RadioOff } from './assets/radio-off.svg';
import { ReactComponent as RadioOn } from './assets/radio-on.svg';
import { ReactComponent as SortDown } from './assets/sort-down.svg';
import { ReactComponent as SortNeutral } from './assets/sort-neutral.svg';
import { ReactComponent as SortUp } from './assets/sort-up.svg';

export interface ColumnDef<T> {
  id: string;
  header: string;
  cell: (cell: T) => string;
  sortable?: boolean;
  comparator?: (nodeA: T, nodeB: T) => number;
}

export interface TableProps<T> {
  data: (T & { id: string })[];
  columnDefs: ColumnDef<T>[];
  rowSelection?: 'none' | 'single' | 'multiple';
  onSelectionChanged?: (ids: string[]) => void;
}

enum SortDirection {
  NONE,
  ASCENDING,
  DESCENDING
}

export default function Table<T extends object>(props: TableProps<T>) {
  const { data = [], columnDefs = [], rowSelection = 'none', onSelectionChanged = () => { } } = props;

  // ---- Sortable 
  const [sortColumn, setSortColumn] = useState<string>();
  const [sortDirection, setSortDirection] = useState(SortDirection.NONE);

  const displayData = useMemo(() => {
    if (sortDirection === SortDirection.NONE) return data;
    const comparator = find(columnDefs, { id: sortColumn })?.comparator;

    if (!comparator) {
      console.warn(`ERROR: Missing comparator function for ${sortColumn}`)
      return data;
    }

    const sortedData = [...data].sort(comparator);
    if (sortDirection === SortDirection.ASCENDING) return sortedData;
    return sortedData.reverse();
  }, [data, columnDefs, sortColumn, sortDirection]);

  const sortData = useCallback((columnId: string) => {
    if (sortColumn === columnId && sortDirection === SortDirection.ASCENDING) setSortDirection(SortDirection.DESCENDING);
    else if (sortColumn === columnId && sortDirection === SortDirection.DESCENDING) setSortDirection(SortDirection.NONE);
    else {
      setSortColumn(columnId);
      setSortDirection(SortDirection.ASCENDING);
    }
  }, [sortDirection, setSortDirection, sortColumn, setSortColumn]);

  // ---- Radio / Checkbox
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toggleSelected = useCallback((entryId: string,) => {
    if (rowSelection === 'none') return

    const isSelected = includes(selectedIds, entryId);
    const newSelectedIds = isSelected ?
      reject(selectedIds, (v) => v === entryId) :
      rowSelection === 'single' ? [entryId] :
        [...selectedIds, entryId]

    onSelectionChanged(newSelectedIds);
    setSelectedIds(newSelectedIds)
  }, [selectedIds, setSelectedIds, onSelectionChanged, rowSelection]);
  const SelectedIcon = rowSelection === 'single' ? RadioOn : CheckboxOn;
  const UnselectedIcon = rowSelection === 'single' ? RadioOff : CheckboxOff;

  return (
    <table className="rounded-3xl border-separate shadow-md border-spacing-0 overflow-hidden">
      <thead className="bg-[#F7F7F7]">
        <tr>
          {rowSelection !== 'none' && <th />}

          {columnDefs.map((columnDef) => {
            return (
              <th
                key={columnDef.id}
                className="text-xl md:text-lg sm:test-base xs:text-base tracking-normal leading-7 font-bold p-6 text-left"
              >
                {columnDef.header}

                {columnDef.sortable &&
                  <span
                    className="ml-2.5 h-14 w-14 inline-flex items-center justify-center rounded-full hover:bg-[#EFEDFD]"
                    onClick={() => sortData(columnDef.id)}>
                    {(sortColumn === columnDef.id && sortDirection === SortDirection.ASCENDING) ? <SortDown className="h-4 w-3 inline" /> :
                      (sortColumn === columnDef.id && sortDirection === SortDirection.DESCENDING) ? <SortUp className="h-4 w-3 inline" /> :
                        <SortNeutral className="h-4 w-3 inline" />}
                  </span>}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {displayData.map((entry, index) => {
          const isSelected = includes(selectedIds, entry.id);

          return (
            <tr
              key={entry.id}
              className={clsx(
                "hover:bg-[#EFEDFD]",
                isSelected && "border-t bg-[#EFEDFD]"
              )}
              onClick={() => toggleSelected(entry.id)}>
              {rowSelection !== 'none' &&
                <td
                  className={clsx(
                    "pl-6 py-6 pr-0",
                    index > 0 && "border-t border-[#E1E1E1]"
                  )}>
                  {isSelected ?
                    <SelectedIcon className="h-8 w-8" /> :
                    <UnselectedIcon className="h-8 w-8" />}
                </td>}


              {columnDefs.map((columnDef) => {
                return (
                  <td
                    key={columnDef.id}
                    className={clsx(
                      "text-xl md:text-lg sm:test-base xs:text-base tracking-[0.1px] leading-7 p-6 text-left",
                      index > 0 && "border-t border-[#E1E1E1]"
                    )}
                  >
                    {columnDef.cell(entry)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
