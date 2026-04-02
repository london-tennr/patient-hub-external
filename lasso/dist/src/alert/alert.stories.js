import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../button/button";
import { Alert, AlertContent, AlertHeader } from "./alert";
import { CompactAlert, CompactAlertContent } from "./compact-alert";
import { InlineAlert, InlineAlertContent } from "./inline-alert";
const meta = {
    title: "Components/Alert",
    tags: ["autodocs"],
};
export default meta;
const ALERT_VARIANTS = [
    "success",
    "warning",
    "info",
    "error",
    "ai",
];
const VARIANT_LABELS = {
    success: "Success",
    warning: "Warning",
    info: "Info",
    error: "Error",
    ai: "AI",
};
function AlertShowcaseComponent() {
    return (_jsxs("div", { className: "flex flex-col gap-6 max-w-full", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("div", { className: "text-sm font-medium", children: "All variants" }), _jsx("div", { className: "flex flex-col gap-3", children: ALERT_VARIANTS.map((variant) => (_jsxs(Alert, { variant: variant, children: [_jsx(AlertHeader, { children: VARIANT_LABELS[variant] }), _jsxs(AlertContent, { children: ["This is a ", VARIANT_LABELS[variant].toLowerCase(), " alert."] })] }, variant))) })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("div", { className: "text-sm font-medium", children: "All variants (with close)" }), _jsx("div", { className: "flex flex-col gap-3", children: ALERT_VARIANTS.map((variant) => (_jsxs(Alert, { variant: variant, onClose: () => { }, children: [_jsx(AlertHeader, { children: VARIANT_LABELS[variant] }), _jsxs(AlertContent, { children: ["This is a ", VARIANT_LABELS[variant].toLowerCase(), " alert."] })] }, `${variant}-close`))) })] })] }));
}
function CompactAlertShowcase() {
    return (_jsxs("div", { className: "flex flex-col gap-6 max-w-full", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("div", { className: "text-sm font-medium", children: "All variants" }), _jsx("div", { className: "flex flex-col gap-3", children: ALERT_VARIANTS.map((variant) => (_jsx(CompactAlert, { variant: variant, children: _jsxs(CompactAlertContent, { children: [VARIANT_LABELS[variant], ": This is a", " ", VARIANT_LABELS[variant].toLowerCase(), " alert."] }) }, variant))) })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("div", { className: "text-sm font-medium", children: "All variants (with close)" }), _jsx("div", { className: "flex flex-col gap-3", children: ALERT_VARIANTS.map((variant) => (_jsx(CompactAlert, { variant: variant, onClose: () => { }, children: _jsxs(CompactAlertContent, { children: [VARIANT_LABELS[variant], ": This is a", " ", VARIANT_LABELS[variant].toLowerCase(), " alert."] }) }, `${variant}-close`))) })] })] }));
}
function InlineAlertShowcase() {
    return (_jsxs("div", { className: "flex flex-col gap-6 max-w-full", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("div", { className: "text-sm font-medium", children: "All variants" }), _jsx("div", { className: "flex flex-col gap-3", children: ALERT_VARIANTS.map((variant) => (_jsx(InlineAlert, { variant: variant, children: _jsxs(InlineAlertContent, { children: [VARIANT_LABELS[variant], ": This is a", " ", VARIANT_LABELS[variant].toLowerCase(), " alert."] }) }, variant))) })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("div", { className: "text-sm font-medium", children: "All variants (with close)" }), _jsx("div", { className: "flex flex-col gap-3", children: ALERT_VARIANTS.map((variant) => (_jsx(InlineAlert, { variant: variant, onClose: () => { }, children: _jsxs(InlineAlertContent, { children: [VARIANT_LABELS[variant], ": This is a", " ", VARIANT_LABELS[variant].toLowerCase(), " alert."] }) }, `${variant}-close`))) })] })] }));
}
export const AlertShowcase = {
    render: () => _jsx(AlertShowcaseComponent, {}),
};
export const CompactShowcase = {
    render: () => _jsx(CompactAlertShowcase, {}),
};
export const InlineShowcase = {
    render: () => _jsx(InlineAlertShowcase, {}),
};
export const AlertMultlineContent = {
    render: () => (_jsx("div", { className: "w-full", children: _jsxs(Alert, { variant: "warning", onClose: () => { }, children: [_jsx(AlertHeader, { children: "The patient has been flagged for manual review" }), _jsxs(AlertContent, { className: "flex flex-col gap-2", children: [_jsxs("div", { children: [_jsx("span", { children: "Acme Health PPO (High)" }), _jsxs("ul", { className: "list-disc", children: [_jsx("li", { className: "list-inside indent-2", children: "Coverage could not be confirmed automatically." }), _jsx("li", { className: "list-inside indent-2", children: "Member ID format looks unusual\u2014double-check before submitting." })] })] }), _jsxs("div", { children: [_jsx("span", { children: "Blue River HMO (Medium)" }), _jsxs("ul", { className: "list-disc", children: [_jsx("li", { className: "list-inside indent-2", children: "Plan name mismatch between eligibility response and intake." }), _jsx("li", { className: "list-inside indent-2", children: "Patient DOB returned a partial match\u2014verify in portal." })] })] })] })] }) })),
};
export const AlertOverflowHeader = {
    render: () => (_jsxs(Alert, { variant: "warning", onClose: () => { }, className: "w-full max-w-md", children: [_jsx(AlertHeader, { children: "This is a very long header text that should wrap to multiple lines when the container is narrow enough to cause overflow" }), _jsx(AlertContent, { children: "The header above demonstrates how the alert handles long titles that need to wrap." })] })),
};
export const AlertRichContent = {
    render: () => (_jsxs(Alert, { variant: "info", onClose: () => { }, className: "w-full max-w-md", children: [_jsx(AlertHeader, { children: "This patient has multiple insurances" }), _jsxs(AlertContent, { className: "flex flex-col gap-2 items-start", children: [_jsx("p", { children: "This patient has multiple insurances\u2014be sure to check they qualify for benefits on this. Keep in mind that this is a long message to demonstrate wrapping." }), _jsx(Button, { variant: "outline", size: "sm", children: "See more" })] })] })),
};
export const CompactMultilineContent = {
    render: () => (_jsx(CompactAlert, { variant: "info", className: "w-full max-w-xl", children: _jsx(CompactAlertContent, { children: "This is a compact info alert with a longer message to demonstrate wrapping and spacing. It should span multiple lines in narrower containers without breaking the layout. Here's a final sentence to make it about four lines." }) })),
};
export const InlineMultilineContent = {
    render: () => (_jsx(InlineAlert, { variant: "info", onClose: () => { }, className: "w-full max-w-md", children: _jsx(InlineAlertContent, { children: "This is an inline info alert with a longer message to demonstrate text wrapping. It should wrap cleanly across multiple lines while keeping the icon and close button aligned nicely." }) })),
};
