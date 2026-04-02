"use client";

import { CaretDown, CaretLeft, CaretRight } from "@phosphor-icons/react";
import * as React from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { Button, buttonVariants } from "../button/button";
import { cn } from "../utils/cn";

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
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  fitContainer = false,
  formatters,
  components,
  startMonth,
  endMonth,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  fitContainer?: boolean;
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      startMonth={startMonth}
      endMonth={endMonth}
      className={cn(
        "bg-white group/calendar p-3 border border-border rounded-sm shadow-sm [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent [[data-slot=popover-content]_&]:border-none [[data-slot=popover-content]_&]:shadow-none [[data-radix-popper-content-wrapper]_&]:bg-transparent [[data-radix-popper-content-wrapper]_&]:border-none [[data-radix-popper-content-wrapper]_&]:shadow-none",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months,
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 !p-0 select-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 !p-0 select-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium lasso:wght-medium leading-5 justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-border shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-sm",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none font-medium lasso:wght-medium",
          captionLayout === "label"
            ? "text-sm leading-5"
            : "rounded-sm pl-2 pr-1 flex items-center gap-1 text-sm leading-5 h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-sm flex-1 font-normal lasso:wght-normal text-xs leading-4 select-none",
          fitContainer && "w-full",
          defaultClassNames.weekday,
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-xs leading-4 select-none text-muted-foreground font-normal lasso:wght-normal",
          defaultClassNames.week_number,
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          fitContainer && "w-full",
          defaultClassNames.day,
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-muted-foreground rounded-sm data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <CaretLeft className={cn("size-4", className)} {...props} />;
          }

          if (orientation === "right") {
            return (
              <CaretRight className={cn("size-4", className)} {...props} />
            );
          }

          return <CaretDown className={cn("size-4", className)} {...props} />;
        },
        DayButton: (props) => CalendarDayButton({ ...props, fitContainer }),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

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
function CalendarDayButton({
  className,
  day,
  modifiers,
  fitContainer,
  ...props
}: React.ComponentProps<typeof DayButton> & { fitContainer?: boolean }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "rounded-sm data-[selected-single=true]:bg-brand-peat data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-foreground data-[range-start=true]:bg-brand-peat data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-brand-peat data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 hover:bg-accent/50 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal lasso:wght-normal text-sm leading-5 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-sm data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-sm data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        fitContainer && "w-full",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
