"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../button/button";
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
export function DataTablePagination({ table, enableRowSelection, }) {
    return (_jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsx("div", { className: "flex-1", children: enableRowSelection && (_jsx("div", { className: "text-sm font-normal lasso:wght-normal leading-5 text-muted-foreground", children: "Caption text" })) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), className: "opacity-50", children: "Previous" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), className: "opacity-50", children: "Next" })] })] }));
}
