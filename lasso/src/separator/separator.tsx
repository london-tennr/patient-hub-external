"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Separator Component
 *
 * A visual divider that separates content into distinct sections. The Separator
 * renders as a thin line and can be oriented horizontally or vertically. Built
 * on top of Radix UI's Separator primitive with consistent styling for the
 * Tennr design system.
 *
 * @see [Radix UI Separator](https://github.com/radix-ui/primitives/blob/main/packages/react/separator/src/separator.tsx)
 *
 * @see [Lasso Separator README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/separator/README.md)
 *
 * @param className - Additional CSS classes to apply to the separator
 * @param orientation - The orientation of the separator. Defaults to "horizontal"
 * @param decorative - When true, indicates the separator is purely visual and has no semantic meaning. Defaults to true
 *
 * @example
 * ```tsx
 * // Horizontal separator (default)
 * <Separator />
 *
 * // Vertical separator
 * <Separator orientation="vertical" />
 *
 * // With custom styling
 * <Separator className="my-4 bg-muted" />
 * ```
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
