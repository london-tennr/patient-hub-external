# Card Component

## Overview

The Card component is a versatile container for grouping related content and actions. It provides a consistent visual structure with distinct sections for headers, content, and footers. Built as a set of composable sub-components, it offers flexibility for various use cases while maintaining design consistency in the Tennr design system.

## What It Is

The Card component consists of seven sub-components that work together:

- **Card** (root): The main container with border, shadow, and background styling
- **CardHeader**: A grid-based header section for titles, descriptions, and actions
- **CardTitle**: The primary title/heading text within the header
- **CardDescription**: Secondary descriptive text within the header
- **CardAction**: A positioned slot for action elements (buttons, menus) in the header
- **CardContent**: The main body content area
- **CardFooter**: A footer section for actions or supplementary information

### Key Features

- **Composable**: Mix and match sub-components as needed
- **Flexible Layout**: Header supports automatic grid layout with optional action slot
- **Consistent Styling**: Pre-configured spacing, typography, and borders
- **Customizable**: All sub-components accept className props for style overrides
- **Semantic Slots**: Data-slot attributes for styling and testing hooks
- **Container Queries**: Header uses @container for responsive layouts

## When to Use

Use the Card component when you need to:

1. **Group Related Information**: Display cohesive units of content that belong together

   - User profiles
   - Product summaries
   - Feature highlights
   - Settings sections

2. **Create Visual Hierarchy**: Establish clear boundaries between different content areas

   - Dashboard widgets
   - List items with rich content
   - Preview panels
   - Summary blocks

3. **Present Structured Data**: Show information with clear header, body, and footer sections

   - Data summaries
   - Statistics displays
   - Status cards
   - Notification previews

4. **House Interactive Elements**: Contain forms, actions, or interactive content

   - Login/signup forms
   - Quick actions panels
   - Filter cards
   - Configuration panels

5. **Display Media with Context**: Combine images or media with descriptive content

   - Article previews
   - Portfolio items
   - Gallery cards
   - Media players

## When NOT to Use

Avoid using the Card component when:

1. **Simple Text**: For plain text without structure, use typography components directly

   - Paragraphs of text
   - Simple labels
   - Inline content

2. **Full-Width Layouts**: When content should span the entire container without visual boundaries

   - Page sections
   - Full-bleed content
   - Continuous scrolling feeds

3. **Dense Lists**: For compact, repeating items without rich content

   - Simple navigation menus
   - Dropdown options
   - Basic item lists (use a List component)

4. **Overlays**: For content that appears above other content

   - Modals (use Dialog)
   - Tooltips (use Tooltip)
   - Popovers (use Popover)
   - Dropdown menus (use DropdownMenu)

5. **Inline Elements**: When the element should flow with surrounding text

   - Tags (use Badge)
   - Chips
   - Inline status indicators

6. **Tabular Data**: For structured rows and columns of data

   - Data tables (use Table or DataTable)
   - Spreadsheet-like interfaces

## Usage Example

```tsx
import { Button } from "@tennr/lasso/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@tennr/lasso/card";

function ProfileCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Engineer at Tennr</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Building great products with React and TypeScript.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View Profile</Button>
      </CardFooter>
    </Card>
  );
}
```

### Example with Action Button

```tsx
import { Button } from "@tennr/lasso/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tennr/lasso/card";

function NotificationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Message</CardTitle>
        <CardDescription>You have a new message from the team</CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">
            Dismiss
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Click to view the full message...</p>
      </CardContent>
    </Card>
  );
}
```

### Example with Border Sections

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@tennr/lasso/card";

function SectionedCard() {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your settings content here...</p>
      </CardContent>
      <CardFooter className="border-t">
        <p>Last updated: Today</p>
      </CardFooter>
    </Card>
  );
}
```

## Props Reference

### Card

- `className`: `string` - Additional CSS classes to apply to the card container
- `...props`: All standard HTML `div` element props are supported

### CardHeader

- `className`: `string` - Additional CSS classes (note: uses CSS grid layout)
- `...props`: All standard HTML `div` element props are supported

### CardTitle

- `className`: `string` - Additional CSS classes
- `...props`: All standard HTML `div` element props are supported

### CardDescription

- `className`: `string` - Additional CSS classes
- `...props`: All standard HTML `div` element props are supported

### CardAction

- `className`: `string` - Additional CSS classes
- `...props`: All standard HTML `div` element props are supported

Note: CardAction is automatically positioned in the top-right of CardHeader when used together.

### CardContent

- `className`: `string` - Additional CSS classes
- `...props`: All standard HTML `div` element props are supported

### CardFooter

- `className`: `string` - Additional CSS classes
- `...props`: All standard HTML `div` element props are supported

## Styling Notes

- The Card has a default border and subtle shadow
- CardHeader and CardFooter can have borders added via `border-b` and `border-t` classes respectively, which automatically adjust padding
- CardAction uses CSS grid positioning to align with the header content
- All text styling uses the Tennr design system typography tokens

## Accessibility

The Card component uses semantic HTML and provides:

- Proper content structure with logical heading hierarchy
- Data-slot attributes for automated testing
- No interactive elements by default (add your own accessible buttons, links, etc.)
- Content is fully accessible to screen readers

For interactive cards, ensure:

- Add appropriate ARIA roles if the entire card is clickable
- Use proper heading levels (h2, h3, etc.) instead of CardTitle for document outline
- Ensure sufficient color contrast for all text

## Related Components

- For collapsible content sections, use the `Accordion` component
- For modal dialogs, use the `Dialog` component
- For sidebar navigation, use the `Sidebar` component
- For tabular data, use the `Table` or `DataTable` component
- For simple containers without styling, use a plain `div`
