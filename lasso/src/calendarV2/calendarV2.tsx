"use client";

import { CaretDown, CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subDays,
} from "date-fns";
import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DateRange,
  type DayButton,
} from "react-day-picker";

import { Button, buttonVariants } from "../button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/select";
import { Text } from "../text/text";
import { cn } from "../utils/cn";

type PresetKey =
  | "this-month"
  | "last-30-days"
  | "last-60-days"
  | "last-90-days"
  | "custom";

interface DatePreset {
  key: PresetKey;
  label: string;
  getRange: () => DateRange;
}

const datePresets: DatePreset[] = [
  {
    key: "this-month",
    label: "This month",
    getRange: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    key: "last-30-days",
    label: "Last 30 days",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    }),
  },
  {
    key: "last-60-days",
    label: "Last 60 days",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 59)),
      to: endOfDay(new Date()),
    }),
  },
  {
    key: "last-90-days",
    label: "Last 90 days",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 89)),
      to: endOfDay(new Date()),
    }),
  },
  {
    key: "custom",
    label: "Custom",
    getRange: () => ({ from: undefined, to: undefined }),
  },
];

interface CalendarV2BaseProps {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  /** Enable preset date range side menu */
  withPresets?: boolean;
  /** The currently active preset key (only used when withPresets is true) */
  activePreset?: PresetKey;

  onPresetChange?: (preset: PresetKey) => void;
}

type CalendarV2Props = CalendarV2BaseProps &
  React.ComponentProps<typeof DayPicker>;

function CalendarV2(props: CalendarV2Props) {
  const {
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    buttonVariant = "ghost",
    formatters,
    components,
    withPresets = false,
    activePreset: controlledPreset,
    onPresetChange,
    numberOfMonths,
    ...restProps
  } = props;
  const [internalPreset, setInternalPreset] = React.useState<PresetKey>(
    controlledPreset ?? "last-30-days",
  );
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >(() => {
    if (!withPresets) return undefined;
    const preset = datePresets.find(
      (p) => p.key === (controlledPreset ?? "last-30-days"),
    );
    return preset?.getRange();
  });

  const currentPreset = controlledPreset ?? internalPreset;
  const isRangeMode = restProps.mode === "range" || withPresets;
  const rangeSelected = isRangeMode
    ? ((restProps as { selected?: DateRange }).selected as
        | DateRange
        | undefined)
    : undefined;
  const currentRange = rangeSelected ?? internalRange;

  const handlePresetClick = (preset: DatePreset) => {
    if (onPresetChange) {
      onPresetChange(preset.key);
    } else {
      setInternalPreset(preset.key);
    }

    if (preset.key !== "custom") {
      const range = preset.getRange();
      const onSelect = (
        restProps as { onSelect?: (range: DateRange | undefined) => void }
      ).onSelect;
      if (isRangeMode && onSelect) {
        onSelect(range);
      } else {
        setInternalRange(range);
      }
    }
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    // When user manually selects dates, switch to custom mode
    if (onPresetChange) {
      onPresetChange("custom");
    } else {
      setInternalPreset("custom");
    }

    const onSelect = (
      restProps as { onSelect?: (range: DateRange | undefined) => void }
    ).onSelect;
    if (isRangeMode && onSelect) {
      onSelect(range);
    } else {
      setInternalRange(range);
    }
  };

  const defaultClassNames = getDefaultClassNames();

  const dayPickerProps = {
    showOutsideDays,
    numberOfMonths: withPresets ? (numberOfMonths ?? 2) : numberOfMonths,
    ...restProps,
    ...(withPresets
      ? {
          mode: "range" as const,
          selected: currentRange,
          onSelect: handleRangeSelect,
        }
      : {}),
  };

  const calendarElement = (
    <DayPicker
      {...(dayPickerProps as React.ComponentProps<typeof DayPicker>)}
      className={cn(
        "bg-white group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        !withPresets && className,
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
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday,
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number,
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          restProps.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day,
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
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
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(rootClassName)}
              {...rootProps}
            />
          );
        },
        Chevron: ({
          className: chevronClassName,
          orientation,
          ...chevronProps
        }) => {
          if (orientation === "left") {
            return (
              <CaretLeft
                className={cn("size-4", chevronClassName)}
                {...chevronProps}
              />
            );
          }

          if (orientation === "right") {
            return (
              <CaretRight
                className={cn("size-4", chevronClassName)}
                {...chevronProps}
              />
            );
          }

          return (
            <CaretDown
              className={cn("size-4", chevronClassName)}
              {...chevronProps}
            />
          );
        },
        DayButton: CalendarV2DayButton,
        WeekNumber: ({ children, ...weekNumberProps }) => {
          return (
            <td {...weekNumberProps}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
    />
  );

  if (!withPresets) {
    return calendarElement;
  }

  return (
    <div
      data-slot="calendar-with-presets"
      className={cn(
        "flex flex-col overflow-clip rounded-sm bg-white md:flex-row md:items-start",
        className,
      )}
    >
      {/* Mobile dropdown - visible on small screens */}
      <div className="border-b border-border p-3 md:hidden">
        <Select
          value={currentPreset}
          onValueChange={(value: PresetKey) => {
            const preset = datePresets.find((p) => p.key === value);
            if (preset) {
              handlePresetClick(preset);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            {datePresets.map((preset) => (
              <SelectItem key={preset.key} value={preset.key}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop side menu - hidden on mobile */}
      <div className="hidden w-[130px] shrink-0 flex-col gap-1 self-stretch bg-white px-2 py-4 md:flex">
        {datePresets.map((preset) => (
          <button
            key={preset.key}
            onClick={() => handlePresetClick(preset)}
            className={cn(
              "flex h-7 w-full items-center rounded-sm px-2 text-foreground transition-colors hover:bg-neutral-300",
              currentPreset === preset.key && "bg-neutral-300",
            )}
          >
            <Text variant="base-sm" weight="medium" as="span">
              {preset.label}
            </Text>
          </button>
        ))}
      </div>

      {/* Calendar */}
      {calendarElement}
    </div>
  );
}

function CalendarV2DayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
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
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { CalendarV2, CalendarV2DayButton, datePresets };
export type { PresetKey, DatePreset, CalendarV2Props };
