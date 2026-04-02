import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Variant styles for the Progress component container.
 *
 * - `default`: Standard progress bar with brand colors
 * - `success`: Green-tinted progress bar for completion/success states
 */
const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "lasso:bg-brand-peat/20 legacy:bg-slate-100",
        success: "bg-success-11/20",
      },
    },
  },
);

/**
 * Variant styles for the Progress indicator (the filled portion of the bar).
 *
 * - `default`: Standard brand color fill
 * - `success`: Green fill for completion/success states
 */
const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "lasso:bg-brand-peat legacy:bg-blue-600",
      success: "bg-success-11",
    },
  },
});

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
export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

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
function Progress({ className, value, variant, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressVariants({ variant, className }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={progressIndicatorVariants({ variant, className })}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
