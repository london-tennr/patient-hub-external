# Sheet Component

## Overview

The Sheet component is a panel that slides in from the edge of the screen, typically used for navigation, forms, or displaying supplementary content. It overlays the main content with a semi-transparent backdrop and provides a focused interaction space. Built on top of Radix UI's Dialog primitive and provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Sheet component consists of several sub-components that work together:

- **Sheet** (root): The container that manages the sheet state and behavior
- **SheetTrigger**: The element that opens the sheet when clicked
- **SheetContent**: The sliding panel that contains the sheet content
- **SheetHeader**: A container for the sheet title and description
- **SheetFooter**: A container for actions, typically placed at the bottom
- **SheetTitle**: The title of the sheet (required for accessibility)
- **SheetDescription**: A description or subtitle for the sheet
- **SheetClose**: A button to close the sheet
- **SheetPortal**: Renders the sheet outside the DOM hierarchy (used internally)
- **SheetOverlay**: The backdrop behind the sheet (used internally)

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA dialog patterns
- **Animated**: Smooth slide-in/out animations with fade effects
- **Flexible Positioning**: Supports four slide-in directions (top, right, bottom, left)
- **Focus Management**: Automatically traps focus within the sheet when open
- **Customizable**: Accepts className props for styling customization
- **Overlay Dismissal**: Clicking the overlay closes the sheet by default

## When to Use

Use the Sheet component when you need to:

1. **Side Navigation**: Display navigation menus or settings panels that slide in from the side

   - Mobile navigation menus
   - User profile panels
   - Settings or preferences panels
   - Filter panels for lists or tables

2. **Forms and Input**: Present forms or input interfaces without leaving the current context

   - Quick edit forms
   - New item creation forms
   - Search and filter interfaces
   - User input collection

3. **Detail Views**: Show additional information about a selected item

   - Item details in a list
   - Preview panels
   - Expanded information views
   - Help or documentation panels

4. **Multi-step Workflows**: Guide users through processes while keeping the main view visible

   - Checkout flows
   - Setup wizards
   - Configuration workflows
   - Onboarding steps

5. **Mobile-Friendly Interfaces**: Provide a touch-friendly pattern for secondary content
   - Mobile menus
   - Bottom sheets for actions
   - Sliding panels for options

## When NOT to Use

Avoid using the Sheet component when:

1. **Critical Decisions**: Content requires the user's full attention and commitment

   - Use a Dialog/Modal for confirmations
   - Use a dedicated page for complex forms
   - Use an Alert Dialog for destructive actions

2. **Primary Content**: The content is the main focus of the page

   - Use a dedicated page or route instead
   - Use a main content area
   - Consider tabs or sections within the page

3. **Simple Actions**: For quick, simple actions that don't need a panel

   - Use a Dropdown Menu for action lists
   - Use a Popover for tooltips or small forms
   - Use inline editing for quick changes

4. **Multiple Simultaneous Panels**: You need to show multiple panels at once

   - Use a split-pane layout
   - Use tabs or accordions
   - Consider a dashboard layout

5. **Large Data Entry**: Complex forms with many fields

   - Use a dedicated page
   - Use a multi-step form
   - Consider a wizard component

6. **Persistent Content**: Content that should remain visible while interacting with the main page
   - Use a sidebar component
   - Use a drawer that doesn't overlay
   - Use a resizable panel

## Usage Example

```tsx
import { Button } from "@tennr/lasso/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@tennr/lasso/sheet";

function MyComponent() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Settings</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your account settings and preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {/* Sheet content goes here */}
          <p>Your settings form or content here.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

### Example with Different Sides

```tsx
// Left side sheet
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Menu</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    {/* Navigation items */}
  </SheetContent>
</Sheet>

// Bottom sheet (useful for mobile)
<Sheet>
  <SheetTrigger asChild>
    <Button>Show Options</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Options</SheetTitle>
    </SheetHeader>
    {/* Options content */}
  </SheetContent>
</Sheet>
```

### Example with Footer Actions

```tsx
import { Button } from "@tennr/lasso/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@tennr/lasso/sheet";

function EditProfileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">{/* Form fields */}</div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

### Controlled Example

```tsx
import { useState } from "react";

import { Button } from "@tennr/lasso/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@tennr/lasso/sheet";

function ControlledSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Sheet</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Controlled Sheet</SheetTitle>
          </SheetHeader>
          <p>This sheet is controlled externally.</p>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </SheetContent>
      </Sheet>
    </>
  );
}
```

## Props Reference

### Sheet

- `open`: `boolean` - Controlled open state
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes
- `defaultOpen`: `boolean` - Initial open state for uncontrolled usage
- `modal`: `boolean` - Whether the sheet should block interaction with the rest of the page (default: true)

### SheetTrigger

- `asChild`: `boolean` - Merge props onto the child element instead of rendering a button
- `className`: `string` - Additional CSS classes

### SheetContent

- `side`: `"top" | "right" | "bottom" | "left"` - The edge from which the sheet slides in (default: "right")
- `className`: `string` - Additional CSS classes
- `children`: `React.ReactNode` - The content to display in the sheet

### SheetHeader

- `className`: `string` - Additional CSS classes
- `children`: `React.ReactNode` - Typically contains SheetTitle and SheetDescription

### SheetFooter

- `className`: `string` - Additional CSS classes
- `children`: `React.ReactNode` - Typically contains action buttons

### SheetTitle

- `className`: `string` - Additional CSS classes
- Required for accessibility - provides a label for the sheet

### SheetDescription

- `className`: `string` - Additional CSS classes
- Provides additional context for screen readers

### SheetClose

- `asChild`: `boolean` - Merge props onto the child element
- `className`: `string` - Additional CSS classes

## Accessibility

The Sheet component is fully accessible out of the box:

- Focus is automatically trapped within the sheet when open
- `Escape` key closes the sheet
- Clicking the overlay closes the sheet
- ARIA attributes (`role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`) are automatically managed
- Focus is returned to the trigger element when closed
- Screen reader announcements for opening and closing
- SheetTitle provides the accessible name for the dialog

## Related Components

- For modal dialogs that require user decisions, use the Dialog component
- For destructive action confirmations, use the AlertDialog component
- For simple tooltips or small content, use the Popover component
- For dropdown menus, use the DropdownMenu component
- For permanent side navigation, use the Sidebar component
- For collapsible panels, use the Collapsible component
