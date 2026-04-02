import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./card";
const meta = {
    title: "Components/Card",
    component: Card,
    tags: ["autodocs"],
};
export default meta;
export const Basic = {
    render: () => (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Card Title" }), _jsx(CardDescription, { children: "Card Description" })] }), _jsx(CardContent, { children: _jsx("p", { children: "This is the main content of the card." }) }), _jsx(CardFooter, { children: _jsx("p", { children: "Card Footer" }) })] })),
};
