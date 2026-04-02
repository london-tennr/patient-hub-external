import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";
/**
 * DropdownMenu Component
 *
 * A versatile menu component for displaying a list of actions or options triggered
 * by a button. Supports submenus, checkbox items, radio groups, keyboard shortcuts,
 * and custom styling. Built on top of Radix UI's Dropdown Menu primitive with
 * consistent styling for the Tennr design system.
 *
 * @see [Radix UI Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
 *
 * @see [Lasso Dropdown README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/dropdown/README.md)
 */
declare function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuPortal - A portal for rendering the dropdown menu content outside the DOM hierarchy.
 *
 * Useful for avoiding z-index and overflow issues.
 */
declare function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuTrigger - The button that toggles the dropdown menu.
 *
 * @param className - Additional CSS classes to apply to the trigger (styled as outline button by default)
 */
declare function DropdownMenuTrigger({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuContent - The container for the dropdown items that appears when triggered.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param sideOffset - Distance from the trigger (default: 4)
 */
declare function DropdownMenuContent({ className, sideOffset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuGroup - A grouping container for related menu items.
 */
declare function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuItem - A selectable item in the dropdown menu.
 *
 * @param className - Additional CSS classes to apply to the item
 * @param inset - If true, adds left padding for alignment with items that have icons
 * @param variant - Visual variant: "default" or "destructive" for dangerous actions
 */
declare function DropdownMenuItem({ className, inset, variant, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuCheckboxItem - A menu item that can be toggled on/off with a checkbox.
 *
 * @param className - Additional CSS classes to apply to the item
 * @param children - The content to display in the item
 * @param checked - Whether the item is currently checked
 */
declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuRadioGroup - A container for mutually exclusive radio items.
 */
declare function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuRadioItem - A selectable item within a radio group.
 *
 * @param className - Additional CSS classes to apply to the item
 * @param children - The content to display in the item
 */
declare function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuLabel - A non-interactive label for grouping sections in the menu.
 *
 * @param className - Additional CSS classes to apply to the label
 * @param inset - If true, adds left padding for alignment with items
 */
declare function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuSeparator - A visual divider between groups of items.
 *
 * @param className - Additional CSS classes to apply to the separator
 */
declare function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuShortcut - A hint for keyboard shortcuts displayed alongside menu items.
 *
 * @param className - Additional CSS classes to apply to the shortcut text
 */
declare function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuSub - A container for a nested submenu.
 */
declare function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuSubTrigger - The item that triggers a submenu when hovered or focused.
 *
 * @param className - Additional CSS classes to apply to the trigger
 * @param inset - If true, adds left padding for alignment with items
 * @param children - The content to display in the trigger
 */
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * DropdownMenuSubContent - The content container for a nested submenu.
 *
 * @param className - Additional CSS classes to apply to the submenu content
 */
declare function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };
//# sourceMappingURL=dropdown.d.ts.map