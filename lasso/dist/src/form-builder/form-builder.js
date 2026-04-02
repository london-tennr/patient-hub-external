"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Spinner } from "@phosphor-icons/react";
import { type } from "arktype";
import * as React from "react";
import { FormProvider, } from "react-hook-form";
import { Button } from "../button/button";
import { Combobox } from "../combobox/combobox";
import { DatePicker } from "../date-picker/date-picker";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage, Form as UIForm, FormField as UIFormField, } from "../form/form";
import { Input } from "../input/input";
import { Switch } from "../switch/switch";
import { Textarea } from "../textarea/textarea";
import { cn } from "../utils/cn";
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
export function getSchemaFromFieldConfig(fieldConfig) {
    const schemaShape = {};
    for (const [fieldName, config] of Object.entries(fieldConfig)) {
        if (config.hidden)
            continue;
        switch (config.fieldType) {
            case "Input":
                schemaShape[fieldName] = type("string");
                break;
            case "Textarea":
                schemaShape[fieldName] = type("string");
                break;
            case "Switch":
                schemaShape[fieldName] = type("boolean");
                break;
            case "Select":
                if (config.selectOptions && config.selectOptions.length > 0) {
                    schemaShape[fieldName] = type.enumerated(...config.selectOptions);
                }
                else {
                    schemaShape[fieldName] = type("string");
                }
                break;
            case "DatePicker":
                schemaShape[fieldName] = type("string.date.parse");
                break;
            default:
                schemaShape[fieldName] = type("string");
        }
    }
    return type(schemaShape);
}
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
export function FormBuilder({ onSubmit, fieldConfig = {}, className, children, form, onFieldChange, }) {
    return (_jsx(UIForm, { ...form, children: _jsxs("form", { onSubmit: onSubmit ? form.handleSubmit(onSubmit) : undefined, className: cn("space-y-4", className), children: [_jsx("div", { className: "grid grid-cols-12 gap-2", children: Object.entries(fieldConfig).map(([name, config]) => {
                        if (config.hidden) {
                            return null;
                        }
                        const widthClasses = {
                            full: "col-span-12",
                            half: "col-span-6",
                            third: "col-span-4",
                            quarter: "col-span-3",
                        };
                        const widthClass = widthClasses[config.width || "full"];
                        return (_jsx("div", { className: cn(widthClass, config.className), children: _jsx(DynamicFormField, { control: form.control, name: name, config: config, label: config.label, description: config.description, placeholder: config.placeholder, fieldClassName: config.fieldClassName, labelClassName: config.labelClassName, descriptionClassName: config.descriptionClassName, renderField: config.renderField, onFieldChange: onFieldChange }) }, name));
                    }) }), children] }) }));
}
/**
 * DynamicFormField - Internal component that renders a single form field.
 *
 * This component handles the rendering of individual fields based on the
 * provided configuration, including custom render functions if specified.
 *
 * @internal
 * @template T - The form values type
 */
function DynamicFormField({ control, name, config, label, description, placeholder, fieldClassName, labelClassName, descriptionClassName, renderField, onFieldChange, }) {
    return (_jsx(UIFormField, { control: control, name: name, render: ({ field, fieldState: _fieldState, formState: _formState, }) => (_jsxs(FormItem, { children: [label && _jsx(FormLabel, { className: labelClassName, children: label }), _jsx(FormControl, { className: fieldClassName, children: renderField
                        ? renderField({
                            field,
                            fieldState: _fieldState,
                            formState: _formState,
                        })
                        : renderFieldByType(config, field, placeholder, onFieldChange) }), description && (_jsx(FormDescription, { className: descriptionClassName, children: description })), _jsx(FormMessage, {})] })) }));
}
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
export function SubmitButton({ children, className, variant = "default", loadingText = "Submitting...", ...props }) {
    const form = React.useContext(FormProvider);
    const isSubmitting = form?.formState?.isSubmitting;
    return (_jsx(Button, { type: "submit", variant: variant, className: cn("w-full", className), disabled: isSubmitting, ...props, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { weight: "light", className: "mr-2 h-4 w-4 animate-spin" }), loadingText] })) : (children) }));
}
/**
 * Renders the appropriate field component based on the fieldType configuration.
 *
 * @internal
 * @template T - The form values type
 * @param config - The field configuration
 * @param field - The react-hook-form field controller props
 * @param placeholder - Optional placeholder text
 * @param onFieldChange - Optional callback for field value changes
 * @returns The rendered field component
 */
function renderFieldByType(config, field, placeholder, onFieldChange) {
    const fieldType = config.fieldType || "Input";
    const handleChange = (value) => {
        field.onChange(value);
        onFieldChange?.(field.name, value);
    };
    switch (fieldType) {
        case "Input":
            return (_jsx(Input, { ...field, placeholder: placeholder, value: field.value || "", onChange: (e) => handleChange(e.target.value) }));
        case "Textarea":
            return (_jsx(Textarea, { ...field, placeholder: placeholder, value: field.value || "", onChange: (e) => handleChange(e.target.value) }));
        case "Switch":
            return (
            /* TODO: Update both Switch component and default Switch styling in FormBuilder */
            _jsxs("div", { className: "flex h-full w-full justify-items-center items-center justify-between", children: [_jsx(Switch, { checked: field.value, onCheckedChange: (checked) => handleChange(checked) }), _jsx(FormLabel, { children: field.name })] }));
        case "Select":
            if (config.selectOptions && config.selectOptions.length > 0) {
                return (_jsx(Combobox, { options: config.selectOptions.map((opt) => ({
                        value: opt,
                        label: opt,
                    })), value: field.value, onValueChange: (value) => handleChange(value) }));
            }
            return (_jsx(Input, { ...field, placeholder: placeholder, onChange: (e) => handleChange(e.target.value) }));
        case "DatePicker":
            return (_jsx(DatePicker, { date: field.value, onDateChange: (date) => {
                    handleChange(date);
                }, className: "w-full" }));
        default:
            return (_jsx(Input, { ...field, placeholder: placeholder, onChange: (e) => handleChange(e.target.value) }));
    }
}
