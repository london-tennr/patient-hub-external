# Badge Component

## Overview

The Badge component is a small visual indicator used to display status, labels, counts, or short pieces of information. It's commonly used to highlight new features, show notification counts, indicate status, or categorize content. Built with class-variance-authority for consistent variant styling and Radix UI's Slot for polymorphic rendering in the Tennr design system.

## What It Is

The Badge is a simple, inline display component that:

- **Displays Status**: Shows visual status indicators with semantic color variants
- **Supports Icons**: Automatically sizes and aligns icons placed within the badge
- **Polymorphic Rendering**: Can render as different elements using the `asChild` prop
- **Consistent Styling**: Uses design tokens for colors that work in light and dark modes

### Key Features

- **Multiple Variants**: 10 semantic variants (default, primary, secondary, destructive, outline, success, warning, info, muted, dark)
- **Icon Support**: Built-in styling for SVG icons with automatic sizing
- **Polymorphic**: Can render as any element using `asChild` prop (links, buttons, etc.)
- **Accessible**: Proper focus states and ARIA support
- **Compact**: Pill-shaped design that fits well inline with text
- **Responsive**: Prevents text wrapping and maintains consistent sizing

## When to Use

Use the Badge component when you need to:

1. **Show Status**: Indicate the current state of an item

   - Active/Inactive states
   - Online/Offline indicators
   - Approval status (Approved, Pending, Rejected)
   - Completion states

2. **Display Counts**: Show notification or item counts

   - Unread message counts
   - Cart item counts
   - Notification badges
   - Results counts

3. **Categorize Content**: Label or tag items

   - Category labels
   - Feature flags (New, Beta, Pro)
   - Content types
   - Priority levels

4. **Highlight Information**: Draw attention to important details

   - New features
   - Limited time offers
   - Important tags
   - Version indicators

5. **Provide Visual Feedback**: Show semantic meaning through color

   - Success messages
   - Warning indicators
   - Error states
   - Informational tags

## When NOT to Use

Avoid using the Badge component when:

1. **Long Text Content**: The content is more than a few words

   - Use a Card or Alert component instead
   - Use a Tooltip for longer descriptions
   - Consider breaking into multiple badges

2. **Primary Actions**: The element needs to trigger an action

   - Use a Button component
   - Use an ActionButton for async operations
   - Use a Link for navigation

3. **Complex States**: You need to show detailed state information

   - Use a Status component with description
   - Use a Card with multiple fields
   - Use an Alert for detailed messages

4. **Large Content Areas**: Marking large regions of content

   - Use a Card or Section component
   - Use visual dividers or headers
   - Use background colors on containers

5. **Standalone Information**: The badge would appear without context

   - Use a full sentence or label instead
   - Provide accompanying text
   - Consider if the information needs more explanation

6. **Interactive Complex Behavior**: You need more than simple click handling

   - Use a Button with dropdown
   - Use a Menu component
   - Use a Popover for additional content

## Usage Example

```tsx
import { Badge } from "@tennr/lasso/badge";

function MyComponent() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Expired</Badge>
    </div>
  );
}
```

### Example with Icons

```tsx
import { Icon } from "@iconify/react";

import { Badge } from "@tennr/lasso/badge";

function StatusBadge() {
  return (
    <Badge variant="success">
      <Icon icon="ph:check-circle" />
      Completed
    </Badge>
  );
}
```

### Example as Link

```tsx
import { Badge } from "@tennr/lasso/badge";

function LinkBadge() {
  return (
    <Badge asChild variant="primary">
      <a href="/new-features">New Features</a>
    </Badge>
  );
}
```

### Example with Notification Count

```tsx
import { Badge } from "@tennr/lasso/badge";

function NotificationBadge({ count }: { count: number }) {
  return <Badge variant="destructive">{count > 99 ? "99+" : count}</Badge>;
}
```

## Props Reference

### Badge

- `variant`: `"default" | "primary" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "muted" | "dark"` - The visual style variant (default: "default")
- `asChild`: `boolean` - When true, renders as the child element instead of a span (default: false)
- `className`: `string` - Additional CSS classes to apply
- All standard HTML span attributes are also supported

### Variant Descriptions

| Variant       | Description                                    | Use Case                           |
| ------------- | ---------------------------------------------- | ---------------------------------- |
| `default`     | Blue background, blue text                     | General purpose, primary info      |
| `primary`     | Blue background, blue text (same as default)   | Primary emphasis                   |
| `secondary`   | Secondary background, primary foreground       | Less prominent badges              |
| `destructive` | Error background, destructive text             | Errors, deletions, critical states |
| `outline`     | Transparent with border                        | Subtle, less prominent badges      |
| `success`     | Green background, green text                   | Success states, active items       |
| `warning`     | Orange background, orange text                 | Warnings, pending states           |
| `info`        | Blue background, blue text                     | Informational messages             |
| `muted`       | Accent background, foreground text             | Disabled or inactive states        |
| `dark`        | Brand secondary background, primary foreground | High contrast, prominent badges    |

## Accessibility

The Badge component includes accessibility considerations:

- **Focus States**: Proper focus ring styling for keyboard navigation when used as interactive element
- **Color Contrast**: Variants are designed with sufficient color contrast for readability
- **Semantic HTML**: Renders as a `<span>` by default, or any element via `asChild`
- **ARIA Support**: Accepts aria-invalid and other ARIA attributes
- **Screen Reader Friendly**: Content is read naturally by screen readers

When using Badge for status indicators, consider adding `aria-label` or visually hidden text for screen readers if the color alone conveys meaning.

## Related Components

- For longer messages or alerts, use the `Alert` component
- For actionable items, use the `Button` component
- For async actions with state, use the `ActionButton` component
- For displaying user avatars with status, use the `Avatar` component with Badge
- For grouping related badges, consider using a flex container with gap
