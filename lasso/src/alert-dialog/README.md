# AlertDialog Component

## Overview

The AlertDialog component is a modal dialog that interrupts the user with important content and expects a response. It's built on top of Radix UI's AlertDialog primitive and provides a consistent, accessible, and styled implementation for the Tennr design system. Unlike regular dialogs, alert dialogs are specifically designed for actions that require explicit user acknowledgment before proceeding.

## What It Is

The AlertDialog component consists of multiple sub-components that work together:

- **AlertDialog** (root): The container that manages the dialog state and behavior
- **AlertDialogTrigger**: The element that opens the dialog when clicked
- **AlertDialogPortal**: Renders the dialog content into a portal outside the DOM hierarchy
- **AlertDialogOverlay**: The semi-transparent backdrop behind the dialog
- **AlertDialogContent**: The main container for the dialog content
- **AlertDialogHeader**: A semantic container for the title and description
- **AlertDialogFooter**: A semantic container for action buttons
- **AlertDialogTitle**: The title/heading of the dialog
- **AlertDialogDescription**: The descriptive text explaining the action
- **AlertDialogAction**: The primary action button (typically destructive or confirming)
- **AlertDialogCancel**: The secondary button to dismiss the dialog

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns for alert dialogs
- **Focus Management**: Automatically traps focus within the dialog and returns focus on close
- **Modal Behavior**: Prevents interaction with the rest of the page while open
- **Animated**: Smooth open/close animations with fade and zoom effects
- **Customizable**: Accepts className props for styling customization on all sub-components
- **Keyboard Support**: Closes on Escape key, supports Tab navigation

## When to Use

Use the AlertDialog component when you need to:

1. **Destructive Actions**: Confirm before performing irreversible operations

   - Delete confirmations (files, accounts, records)
   - Permanent data removal
   - Overwriting existing data
   - Canceling ongoing processes

2. **Critical Decisions**: Require explicit user acknowledgment before proceeding

   - Logging out with unsaved changes
   - Navigating away from incomplete forms
   - Accepting terms and conditions
   - Confirming subscription changes

3. **Interrupt User Flow**: Stop the user to address something important

   - Session timeout warnings
   - Unsaved changes alerts
   - Permission requests
   - Important status changes

4. **Binary Choices**: Present a clear choice between two options

   - Save/Discard dialogs
   - Accept/Decline prompts
   - Continue/Cancel confirmations
   - Yes/No questions

## When NOT to Use

Avoid using the AlertDialog component when:

1. **Informational Content**: The message doesn't require a decision

   - Success notifications (use Toast)
   - Status updates (use Toast or Banner)
   - Help text (use Tooltip or Popover)
   - Progress indicators (use Progress component)

2. **Complex Forms**: The dialog needs extensive user input

   - Multi-field forms (use Dialog or Sheet)
   - Wizard flows (use a dedicated page or multi-step Dialog)
   - Settings panels (use Sheet or dedicated page)
   - Search interfaces (use Command or Dialog)

3. **Non-Critical Actions**: The action can be easily undone

   - Adding items to a list
   - Toggling preferences
   - Closing collapsible sections
   - Sorting or filtering data

4. **Frequent Interactions**: Would interrupt the user too often

   - Auto-save confirmations (save silently)
   - Form field validations (use inline validation)
   - Selection confirmations (use immediate feedback)
   - Hover states (use Tooltip or HoverCard)

5. **Navigation**: Simply moving between pages or sections

   - Link clicks (navigate directly)
   - Tab switching (use Tabs component)
   - Menu selections (use DropdownMenu)
   - Breadcrumb navigation

## Usage Example

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@tennr/lasso/alert-dialog";
import { Button } from "@tennr/lasso/button";

function DeleteConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Yes, delete account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Controlled Example

```tsx
import { useState } from "react";

function ControlledAlertDialog() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // Perform delete action
    console.log("Deleted!");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete Item</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this item?</AlertDialogTitle>
          <AlertDialogDescription>
            This item will be permanently removed from your collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Props Reference

### AlertDialog

- `open`: `boolean` - Controlled open state of the dialog
- `defaultOpen`: `boolean` - Initial open state when uncontrolled
- `onOpenChange`: `(open: boolean) => void` - Event handler called when open state changes

### AlertDialogTrigger

- `asChild`: `boolean` - Merges props onto the child element instead of rendering a button
- `className`: `string` - Additional CSS classes

### AlertDialogContent

- `className`: `string` - Additional CSS classes for the content container
- `forceMount`: `boolean` - Force mounting when used with animation libraries

### AlertDialogHeader

- `className`: `string` - Additional CSS classes for the header container

### AlertDialogFooter

- `className`: `string` - Additional CSS classes for the footer container

### AlertDialogTitle

- `className`: `string` - Additional CSS classes for the title

### AlertDialogDescription

- `className`: `string` - Additional CSS classes for the description

### AlertDialogAction

- `className`: `string` - Additional CSS classes (inherits Button styles)
- Standard button props are supported

### AlertDialogCancel

- `className`: `string` - Additional CSS classes (inherits outline Button styles)
- Standard button props are supported

### AlertDialogPortal

- `container`: `HTMLElement` - The container element to render the portal into
- `forceMount`: `boolean` - Force mounting when used with animation libraries

### AlertDialogOverlay

- `className`: `string` - Additional CSS classes for the overlay
- `forceMount`: `boolean` - Force mounting when used with animation libraries

## Accessibility

The AlertDialog component is fully accessible out of the box:

- **Role**: Uses `role="alertdialog"` to communicate its purpose to assistive technologies
- **Focus Management**: Focus is automatically moved to the first focusable element and trapped within the dialog
- **Keyboard Navigation**: Escape key closes the dialog, Tab cycles through focusable elements
- **Screen Reader**: Title and description are properly announced when the dialog opens
- **Focus Restoration**: Focus returns to the trigger element when the dialog closes
- **Labeling**: Content is automatically labeled by the title and described by the description

## Related Components

- For non-critical modals with complex content, use the `Dialog` component
- For side panel overlays, use the `Sheet` component
- For quick notifications, use the `Toast` component
- For contextual information, use `Tooltip` or `Popover` components
- For dropdown actions, use the `DropdownMenu` component
