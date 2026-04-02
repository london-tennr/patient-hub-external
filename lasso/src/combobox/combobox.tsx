"use client";

import { CaretDown, Check, X } from "@phosphor-icons/react";
import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command/command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { cn } from "../utils/cn";

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
function Combobox<T extends ComboboxOption>(props: ComboboxProps<T>) {
  const {
    options,
    value,
    onValueChange,
    placeholder = "Select option...",
    searchPlaceholder = "Search options...",
    emptyMessage = "No options found",
    className,
    disabled = false,
    renderOption,
    isSearchable = true,
    ghost = false,
    description,
    searchValue,
    onSearchValueChange,
    shouldFilter = true,
    container,
  } = props;

  const variant = props.variant || "single";
  const maxDisplay =
    variant === "multiple"
      ? (props as ComboboxMultipleProps<T>).maxDisplay || 3
      : undefined;
  const showClearAll =
    variant === "multiple"
      ? (props as ComboboxMultipleProps<T>).showClearAll !== false
      : false;

  const [open, setOpen] = useState(false);

  const [internalSearch, setInternalSearch] = useState("");
  const effectiveSearch = searchValue ?? internalSearch;
  const setSearch = onSearchValueChange ?? setInternalSearch;

  const isMultiple = variant === "multiple";
  const selectedValues = isMultiple ? (value as string[]) || [] : [];
  const singleValue = !isMultiple ? (value as string) : undefined;

  const selectedOption = !isMultiple
    ? options.find((option) => option.value === singleValue)
    : undefined;

  const selectedOptions = isMultiple
    ? options.filter((option) => selectedValues.includes(option.value))
    : [];

  const handleSelect = (optionValue: string) => {
    if (isMultiple) {
      const currentValues = selectedValues;
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      (onValueChange as (value: string[]) => void)?.(newValues);
    } else {
      (onValueChange as (value: string) => void)?.(optionValue);
      setOpen(false);
    }
  };

  const handleClearAll = () => {
    if (isMultiple) {
      (onValueChange as (value: string[]) => void)?.([]);
    }
  };

  const renderTriggerContent = () => {
    if (isMultiple && selectedOptions.length > 0) {
      if (selectedOptions.length <= (maxDisplay || 3)) {
        return (
          <div className="flex items-center gap-1 w-full overflow-x-hidden min-w-0">
            {selectedOptions.map((option) => (
              <span
                key={option.value}
                className="flex items-center gap-1 px-2 py-0.5 bg-accent rounded-sm text-xs min-w-0 flex-shrink-0"
                title={option.label}
              >
                <span className="truncate">{option.label}</span>
              </span>
            ))}
          </div>
        );
      } else {
        return (
          <span className="text-foreground">
            {selectedOptions.length} selected
          </span>
        );
      }
    } else if (!isMultiple && selectedOption) {
      return renderOption ? (
        renderOption(selectedOption)
      ) : (
        <span
          key={selectedOption.value}
          className="flex items-center gap-1 px-2 py-0.5 bg-accent rounded-sm text-xs max-w-full"
          title={selectedOption.label}
        >
          <span className="truncate">{selectedOption.label}</span>
        </span>
      );
    } else {
      return (
        <div className="flex items-center gap-1 flex-wrap w-full overflow-x-hidden">
          {placeholder}
        </div>
      );
    }
  };

  if (ghost) {
    // Ghost mode - render like the original Select ghost mode
    return (
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex h-9 items-center py-2 px-4 text-sm font-medium lasso:wght-medium leading-5 text-foreground bg-white rounded-sm hover:cursor-pointer hover:bg-accent transition-colors",
              disabled && "opacity-50 cursor-not-allowed",
              className,
            )}
            title="Select option"
          >
            <div className="text-muted-foreground flex items-center gap-2 underline font-medium lasso:wght-medium">
              {renderTriggerContent()}
              <CaretDown className="size-4 opacity-50" />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          container={container}
          className="p-0 w-[var(--radix-popover-trigger-width)] max-w-[100vw] max-h-72 overflow-y-auto bg-popover border-border shadow-xs"
          align="start"
        >
          <Command className="border-none" shouldFilter={shouldFilter}>
            {isSearchable && (
              <CommandInput
                placeholder={searchPlaceholder}
                className="h-9 text-foreground font-medium lasso:wght-medium"
                value={effectiveSearch}
                onValueChange={(value) => setSearch(value)}
              />
            )}
            <CommandGroup heading={description}>
              {options.map((option, index) => {
                const isSelected = isMultiple
                  ? selectedValues.includes(option.value)
                  : singleValue === option.value;

                return (
                  <CommandItem
                    key={option.value || index}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    disabled={disabled}
                    className="font-medium lasso:wght-medium text-foreground hover:bg-accent"
                  >
                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <span className="break-all" title={option.label}>
                        {option.label}
                      </span>
                    )}
                    {isMultiple && (
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4 text-foreground",
                          isSelected ? "opacity-100" : "opacity-0",
                        )}
                        weight="light"
                      />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandEmpty className="text-muted-foreground text-xs text-center p-2 font-normal lasso:wght-normal">
              {emptyMessage}
            </CommandEmpty>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  // Standard mode - enhanced button-based UI
  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex h-9 items-center py-2 px-4 text-sm font-medium lasso:wght-medium leading-5 text-foreground bg-white border border-border rounded-sm hover:cursor-pointer hover:bg-accent transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 min-w-[60px]",
            disabled && "opacity-50 cursor-not-allowed hover:bg-background",
            className,
          )}
          title="Select option"
        >
          <div
            className={cn(
              "flex items-center gap-2 w-full justify-between font-medium lasso:wght-medium",
              (!isMultiple && selectedOption) ||
                (isMultiple && selectedOptions.length > 0)
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {renderTriggerContent()}
            {isMultiple && selectedOptions.length > 0 && showClearAll && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                className="ml-auto mr-1 p-0.5 hover:bg-accent-foreground/10 rounded-sm transition-colors"
                aria-label="Clear all selections"
              >
                <X className="size-3 opacity-70" weight="bold" />
              </button>
            )}
            <CaretDown className="size-4 opacity-50" />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        container={container}
        className="p-0 w-[var(--radix-popover-trigger-width)] max-w-[100vw] max-h-72 overflow-y-auto bg-popover border-border shadow-xs"
        align="start"
      >
        <Command className="border-none" shouldFilter={shouldFilter}>
          {isSearchable && (
            <CommandInput
              placeholder={searchPlaceholder}
              className="h-9 text-foreground font-medium lasso:wght-medium"
              value={effectiveSearch}
              onValueChange={(value) => setSearch(value)}
            />
          )}
          <CommandGroup heading={description}>
            {options.map((option, index) => {
              const isSelected = isMultiple
                ? selectedValues.includes(option.value)
                : singleValue === option.value;

              return (
                <CommandItem
                  key={option.value || index}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  disabled={disabled}
                  className="font-medium lasso:wght-medium text-foreground hover:bg-accent"
                >
                  {renderOption ? (
                    renderOption(option)
                  ) : (
                    <span className="break-all" title={option.label}>
                      {option.label}
                    </span>
                  )}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-foreground",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                    weight="light"
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandEmpty className="text-muted-foreground text-xs text-center p-2 font-normal lasso:wght-normal">
            {emptyMessage}
          </CommandEmpty>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export {
  Combobox,
  type ComboboxOption,
  type ComboboxProps,
  type ComboboxSingleProps,
  type ComboboxMultipleProps,
};
