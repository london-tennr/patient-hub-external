import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

const LEGACY_BADGE_STYLE = "legacy:wght-medium legacy:rounded-md!";

/**
 * Variant styles for the Badge component.
 *
 * Available variants:
 * - `default` / `primary`: Blue background with blue text, general purpose
 * - `secondary`: Secondary background with primary foreground, less prominent
 * - `destructive`: Error background with destructive text, for errors or critical states
 * - `outline`: Transparent with border, subtle appearance
 * - `success`: Green background with green text, for success states
 * - `warning`: Orange background with orange text, for warnings
 * - `info`: Blue background with blue text, for informational content
 * - `muted`: Accent background with foreground text, for disabled states
 * - `dark`: Brand secondary background, high contrast
 */
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-normal lasso:wght-normal leading-4 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-blue-100 text-blue-700 [a&]:hover:opacity-80",
        primary:
          "border border-transparent bg-blue-100 text-blue-700 [a&]:hover:opacity-80",
        secondary:
          "border border-transparent bg-secondary legacy:bg-primary text-primary-foreground [a&]:hover:opacity-90",
        destructive:
          "border border-transparent bg-error-3 text-destructive [a&]:hover:opacity-90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 legacy:bg-red-600/30 legacy:text-red-800!",
        outline:
          "border border-border bg-white text-foreground [a&]:hover:opacity-90",
        success:
          "border border-transparent bg-success-4 text-success-11 legacy:text-white [a&]:hover:opacity-90 legacy:bg-green-600/30 legacy:text-green-700",
        warning:
          "border border-transparent bg-warning-3 text-warning-11 [a&]:hover:opacity-90 legacy:bg-warning-400/30 legacy:text-warning-600",
        info: "border border-transparent bg-blue-100 text-blue-700 legacy:bg-info-600 legacy:text-white [a&]:hover:opacity-80",
        muted:
          "border border-transparent bg-accent text-foreground [a&]:hover:opacity-90",
        dark: "border border-transparent bg-brand-secondary text-primary-foreground [a&]:hover:opacity-90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Badge Component
 *
 * A small visual indicator used to display status, labels, counts, or short pieces
 * of information. Commonly used to highlight new features, show notification counts,
 * indicate status, or categorize content. Built with class-variance-authority for
 * consistent variant styling and supports polymorphic rendering via Radix UI's Slot.
 *
 * @see [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
 *
 * @see [Lasso Badge README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/badge/README.md)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>New</Badge>
 *
 * // With variant
 * <Badge variant="success">Active</Badge>
 *
 * // With icon
 * <Badge variant="warning">
 *   <Icon icon="ph:warning" />
 *   Pending
 * </Badge>
 *
 * // As a link
 * <Badge asChild variant="primary">
 *   <a href="/features">New Features</a>
 * </Badge>
 * ```
 *
 * @param variant - The visual style variant of the badge
 * @param asChild - When true, renders as the child element instead of a span
 * @param className - Additional CSS classes to apply
 */
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** When true, the Badge will render as its child element using Radix UI's Slot */
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), LEGACY_BADGE_STYLE, className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
