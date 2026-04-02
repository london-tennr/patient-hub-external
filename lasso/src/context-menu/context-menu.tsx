"use client";

import { CaretRight, Check, Circle } from "@phosphor-icons/react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * ContextMenu Component
 *
 * A menu component that appears on right-click, providing contextual actions for elements
 * on the page. Built on top of Radix UI's Context Menu primitive with consistent styling
 * for the Tennr design system.
 *
 * @see [Radix UI Context Menu](https://www.radix-ui.com/docs/primitives/components/context-menu)
 *
 * @see [Lasso ContextMenu README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/context-menu/README.md)
 */
function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

/**
 * ContextMenuTrigger - The element that triggers the context menu on right-click.
 *
 * Wrap any element that should open the context menu when right-clicked.
 */
function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

/**
 * ContextMenuGroup - A logical grouping of menu items.
 *
 * Use to group related menu items together for organization.
 */
function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

/**
 * ContextMenuPortal - Renders menu content in a React portal.
 *
 * Portals the content to the body to avoid z-index and overflow issues.
 */
function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

/**
 * ContextMenuSub - A sub-menu container for nested menus.
 *
 * Use to create nested menu structures with sub-items.
 */
function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

/**
 * ContextMenuRadioGroup - A group container for radio items.
 *
 * Use to create single-selection groups where only one item can be selected at a time.
 *
 * @param value - The selected value
 * @param onValueChange - Called when the selection changes
 */
function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

/**
 * ContextMenuSubTrigger - The item that opens a sub-menu.
 *
 * Displays an arrow indicator and opens the sub-menu on hover or keyboard navigation.
 *
 * @param className - Additional CSS classes to apply
 * @param inset - Add left padding to align with checkbox/radio items
 * @param children - The content to display in the trigger
 */
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm font-normal lasso:wght-normal leading-5 outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <CaretRight weight="light" className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

/**
 * ContextMenuSubContent - The content container for a sub-menu.
 *
 * Contains the items displayed within a sub-menu.
 *
 * @param className - Additional CSS classes to apply
 */
function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border border-border p-1 shadow-md",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ContextMenuContent - The container for menu items that appears when triggered.
 *
 * Renders inside a portal and contains all the menu items.
 *
 * @param className - Additional CSS classes to apply
 */
function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

/**
 * ContextMenuItem - An individual selectable item within the menu.
 *
 * @param className - Additional CSS classes to apply
 * @param inset - Add left padding to align with checkbox/radio items
 * @param variant - Visual variant: "default" or "destructive" for dangerous actions
 */
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-normal lasso:wght-normal leading-5 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ContextMenuCheckboxItem - A menu item that can be toggled on/off with a checkbox.
 *
 * @param className - Additional CSS classes to apply
 * @param children - The content to display in the item
 * @param checked - Whether the checkbox is checked
 */
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm font-normal lasso:wght-normal leading-5 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check weight="light" className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

/**
 * ContextMenuRadioItem - A menu item that works as part of a radio group.
 *
 * Only one radio item can be selected within a ContextMenuRadioGroup.
 *
 * @param className - Additional CSS classes to apply
 * @param children - The content to display in the item
 */
function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm font-normal lasso:wght-normal leading-5 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle weight="light" className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

/**
 * ContextMenuLabel - A non-interactive label for grouping menu items.
 *
 * @param className - Additional CSS classes to apply
 * @param inset - Add left padding to align with checkbox/radio items
 */
function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-semibold lasso:wght-semibold leading-5 data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ContextMenuSeparator - A visual divider between menu sections.
 *
 * @param className - Additional CSS classes to apply
 */
function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * ContextMenuShortcut - A hint displaying keyboard shortcuts for menu items.
 *
 * Renders as muted text aligned to the right of the menu item.
 *
 * @param className - Additional CSS classes to apply
 */
function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs font-normal lasso:wght-normal leading-4 tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
