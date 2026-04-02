import { XIcon } from "@phosphor-icons/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

import { Button } from "../button/button";
import { cn } from "../utils/cn";

/**
 * Dialog Component
 *
 * A modal window that appears on top of the main content, requiring user attention
 * before they can continue. Overlays the page content with a semi-transparent backdrop
 * and centers the dialog content. Built on top of Radix UI's Dialog primitive with
 * consistent styling for the Tennr design system.
 *
 * @see [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 *
 * @see [Lasso Dialog README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/dialog/README.md)
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Dialog description here.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button>Save</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * DialogTrigger - The element that opens the dialog when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * DialogPortal - Renders the dialog into a portal outside the DOM hierarchy.
 *
 * This ensures the dialog is rendered at the root level, avoiding z-index issues
 * with parent containers.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * DialogClose - A button or element that closes the dialog when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * DialogOverlay - The semi-transparent backdrop behind the dialog.
 *
 * Clicking the overlay will close the dialog when modal mode is enabled.
 *
 * @param className - Additional CSS classes to apply to the overlay
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DialogContent - The main container for the dialog's content.
 *
 * Includes optional close button and overlay, with fade and zoom animations.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param children - The content to display inside the dialog
 * @param showCloseButton - Whether to show the close button in the top-right corner (default: true)
 * @param showOverlay - Whether to show the semi-transparent overlay backdrop (default: true)
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  showOverlay = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  showOverlay?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      {showOverlay && <DialogOverlay />}
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              aria-label="Close"
            >
              <XIcon weight="light" />
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * DialogHeader - A semantic container for the dialog's title and description.
 *
 * Provides consistent spacing and alignment for header content.
 *
 * @param className - Additional CSS classes to apply to the header
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

/**
 * DialogFooter - A semantic container for action buttons.
 *
 * Provides consistent spacing and responsive layout for footer actions.
 * On mobile, buttons stack vertically in reverse order; on larger screens,
 * buttons align horizontally to the right.
 *
 * @param className - Additional CSS classes to apply to the footer
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DialogTitle - The heading that describes the dialog's purpose.
 *
 * Used by screen readers to announce the dialog. Should be placed inside DialogHeader.
 *
 * @param className - Additional CSS classes to apply to the title
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * DialogDescription - Additional context about the dialog's content.
 *
 * Provides supplementary information to help users understand what the dialog is about.
 * Used by screen readers for additional context. Should be placed inside DialogHeader.
 *
 * @param className - Additional CSS classes to apply to the description
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
