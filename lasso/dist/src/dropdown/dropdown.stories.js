import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "./dropdown";
const meta = {
    title: "Components/Dropdown",
    component: DropdownMenu,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Basic = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { children: "Open Menu" }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuItem, { children: "Profile" }), _jsx(DropdownMenuItem, { children: "Settings" }), _jsx(DropdownMenuItem, { children: "Help" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "Logout" })] })] })),
};
export const WithIcons = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { children: "Open Menu" }), _jsxs(DropdownMenuContent, { children: [_jsxs(DropdownMenuItem, { children: [_jsx(Icon, { icon: "ph:user" }), "Profile"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Icon, { icon: "ph:gear" }), "Settings"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Icon, { icon: "ph:question" }), "Help"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(Icon, { icon: "ph:sign-out" }), "Logout"] })] })] })),
};
export const WithCheckboxes = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { children: "View Options" }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "View Options" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuCheckboxItem, { checked: true, children: "Show Toolbar" }), _jsx(DropdownMenuCheckboxItem, { children: "Show Statusbar" }), _jsx(DropdownMenuCheckboxItem, { checked: true, children: "Show Sidebar" })] })] })),
};
export const WithRadioGroup = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { children: "Theme" }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "Theme" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuRadioGroup, { value: "light", children: [_jsx(DropdownMenuRadioItem, { value: "light", children: "Light" }), _jsx(DropdownMenuRadioItem, { value: "dark", children: "Dark" }), _jsx(DropdownMenuRadioItem, { value: "system", children: "System" })] })] })] })),
};
export const WithSubMenu = {
    render: () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { children: "More Actions" }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuItem, { children: "Back" }), _jsx(DropdownMenuItem, { children: "Forward" }), _jsx(DropdownMenuItem, { children: "Reload" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuSub, { children: [_jsx(DropdownMenuSubTrigger, { children: "More Tools" }), _jsxs(DropdownMenuSubContent, { children: [_jsx(DropdownMenuItem, { children: "Save Page As..." }), _jsx(DropdownMenuItem, { children: "Create Shortcut..." }), _jsx(DropdownMenuItem, { children: "Developer Tools" })] })] })] })] })),
};
