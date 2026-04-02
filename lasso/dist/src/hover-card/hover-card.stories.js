import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar } from "@phosphor-icons/react";
import { Button } from "../button/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
const meta = {
    title: "Components/HoverCard",
    component: HoverCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(HoverCard, { children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { variant: "text", children: "@nextjs" }) }), _jsx(HoverCardContent, { className: "w-80", children: _jsx("div", { className: "flex justify-between space-x-4", children: _jsxs("div", { className: "space-y-1", children: [_jsx("h4", { className: "text-sm font-semibold", children: "@nextjs" }), _jsx("p", { className: "text-sm", children: "The React Framework \u2013 created and maintained by @vercel." }), _jsxs("div", { className: "flex items-center pt-2", children: [_jsx(Calendar, { weight: "light", className: "mr-2 h-4 w-4 opacity-70" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Joined December 2021" })] })] }) }) })] })),
};
export const WithAvatar = {
    render: () => (_jsxs(HoverCard, { children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { variant: "text", children: "@vercel" }) }), _jsx(HoverCardContent, { className: "w-80", children: _jsxs("div", { className: "flex justify-between space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center", children: _jsx("span", { className: "text-sm font-semibold", children: "V" }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("h4", { className: "text-sm font-semibold", children: "@vercel" }), _jsx("p", { className: "text-sm", children: "Develop. Preview. Ship. For the best frontend teams" }), _jsxs("div", { className: "flex items-center pt-2", children: [_jsx(Calendar, { weight: "light", className: "mr-2 h-4 w-4 opacity-70" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Joined March 2020" })] })] })] }) })] })),
};
