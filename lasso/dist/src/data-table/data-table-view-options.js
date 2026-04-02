"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DotsSixVertical } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
function ColumnItem({ column, isDragging, onDragStart, onDragOver, onDragEnd, onDrop, }) {
    const columnName = typeof column.columnDef.header === "string"
        ? column.columnDef.header
        : column.id;
    return (_jsxs("div", { draggable: true, onDragStart: (e) => onDragStart(e, column.id), onDragOver: onDragOver, onDragEnd: onDragEnd, onDrop: (e) => onDrop(e, column.id), className: cn("flex items-center gap-2 h-10 px-2 rounded-xs w-full cursor-grab active:cursor-grabbing", "hover:bg-accent transition-colors", isDragging && "opacity-50"), children: [_jsx("div", { className: "flex items-center justify-center size-6", children: _jsx(Checkbox, { checked: column.getIsVisible(), onCheckedChange: (checked) => column.toggleVisibility(!!checked), "aria-label": `Toggle ${columnName} visibility` }) }), _jsx(Text, { variant: "base-sm", className: "flex-1 text-popover-foreground", children: columnName }), _jsx("div", { className: "flex items-center justify-center size-6", children: _jsx(DotsSixVertical, { className: "size-4 text-muted-foreground", weight: "bold" }) })] }));
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
export function DataTableViewOptions({ table, trigger, onColumnOrderChange, }) {
    const [open, setOpen] = useState(false);
    const [draggedColumn, setDraggedColumn] = useState(null);
    const [columnOrder, setColumnOrder] = useState(() => table.getAllColumns().map((col) => col.id));
    // Sync column order with table
    useEffect(() => {
        const currentOrder = table.getState().columnOrder;
        if (currentOrder.length > 0) {
            setColumnOrder(currentOrder);
        }
    }, [table]);
    const visibleColumns = table
        .getAllColumns()
        .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide());
    // Sort columns by the current order
    const sortedColumns = [...visibleColumns].sort((a, b) => {
        const aIndex = columnOrder.indexOf(a.id);
        const bIndex = columnOrder.indexOf(b.id);
        if (aIndex === -1)
            return 1;
        if (bIndex === -1)
            return -1;
        return aIndex - bIndex;
    });
    const handleDragStart = useCallback((e, columnId) => {
        setDraggedColumn(columnId);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", columnId);
    }, []);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }, []);
    const handleDragEnd = useCallback(() => {
        setDraggedColumn(null);
    }, []);
    const handleDrop = useCallback((e, targetColumnId) => {
        e.preventDefault();
        const sourceColumnId = e.dataTransfer.getData("text/plain");
        if (sourceColumnId === targetColumnId) {
            setDraggedColumn(null);
            return;
        }
        const newOrder = [...columnOrder];
        const sourceIndex = newOrder.indexOf(sourceColumnId);
        const targetIndex = newOrder.indexOf(targetColumnId);
        if (sourceIndex === -1 || targetIndex === -1) {
            setDraggedColumn(null);
            return;
        }
        // Remove source and insert at target position
        newOrder.splice(sourceIndex, 1);
        newOrder.splice(targetIndex, 0, sourceColumnId);
        setColumnOrder(newOrder);
        table.setColumnOrder(newOrder);
        onColumnOrderChange?.(newOrder);
        setDraggedColumn(null);
    }, [columnOrder, table, onColumnOrderChange]);
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: trigger ?? (_jsx(Button, { variant: "outline", className: "h-9 px-4 py-2", children: "Columns" })) }), _jsxs(PopoverContent, { align: "end", className: "w-[316px] p-1 bg-popover border-border shadow-md", children: [_jsx("div", { className: "px-2 py-1.5", children: _jsx(Text, { variant: "base-xs", weight: "medium", className: "text-muted-foreground", children: "Columns visibility" }) }), _jsx("div", { className: "flex flex-col", children: sortedColumns.map((column) => (_jsx(ColumnItem, { column: column, isDragging: draggedColumn === column.id, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnd: handleDragEnd, onDrop: handleDrop }, column.id))) })] })] }));
}
