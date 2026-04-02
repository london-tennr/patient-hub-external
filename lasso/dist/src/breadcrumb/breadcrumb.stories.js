import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Folder, House } from "@phosphor-icons/react";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "./breadcrumb";
const meta = {
    title: "Components/Breadcrumb",
    component: Breadcrumb,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "/", children: "Home" }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "/components", children: "Components" }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { children: "Breadcrumb" }) })] }) })),
};
export const WithIcons = {
    render: () => (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsxs(BreadcrumbLink, { href: "/", className: "flex items-center gap-2", children: [_jsx(House, { className: "size-4", weight: "light" }), "Home"] }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsxs(BreadcrumbLink, { href: "/docs", className: "flex items-center gap-2", children: [_jsx(Folder, { className: "size-4", weight: "light" }), "Documentation"] }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { children: "Breadcrumb" }) })] }) })),
};
export const WithEllipsis = {
    render: () => (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "/", children: "Home" }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbEllipsis, {}) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "/docs", children: "Components" }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { children: "Breadcrumb" }) })] }) })),
};
