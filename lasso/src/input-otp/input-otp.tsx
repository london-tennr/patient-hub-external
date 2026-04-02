import { Minus } from "@phosphor-icons/react";
import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";

import { cn } from "../utils/cn";

/**
 * InputOTP Component
 *
 * A specialized input component for one-time password (OTP) and verification code entry.
 * Provides a segmented input experience where users can enter each digit/character in
 * a separate slot with auto-focus navigation. Built on top of the `input-otp` library
 * with consistent styling for the Tennr design system.
 *
 * @see [input-otp library](https://github.com/guilhermerodz/input-otp)
 *
 * @see [Lasso InputOTP README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/input-otp/README.md)
 *
 * @param className - Additional CSS classes for the hidden input element
 * @param containerClassName - Additional CSS classes for the container element
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

/**
 * InputOTPGroup - Groups multiple OTP slots together visually.
 *
 * Use this to create logical groupings of slots, typically separated by
 * InputOTPSeparator components (e.g., 3-3 grouping for a 6-digit code).
 *
 * @param className - Additional CSS classes to apply to the group container
 */
function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

/**
 * InputOTPSlot - An individual input slot that displays a single character.
 *
 * Each slot represents one position in the OTP code and displays visual feedback
 * including active state highlighting, the entered character, and a blinking
 * caret when focused and empty.
 *
 * @param index - The zero-based index of this slot (must match its position in the OTP sequence)
 * @param className - Additional CSS classes to apply to the slot
 */
function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-border relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

/**
 * InputOTPSeparator - A visual separator between OTP slot groups.
 *
 * Renders a dash (Minus icon) by default to visually separate groups of slots,
 * improving readability for longer codes (e.g., separating a 6-digit code into
 * two groups of 3).
 */
function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Minus weight="light" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
