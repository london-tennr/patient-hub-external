import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../utils/cn";
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
function Table({ className, containerClassName, ...props }) {
    return (_jsx("div", { "data-slot": "table-container", className: containerClassName ?? "relative w-full overflow-x-auto", children: _jsx("table", { "data-slot": "table", className: cn("w-full caption-bottom text-sm", className), ...props }) }));
}
/**
 * TableHeader - The header section of a table, containing column headers.
 *
 * @param className - Additional CSS classes to apply to the header
 */
function TableHeader({ className, ...props }) {
    return (_jsx("thead", { "data-slot": "table-header", className: cn("", className), ...props }));
}
/**
 * TableBody - The main body section of a table, containing the data rows.
 *
 * @param className - Additional CSS classes to apply to the body
 */
function TableBody({ className, ...props }) {
    return (_jsx("tbody", { "data-slot": "table-body", className: cn("", className), ...props }));
}
/**
 * TableFooter - The footer section of a table, typically used for summary rows.
 *
 * @param className - Additional CSS classes to apply to the footer
 */
function TableFooter({ className, ...props }) {
    return (_jsx("tfoot", { "data-slot": "table-footer", className: cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className), ...props }));
}
/**
 * TableRow - A single row within a table, used in header, body, or footer sections.
 *
 * @param className - Additional CSS classes to apply to the row
 */
function TableRow({ className, ...props }) {
    return (_jsx("tr", { "data-slot": "table-row", className: cn("hover:bg-accent/50 data-[state=selected]:bg-muted transition-colors border-b border-border last:border-b-0", className), ...props }));
}
/**
 * TableHead - A header cell within a TableHeader row. Used for column labels.
 *
 * @param className - Additional CSS classes to apply to the header cell
 */
function TableHead({ className, ...props }) {
    return (_jsx("th", { "data-slot": "table-head", className: cn("bg-neutural-2 text-muted-foreground h-10 px-2 text-left align-middle text-sm font-medium lasso:wght-medium leading-5 whitespace-nowrap border-b border-border sticky top-0 z-10 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className), ...props }));
}
/**
 * TableCell - A data cell within a TableRow. Used for displaying content.
 *
 * @param className - Additional CSS classes to apply to the cell
 */
function TableCell({ className, ...props }) {
    return (_jsx("td", { "data-slot": "table-cell", className: cn("p-2 align-middle whitespace-nowrap text-sm font-normal lasso:wght-normal leading-5 text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className), ...props }));
}
/**
 * TableCaption - A caption or title for the table. Rendered below the table by default.
 *
 * @param className - Additional CSS classes to apply to the caption
 */
function TableCaption({ className, ...props }) {
    return (_jsx("caption", { "data-slot": "table-caption", className: cn("text-muted-foreground mt-4 text-sm font-normal lasso:wght-normal leading-5", className), ...props }));
}
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, };
