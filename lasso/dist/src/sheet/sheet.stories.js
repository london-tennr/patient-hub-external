import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../button/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "./sheet";
const BasicSheetStory = () => (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { children: "Open Sheet" }) }), _jsxs(SheetContent, { side: "right", children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Sheet Title" }), _jsx(SheetDescription, { children: "This is a basic sheet example." })] }), _jsx("p", { children: "Sheet content goes here." })] })] }));
export default {
    title: "Components/Sheet",
    component: Sheet,
    tags: ["autodocs"],
};
export const Basic = BasicSheetStory;
