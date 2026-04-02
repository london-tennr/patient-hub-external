# ScrollArea Component

## Overview

The ScrollArea component provides a custom scrollable container with styled scrollbars. It replaces the browser's native scrollbar with a consistent, visually appealing scrollbar that matches the Tennr design system. Built on top of Radix UI's ScrollArea primitive, it offers a smooth scrolling experience with proper accessibility support.

## What It Is

The ScrollArea component consists of two sub-components that work together:

- **ScrollArea** (root): The container that wraps content and provides custom scrolling behavior
- **ScrollBar**: The styled scrollbar that can be oriented vertically or horizontally

### Key Features

- **Custom Styled Scrollbars**: Replaces native scrollbars with consistent, themed styling
- **Accessible**: Built on Radix UI primitives with proper focus management
- **Orientation Support**: Supports both vertical and horizontal scrolling
- **Touch-Friendly**: Optimized for touch devices with `touch-none` on the scrollbar
- **Focus Visible**: Includes focus ring styles for keyboard navigation
- **Customizable**: Accepts className props for styling customization

## When to Use

Use the ScrollArea component when you need to:

1. **Constrained Height/Width Containers**: Display content within a fixed-size container that may overflow

   - Long lists of items
   - Chat message containers
   - Code preview panels
   - Sidebar navigation with many items

2. **Consistent Scrollbar Styling**: Need scrollbars that match your design system across all browsers

   - Design-sensitive interfaces
   - Branded applications
   - Cross-browser consistency requirements

3. **Horizontal Scrolling**: Display horizontally scrollable content with visible scrollbars

   - Image galleries
   - Card carousels
   - Data tables with many columns
   - Timeline views

4. **Nested Scrollable Areas**: Need independent scrollable regions within a page

   - Split-pane layouts
   - Modal dialogs with long content
   - Dropdown menus with many options
   - Resizable panels

5. **Touch and Mouse Support**: Need scrolling that works well on both touch and mouse devices

   - Responsive applications
   - Cross-platform interfaces

## When NOT to Use

Avoid using the ScrollArea component when:

1. **Full Page Scrolling**: The entire page needs to scroll

   - Main content areas (use native browser scrolling)
   - Landing pages
   - Article pages
   - Default page layouts

2. **Simple Short Content**: The content doesn't need scrolling

   - Content that fits within its container
   - Static layouts
   - Small lists or menus

3. **Virtual Lists**: You're rendering extremely long lists with virtualization

   - Use a virtualized list component instead (like react-virtual)
   - Performance-critical scenarios with thousands of items
   - Infinite scroll implementations

4. **Mobile-Only Layouts**: When native scrolling provides better UX

   - Mobile-first interfaces where native momentum scrolling is preferred
   - Full-screen mobile views
   - Touch-optimized interfaces

5. **Accessibility-Critical Scenarios**: When custom scrollbars might interfere with assistive technology

   - Some screen readers work better with native scrollbars
   - When maximum compatibility is required

## Usage Example

```tsx
import { ScrollArea, ScrollBar } from "@tennr/lasso/scroll-area";

function MyComponent() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-sm border p-4">
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="text-sm">
            <p className="mb-2 font-medium">{item.title}</p>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### Example with Horizontal Scrolling

```tsx
import { ScrollArea, ScrollBar } from "@tennr/lasso/scroll-area";

function HorizontalExample() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-sm border">
      <div className="flex w-max space-x-4 p-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="shrink-0 rounded-sm border bg-muted p-4 w-[200px]"
          >
            <h3 className="font-medium">{card.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{card.content}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
```

### Example with Custom Scrollbar

```tsx
import { ScrollArea, ScrollBar } from "@tennr/lasso/scroll-area";

function CustomScrollbarExample() {
  return (
    <ScrollArea className="h-72 w-48 rounded-sm border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm p-2 border-b">
            {tag}
          </div>
        ))}
      </div>
      <ScrollBar className="bg-primary/10" />
    </ScrollArea>
  );
}
```

## Props Reference

### ScrollArea

Extends `React.ComponentProps<typeof ScrollAreaPrimitive.Root>`.

- `className`: `string` - Additional CSS classes for the root container
- `children`: `React.ReactNode` - Content to be rendered inside the scrollable area

### ScrollBar

Extends `React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>`.

- `className`: `string` - Additional CSS classes for the scrollbar
- `orientation`: `"vertical" | "horizontal"` - Direction of the scrollbar (default: `"vertical"`)

## Styling Details

### ScrollArea Viewport

The viewport (inner scrollable container) includes:

- `size-full` - Takes full width and height of the container
- `rounded-[inherit]` - Inherits border radius from parent
- Focus ring styles for keyboard navigation

### ScrollBar

The scrollbar styling varies by orientation:

**Vertical (default):**

- Full height, 2.5 units wide (`w-2.5`)
- Transparent left border for spacing

**Horizontal:**

- Full width, 2.5 units tall (`h-2.5`)
- Transparent top border for spacing

### ScrollArea Thumb

- Uses `bg-border` color
- Rounded full (`rounded-full`)
- Flexible sizing (`flex-1`)

## Accessibility

The ScrollArea component is accessible:

- Built on Radix UI's accessible primitives
- Keyboard navigable with visible focus states
- Proper scroll semantics for assistive technology
- Touch-friendly scrollbar interaction

## Related Components

- For dropdown menus with scrollable content, the ScrollArea can be nested inside a `DropdownMenu`
- For modal dialogs with long content, use ScrollArea inside a `Dialog`
- For command palettes with many options, use ScrollArea with a `Command` component
- For simple overflow scenarios, consider using CSS `overflow-auto` instead
