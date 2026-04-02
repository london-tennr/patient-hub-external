# DropdownMenu Component

## Overview

The DropdownMenu component displays a menu of actions or options when triggered by a button or other element. It's built on top of Radix UI's DropdownMenu primitive and provides a consistent, accessible, and styled implementation for the Tennr design system. It supports nested submenus, checkbox items, radio groups, keyboard shortcuts, and grouping with labels and separators.

## What It Is

The DropdownMenu component consists of multiple sub-components that work together:

- **DropdownMenu** (root): The container that manages the menu state and behavior
- **DropdownMenuTrigger**: The element that opens the menu when clicked
- **DropdownMenuContent**: The popover container for the menu items
- **DropdownMenuItem**: An individual actionable item
- **DropdownMenuCheckboxItem**: A toggleable item with a checkbox
- **DropdownMenuRadioGroup**: A group for single-selection radio items
- **DropdownMenuRadioItem**: A radio item within a radio group
- **DropdownMenuLabel**: A non-interactive label for grouping
- **DropdownMenuSeparator**: A visual divider between sections
- **DropdownMenuShortcut**: Displays keyboard shortcut hints
- **DropdownMenuGroup**: Groups related items together
- **DropdownMenuSub**: Container for nested submenus
- **DropdownMenuSubTrigger**: The item that opens a submenu
- **DropdownMenuSubContent**: The content of a submenu
- **DropdownMenuPortal**: Renders content into a portal

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Animated**: Smooth open/close animations with directional awareness
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Escape)
- **Nested Menus**: Support for submenus with automatic positioning
- **Selection Types**: Supports checkbox items and radio groups
- **Customizable**: Accepts className props for styling customization
- **Destructive Variant**: Built-in styling for dangerous actions

## When to Use

Use the DropdownMenu component when you need to:

1. **Action Lists**: Display a list of actions related to a specific item or context

   - Row actions in tables
   - "More options" menus
   - User account menus
   - Edit/Delete/Share actions

2. **Navigation Options**: Provide secondary navigation or quick links

   - User profile menus
   - Settings shortcuts
   - Team/workspace switching
   - Quick access to recent items

3. **Selection from Options**: Allow users to select from a set of options

   - View mode selection
   - Sort order selection
   - Filter options
   - Theme selection

4. **Contextual Actions**: Present actions based on the current context

   - Right-click context menus (consider ContextMenu for this)
   - Item-specific actions
   - Bulk action menus
   - Status change actions

5. **Compact Interface**: Save space by hiding secondary actions

   - Toolbar overflow menus
   - Mobile-friendly action grouping
   - Dashboard widgets
   - Card action menus

## When NOT to Use

Avoid using the DropdownMenu component when:

1. **Primary Actions**: The action is critical and should always be visible

   - Main call-to-action buttons
   - Submit buttons in forms
   - Primary navigation items
   - Required user actions

2. **Simple Navigation**: For straightforward navigation, use simpler components

   - Main navigation bars (use NavigationMenu)
   - Tab-based navigation (use Tabs)
   - Breadcrumb navigation (use Breadcrumb)
   - Step indicators (use Stepper)

3. **Form Selections**: For form inputs with many options

   - Select dropdowns for forms (use Select or Combobox)
   - Multi-select fields (use Combobox with multi-select)
   - Autocomplete inputs (use Combobox)
   - Date selection (use DatePicker)

4. **Few Options**: When you have only 2-3 options that can fit in the UI

   - Toggle buttons (use Toggle or ToggleGroup)
   - Radio buttons (use RadioGroup)
   - Segmented controls (use ToggleGroup)

5. **Complex Content**: When items need more than simple text/icons

   - Rich previews (use Popover)
   - Forms or inputs (use Dialog or Popover)
   - Long descriptive content (use Dialog or Sheet)
   - Interactive content (use Dialog)

6. **Right-Click Menus**: For true context menus triggered by right-click

   - Use the ContextMenu component instead

## Usage Example

```tsx
import { Button } from "@tennr/lasso/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@tennr/lasso/dropdown-menu";

function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Example with Checkbox Items

```tsx
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tennr/lasso/dropdown-menu";

function ViewOptionsMenu() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Activity Bar
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
} from "@tennr/lasso/dropdown-menu";

function SortMenu() {
  const [sortOrder, setSortOrder] = useState("newest");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Sort By</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
          <DropdownMenuRadioItem value="newest">
            Newest First
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">
            Oldest First
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="alphabetical">
            Alphabetical
          </DropdownMenuRadioItem>
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@tennr/lasso/dropdown-menu";

function MenuWithSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>New File</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Slack</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem>Download</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Props Reference

### DropdownMenu

- `open`: `boolean` - Controlled open state
- `onOpenChange`: `(open: boolean) => void` - Handler called when open state changes
- `defaultOpen`: `boolean` - Default open state (uncontrolled)
- `modal`: `boolean` - Whether the menu is modal (default: true)
- `dir`: `"ltr" | "rtl"` - Reading direction

### DropdownMenuTrigger

- `asChild`: `boolean` - Merge props onto child element instead of rendering a button

### DropdownMenuContent

- `className`: `string` - Additional CSS classes
- `sideOffset`: `number` - Distance from trigger in pixels (default: 4)
- `side`: `"top" | "right" | "bottom" | "left"` - Preferred side
- `align`: `"start" | "center" | "end"` - Alignment against trigger
- `alignOffset`: `number` - Offset from alignment
- `avoidCollisions`: `boolean` - Whether to flip when constrained (default: true)

### DropdownMenuItem

- `className`: `string` - Additional CSS classes
- `inset`: `boolean` - Add left padding to align with icon items
- `variant`: `"default" | "destructive"` - Visual variant for the item
- `disabled`: `boolean` - Whether the item is disabled
- `onSelect`: `(event: Event) => void` - Handler when item is selected

### DropdownMenuCheckboxItem

- `className`: `string` - Additional CSS classes
- `checked`: `boolean | "indeterminate"` - Checked state
- `onCheckedChange`: `(checked: boolean) => void` - Handler when checked changes
- `disabled`: `boolean` - Whether the item is disabled

### DropdownMenuRadioGroup

- `value`: `string` - Currently selected value
- `onValueChange`: `(value: string) => void` - Handler when selection changes

### DropdownMenuRadioItem

- `className`: `string` - Additional CSS classes
- `value`: `string` - Value of this radio item (required)
- `disabled`: `boolean` - Whether the item is disabled

### DropdownMenuLabel

- `className`: `string` - Additional CSS classes
- `inset`: `boolean` - Add left padding to align with icon items

### DropdownMenuSeparator

- `className`: `string` - Additional CSS classes

### DropdownMenuShortcut

- `className`: `string` - Additional CSS classes

### DropdownMenuSub

- `open`: `boolean` - Controlled open state
- `onOpenChange`: `(open: boolean) => void` - Handler when open state changes
- `defaultOpen`: `boolean` - Default open state (uncontrolled)

### DropdownMenuSubTrigger

- `className`: `string` - Additional CSS classes
- `inset`: `boolean` - Add left padding to align with icon items
- `disabled`: `boolean` - Whether the trigger is disabled

### DropdownMenuSubContent

- `className`: `string` - Additional CSS classes
- `sideOffset`: `number` - Distance from trigger in pixels

## Accessibility

The DropdownMenu component is fully accessible out of the box:

- Keyboard navigation support (Arrow keys to navigate, Enter/Space to select, Escape to close)
- ARIA attributes automatically managed
- Focus management handled correctly
- Screen reader announcements for state changes
- Type-ahead support for quick navigation
- Focus is trapped within the menu when open

## Related Components

- For right-click context menus, use the ContextMenu component
- For form selections, use the Select or Combobox component
- For navigation menus, use the NavigationMenu component
- For simple expand/collapse, use the Collapsible component
- For modal dialogs with custom content, use the Dialog component
