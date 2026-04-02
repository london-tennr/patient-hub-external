"use client";
"use no memo";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnSort,
  type Row,
  type SortingState,
  type Table as TanstackTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { Searchbar } from "../searchbar/searchbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table";
import { cn } from "../utils/cn";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";

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

  // Feature flags
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

  // Optional custom components
  /** Render function for row action buttons/menus. */
  renderRowActions?: (row: Row<TData>) => React.ReactNode;
  /** Custom pagination component renderer. */
  renderPagination?: (table: TanstackTable<TData>) => React.ReactNode;
  /** Custom row renderer for full control over row rendering. */
  renderRow?: (row: Row<TData>) => React.ReactNode;

  // Optional configuration
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

  // sorting configuration
  /** Restrict sorting to specific column IDs. Empty array enables all columns. */
  sortedColumnIds?: string[];
  /** Initial sorting state. */
  defaultSorting?: SortingState;

  // Optional callbacks
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
export function DataTable<TData, TValue>({
  columns,
  data,
  enablePagination = false,
  enableSorting = false,
  sortedColumnIds = [],
  enableFiltering = false,
  enableColumnVisibility = false,
  enableRowSelection = false,
  renderRowActions,
  renderPagination,
  renderRow,
  defaultPageSize = 10,
  defaultSorting = [],
  defaultColumnFilters = [],
  defaultColumnVisibility = {},
  filterPlaceholder = "Search all columns...",
  getRowClassName,
  onRowSelectionChange,
  onRowClick,
  onRowMouseEnter,
  onTableSortingChange,
  disableScroll = false,
}: DataTableProps<TData, TValue>) {
  // State
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(defaultColumnFilters);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility,
  );
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Create table instance
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // Conditional features
    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageSize: defaultPageSize,
        },
      },
    }),
    ...(enableSorting && {
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
    }),
    ...(enableFiltering && {
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: (row, columnId, filterValue) => {
        const value = row.getValue(columnId);
        if (value == null) return false;
        return String(value)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      },
    }),
    ...(enableColumnVisibility && {
      onColumnVisibilityChange: setColumnVisibility,
    }),
    ...(enableRowSelection && {
      onRowSelectionChange: setRowSelection,
    }),

    // State
    state: {
      ...(enableSorting && { sorting }),
      ...(enableFiltering && { columnFilters, globalFilter }),
      ...(enableColumnVisibility && { columnVisibility }),
      ...(enableRowSelection && { rowSelection }),
    },
  });

  // Effect to call onRowSelectionChange when selection changes
  useEffect(() => {
    if (enableRowSelection && onRowSelectionChange) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original as TData);
      onRowSelectionChange(selectedRows);
    }
  }, [enableRowSelection, onRowSelectionChange, table, rowSelection]);

  return (
    <div>
      {/* Search Bar */}
      {enableFiltering && (
        <div className="flex items-center justify-between py-4">
          <div className="w-1/2">
            <Searchbar
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(value) => table.setGlobalFilter(value)}
              placeholder={filterPlaceholder}
            />
          </div>
          {enableColumnVisibility && (
            <DataTableViewOptions table={table as TanstackTable<TData>} />
          )}
        </div>
      )}

      {/* Table */}
      <div
        className={cn(
          "rounded-sm border border-border",
          !disableScroll && "overflow-hidden max-h-96 overflow-y-auto",
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <DataTableColumnHeader
                        column={header.column}
                        title={flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        enableSorting={
                          enableSorting &&
                          (sortedColumnIds.length > 0
                            ? sortedColumnIds.includes(header.id)
                            : true)
                        }
                        onSortingChange={(sorting) => {
                          if (onTableSortingChange) {
                            onTableSortingChange(sorting);
                          }
                        }}
                      />
                    )}
                  </TableHead>
                ))}
                {renderRowActions && <TableHead className="w-[80px]" />}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) =>
                renderRow ? (
                  renderRow(row as Row<TData>)
                ) : (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      getRowClassName?.(row as Row<TData>),
                      onRowClick && "cursor-pointer",
                    )}
                    onClick={
                      onRowClick
                        ? () => onRowClick(row as Row<TData>)
                        : undefined
                    }
                    onMouseEnter={() => {
                      if (onRowMouseEnter) {
                        onRowMouseEnter(row as Row<TData>);
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                    {renderRowActions && (
                      <TableCell className="text-right">
                        {renderRowActions(row as Row<TData>)}
                      </TableCell>
                    )}
                  </TableRow>
                ),
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (renderRowActions ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Section */}
      {enablePagination && (
        <div className="flex items-center justify-center py-4">
          {renderPagination ? (
            renderPagination(table as TanstackTable<TData>)
          ) : (
            <DataTablePagination
              table={table as TanstackTable<TData>}
              enableRowSelection={enableRowSelection}
            />
          )}
        </div>
      )}
    </div>
  );
}
