import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
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
declare function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
export { Checkbox };
//# sourceMappingURL=checkbox.d.ts.map