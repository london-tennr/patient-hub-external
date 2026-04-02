import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../button/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "./tooltip";
const meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Hover me" }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "This is a basic tooltip" }) })] }) })),
};
export const LongText = {
    render: () => (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Hover me" }) }), _jsx(TooltipContent, { children: _jsx("p", { className: "max-w-40", children: "This is a basic tooltip with a long text to see how it wraps. This is a basic tooltip with a long text to see how it wraps. This is a basic tooltip with a long text to see how it wraps." }) })] }) })),
};
