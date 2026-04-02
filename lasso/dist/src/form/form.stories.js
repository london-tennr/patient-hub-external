import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../button/button.js";
import { Input } from "../input/input.js";
import { Textarea } from "../textarea/textarea.js";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "./form";
const FormWrapper = () => {
    const formSchema = z.object({
        username: z
            .string()
            .min(2, {
            message: "Username must be at least 2 characters.",
        })
            .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        bio: z
            .string()
            .max(160, {
            message: "Bio must not be longer than 160 characters.",
        })
            .optional(),
    });
    const resolver = async (values) => {
        try {
            const validatedData = formSchema.parse(values);
            return {
                values: validatedData,
                errors: {},
            };
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const errors = {};
                error.issues.forEach((issue) => {
                    const field = issue.path[0];
                    if (field != null) {
                        errors[String(field)] = {
                            type: issue.code,
                            message: issue.message,
                        };
                    }
                });
                return {
                    values: {},
                    errors,
                };
            }
            return {
                values: {},
                errors: {},
            };
        }
    };
    const form = useForm({
        resolver,
        defaultValues: {
            username: "",
            email: "",
            bio: "",
        },
    });
    function onSubmit(values) {
        console.log(values);
    }
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "username", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Username" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter your username", ...field }) }), _jsx(FormDescription, { children: "This is your public display name." }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "email", placeholder: "Enter your email", ...field }) }), _jsx(FormDescription, { children: "We'll never share your email with anyone else." }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "bio", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Bio" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Tell us a little bit about yourself", ...field }) }), _jsx(FormDescription, { children: "Brief description for your profile." }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", children: "Submit" })] }) }));
};
const LoginFormWrapper = () => {
    const loginSchema = z.object({
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    });
    const resolver = async (values) => {
        try {
            const validatedData = loginSchema.parse(values);
            return {
                values: validatedData,
                errors: {},
            };
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const errors = {};
                error.issues.forEach((issue) => {
                    const field = issue.path[0];
                    if (field != null) {
                        errors[String(field)] = {
                            type: issue.code,
                            message: issue.message,
                        };
                    }
                });
                return {
                    values: {},
                    errors,
                };
            }
            return {
                values: {},
                errors: {},
            };
        }
    };
    const form = useForm({
        resolver,
        defaultValues: {
            email: "",
            password: "",
        },
    });
    function onSubmit(values) {
        console.log(values);
    }
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "email", placeholder: "Enter your email", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", placeholder: "Enter your password", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", children: "Sign In" })] }) }));
};
const meta = {
    title: "Components/Form",
    component: FormWrapper,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => _jsx(FormWrapper, {}),
};
export const LoginForm = {
    render: () => _jsx(LoginFormWrapper, {}),
};
