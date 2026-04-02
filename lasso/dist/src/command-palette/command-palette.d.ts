import type React from "react";
import { type FilterCategoryType, type FilterGroupProps } from "../filter-group/filter-group";
/**
 * Enum representing the types of keyboard shortcuts that can be displayed
 * in the CommandPalette footer.
 *
 * @example
 * ```tsx
 * <CommandPalette
 *   keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
 *   keyboardShortcutsRight={[KeyboardShortcutType.NAVIGATE, KeyboardShortcutType.SELECT]}
 * />
 * ```
 */
export declare enum KeyboardShortcutType {
    /** Shows "Esc" key hint for closing the palette */
    CLOSE = "close",
    /** Shows up/down arrow keys hint for navigation */
    NAVIGATE = "navigate",
    /** Shows "Enter" key hint for selection */
    SELECT = "select"
}
/**
 * Base interface for options displayed in the CommandPalette.
 * Options must have a label and value, and can include additional
 * properties that can be used for filtering.
 *
 * @example
 * ```tsx
 * const options: Option[] = [
 *   { label: "Task 1", value: "task-1", status: "active", priority: "high" },
 *   { label: "Task 2", value: "task-2", status: "pending", priority: "low" },
 * ];
 * ```
 */
export interface Option {
    /** Display text shown for the option */
    label: string;
    /** Unique identifier for the option */
    value: string;
    /** Optional category for grouping or filtering */
    category?: string;
    /** Additional properties that can be used for filtering (e.g., status, priority, tags) */
    [key: string]: string | string[] | undefined;
}
/**
 * Configuration for cascading filter dependencies.
 * Allows one filter's options to be filtered based on another filter's selection.
 *
 * @example
 * ```tsx
 * const insurancePayerFilter = {
 *   id: "insurancePayer",
 *   dependency: {
 *     dependentFilterId: "payerFamily",
 *     dependsOn: "payerFamily",
 *     matchType: "substring",
 *   },
 * };
 * ```
 */
export interface FilterDependency {
    /** ID of the filter that depends on this relationship */
    dependentFilterId: string;
    /** How to match values: "substring" for partial matches, "exact" for exact matches */
    matchType?: "substring" | "exact";
    /** ID of the parent filter this filter depends on */
    dependsOn: string;
}
/**
 * Extended filter category type that supports cascading dependencies.
 * Extends the base FilterCategoryType with optional dependency configuration.
 */
export interface ExtendedFilterCategoryType extends FilterCategoryType {
    /** Optional dependency configuration for cascading filters */
    dependency?: FilterDependency;
}
interface CommandPalettePopoverProps<T extends Option> {
    children?: React.ReactNode;
    placeholder?: string;
    isSearchable?: boolean;
    filterCategories?: FilterCategoryType[];
    options: T[];
    listHeading?: string;
    onSelectOption?: (option: T) => void;
    renderOption?: (option: T) => React.ReactNode;
    keyboardShortcutsLeft?: KeyboardShortcutType[];
    keyboardShortcutsRight?: KeyboardShortcutType[];
    icon?: string;
    label?: string;
    enableTriggerShortcut?: boolean;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    centered?: boolean;
    /** Vertical position as percentage from top when centered (default: 50) */
    topPosition?: number;
    initialSelections?: {
        id: string;
        value?: string;
    }[];
    includeNull?: FilterGroupProps["includeNull"];
    isLoading?: boolean;
}
interface CommandPaletteProps<T extends Option> extends CommandPalettePopoverProps<T> {
    selectedOptions?: T[];
    onSelectedOptionsChange?: (options: T[]) => void;
    position?: "top" | "bottom" | "left" | "right";
}
/**
 * CommandPalette Component
 *
 * A powerful, searchable dropdown interface for selecting from a list of options.
 * Combines a trigger button with a popover containing a searchable list, optional
 * filter categories, and keyboard shortcuts. Ideal for quick navigation, task selection,
 * and any scenario where users need to search and select from a large set of options.
 *
 * Built with Radix UI Popover and Command primitives for accessibility, with a
 * frosted glass UI aesthetic.
 *
 * @see [Lasso CommandPalette README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/command-palette/README.md)
 *
 * @example Basic usage
 * ```tsx
 * <CommandPalette
 *   options={[
 *     { label: "Task 1", value: "task-1" },
 *     { label: "Task 2", value: "task-2" },
 *   ]}
 *   onSelectOption={(option) => console.log("Selected:", option)}
 *   icon="ph:plus"
 *   label="Add task"
 * />
 * ```
 *
 * @example With filters and keyboard shortcut
 * ```tsx
 * <CommandPalette
 *   options={options}
 *   filterCategories={[statusFilter, priorityFilter]}
 *   listHeading="Tasks"
 *   centered={true}
 *   enableTriggerShortcut={true}
 *   keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
 *   keyboardShortcutsRight={[KeyboardShortcutType.NAVIGATE, KeyboardShortcutType.SELECT]}
 * />
 * ```
 */
declare function CommandPalette<T extends Option>(props: CommandPaletteProps<T>): React.JSX.Element;
export { CommandPalette };
//# sourceMappingURL=command-palette.d.ts.map