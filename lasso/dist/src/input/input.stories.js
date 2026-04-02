import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "./input";
const meta = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx("div", { className: "w-[350px]", children: _jsx(Input, { placeholder: "Enter your name" }) })),
};
export const WithLabel = {
    render: () => (_jsxs("div", { className: "w-[350px] space-y-2", children: [_jsx("label", { htmlFor: "name", className: "text-sm font-medium", children: "Name" }), _jsx(Input, { id: "name", placeholder: "Enter your name" })] })),
};
export const Disabled = {
    render: () => (_jsx("div", { className: "w-[350px]", children: _jsx(Input, { placeholder: "Disabled input", disabled: true }) })),
};
export const WithValue = {
    render: () => {
        const [value, setValue] = useState("John Doe");
        return (_jsxs("div", { className: "w-[350px] space-y-2", children: [_jsx(Input, { value: value, onChange: (e) => setValue(e.target.value), placeholder: "Enter your name" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Current value: ", value] })] }));
    },
};
export const Types = {
    render: () => (_jsxs("div", { className: "w-[350px] space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "text", className: "text-sm font-medium", children: "Text" }), _jsx(Input, { id: "text", type: "text", placeholder: "Text input" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-medium", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "Email input" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "Password input" })] })] })),
};
