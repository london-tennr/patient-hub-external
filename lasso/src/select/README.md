# Select Component

## Overview

The Select component is a dropdown picker that allows users to choose one option from a predefined list. It provides a trigger button that opens a floating list of options, with built-in keyboard navigation and accessibility support. Built on top of Radix UI's Select primitive, it offers a consistent, styled implementation for the Tennr design system.

## What It Is

The Select component consists of several sub-components that work together:

- **Select** (root): The container that manages the select state and behavior
- **SelectTrigger**: The button that opens the dropdown and displays the selected value
- **SelectValue**: The placeholder or selected value displayed in the trigger
- **SelectContent**: The floating container that holds the list of options
- **SelectItem**: An individual option within the dropdown
- **SelectGroup**: A grouping container for organizing related items
- **SelectLabel**: A label for a group of items
- **SelectSeparator**: A visual divider between items or groups
- **SelectScrollUpButton**: A button to scroll up in long lists
- **SelectScrollDownButton**: A button to scroll down in long lists

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Keyboard Navigation**: Full keyboard support including typeahead search
- **Animated**: Smooth open/close animations by default
- **Size Variants**: Supports `sm` and `default` sizes
- **Customizable**: Accepts className props for styling customization
- **Icons Support**: Can display icons alongside option text
- **Scrollable**: Built-in scroll buttons for long option lists

## When to Use

Use the Select component when you need to:

1. **Single Selection from Predefined Options**: Allow users to choose one option from a list

   - Form fields (country, state, category)
   - Settings selections
   - Filter controls
   - Sort options

2. **Space-Efficient Input**: Replace multiple radio buttons with a compact dropdown

   - When there are more than 5-7 options
   - When screen real estate is limited
   - Mobile-friendly forms

3. **Structured Option Lists**: Present options in an organized, grouped manner

   - Categorized selections
   - Grouped settings
   - Hierarchical choices

4. **Consistent Form Fields**: Match other form controls in appearance and behavior

   - User profile forms
   - Application settings
   - Data entry screens

## When NOT to Use

Avoid using the Select component when:

1. **Few Options (2-3)**: Consider using radio buttons or a segmented control instead

   - Yes/No choices (use a Switch)
   - Binary options (use Toggle or Radio)
   - 2-3 clearly visible options (use RadioGroup)

2. **Multiple Selection**: When users need to select multiple items

   - Multi-select scenarios (use a Combobox with multi-select)
   - Tag selection (use a multi-select component)
   - Checkboxes in a list

3. **Searchable/Filterable Lists**: When users need to search through many options

   - Long lists (100+ items) that benefit from search
   - Autocomplete scenarios (use Combobox)
   - Free-form input with suggestions

4. **Complex Option Content**: When options need complex layouts or interactions

   - Options with secondary actions
   - Options with detailed previews
   - Interactive option content

5. **Navigation**: For navigation purposes, use dedicated navigation components

   - Site navigation (use Navigation Menu)
   - Page navigation (use Breadcrumb or Tabs)
   - Action menus (use DropdownMenu)

6. **Quick Actions**: For triggering actions rather than selecting values

   - Context menus (use ContextMenu)
   - Action menus (use DropdownMenu)
   - Command palettes (use Command)

## Usage Example

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tennr/lasso/select";

function MyComponent() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Example with Controlled Value

```tsx
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tennr/lasso/select";

function ControlledSelect() {
  const [value, setValue] = useState("");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Example with Icons

```tsx
import { Gear, Laptop, User } from "@phosphor-icons/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tennr/lasso/select";

function SelectWithIcons() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a tool" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="user">
          <div className="flex items-center gap-2">
            <User className="size-4" weight="light" />
            User Management
          </div>
        </SelectItem>
        <SelectItem value="settings">
          <div className="flex items-center gap-2">
            <Gear className="size-4" weight="light" />
            Settings
          </div>
        </SelectItem>
        <SelectItem value="devices">
          <div className="flex items-center gap-2">
            <Laptop className="size-4" weight="light" />
            Devices
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Example with Groups

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@tennr/lasso/select";

function GroupedSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Time (EST)</SelectItem>
          <SelectItem value="cst">Central Time (CST)</SelectItem>
          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
```

## Props Reference

### Select

- `value`: `string` - Controlled value
- `defaultValue`: `string` - Default value for uncontrolled usage
- `onValueChange`: `(value: string) => void` - Change handler
- `open`: `boolean` - Controlled open state
- `onOpenChange`: `(open: boolean) => void` - Open state change handler
- `disabled`: `boolean` - Whether the select is disabled
- `name`: `string` - Name attribute for form submission
- `required`: `boolean` - Whether a value is required

### SelectTrigger

- `size`: `"sm" | "default"` - Size variant (default: `"default"`)
- `className`: `string` - Additional CSS classes

### SelectValue

- `placeholder`: `string` - Text to display when no value is selected

### SelectContent

- `position`: `"popper" | "item-aligned"` - Positioning mode (default: `"popper"`)
- `className`: `string` - Additional CSS classes
- `side`: `"top" | "right" | "bottom" | "left"` - Preferred side
- `sideOffset`: `number` - Distance from trigger
- `align`: `"start" | "center" | "end"` - Alignment relative to trigger

### SelectItem

- `value`: `string` - Unique value for the item (required)
- `disabled`: `boolean` - Whether the item is disabled
- `className`: `string` - Additional CSS classes

### SelectGroup

- Groups related items together for better organization

### SelectLabel

- `className`: `string` - Additional CSS classes

### SelectSeparator

- `className`: `string` - Additional CSS classes

## Accessibility

The Select component is fully accessible out of the box:

- **Keyboard Navigation**: Arrow keys to navigate, Enter/Space to select, Escape to close
- **Typeahead**: Type to jump to matching options
- **ARIA Attributes**: Automatically managed by Radix UI
- **Focus Management**: Proper focus trapping and restoration
- **Screen Reader Support**: Announces state changes and selected values

## Related Components

- For multiple selection, use a Combobox with multi-select capability
- For searchable lists with many options, use a Combobox
- For triggering actions (not selecting values), use a DropdownMenu
- For binary choices, use a Switch or RadioGroup
- For inline editing, consider an inline select or editable text
