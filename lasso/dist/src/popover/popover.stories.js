import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { Label } from "../label/label";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger, } from "./popover";
const meta = {
    title: "Components/Popover",
    component: Popover,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {},
    render: () => (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Popover" }) }), _jsx(PopoverContent, { children: _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "mono-medium", children: "Dimensions" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Set the dimensions for the layer." })] }), _jsxs("div", { className: "grid gap-2", children: [_jsxs("div", { className: "grid grid-cols-3 items-center gap-4", children: [_jsx(Label, { htmlFor: "width", className: "text-sm mono-medium", children: "Width" }), _jsx(Input, { id: "width", defaultValue: "100%", className: "col-span-2" })] }), _jsxs("div", { className: "grid grid-cols-3 items-center gap-4", children: [_jsx(Label, { htmlFor: "maxWidth", className: "text-sm mono-medium", children: "Max. width" }), _jsx(Input, { id: "maxWidth", defaultValue: "300px", className: "col-span-2" })] }), _jsxs("div", { className: "grid grid-cols-3 items-center gap-4", children: [_jsx(Label, { htmlFor: "height", className: "text-sm font-medium", children: "Height" }), _jsx(Input, { id: "height", defaultValue: "25px", className: "col-span-2" })] }), _jsxs("div", { className: "grid grid-cols-3 items-center gap-4", children: [_jsx(Label, { htmlFor: "maxHeight", className: "text-sm font-medium", children: "Max. height" }), _jsx(Input, { id: "maxHeight", defaultValue: "none", className: "col-span-2" })] })] })] }) })] })),
};
export const WithActions = {
    args: {},
    render: () => (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Menu" }) }), _jsx(PopoverContent, { className: "w-80", children: _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium leading-none", children: "Account Settings" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your account settings and preferences." })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(PopoverClose, { asChild: true, children: _jsx(Button, { variant: "outline", className: "justify-start", children: "Profile" }) }), _jsx(PopoverClose, { asChild: true, children: _jsx(Button, { variant: "outline", className: "justify-start", children: "Billing" }) }), _jsx(PopoverClose, { asChild: true, children: _jsx(Button, { variant: "outline", className: "justify-start", children: "Settings" }) }), _jsx(PopoverClose, { asChild: true, children: _jsx(Button, { variant: "destructive", className: "justify-start", children: "Logout" }) })] })] }) })] })),
};
