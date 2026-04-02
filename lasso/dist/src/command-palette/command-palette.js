import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../button/button";
import { Command, CommandItem, CommandList } from "../command/command";
import { FilterGroup, } from "../filter-group/filter-group";
import { Input } from "../input/input";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger, } from "../popover/popover";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
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
export var KeyboardShortcutType;
(function (KeyboardShortcutType) {
    /** Shows "Esc" key hint for closing the palette */
    KeyboardShortcutType["CLOSE"] = "close";
    /** Shows up/down arrow keys hint for navigation */
    KeyboardShortcutType["NAVIGATE"] = "navigate";
    /** Shows "Enter" key hint for selection */
    KeyboardShortcutType["SELECT"] = "select";
})(KeyboardShortcutType || (KeyboardShortcutType = {}));
const COMMAND_PALETTE_BACKGROUND = "!bg-white/25 !backdrop-blur-lg";
const KEYBOARD_SHORTCUTS_MAP = {
    [KeyboardShortcutType.CLOSE]: {
        type: KeyboardShortcutType.CLOSE,
        label: "Close menu",
        renderKey: () => (_jsx("kbd", { className: "bg-white items-center justify-center p-1 rounded-md", children: _jsx(Text, { variant: "base-xs", weight: "light", className: "text-muted-foreground", children: "Esc" }) })),
    },
    [KeyboardShortcutType.NAVIGATE]: {
        type: KeyboardShortcutType.NAVIGATE,
        label: "Navigate items",
        renderKey: () => (_jsxs("div", { className: "flex gap-1.5", children: [_jsx("kbd", { className: "bg-white items-center justify-center p-1 rounded-md flex", children: _jsx(Icon, { icon: "ph:arrow-up-bold", className: "size-3 text-muted-foreground" }) }), _jsx("kbd", { className: "bg-white items-center justify-center p-1 rounded-md flex", children: _jsx(Icon, { icon: "ph:arrow-down-bold", className: "size-3 text-muted-foreground" }) })] })),
    },
    [KeyboardShortcutType.SELECT]: {
        type: KeyboardShortcutType.SELECT,
        label: "Select option",
        renderKey: () => (_jsx("kbd", { className: "bg-white items-center justify-center px-2 py-1 rounded-md", children: _jsx(Icon, { icon: "ph:arrow-elbow-down-left", className: "size-3 text-muted-foreground" }) })),
    },
};
function CommandPaletteKeyboardShortcut(props) {
    const { shortcutsLeft = [], shortcutsRight = [] } = props;
    const validatedShortcutsLeft = shortcutsLeft.slice(0, 2);
    const validatedShortcutsRight = shortcutsRight.slice(0, 2);
    const renderShortcut = (shortcutType) => {
        const config = KEYBOARD_SHORTCUTS_MAP[shortcutType];
        return (_jsxs("div", { className: "gap-2 flex flex-row items-center cursor-default", children: [_jsx(Text, { variant: "base-xs", weight: "light", className: "text-primary", children: config.label }), config.renderKey()] }, shortcutType));
    };
    return (_jsxs("div", { className: "flex flex-row justify-between bg-neutral-2 p-2 gap-2", children: [_jsx("div", { className: "flex flex-row gap-4", children: validatedShortcutsLeft.map(renderShortcut) }), _jsx("div", { className: "flex flex-row gap-4", children: validatedShortcutsRight.map(renderShortcut) })] }));
}
function CommandPalettePopover(props) {
    const { placeholder = "Search...", isSearchable = true, filterCategories, options, listHeading, onSelectOption, renderOption, keyboardShortcutsLeft = [KeyboardShortcutType.CLOSE], keyboardShortcutsRight = [
        KeyboardShortcutType.NAVIGATE,
        KeyboardShortcutType.SELECT,
    ], includeNull, } = props;
    const [search, setSearch] = useState("");
    const [filterState, setFilterState] = useState(() => {
        if (props.initialSelections) {
            return props.initialSelections.map((category) => ({
                id: crypto.randomUUID(),
                filterId: category.id,
                value: category.value,
            }));
        }
        return [];
    });
    const deferredSearch = useDeferredValue(search);
    const deferredFilterState = useDeferredValue(filterState);
    const inputRef = useRef(null);
    const handleSearch = (value) => {
        setSearch(value);
    };
    const handleClear = () => {
        setSearch("");
        inputRef.current?.focus();
    };
    const selectedValues = useMemo(() => {
        const result = {};
        for (const instance of deferredFilterState) {
            if (instance.value !== undefined) {
                result[instance.filterId] = instance.value;
            }
        }
        return result;
    }, [deferredFilterState]);
    const cascadedFilterCategories = useMemo(() => {
        if (!filterCategories || filterCategories.length === 0) {
            return filterCategories;
        }
        return filterCategories.map((category) => {
            if (!category.dependency) {
                return category;
            }
            const { dependsOn, matchType = "substring" } = category.dependency;
            const parentSelectedValue = selectedValues[dependsOn];
            if (!parentSelectedValue) {
                return category;
            }
            const parentValues = Array.isArray(parentSelectedValue)
                ? parentSelectedValue.filter((v) => typeof v === "string")
                : [parentSelectedValue];
            if (parentValues.length === 0) {
                return category;
            }
            const filteredValues = category.values.filter((value) => {
                const valueLabel = value.label.toLowerCase();
                const valueId = value.id.toLowerCase();
                return parentValues.some((parentVal) => {
                    const parentLower = parentVal.toLowerCase();
                    if (matchType === "exact") {
                        return valueLabel === parentLower || valueId === parentLower;
                    }
                    else {
                        return (valueLabel.includes(parentLower) || valueId.includes(parentLower));
                    }
                });
            });
            return {
                ...category,
                values: filteredValues,
            };
        });
    }, [filterCategories, selectedValues]);
    const filteredOptions = (() => {
        // Early return if no filtering needed
        if (!deferredSearch && Object.values(selectedValues).every((v) => !v)) {
            return options;
        }
        const lowerSearch = deferredSearch?.toLowerCase();
        return options.filter((option) => {
            // Check search match
            if (lowerSearch) {
                const matchesSearch = [
                    option.label,
                    option.value,
                    option.category,
                ].some((field) => field?.toLowerCase().includes(lowerSearch));
                if (!matchesSearch)
                    return false;
            }
            // Check filter match
            for (const [filterId, selectedValue] of Object.entries(selectedValues)) {
                if (!selectedValue)
                    continue;
                const optionValue = option[filterId];
                // handle "none" filter (matches null, undefined, or "none")
                if (includeNull && selectedValue === includeNull.id) {
                    const isNullish = optionValue === null ||
                        optionValue === undefined ||
                        optionValue === "" ||
                        optionValue === "none" ||
                        optionValue === "null";
                    if (!isNullish)
                        return false;
                    continue;
                }
                // Handle array filters
                if (Array.isArray(selectedValue)) {
                    // Skip numeric arrays
                    if (selectedValue.length > 0 &&
                        typeof selectedValue[0] === "number") {
                        continue;
                    }
                    const stringValues = selectedValue.filter((v) => typeof v === "string");
                    if (stringValues.length === 0)
                        continue;
                    // check if "none" is in the array
                    if (includeNull && stringValues.includes(includeNull.id)) {
                        const isNullish = optionValue === null ||
                            optionValue === undefined ||
                            optionValue === "" ||
                            optionValue === "none" ||
                            optionValue === "null";
                        if (isNullish)
                            continue;
                    }
                    const matches = Array.isArray(optionValue)
                        ? stringValues.some((val) => optionValue.includes(val))
                        : typeof optionValue === "string" &&
                            stringValues.includes(optionValue);
                    if (!matches)
                        return false;
                }
                // Handle non-array filters
                else if (selectedValue !== optionValue) {
                    return false;
                }
            }
            return true;
        });
    })();
    return (_jsxs(Command, { className: cn("shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.06)]", COMMAND_PALETTE_BACKGROUND), "data-slot": "command", children: [isSearchable && (_jsxs("div", { "data-slot": "command-input-wrapper", className: "relative border-none", children: [_jsx(Input, { ref: inputRef, placeholder: placeholder, value: search, onChange: (e) => handleSearch(e.target.value), autoFocus: true, className: cn("rounded-none border-r-0 border-l-0 border-t-0 border-b-[rgba(239,237,233,1)] py-3 focus-visible:ring-0 focus-visible:ring-offset-0 h-[48px] pl-3 pr-6", COMMAND_PALETTE_BACKGROUND), onKeyDown: (e) => {
                            if (e.key === "ArrowUp" && e.shiftKey) {
                                e.preventDefault();
                                inputRef.current?.select();
                            }
                        } }), _jsx(Button, { variant: "ghost", className: cn("absolute right-2 top-1/2 -translate-y-1/2 size-6 rounded-sm opacity-0 p-0", search.length > 0 && "opacity-100"), onClick: handleClear, tabIndex: search.length > 0 ? 0 : -1, "aria-label": "Clear search", children: _jsx(Icon, { icon: "ph:x", className: "size-3" }) })] })), cascadedFilterCategories && cascadedFilterCategories.length > 0 && (_jsx("div", { className: cn("px-2 py-[6px] border-b border-border items-center flex", COMMAND_PALETTE_BACKGROUND), "data-slot": "filter-categories-wrapper", onPointerDown: (e) => {
                    e.stopPropagation();
                }, onMouseDown: (e) => {
                    e.stopPropagation();
                }, onFocusCapture: (e) => {
                    e.stopPropagation();
                }, children: _jsx(FilterGroup, { filters: cascadedFilterCategories, state: filterState, onChange: setFilterState, includeNull: includeNull }) })), _jsx("div", { "data-slot": "command-list-wrapper", className: "px-2 py-2 h-[472px]!", children: props.isLoading ? (_jsxs("div", { className: "flex flex-col justify-center items-center h-[392px] gap-2", children: [_jsx("span", { className: "animate-spin text-primary text-2xl", children: _jsx(Icon, { icon: "ph:spinner" }) }), _jsx(Text, { variant: "base-sm", weight: "medium", className: "text-muted-foreground", children: "Loading..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Text, { variant: "base-xs", weight: "medium", className: "px-2 py-1 h-[24px]!", children: listHeading || `Results - ${filteredOptions.length}` }), _jsxs(CommandList, { className: "max-h-[392px]! overflow-y-auto", children: [filteredOptions.length === 0 && (_jsx(CommandItem, { className: "cursor-default py-2", disabled: true, children: _jsxs(Text, { variant: "base-sm", weight: "light", children: ["No results found", " ", search.length > 0 ? `for "${search}"` : ""] }) })), filteredOptions.map((option) => (_jsx(CommandItem, { className: "cursor-pointer data-[selected=true]:bg-bg-secondary-hover data-[selected=true]:text-primary!", onSelect: () => {
                                        onSelectOption?.(option);
                                    }, children: renderOption ? renderOption(option) : option.label }, option.value)))] })] })) }), (keyboardShortcutsLeft.length > 0 ||
                keyboardShortcutsRight.length > 0) && (_jsx(CommandPaletteKeyboardShortcut, { shortcutsLeft: keyboardShortcutsLeft, shortcutsRight: keyboardShortcutsRight }))] }));
}
function CommandPaletteTrigger(props) {
    const { icon, label, hint } = props;
    return (_jsxs(Button, { variant: "outline", className: "flex flex-row gap-2 items-center justify-center bg-transparent", children: [icon && _jsx(Icon, { icon: icon, className: "size-4" }), _jsx(Text, { variant: "base-xs", weight: "medium", children: label }), hint && (_jsx(Text, { weight: "light", className: "bg-neutral-2 px-2", children: `⌘K / Ctrl+K` }))] }));
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
function CommandPalette(props) {
    const { placeholder = "Search...", isSearchable = true, filterCategories, options, listHeading, onSelectOption, onSelectedOptionsChange, renderOption, keyboardShortcutsLeft = [KeyboardShortcutType.CLOSE], keyboardShortcutsRight = [
        KeyboardShortcutType.NAVIGATE,
        KeyboardShortcutType.SELECT,
    ], icon = "", label = "Click to open", enableTriggerShortcut = false, side = "bottom", align = "start", sideOffset = 0, children, centered = false, topPosition = 50, } = props;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!enableTriggerShortcut)
            return;
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);
    const handleSelectOption = (option) => {
        onSelectedOptionsChange?.([option]);
        setOpen(false);
        onSelectOption?.(option);
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsxs(PopoverTrigger, { children: [children && _jsx(_Fragment, { children: children }), !children && (_jsx(CommandPaletteTrigger, { icon: icon, label: label, hint: enableTriggerShortcut }))] }), centered && (_jsx(PopoverAnchor, { className: "pointer-events-none", style: {
                    position: "fixed",
                    left: "50%",
                    top: `${topPosition}%`,
                    transform: "translate(-50%, -50%)",
                    width: 0,
                    height: 0,
                } })), _jsx(PopoverContent, { className: cn("w-[720px]!", "p-0 gap-0 rounded-md border-neutral-3 h-[564px]! ", COMMAND_PALETTE_BACKGROUND, centered && "fixed left-1/2 -translate-x-1/2 -translate-y-1/2"), style: centered ? { top: `${topPosition}%` } : undefined, align: align, sideOffset: sideOffset, side: side, children: _jsx(CommandPalettePopover, { placeholder: placeholder, isSearchable: isSearchable, filterCategories: filterCategories, options: options, listHeading: listHeading, onSelectOption: handleSelectOption, renderOption: renderOption, keyboardShortcutsLeft: keyboardShortcutsLeft, keyboardShortcutsRight: keyboardShortcutsRight, initialSelections: props.initialSelections, includeNull: props.includeNull, isLoading: props.isLoading }) })] }));
}
export { CommandPalette };
