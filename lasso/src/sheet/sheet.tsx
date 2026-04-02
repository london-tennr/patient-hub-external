import { X } from "@phosphor-icons/react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Sheet Component
 *
 * A panel that slides in from the edge of the screen, typically used for navigation,
 * forms, or displaying supplementary content. It overlays the main content with a
 * semi-transparent backdrop and provides a focused interaction space. Built on top
 * of Radix UI's Dialog primitive with consistent styling for the Tennr design system.
 *
 * @see [Radix UI Dialog](https://github.com/radix-ui/primitives/blob/main/packages/react/dialog/src/Dialog.tsx)
 *
 * @see [Lasso Sheet README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/sheet/README.md)
 *
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * SheetTrigger - The element that opens the sheet when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * SheetClose - A button that closes the sheet when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * SheetPortal - Renders the sheet content outside the DOM hierarchy.
 * Used internally by SheetContent.
 */
function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * SheetOverlay - The semi-transparent backdrop behind the sheet.
 * Used internally by SheetContent.
 *
 * @param className - Additional CSS classes to apply to the overlay
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * SheetContent - The sliding panel that contains the sheet content.
 *
 * @param side - The edge from which the sheet slides in ("top" | "right" | "bottom" | "left"). Defaults to "right"
 * @param className - Additional CSS classes to apply to the content container
 * @param children - The content to display in the sheet
 */
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <X weight="light" className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * SheetHeader - A container for the sheet title and description.
 *
 * @param className - Additional CSS classes to apply to the header
 * @param children - Typically contains SheetTitle and SheetDescription
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

/**
 * SheetFooter - A container for actions, typically placed at the bottom of the sheet.
 *
 * @param className - Additional CSS classes to apply to the footer
 * @param children - Typically contains action buttons
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

/**
 * SheetTitle - The title of the sheet. Required for accessibility.
 *
 * @param className - Additional CSS classes to apply to the title
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

/**
 * SheetDescription - A description or subtitle for the sheet.
 * Provides additional context for screen readers.
 *
 * @param className - Additional CSS classes to apply to the description
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
