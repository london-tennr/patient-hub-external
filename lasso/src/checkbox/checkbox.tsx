"use client";

import { Check } from "@phosphor-icons/react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Checkbox Component
 *
 * A styled toggle control that allows users to select or deselect an option.
 * Built on top of Radix UI's Checkbox primitive with consistent styling for the
 * Tennr design system. Supports controlled and uncontrolled modes, indeterminate
 * state, and full accessibility features.
 *
 * @see [Radix UI Checkbox](https://github.com/radix-ui/primitives/blob/main/packages/react/checkbox/src/checkbox.tsx)
 *
 * @see [Lasso Checkbox README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/checkbox/README.md)
 *
 * @param className - Additional CSS classes to apply to the checkbox
 * @param checked - Controlled checked state (`boolean | "indeterminate"`)
 * @param defaultChecked - Initial checked state for uncontrolled usage
 * @param onCheckedChange - Callback when checked state changes
 * @param disabled - When true, prevents user interaction
 * @param required - When true, indicates the checkbox must be checked for form submission
 * @param name - The name of the checkbox for form submission
 * @param value - The value of the checkbox for form submission
 * @param id - The id attribute, useful for associating with a label
 *
 * @example
 * ```tsx
 * <div className="flex items-center space-x-2">
 *   <Checkbox id="terms" />
 *   <label htmlFor="terms">Accept terms and conditions</label>
 * </div>
 * ```
 *
 * @example
 * // Controlled usage
 * const [checked, setChecked] = useState(false);
 * <Checkbox
 *   checked={checked}
 *   onCheckedChange={(checked) => setChecked(checked as boolean)}
 * />
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer bg-background border-border data-[state=checked]:bg-brand-peat data-[state=checked]:text-primary-foreground data-[state=checked]:border-brand-peat focus-visible:border-brand-peat focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-sm border shadow-xs transition-all outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 hover:border-border",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <Check className="size-3.5 text-current" weight="light" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
