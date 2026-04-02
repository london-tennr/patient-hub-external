# Button Component

## Overview

The Button component is a versatile, accessible button element that serves as the primary interactive component for user actions throughout the Tennr design system. It supports multiple visual variants, sizes, and can render as different HTML elements using the `asChild` prop. Built with class-variance-authority (CVA) for type-safe variant management and consistent styling.

## What It Is

The Button component is a fundamental UI primitive that:

- **Triggers Actions**: Handles user interactions like form submissions, navigation, and state changes
- **Supports Multiple Variants**: Provides visual styles for different action types and importance levels
- **Flexible Rendering**: Can render as a native button or delegate to a child element (like a link)
- **Consistent Styling**: Maintains design system consistency across the application

### Key Features

- **Multiple Variants**: Default, destructive, outline, secondary, ghost, text, neutral, invisible, brand, muted, brand-ghost, and brand-secondary-ghost
- **Size Options**: Default, small (sm), large (lg), and icon sizes
- **Accessible**: Built with proper focus states, keyboard navigation, and ARIA support
- **Polymorphic**: Uses `asChild` prop to render as any element while preserving button styling
- **Disabled State**: Proper visual and interaction handling for disabled buttons
- **Icon Support**: Automatic sizing and spacing for embedded SVG icons
- **Focus Visible**: Clear focus indicators for keyboard navigation

## When to Use

Use the Button component when you need to:

1. **Trigger Actions**: Initiate any user action or event

   - Form submissions
   - Modal/dialog triggers
   - State changes
   - Data operations
   - Navigation actions

2. **Call to Action**: Draw attention to primary user actions

   - Primary actions (default/brand variant)
   - Confirmation buttons
   - Sign up/sign in buttons
   - Purchase/checkout buttons

3. **Secondary Actions**: Provide alternative or less prominent actions

   - Cancel buttons (outline/ghost variant)
   - Secondary navigation
   - Filter toggles
   - View options

4. **Destructive Actions**: Indicate potentially harmful operations

   - Delete buttons (destructive variant)
   - Remove items
   - Clear data
   - Revoke access

5. **Icon-Only Actions**: Compact buttons for toolbars or dense UI

   - Search buttons
   - Menu toggles
   - Action icons
   - Toolbar buttons

## When NOT to Use

Avoid using the Button component when:

1. **Navigation Only**: The primary purpose is navigation without an action

   - Use anchor tags or Link components for pure navigation
   - Consider using `asChild` with a Link if you need button styling on a navigation element

2. **Toggle States**: You need to toggle between two states

   - Use Switch component for on/off toggles
   - Use Toggle component for selected/unselected states
   - Use Checkbox for form selections

3. **Complex Async Actions**: You need loading/success/error states

   - Use ActionButton for actions with async feedback
   - Consider a custom solution for complex state machines

4. **Menu Items**: Inside dropdown or context menus

   - Use DropdownMenuItem or ContextMenuItem components
   - These provide proper menu semantics and keyboard navigation

5. **Form Inputs**: When you need form field behavior

   - Use Select for dropdown selections
   - Use Checkbox or RadioGroup for selections
   - Use Input for text entry

6. **Text Links**: Inline text that should look like a link

   - Use anchor tags with appropriate styling
   - Use the `text` variant sparingly and only when button semantics are needed

## Usage Example

```tsx
import { Button } from "@tennr/lasso/button";

function MyComponent() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Primary Action</Button>
      <Button variant="outline">Secondary</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

### Example with Different Sizes

```tsx
import { Button } from "@tennr/lasso/button";

function SizeExamples() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
```

### Example with Icon

```tsx
import { Icon } from "@iconify/react";

import { Button } from "@tennr/lasso/button";

function IconButton() {
  return (
    <Button size="icon" variant="outline" aria-label="Search">
      <Icon icon="ph:magnifying-glass-light" />
    </Button>
  );
}
```

### Example with Text and Icon

```tsx
import { Icon } from "@iconify/react";

import { Button } from "@tennr/lasso/button";

function ButtonWithIcon() {
  return (
    <Button>
      Next
      <Icon icon="ph:arrow-right-light" />
    </Button>
  );
}
```

### Example as Link (using asChild)

```tsx
import { Button } from "@tennr/lasso/button";

function LinkButton() {
  return (
    <Button asChild>
      <a href="/dashboard">Go to Dashboard</a>
    </Button>
  );
}
```

## Props Reference

### Button

- `variant`: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "text" | "neutral" | "invisible" | "brand" | "muted" | "brand-ghost" | "brand-secondary-ghost"` - The visual style of the button
  - `"default"`: Primary action style with secondary/primary background
  - `"destructive"`: Dangerous action style with red/destructive colors
  - `"outline"`: Bordered button with transparent background
  - `"secondary"`: Secondary emphasis with brand-peat background
  - `"ghost"`: Minimal style that appears on hover
  - `"text"`: Text-only style with underline on hover
  - `"neutral"`: Neutral gray styling
  - `"invisible"`: Minimal visibility, shows on hover
  - `"brand"`: Brand primary color styling
  - `"muted"`: Subtle accent background
  - `"brand-ghost"`: Brand color with transparent background
  - `"brand-secondary-ghost"`: Brand secondary color with transparent background
- `size`: `"default" | "sm" | "lg" | "icon"` - The size of the button
  - `"default"`: Standard button height (h-9)
  - `"sm"`: Small button height (h-8) with smaller text
  - `"lg"`: Large button height (h-10) with more padding
  - `"icon"`: Square button for icon-only content (size-9, rounded-full)
- `asChild`: `boolean` - When true, the button will render its child element with button styling instead of a native button element. Useful for rendering links as buttons.
- `disabled`: `boolean` - Disables the button, preventing interaction and applying visual disabled state
- `className`: `string` - Additional CSS classes to apply
- `children`: `React.ReactNode` - The button content (text, icons, or other elements)

### ButtonVariantProps

A type export for the variant props, useful for creating custom components that extend Button styling:

```tsx
import { ButtonVariantProps } from "@tennr/lasso/button";

type MyButtonProps = ButtonVariantProps & {
  customProp: string;
};
```

### buttonVariants

A CVA function export for applying button styles to custom elements:

```tsx
import { buttonVariants } from "@tennr/lasso/button";

function CustomElement() {
  return <div className={buttonVariants({ variant: "outline", size: "sm" })} />;
}
```

## Accessibility

The Button component includes comprehensive accessibility features:

- **Keyboard Navigation**: Fully accessible via keyboard (Tab, Enter, Space)
- **Focus Indicators**: Clear visible focus states using `focus-visible` styling
- **Disabled State**: Proper `disabled` attribute handling with visual feedback
- **ARIA Support**: Supports `aria-label`, `aria-describedby`, and other ARIA attributes
- **Screen Reader**: Semantic button element announces correctly to assistive technology
- **Invalid State**: Supports `aria-invalid` for form validation feedback

## Styling

The Button component uses class-variance-authority (CVA) for variant management:

- **Base Styles**: Common styles applied to all buttons (flex, alignment, transitions)
- **Variant Styles**: Specific colors and hover states per variant
- **Size Styles**: Height, padding, and typography per size
- **Composable**: Use `buttonVariants` function to apply styles to other elements
- **Customizable**: Extend with className prop for additional styling

## Related Components

- For async actions with loading/success/error states, use `ActionButton`
- For toggle states, use `Switch` or `Toggle` components
- For button groups, wrap multiple Buttons in a container with flex layout
- For split buttons with dropdowns, combine Button with `DropdownMenu`
- For icon-only buttons, use the `icon` size with an `aria-label`
