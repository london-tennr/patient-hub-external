import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../command/command";
import { useIsMobile } from "../hooks/use-mobile";
import { Input } from "../input/input";
import { Label } from "../label/label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { Slider } from "../slider/slider";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
const CATEGORY_LABEL_MOBILE_MAX_LENGTH = 10;
const CATEGORY_LABEL_DESKTOP_MAX_LENGTH = 15;
const MAX_SELECTED_CHECKBOX_VALUES_COUNT = 2;
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
/**
 * CategorySelector - A searchable popover for selecting filter categories.
 *
 * @param filters - Array of available filter categories to choose from
 * @param onSelectCategory - Callback fired when a category is selected
 */
function CategorySelector({ filters, onSelectCategory, }) {
    const [search, setSearch] = useState("");
    const filteredFilters = (filters || []).filter((f) => f.label.toLowerCase().includes(search.toLowerCase()));
    return (_jsxs(Command, { className: "border border-neutral-2!", children: [_jsx(CommandInput, { placeholder: "Search for a filter", value: search, onValueChange: setSearch }), _jsx(CommandList, { children: _jsx(CommandGroup, { children: filteredFilters.map((filter) => (_jsx(CommandItem, { onSelect: () => onSelectCategory(filter.id), className: "cursor-pointer", children: filter.label }, filter.id))) }) })] }));
}
/**
 * CategoryPill - Displays the selected filter category label.
 *
 * @param category - The filter category to display
 */
function CategoryPill({ category }) {
    const isMobile = useIsMobile();
    return (_jsx("div", { className: "flex items-center border border-muted-light bg-neutral-2 px-3 py-1 w-fit rounded-none first:rounded-l-full", children: _jsx(Text, { variant: "base-sm", className: "text-text-tertiary font-medium", children: isMobile
                ? truncateText(category.label, CATEGORY_LABEL_MOBILE_MAX_LENGTH)
                : truncateText(category.label, CATEGORY_LABEL_DESKTOP_MAX_LENGTH) }) }));
}
/**
 * ValuePill - Displays and allows editing of a filter value through different variant UIs.
 *
 * Renders a clickable pill that shows the current value (or "Select value" if empty).
 * When clicked, opens a popover with the appropriate variant UI (command, slider, or checkbox).
 *
 * @param category - The filter category configuration
 * @param instance - The current filter instance with its value
 * @param onSelect - Callback fired when a new value is selected
 * @param onClear - Callback fired when the value is cleared
 * @param variant - The variant UI to use for value selection
 * @param autoOpen - Whether to automatically open the popover when mounted
 * @param allInstances - All filter instances (used to exclude already-selected values)
 * @param includeNull - Whether to include a "null"filter option
 * @param filterWithSearch - Whether to show a search input for the filter values
 * @param initialSearchValue - Initial search value for the filter values
 * @param onSearchValueChange - Callback function to handle search value changes
 */
function ValuePill({ category, instance, onSelect, onClear, variant, autoOpen = false, onAutoOpenComplete, allInstances, includeNull, filterWithSearch = false, initialSearchValue, onSearchValueChange, }) {
    const value = instance.value;
    const [open, setOpen] = useState(autoOpen);
    const isMobile = useIsMobile();
    const categoryLabelMaxLength = isMobile
        ? CATEGORY_LABEL_MOBILE_MAX_LENGTH
        : CATEGORY_LABEL_DESKTOP_MAX_LENGTH;
    // Handle auto-open completion
    useEffect(() => {
        if (autoOpen && onAutoOpenComplete) {
            onAutoOpenComplete();
        }
    }, [autoOpen, onAutoOpenComplete]);
    // Handle backspace to remove filter when no value is selected
    useEffect(() => {
        if (!open)
            return;
        const handleKeyDown = (e) => {
            if (e.key === "Backspace" && !value && onClear) {
                e.preventDefault();
                onClear();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, value, onClear]);
    const displayValue = (() => {
        if (!value)
            return null;
        if (variant === "command" && typeof value === "string") {
            if (includeNull && value === includeNull.id) {
                return includeNull.label;
            }
            return category.values?.find((v) => v.id === value)?.label || value;
        }
        if (variant === "slider" && Array.isArray(value) && value.length === 2) {
            return `${value[0]} - ${value[1]}`;
        }
        if (variant === "checkbox" && Array.isArray(value)) {
            const labels = value
                .map((val) => category.values?.find((v) => v.id === val)?.label)
                .filter(Boolean);
            return labels.length >= MAX_SELECTED_CHECKBOX_VALUES_COUNT
                ? `${labels.length} selected`
                : labels[0] || null;
        }
        return null;
    })();
    const handleSelect = (newValue) => {
        onSelect(newValue);
        if (variant !== "checkbox") {
            setOpen(false);
        }
    };
    const handleClear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClear) {
            onClear();
        }
    };
    const getFilteredCategory = useCallback(() => {
        const selectedValues = allInstances
            .filter((inst) => inst.filterId === category.id && inst.id !== instance.id)
            .flatMap((inst) => {
            const val = inst.value;
            if (!val)
                return [];
            if (Array.isArray(val))
                return val.filter((v) => typeof v === "string");
            return typeof val === "string" ? [val] : [];
        });
        const baseValues = category.values.filter((value) => !selectedValues.includes(value.id));
        if (includeNull && !selectedValues.includes(includeNull.id)) {
            return {
                ...category,
                values: [...baseValues, includeNull],
            };
        }
        return {
            ...category,
            values: baseValues,
        };
    }, [category, allInstances, instance.id, includeNull]);
    const variantComponent = (() => {
        const filteredCategory = getFilteredCategory();
        if (variant === "command") {
            return (_jsx(CommandVariant, { filter: filteredCategory, onSelect: handleSelect }));
        }
        if (variant === "slider") {
            return (_jsx(SliderVariant, { filter: filteredCategory, onSelect: handleSelect, initialValue: Array.isArray(value) && value.length === 2
                    ? value
                    : undefined }));
        }
        if (variant === "checkbox") {
            return (_jsx(CheckboxVariant, { filter: filteredCategory, onSelect: handleSelect, initialValues: Array.isArray(value) ? value : undefined, filterWithSearch: filterWithSearch, initialSearchValue: initialSearchValue, onSearchValueChange: onSearchValueChange }));
        }
    })();
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, modal: false, children: [_jsx(PopoverTrigger, { asChild: true, className: cn("flex items-center gap-2 border border-l-0 bg-neutral-2 pl-3 pr-[10px] w-fit hover:opacity-80 cursor-pointer rounded-none last:rounded-r-full", {
                    "border-dashed border-muted-light": !displayValue,
                    "border-solid border-muted-light": displayValue,
                }), children: _jsxs("div", { className: "flex flex-row items-center gap-2", children: [!displayValue && (_jsx(Icon, { icon: "ph:plus", className: "size-4 text-black" })), _jsx(Text, { variant: "base-sm", className: "text-primary truncate", weight: displayValue ? "medium" : "normal", children: displayValue
                                ? truncateText(displayValue.replace(/[\n\r\t]/gm, ""), categoryLabelMaxLength)
                                : "Select value" }), displayValue && onClear && (_jsx("form", { onSubmit: (e) => {
                                e.preventDefault();
                                handleClear(e);
                            }, className: "flex items-center", children: _jsx("button", { type: "submit", className: "hover:opacity-60 transition-opacity cursor-pointer items-center flex p-0", children: _jsx(Icon, { icon: "ph:x", className: "size-4 text-black" }) }) }))] }) }), _jsx(PopoverContent, { align: "start", className: cn("p-0 min-w-fit max-h-72 overflow-y-auto bg-popover border-border shadow-xs", variant !== "checkbox" && "w-[var(--radix-popover-trigger-width)]", variant === "checkbox" && "w-full"), onOpenAutoFocus: (e) => e.preventDefault(), children: variantComponent })] }));
}
/**
 * CommandVariant - A searchable single-select dropdown for filter values.
 *
 * Best used for selecting from a list of options like users, statuses, or categories.
 *
 * @param filter - The filter category configuration containing available values
 * @param onSelect - Callback fired when a value is selected
 */
function CommandVariant({ filter, onSelect }) {
    const [search, setSearch] = useState("");
    // if filterWithSearch is true but onSearchValueChange is undefined, use a simple filter
    const filteredValues = (filter?.values || []).filter((val) => val.label.toLowerCase().includes(search.toLowerCase()));
    return (_jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search for a filter value", value: search, onValueChange: setSearch }), _jsx(CommandList, { children: _jsxs(CommandGroup, { children: [filteredValues.map((val) => (_jsx(CommandItem, { onSelect: () => onSelect(val.id), className: "cursor-pointer", children: val.label }, val.id))), _jsx(CommandEmpty, { children: _jsx(Text, { variant: "base-sm", className: "text-muted-foreground", children: "No values found" }) })] }) })] }));
}
/**
 * SliderVariant - A range slider for numeric filter values.
 *
 * Best used for filtering by ranges like price, age, date, or ratings.
 *
 * @param filter - The filter category configuration containing min, max, step, and formatLabel
 * @param onSelect - Callback fired when the slider value is committed
 * @param initialValue - Initial range value as a tuple [min, max]
 */
function SliderVariant({ filter, onSelect, initialValue }) {
    const [value, setValue] = useState(initialValue || [filter.min || 0, filter.max || 0]);
    const handleValueCommit = (newValue) => {
        const tupleValue = [newValue[0], newValue[1]];
        setValue(tupleValue);
        onSelect(tupleValue);
    };
    const formatLabel = filter.formatLabel || ((v) => v.toString());
    return (_jsxs("div", { className: "p-4 space-y-4 border border-neutral-2!", children: [_jsxs("div", { className: "flex justify-between text-sm gap-2", children: [_jsxs(Text, { variant: "base-sm", className: "text-muted-foreground", children: ["Min: ", formatLabel(value[0])] }), _jsxs(Text, { variant: "base-sm", className: "text-muted-foreground", children: ["Max: ", formatLabel(value[1])] })] }), _jsx(Slider, { min: filter.min, max: filter.max, step: filter.step || 1, value: value, onValueChange: (v) => setValue([v[0], v[1]]), onValueCommit: handleValueCommit, className: "w-full cursor-pointer" })] }));
}
/**
 * CheckboxVariant - A multi-select checkbox list for filter values.
 *
 * Best used for selecting multiple values like tags, labels, or categories.
 *
 * @param filter - The filter category configuration containing available values
 * @param onSelect - Callback fired when selection changes
 * @param initialValues - Initial array of selected value IDs
 * @param filterWithSearch - Whether to show a search input for the filter values
 * @param initialSearchValue - Initial search value for the filter values
 * @param onSearchValueChange - Callback function to handle search value changes
 */
function CheckboxVariant({ filter, onSelect, initialValues = [], filterWithSearch = false, initialSearchValue, onSearchValueChange, }) {
    const [selectedValues, setSelectedValues] = useState(initialValues);
    const [internalSearch, setInternalSearch] = useState("");
    const searchValue = initialSearchValue ?? internalSearch;
    const setSearch = onSearchValueChange ?? setInternalSearch;
    // if filterWithSearch is true but onSearchValueChange is undefined, use a simple filter
    const filteredValues = (filter.values || []).filter((val) => val.label.toLowerCase().includes(searchValue.toLowerCase()));
    const handleToggle = (value) => {
        const index = selectedValues.indexOf(value);
        const newValues = index !== -1
            ? selectedValues.toSpliced(index, 1)
            : [...selectedValues, value];
        setSelectedValues(newValues);
        onSelect(newValues);
    };
    return (_jsxs("div", { className: cn("space-y-2 border border-neutral-2! w-80", filterWithSearch && "pt-0"), children: [filterWithSearch && (_jsxs("div", { className: "px-3 flex h-9 items-center gap-2 border-b legacy:border-border", children: [_jsx(MagnifyingGlass, { weight: "light", className: "size-4 shrink-0 opacity-50" }), _jsx(Input, { placeholder: "Search options...", className: "focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none focus-visible:outline-none placeholder:text-muted-foreground flex h-10 w-full rounded-sm bg-transparent py-3 text-sm outline-hidden focus:border-none disabled:cursor-not-allowed disabled:opacity-50 border-none pt-0 pb-0 mb-0", value: searchValue, onChange: (e) => {
                            setSearch(e.target.value);
                        } })] })), (filterWithSearch && typeof onSearchValueChange === "function"
                ? filter.values
                : filteredValues).map((val) => (_jsxs("div", { className: cn("px-3 flex items-start space-x-2 ", !filterWithSearch && "first:pt-3 last:pb-3", filterWithSearch && "last:pb-1"), children: [_jsx(Checkbox, { id: val.id, checked: selectedValues.includes(val.id), onCheckedChange: () => handleToggle(val.id), className: "mt-0.75" }), _jsx(Label, { htmlFor: val.id, className: "text-sm font-normal cursor-pointer break-normal whitespace-normal", children: val.label })] }, val.id)))] }));
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
export function FilterGroup({ filters, state, onChange, includeNull, onClearAll = () => { }, }) {
    const [categorySelectOpen, setCategorySelectOpen] = useState(false);
    const [newlyAddedInstanceId, setNewlyAddedInstanceId] = useState(null);
    const [availableFilters, setAvailableFilters] = useState(filters);
    if (!filters || !Array.isArray(filters)) {
        return null;
    }
    if (!state || !Array.isArray(state)) {
        return null;
    }
    const handleSelectCategory = (filterId) => {
        setCategorySelectOpen(false);
        const newInstanceId = crypto.randomUUID();
        const newInstance = {
            id: newInstanceId,
            filterId,
            value: undefined,
        };
        setNewlyAddedInstanceId(newInstanceId);
        onChange([...state, newInstance]);
        setAvailableFilters(availableFilters.filter((f) => f.id !== filterId));
    };
    const handleSelectValue = (instanceId, value) => {
        onChange(state.map((instance) => instance.id === instanceId ? { ...instance, value } : instance));
    };
    const handleRemoveFilter = (instanceId, filter) => {
        onChange(state.filter((instance) => instance.id !== instanceId));
        setAvailableFilters([...availableFilters, filter]);
    };
    const handleClearAll = () => {
        onChange([]);
        setAvailableFilters(filters);
        onClearAll();
    };
    const canAddFilter = availableFilters.length > 0;
    const canClearAll = state.length > 0;
    return (_jsxs("div", { className: "flex flex-row items-start gap-2 flex-wrap", children: [_jsxs("ul", { className: "flex flex-row flex-wrap gap-x-2 gap-y-[6px]", children: [state.map((instance) => {
                        const filter = filters.find((f) => f.id === instance.filterId);
                        if (!filter)
                            return null;
                        return (_jsxs("li", { className: "flex flex-row", children: [_jsx(CategoryPill, { category: filter }), _jsx(ValuePill, { category: filter, instance: instance, onSelect: (value) => handleSelectValue(instance.id, value), onClear: () => handleRemoveFilter(instance.id, filter), variant: filter.childVariant, autoOpen: instance.id === newlyAddedInstanceId, onAutoOpenComplete: () => setNewlyAddedInstanceId(null), allInstances: state, includeNull: includeNull, filterWithSearch: filter.filterWithSearch, initialSearchValue: filter.initialSearchValue, onSearchValueChange: filter.onSearchValueChange })] }, instance.id));
                    }), canAddFilter && (_jsx("li", { children: _jsxs(Popover, { open: categorySelectOpen, onOpenChange: setCategorySelectOpen, modal: false, children: [_jsx(PopoverTrigger, { className: "border border-dashed border-muted-light bg-neutral-2 px-4 py-1 w-fit hover:opacity-80 cursor-pointer rounded-full", children: _jsxs("div", { className: "flex flex-row items-center gap-2", children: [_jsx(Icon, { icon: "ph:plus", className: "size-3 text-black" }), _jsx(Text, { variant: "base-sm", className: "text-black", children: "Add a filter" })] }) }), _jsx(PopoverContent, { align: "start", className: "p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px] max-h-72 overflow-y-auto bg-background-light! shadow-md border-none!", onOpenAutoFocus: (e) => e.preventDefault(), children: _jsx(CategorySelector, { filters: availableFilters, onSelectCategory: handleSelectCategory }) })] }) }))] }), canClearAll && (_jsx(Button, { variant: "ghost", onClick: handleClearAll, className: "hover:opacity-80 rounded-full px-4 py-1.25 h-fit", children: "Clear all" }))] }));
}
