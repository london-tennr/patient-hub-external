import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";
const meta = {
    title: "Components/Chart",
    component: ChartContainer,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
};
export const Default = {
    render: () => (_jsx(ChartContainer, { config: chartConfig, className: "min-h-[200px] w-[400px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "month", tickLine: false, tickMargin: 10, axisLine: false, tickFormatter: (value) => value.slice(0, 3) }), _jsx(YAxis, { tickLine: false, axisLine: false, tickMargin: 8 }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, {}) }), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)" }), _jsx(Bar, { dataKey: "mobile", fill: "var(--color-mobile)" })] }) }) })),
};
export const Simple = {
    render: () => (_jsx(ChartContainer, { config: chartConfig, className: "min-h-[150px] w-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: chartData.slice(0, 4), children: [_jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)" })] }) }) })),
};
