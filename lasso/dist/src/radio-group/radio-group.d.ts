import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
/**
 * RadioGroup Component
 *
 * A set of checkable buttons—known as radio buttons—where only one button
 * can be checked at a time. Built on top of Radix UI's RadioGroup primitive
 * with consistent styling for the Tennr design system.
 *
 * @see [Radix UI Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group)
 *
 * @see [Lasso RadioGroup README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/radio-group/README.md)
 *
 * @param className - Additional CSS classes to apply to the radio group container
 */
declare function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * RadioGroupItem - An individual radio button within a RadioGroup.
 *
 * Must be used as a child of RadioGroup. Each item represents a single
 * selectable option. When selected, displays a filled circle indicator.
 *
 * @param className - Additional CSS classes to apply to the radio button
 * @param value - The unique value for this radio item (required)
 * @param id - HTML id attribute, useful for associating with a label
 * @param disabled - Whether the radio button is disabled
 */
declare function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
export { RadioGroup, RadioGroupItem };
//# sourceMappingURL=radio-group.d.ts.map