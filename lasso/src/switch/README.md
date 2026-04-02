# Switch Component

## Overview

The Switch component is a toggle control that allows users to turn a setting on or off. It provides a binary choice similar to a checkbox but with a more visual, sliding toggle interaction. Built on top of Radix UI's Switch primitive, it provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Switch component is a single, self-contained toggle control that:

- **Provides Binary Choice**: Allows users to toggle between two states (on/off, enabled/disabled)
- **Visual Feedback**: Shows the current state clearly with a sliding thumb and distinct colors
- **Keyboard Accessible**: Can be toggled using Space key when focused
- **Form Compatible**: Works with form libraries and can be used as a controlled or uncontrolled component

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Animated**: Smooth sliding animation when toggling states
- **Peer Styling**: Uses Tailwind's `peer` class for styling adjacent labels
- **Customizable**: Accepts className props for styling customization
- **Focus States**: Clear focus ring for keyboard navigation

## When to Use

Use the Switch component when you need to:

1. **Binary Settings**: Toggle a single setting on or off

   - Enable/disable notifications
   - Dark/light mode toggle
   - Feature flags
   - Privacy settings
   - Auto-save preferences

2. **Immediate Action**: The change takes effect immediately without requiring a form submission

   - Live preview toggles
   - Real-time settings
   - Instant feature activation
   - Quick preferences

3. **Mobile-Friendly UI**: Provide a touch-friendly toggle control

   - Settings screens
   - Preference panels
   - Mobile navigation options
   - Touch-based interfaces

4. **Visual Clarity**: Need a more visual indicator than a checkbox

   - Settings panels where toggle state should be obvious
   - Dashboard controls
   - Feature activation
   - Status controls

## When NOT to Use

Avoid using the Switch component when:

1. **Multiple Options**: Users need to select from more than two options

   - Radio groups (use RadioGroup component)
   - Dropdown selections (use Select component)
   - Multiple choice questions

2. **Form Submission Required**: The selection is part of a form that needs to be submitted

   - Survey questions (use Checkbox component)
   - Form field selections
   - Multi-step wizards where changes aren't immediate

3. **Multiple Selections**: Users need to select multiple items from a list

   - Checkbox groups (use Checkbox component)
   - Multi-select lists
   - Tag selection

4. **Unclear Binary States**: The on/off states aren't clearly defined or intuitive

   - Complex conditional settings
   - Non-binary preferences
   - Settings that require explanation

5. **Dense Lists**: Many toggles in a small space where checkboxes would be more compact

   - Long preference lists
   - Compact forms
   - Data tables with boolean columns

## Usage Example

```tsx
import { Switch } from "@tennr/lasso/switch";

function MyComponent() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Airplane Mode
      </label>
    </div>
  );
}
```

### Controlled Example

```tsx
import { useState } from "react";

import { Switch } from "@tennr/lasso/switch";

function ControlledSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="notifications"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <label htmlFor="notifications" className="text-sm font-medium">
        Enable notifications
      </label>
      <span className="text-sm text-muted-foreground">
        {enabled ? "On" : "Off"}
      </span>
    </div>
  );
}
```

### Settings Panel Example

```tsx
import { Switch } from "@tennr/lasso/switch";

function SettingsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="dark-mode" className="text-sm font-medium">
          Dark Mode
        </label>
        <Switch id="dark-mode" />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="notifications" className="text-sm font-medium">
          Notifications
        </label>
        <Switch id="notifications" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="sound" className="text-sm font-medium">
          Sound
        </label>
        <Switch id="sound" disabled />
      </div>
    </div>
  );
}
```

## Props Reference

### Switch

The Switch component accepts all props from `@radix-ui/react-switch` Root component:

- `checked`: `boolean` - The controlled checked state of the switch
- `defaultChecked`: `boolean` - The default checked state when uncontrolled
- `onCheckedChange`: `(checked: boolean) => void` - Event handler called when the checked state changes
- `disabled`: `boolean` - When true, prevents the user from interacting with the switch
- `required`: `boolean` - When true, indicates that the user must check the switch before form submission
- `name`: `string` - The name of the switch used when submitting a form
- `value`: `string` - The value given as data when submitted with a name
- `id`: `string` - The id of the switch element
- `className`: `string` - Additional CSS classes to apply to the switch

## Styling

The Switch component comes with default styling that follows the Tennr design system:

- **Unchecked State**: Muted gray background (`bg-muted-foreground/50`)
- **Checked State**: Brand peat color (`bg-brand-peat`)
- **Disabled State**: Reduced opacity with `not-allowed` cursor
- **Focus State**: Ring outline for keyboard navigation

## Accessibility

The Switch component is fully accessible out of the box:

- **Keyboard Support**: Toggle with Space key when focused
- **ARIA Attributes**: Automatically manages `role="switch"` and `aria-checked`
- **Focus Management**: Proper focus ring for keyboard navigation
- **Screen Reader Support**: Announces state changes appropriately
- **Label Association**: Works with `htmlFor` on labels for click-to-toggle

## Related Components

- For multiple related toggles, consider grouping Switches in a form layout
- For yes/no form fields that require submission, consider using a Checkbox
- For selecting from multiple options, use RadioGroup or Select
- For more complex toggle scenarios with labels, consider building a compound component
