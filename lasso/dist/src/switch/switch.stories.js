import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Switch } from "./switch";
/**
 *  TODO: Needs a style pass */
const meta = {
    title: "Components/Switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        defaultChecked: false,
    },
    render: (_args) => {
        return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "airplane-mode" }), _jsx("label", { htmlFor: "airplane-mode", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Airplane Mode" })] }));
    },
};
export const Checked = {
    args: {
        defaultChecked: true,
    },
    render: (_args) => {
        return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "notifications", defaultChecked: true }), _jsx("label", { htmlFor: "notifications", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Notifications" })] }));
    },
};
export const Disabled = {
    args: {
        disabled: true,
    },
    render: (_args) => {
        return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "disabled", disabled: true }), _jsx("label", { htmlFor: "disabled", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Disabled Switch" })] }));
    },
};
export const WithState = {
    args: {
        defaultChecked: false,
    },
    render: (_args) => {
        const [checked, setChecked] = useState(false);
        return (_jsxs("div", { className: "flex flex-col space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "state-switch", checked: checked, onCheckedChange: setChecked }), _jsx("label", { htmlFor: "state-switch", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Toggle Feature" })] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Switch is ", checked ? "enabled" : "disabled"] })] }));
    },
};
export const WithForm = {
    args: {
        defaultChecked: false,
    },
    render: (_args) => {
        const [settings, setSettings] = useState({
            notifications: false,
            darkMode: false,
            sound: true,
        });
        const toggleSetting = (key) => {
            setSettings((prev) => ({
                ...prev,
                [key]: !prev[key],
            }));
        };
        return (_jsxs("div", { className: "w-[300px] p-4 border rounded-sm space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "notifications", className: "text-sm font-medium", children: "Notifications" }), _jsx(Switch, { id: "notifications", checked: settings.notifications, onCheckedChange: () => toggleSetting("notifications") })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "dark-mode", className: "text-sm font-medium", children: "Dark Mode" }), _jsx(Switch, { id: "dark-mode", checked: settings.darkMode, onCheckedChange: () => toggleSetting("darkMode") })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "sound", className: "text-sm font-medium", children: "Sound" }), _jsx(Switch, { id: "sound", checked: settings.sound, onCheckedChange: () => toggleSetting("sound") })] })] })] }));
    },
};
