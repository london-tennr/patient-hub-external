import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
/**
 * Toggle variant styles using class-variance-authority.
 *
 * Provides variant and size options for the Toggle component:
 * - **variant**: `"default"` (transparent) or `"outline"` (bordered with shadow)
 * - **size**: `"sm"` (32px), `"default"` (36px), or `"lg"` (40px)
 */
declare const toggleVariants: (props?: ({
    variant?: "outline" | "default" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
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
declare function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
export { Toggle, toggleVariants };
//# sourceMappingURL=toggle.d.ts.map