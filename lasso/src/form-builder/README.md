# FormBuilder Component

## Overview

The FormBuilder component is a powerful form generation system that automatically creates forms based on a field configuration object. It integrates seamlessly with react-hook-form for state management and validation, supports multiple field types out of the box, and provides responsive grid layouts. It's ideal for rapidly building consistent, validated forms across your application.

## What It Is

The FormBuilder system consists of three main exports that work together:

- **FormBuilder**: The main component that renders a form based on a field configuration
- **SubmitButton**: A specialized submit button that integrates with the form's loading state
- **getSchemaFromFieldConfig**: A utility function that generates an arktype schema from field configuration

### Key Features

- **Configuration-Driven**: Define your form structure with a simple configuration object
- **Multiple Field Types**: Supports Input, Textarea, Switch, Select (Combobox), and DatePicker out of the box
- **Responsive Grid Layout**: Built-in responsive width options (full, half, third, quarter)
- **Custom Field Rendering**: Override default rendering with custom render functions
- **Schema Generation**: Automatically generate validation schemas from your field configuration
- **react-hook-form Integration**: Full control over form state, validation, and submission
- **Loading States**: Built-in loading state handling in the SubmitButton component

## When to Use

Use the FormBuilder component when you need to:

1. **Rapid Form Creation**: Quickly scaffold forms with consistent styling and behavior

   - Settings pages
   - User profile forms
   - Data entry interfaces
   - Admin panels

2. **Configuration-Driven Forms**: Generate forms dynamically from configuration data

   - CMS-driven forms
   - User-customizable forms
   - Multi-tenant applications with varying form requirements
   - Feature-flagged form fields

3. **Consistent Form Patterns**: Maintain consistency across many forms in your application

   - Registration and signup flows
   - Multi-step wizards
   - CRUD interfaces
   - Search and filter forms

4. **Responsive Layouts**: Create forms that adapt to different screen sizes

   - Dashboard forms
   - Sidebar forms
   - Modal forms
   - Mobile-responsive forms

5. **Validated Forms**: Build forms with integrated validation

   - User input validation
   - Required field handling
   - Type-specific validation (dates, emails, etc.)

## When NOT to Use

Avoid using the FormBuilder component when:

1. **Highly Custom Forms**: The form has unique layout or interaction requirements that don't fit the grid pattern

   - Complex multi-section forms with custom layouts
   - Forms with drag-and-drop elements
   - Forms requiring real-time collaboration features

2. **Simple Single-Field Forms**: A single input doesn't warrant the FormBuilder overhead

   - Search bars (use Input directly)
   - Single toggles (use Switch directly)
   - Inline edit fields

3. **Non-Standard Field Types**: You need field types not supported by FormBuilder

   - File upload with preview
   - Rich text editors
   - Complex nested data structures
   - Consider extending FormBuilder or using custom renderField in these cases

4. **Performance-Critical Forms**: Forms with hundreds of fields where the abstraction adds overhead

   - Large data tables with inline editing
   - Real-time data entry applications

5. **Uncontrolled Forms**: When you don't need form state management

   - Static display forms
   - Read-only data presentation

## Usage Example

### Basic Form

```tsx
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { type } from "arktype";
import { useForm } from "react-hook-form";

import {
  FieldConfig,
  FormBuilder,
  SubmitButton,
} from "@tennr/lasso/form-builder";

function MyForm() {
  const fieldConfig: Record<string, FieldConfig> = {
    name: {
      label: "Full Name",
      placeholder: "Enter your name",
      fieldType: "Input",
      width: "full",
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
      fieldType: "Input",
      width: "full",
    },
    role: {
      label: "Role",
      fieldType: "Select",
      selectOptions: ["Admin", "User", "Guest"],
      width: "half",
    },
    active: {
      label: "Active Account",
      fieldType: "Switch",
      width: "half",
    },
  };

  type FormData = {
    name: string;
    email: string;
    role: "Admin" | "User" | "Guest";
    active: boolean;
  };

  const schema = type({
    name: "string",
    email: "string",
    role: "'Admin' | 'User' | 'Guest'",
    active: "boolean",
  });

  const form = useForm<FormData>({
    resolver: arktypeResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      active: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormBuilder<FormData>
      onSubmit={onSubmit}
      fieldConfig={fieldConfig}
      form={form}
    >
      <SubmitButton>Submit</SubmitButton>
    </FormBuilder>
  );
}
```

### Example with All Field Types

```tsx
const fieldConfig: Record<string, FieldConfig> = {
  text: {
    label: "Text Input",
    placeholder: "Enter text",
    fieldType: "Input",
    width: "full",
  },
  textarea: {
    label: "Text Area",
    placeholder: "Enter long text",
    fieldType: "Textarea",
    width: "full",
  },
  select: {
    label: "Select Option",
    fieldType: "Select",
    selectOptions: ["Option 1", "Option 2", "Option 3"],
    width: "full",
  },
  date: {
    label: "Pick a Date",
    fieldType: "DatePicker",
    width: "full",
  },
  toggle: {
    label: "Toggle Switch",
    fieldType: "Switch",
    width: "full",
  },
};
```

### Example with Custom Field Rendering

```tsx
const fieldConfig: Record<string, FieldConfig> = {
  customField: {
    label: "Custom Field",
    width: "full",
    renderField: ({ field }) => (
      <div className="flex items-center gap-2 p-2 border rounded">
        <Icon icon="ph:star" className="text-yellow-500" />
        <input
          {...field}
          className="flex-1 bg-transparent outline-none"
          placeholder="Custom input with icon"
        />
      </div>
    ),
  },
};
```

### Example with Field Change Callback

```tsx
<FormBuilder<FormData>
  onSubmit={onSubmit}
  fieldConfig={fieldConfig}
  form={form}
  onFieldChange={(name, value) => {
    console.log(`Field ${name} changed to:`, value);
    // Perform side effects like conditional logic
  }}
>
  <SubmitButton>Submit</SubmitButton>
</FormBuilder>
```

## Props Reference

### FormBuilder

| Prop            | Type                                                                    | Description                                                        |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `form`          | `UseFormReturn<T>`                                                      | **Required**. The react-hook-form instance returned by `useForm()` |
| `fieldConfig`   | `Record<string, FieldConfig>`                                           | Configuration object defining form fields. Keys become field names |
| `onSubmit`      | `SubmitHandler<T>`                                                      | Handler called when form is submitted and validation passes        |
| `className`     | `string`                                                                | Additional CSS classes for the form container                      |
| `children`      | `React.ReactNode`                                                       | Content rendered after the form fields (typically SubmitButton)    |
| `onFieldChange` | `(name: string, value: string \| boolean \| Date \| undefined) => void` | Callback fired when any field value changes                        |

### FieldConfig

| Prop                   | Type                                                            | Description                                                      |
| ---------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- |
| `label`                | `string`                                                        | Label text displayed above the field                             |
| `description`          | `string`                                                        | Help text displayed below the field                              |
| `placeholder`          | `string`                                                        | Placeholder text for Input and Textarea fields                   |
| `fieldType`            | `"Input" \| "Textarea" \| "Switch" \| "Select" \| "DatePicker"` | The type of field to render. Defaults to "Input"                 |
| `selectOptions`        | `string[]`                                                      | Options for Select field type                                    |
| `width`                | `"full" \| "half" \| "third" \| "quarter"`                      | Field width in the responsive grid. Defaults to "full"           |
| `hidden`               | `boolean`                                                       | If true, the field is not rendered                               |
| `className`            | `string`                                                        | Additional CSS classes for the field container                   |
| `fieldClassName`       | `string`                                                        | Additional CSS classes for the field input                       |
| `labelClassName`       | `string`                                                        | Additional CSS classes for the label                             |
| `descriptionClassName` | `string`                                                        | Additional CSS classes for the description                       |
| `renderField`          | `(props: RenderFieldProps) => React.ReactNode`                  | Custom render function for complete control over field rendering |

### RenderFieldProps

| Prop         | Type                       | Description                                                      |
| ------------ | -------------------------- | ---------------------------------------------------------------- |
| `field`      | `ControllerRenderProps<T>` | Field props from react-hook-form (value, onChange, onBlur, etc.) |
| `fieldState` | `ControllerFieldState`     | Field state including error, invalid, isTouched, isDirty         |
| `formState`  | `UseFormStateReturn<T>`    | Overall form state including isSubmitting, errors, etc.          |

### SubmitButton

Extends all `Button` props plus:

| Prop          | Type     | Description                                                          |
| ------------- | -------- | -------------------------------------------------------------------- |
| `loadingText` | `string` | Text displayed while form is submitting. Defaults to "Submitting..." |

### getSchemaFromFieldConfig

```tsx
function getSchemaFromFieldConfig(
  fieldConfig: Record<string, FieldConfig>,
): Type;
```

Generates an arktype schema from field configuration. Useful as a starting point for validation - you can modify the returned schema to add custom validation rules.

## Grid Layout

FormBuilder uses a 12-column grid system:

- `full`: `col-span-12` (100% width)
- `half`: `col-span-6` (50% width)
- `third`: `col-span-4` (33.3% width)
- `quarter`: `col-span-3` (25% width)

## Form State Management

FormBuilder works with react-hook-form and gives you full control over:

- Form initialization and default values
- Validation schemas (using arktype or other resolvers)
- Field registration and state
- Form submission handling
- Error handling and display

The `SubmitButton` component automatically reads the form's submitting state to show loading feedback.

## Accessibility

The FormBuilder component includes accessibility features:

- Labels are properly associated with their inputs
- Error messages are displayed using `FormMessage`
- Form fields use semantic HTML elements
- Keyboard navigation works correctly between fields

## Related Components

- For individual form fields without the builder pattern, use `Input`, `Textarea`, `Switch`, `Combobox`, or `DatePicker` directly
- For complex forms with sections, consider composing multiple `FormBuilder` components
- For form validation, FormBuilder works with any react-hook-form resolver (arktype, zod, yup, etc.)
