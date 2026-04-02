import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretRight, Check, Circle } from "@phosphor-icons/react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../utils/cn";
/**
 * Menubar Component
 *
 * A horizontal menu bar that organizes commands and options into dropdown menus,
 * similar to the menu bars found in desktop applications. Built on top of Radix UI's
 * Menubar primitive with consistent styling for the Tennr design system.
 *
 * @see [Radix UI Menubar](https://www.radix-ui.com/primitives/docs/components/menubar)
 *
 * @see [Lasso Menubar README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/menubar/README.md)
 *
 * @param className - Additional CSS classes for the menubar container
 */
function Menubar({ className, ...props }) {
    return (_jsx(MenubarPrimitive.Root, { "data-slot": "menubar", className: cn("bg-background flex h-9 items-center gap-1 rounded-sm border p-1 shadow-xs", className), ...props }));
}
/**
 * MenubarMenu - A single menu container within the menubar.
 *
 * Wraps the trigger and content for a single dropdown menu.
 */
function MenubarMenu({ ...props }) {
    return _jsx(MenubarPrimitive.Menu, { "data-slot": "menubar-menu", ...props });
}
/**
 * MenubarGroup - A semantic grouping for related menu items.
 *
 * Use to group related items together for accessibility purposes.
 */
function MenubarGroup({ ...props }) {
    return _jsx(MenubarPrimitive.Group, { "data-slot": "menubar-group", ...props });
}
/**
 * MenubarPortal - A portal for rendering menu content outside the DOM hierarchy.
 *
 * Useful for ensuring proper z-index stacking and avoiding overflow issues.
 */
function MenubarPortal({ ...props }) {
    return _jsx(MenubarPrimitive.Portal, { "data-slot": "menubar-portal", ...props });
}
/**
 * MenubarRadioGroup - A container for a group of radio items.
 *
 * Only one item within the group can be selected at a time.
 *
 * @param value - The value of the currently selected radio item
 */
function MenubarRadioGroup({ ...props }) {
    return (_jsx(MenubarPrimitive.RadioGroup, { "data-slot": "menubar-radio-group", ...props }));
}
/**
 * MenubarTrigger - The button that opens a menu dropdown.
 *
 * @param className - Additional CSS classes for the trigger button
 */
function MenubarTrigger({ className, ...props }) {
    return (_jsx(MenubarPrimitive.Trigger, { "data-slot": "menubar-trigger", className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none", className), ...props }));
}
/**
 * MenubarContent - The dropdown panel containing menu items.
 *
 * @param align - Alignment of the content relative to the trigger (default: "start")
 * @param alignOffset - Offset from alignment edge in pixels (default: -4)
 * @param sideOffset - Distance from trigger in pixels (default: 8)
 * @param className - Additional CSS classes
 */
function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }) {
    return (_jsx(MenubarPortal, { children: _jsx(MenubarPrimitive.Content, { "data-slot": "menubar-content", align: align, alignOffset: alignOffset, sideOffset: sideOffset, className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-sm border p-1 shadow-md", className), ...props }) }));
}
/**
 * MenubarItem - A single actionable menu item.
 *
 * @param inset - If true, adds left padding to align with items that have icons
 * @param variant - Visual variant: "default" or "destructive" for dangerous actions
 * @param className - Additional CSS classes
 */
function MenubarItem({ className, inset, variant = "default", ...props }) {
    return (_jsx(MenubarPrimitive.Item, { "data-slot": "menubar-item", "data-inset": inset, "data-variant": variant, className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className), ...props }));
}
/**
 * MenubarCheckboxItem - A menu item with a checkbox for toggling options.
 *
 * @param checked - Whether the item is checked
 * @param className - Additional CSS classes
 * @param children - The label content for the checkbox item
 */
function MenubarCheckboxItem({ className, children, checked, ...props }) {
    return (_jsxs(MenubarPrimitive.CheckboxItem, { "data-slot": "menubar-checkbox-item", className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className), checked: checked, ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: _jsx(MenubarPrimitive.ItemIndicator, { children: _jsx(Check, { weight: "light", className: "size-4" }) }) }), children] }));
}
/**
 * MenubarRadioItem - A menu item that acts as a radio button within a group.
 *
 * @param value - The value of this radio item (required)
 * @param className - Additional CSS classes
 * @param children - The label content for the radio item
 */
function MenubarRadioItem({ className, children, ...props }) {
    return (_jsxs(MenubarPrimitive.RadioItem, { "data-slot": "menubar-radio-item", className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: _jsx(MenubarPrimitive.ItemIndicator, { children: _jsx(Circle, { weight: "light", className: "size-2 fill-current" }) }) }), children] }));
}
/**
 * MenubarLabel - A non-interactive label for grouping menu items.
 *
 * @param inset - If true, adds left padding to align with items that have icons
 * @param className - Additional CSS classes
 */
function MenubarLabel({ className, inset, ...props }) {
    return (_jsx(MenubarPrimitive.Label, { "data-slot": "menubar-label", "data-inset": inset, className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className), ...props }));
}
/**
 * MenubarSeparator - A visual divider between groups of menu items.
 *
 * @param className - Additional CSS classes
 */
function MenubarSeparator({ className, ...props }) {
    return (_jsx(MenubarPrimitive.Separator, { "data-slot": "menubar-separator", className: cn("bg-border -mx-1 my-1 h-px", className), ...props }));
}
/**
 * MenubarShortcut - A display element for keyboard shortcuts.
 *
 * Renders a right-aligned text element to show the keyboard shortcut for an action.
 *
 * @param className - Additional CSS classes
 */
function MenubarShortcut({ className, ...props }) {
    return (_jsx("span", { "data-slot": "menubar-shortcut", className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className), ...props }));
}
/**
 * MenubarSub - A container for nested submenus.
 *
 * Wraps a sub-trigger and sub-content to create a nested menu structure.
 */
function MenubarSub({ ...props }) {
    return _jsx(MenubarPrimitive.Sub, { "data-slot": "menubar-sub", ...props });
}
/**
 * MenubarSubTrigger - The trigger that opens a submenu.
 *
 * Displays a caret icon to indicate the presence of a submenu.
 *
 * @param inset - If true, adds left padding to align with items that have icons
 * @param className - Additional CSS classes
 * @param children - The label content for the sub-trigger
 */
function MenubarSubTrigger({ className, inset, children, ...props }) {
    return (_jsxs(MenubarPrimitive.SubTrigger, { "data-slot": "menubar-sub-trigger", "data-inset": inset, className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8", className), ...props, children: [children, _jsx(CaretRight, { weight: "light", className: "ml-auto h-4 w-4" })] }));
}
/**
 * MenubarSubContent - The dropdown panel for a submenu.
 *
 * @param className - Additional CSS classes
 */
function MenubarSubContent({ className, ...props }) {
    return (_jsx(MenubarPrimitive.SubContent, { "data-slot": "menubar-sub-content", className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-sm border p-1 shadow-lg", className), ...props }));
}
export { Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarSeparator, MenubarLabel, MenubarItem, MenubarShortcut, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger, MenubarSubContent, };
