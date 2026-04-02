"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * Switch Component
 *
 * A toggle control that allows users to turn a setting on or off. It provides a
 * binary choice similar to a checkbox but with a more visual, sliding toggle
 * interaction. Built on top of Radix UI's Switch primitive with consistent styling
 * for the Tennr design system.
 *
 * @see [Radix UI Switch](https://github.com/radix-ui/primitives/blob/main/packages/react/switch/src/switch.tsx)
 *
 * @see [Lasso Switch README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/switch/README.md)
 *
 * @example
 * ```tsx
 * <Switch id="airplane-mode" />
 * ```
 *
 * @example Controlled usage
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * ```
 *
 * @param className - Additional CSS classes to apply to the switch root element
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-brand-peat data-[state=unchecked]:bg-muted-foreground/50 focus-visible:ring-ring/50 inline-flex h-5 w-9 px-0.5 shrink-0 items-center rounded-full border-0 shadow-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white pointer-events-none block size-4 rounded-full shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
