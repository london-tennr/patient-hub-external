# DatePicker Component

## Overview

The DatePicker component allows users to select a date through two input methods: typing directly into a text input with natural language parsing, or selecting from a calendar popover. It's designed for user-friendly date entry with intelligent date parsing powered by chrono-node and a visually intuitive calendar interface.

## What It Is

The DatePicker is a compound component that combines:

- **Text Input**: A text field that accepts natural language date input (e.g., "today", "tomorrow", "next Friday")
- **Calendar Popover**: A dropdown calendar for visual date selection
- **Natural Language Parsing**: Powered by chrono-node for intelligent date interpretation

### Key Features

- **Natural Language Support**: Understands inputs like "today", "in 3 days", "next week", "Jan 15", etc.
- **Calendar Picker**: Visual calendar interface with month/year navigation
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **Keyboard Navigation**: Open calendar with ArrowDown, submit input with Enter
- **Time Preservation**: When parsing dates, preserves the original time component if present
- **Month/Year Constraints**: Optional `startMonth` and `endMonth` props to limit selectable range

## When to Use

Use the DatePicker component when you need to:

1. **Date Selection**: Allow users to select a specific date

   - Event scheduling
   - Appointment booking
   - Task due dates
   - Report date ranges
   - Deadline setting

2. **Flexible Input**: Support users who prefer typing over clicking

   - Power users who know their dates
   - Quick date entry scenarios
   - Accessibility considerations
   - Mobile-friendly text input

3. **Natural Language Dates**: Accept intuitive date expressions

   - Relative dates ("tomorrow", "next week")
   - Common date formats ("Jan 15", "2/14/2023")
   - Contextual dates ("end of month", "this weekend")

4. **Form Integration**: Collect date input as part of forms

   - Registration forms
   - Booking systems
   - Filter interfaces
   - Data entry applications

## When NOT to Use

Avoid using the DatePicker component when:

1. **Date Ranges**: You need to select a start and end date as a range

   - Use a DateRangePicker component
   - Or two separate DatePicker instances with validation

2. **Time Selection**: You need to capture time along with the date

   - Use a DateTimePicker component
   - Or combine with a separate TimePicker

3. **Recurring Dates**: You need to capture recurring date patterns

   - Use a specialized recurring date selector
   - Consider a calendar with multi-select

4. **Display Only**: You only need to display a date, not accept input

   - Use a simple formatted text display
   - Or a read-only Input component

5. **Inline Calendar**: You need an always-visible calendar without input field

   - Use the Calendar component directly
   - Consider a full calendar view

6. **Approximate Dates**: You only need month/year selection

   - Use a MonthPicker component
   - Or a simplified date selector

## Usage Example

```tsx
import { DatePicker } from "@tennr/lasso/date-picker";

function MyComponent() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      placeholder="Select a date"
    />
  );
}
```

### Uncontrolled Usage

```tsx
import { DatePicker } from "@tennr/lasso/date-picker";

function MyComponent() {
  return (
    <DatePicker
      onDateChange={(date) => console.log("Selected:", date)}
      placeholder="Type or select a date"
    />
  );
}
```

### With Date Constraints

```tsx
import { DatePicker } from "@tennr/lasso/date-picker";

function MyComponent() {
  return (
    <DatePicker
      startMonth={new Date(2024, 0, 1)} // January 2024
      endMonth={new Date(2024, 11, 31)} // December 2024
      placeholder="Select a date in 2024"
    />
  );
}
```

### With FormBuilder

```tsx
import { useForm } from "react-hook-form";

import {
  FormBuilder,
  SubmitButton,
  type FieldConfig,
} from "@tennr/lasso/form-builder";

function MyComponent() {
  const form = useForm({
    defaultValues: {
      eventName: "",
      eventDate: undefined,
    },
  });

  const fieldConfig: Record<string, FieldConfig> = {
    eventName: {
      label: "Event Name",
      placeholder: "Enter event name",
      fieldType: "Input",
    },
    eventDate: {
      label: "Event Date",
      fieldType: "DatePicker",
    },
  };

  return (
    <FormBuilder
      form={form}
      onSubmit={(data) => console.log(data)}
      fieldConfig={fieldConfig}
    >
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormBuilder>
  );
}
```

## Props Reference

### DatePickerProps

- `date`: `Date | undefined` - The current date value (for controlled usage)
- `onDateChange`: `(date: Date | undefined) => void` - Callback when the date changes
- `placeholder`: `string` - Placeholder text for the input (default: "Type or select a date")
- `className`: `string` - Additional CSS classes for the container
- `disabled`: `boolean` - Whether the picker is disabled
- `startMonth`: `Date` - The first selectable month in the calendar
- `endMonth`: `Date` - The last selectable month in the calendar

## Supported Date Formats

The DatePicker accepts a wide variety of date formats thanks to chrono-node:

### Relative Dates

- "today", "yesterday", "tomorrow"
- "in 2 days", "in a week", "in 3 months"
- "last week", "next month", "next year"

### Month and Day

- "Jan 15", "March 1", "December 25"
- "2/14", "12/25", "1/1"

### Full Dates

- "Jan 15 2024", "March 1, 2025"
- "2/14/2024", "12-25-2023"
- "2024-01-15" (ISO format)

### Month Only

- "January", "Jan", "December"
- Defaults to the 1st of the specified month

### Contextual Expressions

- "next Friday", "this weekend"
- "end of month", "beginning of year"
- "Christmas", "New Year"

## Keyboard Navigation

- **ArrowDown**: Opens the calendar popover when input is focused
- **Enter**: Parses and applies the typed date
- **Tab**: Moves focus between input and calendar button
- **Escape**: Closes the calendar popover (when open)

## Accessibility

The DatePicker component includes accessibility features:

- Labeled input field with proper `id` association
- Screen reader text for the calendar button
- Keyboard navigable calendar interface
- Focus management when opening/closing popover
- Proper ARIA attributes on popover elements

## Related Components

- For selecting a date range, use two DatePicker instances with validation
- For time selection, consider combining with a TimePicker component
- For always-visible calendar display, use the Calendar component directly
- For form integration, use with FormBuilder component
