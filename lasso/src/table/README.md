# Table Component

## Overview

The Table component is a styled HTML table for displaying structured, tabular data in rows and columns. It provides a set of sub-components that work together to create semantic HTML tables with consistent styling for the Tennr design system. The component includes support for headers, body, footer, and captions, with built-in hover states and responsive overflow handling.

## What It Is

The Table component consists of eight sub-components that work together:

- **Table** (root): The container that wraps the table with overflow handling
- **TableHeader**: The header section containing column headings
- **TableBody**: The main body section containing data rows
- **TableFooter**: The footer section for summary or total rows
- **TableRow**: An individual row within the table
- **TableHead**: A header cell for column labels
- **TableCell**: A data cell for displaying content
- **TableCaption**: A caption or title for the table

### Key Features

- **Semantic HTML**: Uses proper HTML table elements for accessibility and SEO
- **Responsive**: Horizontal scrolling on overflow for narrow viewports
- **Sticky Headers**: Header cells stick to the top when scrolling
- **Hover States**: Rows highlight on hover for better readability
- **Selection Support**: Built-in styling for selected rows
- **Customizable**: All sub-components accept className props for styling customization

## When to Use

Use the Table component when you need to:

1. **Display Structured Data**: Present data that naturally fits into rows and columns

   - Invoice lists
   - User directories
   - Product catalogs
   - Transaction histories
   - API response data

2. **Compare Items**: Allow users to compare multiple items across the same attributes

   - Feature comparison tables
   - Pricing tables
   - Specification sheets
   - Side-by-side comparisons

3. **Editable Data Grids**: Display data that users can interact with or modify

   - Settings tables
   - Configuration lists
   - Bulk edit interfaces
   - Admin dashboards

4. **Summary Information**: Present totals or aggregated data alongside detailed rows

   - Financial summaries
   - Statistics tables
   - Report outputs
   - Shopping carts

## When NOT to Use

Avoid using the Table component when:

1. **Non-Tabular Data**: The data doesn't have a natural row/column relationship

   - Lists of items (use a List component)
   - Card layouts (use a Card component)
   - Hierarchical data (use a Tree or Accordion component)
   - Timeline data (use a Timeline component)

2. **Small Datasets**: Only a few items that would look sparse in a table

   - Single item details (use a Card or Description List)
   - Key-value pairs (use a Definition List)
   - Simple lists (use a List component)

3. **Mobile-First Design**: The data needs to be highly responsive for mobile

   - Consider using Cards that stack vertically
   - Use responsive list views instead
   - Consider a different visualization

4. **Complex Interactions**: Need advanced features like sorting, filtering, pagination

   - Use the DataTable component for advanced functionality
   - Consider a specialized data grid library

5. **Layout Purposes**: Using tables for page layout (this is an anti-pattern)

   - Use CSS Grid or Flexbox for layouts
   - Tables should only be used for tabular data

## Usage Example

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@tennr/lasso/table";

function InvoiceTable() {
  return (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell>$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell>$350.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

### Example with Custom Styling

```tsx
<Table className="border border-border rounded-lg">
  <TableHeader>
    <TableRow>
      <TableHead className="text-left">Name</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="cursor-pointer" onClick={handleRowClick}>
      <TableCell className="font-medium">Item 1</TableCell>
      <TableCell className="text-right">$100.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Example with Selection State

```tsx
<TableRow data-state={isSelected ? "selected" : undefined}>
  <TableCell>Selected Row</TableCell>
</TableRow>
```

## Props Reference

All Table sub-components extend their respective HTML element props and add className support.

### Table

- Extends `React.ComponentProps<"table">`
- `className`: `string` - Additional CSS classes for the table element

### TableHeader

- Extends `React.ComponentProps<"thead">`
- `className`: `string` - Additional CSS classes for the header section

### TableBody

- Extends `React.ComponentProps<"tbody">`
- `className`: `string` - Additional CSS classes for the body section

### TableFooter

- Extends `React.ComponentProps<"tfoot">`
- `className`: `string` - Additional CSS classes for the footer section

### TableRow

- Extends `React.ComponentProps<"tr">`
- `className`: `string` - Additional CSS classes for the row
- `data-state`: `"selected"` - When set, applies selected row styling

### TableHead

- Extends `React.ComponentProps<"th">`
- `className`: `string` - Additional CSS classes for the header cell

### TableCell

- Extends `React.ComponentProps<"td">`
- `className`: `string` - Additional CSS classes for the data cell
- `colSpan`: `number` - Number of columns the cell should span

### TableCaption

- Extends `React.ComponentProps<"caption">`
- `className`: `string` - Additional CSS classes for the caption

## Styling

The Table component includes the following default styles:

- **Table**: Full width with bottom caption positioning
- **TableHeader**: Sticky positioning for scrollable tables
- **TableRow**: Border bottom, hover highlight, selected state styling
- **TableHead**: Sticky header, muted background, medium font weight
- **TableCell**: Standard padding, left-aligned text
- **TableFooter**: Muted background, top border
- **TableCaption**: Muted text color, positioned below table

## Accessibility

The Table component is accessible out of the box:

- Uses semantic HTML table elements (`<table>`, `<thead>`, `<tbody>`, etc.)
- Proper heading structure with `<th>` elements
- Caption support for table descriptions
- Screen readers can navigate table structure correctly
- Keyboard navigation follows standard table navigation patterns

## Related Components

- For tables with sorting, filtering, and pagination, use the `DataTable` component
- For simple key-value displays, use a `DescriptionList` or `Card` component
- For hierarchical data, consider an `Accordion` or `Tree` component
- For responsive card-based layouts, use the `Card` component
