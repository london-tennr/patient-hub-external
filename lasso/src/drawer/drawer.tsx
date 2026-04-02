"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../utils/cn";

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
function Drawer({
  direction = "right",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root data-slot="drawer" direction={direction} {...props} />
  );
}

/**
 * DrawerTrigger - The element that opens the drawer when clicked.
 *
 * Use the `asChild` prop to merge props onto a child element instead of rendering a button.
 */
function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

/**
 * DrawerPortal - Renders the drawer content in a portal outside the DOM hierarchy.
 *
 * This ensures the drawer renders above other content regardless of DOM nesting.
 */
function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

/**
 * DrawerClose - A button that closes the drawer when clicked.
 *
 * Use the `asChild` prop to merge props onto a child element instead of rendering a button.
 */
function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

/**
 * DrawerOverlay - The semi-transparent backdrop behind the drawer.
 *
 * Provides visual separation from the main content and can be clicked to close the drawer.
 *
 * @param className - Additional CSS classes to apply to the overlay
 */
function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

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
function DrawerContent({
  className,
  children,
  showingDraggingHandle = true,
  showOverlay = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  showingDraggingHandle?: boolean;
  showOverlay?: boolean;
}) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      {showOverlay && <DrawerOverlay />}
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-md data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=top]:border-border",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-md data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=bottom]:border-border",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:border-border data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-xl",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:border-border data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:sm:max-w-xl",
          className,
        )}
        {...props}
      >
        {showingDraggingHandle && (
          <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

/**
 * DrawerHeader - A styled header section for the drawer.
 *
 * Typically contains DrawerTitle and DrawerDescription. Text alignment
 * adjusts automatically based on drawer direction.
 *
 * @param className - Additional CSS classes to apply to the header
 */
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-2 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:text-left",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DrawerFooter - A styled footer section for the drawer.
 *
 * Typically contains action buttons. Automatically positioned at the bottom
 * of the drawer content.
 *
 * @param className - Additional CSS classes to apply to the footer
 */
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

/**
 * DrawerTitle - The drawer's title text with proper accessibility.
 *
 * Automatically associated with the drawer for screen readers via aria-labelledby.
 *
 * @param className - Additional CSS classes to apply to the title
 */
function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "text-base font-semibold lasso:wght-semibold leading-6 text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DrawerDescription - Supplementary text describing the drawer's purpose.
 *
 * Automatically associated with the drawer for screen readers via aria-describedby.
 *
 * @param className - Additional CSS classes to apply to the description
 */
function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        "text-sm font-normal lasso:wght-normal leading-5 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
