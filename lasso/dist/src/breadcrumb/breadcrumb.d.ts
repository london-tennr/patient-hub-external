import * as React from "react";
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
declare function Breadcrumb({ ...props }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
/**
 * BreadcrumbList - An ordered list container for breadcrumb items.
 *
 * Renders an `<ol>` element with proper styling for horizontal breadcrumb display.
 *
 * @param className - Additional CSS classes to apply to the list
 */
declare function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">): import("react/jsx-runtime").JSX.Element;
/**
 * BreadcrumbItem - An individual item in the breadcrumb trail.
 *
 * Renders a `<li>` element that can contain a BreadcrumbLink, BreadcrumbPage,
 * BreadcrumbEllipsis, or BreadcrumbDropdown.
 *
 * @param className - Additional CSS classes to apply to the item
 */
declare function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
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
declare function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<"a"> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * BreadcrumbPage - The current page indicator in the breadcrumb trail.
 *
 * Renders a non-clickable span representing the current page. Automatically
 * sets `aria-current="page"` for screen reader accessibility.
 *
 * @param className - Additional CSS classes to apply to the page indicator
 */
declare function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
/**
 * BreadcrumbSeparator - Visual divider between breadcrumb items.
 *
 * Renders a separator (defaults to CaretRight icon) between items. Hidden from
 * screen readers with `aria-hidden="true"`.
 *
 * @param children - Custom separator content (defaults to CaretRight icon)
 * @param className - Additional CSS classes to apply to the separator
 */
declare function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
/**
 * BreadcrumbEllipsis - A placeholder for collapsed/hidden breadcrumb items.
 *
 * Used to indicate that some breadcrumb items are hidden, typically in long
 * navigation paths. Hidden from screen readers with `aria-hidden="true"`.
 *
 * @param children - Custom ellipsis content (defaults to "...")
 * @param className - Additional CSS classes to apply
 */
declare function BreadcrumbEllipsis({ className, children, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
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
declare function BreadcrumbDropdown({ children, items, className, ...props }: {
    items: Array<{
        label: string;
        href?: string;
        onClick?: () => void;
    }>;
    children?: React.ReactNode;
} & React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbDropdown, };
//# sourceMappingURL=breadcrumb.d.ts.map