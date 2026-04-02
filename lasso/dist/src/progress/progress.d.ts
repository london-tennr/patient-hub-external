import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
/**
 * Variant styles for the Progress component container.
 *
 * - `default`: Standard progress bar with brand colors
 * - `success`: Green-tinted progress bar for completion/success states
 */
declare const progressVariants: (props?: ({
    variant?: "default" | "success" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Props for the Progress component.
 *
 * Extends Radix UI Progress Root props and includes variant styling options.
 *
 * @example
 * ```tsx
 * <Progress value={75} />
 * <Progress value={100} variant="success" />
 * ```
 */
export interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root>, VariantProps<typeof progressVariants> {
}
/**
 * Progress Component
 *
 * A visual indicator that displays the completion status of a task or process
 * as a horizontal bar. Built on top of Radix UI's Progress primitive with
 * consistent styling for the Tennr design system.
 *
 * The component shows progress by filling a horizontal bar from left to right,
 * where the `value` prop (0-100) determines how much of the bar is filled.
 *
 * @see [Radix UI Progress](https://www.radix-ui.com/primitives/docs/components/progress)
 *
 * @see [Lasso Progress README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/progress/README.md)
 *
 * @param value - The progress value from 0 to 100
 * @param variant - The visual style variant ("default" | "success")
 * @param className - Additional CSS classes to apply
 */
declare function Progress({ className, value, variant, ...props }: ProgressProps): import("react/jsx-runtime").JSX.Element;
export { Progress };
//# sourceMappingURL=progress.d.ts.map