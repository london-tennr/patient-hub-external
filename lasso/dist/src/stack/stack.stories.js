import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack } from "./stack";
const meta = {
    title: "Foundations/Stack",
    component: Stack,
    tags: ["autodocs"],
};
export default meta;
// Basic example with default props
export const Default = {
    args: {
        children: (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-blue-200 p-4", children: "Item 1" }), _jsx("div", { className: "bg-blue-200 p-4", children: "Item 2" }), _jsx("div", { className: "bg-blue-200 p-4", children: "Item 3" })] })),
    },
};
// Row direction example
export const Row = {
    args: {
        direction: "row",
        children: (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-green-200 p-4", children: "Item 1" }), _jsx("div", { className: "bg-green-200 p-4", children: "Item 2" }), _jsx("div", { className: "bg-green-200 p-4", children: "Item 3" })] })),
    },
};
// Different spacing examples
export const SpacingVariants = {
    render: () => (_jsxs(Stack, { spacing: "xl", children: [_jsxs(Stack, { spacing: "none", children: [_jsx("div", { className: "bg-red-200 p-4", children: "No Spacing" }), _jsx("div", { className: "bg-red-200 p-4", children: "No Spacing" })] }), _jsxs(Stack, { spacing: "sm", children: [_jsx("div", { className: "bg-orange-200 p-4", children: "Small Spacing" }), _jsx("div", { className: "bg-orange-200 p-4", children: "Small Spacing" })] }), _jsxs(Stack, { spacing: "base", children: [_jsx("div", { className: "bg-yellow-200 p-4", children: "Base Spacing" }), _jsx("div", { className: "bg-yellow-200 p-4", children: "Base Spacing" })] }), _jsxs(Stack, { spacing: "xl", children: [_jsx("div", { className: "bg-green-200 p-4", children: "Extra Large Spacing" }), _jsx("div", { className: "bg-green-200 p-4", children: "Extra Large Spacing" })] })] })),
};
// Alignment examples
export const Alignment = {
    render: () => (_jsxs(Stack, { spacing: "xl", children: [_jsxs(Stack, { align: "start", direction: "row", className: "h-32 bg-gray-100", children: [_jsx("div", { className: "bg-purple-200 p-4", children: "Start Aligned" }), _jsx("div", { className: "bg-purple-200 p-4", children: "Start Aligned" })] }), _jsxs(Stack, { align: "center", direction: "row", className: "h-32 bg-gray-100", children: [_jsx("div", { className: "bg-purple-200 p-4", children: "Center Aligned" }), _jsx("div", { className: "bg-purple-200 p-4", children: "Center Aligned" })] }), _jsxs(Stack, { align: "end", direction: "row", className: "h-32 bg-gray-100", children: [_jsx("div", { className: "bg-purple-200 p-4", children: "End Aligned" }), _jsx("div", { className: "bg-purple-200 p-4", children: "End Aligned" })] }), _jsxs(Stack, { align: "stretch", direction: "row", className: "h-32 bg-gray-100", children: [_jsx("div", { className: "bg-purple-200 p-4", children: "Stretch Aligned" }), _jsx("div", { className: "bg-purple-200 p-4", children: "Stretch Aligned" })] })] })),
};
// Justify examples
export const Justify = {
    render: () => (_jsxs(Stack, { spacing: "xl", children: [_jsxs(Stack, { direction: "row", justify: "start", className: "bg-gray-100", children: [_jsx("div", { className: "bg-blue-200 p-4", children: "Start" }), _jsx("div", { className: "bg-blue-200 p-4", children: "Justified" })] }), _jsxs(Stack, { direction: "row", justify: "center", className: "bg-gray-100", children: [_jsx("div", { className: "bg-blue-200 p-4", children: "Center" }), _jsx("div", { className: "bg-blue-200 p-4", children: "Justified" })] }), _jsxs(Stack, { direction: "row", justify: "end", className: "bg-gray-100", children: [_jsx("div", { className: "bg-blue-200 p-4", children: "End" }), _jsx("div", { className: "bg-blue-200 p-4", children: "Justified" })] }), _jsxs(Stack, { direction: "row", justify: "stretch", className: "bg-gray-100", children: [_jsx("div", { className: "bg-blue-200 p-4", children: "Stretch" }), _jsx("div", { className: "bg-blue-200 p-4", children: "Justified" })] })] })),
};
