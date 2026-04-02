# Chart Component

## Overview

The Chart component is a flexible wrapper system for building data visualizations using Recharts. It provides consistent theming, responsive containers, and pre-styled tooltip and legend components that integrate seamlessly with the Tennr design system. The component handles color management through CSS custom properties, enabling automatic light/dark theme support.

## What It Is

The Chart component consists of several sub-components that work together:

- **ChartContainer**: The main wrapper that provides context, responsive sizing, and theme-based CSS variable injection
- **ChartTooltip**: A re-export of Recharts' Tooltip component for easy access
- **ChartTooltipContent**: A styled tooltip content component with indicator variants and label formatting
- **ChartLegend**: A re-export of Recharts' Legend component for easy access
- **ChartLegendContent**: A styled legend content component with icon and label support
- **ChartStyle**: Internal component that generates CSS custom properties for chart colors

### Key Features

- **Theme Integration**: Supports light and dark themes through CSS custom properties
- **Responsive**: Built on Recharts' ResponsiveContainer for automatic size adaptation
- **Consistent Styling**: Pre-styled components match the Tennr design system
- **Flexible Configuration**: ChartConfig allows defining labels, icons, and colors per data series
- **Tooltip Variants**: Multiple indicator styles (dot, line, dashed) for different chart types
- **Custom Formatters**: Support for custom label and value formatters

## When to Use

Use the Chart component when you need to:

1. **Visualize Data**: Display quantitative data in visual form

   - Bar charts for comparisons
   - Line charts for trends over time
   - Area charts for cumulative data
   - Pie/donut charts for proportions

2. **Dashboard Metrics**: Show key performance indicators and analytics

   - Revenue trends
   - User engagement metrics
   - Performance statistics
   - Progress tracking

3. **Data Comparison**: Compare multiple data series visually

   - Before/after comparisons
   - Category comparisons
   - Multi-dimensional data views

4. **Reports and Analytics**: Create data-driven reports

   - Sales reports
   - Usage analytics
   - Financial summaries
   - Performance reviews

## When NOT to Use

Avoid using the Chart component when:

1. **Simple Numbers**: A single metric or KPI doesn't need a chart

   - Use a Metric or Stat component instead
   - Simple text display with formatting suffices

2. **Tabular Data**: The data is better represented as a table

   - Detailed row-level data (use DataTable)
   - Precise values matter more than trends
   - Many columns of information

3. **Non-Quantitative Data**: The information isn't numerical

   - Status indicators (use Badge)
   - Categorical labels (use Tags)
   - Text content (use Text components)

4. **Real-Time Data**: Rapidly updating data (sub-second) may cause performance issues

   - Consider specialized real-time charting libraries
   - Use sampling or aggregation

5. **Very Large Datasets**: Charts with thousands of points can be slow

   - Consider data aggregation
   - Use virtualized or canvas-based alternatives

## Usage Example

```tsx
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@tennr/lasso/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
];

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" />
        <Bar dataKey="mobile" fill="var(--color-mobile)" />
      </BarChart>
    </ChartContainer>
  );
}
```

### Example with Theme Support

```tsx
const chartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "hsl(220, 70%, 50%)",
      dark: "hsl(220, 70%, 70%)",
    },
  },
};
```

### Example with Custom Tooltip

```tsx
<ChartTooltip
  content={
    <ChartTooltipContent
      indicator="line"
      labelFormatter={(value, payload) => `Week of ${value}`}
      formatter={(value, name, item, index, payload) => (
        <span className="font-bold">${value.toLocaleString()}</span>
      )}
    />
  }
/>
```

### Example with Legend

```tsx
import { Bar, BarChart } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@tennr/lasso/chart";

function ChartWithLegend() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" />
        <Bar dataKey="mobile" fill="var(--color-mobile)" />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
}
```

## Props Reference

### ChartContainer

- `config`: `ChartConfig` - **Required**. Configuration object mapping data keys to labels, icons, and colors
- `children`: `React.ReactNode` - The Recharts chart component(s) to render
- `id`: `string` - Optional unique identifier for the chart (auto-generated if not provided)
- `className`: `string` - Additional CSS classes for the container

### ChartConfig

A configuration object where each key corresponds to a data series:

```tsx
type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode; // Display label for the series
    icon?: React.ComponentType; // Optional icon component
  } & (
    | { color?: string; theme?: never } // Single color for all themes
    | { color?: never; theme: { light: string; dark: string } } // Theme-specific colors
  );
};
```

### ChartTooltipContent

- `active`: `boolean` - Whether the tooltip is active (provided by Recharts)
- `payload`: `array` - Data payload for the tooltip (provided by Recharts)
- `label`: `string` - Label for the tooltip (provided by Recharts)
- `indicator`: `"dot" | "line" | "dashed"` - Visual indicator style (default: "dot")
- `hideLabel`: `boolean` - Whether to hide the tooltip label
- `hideIndicator`: `boolean` - Whether to hide the color indicator
- `labelFormatter`: `(value, payload) => ReactNode` - Custom label formatter
- `formatter`: `(value, name, item, index, payload) => ReactNode` - Custom value formatter
- `nameKey`: `string` - Key to use for item names
- `labelKey`: `string` - Key to use for labels
- `labelClassName`: `string` - Additional CSS classes for the label
- `className`: `string` - Additional CSS classes for the tooltip container

### ChartLegendContent

- `payload`: `array` - Legend payload (provided by Recharts)
- `verticalAlign`: `"top" | "bottom"` - Vertical alignment of the legend
- `hideIcon`: `boolean` - Whether to hide the color indicators
- `nameKey`: `string` - Key to use for item names
- `className`: `string` - Additional CSS classes

## Theming

The Chart component uses CSS custom properties for colors, enabling automatic theme support:

1. **Single Color**: Use the `color` property for a static color across all themes
2. **Theme Colors**: Use the `theme` property with `light` and `dark` values for theme-specific colors
3. **CSS Variables**: Access colors in Recharts components via `var(--color-{key})`

The component automatically generates CSS that applies the correct color based on the current theme.

## Accessibility

The Chart component inherits accessibility features from Recharts:

- Supports keyboard navigation for interactive elements
- Screen readers can access data through ARIA attributes
- Tooltips provide detailed information on hover/focus
- Consider adding descriptive text or captions for screen reader users

For better accessibility, consider:

- Providing a data table alternative for complex charts
- Using patterns in addition to colors for colorblind users
- Adding meaningful titles and descriptions

## Related Components

- For simple metrics without visualization, use a `Metric` component
- For tabular data, use a `DataTable` component
- For progress indication, use a `Progress` component
- For status indicators, use a `Badge` component
