import * as React from "react";
/**
 * Table Component
 *
 * A styled table component for displaying structured, tabular data in rows and columns.
 * Consists of multiple sub-components that work together to create semantic HTML tables
 * with consistent styling for the Tennr design system.
 *
 * @see [MDN HTML Table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
 *
 * @see [Lasso Table README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/table/README.md)
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Status</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>Active</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
declare function Table({ className, containerClassName, ...props }: React.ComponentProps<"table"> & {
    containerClassName?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * TableHeader - The header section of a table, containing column headers.
 *
 * @param className - Additional CSS classes to apply to the header
 */
declare function TableHeader({ className, ...props }: React.ComponentProps<"thead">): import("react/jsx-runtime").JSX.Element;
/**
 * TableBody - The main body section of a table, containing the data rows.
 *
 * @param className - Additional CSS classes to apply to the body
 */
declare function TableBody({ className, ...props }: React.ComponentProps<"tbody">): import("react/jsx-runtime").JSX.Element;
/**
 * TableFooter - The footer section of a table, typically used for summary rows.
 *
 * @param className - Additional CSS classes to apply to the footer
 */
declare function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">): import("react/jsx-runtime").JSX.Element;
/**
 * TableRow - A single row within a table, used in header, body, or footer sections.
 *
 * @param className - Additional CSS classes to apply to the row
 */
declare function TableRow({ className, ...props }: React.ComponentProps<"tr">): import("react/jsx-runtime").JSX.Element;
/**
 * TableHead - A header cell within a TableHeader row. Used for column labels.
 *
 * @param className - Additional CSS classes to apply to the header cell
 */
declare function TableHead({ className, ...props }: React.ComponentProps<"th">): import("react/jsx-runtime").JSX.Element;
/**
 * TableCell - A data cell within a TableRow. Used for displaying content.
 *
 * @param className - Additional CSS classes to apply to the cell
 */
declare function TableCell({ className, ...props }: React.ComponentProps<"td">): import("react/jsx-runtime").JSX.Element;
/**
 * TableCaption - A caption or title for the table. Rendered below the table by default.
 *
 * @param className - Additional CSS classes to apply to the caption
 */
declare function TableCaption({ className, ...props }: React.ComponentProps<"caption">): import("react/jsx-runtime").JSX.Element;
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, };
//# sourceMappingURL=table.d.ts.map