# DataTable Component

## Overview

The DataTable component is a powerful, feature-rich table component built on top of TanStack Table (React Table v8). It provides a flexible and extensible way to display tabular data with support for pagination, sorting, filtering, column visibility, and row selection. It's designed with a consistent, accessible implementation for the Tennr design system.

## What It Is

The DataTable component consists of four sub-components that work together:

- **DataTable** (main): The main table component that orchestrates all features and renders the data
- **DataTableColumnHeader**: A sortable column header with visual indicators for sort direction
- **DataTablePagination**: Navigation controls for paginated data
- **DataTableViewOptions**: A dropdown menu for toggling column visibility

### Key Features

- **Built on TanStack Table**: Leverages the power and flexibility of TanStack Table (React Table v8)
- **Modular Features**: Enable only the features you need (pagination, sorting, filtering, etc.)
- **Type-Safe**: Full TypeScript support with generic types for your data
- **Customizable**: Extensive customization options for rendering rows, cells, and actions
- **Accessible**: Built with accessibility in mind, including keyboard navigation support
- **Global Search**: Built-in global filter that searches across all columns
- **Column Visibility**: Allow users to show/hide columns dynamically
- **Row Selection**: Support for single and multi-row selection with callbacks
- **Row Actions**: Easily add action buttons or menus to each row

## When to Use

Use the DataTable component when you need to:

1. **Display Tabular Data**: Present structured data in rows and columns

   - User lists
   - Transaction history
   - Inventory tables
   - Log entries
   - API response data

2. **Data Navigation**: Allow users to browse through large datasets

   - Paginated results
   - Sortable columns
   - Searchable content
   - Filterable data

3. **Data Management**: Enable users to interact with and manage data

   - Select rows for bulk actions
   - Edit individual records
   - Delete items
   - Export selected data

4. **Data Analysis**: Help users find and analyze specific information

   - Sort by different criteria
   - Filter by search terms
   - Show/hide relevant columns
   - Compare rows

5. **Admin Interfaces**: Build administrative dashboards and management screens

   - User management
   - Content moderation
   - Order management
   - Resource administration

## When NOT to Use

Avoid using the DataTable component when:

1. **Simple Lists**: For non-tabular data or simple lists without columns

   - Card layouts (use a Card grid)
   - Simple item lists (use a List component)
   - Navigation menus (use a Menu or Nav component)

2. **Small Data Sets**: When you only have a few items without need for table features

   - Use a simple Table component
   - Use a descriptive list
   - Consider inline display

3. **Mobile-First Interfaces**: When the primary use case is mobile devices

   - Tables can be difficult to navigate on small screens
   - Consider card-based layouts for mobile
   - Use responsive alternatives

4. **Real-Time Data**: When data updates very frequently

   - Consider virtualized lists
   - Use streaming data components
   - Implement custom real-time solutions

5. **Hierarchical Data**: When data has parent-child relationships

   - Use a TreeView component
   - Use nested accordions
   - Consider a hierarchical table library

6. **Spreadsheet Functionality**: When users need to edit cells inline like a spreadsheet

   - Use a dedicated spreadsheet component
   - Consider ag-Grid or similar libraries for complex editing

## Usage Example

### Basic Usage

```tsx
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@tennr/lasso/data-table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
];

function MyComponent() {
  return <DataTable columns={columns} data={users} />;
}
```

### With Pagination and Sorting

```tsx
<DataTable
  columns={columns}
  data={users}
  enablePagination
  enableSorting
  defaultPageSize={10}
  defaultSorting={[{ id: "name", desc: false }]}
/>
```

### With Filtering and Column Visibility

```tsx
<DataTable
  columns={columns}
  data={users}
  enableFiltering
  enableColumnVisibility
  filterPlaceholder="Search users..."
  defaultColumnVisibility={{ email: false }}
/>
```

### With Row Selection

```tsx
import { Checkbox } from "@tennr/lasso/checkbox";

const columnsWithSelection: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onClick={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onClick={row.getToggleSelectedHandler()}
      />
    ),
  },
  ...columns,
];

<DataTable
  columns={columnsWithSelection}
  data={users}
  enableRowSelection
  onRowSelectionChange={(selectedRows) => {
    console.log("Selected:", selectedRows);
  }}
/>;
```

### With Row Actions

```tsx
import { Button } from "@tennr/lasso/button";

<DataTable
  columns={columns}
  data={users}
  renderRowActions={(row) => (
    <Button variant="ghost" size="sm" onClick={() => handleEdit(row.original)}>
      Edit
    </Button>
  )}
/>;
```

### With Row Click Handler

```tsx
<DataTable
  columns={columns}
  data={users}
  onRowClick={(row) => {
    navigate(`/users/${row.original.id}`);
  }}
  getRowClassName={(row) =>
    row.original.status === "inactive" ? "opacity-50" : ""
  }
/>
```

## Props Reference

### DataTable

| Prop                      | Type                                 | Default                   | Description                                                        |
| ------------------------- | ------------------------------------ | ------------------------- | ------------------------------------------------------------------ |
| `columns`                 | `ColumnDef<TData, TValue>[]`         | **Required**              | Column definitions from TanStack Table                             |
| `data`                    | `TData[]`                            | **Required**              | Array of data to display                                           |
| `enablePagination`        | `boolean`                            | `false`                   | Enable pagination controls                                         |
| `enableSorting`           | `boolean`                            | `false`                   | Enable column sorting                                              |
| `enableFiltering`         | `boolean`                            | `false`                   | Enable global search filtering                                     |
| `enableColumnVisibility`  | `boolean`                            | `false`                   | Enable column visibility toggle                                    |
| `enableRowSelection`      | `boolean`                            | `false`                   | Enable row selection                                               |
| `renderRowActions`        | `(row: Row<TData>) => ReactNode`     | -                         | Render function for row action buttons                             |
| `renderPagination`        | `(table: Table<TData>) => ReactNode` | -                         | Custom pagination component                                        |
| `renderRow`               | `(row: Row<TData>) => ReactNode`     | -                         | Custom row renderer (full control)                                 |
| `defaultPageSize`         | `number`                             | `10`                      | Initial page size                                                  |
| `defaultSorting`          | `SortingState`                       | `[]`                      | Initial sorting state                                              |
| `defaultColumnFilters`    | `ColumnFiltersState`                 | `[]`                      | Initial column filters                                             |
| `defaultColumnVisibility` | `VisibilityState`                    | `{}`                      | Initial column visibility                                          |
| `filterPlaceholder`       | `string`                             | `"Search all columns..."` | Placeholder text for search input                                  |
| `getRowClassName`         | `(row: Row<TData>) => string`        | -                         | Function to compute row CSS classes                                |
| `sortedColumnIds`         | `string[]`                           | `[]`                      | Restrict sorting to specific columns (empty = all)                 |
| `onRowSelectionChange`    | `(selectedRows: TData[]) => void`    | -                         | Callback when row selection changes                                |
| `onRowClick`              | `(row: Row<TData>) => void`          | -                         | Callback when a row is clicked                                     |
| `onRowMouseEnter`         | `(row: Row<TData>) => void`          | -                         | Callback when mouse enters a row                                   |
| `onTableSortingChange`    | `(sorting: ColumnSort) => void`      | -                         | Callback when sorting changes                                      |
| `disableScroll`           | `boolean`                            | `false`                   | Disable the scrollable container (removes max-height and overflow) |

### DataTableColumnHeader

| Prop              | Type                            | Default      | Description                    |
| ----------------- | ------------------------------- | ------------ | ------------------------------ |
| `column`          | `Column<TData, TValue>`         | **Required** | TanStack Table column instance |
| `title`           | `string \| ReactNode`           | **Required** | Header title or custom content |
| `enableSorting`   | `boolean`                       | `false`      | Enable sorting for this column |
| `className`       | `string`                        | -            | Additional CSS classes         |
| `onSortingChange` | `(sorting: ColumnSort) => void` | -            | Callback when sorting changes  |

### DataTablePagination

| Prop                 | Type           | Default      | Description              |
| -------------------- | -------------- | ------------ | ------------------------ |
| `table`              | `Table<TData>` | **Required** | TanStack Table instance  |
| `enableRowSelection` | `boolean`      | `false`      | Show row selection count |

### DataTableViewOptions

| Prop    | Type           | Default      | Description             |
| ------- | -------------- | ------------ | ----------------------- |
| `table` | `Table<TData>` | **Required** | TanStack Table instance |

## Column Definitions

The `columns` prop uses TanStack Table's `ColumnDef` type. Here are common patterns:

### Basic Column

```tsx
{ accessorKey: "name", header: "Name" }
```

### Custom Cell Renderer

```tsx
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => (
    <Badge variant={row.original.status === "active" ? "success" : "secondary"}>
      {row.original.status}
    </Badge>
  ),
}
```

### Custom Header

```tsx
{
  accessorKey: "email",
  header: () => <span className="font-bold">Email Address</span>,
}
```

## Accessibility

The DataTable component includes accessibility features:

- Semantic table markup (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
- Keyboard navigation support for interactive elements
- Sort direction indicators for screen readers
- Focus management for pagination controls
- Proper button semantics for all interactive elements

## Related Components

- For simple tables without interactivity, use the `Table` component
- For searching and filtering, the built-in `Searchbar` is included
- For row actions, consider using `Button` or `DropdownMenu`
- For selection checkboxes, use the `Checkbox` component
