import { MagnifyingGlass } from "@phosphor-icons/react";
import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog/dialog";
import { cn } from "../utils/cn";

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
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-sm",
        className,
      )}
      {...props}
    />
  );
}

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
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

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
function CommandInput({
  className,
  wrapperClassName,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  wrapperClassName?: string;
}) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(
        "flex h-9 items-center gap-2 border-b legacy:border-border px-3",
        wrapperClassName,
      )}
    >
      <MagnifyingGlass weight="light" className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-sm bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

/**
 * CommandList - A scrollable container for command items.
 *
 * Wraps command groups and items with overflow handling and scroll behavior.
 * Should contain CommandEmpty, CommandGroup, and/or CommandItem components.
 *
 * @param className - Additional CSS classes to apply to the list container
 */
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

/**
 * CommandEmpty - Placeholder content shown when no results match the search query.
 *
 * Automatically displayed when the search filter returns no matching items.
 * Typically contains a "No results found" message.
 */
function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

/**
 * CommandGroup - Groups related command items together with an optional heading.
 *
 * Use to organize command items into logical sections. The heading prop
 * provides a label for the group that appears above the items.
 *
 * @param heading - Optional heading text for the group
 * @param className - Additional CSS classes to apply to the group
 */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

/**
 * CommandSeparator - A visual divider between groups or sections.
 *
 * Use to create visual separation between command groups or to divide
 * items into distinct sections.
 *
 * @param className - Additional CSS classes to apply to the separator
 */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

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
function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-bg-secondary-hover data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * CommandShortcut - A styled span for displaying keyboard shortcuts alongside items.
 *
 * Typically placed at the end of a CommandItem to show the keyboard shortcut
 * that triggers the action. Styled with muted color and smaller text.
 *
 * @param className - Additional CSS classes to apply to the shortcut
 */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
