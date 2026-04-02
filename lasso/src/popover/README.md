# Popover Component

## Overview

The Popover component is a floating overlay that displays contextual information or interactive content positioned relative to a trigger element. It's built on top of Radix UI's Popover primitive and provides a consistent, accessible, and styled implementation for the Tennr design system. Popovers are perfect for displaying supplementary content, forms, menus, or any content that should appear on-demand without navigating away from the current context.

## What It Is

The Popover component consists of five sub-components that work together:

- **Popover** (root): The container that manages the popover state and behavior
- **PopoverTrigger**: The element (usually a button) that opens the popover when clicked
- **PopoverContent**: The floating panel that contains the popover's content
- **PopoverAnchor**: An optional anchor element to position the popover relative to (instead of the trigger)
- **PopoverClose**: A button that closes the popover when clicked

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns for popovers
- **Animated**: Smooth open/close animations with fade, zoom, and slide effects
- **Flexible Positioning**: Supports various alignment and side positioning options
- **Customizable**: Accepts className props for styling customization
- **Portal Rendering**: Content renders in a portal for proper stacking context
- **Click Outside to Close**: Automatically closes when clicking outside the popover
- **Focus Management**: Properly traps and manages focus within the popover

## When to Use

Use the Popover component when you need to:

1. **Display Contextual Information**: Show additional details or options related to an element

   - User profile cards
   - Quick previews
   - Tooltips with interactive content
   - Info panels

2. **Inline Forms**: Present small forms without leaving the current context

   - Quick edit forms
   - Settings adjustments
   - Filter configurations
   - Search refinements

3. **Action Menus**: Provide a set of actions related to a specific element

   - Item options (edit, delete, share)
   - Quick actions
   - Context-specific controls
   - Share/export options

4. **Selection Interfaces**: Allow users to make selections from a dropdown-like interface

   - Date pickers
   - Color pickers
   - Tag selectors
   - Custom dropdowns

5. **Rich Content Display**: Show content that's too complex for a tooltip

   - Preview cards
   - Mini dashboards
   - Help content
   - Notification details

## When NOT to Use

Avoid using the Popover component when:

1. **Full-Page Interactions**: The content requires the user's full attention

   - Complex forms (use a Dialog or Modal)
   - Multi-step workflows (use a Wizard or dedicated page)
   - Critical confirmations (use an AlertDialog)
   - Large data displays (use a Sheet or full page)

2. **Simple Text Information**: The content is just explanatory text without interaction

   - Help text (use a Tooltip)
   - Status indicators (use a Badge)
   - Simple labels (use inline text)
   - Static descriptions (use a Tooltip)

3. **Navigation Menus**: The content is primarily for navigation

   - Main navigation (use a NavigationMenu)
   - Context menus (use a ContextMenu)
   - Dropdown navigation (use a DropdownMenu)

4. **Toast/Notification Patterns**: The content should appear temporarily and automatically

   - Success messages (use a Toast)
   - Error notifications (use a Toast or Alert)
   - System messages (use a Toast)

5. **Persistent Content**: The content should remain visible while the user works

   - Sidebars (use a Sheet or Sidebar)
   - Toolbars (use a fixed/sticky element)
   - Status panels (use a dedicated section)

## Usage Example

```tsx
import { Button } from "@tennr/lasso/button";
import { Popover, PopoverContent, PopoverTrigger } from "@tennr/lasso/popover";

function MyComponent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Settings</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <h4 className="font-medium">Settings</h4>
          <p className="text-sm text-muted-foreground">
            Configure your preferences here.
          </p>
          {/* Your content here */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Example with PopoverClose

```tsx
import { Button } from "@tennr/lasso/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@tennr/lasso/popover";

function MenuPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="grid gap-2">
          <PopoverClose asChild>
            <Button variant="ghost" className="justify-start">
              Edit
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button variant="ghost" className="justify-start">
              Duplicate
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button variant="destructive" className="justify-start">
              Delete
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Example with Custom Positioning

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Show Details</Button>
  </PopoverTrigger>
  <PopoverContent align="start" sideOffset={8}>
    <div className="space-y-2">
      <p className="text-sm">This popover is aligned to the start</p>
      <p className="text-sm text-muted-foreground">
        With a custom side offset of 8px
      </p>
    </div>
  </PopoverContent>
</Popover>
```

### Example with PopoverAnchor

```tsx
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@tennr/lasso/popover";

function AnchoredPopover() {
  return (
    <Popover>
      <PopoverAnchor asChild>
        <div className="w-full h-20 border rounded flex items-center justify-center">
          Anchor Area
        </div>
      </PopoverAnchor>
      <PopoverTrigger asChild>
        <Button>Open (anchored to area above)</Button>
      </PopoverTrigger>
      <PopoverContent>
        This popover is positioned relative to the anchor, not the trigger.
      </PopoverContent>
    </Popover>
  );
}
```

## Props Reference

### Popover

The root component that provides state management for the popover.

- `open`: `boolean` - Controlled open state
- `defaultOpen`: `boolean` - Initial open state for uncontrolled usage
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes
- `modal`: `boolean` - Whether the popover should be modal (traps focus). Defaults to `false`

### PopoverTrigger

The element that triggers the popover to open.

- `asChild`: `boolean` - Merge props onto the child element instead of rendering a button
- All standard button attributes when not using `asChild`

### PopoverContent

The floating panel that contains the popover content.

- `align`: `"start" | "center" | "end"` - Horizontal alignment relative to the trigger. Defaults to `"center"`
- `sideOffset`: `number` - Distance in pixels from the trigger. Defaults to `4`
- `side`: `"top" | "right" | "bottom" | "left"` - Preferred side to render on
- `alignOffset`: `number` - Offset in pixels from the aligned edge
- `avoidCollisions`: `boolean` - Whether to flip to avoid viewport edges. Defaults to `true`
- `collisionPadding`: `number | Padding` - Padding from viewport edges for collision detection
- `container`: `HTMLElement` - Custom container element for the portal
- `className`: `string` - Additional CSS classes

### PopoverAnchor

An optional element to use as the positioning anchor instead of the trigger.

- `asChild`: `boolean` - Merge props onto the child element
- All standard element attributes

### PopoverClose

A button that closes the popover when clicked.

- `asChild`: `boolean` - Merge props onto the child element instead of rendering a button
- All standard button attributes when not using `asChild`

## Accessibility

The Popover component is fully accessible out of the box:

- **Keyboard Navigation**: Press `Escape` to close the popover
- **Focus Management**: Focus is moved to the popover content when opened and returned to the trigger when closed
- **ARIA Attributes**: Automatically manages `aria-expanded`, `aria-controls`, and `aria-haspopup`
- **Screen Reader Support**: Content is announced appropriately when the popover opens
- **Click Outside**: Clicking outside the popover closes it

## Styling Notes

- The default width is `18rem` (w-72). Override with the `className` prop on `PopoverContent`
- Animations include fade, zoom, and directional slide based on the popover's position
- Uses design system tokens for colors (`bg-popover`, `text-popover-foreground`, `border-border`)
- Content has `4` padding by default; adjust with `className`

## Related Components

- For simple text hints, use a **Tooltip** component
- For full-screen overlays requiring confirmation, use a **Dialog** or **AlertDialog**
- For navigation menus, use a **DropdownMenu** or **NavigationMenu**
- For side panels with substantial content, use a **Sheet** component
- For right-click menus, use a **ContextMenu** component
