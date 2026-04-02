import * as React from "react";

import { cn } from "../utils/cn";

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
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const types = ["text", "email", "password", "tel", "time", "url"];
  const focusToEnd = (e: React.FocusEvent<HTMLInputElement>) => {
    const el = e.target;
    if (type !== "number") {
      el.selectionStart = el.value.length;
    }
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-neutral-600 lasso:selection:bg-brand-peat selection:text-primary-foreground bg-white border-border flex h-9 w-full min-w-0 rounded-sm border px-3 py-1 text-sm font-normal lasso:wght-normal leading-5 transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
      onFocus={(e) => {
        if (types.includes(type || "")) {
          focusToEnd(e);
        }
        if (props.onFocus) {
          props.onFocus(e);
        }
      }}
    />
  );
}

export { Input };
