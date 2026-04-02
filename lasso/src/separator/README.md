# Separator Component

## Overview

The Separator component is a visual divider used to separate content into distinct sections. It renders as a thin line and can be oriented either horizontally or vertically. Built on top of Radix UI's Separator primitive, it provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Separator is a simple, single-purpose component that:

- **Creates Visual Division**: Renders a thin line to separate content sections
- **Supports Two Orientations**: Can be horizontal (default) or vertical
- **Handles Accessibility**: Properly indicates whether it's decorative or semantic
- **Customizable**: Accepts className props for styling customization

### Key Features

- **Accessible**: Built on Radix UI primitives with proper ARIA attributes
- **Flexible Orientation**: Horizontal or vertical orientation support
- **Decorative Mode**: Can be marked as purely visual (decorative) or semantically meaningful
- **Lightweight**: Minimal DOM footprint with just a single element
- **Responsive**: Automatically adapts to container width/height based on orientation

## When to Use

Use the Separator component when you need to:

1. **Divide Content Sections**: Create clear visual boundaries between related content groups

   - Between form field groups
   - Between list items
   - Between card sections
   - Between navigation items

2. **Create Visual Hierarchy**: Help users understand content structure

   - Separating headers from body content
   - Dividing sidebar sections
   - Breaking up long content into digestible chunks

3. **Enhance Readability**: Improve content scanability

   - In dense interfaces
   - Between repeated elements
   - In dropdown menus and context menus

4. **Vertical Division**: Separate inline or flexbox items horizontally

   - Toolbar button groups
   - Navigation items
   - Icon groups
   - Action button sets

## When NOT to Use

Avoid using the Separator component when:

1. **Spacing Alone Suffices**: When whitespace or margins already provide adequate visual separation

   - Between well-spaced cards
   - Between paragraphs of text
   - In already sparse layouts

2. **Borders Are More Appropriate**: When you need borders on containers rather than standalone dividers

   - Card borders (use Card component)
   - Table cell borders (use Table component)
   - Input field borders (use Input component)

3. **Complex Dividers**: When you need decorative or complex dividing elements

   - Patterned dividers
   - Dividers with icons or text (use a custom component)
   - Animated dividers

4. **Semantic Sectioning**: When you need semantic HTML sectioning

   - Use `<hr>` with custom styling for thematic breaks
   - Use `<section>` elements for document structure
   - Use heading hierarchy for content organization

5. **Heavy Decoration**: When the divider needs significant visual weight

   - Thick borders or rules
   - Gradient dividers
   - Decorative patterns

## Usage Example

```tsx
import { Separator } from "@tennr/lasso/separator";

function MyComponent() {
  return (
    <div>
      <div>Section One</div>
      <Separator />
      <div>Section Two</div>
    </div>
  );
}
```

### Vertical Separator Example

```tsx
import { Separator } from "@tennr/lasso/separator";

function Toolbar() {
  return (
    <div className="flex h-5 items-center space-x-4">
      <button>Action 1</button>
      <Separator orientation="vertical" />
      <button>Action 2</button>
      <Separator orientation="vertical" />
      <button>Action 3</button>
    </div>
  );
}
```

### With Custom Styling

```tsx
import { Separator } from "@tennr/lasso/separator";

function StyledDivider() {
  return (
    <div className="space-y-4">
      <p>Content above</p>
      <Separator className="my-6 bg-primary" />
      <p>Content below</p>
    </div>
  );
}
```

### Semantic Separator

```tsx
import { Separator } from "@tennr/lasso/separator";

function SemanticDivision() {
  return (
    <article>
      <p>First section of content...</p>
      <Separator decorative={false} />
      <p>Second section with different topic...</p>
    </article>
  );
}
```

## Props Reference

### Separator

- `orientation`: `"horizontal" | "vertical"` - The orientation of the separator. Defaults to `"horizontal"`
- `decorative`: `boolean` - When `true`, indicates the separator is purely visual and has no semantic meaning. When `false`, it represents a thematic break. Defaults to `true`
- `className`: `string` - Additional CSS classes for custom styling

All other props from the underlying `div` element are also supported.

## Styling

The Separator uses the following default styles:

- **Horizontal**: 1px height, full width of container
- **Vertical**: 1px width, full height of container
- **Color**: Uses the `bg-border` design token

### Common Customizations

```tsx
// Thicker separator
<Separator className="h-0.5" />

// Custom color
<Separator className="bg-muted" />

// With margin
<Separator className="my-4" />

// Dashed appearance (requires custom CSS)
<Separator className="border-t border-dashed bg-transparent" />
```

## Accessibility

The Separator component is accessible out of the box:

- Uses `role="separator"` for semantic meaning when not decorative
- Uses `role="none"` when decorative to hide from assistive technology
- Proper `aria-orientation` attribute for screen readers
- No keyboard interaction needed (static element)

### Decorative vs Non-Decorative

- **Decorative (`decorative={true}`)**: Use when the separator is purely visual and doesn't represent a meaningful division. Screen readers will ignore it.
- **Non-decorative (`decorative={false}`)**: Use when the separator represents a thematic break or meaningful content division. Screen readers will announce it.

## Related Components

- For collapsible content sections, use the `Accordion` component
- For grouped content in boxes, use the `Card` component
- For tabular data with built-in separators, use the `Table` component
- For dropdown menus with separators, use `DropdownMenuSeparator` from the `DropdownMenu` component
- For sidebar sections, use `SidebarSeparator` from the `Sidebar` component
