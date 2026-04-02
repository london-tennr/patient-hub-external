import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "./pagination";
const meta = {
    title: "Components/Pagination",
    component: Pagination,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "1" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", isActive: true, children: "2" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "3" }) }), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#" }) })] }) })),
};
export const WithEllipsis = {
    render: () => (_jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "1" }) }), _jsx(PaginationItem, { children: _jsx(PaginationEllipsis, {}) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", isActive: true, children: "4" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "5" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "6" }) }), _jsx(PaginationItem, { children: _jsx(PaginationEllipsis, {}) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "10" }) }), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#" }) })] }) })),
};
export const Simple = {
    render: () => (_jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#" }) }), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#" }) })] }) })),
};
