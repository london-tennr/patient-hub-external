import { jsx as _jsx } from "react/jsx-runtime";
import { Slider } from "./slider";
const meta = {
    title: "Components/Slider",
    component: Slider,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx("div", { className: "w-[300px]", children: _jsx(Slider, { defaultValue: [33], max: 100, step: 1 }) })),
};
export const Range = {
    render: () => (_jsx("div", { className: "w-[300px]", children: _jsx(Slider, { defaultValue: [20, 80], max: 100, step: 1 }) })),
};
export const WithStep = {
    render: () => (_jsx("div", { className: "w-[300px]", children: _jsx(Slider, { defaultValue: [50], max: 100, step: 10 }) })),
};
export const Disabled = {
    render: () => (_jsx("div", { className: "w-[300px]", children: _jsx(Slider, { defaultValue: [50], max: 100, step: 1, disabled: true }) })),
};
export const Vertical = {
    render: () => (_jsx("div", { className: "h-[200px]", children: _jsx(Slider, { defaultValue: [33], max: 100, step: 1, orientation: "vertical" }) })),
};
