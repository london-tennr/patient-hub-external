# Textarea Component

## Overview

The Textarea component is a multi-line text input field for collecting longer-form text from users. It provides a styled, accessible textarea element with consistent design system styling, including focus states, validation states, and disabled states. It's a foundational form component used throughout the Tennr application.

## What It Is

The Textarea component is a styled wrapper around the native HTML `<textarea>` element that provides:

- **Consistent Styling**: Applies Tennr design system styles including borders, focus rings, and typography
- **Validation States**: Built-in visual feedback for invalid inputs using `aria-invalid`
- **Responsive Design**: Adapts text size between mobile and desktop breakpoints
- **Flexible Sizing**: Uses `field-sizing-content` for automatic height adjustment with a minimum height
- **Full Customization**: Accepts all native textarea props and allows className overrides

### Key Features

- **Accessible**: Proper focus handling and ARIA support out of the box
- **Validation Ready**: Visual error states triggered by `aria-invalid` attribute
- **Dark Mode Support**: Adapts styling for dark mode themes
- **Auto-Sizing**: Content-based field sizing with configurable minimum height
- **Customizable**: Full access to native textarea attributes and className extension

## When to Use

Use the Textarea component when you need to:

1. **Collect Long-Form Text**: Allow users to enter multi-line text content

   - Comments and feedback
   - Descriptions and notes
   - Message composition
   - Bio or about sections
   - Address entry

2. **Rich Text Input Areas**: Provide space for detailed text entry

   - Email body composition
   - Report descriptions
   - Medical notes
   - Case summaries
   - Review text

3. **Form Fields**: Integrate into forms requiring multi-line input

   - Contact forms
   - Support ticket descriptions
   - User profile fields
   - Survey responses
   - Documentation input

4. **Editable Content**: Allow users to edit larger blocks of text

   - Template editing
   - Note taking
   - Draft composition
   - Configuration text

## When NOT to Use

Avoid using the Textarea component when:

1. **Single-Line Input**: The input will always be a single line

   - Names, emails, phone numbers (use Input component)
   - Search queries (use Searchbar component)
   - Short identifiers or codes

2. **Rich Text Editing**: You need formatting controls like bold, italic, lists

   - Document editing (use a rich text editor)
   - Content management systems
   - WYSIWYG interfaces

3. **Read-Only Display**: The content is for display only

   - Code snippets (use a code block component)
   - Quoted text (use a blockquote or Text component)
   - Log output (use a pre-formatted text component)

4. **Structured Data**: The input has a specific format or structure

   - JSON editing (use a code editor)
   - Date/time (use DatePicker)
   - Numeric ranges (use Slider or number Input)

5. **Selection from Options**: Users choose from predefined options

   - Dropdown selections (use Select or Combobox)
   - Multiple choice (use Checkbox or RadioGroup)
   - Tags (use a TagInput component)

## Usage Example

```tsx
import { Textarea } from "@tennr/lasso/textarea";

function MyComponent() {
  return <Textarea placeholder="Enter your message" rows={4} />;
}
```

### Example with Label

```tsx
import { Label } from "@tennr/lasso/label";
import { Textarea } from "@tennr/lasso/textarea";

function MessageForm() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Enter your message here..." />
    </div>
  );
}
```

### Example with Controlled Value

```tsx
import { useState } from "react";

import { Textarea } from "@tennr/lasso/textarea";

function ControlledTextarea() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <p className="text-sm text-muted-foreground">
        Character count: {value.length}
      </p>
    </div>
  );
}
```

### Example with Validation Error

```tsx
import { Textarea } from "@tennr/lasso/textarea";

function ValidatedTextarea() {
  const [error, setError] = useState(false);

  return (
    <Textarea
      placeholder="Required field"
      aria-invalid={error}
      onBlur={(e) => setError(e.target.value.trim() === "")}
    />
  );
}
```

### Example with Custom Sizing

```tsx
import { Textarea } from "@tennr/lasso/textarea";

function CustomSizeTextarea() {
  return <Textarea placeholder="Larger textarea" className="min-h-[200px]" />;
}
```

## Props Reference

The Textarea component accepts all standard HTML textarea attributes, including:

### Common Props

- `placeholder`: `string` - Placeholder text displayed when empty
- `value`: `string` - Controlled value of the textarea
- `defaultValue`: `string` - Initial value for uncontrolled usage
- `onChange`: `(event: React.ChangeEvent<HTMLTextAreaElement>) => void` - Change handler
- `disabled`: `boolean` - Disables the textarea
- `readOnly`: `boolean` - Makes the textarea read-only
- `required`: `boolean` - Marks the field as required
- `rows`: `number` - Number of visible text lines
- `cols`: `number` - Visible width of the textarea
- `maxLength`: `number` - Maximum number of characters allowed
- `minLength`: `number` - Minimum number of characters required
- `name`: `string` - Name attribute for form submission
- `id`: `string` - Unique identifier, useful for label association
- `className`: `string` - Additional CSS classes to apply

### Accessibility Props

- `aria-invalid`: `boolean` - Indicates validation error state (triggers error styling)
- `aria-describedby`: `string` - ID of element describing the textarea
- `aria-label`: `string` - Accessible label when no visible label exists
- `aria-labelledby`: `string` - ID of element labeling the textarea

## Styling

The Textarea component includes the following default styles:

- **Border**: Subtle border with `border-border` color
- **Focus**: Ring effect with `ring-ring/50` color on focus
- **Error**: Red border and ring when `aria-invalid` is true
- **Disabled**: Reduced opacity and `not-allowed` cursor
- **Typography**: Base text size on mobile, smaller on desktop (md:text-sm)
- **Background**: White background, with dark mode variant

To customize the size, override the `min-h-*` class:

```tsx
<Textarea className="min-h-[80px]" />   // Smaller
<Textarea className="min-h-[200px]" />  // Larger
```

## Accessibility

The Textarea component is accessible out of the box:

- Standard HTML textarea element with full keyboard support
- Focus states clearly visible with ring styling
- Error states communicated via `aria-invalid` attribute
- Can be associated with Label using `htmlFor`/`id` pairing
- Supports `aria-describedby` for error message association
- Disabled state properly communicated to assistive technologies

## Related Components

- For single-line text input, use the `Input` component
- For search functionality, use the `Searchbar` component
- For labeled form fields, pair with the `Label` component
- For form validation and submission, use with the `Form` component
- For dropdown selections, use the `Select` or `Combobox` components
