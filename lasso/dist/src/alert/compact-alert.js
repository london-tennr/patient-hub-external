import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Button } from "../button/button";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
import { variantIcons } from "./alert-styles";
const CompactAlertContext = React.createContext(null);
const compactAlertIconVariants = cva("rounded-full size-7 p-1.5 shrink-0", {
    variants: {
        variant: {
            success: "bg-[#30A46C] text-white",
            warning: "bg-[#FFC53D]",
            info: "bg-[#ACD8FC]",
            error: "bg-[#E54D2E] text-white",
            ai: "bg-[#8e4ec6] text-white",
        },
    },
});
/**
 * CompactAlert Component
 *
 * A compact-style alert with an icon badge and content in a single row.
 * Use this variant for subtle alerts that need a shadow but minimal visual weight.
 * @see [Lasso Alert README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/alert/README.md)
 *
 * @example
 * ```tsx
 * <CompactAlert variant="success" onClose={() => handleClose()}>
 *   <CompactAlertContent>File uploaded successfully.</CompactAlertContent>
 * </CompactAlert>
 * ```
 *
 * @param variant - The visual style of the alert (success, warning, info, error, ai)
 * @param onClose - Optional callback when close button is clicked. Shows close button when provided.
 * @param className - Additional CSS classes
 * @param children - The content (typically CompactAlertContent)
 */
function CompactAlert({ className, variant, children, onClose, ...props }) {
    return (_jsx(CompactAlertContext.Provider, { value: { variant, onClose }, children: _jsx("div", { className: "mx-0.5", children: _jsx("div", { "data-slot": "alert", role: "alert", className: cn("relative w-full rounded-md overflow-hidden flex flex-col shadow-card", className), ...props, children: children }) }) }));
}
/**
 * CompactAlertContent - The content area of a CompactAlert with icon badge
 *
 * Displays the alert content with a circular icon badge.
 * Must be used as a child of the CompactAlert component.
 *
 * @param iconName - Optional custom icon (Iconify format). Defaults to variant-specific icon.
 * @param className - Additional CSS classes
 * @param children - The content to display
 */
function CompactAlertContent({ className, iconName, children, ...props }) {
    const context = React.useContext(CompactAlertContext);
    if (!context) {
        throw new Error("CompactAlertContent must be used within a CompactAlert component");
    }
    const { variant, onClose } = context;
    const defaultIcon = variantIcons[variant];
    const iconToRender = iconName || defaultIcon;
    return (_jsx("div", { className: cn("flex items-center justify-between py-3 px-4 w-full shrink-0", className), ...props, children: _jsxs("div", { className: "flex flex-row items-center justify-between w-full gap-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [iconToRender && (_jsx("div", { className: cn(compactAlertIconVariants({ variant }), "flex items-center justify-center"), children: _jsx(Icon, { icon: iconToRender, className: "size-4 shrink-0" }) })), _jsx(Text, { as: "div", variant: "base-sm", className: "min-h-7 flex items-center", children: children })] }), onClose && (_jsx(Button, { variant: "ghost", size: "icon", className: "hover:bg-black/10 shrink-0 w-6 h-6 self-start text-inherit hover:text-inherit", onClick: onClose, children: _jsx(Icon, { icon: "ph:x" }) }))] }) }));
}
export { CompactAlert, CompactAlertContent };
