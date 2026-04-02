# Drawer Component

## Overview

The Drawer component is a sliding panel that emerges from any edge of the screen, providing a secondary surface for navigation, forms, or detailed content. It's built on top of the Vaul drawer primitive and provides a consistent, accessible, and styled implementation for the Tennr design system. The drawer supports multiple directions and includes smooth animations for opening and closing.

## What It Is

The Drawer component consists of several sub-components that work together:

- **Drawer** (root): The container that manages the drawer state and direction
- **DrawerTrigger**: The element that opens the drawer when clicked
- **DrawerPortal**: Renders the drawer content in a portal outside the DOM hierarchy
- **DrawerOverlay**: The semi-transparent backdrop behind the drawer
- **DrawerClose**: A button that closes the drawer when clicked
- **DrawerContent**: The main container for the drawer's content
- **DrawerHeader**: A styled header section for title and description
- **DrawerFooter**: A styled footer section for actions
- **DrawerTitle**: The drawer's title text with proper accessibility
- **DrawerDescription**: Supplementary text describing the drawer's purpose

### Key Features

- **Multi-directional**: Opens from right (default), left, top, or bottom edges
- **Accessible**: Built on Vaul primitives, following WAI-ARIA design patterns
- **Animated**: Smooth slide-in/out animations with fade overlay
- **Overlay Control**: Option to show or hide the backdrop overlay
- **Draggable Handle**: Optional drag handle for bottom drawers on mobile
- **Responsive**: Automatically adjusts width/height based on direction and screen size
- **Customizable**: Accepts className props for styling customization

## When to Use

Use the Drawer component when you need to:

1. **Display Supplementary Content**: Show related information without leaving the current page

   - Item details in a list view
   - User profile information
   - Order or referral details
   - Activity logs and history

2. **Forms and Editing**: Provide a focused space for data entry

   - Create/edit forms for entities
   - Settings panels
   - Filter configurations
   - Quick edit interfaces

3. **Mobile Navigation**: Offer navigation menus on smaller screens

   - Side navigation menus
   - Filter panels in mobile views
   - Action menus

4. **Multi-step Workflows**: Guide users through a sequence within a panel

   - Wizards that don't need full-page focus
   - Step-by-step configurations
   - Progressive disclosure of complex forms

5. **Preview Panels**: Show previews while maintaining context

   - Document previews
   - Email or message previews
   - File information panels

## When NOT to Use

Avoid using the Drawer component when:

1. **Critical Actions**: The content requires full user attention and confirmation

   - Destructive action confirmations (use AlertDialog)
   - Important decisions (use Dialog)
   - Error states requiring immediate action

2. **Simple Messages**: Brief notifications or confirmations

   - Success messages (use Toast)
   - Simple alerts (use Alert)
   - Tooltips or hints (use Tooltip)

3. **Full-Page Content**: The content is substantial enough for its own page

   - Complex multi-section forms
   - Data-heavy interfaces
   - Content requiring its own URL

4. **Quick Actions**: The interaction is momentary

   - Dropdown menus (use DropdownMenu)
   - Context menus (use ContextMenu)
   - Popovers (use Popover)

5. **Always-Visible Sidebars**: The panel should persist alongside main content

   - App navigation sidebars (use Sidebar)
   - Persistent tool panels
   - Chat interfaces

## Usage Example

```tsx
import { Button } from "@tennr/lasso/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@tennr/lasso/drawer";

function MyComponent() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description of what this drawer contains.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{/* Your content goes here */}</div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

### Example with Controlled State

```tsx
import { useState } from "react";

import { Button } from "@tennr/lasso/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@tennr/lasso/drawer";

function ControlledDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Controlled Drawer</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <p>This drawer is controlled via state.</p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

### Example with Different Directions

```tsx
<Drawer direction="bottom">
  <DrawerTrigger asChild>
    <Button>Open Bottom Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Bottom Drawer</DrawerTitle>
      <DrawerDescription>
        This drawer slides up from the bottom.
      </DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

## Props Reference

### Drawer

- `direction`: `"right" | "left" | "top" | "bottom"` - Direction from which the drawer opens (default: `"right"`)
- `open`: `boolean` - Controlled open state
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes
- `modal`: `boolean` - Whether the drawer should block interactions with the rest of the page (default: `true`)

### DrawerTrigger

- `asChild`: `boolean` - Merge props onto child element instead of rendering a button
- All standard button props

### DrawerContent

- `showingDraggingHandle`: `boolean` - Show a drag handle for bottom drawers (default: `true`)
- `showOverlay`: `boolean` - Show the semi-transparent overlay behind the drawer (default: `true`)
- `className`: `string` - Additional CSS classes

### DrawerHeader

- `className`: `string` - Additional CSS classes

### DrawerFooter

- `className`: `string` - Additional CSS classes

### DrawerTitle

- `className`: `string` - Additional CSS classes

### DrawerDescription

- `className`: `string` - Additional CSS classes

### DrawerClose

- `asChild`: `boolean` - Merge props onto child element instead of rendering a button
- All standard button props

### DrawerOverlay

- `className`: `string` - Additional CSS classes

## Direction Behavior

The drawer adapts its appearance based on direction:

| Direction | Position                | Default Size         | Border        |
| --------- | ----------------------- | -------------------- | ------------- |
| `right`   | Right edge, full height | Max width 576px (xl) | Left border   |
| `left`    | Left edge, full height  | Max width 576px (xl) | Right border  |
| `top`     | Top edge, full width    | Max height 80vh      | Bottom border |
| `bottom`  | Bottom edge, full width | Max height 80vh      | Top border    |

## Accessibility

The Drawer component is fully accessible out of the box:

- Focus is automatically trapped within the drawer when open
- Keyboard navigation support (Tab, Shift+Tab, Escape to close)
- ARIA attributes automatically managed (role, aria-modal, aria-labelledby, aria-describedby)
- Screen reader announcements for state changes
- Focus returns to trigger element when closed
- Proper heading hierarchy with DrawerTitle

## Related Components

- For modal dialogs requiring user action, use the `Dialog` component
- For destructive action confirmations, use the `AlertDialog` component
- For persistent sidebars, use the `Sidebar` component
- For brief notifications, use the `Toast` component
- For quick selections, use the `DropdownMenu` component
