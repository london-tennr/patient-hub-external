import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../button/button";
import { toast, Toaster } from "./toast.js";
const meta = {
    title: "Components/Toast",
    component: Toaster,
    tags: ["autodocs"],
    argTypes: {
        position: {
            control: "select",
            options: [
                "top-left",
                "top-center",
                "top-right",
                "bottom-left",
                "bottom-center",
                "bottom-right",
            ],
            description: "Position of the toast notifications",
            defaultValue: "bottom-right",
        },
        theme: {
            control: "select",
            options: ["light", "dark", "system"],
            description: "Theme for the toast notifications",
        },
        closeButton: {
            control: "boolean",
            description: "Whether to show close button on toasts",
        },
        duration: {
            control: "number",
            description: "Duration in milliseconds before toast auto-dismisses",
        },
    },
};
export default meta;
export const Default = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast("This is a default toast notification"), variant: "outline", children: "Show Default Toast" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
        theme: "system",
        richColors: false,
        closeButton: true,
        duration: 4000,
    },
};
export const Success = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast.success("Success! Your action was completed successfully."), variant: "outline", children: "Show Success Toast" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
    },
};
export const Error = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast.error("Error! Something went wrong. Please try again."), variant: "outline", children: "Show Error Toast" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
    },
};
export const Warning = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast.warning("Warning! Please review your input before proceeding."), variant: "outline", children: "Show Warning Toast" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
    },
};
export const Info = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast.info("Info: Here's some helpful information for you."), variant: "outline", children: "Show Info Toast" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
    },
};
export const IndefiniteDuration = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast("This toast will stay visible indefinitely for debugging", {
                    duration: Infinity,
                }), variant: "outline", children: "Show Indefinite Toast" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
        richColors: true,
    },
};
export const CustomDuration = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast("This toast will stay visible for 10 seconds", {
                    duration: 10000,
                }), variant: "outline", children: "Show 10s Toast" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "top-center",
        duration: 10000,
    },
};
export const BottomPosition = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast("Toast appearing at the bottom center"), variant: "outline", children: "Show Bottom Toast" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-center",
    },
};
export const WithAction = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast("Action required", {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo clicked"),
                    },
                }), variant: "outline", children: "Show Toast with Action" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
    },
};
export const WithDescription = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => toast("File uploaded", {
                    description: "Your file has been successfully uploaded to the server.",
                }), variant: "outline", children: "Show Toast with Description" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
    },
};
export const MultipleToasts = {
    render: (args) => (_jsxs("div", { style: { minHeight: "400px", width: "100%" }, children: [_jsx(Button, { onClick: () => {
                    toast.success("First toast");
                    setTimeout(() => toast.error("Second toast"), 500);
                    setTimeout(() => toast.warning("Third toast"), 1000);
                    setTimeout(() => toast.info("Fourth toast"), 1500);
                }, variant: "outline", children: "Show Multiple Toasts" }), _jsx(Toaster, { ...args })] })),
    args: {
        position: "bottom-right",
    },
};
