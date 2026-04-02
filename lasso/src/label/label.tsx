"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Label Component
 *
 * An accessible label element for form controls and interactive UI elements.
 * Built on top of Radix UI's Label primitive, it provides automatic association
 * with form elements using the `htmlFor` attribute and includes accessibility
 * features out of the box. The component also supports disabled states via
 * CSS peer/group selectors.
 *
 * @see [Radix UI Label](https://www.radix-ui.com/primitives/docs/components/label)
 *
 * @see [Lasso Label README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/label/README.md)
 *
 * @param className - Additional CSS classes to apply to the label
 * @param children - The content to display within the label
 * @param htmlFor - The id of the form element this label is associated with
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 * ```
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
