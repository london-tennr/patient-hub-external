import { Type } from "arktype";
import * as React from "react";
import { type ControllerFieldState, type ControllerRenderProps, type FieldValues, type SubmitHandler, type UseFormReturn, type UseFormStateReturn } from "react-hook-form";
import { Button } from "../button/button";
/**
 * Configuration options for a single form field in the FormBuilder.
 *
 * @example
 * ```tsx
 * const fieldConfig: Record<string, FieldConfig> = {
 *   email: {
 *     label: "Email Address",
 *     placeholder: "Enter your email",
 *     fieldType: "Input",
 *     width: "half",
 *   },
 * };
 * ```
 */
export interface FieldConfig {
    /** Label text displayed above the field. */
    label?: string;
    /** Help text displayed below the field. */
    description?: string;
    /** Placeholder text for Input and Textarea fields. */
    placeholder?: string;
    /** Additional CSS classes for the field container. */
    className?: string;
    /** Additional CSS classes for the field input element. */
    fieldClassName?: string;
    /** Additional CSS classes for the label element. */
    labelClassName?: string;
    /** Additional CSS classes for the description element. */
    descriptionClassName?: string;
    /** If true, the field is not rendered. Useful for conditional fields. */
    hidden?: boolean;
    /** Field width in the responsive 12-column grid. Defaults to "full". */
    width?: "full" | "half" | "third" | "quarter";
    /** @deprecated Use fieldType: "Textarea" instead. */
    isTextArea?: boolean;
    /** Custom render function for complete control over field rendering. */
    renderField?: (props: RenderFieldProps) => React.ReactNode;
    /** The type of field to render. Defaults to "Input". */
    fieldType?: "Input" | "Textarea" | "Switch" | "Select" | "DatePicker";
    /** Options for Select field type. Each string becomes a selectable option. */
    selectOptions?: string[];
}
/**
 * Props passed to custom field render functions.
 * Provides access to react-hook-form's field controller props.
 *
 * @template T - The form values type
 */
export interface RenderFieldProps<T extends FieldValues = FieldValues> {
    /** Field props from react-hook-form including value, onChange, onBlur, name, and ref. */
    field: ControllerRenderProps<T>;
    /** Field state including error, invalid, isTouched, and isDirty. */
    fieldState: ControllerFieldState;
    /** Overall form state including isSubmitting, isValid, errors, etc. */
    formState: UseFormStateReturn<T>;
}
/**
 * Generates an arktype validation schema from a field configuration object.
 *
 * This utility function creates a basic schema based on field types:
 * - Input/Textarea → string
 * - Switch → boolean
 * - Select → enum of selectOptions (or string if no options)
 * - DatePicker → string.date.parse
 *
 * The generated schema can be used as a starting point and modified to add
 * custom validation rules.
 *
 * @param fieldConfig - The field configuration object
 * @returns An arktype Type schema for form validation
 *
 * @example
 * ```tsx
 * const fieldConfig = {
 *   name: { fieldType: "Input" },
 *   active: { fieldType: "Switch" },
 * };
 * const schema = getSchemaFromFieldConfig(fieldConfig);
 * // Results in: type({ name: "string", active: "boolean" })
 * ```
 */
export declare function getSchemaFromFieldConfig(fieldConfig: Record<string, FieldConfig>): Type;
/**
 * Union type representing possible form field values.
 */
export type FormValues = Record<string, string | boolean | Date>;
/**
 * FormBuilder Component
 *
 * A powerful form generation component that automatically creates forms based on a
 * field configuration object. It integrates with react-hook-form for state management
 * and validation, supports multiple field types out of the box, and provides
 * responsive grid layouts.
 *
 * @see [react-hook-form](https://react-hook-form.com/)
 *
 * @see [Lasso FormBuilder README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/form-builder/README.md)
 *
 * @template T - The form values type, should extend FieldValues from react-hook-form
 *
 * @example
 * ```tsx
 * const form = useForm<FormData>({
 *   resolver: arktypeResolver(schema),
 *   defaultValues: { name: "", email: "" },
 * });
 *
 * <FormBuilder<FormData>
 *   form={form}
 *   fieldConfig={fieldConfig}
 *   onSubmit={(data) => console.log(data)}
 * >
 *   <SubmitButton>Submit</SubmitButton>
 * </FormBuilder>
 * ```
 */
export declare function FormBuilder<T extends FieldValues>({ onSubmit, fieldConfig, className, children, form, onFieldChange, }: {
    /** Handler called when form is submitted and validation passes. */
    onSubmit?: SubmitHandler<T>;
    /** Configuration object defining form fields. Keys become field names. */
    fieldConfig?: Record<string, FieldConfig>;
    /** Additional CSS classes for the form container. */
    className?: string;
    /** Content rendered after the form fields (typically SubmitButton). */
    children?: React.ReactNode;
    /** The react-hook-form instance returned by useForm(). Required. */
    form: UseFormReturn<T>;
    /** Callback fired when any field value changes. */
    onFieldChange?: (name: string, value: string | boolean | Date | undefined) => void;
}): import("react/jsx-runtime").JSX.Element;
/**
 * SubmitButton Component
 *
 * A specialized submit button that integrates with FormBuilder's form context
 * to automatically display loading state during form submission. Shows a spinner
 * and customizable loading text while the form is being submitted.
 *
 * @param children - Button content when not submitting
 * @param className - Additional CSS classes
 * @param variant - Button variant, defaults to "default"
 * @param loadingText - Text displayed while submitting, defaults to "Submitting..."
 *
 * @example
 * ```tsx
 * <FormBuilder form={form} onSubmit={handleSubmit}>
 *   {/* form fields *\/}
 *   <SubmitButton loadingText="Saving...">Save Changes</SubmitButton>
 * </FormBuilder>
 * ```
 */
export declare function SubmitButton({ children, className, variant, loadingText, ...props }: React.ComponentProps<typeof Button> & {
    /** Text displayed while the form is submitting. Defaults to "Submitting...". */
    loadingText?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=form-builder.d.ts.map