# Menubar Component

## Overview

The Menubar component is a horizontal menu bar that organizes commands and options into dropdown menus, similar to the menu bars found in desktop applications. It's built on top of Radix UI's Menubar primitive and provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Menubar component consists of multiple sub-components that work together:

- **Menubar** (root): The horizontal container that holds all menu triggers
- **MenubarMenu**: A single menu container within the menubar
- **MenubarTrigger**: The button that opens a menu dropdown
- **MenubarContent**: The dropdown panel containing menu items
- **MenubarItem**: A single actionable menu item
- **MenubarCheckboxItem**: A menu item with a checkbox for toggling options
- **MenubarRadioGroup**: A container for a group of radio items
- **MenubarRadioItem**: A menu item that acts as a radio button within a group
- **MenubarLabel**: A non-interactive label for grouping menu items
- **MenubarSeparator**: A visual divider between groups of items
- **MenubarShortcut**: A display element for keyboard shortcuts
- **MenubarSub**: A container for nested submenus
- **MenubarSubTrigger**: The trigger that opens a submenu
- **MenubarSubContent**: The dropdown panel for a submenu
- **MenubarGroup**: A semantic grouping for related menu items
- **MenubarPortal**: A portal for rendering menu content outside the DOM hierarchy

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Animated**: Smooth open/close animations with CSS transitions
- **Keyboard Navigation**: Full keyboard support for navigating menus
- **Nested Submenus**: Support for multi-level menu hierarchies
- **Selection States**: Built-in checkbox and radio item variants
- **Customizable**: Accepts className props for styling customization
- **Destructive Variant**: Support for destructive action styling

## When to Use

Use the Menubar component when you need to:

1. **Desktop-Style Application Navigation**: Create a familiar menu system for complex applications

   - Document editors
   - Admin dashboards
   - Content management systems
   - IDE-style interfaces

2. **Organizing Many Actions**: Group numerous commands logically into categorized menus

   - File operations (New, Open, Save, Export)
   - Edit operations (Undo, Redo, Cut, Copy, Paste)
   - View settings and preferences
   - Help and documentation links

3. **Hierarchical Command Structure**: Present commands in a clear hierarchy with submenus

   - Share options with multiple destinations
   - Export formats with various options
   - Find/Replace with advanced options
   - Nested settings categories

4. **Keyboard-Driven Workflows**: Support power users with keyboard shortcuts

   - Applications with many keyboard shortcuts
   - Professional tools requiring efficiency
   - Accessibility-focused interfaces

5. **Preference Controls**: Provide toggleable options and radio selections

   - View mode selection (Grid/List/Table)
   - Theme selection (Light/Dark/System)
   - Feature toggles (Show/Hide panels)
   - Profile switching

## When NOT to Use

Avoid using the Menubar component when:

1. **Simple Navigation**: For basic site navigation, use simpler components

   - Primary website navigation (use a NavBar or Header component)
   - Mobile navigation (use a Drawer or Mobile Menu)
   - Tab-based navigation (use a Tabs component)

2. **Single Menu**: If you only need one dropdown menu

   - Context menus (use a ContextMenu or DropdownMenu)
   - Action menus (use a DropdownMenu)
   - Select inputs (use a Select component)

3. **Mobile-First Interfaces**: Menubar is not optimized for touch interfaces

   - Mobile applications (use a mobile-friendly navigation pattern)
   - Touch-first interfaces (use larger touch targets)
   - Responsive layouts where horizontal space is limited

4. **Real-Time Actions**: For actions that need immediate feedback

   - Toggle switches (use a Switch component)
   - Button groups (use a ButtonGroup or ToggleGroup)
   - Quick actions (use individual Buttons)

5. **Data Selection**: When users need to select data rather than commands

   - Form inputs (use Select or Combobox)
   - Multi-select (use a MultiSelect or Checkbox group)
   - Search with suggestions (use an Autocomplete)

## Usage Example

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@tennr/lasso/menubar";

function MyComponent() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

### Example with Checkbox and Radio Items

```tsx
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@tennr/lasso/menubar";

function ViewMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Show Status Bar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="comfortable">
            <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
            <MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
            <MenubarRadioItem value="spacious">Spacious</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

### Example with Submenus

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@tennr/lasso/menubar";

function FileMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## Props Reference

### Menubar

- `className`: `string` - Additional CSS classes for the menubar container

### MenubarMenu

No additional props beyond Radix UI MenubarMenu props.

### MenubarTrigger

- `className`: `string` - Additional CSS classes for the trigger button

### MenubarContent

- `align`: `"start" | "center" | "end"` - Alignment of the content (default: "start")
- `alignOffset`: `number` - Offset from alignment edge (default: -4)
- `sideOffset`: `number` - Distance from trigger (default: 8)
- `className`: `string` - Additional CSS classes

### MenubarItem

- `inset`: `boolean` - If true, adds left padding to align with items that have icons
- `variant`: `"default" | "destructive"` - Visual variant for the item (default: "default")
- `className`: `string` - Additional CSS classes

### MenubarCheckboxItem

- `checked`: `boolean` - Whether the item is checked
- `className`: `string` - Additional CSS classes

### MenubarRadioGroup

- `value`: `string` - The value of the selected radio item

### MenubarRadioItem

- `value`: `string` - The value of this radio item (required)
- `className`: `string` - Additional CSS classes

### MenubarLabel

- `inset`: `boolean` - If true, adds left padding to align with items that have icons
- `className`: `string` - Additional CSS classes

### MenubarSeparator

- `className`: `string` - Additional CSS classes

### MenubarShortcut

- `className`: `string` - Additional CSS classes

### MenubarSubTrigger

- `inset`: `boolean` - If true, adds left padding to align with items that have icons
- `className`: `string` - Additional CSS classes

### MenubarSubContent

- `className`: `string` - Additional CSS classes

## Accessibility

The Menubar component is fully accessible out of the box:

- **Keyboard Navigation**: Arrow keys navigate between menus and items
- **Enter/Space**: Opens menus and activates items
- **Escape**: Closes menus and returns focus to trigger
- **Home/End**: Jump to first/last item in a menu
- **Type-ahead**: Type to jump to matching items
- **ARIA Attributes**: Automatically managed for screen readers
- **Focus Management**: Focus is properly trapped and restored

### Keyboard Shortcuts

| Key       | Action                         |
| --------- | ------------------------------ |
| `→` / `←` | Navigate between menubar items |
| `↓` / `↑` | Navigate within menu content   |
| `Enter`   | Open menu / activate item      |
| `Space`   | Open menu / activate item      |
| `Escape`  | Close menu                     |
| `Home`    | Jump to first item             |
| `End`     | Jump to last item              |

## Related Components

- For single dropdown menus, use a `DropdownMenu` component
- For context menus (right-click), use a `ContextMenu` component
- For navigation, consider a `NavigationMenu` component
- For form selections, use a `Select` or `Combobox` component
