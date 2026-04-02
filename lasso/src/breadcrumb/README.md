# Breadcrumb Component

## Overview

The Breadcrumb component is a navigation aid that displays the user's current location within a hierarchical structure. It shows the path from the root to the current page, allowing users to quickly understand their position and navigate back to parent sections. Built with consistent styling for the Tennr design system and full accessibility support.

## What It Is

The Breadcrumb component consists of several sub-components that work together:

- **Breadcrumb** (root): The container `<nav>` element that provides semantic navigation structure
- **BreadcrumbList**: An ordered list (`<ol>`) that holds the breadcrumb items
- **BreadcrumbItem**: An individual item (`<li>`) in the breadcrumb trail
- **BreadcrumbLink**: A clickable link to navigate to a parent page
- **BreadcrumbPage**: The current page indicator (non-clickable)
- **BreadcrumbSeparator**: Visual divider between breadcrumb items (defaults to CaretRight icon)
- **BreadcrumbEllipsis**: A placeholder for collapsed/hidden breadcrumb items
- **BreadcrumbDropdown**: A dropdown menu for displaying collapsed breadcrumb items

### Key Features

- **Accessible**: Built with proper ARIA attributes and semantic HTML (`nav`, `ol`, `li`)
- **Flexible**: Supports custom separators, icons, and dropdown menus
- **Composable**: Mix and match sub-components for different use cases
- **Polymorphic Links**: BreadcrumbLink supports `asChild` pattern for router integration
- **Responsive**: Handles long paths with ellipsis and dropdown components

## When to Use

Use the Breadcrumb component when you need to:

1. **Show Hierarchical Navigation**: Display the user's current position in a multi-level site structure

   - File system navigation
   - Category hierarchies in e-commerce
   - Nested settings pages
   - Documentation sections

2. **Provide Context**: Help users understand where they are in a complex application

   - Multi-step workflows
   - Nested admin panels
   - Deep navigation structures
   - Dashboard drill-downs

3. **Enable Quick Navigation**: Allow users to jump back to parent pages efficiently

   - Long navigation paths
   - Complex folder structures
   - Nested content hierarchies
   - Multi-tenant applications with context switching

4. **Improve Discoverability**: Show the relationship between pages and sections

   - Content management systems
   - Knowledge bases
   - Product catalogs
   - Organizational hierarchies

## When NOT to Use

Avoid using the Breadcrumb component when:

1. **Flat Navigation**: The site has a flat structure with no hierarchy

   - Single-page applications with no nested views
   - Simple apps with only a few pages
   - Linear workflows (use a stepper instead)

2. **Primary Navigation**: As the main navigation mechanism

   - Use a navigation bar or sidebar for primary navigation
   - Breadcrumbs should complement, not replace, main navigation
   - Don't use breadcrumbs as the only way to navigate

3. **Short Paths**: When there's only one or two levels

   - A breadcrumb with just "Home > Current Page" adds little value
   - Consider showing just a back button instead
   - Skip breadcrumbs for top-level pages

4. **Mobile-First Interfaces**: On very small screens with limited space

   - Consider a condensed back button
   - Use a collapsible breadcrumb with dropdown
   - Prioritize other navigation patterns for mobile

5. **Non-Hierarchical Content**: When pages don't have clear parent-child relationships

   - Search results pages
   - User-generated content feeds
   - Social media timelines

## Usage Example

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@tennr/lasso/breadcrumb";

function MyComponent() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### Example with Icons

```tsx
import { Folder, House } from "@phosphor-icons/react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@tennr/lasso/breadcrumb";

function BreadcrumbWithIcons() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <House className="size-4" weight="light" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs" className="flex items-center gap-2">
            <Folder className="size-4" weight="light" />
            Documentation
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### Example with Ellipsis and Dropdown

```tsx
import {
  Breadcrumb,
  BreadcrumbDropdown,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@tennr/lasso/breadcrumb";

function BreadcrumbWithDropdown() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbDropdown
            items={[
              { label: "Products", href: "/products" },
              { label: "Categories", href: "/categories" },
              { label: "Electronics", href: "/categories/electronics" },
            ]}
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products/phones">Phones</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>iPhone 15</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### Example with React Router

```tsx
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@tennr/lasso/breadcrumb";

function BreadcrumbWithRouter() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/settings">Settings</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Props Reference

### Breadcrumb

Extends `React.ComponentProps<"nav">`.

- Standard `nav` element props (className, id, etc.)
- Automatically sets `aria-label="breadcrumb"`

### BreadcrumbList

Extends `React.ComponentProps<"ol">`.

- `className`: `string` - Additional CSS classes to apply

### BreadcrumbItem

Extends `React.ComponentProps<"li">`.

- `className`: `string` - Additional CSS classes to apply

### BreadcrumbLink

Extends `React.ComponentProps<"a">`.

- `asChild`: `boolean` - If true, renders the child element instead of an anchor tag (for router integration)
- `className`: `string` - Additional CSS classes to apply
- `href`: `string` - The URL to navigate to

### BreadcrumbPage

Extends `React.ComponentProps<"span">`.

- `className`: `string` - Additional CSS classes to apply
- Automatically sets `aria-current="page"` and `aria-disabled="true"`

### BreadcrumbSeparator

Extends `React.ComponentProps<"li">`.

- `children`: `React.ReactNode` - Custom separator content (defaults to CaretRight icon)
- `className`: `string` - Additional CSS classes to apply
- Automatically sets `role="presentation"` and `aria-hidden="true"`

### BreadcrumbEllipsis

Extends `React.ComponentProps<"span">`.

- `children`: `React.ReactNode` - Custom ellipsis content (defaults to "...")
- `className`: `string` - Additional CSS classes to apply
- Automatically sets `role="presentation"` and `aria-hidden="true"`

### BreadcrumbDropdown

- `items`: `Array<{ label: string; href?: string; onClick?: () => void }>` - **Required**. Array of dropdown menu items
- `children`: `React.ReactNode` - Custom trigger content (defaults to "...")
- `className`: `string` - Additional CSS classes for the trigger

## Accessibility

The Breadcrumb component is fully accessible out of the box:

- Uses semantic `<nav>` element with `aria-label="breadcrumb"`
- Ordered list structure (`<ol>`) conveys sequence to screen readers
- Current page marked with `aria-current="page"`
- Separators and ellipsis hidden from assistive technology with `aria-hidden="true"`
- Keyboard navigation support for links and dropdown
- Clear visual distinction between links and current page

## Related Components

- For primary navigation, use a Navigation or Sidebar component
- For linear workflows, use a Stepper component
- For nested dropdown menus, use the DropdownMenu component
- For simple back navigation, use a Button with an arrow icon
