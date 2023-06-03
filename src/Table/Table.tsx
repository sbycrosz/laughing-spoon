import { clsx } from "clsx";

export interface ColumnDef<T> {
  id: string;
  header: string;
  cell: (cell: T) => string;
}

export interface TableProps<T> {
  data: (T & { id: string })[];
  columnDefs: ColumnDef<T>[];
}

export default function Table<T extends object>(props: TableProps<T>) {
  const { data = [], columnDefs = [] } = props;

  return (
    <table className="rounded-3xl border-separate shadow-md border-spacing-0 overflow-hidden">
      <thead className="bg-[#F7F7F7]">
        <tr>
          {columnDefs.map((columnDef) => {
            return (
              <th
                key={columnDef.id}
                className="text-xl md:text-lg sm:test-base xs:text-base tracking-normal leading-7 font-bold p-6 text-left"
              >
                {columnDef.header}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {data.map((entry, index) => {
          return (
            <tr key={entry.id}>
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
