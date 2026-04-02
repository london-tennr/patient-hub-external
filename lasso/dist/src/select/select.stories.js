import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Gear, Laptop, User } from "@phosphor-icons/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./select";
const meta = {
    title: "Components/Select",
    component: Select,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            control: "boolean",
            description: "Whether the select is disabled",
        },
    },
};
export default meta;
export const Default = {
    render: () => (_jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select a fruit" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "apple", children: "Apple" }), _jsx(SelectItem, { value: "banana", children: "Banana" }), _jsx(SelectItem, { value: "blueberry", children: "Blueberry" }), _jsx(SelectItem, { value: "grapes", children: "Grapes" }), _jsx(SelectItem, { value: "pineapple", children: "Pineapple" })] })] })),
};
export const WithIcons = {
    render: () => (_jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select a tool" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "user", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(User, { className: "size-4", weight: "light" }), "User Management"] }) }), _jsx(SelectItem, { value: "settings", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Gear, { className: "size-4", weight: "light" }), "Settings"] }) }), _jsx(SelectItem, { value: "devices", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Laptop, { className: "size-4", weight: "light" }), "Devices"] }) })] })] })),
};
export const Small = {
    render: () => (_jsxs(Select, { children: [_jsx(SelectTrigger, { size: "sm", className: "w-[140px]", children: _jsx(SelectValue, { placeholder: "Size" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "xs", children: "Extra Small" }), _jsx(SelectItem, { value: "sm", children: "Small" }), _jsx(SelectItem, { value: "md", children: "Medium" }), _jsx(SelectItem, { value: "lg", children: "Large" }), _jsx(SelectItem, { value: "xl", children: "Extra Large" })] })] })),
};
export const Disabled = {
    render: () => (_jsxs(Select, { disabled: true, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Disabled select" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "item1", children: "Item 1" }), _jsx(SelectItem, { value: "item2", children: "Item 2" })] })] })),
};
