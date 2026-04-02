import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

import { buttonVariants } from "../button/button";
import { cn } from "../utils/cn";

/**
 * AlertDialog Component
 *
 * A modal dialog that interrupts the user with important content and expects a response.
 * Built on top of Radix UI's AlertDialog primitive with consistent styling for the
 * Tennr design system. Use for destructive actions, critical decisions, or any action
 * that requires explicit user acknowledgment.
 *
 * @see [Radix UI AlertDialog](https://www.radix-ui.com/primitives/docs/components/alert-dialog)
 *
 * @see [Lasso AlertDialog README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/alert-dialog/README.md)
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

/**
 * AlertDialogTrigger - The element that opens the alert dialog when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

/**
 * AlertDialogPortal - Renders the dialog content into a portal outside the DOM hierarchy.
 *
 * @param container - The container element to render the portal into
 * @param forceMount - Force mounting when used with animation libraries
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

/**
 * AlertDialogOverlay - The semi-transparent backdrop behind the dialog.
 *
 * @param className - Additional CSS classes to apply to the overlay
 * @param forceMount - Force mounting when used with animation libraries
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * AlertDialogContent - The main container for the dialog content.
 * Automatically includes the portal and overlay components.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param forceMount - Force mounting when used with animation libraries
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-sm border border-border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

/**
 * AlertDialogHeader - A semantic container for the title and description.
 *
 * @param className - Additional CSS classes to apply to the header container
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-left", className)}
      {...props}
    />
  );
}

/**
 * AlertDialogFooter - A semantic container for action buttons.
 * Displays buttons in a column on mobile and row on larger screens.
 *
 * @param className - Additional CSS classes to apply to the footer container
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2",
        className,
      )}
      {...props}
    />
  );
}

/**
 * AlertDialogTitle - The title/heading of the dialog.
 * Automatically labels the dialog for accessibility.
 *
 * @param className - Additional CSS classes to apply to the title
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-base font-semibold lasso:wght-semibold leading-6 text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * AlertDialogDescription - The descriptive text explaining the action.
 * Automatically describes the dialog for accessibility.
 *
 * @param className - Additional CSS classes to apply to the description
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-muted-foreground text-sm font-normal lasso:wght-normal leading-5",
        className,
      )}
      {...props}
    />
  );
}

/**
 * AlertDialogAction - The primary action button (typically destructive or confirming).
 * Styled with the default button variant.
 *
 * @param className - Additional CSS classes to apply (inherits Button styles)
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

/**
 * AlertDialogCancel - The secondary button to dismiss the dialog.
 * Styled with the outline button variant.
 *
 * @param className - Additional CSS classes to apply (inherits outline Button styles)
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
