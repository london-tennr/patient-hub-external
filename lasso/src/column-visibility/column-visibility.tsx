"use client";

import { DotsSixVertical } from "@phosphor-icons/react";
import type React from "react";
import { useCallback, useState } from "react";

import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { Text } from "../text/text";
import { cn } from "../utils/cn";

/**
 * Represents a column configuration for visibility control.
 */
export interface ColumnConfig {
  /** Unique identifier for the column */
  id: string;
  /** Display name for the column */
  label: string;
  /** Whether the column is currently visible */
  visible: boolean;
}

/**
 * Props for the ColumnVisibilityPopover component.
 */
interface ColumnVisibilityPopoverProps {
  /** Array of column configurations */
  columns: ColumnConfig[];
  /** Callback when column visibility or order changes */
  onColumnsChange: (columns: ColumnConfig[]) => void;
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Alignment of the popover */
  align?: "start" | "center" | "end";
}

interface ColumnItemProps {
  column: ColumnConfig;
  isDragging: boolean;
  onVisibilityChange: (id: string, visible: boolean) => void;
  onDragStart: (e: React.DragEvent, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

function ColumnItem({
  column,
  isDragging,
  onVisibilityChange,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
}: ColumnItemProps) {
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
          checked={column.visible}
          onCheckedChange={(checked) =>
            onVisibilityChange(column.id, !!checked)
          }
          aria-label={`Toggle ${column.label} visibility`}
        />
      </div>
      <Text variant="base-sm" className="flex-1 text-popover-foreground">
        {column.label}
      </Text>
      <div className="flex items-center justify-center size-6">
        <DotsSixVertical
          className="size-4 text-muted-foreground"
          weight="bold"
        />
      </div>
    </div>
  );
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
export function ColumnVisibilityPopover({
  columns,
  onColumnsChange,
  trigger,
  align = "end",
}: ColumnVisibilityPopoverProps) {
  const [open, setOpen] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleVisibilityChange = useCallback(
    (id: string, visible: boolean) => {
      const newColumns = columns.map((col) =>
        col.id === id ? { ...col, visible } : col
      );
      onColumnsChange(newColumns);
    },
    [columns, onColumnsChange]
  );

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

      const newColumns = [...columns];
      const sourceIndex = newColumns.findIndex(
        (col) => col.id === sourceColumnId
      );
      const targetIndex = newColumns.findIndex(
        (col) => col.id === targetColumnId
      );

      if (sourceIndex === -1 || targetIndex === -1) {
        setDraggedColumn(null);
        return;
      }

      // Remove source and insert at target position
      const [removed] = newColumns.splice(sourceIndex, 1);
      newColumns.splice(targetIndex, 0, removed);

      onColumnsChange(newColumns);
      setDraggedColumn(null);
    },
    [columns, onColumnsChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="h-9 px-4 py-2">
            Columns
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align={align}
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
          {columns.map((column) => (
            <ColumnItem
              key={column.id}
              column={column}
              isDragging={draggedColumn === column.id}
              onVisibilityChange={handleVisibilityChange}
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
