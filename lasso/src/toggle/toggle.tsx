import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Toggle variant styles using class-variance-authority.
 *
 * Provides variant and size options for the Toggle component:
 * - **variant**: `"default"` (transparent) or `"outline"` (bordered with shadow)
 * - **size**: `"sm"` (32px), `"default"` (36px), or `"lg"` (40px)
 */
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Toggle Component
 *
 * A two-state button that can be either on or off. Toggles are commonly used for
 * enabling/disabling features, formatting text (bold, italic), or switching between
 * two modes. Built on top of Radix UI's Toggle primitive with consistent styling
 * for the Tennr design system.
 *
 * @see [Radix UI Toggle](https://www.radix-ui.com/primitives/docs/components/toggle)
 *
 * @see [Lasso Toggle README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/toggle/README.md)
 *
 * @example
 * ```tsx
 * import { Toggle } from "@tennr/lasso/toggle";
 *
 * <Toggle aria-label="Toggle bold">
 *   <TextB weight="light" />
 * </Toggle>
 * ```
 *
 * @param className - Additional CSS classes to apply
 * @param variant - Visual style variant: "default" or "outline"
 * @param size - Size of the toggle: "sm", "default", or "lg"
 */
function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
