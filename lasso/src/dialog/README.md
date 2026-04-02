# Dialog Component

## Overview

The Dialog component is a modal window that appears on top of the main content, requiring user attention before they can continue. It overlays the page content with a semi-transparent backdrop and centers the dialog content, creating a focused interaction area. Built on top of Radix UI's Dialog primitive, it provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Dialog component consists of several sub-components that work together:

- **Dialog** (root): The container that manages the dialog state and behavior
- **DialogTrigger**: The element (usually a button) that opens the dialog when clicked
- **DialogPortal**: Renders the dialog into a portal outside the DOM hierarchy
- **DialogOverlay**: The semi-transparent backdrop behind the dialog
- **DialogContent**: The main container for the dialog's content
- **DialogHeader**: A semantic container for the dialog's title and description
- **DialogFooter**: A semantic container for action buttons
- **DialogTitle**: The heading that describes the dialog's purpose
- **DialogDescription**: Additional context about the dialog's content
- **DialogClose**: A button or element that closes the dialog

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Animated**: Smooth fade and zoom animations on open/close
- **Focus Management**: Automatically traps focus within the dialog
- **Customizable**: Supports optional close button and overlay visibility
- **Responsive**: Adapts to different screen sizes with mobile-friendly defaults
- **Portal Rendering**: Renders outside the DOM hierarchy to avoid z-index issues

## When to Use

Use the Dialog component when you need to:

1. **Focused User Attention**: Require the user to acknowledge information or complete an action before proceeding

   - Confirmation dialogs ("Are you sure you want to delete?")
   - Important notifications that require acknowledgment
   - Critical warnings or alerts
   - Terms and conditions acceptance

2. **Form Input**: Collect user input in a focused, distraction-free context

   - Edit profile forms
   - Create new item forms
   - Settings modifications
   - Login/signup flows

3. **Preview Content**: Show detailed content that doesn't warrant a full page navigation

   - Image previews
   - Document previews
   - Detail views
   - Quick view modals

4. **Multi-Step Workflows**: Guide users through a process that requires their focused attention

   - Wizard-style forms
   - Onboarding flows
   - Checkout processes
   - Configuration wizards

## When NOT to Use

Avoid using the Dialog component when:

1. **Non-Critical Information**: The information doesn't require interrupting the user's flow

   - Status updates (use a Toast or Notification)
   - Inline feedback (use inline messages)
   - Supplementary information (use a Tooltip or Popover)
   - Optional tips (use a Banner or Info block)

2. **Frequent Interactions**: The action happens frequently and shouldn't require a modal

   - Quick toggles (use inline controls)
   - Repetitive actions (use inline editing)
   - Navigation (use links or buttons)
   - Search (use a search component)

3. **Simple Choices**: A simpler component would suffice

   - Yes/No questions (consider AlertDialog for destructive actions)
   - Dropdown selections (use a Select or DropdownMenu)
   - Single choice selections (use a RadioGroup)
   - Multiple choice selections (use a Checkbox group)

4. **Mobile Primary Actions**: The action is central to mobile user experience

   - Main navigation (use a Drawer or Sheet)
   - Primary app features (use full-screen views)
   - Contextual menus (use a DropdownMenu or ActionSheet)

5. **Content-Heavy Displays**: Large amounts of content that need more space

   - Long articles (use a page or side panel)
   - Complex data tables (use a full page view)
   - Multi-section content (use tabs or accordions on a page)

## Usage Example

```tsx
import { Button } from "@tennr/lasso/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@tennr/lasso/dialog";

function MyComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/* Form fields go here */}</div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Example with Controlled State

```tsx
import { useState } from "react";

function ControlledDialog() {
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    await saveData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>
            This dialog's state is controlled externally.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Example: Confirmation Dialog

```tsx
function DeleteConfirmation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Props Reference

### Dialog

Inherits all props from Radix UI's `Dialog.Root`:

- `open`: `boolean` - Controlled open state
- `defaultOpen`: `boolean` - Initial open state (uncontrolled)
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes
- `modal`: `boolean` - Whether the dialog should be modal (default: true)

### DialogTrigger

Inherits all props from Radix UI's `Dialog.Trigger`:

- `asChild`: `boolean` - Merge props onto the child element instead of rendering a button

### DialogContent

- `showCloseButton`: `boolean` - Whether to show the close button (default: true)
- `showOverlay`: `boolean` - Whether to show the overlay backdrop (default: true)
- `className`: `string` - Additional CSS classes

### DialogHeader

- `className`: `string` - Additional CSS classes

### DialogFooter

- `className`: `string` - Additional CSS classes

### DialogTitle

Inherits all props from Radix UI's `Dialog.Title`:

- `className`: `string` - Additional CSS classes

### DialogDescription

Inherits all props from Radix UI's `Dialog.Description`:

- `className`: `string` - Additional CSS classes

### DialogClose

Inherits all props from Radix UI's `Dialog.Close`:

- `asChild`: `boolean` - Merge props onto the child element instead of rendering a button

### DialogOverlay

- `className`: `string` - Additional CSS classes

## Accessibility

The Dialog component is fully accessible out of the box:

- **Keyboard Navigation**: Escape key closes the dialog; Tab cycles through focusable elements
- **Focus Management**: Focus is trapped within the dialog and returns to the trigger on close
- **ARIA Attributes**: Automatically manages `role="dialog"`, `aria-modal`, `aria-labelledby`, and `aria-describedby`
- **Screen Reader Support**: Title and description are properly announced
- **Click Outside**: Clicking the overlay closes the dialog (when modal is true)

## Related Components

- For destructive confirmation dialogs with explicit cancel/confirm actions, consider `AlertDialog`
- For non-modal side panels, use a `Sheet` or `Drawer` component
- For simple tooltips or additional info, use a `Tooltip` or `Popover`
- For notifications that don't require user action, use a `Toast`
