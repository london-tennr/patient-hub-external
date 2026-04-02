# Checkbox Component

## Overview

The Checkbox component is a styled toggle control that allows users to select or deselect an option. It's built on top of Radix UI's Checkbox primitive and provides a consistent, accessible, and styled implementation for the Tennr design system. The component supports both controlled and uncontrolled modes, making it flexible for various form and interaction patterns.

## What It Is

The Checkbox component is a single, self-contained component that:

- **Provides Binary Selection**: Allows users to toggle between checked and unchecked states
- **Supports Indeterminate State**: Can display a third "indeterminate" state for partial selections
- **Integrates with Forms**: Works seamlessly with form libraries and native form submission
- **Follows Accessibility Standards**: Built on Radix UI primitives, following WAI-ARIA design patterns

### Key Features

- **Accessible**: Built on Radix UI primitives with full keyboard support and ARIA attributes
- **Animated**: Smooth check/uncheck transitions
- **Customizable**: Accepts className props for styling customization
- **Form Integration**: Works with form libraries and supports standard form patterns
- **Peer Styling**: Uses peer modifier classes for styling associated labels

## When to Use

Use the Checkbox component when you need to:

1. **Binary Choices**: Allow users to make yes/no or on/off decisions

   - Terms and conditions acceptance
   - Newsletter subscriptions
   - Feature opt-ins
   - Remember me options

2. **Multiple Selection**: Let users select multiple items from a list

   - Filter options
   - Multi-select lists
   - Bulk actions
   - Permission settings

3. **Form Inputs**: Collect boolean data in forms

   - Consent checkboxes
   - Preference settings
   - Configuration options
   - Agreement acknowledgments

4. **Toggle Features**: Enable or disable specific features or settings

   - Notification preferences
   - Display options
   - Privacy settings
   - Account configurations

## When NOT to Use

Avoid using the Checkbox component when:

1. **Mutually Exclusive Options**: Users should only select one option from a group

   - Use RadioGroup for single selection from multiple options
   - Use Select for dropdown selections
   - Use ToggleGroup for exclusive visual toggles

2. **Instant Actions**: The selection triggers an immediate action

   - Use Switch for on/off toggles with immediate effect
   - Use Button for actions
   - Use ActionButton for async operations

3. **Complex States**: You need more than two or three states

   - Use Select for multiple options
   - Use custom components for complex state machines
   - Use RadioGroup for enumerable options

4. **Navigation**: The element triggers navigation

   - Use Link or Button components
   - Use NavMenu for navigation items
   - Use Tabs for content switching

5. **Rich Content Selection**: Users need to select complex items with previews

   - Use Card-based selection patterns
   - Use custom selection components
   - Use DataTable with row selection

## Usage Example

```tsx
import { Checkbox } from "@tennr/lasso/checkbox";

function MyComponent() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}
```

### Controlled Example

```tsx
import { useState } from "react";

import { Checkbox } from "@tennr/lasso/checkbox";

function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="newsletter"
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked as boolean)}
      />
      <label htmlFor="newsletter" className="text-sm">
        Subscribe to newsletter
      </label>
    </div>
  );
}
```

### With Default Checked State

```tsx
import { Checkbox } from "@tennr/lasso/checkbox";

function DefaultCheckedExample() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="notifications" defaultChecked />
      <label htmlFor="notifications" className="text-sm">
        Enable notifications
      </label>
    </div>
  );
}
```

### Disabled State

```tsx
import { Checkbox } from "@tennr/lasso/checkbox";

function DisabledExample() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled-option" disabled />
      <label
        htmlFor="disabled-option"
        className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        This option is disabled
      </label>
    </div>
  );
}
```

## Props Reference

### Checkbox

The Checkbox component extends all props from Radix UI's Checkbox primitive:

- `checked`: `boolean | "indeterminate"` - Controlled checked state
- `defaultChecked`: `boolean` - Initial checked state for uncontrolled usage
- `onCheckedChange`: `(checked: boolean | "indeterminate") => void` - Callback when checked state changes
- `disabled`: `boolean` - When true, prevents user interaction
- `required`: `boolean` - When true, indicates the checkbox must be checked for form submission
- `name`: `string` - The name of the checkbox for form submission
- `value`: `string` - The value of the checkbox for form submission (default: "on")
- `id`: `string` - The id attribute, useful for associating with a label
- `className`: `string` - Additional CSS classes for styling customization

## States

The Checkbox component supports the following states:

- **Unchecked**: Default state, empty checkbox
- **Checked**: Selected state, displays a check mark
- **Indeterminate**: Partial selection state (useful for "select all" patterns)
- **Disabled**: Non-interactive state with reduced opacity
- **Invalid**: Error state with destructive styling (triggered by `aria-invalid`)

## Styling

The component uses Tailwind CSS classes and supports the Tennr design system tokens:

- Uses `brand-peat` color for checked state
- Includes focus ring for keyboard navigation
- Supports dark mode
- Uses peer modifier for label styling
- Includes hover and focus-visible states

## Accessibility

The Checkbox component is fully accessible out of the box:

- Full keyboard navigation support (Space to toggle)
- ARIA attributes automatically managed
- Associates with labels via `id` prop
- Screen reader announcements for state changes
- Visual focus indicators
- Supports disabled and required states

## Related Components

- For exclusive single selection from a group, use the `RadioGroup` component
- For immediate on/off toggles, use the `Switch` component
- For form layouts with multiple checkboxes, consider using the `Form` component
- For multi-select dropdowns, use the `Select` component with multi-select mode
