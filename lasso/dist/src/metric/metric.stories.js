import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Metric, MetricGroup } from "./metric";
const meta = {
    title: "Components/Metric",
    component: Metric,
    tags: ["autodocs"],
    argTypes: {
        number: { control: "number" },
        label: { control: "text" },
        class: {
            control: "select",
            options: ["neutral", "info", "success", "warning", "error"],
        },
    },
};
export default meta;
export const Neutral = {
    args: {
        number: 12,
        label: "Missing Info",
        class: "warning",
    },
};
export const Info = {
    args: {
        number: 12,
        label: "Running Eligibility",
        class: "info",
    },
};
export const Success = {
    args: {
        number: 12,
        label: "In Qualification",
        class: "success",
    },
};
export const Error = {
    args: {
        number: 17,
        label: "Not Qualified",
        class: "neutral",
    },
};
export const Grid = {
    render: () => (_jsxs("div", { style: { display: "flex", gap: 48 }, children: [_jsx(Metric, { number: 12, label: "Missing Info", class: "warning" }), _jsx(Metric, { number: 12, label: "Running Eligibility", class: "info" }), _jsx(Metric, { number: 12, label: "In Qualification", class: "success" }), _jsx(Metric, { number: 17, label: "Not Qualified", class: "neutral" })] })),
};
export const Playground = {
    args: {
        number: 42,
        label: "Custom Metric",
        class: "info",
    },
};
export const AnimatedNumberChange = {
    render: () => {
        const numbers = [5, 12, 24, 8, 17];
        const [idx, setIdx] = useState(0);
        useEffect(() => {
            const interval = setInterval(() => {
                setIdx((i) => (i + 1) % numbers.length);
            }, 2000);
            return () => clearInterval(interval);
        }, []);
        return (_jsx(Metric, { number: numbers[idx], label: "Running Eligibility", class: "info" }));
    },
};
export const Group = {
    render: () => (_jsx("div", { className: "max-w-screen", children: _jsx(MetricGroup, { metrics: [
                { number: 5, label: "Missing Info", class: "warning" },
                { number: 2, label: "Running Eligibility", class: "info" },
                { number: 7, label: "In Qualification", class: "success" },
                { number: 1, label: "Not Qualified", class: "neutral" },
            ] }) })),
};
