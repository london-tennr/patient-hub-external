"use client";

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
function applyOriginalTime(
  parsedDate: Date,
  originalDate: Date | undefined,
): Date {
  if (!originalDate) {
    return parsedDate;
  }
  parsedDate.setHours(
    originalDate.getHours(),
    originalDate.getMinutes(),
    originalDate.getSeconds(),
    originalDate.getMilliseconds(),
  );
  return parsedDate;
}

/**
 * Formats a Date object into a human-readable string.
 * Uses the en-US locale with full month name, 2-digit day, and 4-digit year.
 *
 * @param date - The date to format
 * @returns A formatted date string (e.g., "January 15, 2024") or empty string if no date
 */
function formatDate(date: Date | undefined) {
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
 * Props for the DatePicker component.
 *
 * @example
 * ```tsx
 * // Controlled usage
 * const [date, setDate] = useState<Date>();
 * <DatePicker
 *   date={date}
 *   onDateChange={setDate}
 *   placeholder="Select a date"
 * />
 *
 * // Uncontrolled usage
 * <DatePicker
 *   onDateChange={(date) => console.log("Selected:", date)}
 * />
 * ```
 */
export interface DatePickerProps {
  /** The current date value. When provided, the component operates in controlled mode. */
  date?: Date;
  /** Callback fired when the date changes, either via text input or calendar selection. */
  onDateChange?: (date: Date | undefined) => void;
  /** Placeholder text for the input field. Defaults to "Type or select a date". */
  placeholder?: string;
  /** Additional CSS classes to apply to the container div. */
  className?: string;
  /** Whether the picker is disabled. Disables both the input and calendar button. */
  disabled?: boolean;
  /** The first selectable month in the calendar dropdown. */
  startMonth?: Date;
  /** The last selectable month in the calendar dropdown. */
  endMonth?: Date;
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
export function DatePicker({
  date: controlledDate,
  onDateChange,
  placeholder = "Type or select a date",
  className,
  disabled,
  startMonth,
  endMonth,
}: DatePickerProps = {}) {
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState(() =>
    formatDate(controlledDate),
  );

  // Use controlled date if provided, otherwise use internal state
  const date = controlledDate !== undefined ? controlledDate : internalDate;

  const [month, setMonth] = useState<Date | undefined>(date || undefined);

  // Update input value when date changes externally
  useEffect(() => {
    if (controlledDate !== undefined) {
      setInputValue(formatDate(controlledDate));
      setMonth(controlledDate || new Date());
    }
  }, [controlledDate]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (controlledDate === undefined) {
      setInternalDate(newDate);
    }
    onDateChange?.(newDate);
    setInputValue(formatDate(newDate));
    if (newDate) {
      setMonth(newDate);
    }
  };

  const handleInputChange = (newValue: string) => {
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
    } else {
      // If parsing fails, revert to the current date's formatted value
      setInputValue(formatDate(date));
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    handleDateChange(selectedDate);
  };

  return (
    <div className={`relative ${className || ""}`}>
      <Input
        disabled={disabled}
        id="date"
        value={inputValue}
        placeholder={placeholder}
        className="pr-10"
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={handleInputBlur}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          } else if (e.key === "Enter") {
            e.preventDefault();
            handleInputBlur();
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            size="icon"
            className="absolute rounded-md top-1/2 right-2 size-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={disabled}
          >
            <CalendarIcon className="size-4" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            startMonth={startMonth}
            endMonth={endMonth}
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(selectedDate) => {
              handleDateSelect(selectedDate);
              setOpen(false);
            }}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
