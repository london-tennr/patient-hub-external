import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
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
declare function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * SheetTrigger - The element that opens the sheet when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
declare function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * SheetClose - A button that closes the sheet when clicked.
 *
 * @param asChild - If true, merges props onto the child element instead of rendering a button
 */
declare function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
/**
 * SheetContent - The sliding panel that contains the sheet content.
 *
 * @param side - The edge from which the sheet slides in ("top" | "right" | "bottom" | "left"). Defaults to "right"
 * @param className - Additional CSS classes to apply to the content container
 * @param children - The content to display in the sheet
 */
declare function SheetContent({ className, children, side, ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
}): import("react/jsx-runtime").JSX.Element;
/**
 * SheetHeader - A container for the sheet title and description.
 *
 * @param className - Additional CSS classes to apply to the header
 * @param children - Typically contains SheetTitle and SheetDescription
 */
declare function SheetHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * SheetFooter - A container for actions, typically placed at the bottom of the sheet.
 *
 * @param className - Additional CSS classes to apply to the footer
 * @param children - Typically contains action buttons
 */
declare function SheetFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * SheetTitle - The title of the sheet. Required for accessibility.
 *
 * @param className - Additional CSS classes to apply to the title
 */
declare function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
/**
 * SheetDescription - A description or subtitle for the sheet.
 * Provides additional context for screen readers.
 *
 * @param className - Additional CSS classes to apply to the description
 */
declare function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };
//# sourceMappingURL=sheet.d.ts.map