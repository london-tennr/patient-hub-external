import { type ColumnDef, type ColumnFiltersState, type ColumnSort, type Row, type SortingState, type Table as TanstackTable, type VisibilityState } from "@tanstack/react-table";
export { DataTableViewOptions } from "./data-table-view-options";
export { DataTableColumnHeader } from "./data-table-column-header";
export { DataTablePagination } from "./data-table-pagination";
/**
 * Props for the DataTable component.
 *
 * @template TData - The type of data in each row
 * @template TValue - The type of cell values
 */
interface DataTableProps<TData, TValue> {
    /** Column definitions from TanStack Table. Required. */
    columns: ColumnDef<TData, TValue>[];
    /** Array of data to display in the table. Required. */
    data: TData[];
    /** Enable pagination controls. Defaults to false. */
    enablePagination?: boolean;
    /** Enable column sorting. Defaults to false. */
    enableSorting?: boolean;
    /** Enable global search filtering. Defaults to false. */
    enableFiltering?: boolean;
    /** Enable column visibility toggle dropdown. Defaults to false. */
    enableColumnVisibility?: boolean;
    /** Enable row selection with checkboxes. Defaults to false. */
    enableRowSelection?: boolean;
    /** Render function for row action buttons/menus. */
    renderRowActions?: (row: Row<TData>) => React.ReactNode;
    /** Custom pagination component renderer. */
    renderPagination?: (table: TanstackTable<TData>) => React.ReactNode;
    /** Custom row renderer for full control over row rendering. */
    renderRow?: (row: Row<TData>) => React.ReactNode;
    /** Initial page size for pagination. Defaults to 10. */
    defaultPageSize?: number;
    /** Initial column filter state. */
    defaultColumnFilters?: ColumnFiltersState;
    /** Initial column visibility state (column id -> boolean). */
    defaultColumnVisibility?: VisibilityState;
    /** Placeholder text for the search input. Defaults to "Search all columns...". */
    filterPlaceholder?: string;
    /** Function to compute additional CSS classes for each row. */
    getRowClassName?: (row: Row<TData>) => string;
    /** Restrict sorting to specific column IDs. Empty array enables all columns. */
    sortedColumnIds?: string[];
    /** Initial sorting state. */
    defaultSorting?: SortingState;
    /** Callback fired when row selection changes. Receives array of selected row data. */
    onRowSelectionChange?: (selectedRows: TData[]) => void;
    /** Callback fired when a row is clicked. */
    onRowClick?: (row: Row<TData>) => void;
    /** Callback fired when mouse enters a row. */
    onRowMouseEnter?: (row: Row<TData>) => void;
    /** Callback fired when table sorting changes. */
    onTableSortingChange?: (sorting: ColumnSort) => void;
    /** Disable the scrollable container (removes max-height and overflow). Defaults to false. */
    disableScroll?: boolean;
}
/**
 * DataTable Component
 *
 * A powerful, feature-rich table component built on TanStack Table (React Table v8).
 * Provides flexible tabular data display with optional pagination, sorting, filtering,
 * column visibility controls, and row selection. Designed for the Tennr design system
 * with consistent styling and accessibility.
 *
 * @see [TanStack Table](https://tanstack.com/table/latest)
 *
 * @see [Lasso DataTable README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/data-table/README.md)
 *
 * @example
 * ```tsx
 * import { DataTable } from "@tennr/lasso/data-table";
 *
 * const columns = [
 *   { accessorKey: "name", header: "Name" },
 *   { accessorKey: "email", header: "Email" },
 * ];
 *
 * <DataTable
 *   columns={columns}
 *   data={users}
 *   enablePagination
 *   enableSorting
 *   enableFiltering
 * />
 * ```
 */
export declare function DataTable<TData, TValue>({ columns, data, enablePagination, enableSorting, sortedColumnIds, enableFiltering, enableColumnVisibility, enableRowSelection, renderRowActions, renderPagination, renderRow, defaultPageSize, defaultSorting, defaultColumnFilters, defaultColumnVisibility, filterPlaceholder, getRowClassName, onRowSelectionChange, onRowClick, onRowMouseEnter, onTableSortingChange, disableScroll, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=data-table.d.ts.map