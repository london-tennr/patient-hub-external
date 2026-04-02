# Command Component

## Overview

The Command component is a composable command menu interface for search and selection functionality. It provides a fast, accessible, and keyboard-friendly way to navigate through a list of items, execute actions, or search content. Built on top of the [cmdk](https://github.com/pacocoursey/cmdk) library, it offers a consistent, styled implementation for the Tennr design system.

## What It Is

The Command component consists of nine sub-components that work together:

- **Command** (root): The container that manages the command menu state and search functionality
- **CommandDialog**: A pre-styled dialog wrapper for displaying the command menu in a modal overlay
- **CommandInput**: The search input field with a built-in search icon
- **CommandList**: A scrollable container for command items
- **CommandEmpty**: Placeholder content shown when no results match the search query
- **CommandGroup**: Groups related command items together with an optional heading
- **CommandItem**: An individual selectable item within the command menu
- **CommandSeparator**: A visual divider between groups or sections
- **CommandShortcut**: A styled span for displaying keyboard shortcuts alongside items

### Key Features

- **Accessible**: Built on cmdk which follows WAI-ARIA combobox/listbox patterns
- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, and Escape
- **Fast Filtering**: Client-side fuzzy search with instant results
- **Composable**: Mix and match sub-components to build custom interfaces
- **Dialog Mode**: Optional modal presentation with CommandDialog
- **Customizable**: Accepts className props for styling customization

## When to Use

Use the Command component when you need to:

1. **Search and Selection**: Provide a searchable list of options for users to choose from

   - Navigation menus
   - Action palettes
   - Settings search
   - Quick switchers

2. **Command Palettes**: Implement keyboard-driven command interfaces

   - Application-wide command palettes (⌘K / Ctrl+K)
   - Quick action menus
   - Spotlight-style search
   - Power user shortcuts

3. **Autocomplete Interfaces**: Build type-ahead search experiences

   - Search inputs with suggestions
   - Tag selectors
   - User pickers
   - File/document finders

4. **Contextual Actions**: Present context-specific actions to users

   - Right-click context menus
   - Action menus on selected items
   - Bulk action interfaces
   - Tool palettes

## When NOT to Use

Avoid using the Command component when:

1. **Simple Selection**: For basic dropdown selections without search

   - Small lists (< 5 items) where Select is sufficient
   - Boolean toggles (use Switch or Checkbox)
   - Simple navigation (use Button or Link)

2. **Form Inputs**: For standard form data entry

   - Text input fields (use Input)
   - Multi-select with chips (use a dedicated MultiSelect)
   - Date selection (use DatePicker)

3. **Navigation Menus**: For primary site navigation

   - Main navigation bars (use NavigationMenu)
   - Sidebar navigation (use Sidebar)
   - Tab interfaces (use Tabs)

4. **Data Tables**: For filtering tabular data

   - Column filters (use DataTable with built-in filters)
   - Complex multi-criteria filters (use FilterGroup)
   - Saved filter presets (use custom filter UI)

5. **Always-Visible Lists**: When the list should always be visible

   - Static menu lists
   - Settings panels
   - Dashboard widgets

## Usage Example

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@tennr/lasso/command";

function MyComponent() {
  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Icon icon="ph:calendar" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Icon icon="ph:gear" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### Example with Dialog

```tsx
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@tennr/lasso/command";

function CommandPaletteExample() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => console.log("Selected!")}>
            <span>Create New Document</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
```

## Props Reference

### Command

- `className`: `string` - Additional CSS classes for the root container
- Inherits all props from `cmdk` Command primitive

### CommandDialog

- `title`: `string` - Accessible title for the dialog (default: "Command Palette")
- `description`: `string` - Accessible description (default: "Search for a command to run...")
- `className`: `string` - Additional CSS classes for the dialog content
- `showCloseButton`: `boolean` - Whether to show the close button (default: true)
- Inherits all props from Dialog component

### CommandInput

- `placeholder`: `string` - Placeholder text for the input
- `className`: `string` - Additional CSS classes for the input element
- `wrapperClassName`: `string` - Additional CSS classes for the input wrapper
- Inherits all props from `cmdk` Input primitive

### CommandList

- `className`: `string` - Additional CSS classes
- Inherits all props from `cmdk` List primitive

### CommandEmpty

- Inherits all props from `cmdk` Empty primitive

### CommandGroup

- `heading`: `string` - Optional heading text for the group
- `className`: `string` - Additional CSS classes
- Inherits all props from `cmdk` Group primitive

### CommandItem

- `onSelect`: `(value: string) => void` - Callback when item is selected
- `value`: `string` - The value used for filtering (auto-generated from text content if not provided)
- `disabled`: `boolean` - Whether the item is disabled
- `className`: `string` - Additional CSS classes
- Inherits all props from `cmdk` Item primitive

### CommandSeparator

- `className`: `string` - Additional CSS classes
- Inherits all props from `cmdk` Separator primitive

### CommandShortcut

- `className`: `string` - Additional CSS classes
- Standard span HTML attributes

## Keyboard Navigation

The Command component supports comprehensive keyboard navigation:

- **Arrow Up/Down**: Navigate between items
- **Enter**: Select the currently highlighted item
- **Escape**: Close the command menu (in dialog mode)
- **Type to Search**: Start typing to filter items

## Accessibility

The Command component is fully accessible out of the box:

- Follows WAI-ARIA combobox/listbox patterns
- Keyboard navigation support
- Screen reader announcements for results count
- Focus management handled correctly
- Proper ARIA attributes automatically managed

## Related Components

- For simple dropdown selections, use the `Select` component
- For searchable selections in forms, use the `Combobox` component
- For application-wide command palette, use with `CommandDialog`
- For dropdown menus with hover interactions, use `DropdownMenu`
