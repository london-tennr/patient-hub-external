import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Button variant configuration using class-variance-authority.
 *
 * Provides type-safe variant management for button styles including multiple
 * visual variants (default, destructive, outline, etc.) and sizes (default, sm, lg, icon).
 *
 * @example
 * ```tsx
 * // Use directly for custom elements
 * <div className={buttonVariants({ variant: "outline", size: "sm" })} />
 * ```
 */
const buttonVariants = cva(
  "inline-flex items-center hover:cursor-pointer justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium lasso:wght-medium leading-5 transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-secondary legacy:bg-primary text-primary-foreground hover:bg-secondary/90 legacy:hover:bg-primary/90 disabled:opacity-50",
        destructive:
          "bg-destructive text-primary-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 disabled:opacity-50",
        outline:
          "border border-border bg-white text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
        secondary:
          "bg-brand-peat text-primary-foreground hover:bg-brand-peat/90 disabled:opacity-50",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
        text: "bg-transparent text-secondary legacy:text-primary underline-offset-4 hover:underline focus-visible:underline disabled:opacity-50",
        neutral: "text-neutral-11 hover:bg-neutral-3 focus:bg-neutral-3",
        invisible: "hover:text-foreground-muted",
        brand:
          "bg-brand-primary text-primary-foreground hover:bg-brand-primary/90 disabled:bg-brand-primary/50 disabled:text-primary-foreground",
        muted: cn(
          "bg-accent text-primary hover:bg-muted disabled:opacity-50 disabled:text-primary",
          "legacy:bg-secondary legacy:border-none legacy:hover:bg-secondary/90 legacy:hover:border-none",
        ),
        "brand-ghost":
          "bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary disabled:bg-brand-secondary/5 disabled:text-brand-primary/70",
        "brand-secondary-ghost":
          "bg-brand-secondary/10 hover:bg-brand-secondary/20 text-brand-secondary disabled:bg-brand-secondary/5 disabled:text-brand-secondary/70",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5 text-xs font-medium lasso:wght-medium leading-4",
        lg: "h-10 rounded-sm px-8 has-[>svg]:px-6",
        icon: "size-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  },
);

/**
 * Type definition for Button variant props.
 *
 * Extracted from the buttonVariants CVA configuration, useful for creating
 * custom components that need to accept the same variant and size props.
 *
 * @example
 * ```tsx
 * type MyButtonProps = ButtonVariantProps & {
 *   customProp: string;
 * };
 * ```
 */
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

/**
 * Button Component
 *
 * A versatile, accessible button component that serves as the primary interactive
 * element for user actions throughout the Tennr design system. Supports multiple
 * visual variants, sizes, and can render as different HTML elements using the
 * `asChild` prop. Built with class-variance-authority (CVA) for type-safe variant
 * management and Radix UI's Slot for polymorphic rendering.
 *
 * @see [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
 *
 * @see [Class Variance Authority](https://cva.style/docs)
 *
 * @see [Lasso Button README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/button/README.md)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="default">Click me</Button>
 *
 * // With icon
 * <Button size="icon" aria-label="Search">
 *   <SearchIcon />
 * </Button>
 *
 * // As a link
 * <Button asChild>
 *   <a href="/dashboard">Go to Dashboard</a>
 * </Button>
 * ```
 *
 * @param className - Additional CSS classes to apply to the button
 * @param variant - Visual style variant (default, destructive, outline, secondary, ghost, text, neutral, invisible, brand, muted, brand-ghost, brand-secondary-ghost)
 * @param size - Size variant (default, sm, lg, icon)
 * @param asChild - When true, renders the child element with button styling instead of a native button
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariantProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
