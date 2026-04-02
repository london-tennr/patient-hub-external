import { type VariantProps } from "class-variance-authority";
import * as React from "react";
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
declare const badgeVariants: (props?: ({
    variant?: "primary" | "outline" | "muted" | "default" | "info" | "warning" | "success" | "destructive" | "secondary" | "dark" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
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
declare function Badge({ className, variant, asChild, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    /** When true, the Badge will render as its child element using Radix UI's Slot */
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
//# sourceMappingURL=badge.d.ts.map