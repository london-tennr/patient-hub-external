# ContextMenu Component

## Overview

The ContextMenu component provides a menu that appears on right-click, offering contextual actions for elements on the page. Built on top of Radix UI's Context Menu primitive, it provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The ContextMenu component consists of multiple sub-components that work together:

- **ContextMenu** (root): The container that manages the context menu state and behavior
- **ContextMenuTrigger**: The element that triggers the context menu on right-click
- **ContextMenuContent**: The container for menu items that appears when triggered
- **ContextMenuItem**: An individual selectable item within the menu
- **ContextMenuCheckboxItem**: A menu item that can be toggled on/off with a checkbox
- **ContextMenuRadioGroup**: A group container for radio items
- **ContextMenuRadioItem**: A menu item that works as part of a radio group (single selection)
- **ContextMenuLabel**: A non-interactive label for grouping menu items
- **ContextMenuSeparator**: A visual divider between menu sections
- **ContextMenuShortcut**: A hint displaying keyboard shortcuts for menu items
- **ContextMenuGroup**: A logical grouping of menu items
- **ContextMenuSub**: A sub-menu container for nested menus
- **ContextMenuSubTrigger**: The item that opens a sub-menu
- **ContextMenuSubContent**: The content container for a sub-menu
- **ContextMenuPortal**: Renders menu content in a React portal

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Animated**: Smooth open/close animations with fade and zoom effects
- **Customizable**: Accepts className props for styling customization
- **Nested Menus**: Support for sub-menus with automatic positioning
- **Selection Types**: Supports regular items, checkboxes, and radio groups
- **Keyboard Navigation**: Full keyboard support for navigating and selecting items
- **Destructive Variant**: Built-in styling for dangerous/destructive actions

## When to Use

Use the ContextMenu component when you need to:

1. **Contextual Actions**: Provide actions relevant to a specific element or selection

   - File/folder actions in a file browser
   - Text selection actions (copy, cut, paste)
   - Row actions in a data table
   - Element-specific operations in editors

2. **Secondary Actions**: Offer additional actions without cluttering the main UI

   - Advanced options
   - Less frequently used features
   - Alternative workflows
   - Quick shortcuts

3. **Power User Features**: Enable efficient workflows for experienced users

   - Keyboard shortcut discovery
   - Quick access to common operations
   - Batch operations on selections
   - Advanced editing tools

4. **Desktop-Like Interactions**: Create familiar desktop application experiences

   - Rich text editors
   - Design tools
   - File management interfaces
   - IDE-like experiences

## When NOT to Use

Avoid using the ContextMenu component when:

1. **Primary Navigation**: For main navigation, use a Navigation or Menu component

   - Site navigation
   - App-wide menus
   - Primary user flows

2. **Mobile-First Interfaces**: Context menus are difficult to access on touch devices

   - Mobile apps (use swipe actions or long-press menus)
   - Touch-primary interfaces
   - Tablet-first designs

3. **Critical Actions**: When the action must be discoverable without right-clicking

   - Primary calls-to-action
   - Required form interactions
   - Essential user flows

4. **Simple Interactions**: For straightforward actions, use simpler components

   - Single toggle actions (use a Switch)
   - Basic button actions (use a Button)
   - Simple dropdowns (use a DropdownMenu with click trigger)

5. **Accessibility-Critical Features**: When the feature must be accessible to all users

   - Essential functionality should have visible UI alternatives
   - Assistive technology users may not discover context menus

## Usage Example

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@tennr/lasso/context-menu";

function MyComponent() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

### Example with Checkbox Items

```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@tennr/lasso/context-menu";

function SettingsContextMenu() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click for settings</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>View Options</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={showToolbar}
          onCheckedChange={setShowToolbar}
        >
          Show Toolbar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showSidebar}
          onCheckedChange={setShowSidebar}
        >
          Show Sidebar
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

### Example with Sub-Menus

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@tennr/lasso/context-menu";

function NestedContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Slack</ContextMenuItem>
            <ContextMenuItem>Copy Link</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Download</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Props Reference

### ContextMenu

Inherits all props from Radix UI's `ContextMenu.Root`.

- `onOpenChange`: `(open: boolean) => void` - Called when the menu opens/closes
- `modal`: `boolean` - Whether the menu should block interactions with the rest of the page

### ContextMenuTrigger

Inherits all props from Radix UI's `ContextMenu.Trigger`.

- `asChild`: `boolean` - Merge props onto child element instead of rendering a wrapper
- `disabled`: `boolean` - Disable the trigger

### ContextMenuContent

- `className`: `string` - Additional CSS classes
- `sideOffset`: `number` - Distance from the trigger
- `alignOffset`: `number` - Offset from the alignment edge

### ContextMenuItem

- `className`: `string` - Additional CSS classes
- `inset`: `boolean` - Add left padding to align with checkbox/radio items
- `variant`: `"default" | "destructive"` - Visual variant for the item
- `disabled`: `boolean` - Disable the item
- `onSelect`: `(event: Event) => void` - Called when the item is selected

### ContextMenuCheckboxItem

- `className`: `string` - Additional CSS classes
- `checked`: `boolean` - Whether the checkbox is checked
- `onCheckedChange`: `(checked: boolean) => void` - Called when checked state changes
- `disabled`: `boolean` - Disable the item

### ContextMenuRadioGroup

- `value`: `string` - The selected value
- `onValueChange`: `(value: string) => void` - Called when the selection changes

### ContextMenuRadioItem

- `className`: `string` - Additional CSS classes
- `value`: `string` - The value of this radio item (required)
- `disabled`: `boolean` - Disable the item

### ContextMenuLabel

- `className`: `string` - Additional CSS classes
- `inset`: `boolean` - Add left padding to align with checkbox/radio items

### ContextMenuSeparator

- `className`: `string` - Additional CSS classes

### ContextMenuShortcut

- `className`: `string` - Additional CSS classes

### ContextMenuSubTrigger

- `className`: `string` - Additional CSS classes
- `inset`: `boolean` - Add left padding to align with checkbox/radio items

### ContextMenuSubContent

- `className`: `string` - Additional CSS classes

## Accessibility

The ContextMenu component is fully accessible out of the box:

- Full keyboard navigation support (Arrow keys, Enter, Space, Escape)
- ARIA attributes automatically managed
- Focus management handled correctly
- Screen reader announcements for state changes
- Support for disabled items
- Proper role attributes for all menu elements

## Related Components

- For click-triggered menus, use the DropdownMenu component
- For navigation menus, use the NavigationMenu component
- For command palettes, use a Command component
- For simple selections, use a Select component
