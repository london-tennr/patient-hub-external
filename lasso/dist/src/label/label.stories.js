import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../checkbox/checkbox.js";
import { Input } from "../input/input.js";
import { Label } from "./label.js";
const meta = {
    title: "Components/Label",
    component: Label,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        children: "Email",
    },
};
export const WithInput = {
    args: {
        children: "Username",
    },
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-160 items-center gap-1.5", children: [_jsx(Label, { htmlFor: "username", ...args }), _jsx(Input, { type: "text", id: "username", placeholder: "Enter your username" })] })),
};
export const WithCheckbox = {
    args: {
        children: "Accept terms and conditions",
    },
    render: (args) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms" }), _jsx(Label, { htmlFor: "terms", ...args })] })),
};
/**
 * Note that the `<Input />` component has a `peer` class that lets the label know where its disabled state comes from.
 * The `peer` marker only works on previous siblings due to [CSS Limitations](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator).
 */
export const Disabled = {
    args: {
        children: "Disabled Label",
    },
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-160 items-center gap-2", children: [_jsx(Label, { htmlFor: "disabled-input", ...args }), _jsx(Input, { type: "text", className: "peer", id: "disabled-input", disabled: true, placeholder: "This input is disabled" })] })),
};
