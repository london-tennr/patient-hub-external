# Metric Component

## Overview

The Metric component displays numerical data with animated transitions and visual indicators. It's designed for dashboards, analytics displays, and status overviews where you need to present key numbers with context. Built with `@number-flow/react` for smooth number animations and `motion/react` for visual indicator transitions.

## What It Is

The Metric system consists of two components that work together:

- **Metric**: A single metric display with a number, label, and optional visual indicator (bar or square)
- **MetricGroup**: A container for multiple metrics that automatically scales visual indicators relative to each other

### Key Features

- **Animated Numbers**: Smooth transitions when values change using NumberFlow
- **Visual Indicators**: Optional colored bars or squares that provide at-a-glance context
- **Semantic Colors**: Built-in color classes (neutral, info, success, warning, error, muted) for status indication
- **Auto-Scaling**: MetricGroup automatically scales bars relative to the largest value
- **Compact Display**: Numbers are formatted with compact notation (e.g., 1.2K, 3.4M)
- **Customizable**: Supports prefixes, postfixes, sub-labels, and click handlers

## When to Use

Use the Metric component when you need to:

1. **Display Key Numbers**: Show important metrics at a glance

   - Dashboard KPIs
   - Status counts
   - Analytics summaries
   - Performance indicators

2. **Show Status Distribution**: Display counts with status-colored indicators

   - Workflow stage counts (pending, processing, complete)
   - Error/warning/success counts
   - Task status breakdowns
   - Queue depths by priority

3. **Compare Values**: Show multiple related metrics together

   - Before/after comparisons
   - Category breakdowns
   - Progress tracking
   - Resource utilization

4. **Animate Changes**: Highlight value changes with smooth transitions

   - Real-time updates
   - Live dashboards
   - Progress indicators
   - Streaming data

## When NOT to Use

Avoid using the Metric component when:

1. **Detailed Data Tables**: For comprehensive data display with sorting/filtering

   - Use a DataTable component instead
   - Use a Table component for structured data

2. **Time Series Data**: For trends over time

   - Use a Chart component
   - Use a Sparkline for compact trends

3. **Single Status Indicator**: Just need to show a status without a number

   - Use a Badge component
   - Use a Status indicator

4. **Progress Toward Goal**: Showing completion percentage

   - Use a Progress component
   - Use a circular progress indicator

5. **Dense Numeric Tables**: Many numbers in a structured format

   - Use a Table component
   - Use a DataGrid for editable data

## Usage Example

```tsx
import { Metric, MetricGroup } from "@tennr/lasso/metric";

// Single metric
function SingleMetric() {
  return <Metric number={42} label="Active Tasks" class="info" />;
}

// Metric with prefix and postfix
function MetricWithAffixes() {
  return (
    <Metric
      number={1250}
      label="Revenue"
      prefix="$"
      postfix="/mo"
      class="success"
    />
  );
}

// Metric with sub-label
function MetricWithSubLabel() {
  return (
    <Metric number={17} label="Errors" subLabel="Last 24 hours" class="error" />
  );
}

// Group of metrics with auto-scaled bars
function Dashboard() {
  return (
    <MetricGroup
      metrics={[
        { number: 5, label: "Missing Info", class: "warning" },
        { number: 12, label: "Processing", class: "info" },
        { number: 24, label: "Complete", class: "success" },
        { number: 3, label: "Failed", class: "error" },
      ]}
    />
  );
}

// Metrics with square variant (no bars)
function CompactDashboard() {
  return (
    <MetricGroup
      variant="square"
      metrics={[
        { number: 100, label: "Total", class: "neutral" },
        { number: 85, label: "Passed", class: "success" },
        { number: 15, label: "Failed", class: "error" },
      ]}
    />
  );
}
```

## Props Reference

### MetricProps

- `number`: `number` - **Required**. The numeric value to display
- `label`: `string` - **Required**. The label describing the metric
- `class`: `"neutral" | "info" | "success" | "warning" | "error" | "muted"` - **Required**. The color class for the visual indicator
- `subLabel`: `string` - Optional secondary label displayed below the number
- `prefix`: `string` - Text displayed before the number (e.g., "$", "~")
- `postfix`: `string` - Text displayed after the number (e.g., "%", "/mo")
- `variant`: `"bar" | "square" | "hidden"` - Visual indicator style (default: "bar")
- `scale`: `number` - Bar width multiplier (default: 4, typically auto-calculated by MetricGroup)
- `className`: `string` - Additional CSS classes
- `onClick`: `() => void` - Click handler for interactive metrics
- `withColorSquare`: `boolean` - Whether to show a color square indicator

### MetricGroupProps

- `metrics`: `Omit<MetricProps, "scale">[]` - **Required**. Array of metric configurations (scale is auto-calculated)
- `className`: `string` - Additional CSS classes for the grid container
- `variant`: `"bar" | "square" | "hidden"` - Visual indicator style for all metrics (default: "bar")

## Color Classes

| Class     | Use Case                                   |
| --------- | ------------------------------------------ |
| `neutral` | Default/unclassified items                 |
| `info`    | Informational, in-progress states          |
| `success` | Positive outcomes, completions             |
| `warning` | Attention needed, pending items            |
| `error`   | Problems, failures, critical states        |
| `muted`   | Disabled, inactive, or de-emphasized items |

## Visual Variants

### Bar Variant (default)

Displays a horizontal bar next to the number. Bar width is proportional to the value, making it easy to compare metrics visually. In a MetricGroup, bars are automatically scaled so the largest value gets the maximum width.

### Square Variant

Displays a small colored square next to the number. Useful when you want color-coded categories without the visual comparison of bar widths.

### Hidden Variant

No visual indicator is displayed. Use when you only need the number and label.

## Number Formatting

Numbers are automatically formatted with compact notation:

- Numbers under 1,000 are shown as-is
- Larger numbers use suffixes: 1.2K, 3.4M, etc.
- Fractions are truncated to one decimal place

## Accessibility

The Metric component includes accessibility considerations:

- Semantic HTML structure for screen readers
- Color is not the only indicator of status (labels provide context)
- Click handlers are applied to the container for keyboard accessibility
- Text has appropriate contrast ratios

## Related Components

- For displaying trends over time, use a `Chart` component
- For completion progress, use a `Progress` component
- For status labels without numbers, use a `Badge` component
- For tabular numeric data, use a `Table` or `DataTable` component
