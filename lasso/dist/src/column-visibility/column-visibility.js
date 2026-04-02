"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DotsSixVertical } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
function ColumnItem({ column, isDragging, onVisibilityChange, onDragStart, onDragOver, onDragEnd, onDrop, }) {
    return (_jsxs("div", { draggable: true, onDragStart: (e) => onDragStart(e, column.id), onDragOver: onDragOver, onDragEnd: onDragEnd, onDrop: (e) => onDrop(e, column.id), className: cn("flex items-center gap-2 h-10 px-2 rounded-xs w-full cursor-grab active:cursor-grabbing", "hover:bg-accent transition-colors", isDragging && "opacity-50"), children: [_jsx("div", { className: "flex items-center justify-center size-6", children: _jsx(Checkbox, { checked: column.visible, onCheckedChange: (checked) => onVisibilityChange(column.id, !!checked), "aria-label": `Toggle ${column.label} visibility` }) }), _jsx(Text, { variant: "base-sm", className: "flex-1 text-popover-foreground", children: column.label }), _jsx("div", { className: "flex items-center justify-center size-6", children: _jsx(DotsSixVertical, { className: "size-4 text-muted-foreground", weight: "bold" }) })] }));
}
/**
 * ColumnVisibilityPopover Component
 *
 * A popover menu that allows users to toggle column visibility and reorder columns.
 * Works independently of TanStack Table - just pass in column configurations and
 * handle the changes.
 *
 * @example
 * ```tsx
 * const [columns, setColumns] = useState([
 *   { id: 'name', label: 'Name', visible: true },
 *   { id: 'email', label: 'Email', visible: true },
 *   { id: 'phone', label: 'Phone', visible: false },
 * ]);
 *
 * <ColumnVisibilityPopover
 *   columns={columns}
 *   onColumnsChange={setColumns}
 * />
 * ```
 */
export function ColumnVisibilityPopover({ columns, onColumnsChange, trigger, align = "end", }) {
    const [open, setOpen] = useState(false);
    const [draggedColumn, setDraggedColumn] = useState(null);
    const handleVisibilityChange = useCallback((id, visible) => {
        const newColumns = columns.map((col) => col.id === id ? { ...col, visible } : col);
        onColumnsChange(newColumns);
    }, [columns, onColumnsChange]);
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
        const newColumns = [...columns];
        const sourceIndex = newColumns.findIndex((col) => col.id === sourceColumnId);
        const targetIndex = newColumns.findIndex((col) => col.id === targetColumnId);
        if (sourceIndex === -1 || targetIndex === -1) {
            setDraggedColumn(null);
            return;
        }
        // Remove source and insert at target position
        const [removed] = newColumns.splice(sourceIndex, 1);
        newColumns.splice(targetIndex, 0, removed);
        onColumnsChange(newColumns);
        setDraggedColumn(null);
    }, [columns, onColumnsChange]);
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: trigger ?? (_jsx(Button, { variant: "outline", className: "h-9 px-4 py-2", children: "Columns" })) }), _jsxs(PopoverContent, { align: align, className: "w-[316px] p-1 bg-popover border-border shadow-md", children: [_jsx("div", { className: "px-2 py-1.5", children: _jsx(Text, { variant: "base-xs", weight: "medium", className: "text-muted-foreground", children: "Columns visibility" }) }), _jsx("div", { className: "flex flex-col", children: columns.map((column) => (_jsx(ColumnItem, { column: column, isDragging: draggedColumn === column.id, onVisibilityChange: handleVisibilityChange, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnd: handleDragEnd, onDrop: handleDrop }, column.id))) })] })] }));
}
