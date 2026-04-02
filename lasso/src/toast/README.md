# Toast Component

## Overview

The Toast component provides a notification system for displaying brief, non-blocking messages to users. It's built on top of [Sonner](https://sonner.emilkowal.ski/), a highly customizable toast library for React, with consistent styling for the Tennr design system. Toast notifications are ideal for communicating feedback about user actions, system status, or important updates without interrupting the user's workflow.

## What It Is

The Toast system consists of two main exports:

- **Toaster**: The container component that renders and manages toast notifications. Place this once in your application layout.
- **toast**: A function for triggering toast notifications from anywhere in your application

### Key Features

- **Multiple Variants**: Success, error, warning, info, and loading states with appropriate icons
- **Theme Support**: Automatically adapts to light/dark mode via next-themes integration
- **Customizable Position**: Supports 6 positions (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- **Auto-Dismiss**: Toasts automatically disappear after a configurable duration
- **Close Button**: Optional close button for manual dismissal
- **Action Support**: Can include action buttons for quick user interactions
- **Descriptions**: Supports additional description text for detailed messages
- **Stacking**: Multiple toasts stack elegantly without overlapping
- **Consistent Styling**: Pre-styled with Tennr design system colors and shadows

## When to Use

Use the Toast component when you need to:

1. **Confirm User Actions**: Provide feedback that an action was successful or failed

   - Form submissions
   - File uploads
   - Save operations
   - Delete confirmations

2. **System Status Updates**: Inform users of background processes or status changes

   - Network connectivity changes
   - Sync status
   - Background job completions
   - Real-time updates

3. **Non-Blocking Alerts**: Display important information without interrupting the user's workflow

   - Session expiration warnings
   - New feature announcements
   - Helpful tips
   - Gentle reminders

4. **Error Notifications**: Communicate errors that don't require immediate action

   - Failed API calls (with retry option)
   - Validation errors (that don't block form submission)
   - Temporary service unavailability

5. **Success Confirmations**: Celebrate completed actions

   - "Item added to cart"
   - "Changes saved"
   - "Email sent successfully"
   - "Copy to clipboard"

## When NOT to Use

Avoid using the Toast component when:

1. **Critical Decisions**: The user must acknowledge or make a decision before continuing

   - Destructive action confirmations (use AlertDialog)
   - Payment confirmations (use Dialog or dedicated page)
   - Terms acceptance (use Dialog with checkbox)
   - Error states that block functionality (use Alert or inline error)

2. **Form Validation**: Displaying validation errors for form fields

   - Use inline error messages below fields
   - Use Form component's built-in validation display
   - Use Alert for form-level errors that need attention

3. **Long Content**: The message is too long for a brief notification

   - Use a Dialog for detailed information
   - Use a Sheet for complex content
   - Use a dedicated page for lengthy content

4. **Required Reading**: Users must read and understand the entire message

   - Use AlertDialog for important notices
   - Use a dedicated information page
   - Use a Banner for persistent messages

5. **Persistent Information**: The information should remain visible indefinitely

   - Use a Banner component
   - Use an Alert component
   - Use inline status indicators

6. **Complex Interactions**: The notification requires multiple inputs or complex interactions

   - Use a Dialog or Sheet component
   - Use a dedicated form or page

## Usage Example

### Basic Setup

First, add the Toaster component to your application layout (typically in `_app.tsx` or `layout.tsx`):

```tsx
import { Toaster } from "@tennr/lasso/toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </>
  );
}
```

### Triggering Toasts

```tsx
import { toast } from "@tennr/lasso/toast";

function MyComponent() {
  const handleSave = async () => {
    try {
      await saveData();
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

### Different Toast Types

```tsx
import { toast } from "@tennr/lasso/toast";

// Success toast
toast.success("File uploaded successfully!");

// Error toast
toast.error("Something went wrong. Please try again.");

// Warning toast
toast.warning("Your session will expire in 5 minutes.");

// Info toast
toast.info("New features are available. Check them out!");

// Default toast
toast("This is a default notification.");
```

### Toast with Description

```tsx
toast("File uploaded", {
  description: "Your file has been successfully uploaded to the server.",
});
```

### Toast with Action Button

```tsx
toast("Item deleted", {
  action: {
    label: "Undo",
    onClick: () => restoreItem(),
  },
});
```

### Custom Duration

```tsx
// Show for 10 seconds
toast("Important message", {
  duration: 10000,
});

// Show indefinitely (useful for debugging)
toast("Persistent message", {
  duration: Infinity,
});
```

## Props Reference

### Toaster Props

The Toaster component accepts all props from Sonner's Toaster, plus:

- `position`: `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"` - Position of toast notifications (default: "bottom-right")
- `theme`: `"light" | "dark" | "system"` - Theme for toast styling (auto-detected from next-themes)
- `closeButton`: `boolean` - Whether to show close button on toasts
- `duration`: `number` - Default duration in milliseconds before auto-dismiss (default: 4000)
- `richColors`: `boolean` - Whether to use richer colors for variants

### toast() Function Options

- `description`: `string` - Additional text below the main message
- `duration`: `number` - Duration in milliseconds (overrides default)
- `action`: `{ label: string; onClick: () => void }` - Action button configuration
- `cancel`: `{ label: string; onClick: () => void }` - Cancel button configuration
- `id`: `string | number` - Custom ID for the toast
- `onDismiss`: `(toast) => void` - Callback when toast is dismissed
- `onAutoClose`: `(toast) => void` - Callback when toast auto-closes

### toast Methods

- `toast(message, options?)` - Default toast
- `toast.success(message, options?)` - Success variant with check icon
- `toast.error(message, options?)` - Error variant with X icon
- `toast.warning(message, options?)` - Warning variant with warning icon
- `toast.info(message, options?)` - Info variant with info icon
- `toast.loading(message, options?)` - Loading variant with spinner
- `toast.promise(promise, options)` - Toast that updates based on promise state
- `toast.dismiss(id?)` - Dismiss a specific toast or all toasts

## Styling

The Toast component comes pre-styled with Tennr design system:

- **Background**: White background with subtle border
- **Shadow**: Variant-specific fractal shadows (success, info, warning, error, neutral)
- **Typography**: Medium weight, 14px size, proper line height
- **Icons**: Phosphor icons matching each variant

## Accessibility

The Toast component includes accessibility features:

- Role announcements for screen readers
- Keyboard dismissible
- Focus management for action buttons
- Appropriate ARIA attributes
- Color contrast compliant

## Related Components

- For critical confirmations requiring user action, use `AlertDialog`
- For inline error messages, use form field validation or `Alert`
- For persistent messages, use `Banner` or `Alert`
- For loading states on buttons, consider `ActionButton`
- For detailed content in overlays, use `Dialog` or `Sheet`
