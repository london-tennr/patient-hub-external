import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as React from "react";
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
declare function ContextMenu({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuTrigger - The element that triggers the context menu on right-click.
 *
 * Wrap any element that should open the context menu when right-clicked.
 */
declare function ContextMenuTrigger({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuGroup - A logical grouping of menu items.
 *
 * Use to group related menu items together for organization.
 */
declare function ContextMenuGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuPortal - Renders menu content in a React portal.
 *
 * Portals the content to the body to avoid z-index and overflow issues.
 */
declare function ContextMenuPortal({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuSub - A sub-menu container for nested menus.
 *
 * Use to create nested menu structures with sub-items.
 */
declare function ContextMenuSub({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuRadioGroup - A group container for radio items.
 *
 * Use to create single-selection groups where only one item can be selected at a time.
 *
 * @param value - The selected value
 * @param onValueChange - Called when the selection changes
 */
declare function ContextMenuRadioGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuSubTrigger - The item that opens a sub-menu.
 *
 * Displays an arrow indicator and opens the sub-menu on hover or keyboard navigation.
 *
 * @param className - Additional CSS classes to apply
 * @param inset - Add left padding to align with checkbox/radio items
 * @param children - The content to display in the trigger
 */
declare function ContextMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuSubContent - The content container for a sub-menu.
 *
 * Contains the items displayed within a sub-menu.
 *
 * @param className - Additional CSS classes to apply
 */
declare function ContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuContent - The container for menu items that appears when triggered.
 *
 * Renders inside a portal and contains all the menu items.
 *
 * @param className - Additional CSS classes to apply
 */
declare function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuItem - An individual selectable item within the menu.
 *
 * @param className - Additional CSS classes to apply
 * @param inset - Add left padding to align with checkbox/radio items
 * @param variant - Visual variant: "default" or "destructive" for dangerous actions
 */
declare function ContextMenuItem({ className, inset, variant, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuCheckboxItem - A menu item that can be toggled on/off with a checkbox.
 *
 * @param className - Additional CSS classes to apply
 * @param children - The content to display in the item
 * @param checked - Whether the checkbox is checked
 */
declare function ContextMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuRadioItem - A menu item that works as part of a radio group.
 *
 * Only one radio item can be selected within a ContextMenuRadioGroup.
 *
 * @param className - Additional CSS classes to apply
 * @param children - The content to display in the item
 */
declare function ContextMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuLabel - A non-interactive label for grouping menu items.
 *
 * @param className - Additional CSS classes to apply
 * @param inset - Add left padding to align with checkbox/radio items
 */
declare function ContextMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuSeparator - A visual divider between menu sections.
 *
 * @param className - Additional CSS classes to apply
 */
declare function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
/**
 * ContextMenuShortcut - A hint displaying keyboard shortcuts for menu items.
 *
 * Renders as muted text aligned to the right of the menu item.
 *
 * @param className - Additional CSS classes to apply
 */
declare function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup, };
//# sourceMappingURL=context-menu.d.ts.map