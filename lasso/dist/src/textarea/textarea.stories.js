import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Label } from "../label/label";
import { Textarea } from "./textarea";
const meta = {
    title: "Components/Textarea",
    component: Textarea,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx("div", { className: "w-[350px]", children: _jsx(Textarea, { placeholder: "Enter your message" }) })),
};
export const WithLabel = {
    render: () => (_jsxs("div", { className: "w-[350px] flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "message", children: "Message" }), _jsx(Textarea, { id: "message", placeholder: "Enter your message" })] })),
};
export const Disabled = {
    render: () => (_jsx("div", { className: "w-[350px]", children: _jsx(Textarea, { placeholder: "Disabled textarea", disabled: true }) })),
};
export const WithValue = {
    render: () => {
        const [value, setValue] = useState("This is a sample message.");
        return (_jsxs("div", { className: "w-[350px] flex flex-col gap-2", children: [_jsx(Textarea, { value: value, onChange: (e) => setValue(e.target.value), placeholder: "Enter your message" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Character count: ", value.length] })] }));
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { className: "w-[350px] space-y-4", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "small", children: "Small" }), _jsx(Textarea, { id: "small", placeholder: "Small textarea", className: "min-h-[80px]" })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "medium", children: "Medium" }), _jsx(Textarea, { id: "medium", placeholder: "Medium textarea", className: "min-h-[120px]" })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { htmlFor: "large", className: "text-sm font-medium", children: "Large" }), _jsx(Textarea, { id: "large", placeholder: "Large textarea", className: "min-h-[200px]" })] })] })),
};
