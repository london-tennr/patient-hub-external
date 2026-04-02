# Label Component

## Overview

The Label component is an accessible text label designed to be associated with form controls and interactive UI elements. It's built on top of Radix UI's Label primitive and provides automatic accessibility features, including proper association with form elements via the `htmlFor` attribute. The component includes built-in support for disabled states through CSS peer and group selectors.

## What It Is

The Label component is a styled wrapper around the native HTML label element that:

- **Provides Accessibility**: Automatically associates with form controls for screen readers and assistive technologies
- **Supports Click-to-Focus**: Clicking the label focuses or activates the associated form control
- **Handles Disabled States**: Automatically adjusts styling when the associated control is disabled
- **Maintains Consistency**: Provides consistent typography and spacing aligned with the Tennr design system

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Peer/Group Integration**: Responds to disabled states of associated form controls via CSS selectors
- **Flexible**: Accepts className props for styling customization
- **Composable**: Works seamlessly with Input, Checkbox, RadioGroup, and other form components

## When to Use

Use the Label component when you need to:

1. **Label Form Inputs**: Provide descriptive text for form controls

   - Text inputs
   - Email/password fields
   - Textarea fields
   - Select dropdowns

2. **Label Checkboxes and Radio Buttons**: Create clickable labels for selection controls

   - Checkbox options
   - Radio button groups
   - Toggle switches
   - Terms and conditions acceptance

3. **Improve Accessibility**: Ensure screen readers can properly announce form field purposes

   - Required fields
   - Optional fields
   - Field groups
   - Error-associated fields

4. **Increase Click Targets**: Expand the clickable area for form controls
   - Mobile-friendly forms
   - Small checkbox/radio inputs
   - Compact form layouts

## When NOT to Use

Avoid using the Label component when:

1. **Non-Form Content**: The text is not associated with a form control

   - Headings (use `<h1>` - `<h6>` or Text component)
   - Descriptions (use a paragraph or Text component)
   - Static text content
   - Navigation items

2. **Already Labeled Controls**: The form control has built-in labeling

   - Buttons with text (use Button component)
   - Links (use appropriate link components)
   - Self-describing inputs with placeholder-only design (though labels are still preferred for accessibility)

3. **Complex Label Requirements**: You need rich content inside the label

   - Multiple interactive elements (use a fieldset with legend)
   - Complex layouts with multiple controls
   - Nested forms

4. **Visual-Only Labels**: The label should not be associated with any control
   - Decorative text
   - Section dividers
   - Status indicators (use Badge or Text)

## Usage Example

```tsx
import { Input } from "@tennr/lasso/input";
import { Label } from "@tennr/lasso/label";

function MyForm() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  );
}
```

### With Checkbox

```tsx
import { Checkbox } from "@tennr/lasso/checkbox";
import { Label } from "@tennr/lasso/label";

function TermsCheckbox() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
```

### With Disabled Input

```tsx
import { Input } from "@tennr/lasso/input";
import { Label } from "@tennr/lasso/label";

function DisabledField() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="readonly-field">Read-only field</Label>
      <Input
        id="readonly-field"
        className="peer"
        disabled
        placeholder="This field is disabled"
      />
    </div>
  );
}
```

**Note**: The `peer` class on the Input enables the Label to detect the disabled state via CSS. Due to CSS limitations, the `peer` marker only works on previous siblings, so the Input should come after the Label in the DOM, or use the `group` pattern with a parent wrapper.

## Props Reference

### Label

- `htmlFor`: `string` - The id of the form element this label is associated with
- `className`: `string` - Additional CSS classes to apply to the label
- `children`: `React.ReactNode` - The content to display within the label

The Label component also accepts all standard HTML label attributes through Radix UI's Label primitive.

## Disabled State Behavior

The Label component supports two patterns for disabled state styling:

1. **Peer Pattern**: When the associated form control has `className="peer"`, the label automatically reduces opacity and changes cursor when the control is disabled (via `peer-disabled:` selectors)

2. **Group Pattern**: When wrapped in a container with `data-disabled="true"`, the label responds via `group-data-[disabled=true]:` selectors

## Accessibility

The Label component is fully accessible out of the box:

- Properly associates with form controls via `htmlFor` attribute
- Clicking the label focuses or activates the associated control
- Screen readers announce the label when the associated control receives focus
- Supports keyboard navigation (clicking label triggers associated control)
- Visual indication of disabled state for associated controls

## Related Components

- For text input fields, use with the `Input` component
- For selection options, use with `Checkbox` or `RadioGroup` components
- For toggle controls, use with the `Switch` component
- For grouped form controls, consider using `InputGroup` or a form layout pattern
- For form validation and structure, use with the `Form` component
