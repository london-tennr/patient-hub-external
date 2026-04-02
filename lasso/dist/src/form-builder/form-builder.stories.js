import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { Icon } from "@iconify/react";
import { type } from "arktype";
import { useForm } from "react-hook-form";
import { FormBuilder, SubmitButton } from "./form-builder";
/**
 * FormBuilder is a powerful component that automatically generates forms based on a field configuration.
 * It handles:
 * - Automatic schema generation
 * - Form validation
 * - Responsive layouts
 * - Multiple field types (Input, Select, DatePicker, Switch, Textarea)
 * - Custom field rendering
 *
 * Usage:
 * 1. Define your field configuration
 * 2. Generate the schema using getSchemaFromFieldConfig, make modifications as needed
 * 3. Set up react-hook-form with the schema, all actions controlled by you
 * 4. Render the FormBuilder component
 */
export default {
    title: "Components/FormBuilder",
    component: FormBuilder,
    parameters: {
        layout: "centered",
    },
};
// Basic example with different field types
export const BasicForm = () => {
    const fieldConfig = {
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
            width: "full",
        },
        active: {
            label: "Active Account",
            fieldType: "Switch",
            width: "full",
        },
    };
    const schema = type({
        name: "string",
        email: "string",
        role: "'Admin' | 'User' | 'Guest'",
        active: "boolean",
    });
    const form = useForm({
        resolver: arktypeResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            role: "User",
            active: false,
        },
    });
    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };
    return (_jsx(FormBuilder, { onSubmit: onSubmit, fieldConfig: fieldConfig, form: form, children: _jsx(SubmitButton, { children: "Submit" }) }));
};
// Example with responsive grid layout
export const ResponsiveForm = () => {
    const fieldConfig = {
        firstName: {
            label: "First Name",
            placeholder: "Enter first name",
            fieldType: "Input",
            width: "half",
        },
        lastName: {
            label: "Last Name",
            placeholder: "Enter last name",
            fieldType: "Input",
            width: "half",
        },
        email: {
            label: "Email",
            placeholder: "Enter email",
            fieldType: "Input",
            width: "full",
        },
        role: {
            label: "Role",
            fieldType: "Select",
            selectOptions: ["Admin", "User", "Guest"],
            width: "third",
        },
        department: {
            label: "Department",
            fieldType: "Select",
            selectOptions: ["Engineering", "Marketing", "Sales"],
            width: "third",
        },
        active: {
            label: "Active",
            fieldType: "Switch",
            width: "third",
            className: "h-full flex-col items-start",
            fieldClassName: "flex-row items-center",
        },
    };
    const schema = type({
        firstName: "string",
        lastName: "string",
        email: "string",
        role: "'Admin' | 'User' | 'Guest'",
        department: "'Engineering' | 'Marketing' | 'Sales'",
        active: "boolean",
    });
    const form = useForm({
        resolver: arktypeResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            role: "User",
            department: "Engineering",
            active: false,
        },
    });
    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };
    return (_jsx(FormBuilder, { onSubmit: onSubmit, fieldConfig: fieldConfig, form: form, children: _jsx(SubmitButton, { className: "w-full mt-4", children: "Submit" }) }));
};
// Example with custom field rendering
export const CustomFieldForm = () => {
    const fieldConfig = {
        name: {
            label: "Name",
            fieldType: "Input",
            width: "full",
        },
        customField: {
            label: "Custom Field",
            width: "full",
            renderField: ({ field }) => (_jsxs("div", { className: "flex items-center gap-2 p-2 border rounded", children: [_jsx(Icon, { icon: "ph:star", className: "text-yellow-500" }), _jsx("input", { ...field, className: "flex-1 bg-transparent outline-none", placeholder: "Custom input with icon" })] })),
        },
    };
    const schema = type({
        name: "string",
        customField: "string",
    });
    const form = useForm({
        resolver: arktypeResolver(schema),
        defaultValues: {
            name: "",
            customField: "",
        },
    });
    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };
    return (_jsx(FormBuilder, { onSubmit: onSubmit, fieldConfig: fieldConfig, form: form, children: _jsx(SubmitButton, { className: "w-full mt-2", children: "Submit" }) }));
};
// Example with all field types
export const AllFieldTypes = () => {
    const fieldConfig = {
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
    const schema = type({
        text: "string",
        textarea: "string",
        select: "'Option 1' | 'Option 2' | 'Option 3'",
        date: "Date",
        toggle: "boolean",
    });
    const form = useForm({
        resolver: arktypeResolver(schema),
        defaultValues: {
            text: "",
            textarea: "",
            select: "Option 1",
            date: new Date(),
            toggle: false,
        },
    });
    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };
    return (_jsx(FormBuilder, { onSubmit: onSubmit, fieldConfig: fieldConfig, form: form, children: _jsx(SubmitButton, { className: "w-full mt-2", children: "Submit" }) }));
};
