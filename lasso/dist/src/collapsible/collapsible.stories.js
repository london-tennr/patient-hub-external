import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "../button/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "./collapsible";
const meta = {
    title: "Components/Collapsible",
    component: Collapsible,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (_jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, className: "w-[350px] space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between space-x-4 px-4", children: [_jsx("h4", { className: "text-sm font-semibold", children: "@peduarte starred 3 repositories" }), _jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "w-9 p-0", children: [_jsx(CaretDown, { weight: "light", className: `h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}` }), _jsx("span", { className: "sr-only", children: "Toggle" })] }) })] }), _jsx("div", { className: "rounded-sm border px-4 py-3 font-mono text-sm", children: "@radix-ui/primitives" }), _jsxs(CollapsibleContent, { className: "space-y-2", children: [_jsx("div", { className: "rounded-sm border px-4 py-3 font-mono text-sm", children: "@radix-ui/colors" }), _jsx("div", { className: "rounded-sm border px-4 py-3 font-mono text-sm", children: "@stitches/react" })] })] }));
    },
};
export const WithCustomTrigger = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (_jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, className: "w-[350px] space-y-2", children: [_jsxs(CollapsibleTrigger, { className: "flex items-center justify-between space-x-4 px-4 py-2 hover:bg-gray-50 rounded-sm transition-colors w-full", children: [_jsx("h4", { className: "text-sm font-semibold", children: "View more details" }), _jsx(CaretDown, { weight: "light", className: `h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}` })] }), _jsx(CollapsibleContent, { className: "space-y-2", children: _jsxs("div", { className: "rounded-sm border px-4 py-3 text-sm", children: [_jsx("p", { children: "This is additional content that can be shown or hidden." }), _jsx("p", { children: "It can contain any React elements." })] }) })] }));
    },
};
