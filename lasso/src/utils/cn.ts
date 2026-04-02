import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with intelligent Tailwind CSS conflict resolution.
 *
 * Combines the power of `clsx` for conditional class name construction with
 * `tailwind-merge` for automatic Tailwind CSS class conflict resolution.
 * This ensures that later classes properly override earlier conflicting classes
 * (e.g., `cn("p-2", "p-4")` returns `"p-4"`, not `"p-2 p-4"`).
 *
 * @param inputs - Any number of class name inputs. Accepts:
 *   - `string` - Class name string (e.g., `"px-4 py-2"`)
 *   - `string[]` - Array of class names (e.g., `["px-4", "py-2"]`)
 *   - `Record<string, boolean | undefined>` - Object with conditional classes
 *     (e.g., `{ "bg-red-500": hasError }`)
 *   - `undefined | null | false` - Falsy values are ignored
 *
 * @returns Merged class names string with Tailwind conflicts resolved
 *
 * @example
 * // Basic usage - merging strings
 * cn("px-4 py-2", "bg-blue-500")
 * // → "px-4 py-2 bg-blue-500"
 *
 * @example
 * // Conflict resolution - later classes win
 * cn("px-4 py-2", "px-8")
 * // → "py-2 px-8"
 *
 * @example
 * // Conditional classes
 * cn("base-class", isActive && "active-class")
 * // → "base-class active-class" (if isActive is true)
 *
 * @example
 * // Object syntax for conditionals
 * cn("border", { "border-red-500": hasError, "border-green-500": isValid })
 *
 * @example
 * // Component pattern - forwarding className prop
 * function Button({ className, ...props }) {
 *   return (
 *     <button className={cn("px-4 py-2 bg-primary", className)} {...props} />
 *   );
 * }
 *
 * @see [clsx](https://github.com/lukeed/clsx) - Conditional class name utility
 * @see [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Tailwind class conflict resolver
 * @see [Lasso Utils README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/utils/README.md)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
