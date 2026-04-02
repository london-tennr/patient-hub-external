import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";
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
declare function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuPortal - Renders the dropdown content into a portal (document.body by default).
 *
 * Used internally by DropdownMenuContent, but can be used directly for custom portal behavior.
 */
declare function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuTrigger - The element that toggles the dropdown menu open/closed.
 *
 * Typically wraps a Button or other interactive element. Use the `asChild` prop
 * to render a custom element instead of the default button.
 *
 * @param asChild - When true, merges props onto the child element instead of rendering a button
 */
declare function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
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
declare function DropdownMenuContent({ className, sideOffset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuGroup - Groups related menu items together.
 *
 * Used to visually and semantically group related items. Typically used with
 * a DropdownMenuLabel above the group.
 */
declare function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
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
declare function DropdownMenuItem({ className, inset, variant, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): import("react/jsx-runtime").JSX.Element;
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
declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuRadioGroup - A group of radio items where only one can be selected at a time.
 *
 * Wrap DropdownMenuRadioItem components to create a single-selection group.
 *
 * @param value - The currently selected value
 * @param onValueChange - Handler called when the selected value changes
 */
declare function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
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
declare function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuLabel - A non-interactive label used to describe a group of items.
 *
 * Typically placed at the top of a DropdownMenuGroup to provide context.
 *
 * @param className - Additional CSS classes to apply to the label
 * @param inset - If true, adds left padding to align with items that have icons
 */
declare function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuSeparator - A visual divider between groups of items.
 *
 * Use to visually separate different sections of the menu.
 *
 * @param className - Additional CSS classes to apply to the separator
 */
declare function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuShortcut - Displays a keyboard shortcut hint within a menu item.
 *
 * Automatically aligns to the right side of the menu item. Used to show
 * keyboard shortcuts like "⌘K" or "Ctrl+S".
 *
 * @param className - Additional CSS classes to apply to the shortcut
 */
declare function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
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
declare function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>): import("react/jsx-runtime").JSX.Element;
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
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuSubContent - The content container for a nested submenu.
 *
 * Contains the items displayed in the submenu. Opens with animations
 * when the DropdownMenuSubTrigger is activated.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param sideOffset - Distance in pixels from the trigger
 */
declare function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };
//# sourceMappingURL=dropdown-menu.d.ts.map