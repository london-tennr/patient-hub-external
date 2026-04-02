# Pagination Component

## Overview

The Pagination component is a navigation control for paginating through large datasets or content. It consists of composable sub-components that work together to create accessible pagination controls, including page number links, previous/next buttons, and ellipsis indicators for large page ranges. It provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Pagination component consists of seven sub-components that work together:

- **Pagination** (root): The nav container that provides accessibility context
- **PaginationContent**: The list container that holds all pagination items
- **PaginationItem**: A wrapper for individual pagination elements
- **PaginationLink**: A clickable link representing a page number
- **PaginationPrevious**: Navigation link to go to the previous page
- **PaginationNext**: Navigation link to go to the next page
- **PaginationEllipsis**: Visual indicator for skipped page ranges

### Key Features

- **Accessible**: Proper ARIA attributes and semantic HTML structure
- **Composable**: Flexible sub-component architecture for various pagination patterns
- **Responsive**: Previous/Next labels hide on mobile, showing only icons
- **Customizable**: Accepts className props for styling customization
- **Active State**: Built-in support for indicating the current page

## When to Use

Use the Pagination component when you need to:

1. **Navigate Large Datasets**: Break up content into manageable chunks that users can navigate through

   - Search results pages
   - Product listings
   - Table data with many rows
   - Article archives
   - User lists or directories

2. **Sequential Content**: Navigate through ordered content one page at a time

   - Multi-page articles
   - Photo galleries
   - Step-by-step guides
   - Slide shows or presentations

3. **Server-Side Pagination**: Handle API responses that return paginated data

   - REST API responses with page metadata
   - GraphQL cursor-based pagination
   - Database query results

4. **Improve Performance**: Load content incrementally instead of all at once

   - Large data tables
   - Infinite-scroll alternatives
   - Resource-intensive content

## When NOT to Use

Avoid using the Pagination component when:

1. **Small Datasets**: When all content fits comfortably on one page

   - Short lists (under 10-20 items)
   - Simple navigation menus
   - Brief content sections

2. **Continuous Scrolling Is Better**: When users benefit from seamless browsing

   - Social media feeds (use infinite scroll)
   - Activity streams
   - Content discovery interfaces

3. **Wizard/Stepper Flows**: When navigating through sequential steps with specific states

   - Multi-step forms (use a Stepper component)
   - Onboarding flows (use a Wizard component)
   - Checkout processes

4. **Tab-Like Navigation**: When switching between different views rather than paginating through similar content

   - Dashboard tabs (use Tabs component)
   - Section navigation (use Tabs or Navigation)
   - Content categories

5. **Simple Previous/Next Only**: If you only need prev/next without page numbers

   - Article navigation (use simple navigation links)
   - Single-item carousels (use Carousel component)

## Usage Example

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@tennr/lasso/pagination";

function MyComponent() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

### Example with Ellipsis

For large page ranges, use ellipsis to indicate skipped pages:

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        4
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">6</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Simple Previous/Next Only

For minimal pagination controls:

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Props Reference

### Pagination

- `className`: `string` - Additional CSS classes for the nav container
- Accepts all standard `<nav>` HTML attributes

### PaginationContent

- `className`: `string` - Additional CSS classes for the list container
- Accepts all standard `<ul>` HTML attributes

### PaginationItem

- Accepts all standard `<li>` HTML attributes

### PaginationLink

- `isActive`: `boolean` - Whether this link represents the current page (applies outline variant styling)
- `size`: `"default" | "sm" | "lg" | "icon"` - Button size variant (default: `"icon"`)
- `href`: `string` - The URL for the page link
- `className`: `string` - Additional CSS classes
- Accepts all standard `<a>` HTML attributes

### PaginationPrevious

- `className`: `string` - Additional CSS classes
- Inherits all props from `PaginationLink`

### PaginationNext

- `className`: `string` - Additional CSS classes
- Inherits all props from `PaginationLink`

### PaginationEllipsis

- `className`: `string` - Additional CSS classes
- Accepts all standard `<span>` HTML attributes

## Accessibility

The Pagination component is fully accessible out of the box:

- Uses semantic `<nav>` element with `aria-label="pagination"`
- Page links indicate current page with `aria-current="page"`
- Previous/Next buttons have descriptive `aria-label` attributes
- Ellipsis is hidden from screen readers (`aria-hidden`) with "More pages" text for assistive technology
- Keyboard navigation support (Tab to navigate, Enter to activate)

## Related Components

- For infinite scroll patterns, consider using intersection observer hooks
- For step-by-step flows, use a Stepper or Wizard component
- For content tabs, use the Tabs component
- For simple navigation, use Link or Button components
