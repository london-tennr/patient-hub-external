import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Copy, CreditCard, Gear, Keyboard, User } from "@phosphor-icons/react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger, } from "./context-menu";
const meta = {
    title: "Components/ContextMenu",
    component: ContextMenu,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { className: "flex h-[150px] w-[300px] items-center justify-center rounded-sm border border-dashed text-sm", children: "Right click here" }), _jsxs(ContextMenuContent, { className: "w-64", children: [_jsxs(ContextMenuItem, { inset: true, children: ["Back", _jsx(ContextMenuShortcut, { children: "\u2318[" })] }), _jsxs(ContextMenuItem, { inset: true, disabled: true, children: ["Forward", _jsx(ContextMenuShortcut, { children: "\u2318]" })] }), _jsxs(ContextMenuItem, { inset: true, children: ["Reload", _jsx(ContextMenuShortcut, { children: "\u2318R" })] }), _jsx(ContextMenuSeparator, {}), _jsx(ContextMenuItem, { inset: true, children: "More Tools" }), _jsx(ContextMenuSeparator, {}), _jsxs(ContextMenuItem, { children: [_jsx(User, { weight: "light" }), "Profile", _jsx(ContextMenuShortcut, { children: "\u21E7\u2318P" })] }), _jsxs(ContextMenuItem, { children: [_jsx(CreditCard, { weight: "light" }), "Billing", _jsx(ContextMenuShortcut, { children: "\u2318B" })] }), _jsxs(ContextMenuItem, { children: [_jsx(Gear, { weight: "light" }), "Settings", _jsx(ContextMenuShortcut, { children: "\u2318S" })] }), _jsxs(ContextMenuItem, { children: [_jsx(Keyboard, { weight: "light" }), "Keyboard shortcuts", _jsx(ContextMenuShortcut, { children: "\u2318K" })] })] })] })),
};
export const WithSelection = {
    render: () => (_jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { className: "flex h-[100px] w-[250px] items-center justify-center rounded-sm border text-sm", children: "Right click on this text" }), _jsxs(ContextMenuContent, { children: [_jsxs(ContextMenuItem, { children: [_jsx(Copy, { weight: "light" }), "Copy", _jsx(ContextMenuShortcut, { children: "\u2318C" })] }), _jsx(ContextMenuItem, { children: "Cut" }), _jsx(ContextMenuItem, { children: "Paste" }), _jsx(ContextMenuSeparator, {}), _jsx(ContextMenuItem, { children: "Select All" })] })] })),
};
