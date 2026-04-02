import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
/**
 * Accordion Component
 *
 * A vertically stacked set of collapsible content sections. Each section contains
 * a trigger (header) that users can click to expand or collapse the associated content.
 * Built on top of Radix UI's Accordion primitive with consistent styling for the
 * Tennr design system.
 *
 * @see [Radix UI Accordion](https://github.com/radix-ui/primitives/blob/main/packages/react/accordion/src/accordion.tsx)
 *
 * @see [Lasso Accordion README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/accordion/README.md)
 *
 */
declare function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * AccordionItem - An individual collapsible section within an Accordion.
 *
 * @param className - Additional CSS classes to apply to the item
 */
declare function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
/**
 * AccordionTrigger - The clickable header that expands/collapses the accordion content.
 *
 * @param className - Additional CSS classes to apply to the trigger
 * @param children - The content to display in the trigger
 * @param showArrowByName - If true, arrow appears after the content instead of before
 * @param hideArrow - If true, hides the arrow icon completely
 */
declare function AccordionTrigger({ className, children, showArrowByName, hideArrow, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
    showArrowByName?: boolean;
    hideArrow?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * AccordionContent - The collapsible content that appears when the accordion item is expanded.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param children - The content to display when expanded
 */
declare function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
//# sourceMappingURL=accordion.d.ts.map