import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { Badge } from "./badge";
const meta = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        children: "Default Badge",
    },
};
export const Primary = {
    args: {
        variant: "primary",
        children: "Primary Badge",
    },
};
export const Secondary = {
    args: {
        variant: "secondary",
        children: "Secondary Badge",
    },
};
export const Outline = {
    args: {
        variant: "outline",
        children: "Outline Badge",
    },
};
export const Success = {
    args: {
        variant: "success",
        children: "Success Badge",
    },
};
export const Warning = {
    args: {
        variant: "warning",
        children: "Warning Badge",
    },
};
export const Destructive = {
    args: {
        variant: "destructive",
        children: "Destructive Badge",
    },
};
export const Info = {
    args: {
        variant: "info",
        children: "Info Badge",
    },
};
export const WithIcon = {
    args: {
        children: (_jsxs(_Fragment, { children: [_jsx(Icon, { icon: "ph:bell" }), "New Feature"] })),
    },
};
export const AsLink = {
    args: {
        asChild: true,
        children: _jsx("a", { href: "#", children: "Link Badge" }),
    },
};
