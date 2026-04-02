import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "./separator";
export default {
    title: "Components/Separator",
    component: Separator,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export const Default = () => (_jsxs("div", { style: { width: 200 }, children: [_jsx("div", { children: "Above" }), _jsx(Separator, {}), _jsx("div", { children: "Below" })] }));
