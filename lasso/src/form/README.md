# Form Component

## Overview

The Form component is a comprehensive set of form primitives that integrate with React Hook Form to provide type-safe, accessible form handling with built-in validation and error messaging. It provides a consistent structure for building forms with labels, descriptions, and error messages, all automatically wired together with proper accessibility attributes. Built on top of Radix UI primitives and React Hook Form for the Tennr design system.

## What It Is

The Form component consists of seven sub-components that work together:

- **Form** (root): A wrapper around React Hook Form's `FormProvider` that provides form context to all child components
- **FormField**: A wrapper around React Hook Form's `Controller` that manages individual field state and provides field context
- **FormItem**: A container for a single form field that groups the label, control, description, and error message
- **FormLabel**: An accessible label component that automatically links to its form control and shows error states
- **FormControl**: A slot component that injects accessibility attributes into the form control element
- **FormDescription**: A helper text component that provides additional context for a form field
- **FormMessage**: An error message component that displays validation errors

### Key Features

- **Type-Safe**: Full TypeScript support with generic types for form values and field paths
- **Accessible**: Automatic ARIA attributes for labels, descriptions, and error messages
- **Validation Integration**: Seamless integration with React Hook Form's validation system
- **Error Handling**: Built-in error display with automatic error state styling
- **Flexible**: Works with any form control component (Input, Select, Textarea, etc.)
- **Composable**: Mix and match sub-components as needed for each form field

## When to Use

Use the Form component when you need to:

1. **Complex Form Handling**: Build forms with multiple fields that require validation

   - User registration forms
   - Profile edit forms
   - Settings pages
   - Multi-step wizards

2. **Validation and Error Display**: Need consistent validation with clear error messaging

   - Required field validation
   - Format validation (email, phone, etc.)
   - Cross-field validation
   - Server-side validation feedback

3. **Accessible Forms**: Build forms that meet accessibility standards

   - Screen reader compatible forms
   - Keyboard navigable forms
   - Forms with clear error announcements
   - WCAG compliant interfaces

4. **Consistent Form Layout**: Maintain a consistent look across your application's forms

   - Standardized field spacing
   - Consistent label positioning
   - Uniform error message display
   - Cohesive form descriptions

5. **Type-Safe Form Development**: Leverage TypeScript for form development

   - Typed form values
   - Auto-complete for field names
   - Compile-time validation checking
   - Refactoring support

## When NOT to Use

Avoid using the Form component when:

1. **Simple Single Inputs**: You only need a standalone input without form context

   - Search bars (use Input directly)
   - Quick filters (use Select directly)
   - Toggle settings (use Switch directly)
   - Single inline edits

2. **Non-Form Interactions**: The interaction doesn't require form submission

   - Display-only interfaces
   - Read-only data views
   - Static content pages
   - Dashboard widgets without user input

3. **Custom Form Libraries**: You're already using a different form management solution

   - Formik-based forms
   - Custom form state management
   - Redux Form implementations
   - Other form libraries with their own components

4. **Uncontrolled Forms**: You need simple uncontrolled inputs without validation

   - Quick prototype forms
   - Simple contact forms without validation
   - Forms submitted directly to external services

5. **Third-Party Form Embeds**: You're embedding external form services

   - Typeform embeds
   - Google Forms
   - Third-party survey tools
   - Payment processor forms

## Usage Example

```tsx
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@tennr/lasso/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@tennr/lasso/form";
import { Input } from "@tennr/lasso/input";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

function MyForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Example with Custom Validation Resolver

```tsx
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const resolver: Resolver<FormValues> = async (values) => {
  try {
    const validatedData = schema.parse(values);
    return { values: validatedData, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, { type: string; message: string }> = {};
      error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field != null) {
          errors[String(field)] = {
            type: issue.code,
            message: issue.message,
          };
        }
      });
      return { values: {}, errors };
    }
    return { values: {}, errors: {} };
  }
};

const form = useForm<FormValues>({ resolver });
```

### Example with Different Input Types

```tsx
import { Textarea } from "@tennr/lasso/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@tennr/lasso/select";

<FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <Textarea placeholder="Tell us about yourself" {...field} />
      </FormControl>
      <FormDescription>Max 160 characters.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="guest">Guest</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Props Reference

### Form

The Form component is a re-export of React Hook Form's `FormProvider`. It accepts all props from `useForm()` return value.

- Spreads the form instance from `useForm()` to provide context to child components

### FormField

A generic component that wraps React Hook Form's `Controller`.

- `control`: `Control<TFieldValues>` - The form control object from `useForm()`
- `name`: `FieldPath<TFieldValues>` - The name/path of the field in the form values
- `render`: `({ field, fieldState, formState }) => ReactElement` - Render function for the field

### FormItem

- `className`: `string` - Additional CSS classes to apply to the container

### FormLabel

Extends Radix UI's `LabelPrimitive.Root` props.

- `className`: `string` - Additional CSS classes to apply to the label
- Automatically applies error styling when the field has an error

### FormControl

A slot component that injects accessibility attributes into its child.

- Inherits all props from Radix UI's `Slot` component
- Automatically sets `id`, `aria-describedby`, and `aria-invalid` attributes

### FormDescription

- `className`: `string` - Additional CSS classes to apply to the description
- `children`: `ReactNode` - The description text

### FormMessage

- `className`: `string` - Additional CSS classes to apply to the message
- `children`: `ReactNode` - Fallback content when no error is present (optional)
- Automatically displays the field's error message when present

### useFormField Hook

A hook that returns the current field's context and state.

Returns:

- `id`: `string` - Unique ID for the form item
- `name`: `string` - The field name
- `formItemId`: `string` - ID for the form control element
- `formDescriptionId`: `string` - ID for the description element
- `formMessageId`: `string` - ID for the error message element
- All properties from `FieldState` (error, invalid, isDirty, isTouched, etc.)

## Accessibility

The Form component provides comprehensive accessibility support:

- **Automatic Label Association**: Labels are automatically linked to their controls via `htmlFor`
- **ARIA Descriptions**: Form controls include `aria-describedby` pointing to descriptions and error messages
- **Error Announcements**: `aria-invalid` is set when fields have validation errors
- **Screen Reader Support**: Error messages are properly associated with form controls
- **Keyboard Navigation**: Works with standard form keyboard interactions
- **Focus Management**: Proper focus handling inherited from underlying components

## Related Components

- For simple inputs without form context, use the `Input` component directly
- For form submission with async state handling, combine with `ActionButton`
- For multi-step forms, use with a stepper or wizard component
- For form validation, use with Zod or Yup schema validation
- For complex form builders, see the `FormBuilder` component
