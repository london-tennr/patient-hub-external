import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "./table";
const meta = {
    title: "Components/Table",
    component: Table,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Basic = {
    render: () => (_jsxs(Table, { children: [_jsx(TableCaption, { children: "A list of recent invoices." }), _jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Invoice" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Method" }), _jsx(TableHead, { children: "Amount" })] }) }), _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, { children: "INV001" }), _jsx(TableCell, { children: "Paid" }), _jsx(TableCell, { children: "Credit Card" }), _jsx(TableCell, { children: "$250.00" })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { children: "INV002" }), _jsx(TableCell, { children: "Pending" }), _jsx(TableCell, { children: "PayPal" }), _jsx(TableCell, { children: "$150.00" })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { children: "INV003" }), _jsx(TableCell, { children: "Unpaid" }), _jsx(TableCell, { children: "Bank Transfer" }), _jsx(TableCell, { children: "$350.00" })] })] }), _jsx(TableFooter, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { colSpan: 3, children: "Total" }), _jsx(TableCell, { children: "$750.00" })] }) })] })),
};
