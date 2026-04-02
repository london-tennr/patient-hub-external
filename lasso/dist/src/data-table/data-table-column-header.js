import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowsDownUp, ArrowUp } from "@phosphor-icons/react";
import { cn } from "../utils/cn";
/**
 * Helper component to render the title as either a string or ReactNode.
 */
const Title = ({ title }) => {
    if (typeof title === "string") {
        return _jsx("span", { children: title });
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
export function DataTableColumnHeader({ column, title, className, enableSorting = false, onSortingChange, }) {
    if (!enableSorting) {
        return (_jsx("div", { className: cn(className), children: _jsx(Title, { title: title }) }));
    }
    return (_jsxs("div", { className: cn("flex items-center gap-2 cursor-pointer select-none transition-colors", className), onClick: () => {
            column.toggleSorting();
            if (onSortingChange) {
                onSortingChange({
                    id: column.id,
                    desc: column.getIsSorted() === "desc",
                });
            }
        }, children: [_jsx(Title, { title: title }), column.getIsSorted() === "desc" ? (_jsx(ArrowDown, { className: "size-4" })) : column.getIsSorted() === "asc" ? (_jsx(ArrowUp, { className: "size-4" })) : (_jsx(ArrowsDownUp, { className: "size-4" }))] }));
}
