import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
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
declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: import("react-hook-form").FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
/**
 * FormField - A wrapper around React Hook Form's Controller that manages individual field state.
 *
 * Provides field context to child components and integrates with the form's validation system.
 *
 * @param control - The form control object from useForm()
 * @param name - The name/path of the field in the form values
 * @param render - Render function that receives field props, field state, and form state
 */
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
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
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import("react-hook-form").FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
/**
 * FormItem - A container for a single form field that groups the label, control, description, and error message.
 *
 * Provides a unique ID context used by child components for accessibility attributes.
 *
 * @param className - Additional CSS classes to apply to the container
 */
declare function FormItem({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * FormLabel - An accessible label component that automatically links to its form control.
 *
 * Displays error styling when the associated field has a validation error.
 *
 * @param className - Additional CSS classes to apply to the label
 */
declare function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * FormControl - A slot component that injects accessibility attributes into the form control element.
 *
 * Automatically sets id, aria-describedby, and aria-invalid attributes on its child element.
 * The child element receives these attributes via Radix UI's Slot component.
 */
declare function FormControl({ ...props }: React.ComponentProps<typeof Slot>): import("react/jsx-runtime").JSX.Element;
/**
 * FormDescription - A helper text component that provides additional context for a form field.
 *
 * Automatically linked to its form control via aria-describedby for accessibility.
 *
 * @param className - Additional CSS classes to apply to the description
 * @param children - The description text
 */
declare function FormDescription({ className, ...props }: React.ComponentProps<"p">): import("react/jsx-runtime").JSX.Element;
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
declare function FormMessage({ className, ...props }: React.ComponentProps<"p">): import("react/jsx-runtime").JSX.Element | null;
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, };
//# sourceMappingURL=form.d.ts.map