"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Popover Component
 *
 * A floating overlay that displays contextual information or interactive content
 * positioned relative to a trigger element. Built on top of Radix UI's Popover
 * primitive with consistent styling and animations for the Tennr design system.
 *
 * @see [Radix UI Popover](https://github.com/radix-ui/primitives/blob/main/packages/react/popover/src/popover.tsx)
 *
 * @see [Lasso Popover README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/popover/README.md)
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/**
 * PopoverTrigger - The element that triggers the popover to open when clicked.
 *
 * @param asChild - When true, merges props onto the child element instead of rendering a button
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/**
 * PopoverContent - The floating panel that contains the popover's content.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param align - Horizontal alignment relative to the trigger ("start", "center", "end"). Defaults to "center"
 * @param sideOffset - Distance in pixels from the trigger. Defaults to 4
 * @param container - Custom container element for the portal
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  container,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  container?: HTMLElement;
}) {
  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-sm border-border border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/**
 * PopoverAnchor - An optional element to use as the positioning anchor instead of the trigger.
 *
 * @param asChild - When true, merges props onto the child element
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

/**
 * PopoverClose - A button that closes the popover when clicked.
 *
 * @param asChild - When true, merges props onto the child element instead of rendering a button
 */
function PopoverClose({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

export { Popover, PopoverAnchor, PopoverContent, PopoverClose, PopoverTrigger };
