import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextB, TextItalic, TextStrikethrough } from "@phosphor-icons/react";
import { Toggle } from "./toggle";
const meta = {
    title: "Components/Toggle",
    component: Toggle,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx(Toggle, { "aria-label": "Toggle bold", children: _jsx(TextB, { weight: "light" }) })),
};
export const WithText = {
    render: () => _jsx(Toggle, { children: "Subscribe" }),
};
export const Outline = {
    render: () => (_jsx(Toggle, { variant: "outline", "aria-label": "Toggle italic", children: _jsx(TextItalic, { weight: "light" }) })),
};
export const WithTextAndIcon = {
    render: () => (_jsxs(Toggle, { children: [_jsx(TextStrikethrough, { weight: "light" }), "Strikethrough"] })),
};
export const Large = {
    render: () => (_jsx(Toggle, { size: "lg", "aria-label": "Toggle bold", children: _jsx(TextB, { weight: "light" }) })),
};
export const Small = {
    render: () => (_jsx(Toggle, { size: "sm", "aria-label": "Toggle bold", children: _jsx(TextB, { weight: "light" }) })),
};
