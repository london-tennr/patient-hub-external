"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "../button/button";

/**
 * Props for the DataTablePagination component.
 *
 * @template TData - The type of data in each row
 */
interface DataTablePaginationProps<TData> {
  /** TanStack Table instance. Required. */
  table: Table<TData>;
  /** Show row selection count information. Defaults to false. */
  enableRowSelection?: boolean;
}

/**
 * DataTablePagination Component
 *
 * Pagination controls for the DataTable component. Provides Previous/Next
 * navigation buttons and optionally displays row selection information.
 * Buttons are automatically disabled when at the first or last page.
 *
 * @see [Lasso DataTable README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/data-table/README.md)
 *
 * @example
 * ```tsx
 * <DataTablePagination
 *   table={table}
 *   enableRowSelection
 * />
 * ```
 */
export function DataTablePagination<TData>({
  table,
  enableRowSelection,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1">
        {enableRowSelection && (
          <div className="text-sm font-normal lasso:wght-normal leading-5 text-muted-foreground">
            Caption text
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="opacity-50"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
