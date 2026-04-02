import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
/**
 * Select Component
 *
 * A dropdown picker that allows users to choose one option from a predefined list.
 * Provides a trigger button that opens a floating list of options with built-in
 * keyboard navigation and accessibility support. Built on top of Radix UI's Select
 * primitive with consistent styling for the Tennr design system.
 *
 * @see [Radix UI Select](https://github.com/radix-ui/primitives/blob/main/packages/react/select/src/select.tsx)
 *
 * @see [Lasso Select README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/select/README.md)
 */
declare function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * SelectGroup - A grouping container for organizing related select items.
 *
 * Use this to group related options together with an optional label.
 */
declare function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
/**
 * SelectValue - Displays the selected value or placeholder in the trigger.
 *
 * @param placeholder - Text to display when no value is selected
 */
declare function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>): import("react/jsx-runtime").JSX.Element;
/**
 * SelectTrigger - The button that opens the dropdown and displays the selected value.
 *
 * @param className - Additional CSS classes to apply to the trigger
 * @param size - Size variant: "sm" for small, "default" for standard size
 * @param children - Typically contains a SelectValue component
 */
declare function SelectTrigger({ className, size, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
}): import("react/jsx-runtime").JSX.Element;
/**
 * SelectContent - The floating container that holds the list of options.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param position - Positioning mode: "popper" (default) or "item-aligned"
 * @param children - SelectItem, SelectGroup, SelectLabel, or SelectSeparator components
 */
declare function SelectContent({ className, children, position, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
/**
 * SelectLabel - A label for a group of select items.
 *
 * @param className - Additional CSS classes to apply to the label
 */
declare function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>): import("react/jsx-runtime").JSX.Element;
/**
 * SelectItem - An individual selectable option within the dropdown.
 *
 * @param value - Unique value for the item (required)
 * @param className - Additional CSS classes to apply to the item
 * @param disabled - Whether the item is disabled and cannot be selected
 * @param children - The content to display for this option
 */
declare function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
/**
 * SelectSeparator - A visual divider between items or groups.
 *
 * @param className - Additional CSS classes to apply to the separator
 */
declare function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
/**
 * SelectScrollUpButton - A button to scroll up in long option lists.
 *
 * Appears automatically when the content is scrollable.
 *
 * @param className - Additional CSS classes to apply to the button
 */
declare function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): import("react/jsx-runtime").JSX.Element;
/**
 * SelectScrollDownButton - A button to scroll down in long option lists.
 *
 * Appears automatically when the content is scrollable.
 *
 * @param className - Additional CSS classes to apply to the button
 */
declare function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>): import("react/jsx-runtime").JSX.Element;
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, };
//# sourceMappingURL=select.d.ts.map