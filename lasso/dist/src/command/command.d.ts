import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";
import { Dialog } from "../dialog/dialog";
/**
 * Command Component
 *
 * A composable command menu interface for search and selection functionality.
 * Provides a fast, accessible, and keyboard-friendly way to navigate through
 * a list of items, execute actions, or search content. Built on top of the
 * cmdk library with consistent styling for the Tennr design system.
 *
 * @see [cmdk](https://github.com/pacocoursey/cmdk)
 *
 * @see [Lasso Command README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/command/README.md)
 *
 * @param className - Additional CSS classes to apply to the command container
 */
declare function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>): import("react/jsx-runtime").JSX.Element;
/**
 * CommandDialog - A pre-styled dialog wrapper for displaying the command menu in a modal overlay.
 *
 * Combines the Command component with a Dialog for modal presentation. Useful for
 * application-wide command palettes triggered by keyboard shortcuts (e.g., ⌘K).
 *
 * @param title - Accessible title for the dialog (default: "Command Palette")
 * @param description - Accessible description for screen readers (default: "Search for a command to run...")
 * @param className - Additional CSS classes to apply to the dialog content
 * @param showCloseButton - Whether to show the close button (default: true)
 * @param children - The command menu content to display inside the dialog
 */
declare function CommandDialog({ title, description, children, className, showCloseButton, ...props }: React.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * CommandInput - The search input field for the command menu.
 *
 * Provides a styled text input with a built-in search icon for filtering
 * command items. Automatically filters the CommandList based on user input.
 *
 * @param placeholder - Placeholder text for the input
 * @param className - Additional CSS classes for the input element
 * @param wrapperClassName - Additional CSS classes for the input wrapper container
 */
declare function CommandInput({ className, wrapperClassName, ...props }: React.ComponentProps<typeof CommandPrimitive.Input> & {
    wrapperClassName?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * CommandList - A scrollable container for command items.
 *
 * Wraps command groups and items with overflow handling and scroll behavior.
 * Should contain CommandEmpty, CommandGroup, and/or CommandItem components.
 *
 * @param className - Additional CSS classes to apply to the list container
 */
declare function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>): import("react/jsx-runtime").JSX.Element;
/**
 * CommandEmpty - Placeholder content shown when no results match the search query.
 *
 * Automatically displayed when the search filter returns no matching items.
 * Typically contains a "No results found" message.
 */
declare function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>): import("react/jsx-runtime").JSX.Element;
/**
 * CommandGroup - Groups related command items together with an optional heading.
 *
 * Use to organize command items into logical sections. The heading prop
 * provides a label for the group that appears above the items.
 *
 * @param heading - Optional heading text for the group
 * @param className - Additional CSS classes to apply to the group
 */
declare function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
/**
 * CommandSeparator - A visual divider between groups or sections.
 *
 * Use to create visual separation between command groups or to divide
 * items into distinct sections.
 *
 * @param className - Additional CSS classes to apply to the separator
 */
declare function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
/**
 * CommandItem - An individual selectable item within the command menu.
 *
 * Represents a single action or navigation option. Supports icons, text,
 * and keyboard shortcuts. Automatically highlighted during keyboard navigation.
 *
 * @param onSelect - Callback fired when the item is selected (via click or Enter)
 * @param value - The value used for filtering (auto-generated from text content if not provided)
 * @param disabled - Whether the item is disabled
 * @param className - Additional CSS classes to apply to the item
 */
declare function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
/**
 * CommandShortcut - A styled span for displaying keyboard shortcuts alongside items.
 *
 * Typically placed at the end of a CommandItem to show the keyboard shortcut
 * that triggers the action. Styled with muted color and smaller text.
 *
 * @param className - Additional CSS classes to apply to the shortcut
 */
declare function CommandShortcut({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, };
//# sourceMappingURL=command.d.ts.map