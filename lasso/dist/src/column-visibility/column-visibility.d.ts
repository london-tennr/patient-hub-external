import type React from "react";
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
export declare function ColumnVisibilityPopover({ columns, onColumnsChange, trigger, align, }: ColumnVisibilityPopoverProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=column-visibility.d.ts.map