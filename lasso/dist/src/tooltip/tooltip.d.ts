import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
/**
 * TooltipProvider - A context provider for shared tooltip configuration.
 *
 * Wraps tooltip components to provide shared settings like delay duration.
 * When using multiple tooltips, wrap them in a single TooltipProvider for
 * consistent behavior and to enable skip delay between tooltips.
 *
 * @param delayDuration - Default delay before showing tooltips (default: 0)
 */
declare function TooltipProvider({ delayDuration, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>): import("react/jsx-runtime").JSX.Element;
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
declare function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * TooltipTrigger - The element that triggers the tooltip on hover or focus.
 *
 * Wrap your interactive element with this component to make it a tooltip trigger.
 * Use the `asChild` prop to merge props onto a child element instead of rendering
 * a button.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
declare function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
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
declare function TooltipContent({ className, sideOffset, children, arrow, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content> & {
    arrow?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * TooltipArrow - An arrow element pointing to the trigger.
 *
 * Exported explicitly for legacy compatibility. Generally not needed as
 * TooltipContent includes an arrow by default via the `arrow` prop.
 *
 * @param className - Additional CSS classes to apply to the arrow
 */
declare const TooltipArrow: ({ className, ...props }: React.ComponentProps<typeof TooltipPrimitive.Arrow>) => import("react/jsx-runtime").JSX.Element;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipArrow, };
//# sourceMappingURL=tooltip.d.ts.map