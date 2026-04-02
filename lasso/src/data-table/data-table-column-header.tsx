import { ArrowDown, ArrowsDownUp, ArrowUp } from "@phosphor-icons/react";
import { Column, ColumnSort } from "@tanstack/react-table";
import { type ReactNode } from "react";

import { cn } from "../utils/cn";

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
 * Helper component to render the title as either a string or ReactNode.
 */
const Title = ({ title }: { title: string | ReactNode }) => {
  if (typeof title === "string") {
    return <span>{title}</span>;
  }
  return title;
};

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
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  enableSorting = false,
  onSortingChange,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!enableSorting) {
    return (
      <div className={cn(className)}>
        <Title title={title} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 cursor-pointer select-none transition-colors",
        className,
      )}
      onClick={() => {
        column.toggleSorting();
        if (onSortingChange) {
          onSortingChange({
            id: column.id,
            desc: column.getIsSorted() === "desc",
          });
        }
      }}
    >
      <Title title={title} />
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className="size-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="size-4" />
      ) : (
        <ArrowsDownUp className="size-4" />
      )}
    </div>
  );
}
