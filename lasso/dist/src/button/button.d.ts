import { type VariantProps } from "class-variance-authority";
import * as React from "react";
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
declare const buttonVariants: (props?: ({
    variant?: "outline" | "muted" | "default" | "text" | "destructive" | "secondary" | "ghost" | "neutral" | "invisible" | "brand" | "brand-ghost" | "brand-secondary-ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
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
declare function Button({ className, variant, size, asChild, ...props }: React.ComponentProps<"button"> & ButtonVariantProps & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map