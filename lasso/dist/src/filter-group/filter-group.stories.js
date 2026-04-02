import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FilterGroup, } from "./filter-group";
const meta = {
    title: "Components/FilterGroup",
    component: FilterGroup,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
};
export default meta;
const projectFilters = [
    {
        id: "assignee",
        label: "Assignee",
        variant: "command",
        childVariant: "command",
        values: [
            { id: "john", label: "John Doe" },
            { id: "jane", label: "Jane Smith" },
            { id: "bob", label: "Bob Johnson" },
            { id: "alice", label: "Alice Williams" },
        ],
    },
    {
        id: "priority",
        label: "Priority",
        variant: "command",
        childVariant: "command",
        values: [
            { id: "high", label: "High" },
            { id: "medium", label: "Medium" },
            { id: "low", label: "Low" },
        ],
    },
    {
        id: "tags",
        label: "Tags",
        variant: "command",
        childVariant: "checkbox",
        values: [
            { id: "bug", label: "Bug" },
            { id: "feature", label: "Feature" },
            { id: "enhancement", label: "Enhancement" },
            { id: "documentation", label: "Documentation" },
        ],
    },
    {
        id: "age",
        label: "Age",
        variant: "slider",
        childVariant: "slider",
        values: [],
        min: 18,
        max: 100,
        step: 1,
    },
];
const simpleFilters = [
    {
        id: "status",
        label: "Status",
        variant: "command",
        childVariant: "command",
        values: [
            { id: "active", label: "Active" },
            { id: "inactive", label: "Inactive" },
        ],
    },
    {
        id: "type",
        label: "Type",
        variant: "command",
        childVariant: "command",
        values: [
            { id: "personal", label: "Personal" },
            { id: "business", label: "Business" },
        ],
    },
];
function FilterGroupWithState({ filters }) {
    const [state, setState] = useState([]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(FilterGroup, { filters: filters, state: state, onChange: setState }), _jsxs("div", { className: "mt-8", children: [_jsx("h4", { className: "text-sm font-medium mb-2 text-muted-foreground", children: "Current Filter State" }), _jsx("pre", { className: "bg-muted p-4 rounded-lg text-sm overflow-auto", children: JSON.stringify(state, null, 2) })] })] }));
}
export const ProjectFilters = {
    render: () => _jsx(FilterGroupWithState, { filters: projectFilters }),
    parameters: {
        docs: {
            description: {
                story: "A project management filter with command (single-select) and checkbox (multi-select) variants.",
            },
        },
    },
};
export const SimpleFilters = {
    render: () => _jsx(FilterGroupWithState, { filters: simpleFilters }),
    parameters: {
        docs: {
            description: {
                story: "A simple filter group with two command (single-select) filters.",
            },
        },
    },
};
export const PrePopulated = {
    render: () => {
        const [state, setState] = useState([
            { id: "1", filterId: "assignee", value: "jane" },
            { id: "2", filterId: "priority", value: "high" },
            { id: "3", filterId: "tags", value: ["bug", "feature"] },
        ]);
        return (_jsxs("div", { className: "space-y-6", children: [_jsx(FilterGroup, { filters: projectFilters, state: state, onChange: setState }), _jsxs("div", { className: "mt-8", children: [_jsx("h4", { className: "text-sm font-medium mb-2 text-muted-foreground", children: "Current Filter State" }), _jsx("pre", { className: "bg-muted p-4 rounded-lg text-sm overflow-auto", children: JSON.stringify(state, null, 2) })] })] }));
    },
    parameters: {
        docs: {
            description: {
                story: "Filter group with pre-populated values to demonstrate the initial state.",
            },
        },
    },
};
export const MultipleInstancesSameFilter = {
    render: () => {
        const [state, setState] = useState([
            { id: "1", filterId: "tags", value: ["bug"] },
            { id: "2", filterId: "tags", value: ["feature"] },
            { id: "3", filterId: "priority", value: "high" },
        ]);
        return (_jsxs("div", { className: "space-y-6", children: [_jsx(FilterGroup, { filters: projectFilters, state: state, onChange: setState }), _jsxs("div", { className: "mt-8", children: [_jsx("h4", { className: "text-sm font-medium mb-2 text-muted-foreground", children: "Current Filter State" }), _jsx("pre", { className: "bg-muted p-4 rounded-lg text-sm overflow-auto", children: JSON.stringify(state, null, 2) })] })] }));
    },
    parameters: {
        docs: {
            description: {
                story: "Demonstrates using the same filter category multiple times (e.g., two Tags filters).",
            },
        },
    },
};
export const WithSlider = {
    render: () => {
        const [state, setState] = useState([
            { id: "1", filterId: "age", value: [25, 65] },
        ]);
        return (_jsxs("div", { className: "space-y-6", children: [_jsx(FilterGroup, { filters: projectFilters, state: state, onChange: setState }), _jsxs("div", { className: "mt-8", children: [_jsx("h4", { className: "text-sm font-medium mb-2 text-muted-foreground", children: "Current Filter State" }), _jsx("pre", { className: "bg-muted p-4 rounded-lg text-sm overflow-auto", children: JSON.stringify(state, null, 2) })] })] }));
    },
    parameters: {
        docs: {
            description: {
                story: "Demonstrates the slider variant for range-based filtering (e.g., age range 25-65).",
            },
        },
    },
};
export const Empty = {
    render: () => _jsx(FilterGroupWithState, { filters: [] }),
    parameters: {
        docs: {
            description: {
                story: "Empty filter group with no filters available.",
            },
        },
    },
};
