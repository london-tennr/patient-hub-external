import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";
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
declare function HoverCard({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * HoverCardTrigger - The element that triggers the hover card to appear.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 * @param className - Additional CSS classes to apply to the trigger
 */
declare function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * HoverCardContent - The floating content that displays when hovering over the trigger.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param align - Alignment relative to the trigger ("start" | "center" | "end", default: "center")
 * @param sideOffset - Distance in pixels from the trigger (default: 4)
 * @param children - The content to display in the hover card
 */
declare function HoverCardContent({ className, align, sideOffset, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { HoverCard, HoverCardTrigger, HoverCardContent };
//# sourceMappingURL=hover-card.d.ts.map