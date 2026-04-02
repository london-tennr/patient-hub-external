import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "./resizable";
const meta = {
    title: "Components/Resizable",
    component: ResizablePanelGroup,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-96 w-full", children: [_jsx(ResizablePanel, { defaultSize: 50, children: _jsx("div", { className: "flex h-full items-center justify-center p-6", children: _jsx("span", { className: "font-semibold", children: "Panel 1" }) }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 50, children: _jsx("div", { className: "flex h-full items-center justify-center p-6", children: _jsx("span", { className: "font-semibold", children: "Panel 2" }) }) })] })),
};
