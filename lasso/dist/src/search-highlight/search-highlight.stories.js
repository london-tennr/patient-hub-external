import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { SearchHighlight } from "./search-highlight";
const meta = {
    title: "Components/SearchHighlight",
    component: SearchHighlight,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        scrollableContainer: { current: null },
        searchableContentContainer: { current: null },
        placeholder: "Search",
    },
};
export default meta;
export const Default = {
    args: {},
    render: () => {
        const containerRef = useRef(null);
        const sample = `The quick brown fox jumps over the lazy dog.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nFoxes are quick and clever. Dogs can be lazy or lively.`;
        return (_jsx("div", { style: { width: 800 }, children: _jsxs("div", { ref: containerRef, className: "max-h-[240px] overflow-y-auto", children: [_jsx(SearchHighlight, { scrollableContainer: containerRef }), _jsxs("div", { className: "px-4", children: [sample, " ", sample, " ", sample, " ", sample, " ", sample, " ", sample, " ", sample, sample, " ", sample, " ", sample, " ", sample, " ", sample, " ", sample, " ", sample] })] }) }));
    },
};
