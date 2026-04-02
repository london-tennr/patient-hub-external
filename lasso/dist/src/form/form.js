"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Controller, FormProvider, useFormContext, useFormState, } from "react-hook-form";
import { Label } from "../label/label";
import { cn } from "../utils/cn";
/**
 * Form Component
 *
 * A comprehensive set of form primitives that integrate with React Hook Form to provide
 * type-safe, accessible form handling with built-in validation and error messaging.
 * Built on top of Radix UI primitives and React Hook Form for the Tennr design system.
 *
 * @see [React Hook Form](https://react-hook-form.com/)
 * @see [Radix UI Label](https://www.radix-ui.com/primitives/docs/components/label)
 * @see [Lasso Form README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/form/README.md)
 *
 * @example
 * ```tsx
 * const form = useForm<FormValues>();
 *
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormField
 *       control={form.control}
 *       name="username"
 *       render={({ field }) => (
 *         <FormItem>
 *           <FormLabel>Username</FormLabel>
 *           <FormControl>
 *             <Input {...field} />
 *           </FormControl>
 *           <FormDescription>Your display name.</FormDescription>
 *           <FormMessage />
 *         </FormItem>
 *       )}
 *     />
 *   </form>
 * </Form>
 * ```
 */
const Form = FormProvider;
const FormFieldContext = React.createContext({});
/**
 * FormField - A wrapper around React Hook Form's Controller that manages individual field state.
 *
 * Provides field context to child components and integrates with the form's validation system.
 *
 * @param control - The form control object from useForm()
 * @param name - The name/path of the field in the form values
 * @param render - Render function that receives field props, field state, and form state
 */
const FormField = ({ ...props }) => {
    return (_jsx(FormFieldContext.Provider, { value: { name: props.name }, children: _jsx(Controller, { ...props }) }));
};
/**
 * useFormField - A hook that returns the current field's context and state.
 *
 * Must be used within a FormField component. Provides access to field identifiers,
 * field state (error, isDirty, isTouched, etc.), and accessibility IDs.
 *
 * @returns An object containing field context, IDs for accessibility, and field state
 * @throws Error if used outside of a FormField component
 *
 * @example
 * ```tsx
 * function CustomFormControl() {
 *   const { error, formItemId, formDescriptionId } = useFormField();
 *   return <input id={formItemId} aria-describedby={formDescriptionId} />;
 * }
 * ```
 */
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState } = useFormContext();
    const formState = useFormState({ name: fieldContext.name });
    const fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};
const FormItemContext = React.createContext({});
/**
 * FormItem - A container for a single form field that groups the label, control, description, and error message.
 *
 * Provides a unique ID context used by child components for accessibility attributes.
 *
 * @param className - Additional CSS classes to apply to the container
 */
function FormItem({ className, ...props }) {
    const id = React.useId();
    return (_jsx(FormItemContext.Provider, { value: { id }, children: _jsx("div", { "data-slot": "form-item", className: cn("grid gap-2", className), ...props }) }));
}
/**
 * FormLabel - An accessible label component that automatically links to its form control.
 *
 * Displays error styling when the associated field has a validation error.
 *
 * @param className - Additional CSS classes to apply to the label
 */
function FormLabel({ className, ...props }) {
    const { error, formItemId } = useFormField();
    return (_jsx(Label, { "data-slot": "form-label", "data-error": !!error, className: cn("data-[error=true]:text-destructive", className), htmlFor: formItemId, ...props }));
}
/**
 * FormControl - A slot component that injects accessibility attributes into the form control element.
 *
 * Automatically sets id, aria-describedby, and aria-invalid attributes on its child element.
 * The child element receives these attributes via Radix UI's Slot component.
 */
function FormControl({ ...props }) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return (_jsx(Slot, { "data-slot": "form-control", id: formItemId, "aria-describedby": !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`, "aria-invalid": !!error, ...props }));
}
/**
 * FormDescription - A helper text component that provides additional context for a form field.
 *
 * Automatically linked to its form control via aria-describedby for accessibility.
 *
 * @param className - Additional CSS classes to apply to the description
 * @param children - The description text
 */
function FormDescription({ className, ...props }) {
    const { formDescriptionId } = useFormField();
    return (_jsx("p", { "data-slot": "form-description", id: formDescriptionId, className: cn("text-muted-foreground text-sm", className), ...props }));
}
/**
 * FormMessage - An error message component that displays validation errors.
 *
 * Automatically displays the field's error message when present.
 * Falls back to children content when no error exists.
 * Returns null when there's no error and no children.
 *
 * @param className - Additional CSS classes to apply to the message
 * @param children - Fallback content when no error is present (optional)
 */
function FormMessage({ className, ...props }) {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : props.children;
    if (!body) {
        return null;
    }
    return (_jsx("p", { "data-slot": "form-message", id: formMessageId, className: cn("text-destructive text-sm", className), ...props, children: body }));
}
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, };
