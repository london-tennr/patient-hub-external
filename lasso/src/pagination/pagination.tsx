import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react";
import * as React from "react";

import { Button, buttonVariants } from "../button/button";
import { cn } from "../utils/cn";

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
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

/**
 * PaginationContent - The container for pagination items.
 *
 * Renders as an unordered list that holds all pagination items in a flex row.
 *
 * @param className - Additional CSS classes to apply to the list container
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

/**
 * PaginationItem - A wrapper for individual pagination elements.
 *
 * Renders as a list item that wraps links, buttons, or ellipsis indicators.
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

/**
 * Props for the PaginationLink component.
 */
type PaginationLinkProps = {
  /** Whether this page link represents the currently active page */
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

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
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

/**
 * PaginationPrevious - Navigation link to the previous page.
 *
 * Displays a left caret icon with "Previous" text (text hidden on mobile).
 *
 * @param className - Additional CSS classes
 */
function PaginationPrevious({
  className,
  size,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <CaretLeft />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

/**
 * PaginationNext - Navigation link to the next page.
 *
 * Displays a right caret icon with "Next" text (text hidden on mobile).
 *
 * @param className - Additional CSS classes
 */
function PaginationNext({
  className,
  size,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <CaretRight weight="light" />
    </PaginationLink>
  );
}

/**
 * PaginationEllipsis - Visual indicator for skipped page ranges.
 *
 * Displays a "..." icon to indicate there are more pages between
 * the visible page numbers. Includes screen reader text "More pages".
 *
 * @param className - Additional CSS classes
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <DotsThree weight="light" className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
