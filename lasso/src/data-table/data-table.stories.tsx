import { Icon } from "@iconify/react";
import type { Meta, StoryObj } from "@storybook/react";
import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "../checkbox/checkbox";
import { DataTable } from "./data-table";

// Sample data type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

// Sample data
const users: User[] = [
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
const columns: ColumnDef<User, string>[] = [
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
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Icon
          icon={
            row.original.status === "active" ? "ph:check-circle" : "ph:x-circle"
          }
          className={
            row.original.status === "active" ? "text-success-9" : "text-error-9"
          }
        />
        <span className="capitalize">{row.original.status}</span>
      </div>
    ),
  },
];

const columnsWithSelection: ColumnDef<User, string>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="ml-2 mt-1">
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onClick={table.getToggleAllRowsSelectedHandler()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 mt-1">
        <Checkbox
          checked={row.getIsSelected()}
          onClick={row.getToggleSelectedHandler()}
        />
      </div>
    ),
  },
  ...columns,
];

// Create a wrapper component for User type
const UserDataTable = (
  props: React.ComponentProps<typeof DataTable<User, string>>,
) => {
  return (
    <div className="w-[800px]">
      <DataTable<User, string> {...props} />
    </div>
  );
};

const meta = {
  title: "Components/DataTable",
  component: UserDataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    columns,
    data: users,
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: users,
    enablePagination: true,
    defaultPageSize: 2,
    enableRowSelection: false,
  },
};

export const WithSorting: Story = {
  args: {
    columns,
    data: users,
    enableSorting: true,
    defaultSorting: [{ id: "name", desc: false }],
  },
};

export const WithSearch: Story = {
  args: {
    columns,
    data: users,
    enableFiltering: true,
    filterPlaceholder: "Search users...",
  },
};

export const WithColumnVisibility: Story = {
  args: {
    columns,
    data: users,
    enableColumnVisibility: true,
    defaultColumnVisibility: { email: false },
  },
};

export const WithRowSelection: Story = {
  args: {
    columns: columnsWithSelection,
    data: users,
    enableRowSelection: true,
    onRowSelectionChange: (selectedRows: User[]) => {
      console.log("Selected rows:", selectedRows);
    },
  },
};
