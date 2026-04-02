import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";
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
declare function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * ScrollBar - The styled scrollbar component that can be oriented vertically or horizontally.
 *
 * By default, a vertical ScrollBar is automatically rendered inside ScrollArea.
 * Use this component explicitly when you need a horizontal scrollbar or custom styling.
 *
 * @param className - Additional CSS classes to apply to the scrollbar
 * @param orientation - Direction of the scrollbar: "vertical" (default) or "horizontal"
 */
declare function ScrollBar({ className, orientation, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): import("react/jsx-runtime").JSX.Element;
export { ScrollArea, ScrollBar };
//# sourceMappingURL=scroll-area.d.ts.map