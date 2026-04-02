# Dropdown Component

## Overview

The Dropdown component is a versatile menu component for displaying a list of actions or options triggered by a button. It supports a wide range of features including submenus, checkbox items, radio groups, keyboard shortcuts, and custom styling. Built on top of Radix UI's Dropdown Menu primitive, it provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Dropdown component consists of multiple sub-components that work together:

- **DropdownMenu** (root): The container that manages the dropdown state and behavior
- **DropdownMenuTrigger**: The button that toggles the dropdown menu
- **DropdownMenuContent**: The container for the dropdown items that appears when triggered
- **DropdownMenuItem**: A selectable item in the dropdown
- **DropdownMenuGroup**: A grouping container for related items
- **DropdownMenuLabel**: A non-interactive label for grouping sections
- **DropdownMenuSeparator**: A visual divider between groups of items
- **DropdownMenuCheckboxItem**: An item that can be toggled on/off
- **DropdownMenuRadioGroup**: A container for mutually exclusive radio items
- **DropdownMenuRadioItem**: A selectable item within a radio group
- **DropdownMenuSub**: A container for a nested submenu
- **DropdownMenuSubTrigger**: The item that triggers a submenu
- **DropdownMenuSubContent**: The content of a nested submenu
- **DropdownMenuShortcut**: A hint for keyboard shortcuts
- **DropdownMenuPortal**: A portal for rendering the dropdown outside the DOM hierarchy

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Keyboard Navigation**: Full keyboard support including arrow keys, Enter, Escape
- **Submenu Support**: Nested menus for organizing complex action hierarchies
- **Selection Types**: Supports single items, checkboxes, and radio groups
- **Customizable**: Accepts className props for styling customization
- **Animated**: Smooth open/close and slide animations by default
- **Portal Support**: Renders in a portal to avoid z-index and overflow issues
- **Variants**: Items support default and destructive variants

## When to Use

Use the Dropdown component when you need to:

1. **Action Menus**: Display a list of actions for an item or context

   - User account menus (profile, settings, logout)
   - Row actions in tables
   - File operations (save, export, share)
   - Edit menus (cut, copy, paste)

2. **Navigation Options**: Provide navigation choices without cluttering the UI

   - Quick navigation to sections
   - Recent items lists
   - Bookmark menus
   - History menus

3. **Settings & Preferences**: Allow users to toggle options or select from choices

   - View options (grid/list view)
   - Theme selection (light/dark/system)
   - Sort options
   - Filter toggles

4. **Contextual Actions**: Provide context-specific actions on hover or click

   - More actions menus
   - Options menus
   - Context-sensitive tools
   - Quick actions

5. **Organized Actions**: Group related actions together with labels and separators

   - Edit operations grouped with file operations
   - Primary actions separated from dangerous actions
   - Actions organized by category

## When NOT to Use

Avoid using the Dropdown component when:

1. **Right-Click Context**: You need a menu that appears on right-click

   - Right-click context menus (use ContextMenu component)
   - Custom right-click behavior

2. **Form Selection**: You need a form control for selecting values

   - Form select inputs (use Select component)
   - Combobox with search (use Combobox component)
   - Multi-select fields (use MultiSelect component)

3. **Primary Actions**: The action should be immediately visible and accessible

   - Primary call-to-action buttons (use Button)
   - Important navigation links (use Navigation component)
   - Frequently used actions (use visible buttons)

4. **Long Lists**: You have a very long list of items that needs scrolling

   - Large datasets (use Select with virtualization)
   - Searchable lists (use Combobox)
   - Paginated results (use List component)

5. **Complex Content**: The items contain complex interactive content

   - Forms within menus (use Popover or Dialog)
   - Rich content preview (use HoverCard)
   - Multi-step interactions (use Dialog or Sheet)

6. **Mobile Primary Navigation**: For primary navigation on mobile devices

   - Mobile navigation (use Drawer or Sheet)
   - Tab-based navigation (use Tabs)
   - Bottom navigation

## Usage Example

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tennr/lasso/dropdown";

function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Example with Icons

```tsx
import { Icon } from "@iconify/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tennr/lasso/dropdown";

function MenuWithIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Icon icon="ph:user" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon icon="ph:gear" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon icon="ph:sign-out" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Example with Checkboxes

```tsx
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tennr/lasso/dropdown";

function ViewOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>View Options</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>View Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Show Toolbar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show Statusbar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          Show Sidebar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Example with Radio Group

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tennr/lasso/dropdown";

function ThemeSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Theme</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="light">
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Example with Submenu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@tennr/lasso/dropdown";

function NestedMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>More Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Back</DropdownMenuItem>
        <DropdownMenuItem>Forward</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Save Page As...</DropdownMenuItem>
            <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
            <DropdownMenuItem>Developer Tools</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Props Reference

### DropdownMenu

- `open`: `boolean` - Controlled open state
- `defaultOpen`: `boolean` - Initial open state (uncontrolled)
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes
- `modal`: `boolean` - Whether the dropdown behaves as a modal (default: true)

### DropdownMenuTrigger

- `asChild`: `boolean` - Merge props onto the immediate child element
- `className`: `string` - Additional CSS classes (styled as outline button by default)

### DropdownMenuContent

- `sideOffset`: `number` - Distance from the trigger (default: 4)
- `align`: `"start" | "center" | "end"` - Alignment relative to trigger
- `side`: `"top" | "right" | "bottom" | "left"` - Preferred side of the trigger
- `className`: `string` - Additional CSS classes

### DropdownMenuItem

- `inset`: `boolean` - Add left padding for alignment with items that have icons
- `variant`: `"default" | "destructive"` - Visual variant for the item
- `disabled`: `boolean` - Whether the item is disabled
- `onSelect`: `(event: Event) => void` - Callback when item is selected
- `className`: `string` - Additional CSS classes

### DropdownMenuCheckboxItem

- `checked`: `boolean` - Whether the item is checked
- `onCheckedChange`: `(checked: boolean) => void` - Callback when checked state changes
- `disabled`: `boolean` - Whether the item is disabled
- `className`: `string` - Additional CSS classes

### DropdownMenuRadioGroup

- `value`: `string` - The currently selected value
- `onValueChange`: `(value: string) => void` - Callback when selection changes

### DropdownMenuRadioItem

- `value`: `string` - The value for this radio item (required)
- `disabled`: `boolean` - Whether the item is disabled
- `className`: `string` - Additional CSS classes

### DropdownMenuLabel

- `inset`: `boolean` - Add left padding for alignment with items
- `className`: `string` - Additional CSS classes

### DropdownMenuSeparator

- `className`: `string` - Additional CSS classes

### DropdownMenuShortcut

- `className`: `string` - Additional CSS classes

### DropdownMenuSub

- `open`: `boolean` - Controlled open state
- `defaultOpen`: `boolean` - Initial open state
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes

### DropdownMenuSubTrigger

- `inset`: `boolean` - Add left padding for alignment
- `className`: `string` - Additional CSS classes

### DropdownMenuSubContent

- `className`: `string` - Additional CSS classes

## Accessibility

The Dropdown component is fully accessible out of the box:

- **Keyboard Navigation**: Arrow keys navigate items, Enter/Space selects, Escape closes
- **Focus Management**: Focus is properly trapped and restored
- **ARIA Attributes**: Automatically managed roles and states
- **Screen Reader Support**: Proper announcements for state changes
- **Type-ahead**: Type to jump to items starting with that character

## Related Components

- For right-click context menus, use the `ContextMenu` component
- For form selection inputs, use the `Select` component
- For searchable selection, use the `Combobox` component
- For simple expand/collapse, use the `Collapsible` or `Accordion` component
- For full-screen navigation on mobile, use the `Sheet` or `Drawer` component
