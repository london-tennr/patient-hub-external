"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretDown, Check, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "../command/command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { cn } from "../utils/cn";
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
function Combobox(props) {
    const { options, value, onValueChange, placeholder = "Select option...", searchPlaceholder = "Search options...", emptyMessage = "No options found", className, disabled = false, renderOption, isSearchable = true, ghost = false, description, searchValue, onSearchValueChange, shouldFilter = true, container, } = props;
    const variant = props.variant || "single";
    const maxDisplay = variant === "multiple"
        ? props.maxDisplay || 3
        : undefined;
    const showClearAll = variant === "multiple"
        ? props.showClearAll !== false
        : false;
    const [open, setOpen] = useState(false);
    const [internalSearch, setInternalSearch] = useState("");
    const effectiveSearch = searchValue ?? internalSearch;
    const setSearch = onSearchValueChange ?? setInternalSearch;
    const isMultiple = variant === "multiple";
    const selectedValues = isMultiple ? value || [] : [];
    const singleValue = !isMultiple ? value : undefined;
    const selectedOption = !isMultiple
        ? options.find((option) => option.value === singleValue)
        : undefined;
    const selectedOptions = isMultiple
        ? options.filter((option) => selectedValues.includes(option.value))
        : [];
    const handleSelect = (optionValue) => {
        if (isMultiple) {
            const currentValues = selectedValues;
            const newValues = currentValues.includes(optionValue)
                ? currentValues.filter((v) => v !== optionValue)
                : [...currentValues, optionValue];
            onValueChange?.(newValues);
        }
        else {
            onValueChange?.(optionValue);
            setOpen(false);
        }
    };
    const handleClearAll = () => {
        if (isMultiple) {
            onValueChange?.([]);
        }
    };
    const renderTriggerContent = () => {
        if (isMultiple && selectedOptions.length > 0) {
            if (selectedOptions.length <= (maxDisplay || 3)) {
                return (_jsx("div", { className: "flex items-center gap-1 w-full overflow-x-hidden min-w-0", children: selectedOptions.map((option) => (_jsx("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-accent rounded-sm text-xs min-w-0 flex-shrink-0", title: option.label, children: _jsx("span", { className: "truncate", children: option.label }) }, option.value))) }));
            }
            else {
                return (_jsxs("span", { className: "text-foreground", children: [selectedOptions.length, " selected"] }));
            }
        }
        else if (!isMultiple && selectedOption) {
            return renderOption ? (renderOption(selectedOption)) : (_jsx("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-accent rounded-sm text-xs max-w-full", title: selectedOption.label, children: _jsx("span", { className: "truncate", children: selectedOption.label }) }, selectedOption.value));
        }
        else {
            return (_jsx("div", { className: "flex items-center gap-1 flex-wrap w-full overflow-x-hidden", children: placeholder }));
        }
    };
    if (ghost) {
        // Ghost mode - render like the original Select ghost mode
        return (_jsxs(Popover, { open: open, onOpenChange: setOpen, modal: true, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx("div", { className: cn("flex h-9 items-center py-2 px-4 text-sm font-medium lasso:wght-medium leading-5 text-foreground bg-white rounded-sm hover:cursor-pointer hover:bg-accent transition-colors", disabled && "opacity-50 cursor-not-allowed", className), title: "Select option", children: _jsxs("div", { className: "text-muted-foreground flex items-center gap-2 underline font-medium lasso:wght-medium", children: [renderTriggerContent(), _jsx(CaretDown, { className: "size-4 opacity-50" })] }) }) }), _jsx(PopoverContent, { container: container, className: "p-0 w-[var(--radix-popover-trigger-width)] max-w-[100vw] max-h-72 overflow-y-auto bg-popover border-border shadow-xs", align: "start", children: _jsxs(Command, { className: "border-none", shouldFilter: shouldFilter, children: [isSearchable && (_jsx(CommandInput, { placeholder: searchPlaceholder, className: "h-9 text-foreground font-medium lasso:wght-medium", value: effectiveSearch, onValueChange: (value) => setSearch(value) })), _jsx(CommandGroup, { heading: description, children: options.map((option, index) => {
                                    const isSelected = isMultiple
                                        ? selectedValues.includes(option.value)
                                        : singleValue === option.value;
                                    return (_jsxs(CommandItem, { value: option.value, onSelect: () => handleSelect(option.value), disabled: disabled, className: "font-medium lasso:wght-medium text-foreground hover:bg-accent", children: [renderOption ? (renderOption(option)) : (_jsx("span", { className: "break-all", title: option.label, children: option.label })), isMultiple && (_jsx(Check, { className: cn("ml-auto h-4 w-4 text-foreground", isSelected ? "opacity-100" : "opacity-0"), weight: "light" }))] }, option.value || index));
                                }) }), _jsx(CommandEmpty, { className: "text-muted-foreground text-xs text-center p-2 font-normal lasso:wght-normal", children: emptyMessage })] }) })] }));
    }
    // Standard mode - enhanced button-based UI
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, modal: true, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx("div", { className: cn("flex h-9 items-center py-2 px-4 text-sm font-medium lasso:wght-medium leading-5 text-foreground bg-white border border-border rounded-sm hover:cursor-pointer hover:bg-accent transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 min-w-[60px]", disabled && "opacity-50 cursor-not-allowed hover:bg-background", className), title: "Select option", children: _jsxs("div", { className: cn("flex items-center gap-2 w-full justify-between font-medium lasso:wght-medium", (!isMultiple && selectedOption) ||
                            (isMultiple && selectedOptions.length > 0)
                            ? "text-foreground"
                            : "text-muted-foreground"), children: [renderTriggerContent(), isMultiple && selectedOptions.length > 0 && showClearAll && (_jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    handleClearAll();
                                }, className: "ml-auto mr-1 p-0.5 hover:bg-accent-foreground/10 rounded-sm transition-colors", "aria-label": "Clear all selections", children: _jsx(X, { className: "size-3 opacity-70", weight: "bold" }) })), _jsx(CaretDown, { className: "size-4 opacity-50" })] }) }) }), _jsx(PopoverContent, { container: container, className: "p-0 w-[var(--radix-popover-trigger-width)] max-w-[100vw] max-h-72 overflow-y-auto bg-popover border-border shadow-xs", align: "start", children: _jsxs(Command, { className: "border-none", shouldFilter: shouldFilter, children: [isSearchable && (_jsx(CommandInput, { placeholder: searchPlaceholder, className: "h-9 text-foreground font-medium lasso:wght-medium", value: effectiveSearch, onValueChange: (value) => setSearch(value) })), _jsx(CommandGroup, { heading: description, children: options.map((option, index) => {
                                const isSelected = isMultiple
                                    ? selectedValues.includes(option.value)
                                    : singleValue === option.value;
                                return (_jsxs(CommandItem, { value: option.value, onSelect: () => handleSelect(option.value), disabled: disabled, className: "font-medium lasso:wght-medium text-foreground hover:bg-accent", children: [renderOption ? (renderOption(option)) : (_jsx("span", { className: "break-all", title: option.label, children: option.label })), _jsx(Check, { className: cn("ml-auto h-4 w-4 text-foreground", isSelected ? "opacity-100" : "opacity-0"), weight: "light" })] }, option.value || index));
                            }) }), _jsx(CommandEmpty, { className: "text-muted-foreground text-xs text-center p-2 font-normal lasso:wght-normal", children: emptyMessage })] }) })] }));
}
export { Combobox, };
