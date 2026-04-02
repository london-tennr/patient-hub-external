import * as MenubarPrimitive from "@radix-ui/react-menubar";
import * as React from "react";
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
declare function Menubar({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarMenu - A single menu container within the menubar.
 *
 * Wraps the trigger and content for a single dropdown menu.
 */
declare function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarGroup - A semantic grouping for related menu items.
 *
 * Use to group related items together for accessibility purposes.
 */
declare function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarPortal - A portal for rendering menu content outside the DOM hierarchy.
 *
 * Useful for ensuring proper z-index stacking and avoiding overflow issues.
 */
declare function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarRadioGroup - A container for a group of radio items.
 *
 * Only one item within the group can be selected at a time.
 *
 * @param value - The value of the currently selected radio item
 */
declare function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarTrigger - The button that opens a menu dropdown.
 *
 * @param className - Additional CSS classes for the trigger button
 */
declare function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarContent - The dropdown panel containing menu items.
 *
 * @param align - Alignment of the content relative to the trigger (default: "start")
 * @param alignOffset - Offset from alignment edge in pixels (default: -4)
 * @param sideOffset - Distance from trigger in pixels (default: 8)
 * @param className - Additional CSS classes
 */
declare function MenubarContent({ className, align, alignOffset, sideOffset, ...props }: React.ComponentProps<typeof MenubarPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarItem - A single actionable menu item.
 *
 * @param inset - If true, adds left padding to align with items that have icons
 * @param variant - Visual variant: "default" or "destructive" for dangerous actions
 * @param className - Additional CSS classes
 */
declare function MenubarItem({ className, inset, variant, ...props }: React.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarCheckboxItem - A menu item with a checkbox for toggling options.
 *
 * @param checked - Whether the item is checked
 * @param className - Additional CSS classes
 * @param children - The label content for the checkbox item
 */
declare function MenubarCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarRadioItem - A menu item that acts as a radio button within a group.
 *
 * @param value - The value of this radio item (required)
 * @param className - Additional CSS classes
 * @param children - The label content for the radio item
 */
declare function MenubarRadioItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarLabel - A non-interactive label for grouping menu items.
 *
 * @param inset - If true, adds left padding to align with items that have icons
 * @param className - Additional CSS classes
 */
declare function MenubarLabel({ className, inset, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarSeparator - A visual divider between groups of menu items.
 *
 * @param className - Additional CSS classes
 */
declare function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarShortcut - A display element for keyboard shortcuts.
 *
 * Renders a right-aligned text element to show the keyboard shortcut for an action.
 *
 * @param className - Additional CSS classes
 */
declare function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarSub - A container for nested submenus.
 *
 * Wraps a sub-trigger and sub-content to create a nested menu structure.
 */
declare function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarSubTrigger - The trigger that opens a submenu.
 *
 * Displays a caret icon to indicate the presence of a submenu.
 *
 * @param inset - If true, adds left padding to align with items that have icons
 * @param className - Additional CSS classes
 * @param children - The label content for the sub-trigger
 */
declare function MenubarSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * MenubarSubContent - The dropdown panel for a submenu.
 *
 * @param className - Additional CSS classes
 */
declare function MenubarSubContent({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
export { Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarSeparator, MenubarLabel, MenubarItem, MenubarShortcut, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger, MenubarSubContent, };
//# sourceMappingURL=menubar.d.ts.map