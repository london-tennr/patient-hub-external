import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cloud, CreditCard, Gear, Keyboard, Lifebuoy, Plus, SignOut, User, Users, } from "@phosphor-icons/react";
import { Button } from "../button/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger, } from "./dropdown-menu";
const meta = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open" }) }), _jsxs(DropdownMenuContent, { className: "w-56", children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [_jsx(User, { weight: "light" }), "Profile", _jsx(DropdownMenuShortcut, { children: "\u21E7\u2318P" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(CreditCard, { weight: "light" }), "Billing", _jsx(DropdownMenuShortcut, { children: "\u2318B" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(Gear, { weight: "light" }), "Settings", _jsx(DropdownMenuShortcut, { children: "\u2318S" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(Keyboard, { weight: "light" }), "Keyboard shortcuts", _jsx(DropdownMenuShortcut, { children: "\u2318K" })] })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [_jsx(Users, { weight: "light" }), "Team"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Plus, { weight: "light" }), "New Team", _jsx(DropdownMenuShortcut, { children: "\u2318+T" })] })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(Lifebuoy, { weight: "light" }), "Support"] }), _jsxs(DropdownMenuItem, { disabled: true, children: [_jsx(Cloud, { weight: "light" }), "API"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { variant: "destructive", children: [_jsx(SignOut, { weight: "light" }), "Log out", _jsx(DropdownMenuShortcut, { children: "\u21E7\u2318Q" })] })] })] })),
};
export const Simple = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { children: "Actions" }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuItem, { children: "Edit" }), _jsx(DropdownMenuItem, { children: "Duplicate" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { variant: "destructive", children: "Delete" })] })] })),
};
