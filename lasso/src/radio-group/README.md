# RadioGroup Component

## Overview

The RadioGroup component is a set of checkable buttons—known as radio buttons—where only one button can be checked at a time. It's built on top of Radix UI's RadioGroup primitive and provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The RadioGroup component consists of two sub-components that work together:

- **RadioGroup** (root): The container that manages the radio group state and behavior
- **RadioGroupItem**: An individual radio button within the group

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Single Selection**: Ensures only one option can be selected at a time
- **Keyboard Navigation**: Full keyboard support for navigating between options
- **Customizable**: Accepts className props for styling customization
- **Form Integration**: Works seamlessly with form libraries and native form submission
- **Validation States**: Supports invalid/error states with visual feedback

## When to Use

Use the RadioGroup component when you need to:

1. **Mutually Exclusive Selection**: Allow users to select exactly one option from a list

   - Gender selection
   - Payment method selection
   - Shipping options
   - Plan/tier selection

2. **All Options Visible**: Show all available options at once for easy comparison

   - Survey questions with fixed answers
   - Size selection (S, M, L, XL)
   - Frequency options (daily, weekly, monthly)
   - Rating scales

3. **Few Options**: When there are 2-5 options to choose from

   - Yes/No questions
   - Priority levels (Low, Medium, High)
   - Status selection
   - Theme preferences (Light, Dark, System)

4. **Form Input**: Collect user preferences in forms

   - Settings panels
   - Preference forms
   - Configuration screens
   - Onboarding flows

## When NOT to Use

Avoid using the RadioGroup component when:

1. **Multiple Selection Needed**: Users should be able to select more than one option

   - Use Checkbox or CheckboxGroup instead
   - Multi-select dropdowns
   - Tag selection

2. **Many Options**: When there are more than 5-7 options

   - Use a Select/Dropdown component instead
   - Use a Combobox for searchable options
   - Consider a different UI pattern

3. **Dynamic Options**: Options frequently change or are loaded asynchronously

   - Use a Select component with loading states
   - Use a Combobox for filtered/searchable options

4. **Space Constraints**: Limited vertical space in the UI

   - Use a Select/Dropdown component
   - Use a SegmentedControl for 2-3 options

5. **Binary Toggle**: For simple on/off settings

   - Use a Switch component
   - Use a Checkbox for a single boolean option

6. **Navigation**: For navigation between pages or views

   - Use Tabs component
   - Use Navigation/Menu components

## Usage Example

```tsx
import { RadioGroup, RadioGroupItem } from "@tennr/lasso/radio-group";

function MyComponent() {
  return (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <label htmlFor="option1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <label htmlFor="option2">Option 2</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <label htmlFor="option3">Option 3</label>
      </div>
    </RadioGroup>
  );
}
```

### Example with Controlled State

```tsx
import { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@tennr/lasso/radio-group";

function ControlledExample() {
  const [value, setValue] = useState("comfortable");

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <label htmlFor="r1">Default</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <label htmlFor="r2">Comfortable</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <label htmlFor="r3">Compact</label>
      </div>
    </RadioGroup>
  );
}
```

### Example with Horizontal Layout

```tsx
<RadioGroup defaultValue="left" className="flex flex-row gap-4">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="left" id="left" />
    <label htmlFor="left">Left</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="center" id="center" />
    <label htmlFor="center">Center</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="right" id="right" />
    <label htmlFor="right">Right</label>
  </div>
</RadioGroup>
```

### Example with Disabled Options

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="opt1" />
    <label htmlFor="opt1">Available</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="opt2" disabled />
    <label htmlFor="opt2" className="opacity-50">
      Unavailable
    </label>
  </div>
</RadioGroup>
```

## Props Reference

### RadioGroup

- `value`: `string` - The controlled value of the selected radio item
- `defaultValue`: `string` - The initial value when uncontrolled
- `onValueChange`: `(value: string) => void` - Callback fired when selection changes
- `disabled`: `boolean` - Disables all radio items in the group
- `name`: `string` - The name attribute for form submission
- `required`: `boolean` - Whether a selection is required
- `orientation`: `"horizontal" | "vertical"` - The orientation of the radio group (default: "vertical")
- `dir`: `"ltr" | "rtl"` - Reading direction for keyboard navigation
- `loop`: `boolean` - Whether keyboard navigation should loop (default: true)
- `className`: `string` - Additional CSS classes

### RadioGroupItem

- `value`: `string` - The unique value for this radio item (required)
- `id`: `string` - HTML id attribute for label association
- `disabled`: `boolean` - Whether this individual item is disabled
- `required`: `boolean` - Whether this item is required
- `className`: `string` - Additional CSS classes

## Accessibility

The RadioGroup component is fully accessible out of the box:

- Keyboard navigation support (Arrow keys to move between options, Space to select)
- ARIA attributes automatically managed (`role="radiogroup"`, `role="radio"`, `aria-checked`)
- Focus management handled correctly
- Screen reader announcements for state changes
- Supports `required` attribute for form validation
- Roving tabindex for proper tab navigation

## Related Components

- For multiple selections, use a Checkbox or CheckboxGroup component
- For many options or space constraints, use a Select component
- For binary on/off settings, use a Switch component
- For tab-like navigation between views, use a Tabs component
- For 2-3 compact options, consider a SegmentedControl or ToggleGroup component
