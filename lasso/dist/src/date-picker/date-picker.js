"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar as CalendarIcon } from "@phosphor-icons/react";
import { parseDate } from "chrono-node";
import { useEffect, useState } from "react";
import { Button } from "../button/button";
import { Calendar } from "../calendar/calendar";
import { Input } from "../input/input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
/**
 * Applies the time component from an original date to a newly parsed date.
 * This preserves hours, minutes, seconds, and milliseconds when the user
 * inputs a new date via natural language parsing.
 *
 * @param parsedDate - The newly parsed date from user input
 * @param originalDate - The original date whose time should be preserved
 * @returns The parsed date with the original time applied, or the parsed date unchanged if no original
 */
function applyOriginalTime(parsedDate, originalDate) {
    if (!originalDate) {
        return parsedDate;
    }
    parsedDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds(), originalDate.getMilliseconds());
    return parsedDate;
}
/**
 * Formats a Date object into a human-readable string.
 * Uses the en-US locale with full month name, 2-digit day, and 4-digit year.
 *
 * @param date - The date to format
 * @returns A formatted date string (e.g., "January 15, 2024") or empty string if no date
 */
function formatDate(date) {
    if (!date) {
        return "";
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}
/**
 * DatePicker Component
 *
 * A date selection component that allows users to input dates through either natural language
 * text input or a visual calendar popover. Supports intelligent date parsing via chrono-node,
 * enabling users to type expressions like "today", "tomorrow", "next Friday", or "Jan 15".
 *
 * The component supports both controlled and uncontrolled usage patterns, and preserves time
 * components when parsing new dates from an existing value.
 *
 * @see [chrono-node](https://github.com/wanasit/chrono) for natural language date parsing
 *
 * @see [Lasso DatePicker README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/date-picker/README.md)
 */
export function DatePicker({ date: controlledDate, onDateChange, placeholder = "Type or select a date", className, disabled, startMonth, endMonth, } = {}) {
    const [open, setOpen] = useState(false);
    const [internalDate, setInternalDate] = useState();
    const [inputValue, setInputValue] = useState(() => formatDate(controlledDate));
    // Use controlled date if provided, otherwise use internal state
    const date = controlledDate !== undefined ? controlledDate : internalDate;
    const [month, setMonth] = useState(date || undefined);
    // Update input value when date changes externally
    useEffect(() => {
        if (controlledDate !== undefined) {
            setInputValue(formatDate(controlledDate));
            setMonth(controlledDate || new Date());
        }
    }, [controlledDate]);
    const handleDateChange = (newDate) => {
        if (controlledDate === undefined) {
            setInternalDate(newDate);
        }
        onDateChange?.(newDate);
        setInputValue(formatDate(newDate));
        if (newDate) {
            setMonth(newDate);
        }
    };
    const handleInputChange = (newValue) => {
        setInputValue(newValue);
        // Only clear the date if the input is completely empty
        if (newValue.trim() === "") {
            handleDateChange(undefined);
        }
    };
    const handleInputBlur = () => {
        if (inputValue.trim() === "") {
            handleDateChange(undefined);
            return;
        }
        // Try to parse the input as natural language on blur
        const parsedDate = parseDate(inputValue);
        if (parsedDate) {
            const adjustedDate = applyOriginalTime(parsedDate, date);
            handleDateChange(adjustedDate);
        }
        else {
            // If parsing fails, revert to the current date's formatted value
            setInputValue(formatDate(date));
        }
    };
    const handleDateSelect = (selectedDate) => {
        handleDateChange(selectedDate);
    };
    return (_jsxs("div", { className: `relative ${className || ""}`, children: [_jsx(Input, { disabled: disabled, id: "date", value: inputValue, placeholder: placeholder, className: "pr-10", onChange: (e) => handleInputChange(e.target.value), onBlur: handleInputBlur, onKeyDown: (e) => {
                    if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                    }
                    else if (e.key === "Enter") {
                        e.preventDefault();
                        handleInputBlur();
                    }
                } }), _jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { id: "date-picker", variant: "ghost", size: "icon", className: "absolute rounded-md top-1/2 right-2 size-6 -translate-y-1/2 text-muted-foreground hover:text-foreground", disabled: disabled, children: [_jsx(CalendarIcon, { className: "size-4" }), _jsx("span", { className: "sr-only", children: "Select date" })] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "end", children: _jsx(Calendar, { startMonth: startMonth, endMonth: endMonth, mode: "single", selected: date, captionLayout: "dropdown", month: month, onMonthChange: setMonth, onSelect: (selectedDate) => {
                                handleDateSelect(selectedDate);
                                setOpen(false);
                            }, disabled: disabled }) })] })] }));
}
