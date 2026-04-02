import * as React from "react";
import * as RechartsPrimitive from "recharts";
declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
/**
 * Configuration object for chart data series.
 *
 * Each key in the config corresponds to a data series in your chart. The configuration
 * defines how the series is labeled, styled, and themed.
 *
 * @example
 * ```tsx
 * const chartConfig: ChartConfig = {
 *   revenue: {
 *     label: "Revenue",
 *     color: "hsl(220, 70%, 50%)",
 *   },
 *   expenses: {
 *     label: "Expenses",
 *     theme: {
 *       light: "hsl(0, 70%, 50%)",
 *       dark: "hsl(0, 70%, 70%)",
 *     },
 *   },
 * };
 * ```
 */
export type ChartConfig = {
    [k in string]: {
        /** Display label for the data series, shown in tooltips and legends */
        label?: React.ReactNode;
        /** Optional icon component to display alongside the series in legends */
        icon?: React.ComponentType;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};
/**
 * ChartContainer Component
 *
 * The main wrapper component for charts. Provides a responsive container,
 * context for chart configuration, and automatic CSS variable injection
 * for theming. All chart components should be wrapped in a ChartContainer.
 *
 * Built on top of Recharts' ResponsiveContainer with additional styling
 * and theming capabilities for the Tennr design system.
 *
 * @see [Recharts](https://recharts.org/)
 * @see [Lasso Chart README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/chart/README.md)
 *
 * @param config - Configuration object mapping data keys to labels, icons, and colors
 * @param children - Recharts chart component(s) to render
 * @param id - Optional unique identifier for the chart (auto-generated if not provided)
 * @param className - Additional CSS classes for the container
 *
 * @example
 * ```tsx
 * <ChartContainer config={chartConfig} className="min-h-[200px]">
 *   <BarChart data={data}>
 *     <Bar dataKey="value" fill="var(--color-value)" />
 *   </BarChart>
 * </ChartContainer>
 * ```
 */
declare function ChartContainer({ id, className, children, config, ...props }: React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}): import("react/jsx-runtime").JSX.Element;
/**
 * ChartStyle Component
 *
 * Internal component that generates CSS custom properties for chart colors.
 * Automatically creates theme-aware CSS variables that can be referenced
 * in Recharts components using `var(--color-{key})`.
 *
 * @internal This component is used internally by ChartContainer
 *
 * @param id - Unique identifier for the chart, used to scope CSS variables
 * @param config - Chart configuration containing color definitions
 */
declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => import("react/jsx-runtime").JSX.Element | null;
/**
 * ChartTooltip Component
 *
 * Re-export of Recharts' Tooltip component for convenient access.
 * Use this with ChartTooltipContent for styled tooltips.
 *
 * @see [Recharts Tooltip](https://recharts.org/en-US/api/Tooltip)
 *
 * @example
 * ```tsx
 * <ChartTooltip content={<ChartTooltipContent />} />
 * ```
 */
declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;
/**
 * ChartTooltipContent Component
 *
 * A styled tooltip content component for use with ChartTooltip.
 * Provides consistent styling, indicator variants, and support for
 * custom label and value formatters.
 *
 * @see [Lasso Chart README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/chart/README.md)
 *
 * @param indicator - Visual indicator style: "dot", "line", or "dashed" (default: "dot")
 * @param hideLabel - Whether to hide the tooltip label
 * @param hideIndicator - Whether to hide the color indicator
 * @param labelFormatter - Custom function to format the tooltip label
 * @param formatter - Custom function to format tooltip values
 * @param nameKey - Key to use for item names in the payload
 * @param labelKey - Key to use for labels in the payload
 * @param labelClassName - Additional CSS classes for the label
 * @param className - Additional CSS classes for the tooltip container
 *
 * @example
 * ```tsx
 * <ChartTooltip
 *   content={
 *     <ChartTooltipContent
 *       indicator="line"
 *       labelFormatter={(value) => `Week of ${value}`}
 *     />
 *   }
 * />
 * ```
 */
declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
}): import("react/jsx-runtime").JSX.Element | null;
/**
 * ChartLegend Component
 *
 * Re-export of Recharts' Legend component for convenient access.
 * Use this with ChartLegendContent for styled legends.
 *
 * @see [Recharts Legend](https://recharts.org/en-US/api/Legend)
 *
 * @example
 * ```tsx
 * <ChartLegend content={<ChartLegendContent />} />
 * ```
 */
declare const ChartLegend: typeof RechartsPrimitive.Legend;
/**
 * ChartLegendContent Component
 *
 * A styled legend content component for use with ChartLegend.
 * Displays color indicators and labels for each data series,
 * with support for custom icons from the chart configuration.
 *
 * @see [Lasso Chart README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/chart/README.md)
 *
 * @param verticalAlign - Vertical alignment of the legend: "top" or "bottom"
 * @param hideIcon - Whether to hide the color indicator icons
 * @param nameKey - Key to use for item names in the payload
 * @param className - Additional CSS classes for the legend container
 *
 * @example
 * ```tsx
 * <ChartLegend content={<ChartLegendContent verticalAlign="bottom" />} />
 * ```
 */
declare function ChartLegendContent({ className, hideIcon, payload, verticalAlign, nameKey, }: React.ComponentProps<"div"> & Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
}): import("react/jsx-runtime").JSX.Element | null;
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle, };
//# sourceMappingURL=chart.d.ts.map