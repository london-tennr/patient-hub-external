# Calendar Component

## Overview

The Calendar component is a customizable date picker interface that allows users to view, navigate, and select dates. Built on top of [react-day-picker](https://react-day-picker.js.org/), it provides an accessible, styled implementation for the Tennr design system with support for single date, date range, and multiple date selection modes.

## What It Is

The Calendar component consists of two main parts:

- **Calendar**: The main calendar component that renders the date picker interface
- **CalendarDayButton**: An internal component that renders individual day cells with proper styling and selection states

### Key Features

- **Multiple Selection Modes**: Supports single date, date range, and multiple date selection
- **Accessible**: Built on react-day-picker with full keyboard navigation and ARIA support
- **Responsive**: Adapts layout for mobile and desktop with flexible column arrangements
- **Customizable**: Extensive styling options through className props and custom components
- **Navigation Controls**: Built-in month/year navigation with dropdown support
- **Date Constraints**: Support for disabled dates, min/max dates, and custom validation
- **Consistent Styling**: Follows Tennr design system with Phosphor icons and consistent theming

## When to Use

Use the Calendar component when you need to:

1. **Date Selection**: Allow users to select dates for forms, filters, or scheduling

   - Appointment booking
   - Event scheduling
   - Date-based filtering
   - Form date inputs

2. **Date Range Selection**: Enable users to select a start and end date

   - Date range filters
   - Booking periods
   - Report date ranges
   - Availability windows

3. **Multiple Date Selection**: Allow users to select multiple individual dates

   - Multi-day event planning
   - Selecting multiple appointment slots
   - Batch date operations

4. **Inline Date Display**: Show a calendar as part of the UI rather than in a popover

   - Dashboard widgets
   - Scheduling interfaces
   - Calendar views

5. **Custom Date Interactions**: Need fine-grained control over date selection behavior

   - Disable specific dates (weekends, holidays)
   - Limit date ranges
   - Custom date rendering

## When NOT to Use

Avoid using the Calendar component when:

1. **Simple Date Input**: A basic text input with date format validation suffices

   - Quick date entry where users know the exact date
   - Forms where space is limited
   - Use an `Input` with date validation instead

2. **Date/Time Selection**: You need both date and time selection

   - Meeting schedulers with specific times
   - Appointment booking with time slots
   - Use a DateTimePicker component instead

3. **Relative Date Selection**: Users typically select relative dates rather than specific ones

   - "Last 7 days", "This month" type filters
   - Use a dropdown or button group instead

4. **Large Date Ranges**: Selecting dates spanning many months or years

   - Birth date selection (use year/month dropdowns)
   - Historical date entry
   - Consider a specialized date input

5. **Read-Only Display**: Just displaying a date without selection

   - Use formatted text display instead
   - Consider a simple date badge or label

## Usage Example

### Single Date Selection

```tsx
import { useState } from "react";

import { Calendar } from "@tennr/lasso/calendar";

function MyComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-sm border"
    />
  );
}
```

### Date Range Selection

```tsx
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@tennr/lasso/calendar";

function MyComponent() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={(range) =>
        setDateRange(range || { from: undefined, to: undefined })
      }
      className="rounded-sm border"
    />
  );
}
```

### Multiple Date Selection

```tsx
import { useState } from "react";

import { Calendar } from "@tennr/lasso/calendar";

function MyComponent() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <Calendar
      mode="multiple"
      selected={selectedDates}
      onSelect={(dates) => setSelectedDates(dates || [])}
      className="rounded-sm border"
    />
  );
}
```

### With Disabled Dates

```tsx
import { useState } from "react";

import { Calendar } from "@tennr/lasso/calendar";

function MyComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Disable weekends
  const disabledDays = [{ dayOfWeek: [0, 6] }];

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={disabledDays}
      className="rounded-sm border"
    />
  );
}
```

## Props Reference

### Calendar

Extends all props from `react-day-picker`'s `DayPicker` component, plus:

- `className`: `string` - Additional CSS classes for the calendar container
- `classNames`: `object` - Override specific internal element classes
- `showOutsideDays`: `boolean` - Whether to show days from adjacent months (default: `true`)
- `captionLayout`: `"label" | "dropdown" | "dropdown-months" | "dropdown-years"` - Caption display style (default: `"label"`)
- `buttonVariant`: `"default" | "ghost" | "outline" | ...` - Variant for navigation buttons (default: `"ghost"`)
- `fitContainer`: `boolean` - Whether day cells should expand to fill container width (default: `false`)
- `formatters`: `object` - Custom date formatting functions
- `components`: `object` - Override internal components
- `startMonth`: `Date` - Earliest month that can be navigated to
- `endMonth`: `Date` - Latest month that can be navigated to

### Common DayPicker Props

- `mode`: `"single" | "range" | "multiple"` - Selection mode
- `selected`: `Date | DateRange | Date[]` - Currently selected date(s)
- `onSelect`: `(date) => void` - Callback when selection changes
- `disabled`: `Matcher | Matcher[]` - Dates that cannot be selected
- `defaultMonth`: `Date` - Initial month to display
- `numberOfMonths`: `number` - Number of months to display side by side
- `fromDate`: `Date` - Earliest selectable date
- `toDate`: `Date` - Latest selectable date

### CalendarDayButton

Internal component for rendering day cells:

- `day`: `CalendarDay` - The day data object from react-day-picker
- `modifiers`: `DayModifiers` - Selection and state modifiers
- `fitContainer`: `boolean` - Whether to expand to fill container width
- `className`: `string` - Additional CSS classes

## Styling

The Calendar uses CSS custom properties for consistent sizing:

- `--cell-size`: Controls the size of day cells (default: `--spacing(8)`)

The component automatically adapts styling when placed inside:

- `[data-slot=card-content]` - Removes background and border for card contexts
- `[data-slot=popover-content]` - Removes background, border, and shadow for popover contexts

## Accessibility

The Calendar component is fully accessible:

- **Keyboard Navigation**: Arrow keys to navigate days, Page Up/Down for months
- **ARIA Labels**: Properly labeled for screen readers
- **Focus Management**: Automatic focus handling for selected and focused states
- **Disabled States**: Clear visual and semantic indication of disabled dates
- **RTL Support**: Built-in right-to-left language support

## Related Components

- For date selection in forms, consider using the `DatePicker` component which wraps Calendar in a popover
- For simple date display, use formatted text with `date-fns`
- For date/time selection, use a dedicated DateTimePicker component
