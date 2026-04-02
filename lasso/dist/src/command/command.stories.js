import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, } from "./command";
const meta = {
    title: "Components/Command",
    component: Command,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Type a command or search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No results found." }), _jsxs(CommandGroup, { heading: "Suggestions", children: [_jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:calendar" }), _jsx("span", { children: "Calendar" })] }), _jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:chart-line" }), _jsx("span", { children: "Analytics" })] }), _jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:gear" }), _jsx("span", { children: "Settings" })] })] }), _jsx(CommandSeparator, {}), _jsxs(CommandGroup, { heading: "Settings", children: [_jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:user" }), _jsx("span", { children: "Profile" }), _jsx(CommandShortcut, { children: "\u2318P" })] }), _jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:bell" }), _jsx("span", { children: "Notifications" }), _jsx(CommandShortcut, { children: "\u2318N" })] })] })] })] })),
};
export const Dialog = {
    render: () => {
        const [open, setOpen] = useState(false);
        useEffect(() => {
            const down = (e) => {
                if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    setOpen((open) => !open);
                }
            };
            document.addEventListener("keydown", down);
            return () => document.removeEventListener("keydown", down);
        }, []);
        return (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Press", " ", _jsxs("kbd", { className: "ml-1 pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded-sm border border-btn-outline bg-secondary px-2 font-mono text-xs font-medium text-neutral-11 opacity-100", children: [_jsx("span", { className: "text-xs", children: "\u2318" }), "J"] })] }), _jsxs(CommandDialog, { open: open, onOpenChange: setOpen, children: [_jsx(CommandInput, { placeholder: "Type a command or search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No results found." }), _jsxs(CommandGroup, { heading: "Suggestions", children: [_jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:calendar" }), _jsx("span", { children: "Calendar" })] }), _jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:chart-line" }), _jsx("span", { children: "Analytics" })] })] })] })] })] }));
    },
};
export const WithShortcuts = {
    render: () => (_jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Type a command or search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No results found." }), _jsxs(CommandGroup, { heading: "Navigation", children: [_jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:house" }), _jsx("span", { children: "Home" }), _jsx(CommandShortcut, { children: "\u2318H" })] }), _jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:book" }), _jsx("span", { children: "Documentation" }), _jsx(CommandShortcut, { children: "\u2318D" })] }), _jsxs(CommandItem, { children: [_jsx(Icon, { icon: "ph:gear" }), _jsx("span", { children: "Settings" }), _jsx(CommandShortcut, { children: "\u2318S" })] })] })] })] })),
};
