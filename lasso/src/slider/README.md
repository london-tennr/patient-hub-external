# Slider Component

## Overview

The Slider component is an interactive input control that allows users to select a value or range of values within a specified range by dragging a thumb along a track. Built on top of Radix UI's Slider primitive, it provides an accessible, customizable, and styled implementation for the Tennr design system.

## What It Is

The Slider component is a single component that includes:

- **Track**: The horizontal or vertical bar that represents the full range of values
- **Range**: The filled portion of the track indicating the selected value(s)
- **Thumb(s)**: Draggable handle(s) used to select values

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Single or Range Selection**: Supports single value or range (two-value) selection
- **Orientation Support**: Works in both horizontal and vertical orientations
- **Step Control**: Customizable step increments for discrete value selection
- **Touch-Friendly**: Optimized for both mouse and touch interactions
- **Customizable**: Accepts className props for styling customization

## When to Use

Use the Slider component when you need to:

1. **Numeric Value Selection**: Allow users to select a value from a continuous range

   - Volume controls
   - Brightness/opacity settings
   - Price range selection
   - Zoom level controls
   - Rating scales

2. **Range Selection**: Select a range between two values

   - Price range filters
   - Date range selection (with appropriate formatting)
   - Age range filters
   - Value bounds selection

3. **Visual Value Input**: Provide a more intuitive alternative to numeric text input

   - Settings panels
   - Filter controls
   - Configuration interfaces
   - Media player controls

4. **Constrained Input**: When values must fall within specific bounds
   - Percentage adjustments
   - Limited numeric ranges
   - Bounded configuration values

## When NOT to Use

Avoid using the Slider component when:

1. **Precise Values Required**: The user needs to input exact numeric values

   - Monetary amounts (use a numeric Input instead)
   - Specific quantities (use an Input or NumberInput)
   - Values requiring decimal precision beyond the step

2. **Very Large Ranges**: The range is so large that precision becomes difficult

   - Selecting from thousands of options (use a Select or Input)
   - When exact positioning is critical
   - Large date/time ranges (use a DatePicker)

3. **Discrete Named Options**: When selecting from labeled options rather than numbers

   - T-shirt sizes (use a Select or RadioGroup)
   - Quality levels with names (use a ToggleGroup)
   - Categories (use a Select)

4. **Accessibility Concerns**: When the target audience may have difficulty with drag interactions

   - Consider providing an alternative Input field
   - Use a Select for critical form fields

5. **Limited Space**: When horizontal or vertical space is constrained

   - Narrow sidebars (consider a compact Input)
   - Dense table cells (use text input)

## Usage Example

```tsx
import { Slider } from "@tennr/lasso/slider";

function VolumeControl() {
  return (
    <div className="w-[200px]">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}
```

### Range Selection Example

```tsx
import { Slider } from "@tennr/lasso/slider";

function PriceRangeFilter() {
  return (
    <div className="w-[300px]">
      <Slider defaultValue={[100, 500]} min={0} max={1000} step={10} />
    </div>
  );
}
```

### Controlled Slider Example

```tsx
import { useState } from "react";

import { Slider } from "@tennr/lasso/slider";

function ControlledSlider() {
  const [value, setValue] = useState([33]);

  return (
    <div className="w-[300px]">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <p>Current value: {value[0]}</p>
    </div>
  );
}
```

### Vertical Orientation Example

```tsx
import { Slider } from "@tennr/lasso/slider";

function VerticalSlider() {
  return (
    <div className="h-[200px]">
      <Slider defaultValue={[50]} max={100} step={1} orientation="vertical" />
    </div>
  );
}
```

## Props Reference

### Slider

The Slider accepts all props from Radix UI's Slider primitive:

- `value`: `number[]` - Controlled value(s). Use with `onValueChange` for controlled behavior
- `defaultValue`: `number[]` - Initial value(s) for uncontrolled usage
- `min`: `number` - Minimum value (default: `0`)
- `max`: `number` - Maximum value (default: `100`)
- `step`: `number` - Step increment for value changes (default: `1`)
- `orientation`: `"horizontal" | "vertical"` - Slider orientation (default: `"horizontal"`)
- `disabled`: `boolean` - Whether the slider is disabled
- `onValueChange`: `(value: number[]) => void` - Callback fired when value changes
- `onValueCommit`: `(value: number[]) => void` - Callback fired when value change is committed (e.g., on mouse up)
- `inverted`: `boolean` - Whether the slider is inverted
- `minStepsBetweenThumbs`: `number` - Minimum steps between thumbs in range mode
- `className`: `string` - Additional CSS classes for the root element

## Styling

The Slider component uses CSS variables from the Tennr design system:

- Track background uses `bg-muted`
- Range fill uses `bg-primary`
- Thumb uses `bg-background` with `border-primary`
- Focus state shows `ring-ring/50`
- Disabled state applies 50% opacity

### Custom Styling

You can customize the appearance using Tailwind CSS classes via the `className` prop:

```tsx
<Slider className="w-full max-w-md" defaultValue={[50]} max={100} />
```

For deeper customization, target the data-slot attributes:

- `[data-slot="slider"]` - Root element
- `[data-slot="slider-track"]` - Track element
- `[data-slot="slider-range"]` - Filled range element
- `[data-slot="slider-thumb"]` - Thumb element(s)

## Accessibility

The Slider component is fully accessible out of the box:

- Keyboard navigation support (Arrow keys for value adjustment)
- ARIA attributes automatically managed (`role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`)
- Focus management handled correctly
- Screen reader announcements for value changes
- Proper disabled state handling

### Keyboard Interactions

- **Arrow Left/Down**: Decrease value by one step
- **Arrow Right/Up**: Increase value by one step
- **Page Down**: Decrease value by a larger step
- **Page Up**: Increase value by a larger step
- **Home**: Set value to minimum
- **End**: Set value to maximum

## Related Components

- For selecting from discrete options, use a `Select` or `RadioGroup` component
- For numeric text input, use an `Input` with `type="number"`
- For on/off states, use a `Switch` component
- For yes/no choices, use a `Checkbox` component
