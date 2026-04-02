import { CaretDown } from "@phosphor-icons/react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

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
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

/**
 * NavigationMenuList - A container for navigation menu items, rendered as an unordered list.
 *
 * @param className - Additional CSS classes to apply to the list
 */
function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

/**
 * NavigationMenuItem - An individual item within the navigation menu.
 *
 * @param value - Unique value for the item (required when using NavigationMenuTrigger)
 * @param className - Additional CSS classes to apply to the item
 */
function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

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
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-sm bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
);

/**
 * NavigationMenuTrigger - A button that opens a dropdown content panel.
 * Includes an animated caret icon that rotates when the dropdown is open.
 *
 * @param className - Additional CSS classes to apply to the trigger
 * @param children - The label content for the trigger button
 */
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <CaretDown
        weight="light"
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

/**
 * NavigationMenuContent - The dropdown panel containing links or rich content.
 * Renders inside the viewport when viewport is enabled, otherwise renders inline.
 * Includes slide and fade animations for smooth transitions.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param forceMount - Force mounting for animation control
 */
function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-sm group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

/**
 * NavigationMenuViewport - The animated container for dropdown content.
 * Automatically added by NavigationMenu when viewport prop is true.
 * Handles positioning and animation of dropdown panels.
 *
 * @param className - Additional CSS classes to apply to the viewport
 * @param forceMount - Force mounting for animation control
 */
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center",
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-sm border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

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
function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * NavigationMenuIndicator - An optional visual indicator showing the active trigger.
 * Displays as an arrow/caret pointing to the currently active menu item.
 * Animates between items as the user navigates.
 *
 * @param className - Additional CSS classes to apply to the indicator
 * @param forceMount - Force mounting for animation control
 */
function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
