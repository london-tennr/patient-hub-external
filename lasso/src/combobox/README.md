# Combobox Component

## Overview

The Combobox component is a searchable dropdown selection component that combines a text input with a list of options. It allows users to filter options by typing and supports both single and multiple selection modes. It's built on top of the Command component (which uses cmdk) and Popover component, providing a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Combobox is a self-contained component that:

- **Searchable Selection**: Combines a trigger button with a filterable dropdown list
- **Single & Multiple Selection**: Supports selecting one option or multiple options
- **Custom Rendering**: Allows custom rendering of options with icons, descriptions, etc.
- **Controlled Search**: Optionally allows external control of the search input value
- **Ghost Mode**: Offers an alternative minimal styling variant

### Key Features

- **Accessible**: Built on Radix UI primitives (Popover) and cmdk (Command), following WAI-ARIA design patterns
- **Searchable**: Built-in search/filter functionality with customizable placeholder text
- **Flexible Variants**: Single selection or multiple selection modes
- **Custom Option Rendering**: Render options with custom layouts, icons, and additional metadata
- **Clear All**: Multiple selection mode includes a clear all button (optional)
- **Max Display**: Configurable number of selected items to show before collapsing to a count
- **Ghost Mode**: Minimal styling variant for inline contexts
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled search state

## When to Use

Use the Combobox component when you need to:

1. **Searchable Selection**: Allow users to filter through a large list of options

   - Country/language selection
   - User/team member selection
   - Framework/technology selection
   - File selection from a long list

2. **Multiple Selection**: Allow users to select multiple options from a list

   - Tag selection
   - Multi-select filters
   - Assigning multiple team members
   - Selecting multiple categories

3. **Custom Option Display**: Show rich option content with icons, descriptions, or metadata

   - Team members with avatars and roles
   - Technologies with category labels
   - Products with prices and images
   - Files with type indicators

4. **Compact UI with Search**: Need a space-efficient control that expands to show searchable options

   - Toolbars
   - Filter bars
   - Compact forms
   - Dense data tables

5. **Large Option Lists**: When you have many options that benefit from filtering

   - More than 10-15 options
   - Dynamic/loaded options
   - Hierarchical option groups

## When NOT to Use

Avoid using the Combobox component when:

1. **Few Options**: For 5 or fewer static options, use a simple Select component

   - Yes/No choices
   - Small enum selections
   - Simple status selectors
   - Gender selection

2. **No Search Needed**: If users don't need to search/filter, use a simpler Select or RadioGroup

   - Small option sets
   - Familiar options that don't need filtering
   - Options users can quickly scan

3. **Free-form Input**: If users can enter values not in the list, consider an Input with autocomplete or a CreatableCombobox

   - Email addresses
   - Custom tags
   - New category creation
   - Free-text with suggestions

4. **Complex Hierarchical Data**: For deeply nested hierarchies, consider a TreeView or nested menus

   - File system navigation
   - Organization structures
   - Deeply nested categories

5. **Inline Editing**: For inline text editing with suggestions, use an inline autocomplete pattern

   - Mention systems (@user)
   - Code completion
   - Inline tag insertion

6. **Critical Single Actions**: For important single actions, use dedicated buttons

   - Submit actions
   - Navigation actions
   - Destructive operations

## Usage Example

### Single Selection

```tsx
import { useState } from "react";

import { Combobox, type ComboboxOption } from "@tennr/lasso/combobox";

const frameworks: ComboboxOption[] = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

function MyComponent() {
  const [value, setValue] = useState<string>("");

  return (
    <Combobox
      options={frameworks}
      value={value}
      onValueChange={setValue}
      placeholder="Select framework..."
      searchPlaceholder="Search frameworks..."
      className="w-[250px]"
    />
  );
}
```

### Multiple Selection

```tsx
import { useState } from "react";

import { Combobox, type ComboboxOption } from "@tennr/lasso/combobox";

const languages: ComboboxOption[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
];

function MyComponent() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <Combobox
      variant="multiple"
      options={languages}
      value={values}
      onValueChange={setValues}
      placeholder="Select languages..."
      searchPlaceholder="Search languages..."
      maxDisplay={2}
      className="w-[300px]"
    />
  );
}
```

### Custom Option Rendering

```tsx
import { useState } from "react";

import { Combobox, type ComboboxOption } from "@tennr/lasso/combobox";

interface TeamMember extends ComboboxOption {
  role: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    value: "john",
    label: "John Doe",
    role: "Frontend Developer",
    avatar: "👨‍💻",
  },
  {
    value: "jane",
    label: "Jane Smith",
    role: "Backend Developer",
    avatar: "👩‍💻",
  },
];

function MyComponent() {
  const [value, setValue] = useState<string>("");

  return (
    <Combobox
      options={teamMembers}
      value={value}
      onValueChange={setValue}
      placeholder="Select team member..."
      renderOption={(member) => (
        <div className="flex items-center gap-2">
          <span>{member.avatar}</span>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{member.label}</span>
            <span className="text-xs text-muted-foreground">{member.role}</span>
          </div>
        </div>
      )}
    />
  );
}
```

### Ghost Mode

```tsx
<Combobox
  options={frameworks}
  value={value}
  onValueChange={setValue}
  placeholder="Select..."
  ghost={true}
/>
```

### Controlled Search

```tsx
const [value, setValue] = useState<string>("");
const [search, setSearch] = useState("");

<Combobox
  options={filteredOptions}
  value={value}
  onValueChange={setValue}
  searchValue={search}
  onSearchValueChange={setSearch}
  shouldFilter={false} // Disable internal filtering when using controlled search
/>;
```

## Props Reference

### ComboboxOption

The base interface for combobox options:

- `value`: `string` - Unique identifier for the option (required)
- `label`: `string` - Display text for the option (required)

You can extend this interface to add custom properties for use with `renderOption`.

### Common Props (Single & Multiple)

- `options`: `T[]` - Array of options to display (required). Must extend `ComboboxOption`
- `placeholder`: `string` - Placeholder text when no option is selected (default: "Select option...")
- `searchPlaceholder`: `string` - Placeholder text for the search input (default: "Search options...")
- `emptyMessage`: `string` - Message shown when no options match the search (default: "No options found")
- `className`: `string` - Additional CSS classes for the trigger element
- `disabled`: `boolean` - Whether the combobox is disabled (default: false)
- `renderOption`: `(option: T) => React.ReactNode` - Custom render function for options
- `isSearchable`: `boolean` - Whether to show the search input (default: true)
- `ghost`: `boolean` - Use ghost/minimal styling variant (default: false)
- `description`: `string` - Optional description shown as a group heading
- `searchValue`: `string` - Controlled search input value
- `onSearchValueChange`: `(value: string) => void` - Handler for controlled search changes
- `shouldFilter`: `boolean` - Whether to filter options based on search (default: true)
- `container`: `HTMLElement` - Portal container for the popover

### Single Selection Props

- `variant`: `"single"` (optional, this is the default)
- `value`: `string` - Currently selected value
- `onValueChange`: `(value: string) => void` - Handler when selection changes

### Multiple Selection Props

- `variant`: `"multiple"` (required for multi-select)
- `value`: `string[]` - Array of currently selected values
- `onValueChange`: `(value: string[]) => void` - Handler when selection changes
- `maxDisplay`: `number` - Max number of selected items to show before collapsing (default: 3)
- `showClearAll`: `boolean` - Show clear all button when items are selected (default: true)

## Accessibility

The Combobox component is fully accessible out of the box:

- Keyboard navigation support (Arrow keys to navigate, Enter to select, Escape to close)
- ARIA attributes automatically managed by underlying Radix UI and cmdk primitives
- Focus management handled correctly
- Screen reader announcements for state changes
- Type-ahead search for quick option finding
- Clear button is properly labeled for screen readers

## Related Components

- For simple dropdowns without search, use a `Select` component
- For single/multiple choice without dropdown, use `RadioGroup` or `Checkbox` components
- For command palette style interfaces, use the `Command` component directly
- For autocomplete text input, consider extending Combobox or using an Input with suggestions
