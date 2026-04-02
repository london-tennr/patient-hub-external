import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { Button } from "../button/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../form/form";
import { Input } from "../input/input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "./dialog";
const meta = {
    title: "Components/Dialog",
    component: Dialog,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => {
        const form = useForm();
        const onSubmit = (data) => {
            console.log(data);
        };
        return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Dialog" }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Edit Profile" }), _jsx(DialogDescription, { children: "Make changes to your profile here. Click save when you're done." })] }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "grid gap-4 py-4", children: [_jsx(FormField, { name: "name", render: ({ field }) => (_jsxs(FormItem, { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(FormLabel, { className: "text-right", children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { ...field, defaultValue: "John Doe", className: "col-span-3" }) })] })) }), _jsx(FormField, { name: "username", render: ({ field }) => (_jsxs(FormItem, { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(FormLabel, { className: "text-right", children: "Username" }), _jsx(FormControl, { children: _jsx(Input, { ...field, defaultValue: "@johndoe", className: "col-span-3" }) })] })) })] }) }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "Save changes" }) })] })] }));
    },
};
export const WithForm = {
    render: () => {
        const form = useForm();
        const onSubmit = (data) => {
            console.log(data);
        };
        return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { children: "Create Account" }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Create an Account" }), _jsx(DialogDescription, { children: "Fill out the form below to create your account." })] }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "grid gap-4 py-4", children: [_jsx(FormField, { name: "email", render: ({ field }) => (_jsxs(FormItem, { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(FormLabel, { className: "text-right", children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { ...field, type: "email", placeholder: "Enter your email", className: "col-span-3" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "password", render: ({ field }) => (_jsxs(FormItem, { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(FormLabel, { className: "text-right", children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { ...field, type: "password", placeholder: "Enter your password", className: "col-span-3" }) }), _jsx(FormMessage, {})] })) })] }) }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "Create Account" }) })] })] }));
    },
};
export const Alert = {
    render: () => (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "destructive", children: "Delete Account" }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Are you sure?" }), _jsx(DialogDescription, { children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers." })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", children: "Cancel" }), _jsx(Button, { variant: "destructive", children: "Delete Account" })] })] })] })),
};
export const Alert2 = {
    render: () => (_jsxs(Dialog, { modal: true, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { children: "Open dialog" }) }), _jsx(DialogContent, { children: _jsxs(Popover, { modal: true, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { children: "Open popover" }) }), _jsxs(PopoverContent, { children: [_jsx("div", { children: "I can't focus this input" }), _jsx(Input, { type: "text" })] })] }) })] })),
};
