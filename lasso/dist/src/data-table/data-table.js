"use client";
"use no memo";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Searchbar } from "../searchbar/searchbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../table/table";
import { cn } from "../utils/cn";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
export { DataTableViewOptions } from "./data-table-view-options";
export { DataTableColumnHeader } from "./data-table-column-header";
export { DataTablePagination } from "./data-table-pagination";
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
export function DataTable({ columns, data, enablePagination = false, enableSorting = false, sortedColumnIds = [], enableFiltering = false, enableColumnVisibility = false, enableRowSelection = false, renderRowActions, renderPagination, renderRow, defaultPageSize = 10, defaultSorting = [], defaultColumnFilters = [], defaultColumnVisibility = {}, filterPlaceholder = "Search all columns...", getRowClassName, onRowSelectionChange, onRowClick, onRowMouseEnter, onTableSortingChange, disableScroll = false, }) {
    // State
    const [sorting, setSorting] = useState(defaultSorting);
    const [columnFilters, setColumnFilters] = useState(defaultColumnFilters);
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");
    // Create table instance
    const table = useReactTable({
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
                if (value == null)
                    return false;
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
                .rows.map((row) => row.original);
            onRowSelectionChange(selectedRows);
        }
    }, [enableRowSelection, onRowSelectionChange, table, rowSelection]);
    return (_jsxs("div", { children: [enableFiltering && (_jsxs("div", { className: "flex items-center justify-between py-4", children: [_jsx("div", { className: "w-1/2", children: _jsx(Searchbar, { value: table.getState().globalFilter ?? "", onChange: (value) => table.setGlobalFilter(value), placeholder: filterPlaceholder }) }), enableColumnVisibility && (_jsx(DataTableViewOptions, { table: table }))] })), _jsx("div", { className: cn("rounded-sm border border-border", !disableScroll && "overflow-hidden max-h-96 overflow-y-auto"), children: _jsxs(Table, { children: [_jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => (_jsxs(TableRow, { children: [headerGroup.headers.map((header) => (_jsx(TableHead, { children: header.isPlaceholder ? null : (_jsx(DataTableColumnHeader, { column: header.column, title: flexRender(header.column.columnDef.header, header.getContext()), enableSorting: enableSorting &&
                                                (sortedColumnIds.length > 0
                                                    ? sortedColumnIds.includes(header.id)
                                                    : true), onSortingChange: (sorting) => {
                                                if (onTableSortingChange) {
                                                    onTableSortingChange(sorting);
                                                }
                                            } })) }, header.id))), renderRowActions && _jsx(TableHead, { className: "w-[80px]" })] }, headerGroup.id))) }), _jsx(TableBody, { children: table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => renderRow ? (renderRow(row)) : (_jsxs(TableRow, { "data-state": row.getIsSelected() && "selected", className: cn(getRowClassName?.(row), onRowClick && "cursor-pointer"), onClick: onRowClick
                                    ? () => onRowClick(row)
                                    : undefined, onMouseEnter: () => {
                                    if (onRowMouseEnter) {
                                        onRowMouseEnter(row);
                                    }
                                }, children: [row.getVisibleCells().map((cell) => (_jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))), renderRowActions && (_jsx(TableCell, { className: "text-right", children: renderRowActions(row) }))] }, row.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length + (renderRowActions ? 1 : 0), className: "h-24 text-center text-muted-foreground", children: "No results." }) })) })] }) }), enablePagination && (_jsx("div", { className: "flex items-center justify-center py-4", children: renderPagination ? (renderPagination(table)) : (_jsx(DataTablePagination, { table: table, enableRowSelection: enableRowSelection })) }))] }));
}
