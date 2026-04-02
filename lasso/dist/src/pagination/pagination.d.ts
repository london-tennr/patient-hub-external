import * as React from "react";
import { Button } from "../button/button";
/**
 * Pagination Component
 *
 * A navigation component for paginating through content. Built as a composable set of
 * sub-components that work together to create accessible pagination controls. Supports
 * previous/next navigation, page number links, and ellipsis indicators for large page ranges.
 *
 * @see [Lasso Pagination README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/pagination/README.md)
 *
 * @param className - Additional CSS classes to apply to the nav container
 */
declare function Pagination({ className, ...props }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
/**
 * PaginationContent - The container for pagination items.
 *
 * Renders as an unordered list that holds all pagination items in a flex row.
 *
 * @param className - Additional CSS classes to apply to the list container
 */
declare function PaginationContent({ className, ...props }: React.ComponentProps<"ul">): import("react/jsx-runtime").JSX.Element;
/**
 * PaginationItem - A wrapper for individual pagination elements.
 *
 * Renders as a list item that wraps links, buttons, or ellipsis indicators.
 */
declare function PaginationItem({ ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
/**
 * Props for the PaginationLink component.
 */
type PaginationLinkProps = {
    /** Whether this page link represents the currently active page */
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> & React.ComponentProps<"a">;
/**
 * PaginationLink - A clickable link representing a page number.
 *
 * Renders as an anchor tag styled as a button. Supports active state
 * styling to indicate the current page.
 *
 * @param isActive - Whether this link represents the current page (shows outline variant)
 * @param size - Button size variant, defaults to "icon"
 * @param className - Additional CSS classes
 */
declare function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps): import("react/jsx-runtime").JSX.Element;
/**
 * PaginationPrevious - Navigation link to the previous page.
 *
 * Displays a left caret icon with "Previous" text (text hidden on mobile).
 *
 * @param className - Additional CSS classes
 */
declare function PaginationPrevious({ className, size, ...props }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
/**
 * PaginationNext - Navigation link to the next page.
 *
 * Displays a right caret icon with "Next" text (text hidden on mobile).
 *
 * @param className - Additional CSS classes
 */
declare function PaginationNext({ className, size, ...props }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
/**
 * PaginationEllipsis - Visual indicator for skipped page ranges.
 *
 * Displays a "..." icon to indicate there are more pages between
 * the visible page numbers. Includes screen reader text "More pages".
 *
 * @param className - Additional CSS classes
 */
declare function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, };
//# sourceMappingURL=pagination.d.ts.map