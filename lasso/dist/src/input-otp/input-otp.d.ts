import { OTPInput } from "input-otp";
import * as React from "react";
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
declare function InputOTP({ className, containerClassName, ...props }: React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * InputOTPGroup - Groups multiple OTP slots together visually.
 *
 * Use this to create logical groupings of slots, typically separated by
 * InputOTPSeparator components (e.g., 3-3 grouping for a 6-digit code).
 *
 * @param className - Additional CSS classes to apply to the group container
 */
declare function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
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
declare function InputOTPSlot({ index, className, ...props }: React.ComponentProps<"div"> & {
    index: number;
}): import("react/jsx-runtime").JSX.Element;
/**
 * InputOTPSeparator - A visual separator between OTP slot groups.
 *
 * Renders a dash (Minus icon) by default to visually separate groups of slots,
 * improving readability for longer codes (e.g., separating a 6-digit code into
 * two groups of 3).
 */
declare function InputOTPSeparator({ ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
//# sourceMappingURL=input-otp.d.ts.map