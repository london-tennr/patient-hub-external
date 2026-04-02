import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
/**
 * Drawer Component
 *
 * A sliding panel that emerges from any edge of the screen, providing a secondary
 * surface for navigation, forms, or detailed content. Built on top of the Vaul
 * drawer primitive with consistent styling for the Tennr design system.
 *
 * @see [Vaul Drawer](https://github.com/emilkowalski/vaul)
 *
 * @see [Lasso Drawer README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/drawer/README.md)
 *
 * @param direction - Direction from which the drawer opens: "right" (default), "left", "top", or "bottom"
 */
declare function Drawer({ direction, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerTrigger - The element that opens the drawer when clicked.
 *
 * Use the `asChild` prop to merge props onto a child element instead of rendering a button.
 */
declare function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerPortal - Renders the drawer content in a portal outside the DOM hierarchy.
 *
 * This ensures the drawer renders above other content regardless of DOM nesting.
 */
declare function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerClose - A button that closes the drawer when clicked.
 *
 * Use the `asChild` prop to merge props onto a child element instead of rendering a button.
 */
declare function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerOverlay - The semi-transparent backdrop behind the drawer.
 *
 * Provides visual separation from the main content and can be clicked to close the drawer.
 *
 * @param className - Additional CSS classes to apply to the overlay
 */
declare function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerContent - The main container for the drawer's content.
 *
 * Automatically positions and styles based on the drawer direction. Includes
 * optional overlay and drag handle for mobile interactions.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param children - The content to display inside the drawer
 * @param showingDraggingHandle - Show a drag handle for bottom drawers (default: true)
 * @param showOverlay - Show the semi-transparent overlay behind the drawer (default: true)
 */
declare function DrawerContent({ className, children, showingDraggingHandle, showOverlay, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content> & {
    showingDraggingHandle?: boolean;
    showOverlay?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerHeader - A styled header section for the drawer.
 *
 * Typically contains DrawerTitle and DrawerDescription. Text alignment
 * adjusts automatically based on drawer direction.
 *
 * @param className - Additional CSS classes to apply to the header
 */
declare function DrawerHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerFooter - A styled footer section for the drawer.
 *
 * Typically contains action buttons. Automatically positioned at the bottom
 * of the drawer content.
 *
 * @param className - Additional CSS classes to apply to the footer
 */
declare function DrawerFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerTitle - The drawer's title text with proper accessibility.
 *
 * Automatically associated with the drawer for screen readers via aria-labelledby.
 *
 * @param className - Additional CSS classes to apply to the title
 */
declare function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
/**
 * DrawerDescription - Supplementary text describing the drawer's purpose.
 *
 * Automatically associated with the drawer for screen readers via aria-describedby.
 *
 * @param className - Additional CSS classes to apply to the description
 */
declare function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, };
//# sourceMappingURL=drawer.d.ts.map