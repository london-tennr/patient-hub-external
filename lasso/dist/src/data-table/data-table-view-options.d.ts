import type { Table } from "@tanstack/react-table";
import type React from "react";
/**
 * Props for the DataTableViewOptions component.
 *
 * @template TData - The type of data in each row
 */
interface DataTableViewOptionsProps<TData> {
    /** TanStack Table instance. Required. */
    table: Table<TData>;
    /** Custom trigger element. If not provided, defaults to a "Columns" button. */
    trigger?: React.ReactNode;
    /** Callback when column order changes */
    onColumnOrderChange?: (columnOrder: string[]) => void;
}
/**
 * DataTableViewOptions Component
 *
 * A popover menu that allows users to toggle column visibility and reorder columns
 * in the DataTable. Displays a button that opens a menu with checkboxes for each
 * column that can be hidden, along with drag handles for reordering.
 *
 * Columns must have `getCanHide()` return true to appear in this menu.
 *
 * @see [Lasso DataTable README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/data-table/README.md)
 *
 * @example
 * ```tsx
 * <DataTableViewOptions table={table} />
 * ```
 *
 * @example With custom trigger
 * ```tsx
 * <DataTableViewOptions
 *   table={table}
 *   trigger={<Button variant="outline">Columns</Button>}
 * />
 * ```
 */
export declare function DataTableViewOptions<TData>({ table, trigger, onColumnOrderChange, }: DataTableViewOptionsProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-view-options.d.ts.map