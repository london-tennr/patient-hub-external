"use client";

import { Circle } from "@phosphor-icons/react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

import { cn } from "../utils/cn";

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
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

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
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-border text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <Circle
          weight="fill"
          className="fill-primary absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
