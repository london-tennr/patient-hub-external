import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../button/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "./alert-dialog";
const meta = {
    title: "Components/Alert Dialog",
    component: AlertDialog,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (_jsxs(AlertDialog, { open: open, onOpenChange: setOpen, children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Alert Dialog" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you sure?" }), _jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { children: "Continue" })] })] })] }));
    },
};
