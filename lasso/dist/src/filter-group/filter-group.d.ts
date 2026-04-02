import type React from "react";
import { FilterDependency } from "../command-palette/command-palette";
/**
 * Configuration for a filter category that defines what can be filtered.
 *
 * @property id - Unique identifier for the filter category
 * @property label - Display label shown in the category pill
 * @property variant - The variant used for the category selector UI
 * @property childVariant - The variant used for the value selector UI
 * @property dependency - Optional dependency configuration for conditional filtering
 * @property values - Array of possible values for command/checkbox variants
 * @property min - Minimum value for slider variant
 * @property max - Maximum value for slider variant
 * @property step - Step increment for slider variant
 * @property formatLabel - Custom label formatter for slider values
 * @property filterWithSearch - Whether to show a search input for the filter values
 * @property initialSearchValue - Initial search value for the filter values
 * @property onSearchValueChange - Callback function to handle search value changes
 */
export interface FilterCategoryType {
    id: string;
    label: string;
    variant: "command" | "slider" | "checkbox";
    childVariant: "command" | "slider" | "checkbox";
    dependency?: FilterDependency;
    values: FilterValue[];
    min?: number;
    max?: number;
    step?: number;
    formatLabel?: (value: number) => string;
    filterWithSearch?: boolean;
    initialSearchValue?: string;
    onSearchValueChange?: (search: string) => void;
}
/**
 * A single selectable value within a filter category.
 *
 * @property id - Unique identifier for the value
 * @property label - Display label for the value
 */
export interface FilterValue {
    id: string;
    label: string;
}
/**
 * Represents a single active filter instance in the filter state.
 *
 * @property id - Unique identifier for this filter instance
 * @property filterId - References the FilterCategoryType.id
 * @property value - The selected value(s): string for command, string[] for checkbox, [number, number] for slider
 */
export interface FilterInstance {
    id: string;
    filterId: string;
    value: string | string[] | [number, number] | undefined;
}
/**
 * The complete filter state - an array of active filter instances.
 */
export type FilterState = FilterInstance[];
interface ValuePillProps {
    category: FilterCategoryType;
    instance: FilterInstance;
    onSelect: (value: string | string[] | [number, number]) => void;
    onClear?: () => void;
    variant: "command" | "slider" | "checkbox";
    autoOpen?: boolean;
    onAutoOpenComplete?: () => void;
    allInstances: FilterInstance[];
    includeNull?: {
        id: string;
        label: string;
    };
    filterWithSearch?: boolean;
    initialSearchValue?: string;
    onSearchValueChange?: (search: string) => void;
}
/**
 * Props for the FilterGroup component.
 *
 * @example
 * ```tsx
 * <FilterGroup
 *   filters={filterCategories}
 *   state={filterState}
 *   onChange={setFilterState}
 *   onClearAll={onClearAll}
 * />
 * ```
 */
export interface FilterGroupProps {
    /** Array of available filter categories to choose from. Required. */
    filters: FilterCategoryType[];
    /** Current filter state (array of FilterInstance). Required. */
    state: FilterState;
    /** Callback fired when filter state changes. Required. */
    onChange: (state: FilterState) => void;
    /** When provided allows selecting a "null" filter option, which matches null/undefined values. */
    includeNull?: ValuePillProps["includeNull"];
    /** Callback fired when the clear all button is clicked. */
    onClearAll?: () => void;
}
/**
 * FilterGroup Component
 *
 * A flexible, composable filtering system that allows users to build complex filter
 * queries through an intuitive pill-based interface. Each filter consists of a category
 * pill (defining what to filter) and a value pill (defining the filter criteria).
 *
 * Supports multiple filter variants:
 * - **command**: Searchable single-select dropdown
 * - **slider**: Range slider for numeric values
 * - **checkbox**: Multi-select checkbox list
 *
 * Features:
 * - Dynamic state management (fully controlled)
 * - Multiple instances of the same filter category
 * - Searchable options for command variant
 * - Automatic exclusion of already-selected values
 * - Responsive pill-based layout
 *
 * @see [Lasso FilterGroup README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/filter-group/README.md)
 */
export declare function FilterGroup({ filters, state, onChange, includeNull, onClearAll, }: FilterGroupProps): React.JSX.Element | null;
export {};
//# sourceMappingURL=filter-group.d.ts.map