import type { Table } from "@tanstack/react-table";
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
export declare function DataTablePagination<TData>({ table, enableRowSelection, }: DataTablePaginationProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-pagination.d.ts.map