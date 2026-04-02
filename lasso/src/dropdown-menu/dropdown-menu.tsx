import { CaretRight, Check, Circle } from "@phosphor-icons/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * DropdownMenu Component
 *
 * A flexible menu component that displays a list of actions or options when triggered.
 * Built on top of Radix UI's DropdownMenu primitive with consistent styling for the
 * Tennr design system. Supports nested submenus, checkbox items, radio groups,
 * keyboard shortcuts, and grouping with labels and separators.
 *
 * @see [Radix UI DropdownMenu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 *
 * @see [Lasso DropdownMenu README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/dropdown-menu/README.md)
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button>Open Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Edit</DropdownMenuItem>
 *     <DropdownMenuItem>Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

/**
 * DropdownMenuPortal - Renders the dropdown content into a portal (document.body by default).
 *
 * Used internally by DropdownMenuContent, but can be used directly for custom portal behavior.
 */
function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

/**
 * DropdownMenuTrigger - The element that toggles the dropdown menu open/closed.
 *
 * Typically wraps a Button or other interactive element. Use the `asChild` prop
 * to render a custom element instead of the default button.
 *
 * @param asChild - When true, merges props onto the child element instead of rendering a button
 */
function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

/**
 * DropdownMenuContent - The container for the dropdown menu items.
 *
 * Renders inside a portal with animations for open/close states.
 * Automatically positions based on available space.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param sideOffset - Distance in pixels from the trigger (default: 4)
 * @param side - Preferred side of the trigger to render ("top" | "right" | "bottom" | "left")
 * @param align - Alignment against the trigger ("start" | "center" | "end")
 */
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-sm border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * DropdownMenuGroup - Groups related menu items together.
 *
 * Used to visually and semantically group related items. Typically used with
 * a DropdownMenuLabel above the group.
 */
function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

/**
 * DropdownMenuItem - An individual actionable item within the dropdown menu.
 *
 * Can contain icons, text, and keyboard shortcuts. Supports disabled state
 * and a destructive variant for dangerous actions like delete.
 *
 * @param className - Additional CSS classes to apply to the item
 * @param inset - If true, adds left padding to align with items that have icons
 * @param variant - Visual variant: "default" or "destructive" for dangerous actions
 * @param disabled - If true, the item is not interactive and visually dimmed
 * @param onSelect - Handler called when the item is selected (via click or keyboard)
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DropdownMenuCheckboxItem - A menu item that can be toggled on/off like a checkbox.
 *
 * Displays a checkmark indicator when checked. Useful for toggling settings
 * or selecting multiple options.
 *
 * @param className - Additional CSS classes to apply to the item
 * @param checked - Whether the item is checked (true, false, or "indeterminate")
 * @param onCheckedChange - Handler called when the checked state changes
 * @param children - The content to display in the item
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check weight="light" className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/**
 * DropdownMenuRadioGroup - A group of radio items where only one can be selected at a time.
 *
 * Wrap DropdownMenuRadioItem components to create a single-selection group.
 *
 * @param value - The currently selected value
 * @param onValueChange - Handler called when the selected value changes
 */
function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

/**
 * DropdownMenuRadioItem - A radio item within a DropdownMenuRadioGroup.
 *
 * Displays a filled circle indicator when selected. Must be used inside
 * a DropdownMenuRadioGroup.
 *
 * @param className - Additional CSS classes to apply to the item
 * @param value - The value of this radio item (used by the parent RadioGroup)
 * @param children - The content to display in the item
 */
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle weight="light" className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/**
 * DropdownMenuLabel - A non-interactive label used to describe a group of items.
 *
 * Typically placed at the top of a DropdownMenuGroup to provide context.
 *
 * @param className - Additional CSS classes to apply to the label
 * @param inset - If true, adds left padding to align with items that have icons
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DropdownMenuSeparator - A visual divider between groups of items.
 *
 * Use to visually separate different sections of the menu.
 *
 * @param className - Additional CSS classes to apply to the separator
 */
function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * DropdownMenuShortcut - Displays a keyboard shortcut hint within a menu item.
 *
 * Automatically aligns to the right side of the menu item. Used to show
 * keyboard shortcuts like "⌘K" or "Ctrl+S".
 *
 * @param className - Additional CSS classes to apply to the shortcut
 */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DropdownMenuSub - A container for a nested submenu.
 *
 * Wraps a DropdownMenuSubTrigger and DropdownMenuSubContent to create
 * a nested menu that opens on hover or keyboard navigation.
 *
 * @param open - Controlled open state
 * @param onOpenChange - Handler called when the open state changes
 * @param defaultOpen - Default open state (uncontrolled)
 */
function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

/**
 * DropdownMenuSubTrigger - The item that opens a nested submenu.
 *
 * Displays a right-pointing caret to indicate a submenu is available.
 * Opens the submenu on hover or keyboard navigation.
 *
 * @param className - Additional CSS classes to apply to the trigger
 * @param inset - If true, adds left padding to align with items that have icons
 * @param children - The content to display in the trigger
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <CaretRight weight="light" className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/**
 * DropdownMenuSubContent - The content container for a nested submenu.
 *
 * Contains the items displayed in the submenu. Opens with animations
 * when the DropdownMenuSubTrigger is activated.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param sideOffset - Distance in pixels from the trigger
 */
function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-sm border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
