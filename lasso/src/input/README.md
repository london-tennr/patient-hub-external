# Input Component

## Overview

The Input component is a styled text input field designed for collecting user input in forms and interactive interfaces. It provides consistent styling, accessibility features, and enhanced focus behavior for the Tennr design system. The component supports various input types and includes smart cursor positioning on focus.

## What It Is

The Input component is a single, self-contained form control that:

- **Wraps Native Input**: Extends the native HTML `<input>` element with consistent styling
- **Provides Visual Feedback**: Includes focus states, validation states, and disabled styling
- **Enhances User Experience**: Automatically positions cursor at the end of text on focus for text-like inputs
- **Supports Multiple Types**: Works with text, email, password, tel, time, url, number, and file inputs

### Key Features

- **Accessible**: Supports ARIA attributes for validation states and screen reader compatibility
- **Focus Enhancement**: Smart cursor positioning at end of text for better editing experience
- **Validation States**: Built-in styling for invalid states using `aria-invalid`
- **File Upload Support**: Styled file input support with proper text formatting
- **Customizable**: Accepts className props for styling customization
- **Responsive**: Full-width by default with minimum width handling

## When to Use

Use the Input component when you need to:

1. **Collect Text Data**: Gather user-provided text information

   - Names and usernames
   - Search queries
   - Short text entries
   - Single-line comments

2. **Capture Specific Data Types**: Collect formatted or validated input

   - Email addresses (type="email")
   - Passwords (type="password")
   - Phone numbers (type="tel")
   - URLs (type="url")
   - Times (type="time")
   - Numbers (type="number")

3. **File Selection**: Allow users to select files for upload

   - Document uploads
   - Image selection
   - File attachments

4. **Form Fields**: As part of larger form structures

   - Login forms
   - Registration forms
   - Settings panels
   - Search interfaces
   - Filter inputs

5. **Quick Data Entry**: Single-field data collection

   - Inline editing
   - Quick add functionality
   - Search bars
   - Command inputs

## When NOT to Use

Avoid using the Input component when:

1. **Multi-line Text**: You need to collect longer, multi-line text

   - Comments or feedback (use Textarea)
   - Descriptions (use Textarea)
   - Notes or messages (use Textarea)
   - Rich text content (use a rich text editor)

2. **Selection from Options**: Users need to choose from predefined options

   - Dropdown selections (use Select)
   - Multiple choice (use Checkbox or RadioGroup)
   - Autocomplete suggestions (use Combobox)
   - Tag selection (use a Tag Input or Multi-select)

3. **Date/Time Selection**: Users need to pick dates or complex time values

   - Calendar dates (use DatePicker or Calendar)
   - Date ranges (use DateRangePicker)
   - Complex time inputs (use a specialized TimePicker)

4. **Structured Data**: Input requires specific formatting or validation UI

   - OTP/verification codes (use InputOTP)
   - Phone numbers with formatting (use a specialized PhoneInput)
   - Credit card numbers (use a masked input component)
   - Currency amounts (use a specialized CurrencyInput)

5. **Boolean Values**: You need yes/no or on/off input

   - Toggles (use Switch)
   - Checkboxes (use Checkbox)
   - Radio buttons (use RadioGroup)

6. **Complex Interactions**: The input requires special UI affordances

   - Range selection (use Slider)
   - Color picking (use a ColorPicker)
   - Rating input (use a Rating component)

## Usage Example

```tsx
import { Input } from "@tennr/lasso/input";

function MyComponent() {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter your name" />
    </div>
  );
}
```

### Example with Label

```tsx
import { Input } from "@tennr/lasso/input";
import { Label } from "@tennr/lasso/label";

function LabeledInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}
```

### Example with Controlled Value

```tsx
import { useState } from "react";

import { Input } from "@tennr/lasso/input";

function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  );
}
```

### Example with Validation State

```tsx
import { Input } from "@tennr/lasso/input";

function ValidatedInput() {
  const [email, setEmail] = useState("");
  const isInvalid = email.length > 0 && !email.includes("@");

  return (
    <Input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter email"
      aria-invalid={isInvalid}
    />
  );
}
```

### Example with Different Types

```tsx
import { Input } from "@tennr/lasso/input";

function InputTypes() {
  return (
    <div className="space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="tel" placeholder="Phone number" />
      <Input type="number" placeholder="Number input" />
      <Input type="file" />
    </div>
  );
}
```

### Example Disabled State

```tsx
import { Input } from "@tennr/lasso/input";

function DisabledInput() {
  return <Input placeholder="Cannot edit this" disabled />;
}
```

## Props Reference

### Input

The Input component extends all native HTML `<input>` element props (`React.ComponentProps<"input">`), including:

- `type`: `string` - The input type (e.g., "text", "email", "password", "tel", "time", "url", "number", "file")
- `className`: `string` - Additional CSS classes to apply to the input
- `placeholder`: `string` - Placeholder text displayed when the input is empty
- `value`: `string | number | readonly string[]` - The controlled value of the input
- `defaultValue`: `string | number | readonly string[]` - The default value for uncontrolled usage
- `onChange`: `(event: React.ChangeEvent<HTMLInputElement>) => void` - Change event handler
- `onFocus`: `(event: React.FocusEvent<HTMLInputElement>) => void` - Focus event handler (enhanced with cursor positioning)
- `disabled`: `boolean` - Whether the input is disabled
- `required`: `boolean` - Whether the input is required
- `aria-invalid`: `boolean` - Whether the input is in an invalid state (triggers error styling)
- `id`: `string` - The input's ID for label association
- `name`: `string` - The input's name for form submission

## Focus Behavior

The Input component includes enhanced focus behavior:

- **Cursor Positioning**: For text-like inputs (text, email, password, tel, time, url), the cursor automatically moves to the end of the existing text when the input receives focus
- **Custom onFocus**: You can provide your own `onFocus` handler, which will be called after the cursor positioning logic
- **Number Inputs**: Number inputs are excluded from cursor positioning as they don't support selection ranges

## Styling States

The Input component provides visual feedback for different states:

- **Default**: Standard border and background styling
- **Focus**: Enhanced border color with ring effect for visibility
- **Invalid**: Red/destructive border and ring when `aria-invalid` is true
- **Disabled**: Reduced opacity and pointer-events disabled
- **File Input**: Styled file button with proper text formatting

## Accessibility

The Input component includes accessibility features:

- **ARIA Support**: Properly handles `aria-invalid` for validation states
- **Label Association**: Works with `<label>` elements via `id` attribute
- **Keyboard Accessible**: Full keyboard navigation support
- **Screen Reader Friendly**: Proper semantic structure for assistive technologies
- **Focus Visible**: Clear focus indicators for keyboard navigation
- **Selection Styling**: Custom selection colors for better visibility

## Related Components

- For multi-line text, use the `Textarea` component
- For selecting from options, use the `Select` or `Combobox` component
- For date selection, use the `DatePicker` component
- For OTP/verification codes, use the `InputOTP` component
- For grouped inputs with labels and descriptions, use the `InputGroup` component
- For adding labels, use the `Label` component
- For form integration, use the `Form` component
