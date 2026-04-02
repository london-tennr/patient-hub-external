"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * ScrollArea Component
 *
 * A custom scrollable container that provides styled scrollbars. Replaces the browser's
 * native scrollbar with a consistent, visually appealing scrollbar that matches the
 * Tennr design system. Built on top of Radix UI's ScrollArea primitive for accessibility
 * and consistent behavior.
 *
 * @see [Radix UI ScrollArea](https://www.radix-ui.com/primitives/docs/components/scroll-area)
 *
 * @see [Lasso ScrollArea README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/scroll-area/README.md)
 *
 * @param className - Additional CSS classes to apply to the scroll area container
 * @param children - Content to be rendered inside the scrollable area
 */
function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

/**
 * ScrollBar - The styled scrollbar component that can be oriented vertically or horizontally.
 *
 * By default, a vertical ScrollBar is automatically rendered inside ScrollArea.
 * Use this component explicitly when you need a horizontal scrollbar or custom styling.
 *
 * @param className - Additional CSS classes to apply to the scrollbar
 * @param orientation - Direction of the scrollbar: "vertical" (default) or "horizontal"
 */
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
