import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NumberFlow, { continuous } from "@number-flow/react";
import { motion } from "motion/react";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
/**
 * Color map for metric visual indicators.
 * Maps semantic color classes to CSS custom properties.
 */
const colorMap = {
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
const format = {
    notation: "compact",
    compactDisplay: "short",
    roundingMode: "trunc",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
};
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
export const Metric = ({ number, label, subLabel, postfix, prefix, class: colorClass, className, variant = "bar", scale = 4, onClick, }) => {
    return (_jsxs("div", { onClick: onClick, className: cn("flex flex-col items-start group", className), style: {
            minWidth: variant === "bar" &&
                !Number.isNaN(Math.min(Math.max(scale * number, 40), MAX_BAR_WIDTH))
                ? Math.min(Math.max(scale * number, 40), MAX_BAR_WIDTH) + 64
                : "fit-content",
        }, children: [_jsx(Text, { variant: "technical", className: "text-muted-foreground whitespace-nowrap", children: label }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(NumberFlow, { willChange: true, plugins: [continuous], value: number ?? 0, locales: "en-US", format: format, prefix: prefix, suffix: postfix, style: {
                            fontSize: 32,
                            lineHeight: 1,
                        }, className: "mono-full wght-medium" }), variant === "bar" && (_jsx(motion.span, { animate: {
                            width: Math.min(Math.max(scale * number, 40), MAX_BAR_WIDTH),
                        }, transition: { type: "spring", duration: 0.9, bounce: 0 }, style: {
                            display: "inline-block",
                            height: 16,
                            borderRadius: 1,
                            background: colorMap[colorClass],
                        } })), variant === "square" && (_jsx("div", { className: "w-4 h-4", style: { background: colorMap[colorClass] } }))] }), subLabel && (_jsx(Text, { variant: "technical", className: "text-muted-foreground", size: "xs", children: subLabel }))] }));
};
/**
 * MetricGroup Component
 *
 * A container for multiple Metric components that automatically scales visual indicators
 * relative to each other. The metric with the largest value gets the maximum bar width,
 * and all other metrics are scaled proportionally.
 *
 * @see [Lasso Metric README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/metric/README.md)
 */
export const MetricGroup = ({ metrics, className, variant = "bar", }) => {
    const maxNumber = Math.max(...metrics.map((m) => m.number));
    const scale = MAX_BAR_WIDTH / maxNumber; // Scale so max number gets 200px width
    return (_jsx("div", { className: cn("grid grid-cols-4 gap-8", className), children: metrics.map((metric, index) => (_jsx(Metric, { ...metric, scale: scale, variant: variant }, index))) }));
};
