import NumberFlow, { continuous, type Format } from "@number-flow/react";
import { motion } from "motion/react";
import React from "react";

import { Text } from "../text/text";
import { cn } from "../utils/cn";

/**
 * Color map for metric visual indicators.
 * Maps semantic color classes to CSS custom properties.
 */
const colorMap: Record<string, string> = {
  neutral: "var(--color-neutral-9)",
  info: "var(--color-info-9)",
  success: "var(--color-success-11)",
  warning: "var(--color-warning-9)",
  error: "var(--color-error-9)",
  muted: "var(--color-neutral-4)",
};

/**
 * Number formatting configuration for compact display.
 * Uses compact notation with truncated decimals (e.g., 1.2K, 3.4M).
 */
const format: Format = {
  notation: "compact",
  compactDisplay: "short",
  roundingMode: "trunc",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
};

/**
 * Props for the Metric component.
 *
 * @example
 * ```tsx
 * <Metric
 *   number={42}
 *   label="Active Tasks"
 *   class="info"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Metric
 *   number={1250}
 *   label="Revenue"
 *   prefix="$"
 *   postfix="/mo"
 *   subLabel="Monthly recurring"
 *   class="success"
 * />
 * ```
 */
export interface MetricProps {
  /** The numeric value to display. Required. */
  number: number;
  /** The label describing the metric. Required. */
  label: string;
  /** Optional secondary label displayed below the number. */
  subLabel?: string;
  /** Text displayed after the number (e.g., "%", "/mo"). */
  postfix?: string;
  /** Text displayed before the number (e.g., "$", "~"). */
  prefix?: string;
  /** The color class for the visual indicator. Required. */
  class: "neutral" | "info" | "success" | "warning" | "error" | "muted";
  /** Additional CSS classes for the container. */
  className?: string;
  /** Visual indicator style: "bar" (default), "square", or "hidden". */
  variant?: "bar" | "square" | "hidden";
  /** Bar width multiplier. Typically auto-calculated by MetricGroup. */
  scale?: number;
  /** Click handler for interactive metrics. */
  onClick?: () => void;
  /** Whether to show a color square indicator. */
  withColorSquare?: boolean;
}

/** Maximum width in pixels for the metric bar indicator. */
const MAX_BAR_WIDTH = 128;

/**
 * Metric Component
 *
 * A component for displaying numerical data with animated transitions and visual indicators.
 * Designed for dashboards, analytics displays, and status overviews. Uses NumberFlow for
 * smooth number animations and motion/react for visual indicator transitions.
 *
 * @see [NumberFlow](https://number-flow.barvian.me/)
 *
 * @see [Lasso Metric README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/metric/README.md)
 */
export const Metric: React.FC<MetricProps> = ({
  number,
  label,
  subLabel,
  postfix,
  prefix,
  class: colorClass,
  className,
  variant = "bar",
  scale = 4,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn("flex flex-col items-start group", className)}
      style={{
        minWidth:
          variant === "bar" &&
          !Number.isNaN(Math.min(Math.max(scale * number, 40), MAX_BAR_WIDTH))
            ? Math.min(Math.max(scale * number, 40), MAX_BAR_WIDTH) + 64
            : "fit-content",
      }}
    >
      <Text
        variant="technical"
        className="text-muted-foreground whitespace-nowrap"
      >
        {label}
      </Text>
      <div className="flex items-center gap-4">
        <NumberFlow
          willChange
          plugins={[continuous]}
          value={number ?? 0}
          locales="en-US"
          format={format}
          prefix={prefix}
          suffix={postfix}
          style={{
            fontSize: 32,
            lineHeight: 1,
          }}
          className="mono-full wght-medium"
        />
        {variant === "bar" && (
          <motion.span
            animate={{
              width: Math.min(Math.max(scale * number, 40), MAX_BAR_WIDTH),
            }}
            transition={{ type: "spring", duration: 0.9, bounce: 0 }}
            style={{
              display: "inline-block",
              height: 16,
              borderRadius: 1,
              background: colorMap[colorClass],
            }}
          />
        )}
        {variant === "square" && (
          <div
            className="w-4 h-4"
            style={{ background: colorMap[colorClass] }}
          />
        )}
      </div>
      {subLabel && (
        <Text variant="technical" className="text-muted-foreground" size="xs">
          {subLabel}
        </Text>
      )}
    </div>
  );
};

/**
 * Props for the MetricGroup component.
 *
 * @example
 * ```tsx
 * <MetricGroup
 *   metrics={[
 *     { number: 5, label: "Pending", class: "warning" },
 *     { number: 12, label: "Processing", class: "info" },
 *     { number: 24, label: "Complete", class: "success" },
 *   ]}
 * />
 * ```
 */
export interface MetricGroupProps {
  /** Array of metric configurations. Scale is auto-calculated based on the max value. */
  metrics: Omit<MetricProps, "scale">[];
  /** Additional CSS classes for the grid container. */
  className?: string;
  /** Visual indicator style for all metrics: "bar" (default), "square", or "hidden". */
  variant?: "bar" | "square" | "hidden";
}

/**
 * MetricGroup Component
 *
 * A container for multiple Metric components that automatically scales visual indicators
 * relative to each other. The metric with the largest value gets the maximum bar width,
 * and all other metrics are scaled proportionally.
 *
 * @see [Lasso Metric README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/metric/README.md)
 */
export const MetricGroup: React.FC<MetricGroupProps> = ({
  metrics,
  className,
  variant = "bar",
}) => {
  const maxNumber = Math.max(...metrics.map((m) => m.number));
  const scale = MAX_BAR_WIDTH / maxNumber; // Scale so max number gets 200px width

  return (
    <div className={cn("grid grid-cols-4 gap-8", className)}>
      {metrics.map((metric, index) => (
        <Metric key={index} {...metric} scale={scale} variant={variant} />
      ))}
    </div>
  );
};
