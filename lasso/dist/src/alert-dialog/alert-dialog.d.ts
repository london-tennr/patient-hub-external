import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";
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
declare function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogTrigger - The element that opens the alert dialog when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
declare function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogPortal - Renders the dialog content into a portal outside the DOM hierarchy.
 *
 * @param container - The container element to render the portal into
 * @param forceMount - Force mounting when used with animation libraries
 */
declare function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogOverlay - The semi-transparent backdrop behind the dialog.
 *
 * @param className - Additional CSS classes to apply to the overlay
 * @param forceMount - Force mounting when used with animation libraries
 */
declare function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogContent - The main container for the dialog content.
 * Automatically includes the portal and overlay components.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param forceMount - Force mounting when used with animation libraries
 */
declare function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogHeader - A semantic container for the title and description.
 *
 * @param className - Additional CSS classes to apply to the header container
 */
declare function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogFooter - A semantic container for action buttons.
 * Displays buttons in a column on mobile and row on larger screens.
 *
 * @param className - Additional CSS classes to apply to the footer container
 */
declare function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogTitle - The title/heading of the dialog.
 * Automatically labels the dialog for accessibility.
 *
 * @param className - Additional CSS classes to apply to the title
 */
declare function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogDescription - The descriptive text explaining the action.
 * Automatically describes the dialog for accessibility.
 *
 * @param className - Additional CSS classes to apply to the description
 */
declare function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogAction - The primary action button (typically destructive or confirming).
 * Styled with the default button variant.
 *
 * @param className - Additional CSS classes to apply (inherits Button styles)
 */
declare function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>): import("react/jsx-runtime").JSX.Element;
/**
 * AlertDialogCancel - The secondary button to dismiss the dialog.
 * Styled with the outline button variant.
 *
 * @param className - Additional CSS classes to apply (inherits outline Button styles)
 */
declare function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>): import("react/jsx-runtime").JSX.Element;
export { AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, };
//# sourceMappingURL=alert-dialog.d.ts.map