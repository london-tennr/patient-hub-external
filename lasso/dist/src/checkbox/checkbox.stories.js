import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Checkbox } from "./checkbox";
const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms" }), _jsx("label", { htmlFor: "terms", className: "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Accept terms and conditions" })] })),
};
export const Checked = {
    render: () => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms", defaultChecked: true }), _jsx("label", { htmlFor: "terms", className: "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Accept terms and conditions" })] })),
};
export const Disabled = {
    render: () => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms", disabled: true }), _jsx("label", { htmlFor: "terms", className: "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Accept terms and conditions" })] })),
};
export const WithState = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (_jsxs("div", { className: "flex flex-col space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms", checked: checked, onCheckedChange: (checked) => setChecked(checked) }), _jsx("label", { htmlFor: "terms", className: "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Accept terms and conditions" })] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Checkbox is ", checked ? "checked" : "unchecked"] })] }));
    },
};
