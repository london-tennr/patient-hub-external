import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextH, TextItalic, TextUnderline } from "@phosphor-icons/react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
const meta = {
    title: "Components/ToggleGroup",
    component: ToggleGroup,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(ToggleGroup, { type: "multiple", children: [_jsx(ToggleGroupItem, { value: "bold", children: _jsx(TextH, { weight: "light" }) }), _jsx(ToggleGroupItem, { value: "italic", children: _jsx(TextItalic, { weight: "light" }) }), _jsx(ToggleGroupItem, { value: "underline", children: _jsx(TextUnderline, { weight: "light" }) })] })),
};
export const Single = {
    render: () => (_jsxs(ToggleGroup, { type: "single", defaultValue: "left", children: [_jsx(ToggleGroupItem, { value: "left", children: "Left" }), _jsx(ToggleGroupItem, { value: "center", children: "Center" }), _jsx(ToggleGroupItem, { value: "right", children: "Right" })] })),
};
export const WithText = {
    render: () => (_jsxs(ToggleGroup, { type: "multiple", children: [_jsx(ToggleGroupItem, { value: "small", children: "Small" }), _jsx(ToggleGroupItem, { value: "medium", children: "Medium" }), _jsx(ToggleGroupItem, { value: "large", children: "Large" })] })),
};
export const Outline = {
    render: () => (_jsxs(ToggleGroup, { type: "single", variant: "outline", children: [_jsx(ToggleGroupItem, { value: "draft", children: "Draft" }), _jsx(ToggleGroupItem, { value: "published", children: "Published" }), _jsx(ToggleGroupItem, { value: "archived", children: "Archived" })] })),
};
export const WithManyOptions = {
    render: () => (_jsxs(ToggleGroup, { type: "single", className: "max-w-sm", spacing: 2, children: [_jsx(ToggleGroupItem, { value: "one", children: "One" }), _jsx(ToggleGroupItem, { value: "two", children: "Two" }), _jsx(ToggleGroupItem, { value: "three", children: "Three" }), _jsx(ToggleGroupItem, { value: "four", children: "Four" }), _jsx(ToggleGroupItem, { value: "five", children: "Five" }), _jsx(ToggleGroupItem, { value: "six", children: "Six" }), _jsx(ToggleGroupItem, { value: "seven", children: "Seven" }), _jsx(ToggleGroupItem, { value: "eight", children: "Eight" }), _jsx(ToggleGroupItem, { value: "nine", children: "Nine" }), _jsx(ToggleGroupItem, { value: "ten", children: "Ten" }), _jsx(ToggleGroupItem, { value: "eleven", children: "Eleven" }), _jsx(ToggleGroupItem, { value: "twelve", children: "Twelve" }), _jsx(ToggleGroupItem, { value: "thirteen", children: "Thirteen" }), _jsx(ToggleGroupItem, { value: "fourteen", children: "Fourteen" }), _jsx(ToggleGroupItem, { value: "fifteen", children: "Fifteen" }), _jsx(ToggleGroupItem, { value: "sixteen", children: "Sixteen" }), _jsx(ToggleGroupItem, { value: "seventeen", children: "Seventeen" }), _jsx(ToggleGroupItem, { value: "eighteen", children: "Eighteen" }), _jsx(ToggleGroupItem, { value: "nineteen", children: "Nineteen" }), _jsx(ToggleGroupItem, { value: "twenty", children: "Twenty" })] })),
};
