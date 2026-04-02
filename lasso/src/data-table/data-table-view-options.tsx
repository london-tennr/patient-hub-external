"use client";

import { DotsSixVertical } from "@phosphor-icons/react";
import type { Column, Table } from "@tanstack/react-table";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { Text } from "../text/text";
import { cn } from "../utils/cn";

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

interface ColumnItemProps<TData> {
  column: Column<TData, unknown>;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

function ColumnItem<TData>({
  column,
  isDragging,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
}: ColumnItemProps<TData>) {
  const columnName =
    typeof column.columnDef.header === "string"
      ? column.columnDef.header
      : column.id;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, column.id)}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={(e) => onDrop(e, column.id)}
      className={cn(
        "flex items-center gap-2 h-10 px-2 rounded-xs w-full cursor-grab active:cursor-grabbing",
        "hover:bg-accent transition-colors",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center justify-center size-6">
        <Checkbox
          checked={column.getIsVisible()}
          onCheckedChange={(checked) => column.toggleVisibility(!!checked)}
          aria-label={`Toggle ${columnName} visibility`}
        />
      </div>
      <Text variant="base-sm" className="flex-1 text-popover-foreground">
        {columnName}
      </Text>
      <div className="flex items-center justify-center size-6">
        <DotsSixVertical className="size-4 text-muted-foreground" weight="bold" />
      </div>
    </div>
  );
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
export function DataTableViewOptions<TData>({
  table,
  trigger,
  onColumnOrderChange,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    table.getAllColumns().map((col) => col.id)
  );

  // Sync column order with table
  useEffect(() => {
    const currentOrder = table.getState().columnOrder;
    if (currentOrder.length > 0) {
      setColumnOrder(currentOrder);
    }
  }, [table]);

  const visibleColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

  // Sort columns by the current order
  const sortedColumns = [...visibleColumns].sort((a, b) => {
    const aIndex = columnOrder.indexOf(a.id);
    const bIndex = columnOrder.indexOf(b.id);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const handleDragStart = useCallback(
    (e: React.DragEvent, columnId: string) => {
      setDraggedColumn(columnId);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", columnId);
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedColumn(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetColumnId: string) => {
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
    },
    [columnOrder, table, onColumnOrderChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button
            variant="outline"
            className="h-9 px-4 py-2"
          >
            Columns
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[316px] p-1 bg-popover border-border shadow-md"
      >
        <div className="px-2 py-1.5">
          <Text
            variant="base-xs"
            weight="medium"
            className="text-muted-foreground"
          >
            Columns visibility
          </Text>
        </div>
        <div className="flex flex-col">
          {sortedColumns.map((column) => (
            <ColumnItem
              key={column.id}
              column={column}
              isDragging={draggedColumn === column.id}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
