import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
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
declare function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * PopoverTrigger - The element that triggers the popover to open when clicked.
 *
 * @param asChild - When true, merges props onto the child element instead of rendering a button
 */
declare function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * PopoverContent - The floating panel that contains the popover's content.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param align - Horizontal alignment relative to the trigger ("start", "center", "end"). Defaults to "center"
 * @param sideOffset - Distance in pixels from the trigger. Defaults to 4
 * @param container - Custom container element for the portal
 */
declare function PopoverContent({ className, align, sideOffset, container, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & {
    container?: HTMLElement;
}): import("react/jsx-runtime").JSX.Element;
/**
 * PopoverAnchor - An optional element to use as the positioning anchor instead of the trigger.
 *
 * @param asChild - When true, merges props onto the child element
 */
declare function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>): import("react/jsx-runtime").JSX.Element;
/**
 * PopoverClose - A button that closes the popover when clicked.
 *
 * @param asChild - When true, merges props onto the child element instead of rendering a button
 */
declare function PopoverClose({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
export { Popover, PopoverAnchor, PopoverContent, PopoverClose, PopoverTrigger };
//# sourceMappingURL=popover.d.ts.map