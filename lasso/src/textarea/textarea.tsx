import * as React from "react";

import { cn } from "../utils/cn";

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
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-sm border bg-white px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
