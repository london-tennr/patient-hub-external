/**
 * Base interface for combobox options.
 *
 * Extend this interface to add custom properties for use with the `renderOption` prop.
 *
 * @example
 * ```tsx
 * interface TeamMember extends ComboboxOption {
 *   role: string;
 *   avatar: string;
 * }
 * ```
 */
interface ComboboxOption {
    /** Unique identifier for the option */
    value: string;
    /** Display text for the option */
    label: string;
}
/**
 * Props for single-selection Combobox variant.
 *
 * @example
 * ```tsx
 * <Combobox
 *   options={frameworks}
 *   value={selectedValue}
 *   onValueChange={setSelectedValue}
 *   placeholder="Select framework..."
 * />
 * ```
 */
interface ComboboxSingleProps<T extends ComboboxOption> {
    /** Array of options to display. Must extend ComboboxOption. */
    options: T[];
    /** Selection mode. Defaults to "single". */
    variant?: "single";
    /** Currently selected value. */
    value?: string;
    /** Handler called when the selection changes. */
    onValueChange?: (value: string) => void;
    /** Placeholder text when no option is selected. Defaults to "Select option...". */
    placeholder?: string;
    /** Placeholder text for the search input. Defaults to "Search options...". */
    searchPlaceholder?: string;
    /** Message shown when no options match the search. Defaults to "No options found". */
    emptyMessage?: string;
    /** Additional CSS classes for the trigger element. */
    className?: string;
    /** Whether the combobox is disabled. Defaults to false. */
    disabled?: boolean;
    /** Custom render function for options. Receives the option and returns a React node. */
    renderOption?: (option: T) => React.ReactNode;
    /** Whether to show the search input. Defaults to true. */
    isSearchable?: boolean;
    /** Use ghost/minimal styling variant. Defaults to false. */
    ghost?: boolean;
    /** Optional description shown as a group heading in the dropdown. */
    description?: string;
    /** Controlled search input value. */
    searchValue?: string;
    /** Handler for controlled search value changes. */
    onSearchValueChange?: (value: string) => void;
    /** Whether to filter options based on search. Defaults to true. */
    shouldFilter?: boolean;
}
/**
 * Props for multiple-selection Combobox variant.
 *
 * @example
 * ```tsx
 * <Combobox
 *   variant="multiple"
 *   options={languages}
 *   value={selectedValues}
 *   onValueChange={setSelectedValues}
 *   placeholder="Select languages..."
 *   maxDisplay={2}
 * />
 * ```
 */
interface ComboboxMultipleProps<T extends ComboboxOption> {
    /** Array of options to display. Must extend ComboboxOption. */
    options: T[];
    /** Selection mode. Required as "multiple" for multi-select. */
    variant: "multiple";
    /** Array of currently selected values. */
    value?: string[];
    /** Handler called when the selection changes. Receives the new array of selected values. */
    onValueChange?: (value: string[]) => void;
    /** Placeholder text when no options are selected. Defaults to "Select option...". */
    placeholder?: string;
    /** Placeholder text for the search input. Defaults to "Search options...". */
    searchPlaceholder?: string;
    /** Message shown when no options match the search. Defaults to "No options found". */
    emptyMessage?: string;
    /** Additional CSS classes for the trigger element. */
    className?: string;
    /** Whether the combobox is disabled. Defaults to false. */
    disabled?: boolean;
    /** Custom render function for options. Receives the option and returns a React node. */
    renderOption?: (option: T) => React.ReactNode;
    /** Whether to show the search input. Defaults to true. */
    isSearchable?: boolean;
    /** Use ghost/minimal styling variant. Defaults to false. */
    ghost?: boolean;
    /** Optional description shown as a group heading in the dropdown. */
    description?: string;
    /** Max number of selected items to show in trigger before collapsing to a count. Defaults to 3. */
    maxDisplay?: number;
    /** Show clear all button when items are selected. Defaults to true. */
    showClearAll?: boolean;
    /** Controlled search input value. */
    searchValue?: string;
    /** Handler for controlled search value changes. */
    onSearchValueChange?: (value: string) => void;
    /** Whether to filter options based on search. Defaults to true. */
    shouldFilter?: boolean;
}
/**
 * Combined props type for the Combobox component.
 * Accepts either single-selection or multiple-selection props based on the `variant` prop.
 */
type ComboboxProps<T extends ComboboxOption> = {
    /** Portal container for the popover dropdown. */
    container?: HTMLElement;
} & (ComboboxSingleProps<T> | ComboboxMultipleProps<T>);
/**
 * Combobox Component
 *
 * A searchable dropdown selection component that combines a text input with a filterable
 * list of options. Supports both single and multiple selection modes with customizable
 * option rendering. Built on top of the Command component (cmdk) and Popover component
 * for consistent styling in the Tennr design system.
 *
 * @see [cmdk](https://cmdk.paco.me/)
 *
 * @see [Lasso Combobox README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/combobox/README.md)
 *
 * @example
 * ```tsx
 * // Single selection
 * <Combobox
 *   options={frameworks}
 *   value={value}
 *   onValueChange={setValue}
 *   placeholder="Select framework..."
 * />
 *
 * // Multiple selection
 * <Combobox
 *   variant="multiple"
 *   options={languages}
 *   value={values}
 *   onValueChange={setValues}
 *   placeholder="Select languages..."
 * />
 * ```
 */
declare function Combobox<T extends ComboboxOption>(props: ComboboxProps<T>): import("react/jsx-runtime").JSX.Element;
export { Combobox, type ComboboxOption, type ComboboxProps, type ComboboxSingleProps, type ComboboxMultipleProps, };
//# sourceMappingURL=combobox.d.ts.map