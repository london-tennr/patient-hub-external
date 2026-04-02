import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
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
declare function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * DialogTrigger - The element that opens the dialog when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
declare function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * DialogPortal - Renders the dialog into a portal outside the DOM hierarchy.
 *
 * This ensures the dialog is rendered at the root level, avoiding z-index issues
 * with parent containers.
 */
declare function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
/**
 * DialogClose - A button or element that closes the dialog when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
declare function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
/**
 * DialogOverlay - The semi-transparent backdrop behind the dialog.
 *
 * Clicking the overlay will close the dialog when modal mode is enabled.
 *
 * @param className - Additional CSS classes to apply to the overlay
 */
declare function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): import("react/jsx-runtime").JSX.Element;
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
declare function DialogContent({ className, children, showCloseButton, showOverlay, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
    showOverlay?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * DialogHeader - A semantic container for the dialog's title and description.
 *
 * Provides consistent spacing and alignment for header content.
 *
 * @param className - Additional CSS classes to apply to the header
 */
declare function DialogHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * DialogFooter - A semantic container for action buttons.
 *
 * Provides consistent spacing and responsive layout for footer actions.
 * On mobile, buttons stack vertically in reverse order; on larger screens,
 * buttons align horizontally to the right.
 *
 * @param className - Additional CSS classes to apply to the footer
 */
declare function DialogFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * DialogTitle - The heading that describes the dialog's purpose.
 *
 * Used by screen readers to announce the dialog. Should be placed inside DialogHeader.
 *
 * @param className - Additional CSS classes to apply to the title
 */
declare function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
/**
 * DialogDescription - Additional context about the dialog's content.
 *
 * Provides supplementary information to help users understand what the dialog is about.
 * Used by screen readers for additional context. Should be placed inside DialogHeader.
 *
 * @param className - Additional CSS classes to apply to the description
 */
declare function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, };
//# sourceMappingURL=dialog.d.ts.map