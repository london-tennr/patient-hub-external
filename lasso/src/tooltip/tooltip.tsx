"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * TooltipProvider - A context provider for shared tooltip configuration.
 *
 * Wraps tooltip components to provide shared settings like delay duration.
 * When using multiple tooltips, wrap them in a single TooltipProvider for
 * consistent behavior and to enable skip delay between tooltips.
 *
 * @param delayDuration - Default delay before showing tooltips (default: 0)
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Tooltip Component
 *
 * A contextual overlay that displays additional information when users hover over
 * or focus on an element. Provides helpful hints, labels, or descriptions without
 * cluttering the interface. Built on top of Radix UI's Tooltip primitive with
 * consistent styling for the Tennr design system.
 *
 * This component automatically wraps content with a TooltipProvider for convenience.
 *
 * @see [Radix UI Tooltip](https://github.com/radix-ui/primitives/blob/main/packages/react/tooltip/src/tooltip.tsx)
 *
 * @see [Lasso Tooltip README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/tooltip/README.md)
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * TooltipTrigger - The element that triggers the tooltip on hover or focus.
 *
 * Wrap your interactive element with this component to make it a tooltip trigger.
 * Use the `asChild` prop to merge props onto a child element instead of rendering
 * a button.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/**
 * TooltipContent - The floating content that displays the tooltip message.
 *
 * Renders inside a portal and supports flexible positioning with automatic
 * collision detection. Includes an optional arrow indicator by default.
 *
 * @param className - Additional CSS classes to apply to the content
 * @param sideOffset - Distance from the trigger in pixels (default: 0)
 * @param arrow - Whether to show the arrow indicator (default: true)
 * @param children - The content to display in the tooltip
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  arrow = true,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  arrow?: boolean;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-black text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs font-normal lasso:wght-normal leading-4 text-balance",
          !arrow && "mt-2",
          className,
        )}
        {...props}
      >
        {children}
        {arrow && (
          <TooltipPrimitive.Arrow className="legacy:invisible bg-black fill-black z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

/**
 * TooltipArrow - An arrow element pointing to the trigger.
 *
 * Exported explicitly for legacy compatibility. Generally not needed as
 * TooltipContent includes an arrow by default via the `arrow` prop.
 *
 * @param className - Additional CSS classes to apply to the arrow
 */
const TooltipArrow = ({
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Arrow>) => (
  <TooltipPrimitive.Arrow
    className={cn(
      "bg-black fill-black z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
      className,
    )}
    {...props}
  />
);

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
};
