import { CaretDown } from "@phosphor-icons/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "../utils/cn";

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
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/**
 * AccordionItem - An individual collapsible section within an Accordion.
 *
 * @param className - Additional CSS classes to apply to the item
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  );
}

/**
 * AccordionTrigger - The clickable header that expands/collapses the accordion content.
 *
 * @param className - Additional CSS classes to apply to the trigger
 * @param children - The content to display in the trigger
 * @param showArrowByName - If true, arrow appears after the content instead of before
 * @param hideArrow - If true, hides the arrow icon completely
 */
function AccordionTrigger({
  className,
  children,
  showArrowByName = false,
  hideArrow = false,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  showArrowByName?: boolean;
  hideArrow?: boolean;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start gap-2 rounded-sm py-4 text-left text-base font-medium lasso:wght-medium leading-6 text-foreground transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {!showArrowByName && children}
        {!hideArrow && (
          <CaretDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
        )}
        {showArrowByName && children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * AccordionContent - The collapsible content that appears when the accordion item is expanded.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param children - The content to display when expanded
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm font-normal lasso:wght-normal leading-5 text-muted-foreground"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
