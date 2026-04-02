# Alert Component

## Overview

The Alert component is a flexible notification component designed to display important messages to users. It provides a consistent way to communicate information, warnings, errors, and other status updates. The component supports optional icons, titles, and descriptions, making it suitable for a wide range of messaging needs in the Tennr design system.

## What It Is

The Alert component consists of three sub-components that work together:

- **Alert** (root): The container that provides the alert styling and layout structure
- **AlertHeader**: An optional title for the alert message
- **AlertContent**: The main content/description of the alert

### Key Features

- **Accessible**: Uses proper ARIA roles (`role="alert"`) for screen reader support
- **Flexible Layout**: Automatically adjusts layout based on whether an icon is present
- **Variant Support**: Provides default and destructive variants for different message types
- **Icon Support**: Optional icon support with automatic spacing and alignment
- **Customizable**: Accepts className props for styling customization
- **Grid Layout**: Uses CSS Grid for flexible, responsive layouts

## When to Use

Use the Alert component when you need to:

1. **Display Important Information**: Show users critical or important messages that require attention

   - System status updates
   - Feature announcements
   - Important notices
   - Information messages

2. **Show Error Messages**: Display error states and validation messages

   - Form validation errors
   - API error messages
   - Operation failure notifications
   - Session expiration warnings

3. **Provide Contextual Feedback**: Give users feedback about actions or system state

   - Success confirmations (with appropriate styling)
   - Warning messages
   - Status updates
   - Action results

4. **Communicate System Status**: Inform users about system conditions or requirements

   - Maintenance notices
   - Feature availability
   - Account status
   - Permission requirements

5. **Display Non-Blocking Messages**: Show information that doesn't require immediate action

   - Tips and hints
   - Helpful information
   - Educational content
   - Contextual guidance

## When NOT to Use

Avoid using the Alert component when:

1. **Blocking Actions**: You need to block user interaction until they acknowledge the message

   - Critical errors that require immediate attention (use AlertDialog or Modal)
   - Confirmation dialogs (use AlertDialog)
   - Required user input (use a form with validation)

2. **Toast Notifications**: You need temporary, dismissible notifications

   - Success messages that auto-dismiss (use a Toast component)
   - Temporary status updates (use a Toast or Notification component)
   - Non-critical feedback (use a Toast component)

3. **Inline Validation**: You need to show validation errors directly next to form fields

   - Field-level validation (use inline error messages)
   - Real-time input feedback (use field-specific error components)

4. **Navigation Elements**: You need clickable navigation or action items

   - Navigation menus (use Menu or Nav components)
   - Action lists (use Button groups or Lists)
   - Interactive content (use Card or Panel components)

5. **Dense Information Display**: You need to show large amounts of structured data

   - Tables (use Table component)
   - Lists of items (use List component)
   - Complex data structures (use Card or Panel components)

6. **Decorative Elements**: The message is purely decorative or doesn't convey important information

   - Decorative banners
   - Marketing content
   - Non-functional UI elements

## Usage Example

```tsx
import { Info } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@tennr/lasso/alert";

function MyComponent() {
  return (
    <Alert variant="default">
      <Info weight="light" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}
```

### Example with Error Variant

```tsx
import { Warning } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@tennr/lasso/alert";

function ErrorAlert() {
  return (
    <Alert variant="error">
      <Warning weight="light" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}
```

### Example without Icon

```tsx
import { Alert, AlertDescription, AlertTitle } from "@tennr/lasso/alert";

function SimpleAlert() {
  return (
    <Alert>
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>This is an alert without an icon.</AlertDescription>
    </Alert>
  );
}
```

### Example with Only Description

```tsx
import { Alert, AlertDescription } from "@tennr/lasso/alert";

function MinimalAlert() {
  return (
    <Alert>
      <AlertDescription>
        This is a minimal alert with just a description.
      </AlertDescription>
    </Alert>
  );
}
```

## Props Reference

### Alert

- `className`: `string` - Additional CSS classes to apply to the alert container
- `children`: `React.ReactNode` - The content of the alert (typically includes icon, AlertTitle, and/or AlertDescription)

### AlertTitle

- `className`: `string` - Additional CSS classes to apply to the title
- `children`: `React.ReactNode` - The title text content

### AlertDescription

- `className`: `string` - Additional CSS classes to apply to the description
- `children`: `React.ReactNode` - The description content (can include multiple paragraphs or other elements)

## Layout Behavior

The Alert component uses CSS Grid for flexible layouts:

- **With Icon**: When an icon is present, the grid automatically creates two columns with proper spacing
- **Without Icon**: When no icon is present, the grid adjusts to a single column layout
- **Automatic Alignment**: Icons are automatically aligned and sized appropriately
- **Responsive**: The layout adapts to content size and container width

## Accessibility

The Alert component includes accessibility features:

- **ARIA Role**: Uses `role="alert"` to announce important messages to screen readers
- **Semantic Structure**: Proper heading structure when AlertTitle is used
- **Color Contrast**: Variants ensure sufficient color contrast for readability
- **Keyboard Accessible**: Content is accessible via keyboard navigation

## Styling

The Alert component supports customization through:

- **Variants**: Pre-defined visual styles for different message types
- **Custom Classes**: Additional className props for fine-grained styling control
- **Icon Integration**: Automatic icon sizing and positioning
- **Responsive Design**: Adapts to different screen sizes

## Related Components

- For blocking dialogs that require user interaction, use the `AlertDialog` component
- For temporary, dismissible notifications, use a `Toast` component
- For inline form validation, use field-specific error components
- For success confirmations that auto-dismiss, consider a `Toast` component
- For complex content with actions, consider a `Card` component
