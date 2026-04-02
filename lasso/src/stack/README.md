# Stack Component

## Overview

The Stack component is a foundational layout primitive that simplifies building flexible, consistent layouts using CSS Flexbox. It provides a clean, prop-driven API for controlling direction, alignment, justification, and spacing between child elements. Built with class-variance-authority (CVA) for type-safe variant styling, it's a core building block for composing complex layouts in the Tennr design system.

## What It Is

The Stack component is a single, versatile layout wrapper that:

- **Arranges Children**: Lays out child elements in a row or column direction
- **Controls Alignment**: Provides cross-axis alignment options (items-start, items-center, etc.)
- **Controls Justification**: Provides main-axis distribution options (justify-start, justify-between, etc.)
- **Manages Spacing**: Offers a comprehensive spacing scale from none to 11xl (256px)
- **Supports Customization**: Accepts className prop for additional styling

### Key Features

- **Declarative API**: Simple props for direction, align, justify, and spacing
- **Type-Safe Variants**: Built with CVA for strongly typed variant props
- **Comprehensive Spacing Scale**: 16 spacing options from 0 to 256px
- **Composable**: Can be nested to create complex layouts
- **Extensible**: Accepts all standard div props plus className for customization

## When to Use

Use the Stack component when you need to:

1. **Vertical Lists**: Stack items vertically with consistent spacing

   - Form field groups
   - Navigation menus
   - Card content sections
   - Settings panels
   - Article content

2. **Horizontal Layouts**: Arrange items in a row

   - Button groups
   - Icon + text combinations
   - Navigation bars
   - Action toolbars
   - Badge groups

3. **Consistent Spacing**: Maintain uniform gaps between elements

   - Page sections
   - Component internals
   - List items
   - Dashboard widgets

4. **Alignment Control**: Center or distribute content

   - Modal headers and footers
   - Card layouts
   - Hero sections
   - Centered content blocks

5. **Nested Layouts**: Build complex layouts by composing Stacks

   - Two-column layouts
   - Sidebar + content arrangements
   - Grid-like structures
   - Responsive layouts

## When NOT to Use

Avoid using the Stack component when:

1. **Grid Layouts**: You need a true 2D grid layout

   - Data tables (use Table component)
   - Image galleries (use CSS Grid or a Grid component)
   - Dashboard layouts with fixed cells
   - Complex card grids

2. **Single Element**: No layout primitive is needed

   - Wrapping a single child without spacing needs
   - Simple inline elements
   - Elements that don't need flex properties

3. **Non-Flex Layouts**: The layout requires non-flex positioning

   - Absolute/fixed positioning (use CSS directly)
   - Float-based layouts
   - Static positioning needs

4. **Performance-Critical Lists**: Rendering very large lists

   - Consider virtualized lists instead
   - Large data sets (use a virtualized table)

5. **Complex Responsive Behavior**: Needs breakpoint-specific flex changes

   - Consider using Tailwind responsive classes directly
   - Use a more specialized responsive layout component

## Usage Example

```tsx
import { Stack } from "@tennr/lasso/stack";

function MyComponent() {
  return (
    <Stack direction="col" spacing="base" align="start">
      <h2>Title</h2>
      <p>Description text goes here.</p>
      <Stack direction="row" spacing="sm">
        <button>Cancel</button>
        <button>Save</button>
      </Stack>
    </Stack>
  );
}
```

### Form Layout Example

```tsx
<Stack spacing="lg">
  <Stack spacing="xs">
    <label htmlFor="name">Name</label>
    <input id="name" type="text" />
  </Stack>
  <Stack spacing="xs">
    <label htmlFor="email">Email</label>
    <input id="email" type="email" />
  </Stack>
  <Stack direction="row" justify="end" spacing="sm">
    <button>Cancel</button>
    <button>Submit</button>
  </Stack>
</Stack>
```

### Centered Content Example

```tsx
<Stack direction="col" align="center" justify="center" className="h-screen">
  <h1>Welcome</h1>
  <p>Centered content block</p>
</Stack>
```

### Card Layout Example

```tsx
<Stack spacing="base" className="p-4 border rounded-lg">
  <Stack direction="row" justify="between" align="center">
    <h3>Card Title</h3>
    <Badge>New</Badge>
  </Stack>
  <p>Card content goes here with some description text.</p>
  <Stack direction="row" spacing="sm">
    <Button variant="outline">Learn More</Button>
    <Button>Get Started</Button>
  </Stack>
</Stack>
```

## Props Reference

### StackProps

- `direction`: `"row" | "col"` - The flex direction of the stack. Defaults to `"col"`.
- `align`: `"start" | "center" | "end" | "stretch"` - Cross-axis alignment (items-\*). Defaults to `"start"`.
- `justify`: `"start" | "center" | "end" | "stretch" | "between"` - Main-axis distribution (justify-\*). Defaults to `"start"`.
- `spacing`: `"none" | "xs" | "sm" | "md" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl"` - Gap between children. Defaults to `"base"`.
- `className`: `string` - Additional CSS classes to apply
- `...props`: All standard HTML div attributes are supported

### Spacing Scale Reference

| Value | Gap Class | Pixels |
| ----- | --------- | ------ |
| none  | gap-none  | 0px    |
| xs    | gap-1     | 4px    |
| sm    | gap-2     | 8px    |
| md    | gap-3     | 12px   |
| base  | gap-4     | 16px   |
| lg    | gap-6     | 24px   |
| xl    | gap-8     | 32px   |
| 2xl   | gap-10    | 40px   |
| 3xl   | gap-12    | 48px   |
| 4xl   | gap-16    | 64px   |
| 5xl   | gap-20    | 80px   |
| 6xl   | gap-24    | 96px   |
| 7xl   | gap-32    | 128px  |
| 8xl   | gap-40    | 160px  |
| 9xl   | gap-48    | 192px  |
| 10xl  | gap-56    | 224px  |
| 11xl  | gap-64    | 256px  |

## Composition Patterns

### Nested Stacks for Complex Layouts

```tsx
<Stack direction="row" spacing="lg">
  {/* Sidebar */}
  <Stack spacing="sm" className="w-64">
    <NavItem>Home</NavItem>
    <NavItem>Settings</NavItem>
  </Stack>

  {/* Main Content */}
  <Stack spacing="base" className="flex-1">
    <Header />
    <Content />
  </Stack>
</Stack>
```

### Using with Responsive Classes

```tsx
<Stack
  direction="col"
  spacing="base"
  className="md:flex-row md:justify-between"
>
  <Logo />
  <Navigation />
</Stack>
```

## Accessibility

The Stack component renders a semantic `<div>` element and does not add any specific ARIA attributes. When using Stack:

- Ensure proper heading hierarchy within stacked content
- Use semantic HTML elements as children when appropriate
- Consider using landmark roles for major layout sections

## Related Components

- For tabbed interfaces, use the `Tabs` component
- For collapsible sections, use the `Accordion` component
- For horizontal rule separators between stack items, use the `Separator` component
- For responsive grid layouts, consider using Tailwind's grid utilities directly
