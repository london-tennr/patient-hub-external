# InputOTP Component

## Overview

The InputOTP component is a specialized input field designed for one-time password (OTP) and verification code entry. It provides a segmented input experience where users can enter each digit/character in a separate slot. Built on top of the `input-otp` library, it provides an accessible, mobile-friendly implementation with consistent styling for the Tennr design system.

## What It Is

The InputOTP component consists of four sub-components that work together:

- **InputOTP** (root): The container that manages the OTP input state and behavior
- **InputOTPGroup**: Groups multiple slots together visually (e.g., for 3-digit groupings)
- **InputOTPSlot**: An individual input slot that displays a single character
- **InputOTPSeparator**: A visual separator between slot groups (displays a dash by default)

### Key Features

- **Accessible**: Built with accessibility in mind, supporting screen readers and keyboard navigation
- **Auto-focus**: Automatically focuses the next slot as characters are entered
- **Paste Support**: Handles paste operations, distributing characters across slots
- **Mobile-friendly**: Optimized for mobile number input with appropriate keyboard types
- **Visual Feedback**: Shows active state with ring focus indicators
- **Flexible Layout**: Supports various slot groupings and separators
- **Backspace Handling**: Properly handles backspace navigation between slots

## When to Use

Use the InputOTP component when you need to:

1. **Authentication Codes**: Collect verification codes sent via SMS or email

   - Two-factor authentication (2FA) codes
   - Email verification codes
   - Phone number verification
   - Account recovery codes

2. **Security PINs**: Capture numeric security codes

   - PIN entry for secure actions
   - Unlock codes
   - Parental control PINs
   - Transaction authorization codes

3. **Verification Flows**: Any scenario requiring segmented code entry

   - Invitation codes
   - License keys (when segmented)
   - Short confirmation codes
   - Access codes

4. **Enhanced UX**: When visual segmentation improves user experience

   - Credit card CVV entry (in some designs)
   - Postal code entry (in some regions)
   - Any fixed-length code where per-character entry improves accuracy

## When NOT to Use

Avoid using the InputOTP component when:

1. **Variable Length Input**: The input length is not fixed

   - Free-form text fields (use a TextInput)
   - Search fields (use a SearchInput)
   - Comments or messages (use a Textarea)

2. **Long Codes**: The code is too long for comfortable slot-by-slot entry

   - License keys longer than 8-10 characters (use a regular Input with formatting)
   - Serial numbers (use a regular Input)
   - Long alphanumeric codes (use a regular Input with validation)

3. **Non-Code Input**: The data isn't naturally segmented

   - Names, emails, addresses (use appropriate Input types)
   - Passwords (use a PasswordInput)
   - Phone numbers (use a PhoneInput with formatting)

4. **Rapid Sequential Entry Not Needed**: When users don't benefit from auto-advance

   - Settings where users may edit mid-entry frequently
   - Forms where users copy-paste entire values routinely

5. **Limited Space**: When there isn't enough horizontal space for all slots

   - Very narrow mobile layouts with 6+ digit codes
   - Dense form layouts (consider a compact Input alternative)

## Usage Example

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@tennr/lasso/input-otp";

function VerificationForm() {
  const [value, setValue] = React.useState("");

  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
```

### Example with 4-Digit PIN

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@tennr/lasso/input-otp";

function PinEntry() {
  return (
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}
```

### Example with Controlled Value and Completion Handler

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@tennr/lasso/input-otp";

function OTPVerification() {
  const [value, setValue] = React.useState("");

  const handleComplete = (otp: string) => {
    // Submit OTP for verification
    verifyOTP(otp);
  };

  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={setValue}
      onComplete={handleComplete}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
```

## Props Reference

### InputOTP

Extends all props from the underlying `input-otp` library's OTPInput component:

- `maxLength`: `number` - **Required**. The total number of characters/slots
- `value`: `string` - Controlled value of the input
- `onChange`: `(value: string) => void` - Handler called when the value changes
- `onComplete`: `(value: string) => void` - Handler called when all slots are filled
- `disabled`: `boolean` - Whether the input is disabled
- `className`: `string` - Additional CSS classes for the hidden input element
- `containerClassName`: `string` - Additional CSS classes for the container element

### InputOTPGroup

- `className`: `string` - Additional CSS classes for the group container

### InputOTPSlot

- `index`: `number` - **Required**. The zero-based index of this slot (must match position in the OTP)
- `className`: `string` - Additional CSS classes for the slot

### InputOTPSeparator

- Accepts all standard `div` props
- Renders a dash (Minus icon) by default between groups

## Slot States

Each slot can be in different visual states:

- **Default**: Standard border styling
- **Active**: Highlighted with ring focus indicator when the slot is focused
- **Filled**: Displays the entered character
- **With Caret**: Shows a blinking caret when active and empty

## Accessibility

The InputOTP component includes accessibility features:

- Proper ARIA attributes for screen reader support
- Keyboard navigation between slots (Arrow keys, Tab)
- Backspace properly moves to previous slot
- Paste handling distributes characters correctly
- Focus management ensures logical tab order
- Visual focus indicators meet contrast requirements

## Browser & Mobile Support

- Works across all modern browsers
- Mobile keyboards show numeric input type when appropriate
- Touch-friendly slot sizes for easy tapping
- Paste from clipboard supported on mobile

## Related Components

- For general text input, use the `Input` component
- For password entry, use the `PasswordInput` component
- For phone numbers, use a dedicated phone input with formatting
- For longer codes, consider a standard `Input` with masking/formatting
