import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { Checkbox } from "../checkbox/checkbox";
import { DataTable } from "./data-table";
// Sample data
const users = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "active",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "active",
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "User",
        status: "inactive",
    },
];
// Column definitions
const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { icon: row.original.status === "active" ? "ph:check-circle" : "ph:x-circle", className: row.original.status === "active" ? "text-success-9" : "text-error-9" }), _jsx("span", { className: "capitalize", children: row.original.status })] })),
    },
];
const columnsWithSelection = [
    {
        id: "select",
        header: ({ table }) => (_jsx("div", { className: "ml-2 mt-1", children: _jsx(Checkbox, { checked: table.getIsAllRowsSelected(), onClick: table.getToggleAllRowsSelectedHandler() }) })),
        cell: ({ row }) => (_jsx("div", { className: "ml-2 mt-1", children: _jsx(Checkbox, { checked: row.getIsSelected(), onClick: row.getToggleSelectedHandler() }) })),
    },
    ...columns,
];
// Create a wrapper component for User type
const UserDataTable = (props) => {
    return (_jsx("div", { className: "w-[800px]", children: _jsx(DataTable, { ...props }) }));
};
const meta = {
    title: "Components/DataTable",
    component: UserDataTable,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Basic = {
    args: {
        columns,
        data: users,
    },
};
export const WithPagination = {
    args: {
        columns,
        data: users,
        enablePagination: true,
        defaultPageSize: 2,
        enableRowSelection: false,
    },
};
export const WithSorting = {
    args: {
        columns,
        data: users,
        enableSorting: true,
        defaultSorting: [{ id: "name", desc: false }],
    },
};
export const WithSearch = {
    args: {
        columns,
        data: users,
        enableFiltering: true,
        filterPlaceholder: "Search users...",
    },
};
export const WithColumnVisibility = {
    args: {
        columns,
        data: users,
        enableColumnVisibility: true,
        defaultColumnVisibility: { email: false },
    },
};
export const WithRowSelection = {
    args: {
        columns: columnsWithSelection,
        data: users,
        enableRowSelection: true,
        onRowSelectionChange: (selectedRows) => {
            console.log("Selected rows:", selectedRows);
        },
    },
};
