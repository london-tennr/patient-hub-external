"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * HoverCard Component
 *
 * A floating card that displays rich content when a user hovers over a trigger element.
 * Useful for showing previews, additional context, or supplementary information without
 * requiring a click. Built on top of Radix UI's HoverCard primitive with consistent
 * styling for the Tennr design system.
 *
 * @see [Radix UI HoverCard](https://github.com/radix-ui/primitives/blob/main/packages/react/hover-card/src/hover-card.tsx)
 *
 * @see [Lasso HoverCard README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/hover-card/README.md)
 *
 */
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

/**
 * HoverCardTrigger - The element that triggers the hover card to appear.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 * @param className - Additional CSS classes to apply to the trigger
 */
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

/**
 * HoverCardContent - The floating content that displays when hovering over the trigger.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param align - Alignment relative to the trigger ("start" | "center" | "end", default: "center")
 * @param sideOffset - Distance in pixels from the trigger (default: 4)
 * @param children - The content to display in the hover card
 */
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-sm border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
