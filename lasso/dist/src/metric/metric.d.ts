import React from "react";
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
export declare const Metric: React.FC<MetricProps>;
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
export declare const MetricGroup: React.FC<MetricGroupProps>;
//# sourceMappingURL=metric.d.ts.map