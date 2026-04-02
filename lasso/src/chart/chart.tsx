"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../utils/cn";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

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
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

/**
 * Hook to access the chart configuration context.
 *
 * Must be used within a ChartContainer component.
 *
 * @returns The chart context containing the configuration
 * @throws Error if used outside of a ChartContainer
 *
 * @example
 * ```tsx
 * function CustomChartComponent() {
 *   const { config } = useChart();
 *   // Access config.someKey.label, config.someKey.color, etc.
 * }
 * ```
 */
function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

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
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

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
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

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
const ChartTooltip = RechartsPrimitive.Tooltip;

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
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div
              key={item.dataKey}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center",
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          },
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
const ChartLegend = RechartsPrimitive.Legend;

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
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Helper function to extract item configuration from a Recharts payload.
 *
 * Looks up the configuration for a data series by checking the payload
 * for the specified key and matching it against the chart config.
 *
 * @internal This function is used internally by ChartTooltipContent and ChartLegendContent
 *
 * @param config - The chart configuration object
 * @param payload - The payload item from Recharts
 * @param key - The key to look up in the payload
 * @returns The matching config entry, or undefined if not found
 */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
