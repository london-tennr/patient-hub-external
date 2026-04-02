import * as React from "react";
import { DayButton, DayPicker } from "react-day-picker";
import { Button } from "../button/button";
/**
 * Calendar Component
 *
 * A customizable date picker interface that allows users to view, navigate, and
 * select dates. Built on top of react-day-picker, it provides an accessible and
 * styled implementation for the Tennr design system with support for single date,
 * date range, and multiple date selection modes.
 *
 * @see [react-day-picker](https://react-day-picker.js.org/)
 *
 * @see [Lasso Calendar README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/calendar/README.md)
 *
 * @example
 * ```tsx
 * // Single date selection
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 *
 * // Date range selection
 * <Calendar
 *   mode="range"
 *   selected={dateRange}
 *   onSelect={setDateRange}
 * />
 * ```
 *
 * @param className - Additional CSS classes for the calendar container
 * @param classNames - Override specific internal element classes
 * @param showOutsideDays - Whether to show days from adjacent months (default: true)
 * @param captionLayout - Caption display style: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
 * @param buttonVariant - Variant for navigation buttons (default: "ghost")
 * @param fitContainer - Whether day cells should expand to fill container width
 * @param formatters - Custom date formatting functions
 * @param components - Override internal components
 * @param startMonth - Earliest month that can be navigated to
 * @param endMonth - Latest month that can be navigated to
 */
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, fitContainer, formatters, components, startMonth, endMonth, ...props }: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
    fitContainer?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * CalendarDayButton - Internal component that renders individual day cells within the Calendar.
 *
 * Handles the visual styling for various day states including selected, range start/end,
 * range middle, focused, and disabled states. Automatically manages focus when the day
 * receives keyboard focus.
 *
 * @param className - Additional CSS classes to apply to the day button
 * @param day - The day data object from react-day-picker containing date information
 * @param modifiers - Selection and state modifiers (selected, range_start, range_end, etc.)
 * @param fitContainer - Whether the button should expand to fill its container width
 */
declare function CalendarDayButton({ className, day, modifiers, fitContainer, ...props }: React.ComponentProps<typeof DayButton> & {
    fitContainer?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Calendar, CalendarDayButton };
//# sourceMappingURL=calendar.d.ts.map