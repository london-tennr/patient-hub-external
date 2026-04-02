import { Slot } from "@radix-ui/react-slot";
import { CaretRight } from "phosphor-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown/dropdown";
import { cn } from "../utils/cn";

/**
 * Breadcrumb Component
 *
 * A navigation aid that displays the user's current location within a hierarchical
 * structure. Shows the path from the root to the current page, allowing users to
 * quickly understand their position and navigate back to parent sections.
 * Built with semantic HTML and consistent styling for the Tennr design system.
 *
 * @see [Lasso Breadcrumb README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/breadcrumb/README.md)
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * BreadcrumbList - An ordered list container for breadcrumb items.
 *
 * Renders an `<ol>` element with proper styling for horizontal breadcrumb display.
 *
 * @param className - Additional CSS classes to apply to the list
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

/**
 * BreadcrumbItem - An individual item in the breadcrumb trail.
 *
 * Renders a `<li>` element that can contain a BreadcrumbLink, BreadcrumbPage,
 * BreadcrumbEllipsis, or BreadcrumbDropdown.
 *
 * @param className - Additional CSS classes to apply to the item
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

/**
 * BreadcrumbLink - A clickable link to navigate to a parent page.
 *
 * Supports the `asChild` pattern for integration with routing libraries like
 * React Router or Next.js Link component.
 *
 * @param asChild - If true, renders the child element instead of an anchor tag
 * @param className - Additional CSS classes to apply to the link
 *
 * @example
 * ```tsx
 * // Standard anchor link
 * <BreadcrumbLink href="/home">Home</BreadcrumbLink>
 *
 * // With React Router
 * <BreadcrumbLink asChild>
 *   <Link to="/home">Home</Link>
 * </BreadcrumbLink>
 * ```
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

/**
 * BreadcrumbPage - The current page indicator in the breadcrumb trail.
 *
 * Renders a non-clickable span representing the current page. Automatically
 * sets `aria-current="page"` for screen reader accessibility.
 *
 * @param className - Additional CSS classes to apply to the page indicator
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

/**
 * BreadcrumbSeparator - Visual divider between breadcrumb items.
 *
 * Renders a separator (defaults to CaretRight icon) between items. Hidden from
 * screen readers with `aria-hidden="true"`.
 *
 * @param children - Custom separator content (defaults to CaretRight icon)
 * @param className - Additional CSS classes to apply to the separator
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <CaretRight />}
    </li>
  );
}

/**
 * BreadcrumbEllipsis - A placeholder for collapsed/hidden breadcrumb items.
 *
 * Used to indicate that some breadcrumb items are hidden, typically in long
 * navigation paths. Hidden from screen readers with `aria-hidden="true"`.
 *
 * @param children - Custom ellipsis content (defaults to "...")
 * @param className - Additional CSS classes to apply
 */
function BreadcrumbEllipsis({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center justify-center select-none", className)}
      {...props}
    >
      {children ?? "..."}
    </span>
  );
}

/**
 * BreadcrumbDropdown - A dropdown menu for displaying collapsed breadcrumb items.
 *
 * Useful for long breadcrumb trails where intermediate items can be collapsed
 * into a dropdown menu to save space while maintaining navigation access.
 *
 * @param items - Array of dropdown menu items with label, optional href, and optional onClick
 * @param children - Custom trigger content (defaults to "...")
 * @param className - Additional CSS classes for the trigger
 *
 * @example
 * ```tsx
 * <BreadcrumbDropdown
 *   items={[
 *     { label: "Products", href: "/products" },
 *     { label: "Categories", href: "/categories" },
 *     { label: "Action", onClick: () => console.log("clicked") },
 *   ]}
 * />
 * ```
 */
function BreadcrumbDropdown({
  children,
  items,
  className,
  ...props
}: {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  children?: React.ReactNode;
} & React.ComponentProps<"span">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span
          data-slot="breadcrumb-dropdown"
          className={cn(
            "flex items-center justify-center cursor-pointer hover:bg-muted focus:bg-muted transition-colors border-none bg-transparent p-0 select-none",
            className,
          )}
          {...props}
        >
          {children ?? "..."}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            asChild={!!item.href}
            className="cursor-pointer hover:bg-muted transition-colors border-none bg-transparent"
          >
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbDropdown,
};
