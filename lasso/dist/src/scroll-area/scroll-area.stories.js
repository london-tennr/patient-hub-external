import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ScrollArea } from "./scroll-area";
const meta = {
    title: "Components/ScrollArea",
    component: ScrollArea,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx(ScrollArea, { className: "h-[200px] w-[350px] rounded-sm border p-4", children: _jsx("div", { className: "space-y-4", children: Array.from({ length: 20 }).map((_, i) => (_jsxs("div", { className: "text-sm", children: [_jsxs("p", { className: "mb-2 font-medium", children: ["Item ", i + 1] }), _jsxs("p", { className: "text-muted-foreground", children: ["This is some content for item ", i + 1, ". Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."] })] }, i))) }) })),
};
export const Horizontal = {
    render: () => (_jsx(ScrollArea, { className: "w-96 whitespace-nowrap rounded-sm border", children: _jsx("div", { className: "flex w-max space-x-4 p-4", children: Array.from({ length: 10 }).map((_, i) => (_jsxs("div", { className: "shrink-0 rounded-sm border bg-muted p-4 w-[200px]", children: [_jsxs("h3", { className: "font-medium", children: ["Card ", i + 1] }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "This is a wide card that demonstrates horizontal scrolling." })] }, i))) }) })),
};
export const WithTags = {
    render: () => {
        const tags = Array.from({ length: 50 }).map((_, i, a) => `Tag ${(i % 12) + 1}: ${a.length - i}`);
        return (_jsx(ScrollArea, { className: "h-72 w-48 rounded-sm border", children: _jsxs("div", { className: "p-4", children: [_jsx("h4", { className: "mb-4 text-sm font-medium leading-none", children: "Tags" }), tags.map((tag) => (_jsx("div", { className: "text-sm p-2 border-b", children: tag }, tag)))] }) }));
    },
};
