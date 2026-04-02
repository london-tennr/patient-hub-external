# Progress Component

## Overview

The Progress component is a visual indicator that displays the completion status of a task or process as a horizontal bar. It provides clear feedback to users about how much of a task has been completed. Built on top of Radix UI's Progress primitive, it offers accessible and consistent styling for the Tennr design system.

## What It Is

The Progress component is a single, self-contained element that:

- **Displays Completion**: Shows a filled bar representing the percentage of completion
- **Supports Variants**: Offers different visual styles (default and success) for various contexts
- **Animates Smoothly**: Transitions between values with CSS transitions
- **Accessible**: Built on Radix UI primitives for proper accessibility support

### Key Features

- **Simple API**: Just pass a `value` prop (0-100) to control the progress
- **Variant Support**: Choose between default brand styling or success (green) styling
- **Accessible**: Proper ARIA attributes managed automatically by Radix UI
- **Smooth Transitions**: Built-in CSS transitions for value changes
- **Customizable**: Accepts className props for additional styling

## When to Use

Use the Progress component when you need to:

1. **Show Task Completion**: Indicate how much of a task or process is complete

   - File uploads
   - Form completion steps
   - Data processing
   - Download progress
   - Profile completion

2. **Visualize Metrics**: Display percentage-based metrics or scores

   - Skill proficiency levels
   - Goal progress
   - Usage limits
   - Quota consumption
   - Score displays

3. **Communicate Wait Time**: Give users a sense of how long an operation might take

   - Loading sequences with known duration
   - Multi-step processes
   - Batch operations
   - Installation progress

4. **Display Determinate Progress**: When you know the exact completion percentage

   - Step-by-step wizards
   - Survey completion
   - Onboarding flows
   - Reading progress

## When NOT to Use

Avoid using the Progress component when:

1. **Indeterminate Progress**: You don't know how long the operation will take

   - Use a Spinner or Skeleton loader instead
   - Use an indeterminate loading animation
   - Consider a pulsing indicator

2. **Binary States**: The operation is either complete or not

   - Use a Checkbox or Switch for toggles
   - Use a Badge or Status indicator
   - Use an Icon with a checkmark

3. **Complex Visualizations**: You need to show multiple data points or comparisons

   - Use a Chart component for data visualization
   - Use a Bar Chart for comparing values
   - Use a Dashboard layout for multiple metrics

4. **Real-time Data**: The value changes too frequently

   - Progress bars can be distracting with rapid updates
   - Consider debouncing updates or using a different indicator
   - Use a numeric display instead

5. **Very Small Progress**: The component would be too small to be meaningful

   - Use percentage text instead
   - Use a Badge with the value
   - Consider a tooltip with details

6. **Interactive Selection**: Users need to select a value

   - Use a Slider component instead
   - Use a Range Input
   - Use a numeric stepper

## Usage Example

```tsx
import { Progress } from "@tennr/lasso/progress";

function MyComponent() {
  return (
    <div className="w-full max-w-md">
      <Progress value={50} />
    </div>
  );
}
```

### Example with Success Variant

```tsx
import { Progress } from "@tennr/lasso/progress";

function CompletedTask() {
  return (
    <div className="w-full max-w-md">
      <Progress value={100} variant="success" />
    </div>
  );
}
```

### Example with Dynamic Value

```tsx
import { useEffect, useState } from "react";

import { Progress } from "@tennr/lasso/progress";

function UploadProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md space-y-2">
      <Progress
        value={progress}
        variant={progress === 100 ? "success" : "default"}
      />
      <p className="text-sm text-muted-foreground">{progress}% complete</p>
    </div>
  );
}
```

### Example with Label

```tsx
import { Progress } from "@tennr/lasso/progress";

function LabeledProgress() {
  const progress = 75;

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading files...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} />
    </div>
  );
}
```

## Props Reference

### ProgressProps

- `value`: `number | null | undefined` - The progress value from 0 to 100. If `null` or `undefined`, the progress bar will show 0% filled.
- `variant`: `"default" | "success"` - The visual style variant. Defaults to `"default"`.
- `className`: `string` - Additional CSS classes to apply to the progress container.
- `max`: `number` - The maximum progress value. Defaults to 100 (inherited from Radix UI).
- `getValueLabel`: `(value: number, max: number) => string` - A function to generate the accessibility label (inherited from Radix UI).

### Variants

| Variant   | Background                  | Indicator Fill | Use Case                           |
| --------- | --------------------------- | -------------- | ---------------------------------- |
| `default` | Brand peat (20% opacity)    | Brand peat     | General progress indication        |
| `success` | Success green (20% opacity) | Success green  | Completed tasks, positive outcomes |

## Styling

The Progress component uses Tailwind CSS classes and supports the Tennr design system tokens:

- **Height**: 8px (`h-2`) by default
- **Border Radius**: Fully rounded (`rounded-full`)
- **Animation**: CSS transitions on the indicator for smooth value changes

To customize the size, you can add height classes:

```tsx
// Taller progress bar
<Progress value={50} className="h-4" />

// Full width in container
<Progress value={50} className="w-full" />
```

## Accessibility

The Progress component is fully accessible:

- Uses semantic `progressbar` role automatically
- `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` are managed by Radix UI
- `aria-valuetext` can be customized via `getValueLabel` prop
- Screen readers announce progress changes appropriately

Example with custom value label:

```tsx
<Progress
  value={75}
  getValueLabel={(value, max) => `${value} of ${max} files uploaded`}
/>
```

## Related Components

- For indeterminate loading states, use a **Spinner** or **Skeleton** component
- For selecting a value, use a **Slider** component
- For displaying metrics, consider a **Metric** component
- For step-by-step progress, consider a **Stepper** component (if available)
