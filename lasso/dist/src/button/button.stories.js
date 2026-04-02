import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon as Iconify } from "@iconify/react";
import { Button } from "./button.js";
const meta = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: [
                "default",
                "destructive",
                "outline",
                "neutral",
                "secondary",
                "ghost",
                "text",
            ],
            description: "The visual style of the button",
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
            description: "The size of the button",
        },
        disabled: {
            control: "boolean",
            description: "Whether the button is disabled",
        },
        asChild: {
            control: "boolean",
            description: "Whether to render as a child component",
        },
    },
};
export default meta;
export const Default = {
    args: {
        children: "Button",
        variant: "default",
        size: "default",
    },
};
export const Destructive = {
    args: {
        children: "Delete",
        variant: "destructive",
    },
};
export const Outline = {
    args: {
        children: "Outline",
        variant: "outline",
    },
};
export const Secondary = {
    args: {
        children: "Secondary",
        variant: "secondary",
    },
};
export const Ghost = {
    args: {
        children: "Ghost",
        variant: "ghost",
    },
};
export const Neutral = {
    args: {
        children: "Neutral",
        variant: "neutral",
    },
};
export const Text = {
    args: {
        children: "Text",
        variant: "text",
    },
};
export const Small = {
    args: {
        children: "Small",
        size: "sm",
    },
};
export const Large = {
    args: {
        children: "Large",
        size: "lg",
    },
};
export const Icon = {
    args: {
        variant: "outline",
        children: _jsx(Iconify, { icon: "ph:magnifying-glass-light" }),
        size: "icon",
        "aria-label": "Search",
    },
};
export const Disabled = {
    args: {
        children: "Disabled",
        disabled: true,
    },
};
export const WithIcon = {
    args: {
        children: (_jsxs(_Fragment, { children: ["Next", _jsx(Iconify, { icon: "ph:arrow-right-light" })] })),
    },
};
export const AsLink = {
    args: {
        asChild: true,
        children: _jsx("a", { href: "#", children: "I'm a link" }),
    },
};
