import type { ReactNode } from "react";

type Column<T> = {
  header: string;
  render: (row: T, index: number) => ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
  isLoading?: boolean;
};

export default function DataTable<T>({ columns, data, emptyText = "No records found", isLoading = false }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-bg text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
            <tr>
              {columns.map(column => (
                <th key={column.header} className="whitespace-nowrap px-4 py-3">{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-4 py-4 align-middle">
                      <div className="h-4 w-3/4 rounded bg-border" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length ? data.map((row, index) => (
              <tr key={index} className="transition hover:bg-bg/70">
                {columns.map(column => (
                  <td key={column.header} className="px-4 py-4 align-middle">{column.render(row, index)}</td>
                ))}
              </tr>
            )) : (
              <tr>
                <td className="px-4 py-8 text-center text-text-muted" colSpan={columns.length}>{emptyText}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
