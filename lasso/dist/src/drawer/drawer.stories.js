import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../button/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "./drawer";
const meta = {
    title: "Components/Drawer",
    component: Drawer,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(Drawer, { direction: "right", children: [_jsx(DrawerTrigger, { asChild: true, children: _jsx(Button, { children: "Open Drawer" }) }), _jsxs(DrawerContent, { children: [_jsxs(DrawerHeader, { children: [_jsx(DrawerTitle, { children: "Title Text" }), _jsx(DrawerDescription, { children: "This is a drawer description." })] }), _jsx("div", { className: "p-4", children: _jsx("div", { className: "bg-accent/50 p-4 rounded-md text-center text-sm text-muted-foreground", children: "Slot (swap it with your content)" }) }), _jsxs(DrawerFooter, { children: [_jsx(Button, { children: "Submit" }), _jsx(DrawerClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) })] })] })] })),
};
export const WithRichContent = {
    render: () => (_jsxs(Drawer, { direction: "right", children: [_jsx(DrawerTrigger, { asChild: true, children: _jsx(Button, { children: "Open Rich Drawer" }) }), _jsxs(DrawerContent, { children: [_jsxs(DrawerHeader, { children: [_jsx(DrawerTitle, { children: "Title Text" }), _jsx(DrawerDescription, { children: "This is a drawer description." })] }), _jsxs("div", { className: "p-4 space-y-4", children: [_jsx("div", { className: "bg-accent/50 p-4 rounded-md text-center text-sm text-muted-foreground", children: "Slot (swap it with your content)" }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Name" }), _jsx("input", { className: "w-full px-3 py-2 border border-input rounded-sm bg-white text-sm", placeholder: "Placeholder" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Username" }), _jsx("input", { className: "w-full px-3 py-2 border border-input rounded-sm bg-white text-sm", placeholder: "Placeholder" })] })] }), _jsxs(DrawerFooter, { children: [_jsx(Button, { children: "Submit" }), _jsx(DrawerClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) })] })] })] })),
};
