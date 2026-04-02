import * as React from "react";
/**
 * Input Component
 *
 * A styled text input field for collecting user input in forms and interactive interfaces.
 * Provides consistent styling, accessibility features, and enhanced focus behavior.
 * Supports various input types including text, email, password, tel, time, url, number, and file.
 *
 * The component includes smart cursor positioning that automatically moves the cursor
 * to the end of existing text when the input receives focus (for text-like input types).
 *
 * @see [Lasso Input README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/input/README.md)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * // With type and label
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" placeholder="you@example.com" />
 *
 * // Controlled input
 * <Input value={value} onChange={(e) => setValue(e.target.value)} />
 *
 * // With validation state
 * <Input aria-invalid={hasError} />
 * ```
 *
 * @param className - Additional CSS classes to apply to the input
 * @param type - The input type (text, email, password, tel, time, url, number, file, etc.)
 * @param props - All standard HTML input attributes are supported
 */
declare function Input({ className, type, ...props }: React.ComponentProps<"input">): import("react/jsx-runtime").JSX.Element;
export { Input };
//# sourceMappingURL=input.d.ts.map