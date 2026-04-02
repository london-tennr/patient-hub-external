# CommandPalette Component

## Overview

The CommandPalette component is a powerful, searchable dropdown interface for selecting from a list of options. It combines a trigger button with a popover containing a searchable list, optional filter categories, and keyboard shortcuts. It's ideal for quick navigation, task selection, and any scenario where users need to search and select from a large set of options efficiently.

## What It Is

The CommandPalette component consists of several sub-components that work together:

- **CommandPalette** (main): The complete component with trigger button and popover
- **CommandPalettePopover**: The popover content with search, filters, and options list
- **CommandPaletteTrigger**: The customizable trigger button
- **CommandPaletteKeyboardShortcut**: The keyboard shortcut hints displayed at the bottom

### Key Features

- **Searchable**: Built-in search input with deferred filtering for performance
- **Filterable**: Support for multiple filter categories with various filter types (command, checkbox, slider)
- **Cascading Filters**: Filters can depend on other filter selections for hierarchical filtering
- **Keyboard Navigation**: Full keyboard support with customizable shortcut hints
- **Keyboard Shortcut Trigger**: Optional ⌘K / Ctrl+K shortcut to open the palette
- **Custom Rendering**: Custom render function for option items
- **Accessible**: Built on Radix UI primitives for proper accessibility
- **Centered Mode**: Option to display the popover centered on the screen
- **Glass Morphism**: Beautiful frosted glass UI with backdrop blur

## When to Use

Use the CommandPalette component when you need to:

1. **Quick Selection**: Allow users to quickly search and select from a large list of options

   - Task selection
   - Navigation shortcuts
   - Quick actions
   - Entity lookup (users, items, records)

2. **Filtered Search**: Combine text search with category filters

   - Searching with multiple criteria
   - Filtered selection interfaces
   - Advanced search experiences
   - Data exploration

3. **Keyboard-First Workflows**: Provide a keyboard-friendly selection interface

   - Developer tools
   - Power user features
   - Productivity applications
   - IDE-style interfaces

4. **Complex Option Selection**: Display rich option data with custom rendering

   - Multi-property items
   - Options with metadata
   - Categorized selections
   - Hierarchical data

5. **Global Search**: Implement application-wide search functionality

   - Spotlight-style search (centered mode)
   - Global navigation
   - Quick command execution
   - Universal search

## When NOT to Use

Avoid using the CommandPalette component when:

1. **Simple Selection**: For small lists without search needs

   - Use a Select or DropdownMenu component
   - Simple radio button groups
   - Short option lists (< 10 items)

2. **Single Filter Criteria**: When only one filter type is needed

   - Use a filtered Select component
   - Simple search input with results
   - Basic autocomplete

3. **Form Fields**: For standard form inputs

   - Use a Select or Combobox component
   - Standard form elements
   - Basic dropdowns

4. **Navigation Only**: For simple navigation menus

   - Use a Navigation or Menu component
   - Standard nav elements
   - Breadcrumbs

5. **Always-Visible Lists**: When the list should always be shown

   - Use a List or Table component
   - Inline search results
   - Static lists

## Usage Example

### Basic Usage

```tsx
import { CommandPalette } from "@tennr/lasso/command-palette";

const options = [
  { label: "Task 1", value: "task-1" },
  { label: "Task 2", value: "task-2" },
  { label: "Task 3", value: "task-3" },
];

function MyComponent() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <CommandPalette
      options={options}
      selectedOptions={selectedOptions}
      onSelectedOptionsChange={setSelectedOptions}
      onSelectOption={(option) => console.log("Selected:", option)}
      icon="ph:plus"
      label="Add task"
    />
  );
}
```

### With Filters

```tsx
import {
  CommandPalette,
  KeyboardShortcutType,
} from "@tennr/lasso/command-palette";
import type { FilterCategoryType } from "@tennr/lasso/filter-group";

const statusFilter: FilterCategoryType = {
  id: "status",
  label: "Status",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "active", label: "Active" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ],
};

const options = [
  { label: "Task 1", value: "task-1", status: "active" },
  { label: "Task 2", value: "task-2", status: "pending" },
  { label: "Task 3", value: "task-3", status: "completed" },
];

function MyComponent() {
  return (
    <CommandPalette
      options={options}
      filterCategories={[statusFilter]}
      listHeading="Tasks"
      icon="ph:magnifying-glass"
      label="Search tasks"
      keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
      keyboardShortcutsRight={[
        KeyboardShortcutType.NAVIGATE,
        KeyboardShortcutType.SELECT,
      ]}
    />
  );
}
```

### Centered with Keyboard Shortcut

```tsx
<CommandPalette
  options={options}
  filterCategories={[departmentFilter, statusFilter]}
  listHeading="All Tasks"
  icon="ph:magnifying-glass"
  label="Open command palette"
  centered={true}
  enableTriggerShortcut={true}
/>
```

### With Custom Option Rendering

```tsx
<CommandPalette
  options={options}
  renderOption={(option) => (
    <div className="flex justify-between">
      <span>{option.label}</span>
      <span className="text-muted-foreground">{option.status}</span>
    </div>
  )}
/>
```

### With Cascading Filters

```tsx
const payerFamilyFilter: FilterCategoryType = {
  id: "payerFamily",
  label: "Payer Family",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "United Healthcare", label: "United Healthcare" },
    { id: "Blue Cross Blue Shield", label: "Blue Cross Blue Shield" },
  ],
};

const insurancePayerFilter: FilterCategoryType = {
  id: "insurancePayer",
  label: "Insurance Payer",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "United Healthcare - PPO", label: "United Healthcare - PPO" },
    { id: "Blue Cross Blue Shield - Medicare", label: "BCBS - Medicare" },
  ],
  dependency: {
    dependentFilterId: "payerFamily",
    dependsOn: "payerFamily",
    matchType: "substring",
  },
};

<CommandPalette
  options={insuranceOptions}
  filterCategories={[payerFamilyFilter, insurancePayerFilter]}
/>;
```

## Props Reference

### CommandPalette

| Prop                      | Type                                     | Default              | Description                                |
| ------------------------- | ---------------------------------------- | -------------------- | ------------------------------------------ |
| `options`                 | `T[]`                                    | **Required**         | Array of options to display                |
| `selectedOptions`         | `T[]`                                    | `undefined`          | Currently selected options                 |
| `onSelectedOptionsChange` | `(options: T[]) => void`                 | `undefined`          | Callback when selection changes            |
| `onSelectOption`          | `(option: T) => void`                    | `undefined`          | Callback when an option is selected        |
| `placeholder`             | `string`                                 | `"Search..."`        | Search input placeholder text              |
| `isSearchable`            | `boolean`                                | `true`               | Whether to show the search input           |
| `filterCategories`        | `FilterCategoryType[]`                   | `undefined`          | Filter configurations                      |
| `listHeading`             | `string`                                 | Results count        | Heading text for the options list          |
| `renderOption`            | `(option: T) => ReactNode`               | `undefined`          | Custom render function for options         |
| `keyboardShortcutsLeft`   | `KeyboardShortcutType[]`                 | `[CLOSE]`            | Shortcuts shown on the left                |
| `keyboardShortcutsRight`  | `KeyboardShortcutType[]`                 | `[NAVIGATE, SELECT]` | Shortcuts shown on the right               |
| `icon`                    | `string`                                 | `""`                 | Iconify icon string for the trigger button |
| `label`                   | `string`                                 | `"Click to open"`    | Label text for the trigger button          |
| `enableTriggerShortcut`   | `boolean`                                | `false`              | Enable ⌘K / Ctrl+K shortcut                |
| `side`                    | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"`           | Popover placement side                     |
| `align`                   | `"start" \| "center" \| "end"`           | `"start"`            | Popover alignment                          |
| `sideOffset`              | `number`                                 | `0`                  | Offset from the trigger                    |
| `centered`                | `boolean`                                | `false`              | Display popover centered on screen         |
| `children`                | `ReactNode`                              | `undefined`          | Custom trigger element                     |

### Option Interface

Options must extend this base interface:

```typescript
interface Option {
  label: string; // Display text
  value: string; // Unique identifier
  category?: string; // Optional category
  [key: string]: string | string[] | undefined; // Additional filterable properties
}
```

### KeyboardShortcutType

```typescript
enum KeyboardShortcutType {
  CLOSE = "close", // Shows "Esc" key hint
  NAVIGATE = "navigate", // Shows up/down arrow keys hint
  SELECT = "select", // Shows "Enter" key hint
}
```

### FilterDependency

For cascading filters:

```typescript
interface FilterDependency {
  dependentFilterId: string;
  matchType?: "substring" | "exact"; // How to match parent value
  dependsOn: string; // Parent filter ID
}
```

## Keyboard Shortcuts

| Shortcut        | Action                                                        |
| --------------- | ------------------------------------------------------------- |
| `⌘K` / `Ctrl+K` | Toggle command palette (when `enableTriggerShortcut` is true) |
| `↑` / `↓`       | Navigate through options                                      |
| `Enter`         | Select highlighted option                                     |
| `Esc`           | Close command palette                                         |
| `Shift+↑`       | Select all search text                                        |

## Accessibility

The CommandPalette component is built with accessibility in mind:

- Full keyboard navigation support
- ARIA attributes for screen readers
- Focus management within the popover
- Proper labeling for all interactive elements
- Built on accessible Radix UI primitives

## Related Components

- For simple dropdowns, use the `Select` component
- For autocomplete inputs, use the `Combobox` component
- For navigation menus, use the `DropdownMenu` component
- For filtering UI, use the `FilterGroup` component directly
