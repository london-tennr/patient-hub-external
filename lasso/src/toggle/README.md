# Toggle Component

## Overview

The Toggle component is a two-state button that can be either on or off. It's commonly used for enabling/disabling features, formatting text (bold, italic, strikethrough), or switching between two modes. It's built on top of Radix UI's Toggle primitive and provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Toggle component is a single interactive element that:

- **Manages Binary State**: Handles on/off state with visual feedback
- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Styled Variants**: Supports default (transparent) and outline (bordered) visual styles
- **Multiple Sizes**: Available in small, default, and large sizes
- **Icon-Friendly**: Designed to work seamlessly with icons, text, or both

### Key Features

- **Accessible**: Built on Radix UI primitives with proper ARIA attributes
- **Keyboard Navigable**: Full keyboard support (Enter, Space to toggle)
- **Visual States**: Clear visual distinction between on and off states
- **Flexible Styling**: Accepts className props for styling customization
- **Focus Indicators**: Proper focus rings for accessibility

## When to Use

Use the Toggle component when you need to:

1. **Binary State Control**: Enable or disable a single feature or option

   - Enable/disable notifications
   - Turn on/off dark mode
   - Activate/deactivate a filter
   - Subscribe/unsubscribe from updates

2. **Text Formatting**: Apply or remove text formatting in editors

   - Bold text toggle
   - Italic text toggle
   - Strikethrough toggle
   - Underline toggle

3. **View Mode Switching**: Switch between two viewing modes

   - Grid/list view toggle
   - Compact/expanded view
   - Show/hide details
   - Enable/disable preview

4. **Feature Flags**: Toggle features on and off

   - Advanced mode toggle
   - Developer tools toggle
   - Experimental features toggle
   - Accessibility features toggle

5. **Toolbar Actions**: Compact buttons in toolbars that toggle states

   - Text editor toolbars
   - Image editor toolbars
   - Drawing application tools
   - Settings panels

## When NOT to Use

Avoid using the Toggle component when:

1. **Multiple Options**: When users need to choose from more than two options

   - Use Radio Group for mutually exclusive options
   - Use Select for dropdown selections
   - Use Toggle Group for multiple related toggles

2. **Settings with Labels**: When the toggle needs an associated label and description

   - Use Switch component for settings with labels
   - Use Checkbox for form fields with labels

3. **Form Submissions**: When the value needs to be part of form data

   - Use Checkbox component for form fields
   - Use Switch component for settings forms

4. **Async Actions**: When toggling triggers an async operation

   - Consider ActionButton for operations with loading states
   - Use Switch with loading indicator for async toggles

5. **Navigation**: When the button navigates to a different page

   - Use Button with onClick handler
   - Use Link component for navigation

6. **Multiple Related Toggles**: When you have a group of related toggle options

   - Use ToggleGroup component instead
   - Use Checkbox group for multiple selections

## Usage Example

### Basic Toggle with Icon

```tsx
import { TextB } from "@phosphor-icons/react";

import { Toggle } from "@tennr/lasso/toggle";

function MyComponent() {
  return (
    <Toggle aria-label="Toggle bold">
      <TextB weight="light" />
    </Toggle>
  );
}
```

### Toggle with Text

```tsx
import { Toggle } from "@tennr/lasso/toggle";

function MyComponent() {
  return <Toggle>Subscribe</Toggle>;
}
```

### Outline Variant

```tsx
import { TextItalic } from "@phosphor-icons/react";

import { Toggle } from "@tennr/lasso/toggle";

function MyComponent() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <TextItalic weight="light" />
    </Toggle>
  );
}
```

### Controlled Toggle

```tsx
import { TextB } from "@phosphor-icons/react";
import { useState } from "react";

import { Toggle } from "@tennr/lasso/toggle";

function MyComponent() {
  const [isBold, setIsBold] = useState(false);

  return (
    <Toggle
      pressed={isBold}
      onPressedChange={setIsBold}
      aria-label="Toggle bold"
    >
      <TextB weight="light" />
    </Toggle>
  );
}
```

### Toggle with Icon and Text

```tsx
import { TextStrikethrough } from "@phosphor-icons/react";

import { Toggle } from "@tennr/lasso/toggle";

function MyComponent() {
  return (
    <Toggle>
      <TextStrikethrough weight="light" />
      Strikethrough
    </Toggle>
  );
}
```

## Props Reference

### Toggle

The Toggle component extends all props from Radix UI's Toggle primitive:

- `pressed`: `boolean` - The controlled pressed state
- `defaultPressed`: `boolean` - The default pressed state (uncontrolled)
- `onPressedChange`: `(pressed: boolean) => void` - Callback when pressed state changes
- `disabled`: `boolean` - Whether the toggle is disabled
- `className`: `string` - Additional CSS classes

### Style Variants

- `variant`: `"default" | "outline"`
  - `"default"`: Transparent background, highlights on hover and when pressed
  - `"outline"`: Border with shadow, more prominent appearance

### Size Options

- `size`: `"sm" | "default" | "lg"`
  - `"sm"`: 32px height, compact padding
  - `"default"`: 36px height, standard padding
  - `"lg"`: 40px height, larger padding

## Visual States

The Toggle component has distinct visual states:

1. **Idle (Off)**: Default appearance with transparent or outlined background
2. **Hover**: Muted background color to indicate interactivity
3. **Pressed (On)**: Accent background color to show active state
4. **Focus**: Ring indicator for keyboard navigation
5. **Disabled**: Reduced opacity, non-interactive

## Accessibility

The Toggle component is fully accessible out of the box:

- Keyboard navigation support (Enter, Space to toggle)
- ARIA attributes automatically managed (`aria-pressed`)
- Focus management handled correctly
- Screen reader announcements for state changes
- Always provide `aria-label` when using icon-only toggles

### Accessibility Best Practices

```tsx
// Good: Icon-only toggle with aria-label
<Toggle aria-label="Toggle bold">
  <TextB weight="light" />
</Toggle>

// Good: Toggle with visible text (no aria-label needed)
<Toggle>Subscribe</Toggle>

// Good: Toggle with icon and text
<Toggle>
  <TextB weight="light" />
  Bold
</Toggle>
```

## Related Components

- For groups of related toggles, use the `ToggleGroup` component
- For form settings with labels, use the `Switch` component
- For form fields, use the `Checkbox` component
- For async actions with feedback, use the `ActionButton` component
