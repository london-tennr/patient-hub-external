import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as React from "react";
/**
 * NavigationMenu Component
 *
 * A horizontal navigation bar with support for dropdown menus and rich content panels.
 * Built on top of Radix UI's Navigation Menu primitive with smooth animations,
 * keyboard navigation, and consistent styling for the Tennr design system.
 *
 * @see [Radix UI Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu)
 *
 * @see [Lasso NavigationMenu README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/navigation-menu/README.md)
 *
 * @param viewport - Whether to render the viewport wrapper for dropdown content (default: true)
 * @param className - Additional CSS classes to apply to the navigation menu
 */
declare function NavigationMenu({ className, children, viewport, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * NavigationMenuList - A container for navigation menu items, rendered as an unordered list.
 *
 * @param className - Additional CSS classes to apply to the list
 */
declare function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>): import("react/jsx-runtime").JSX.Element;
/**
 * NavigationMenuItem - An individual item within the navigation menu.
 *
 * @param value - Unique value for the item (required when using NavigationMenuTrigger)
 * @param className - Additional CSS classes to apply to the item
 */
declare function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
/**
 * A cva style function that returns consistent styling for navigation menu triggers and standalone links.
 * Use this to style NavigationMenuLink components that don't have dropdowns to match trigger appearance.
 *
 * @example
 * ```tsx
 * <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/page">
 *   Page Link
 * </NavigationMenuLink>
 * ```
 */
declare const navigationMenuTriggerStyle: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * NavigationMenuTrigger - A button that opens a dropdown content panel.
 * Includes an animated caret icon that rotates when the dropdown is open.
 *
 * @param className - Additional CSS classes to apply to the trigger
 * @param children - The label content for the trigger button
 */
declare function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * NavigationMenuContent - The dropdown panel containing links or rich content.
 * Renders inside the viewport when viewport is enabled, otherwise renders inline.
 * Includes slide and fade animations for smooth transitions.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param forceMount - Force mounting for animation control
 */
declare function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
/**
 * NavigationMenuViewport - The animated container for dropdown content.
 * Automatically added by NavigationMenu when viewport prop is true.
 * Handles positioning and animation of dropdown panels.
 *
 * @param className - Additional CSS classes to apply to the viewport
 * @param forceMount - Force mounting for animation control
 */
declare function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>): import("react/jsx-runtime").JSX.Element;
/**
 * NavigationMenuLink - A navigational link within the menu or content panel.
 * Use with asChild prop to render as a custom element (e.g., Next.js Link).
 * For standalone links without dropdowns, apply navigationMenuTriggerStyle() for consistent styling.
 *
 * @param active - Whether the link is currently active
 * @param asChild - Merge props onto child element instead of rendering an anchor
 * @param onSelect - Callback when link is selected
 * @param className - Additional CSS classes to apply to the link
 */
declare function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>): import("react/jsx-runtime").JSX.Element;
/**
 * NavigationMenuIndicator - An optional visual indicator showing the active trigger.
 * Displays as an arrow/caret pointing to the currently active menu item.
 * Animates between items as the user navigates.
 *
 * @param className - Additional CSS classes to apply to the indicator
 * @param forceMount - Force mounting for animation control
 */
declare function NavigationMenuIndicator({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>): import("react/jsx-runtime").JSX.Element;
export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, navigationMenuTriggerStyle, };
//# sourceMappingURL=navigation-menu.d.ts.map