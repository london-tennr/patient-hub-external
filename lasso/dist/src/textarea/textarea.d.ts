import * as React from "react";
/**
 * Textarea Component
 *
 * A multi-line text input field for collecting longer-form text from users.
 * Provides consistent design system styling including borders, focus rings,
 * validation states, and responsive typography. Built as a styled wrapper
 * around the native HTML textarea element.
 *
 * @see [MDN Textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
 *
 * @see [Lasso Textarea README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/textarea/README.md)
 *
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="Enter your message"
 *   rows={4}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With validation error state
 * <Textarea
 *   placeholder="Required field"
 *   aria-invalid={hasError}
 * />
 * ```
 *
 * @param className - Additional CSS classes to apply to the textarea
 * @param props - All standard HTML textarea attributes are supported
 */
declare function Textarea({ className, ...props }: React.ComponentProps<"textarea">): import("react/jsx-runtime").JSX.Element;
export { Textarea };
//# sourceMappingURL=textarea.d.ts.map