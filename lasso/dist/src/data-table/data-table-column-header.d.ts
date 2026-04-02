import { Column, ColumnSort } from "@tanstack/react-table";
import { type ReactNode } from "react";
/**
 * Props for the DataTableColumnHeader component.
 *
 * @template TData - The type of data in each row
 * @template TValue - The type of cell values for this column
 */
interface DataTableColumnHeaderProps<TData, TValue> {
    /** TanStack Table column instance. Required. */
    column: Column<TData, TValue>;
    /** Header title text or custom ReactNode content. Required. */
    title: string | ReactNode;
    /** Enable sorting interaction for this column. Defaults to false. */
    enableSorting?: boolean;
    /** Additional CSS classes for the header container. */
    className?: string;
    /** Callback fired when the column sorting changes. */
    onSortingChange?: (sorting: ColumnSort) => void;
}
/**
 * DataTableColumnHeader Component
 *
 * A column header component for the DataTable that displays the column title
 * and provides optional sorting functionality. Shows visual indicators for
 * the current sort direction (ascending, descending, or unsorted).
 *
 * @see [Lasso DataTable README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/data-table/README.md)
 *
 * @example
 * ```tsx
 * <DataTableColumnHeader
 *   column={column}
 *   title="Name"
 *   enableSorting
 *   onSortingChange={(sorting) => console.log(sorting)}
 * />
 * ```
 */
export declare function DataTableColumnHeader<TData, TValue>({ column, title, className, enableSorting, onSortingChange, }: DataTableColumnHeaderProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-column-header.d.ts.map