# Accordion Component

## Overview

The Accordion component is a vertically stacked set of collapsible content sections. Each section contains a trigger (header) that users can click to expand or collapse the associated content. It's built on top of Radix UI's Accordion primitive and provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Accordion component consists of four sub-components that work together:

- **Accordion** (root): The container that manages the accordion state and behavior
- **AccordionItem**: An individual collapsible section within the accordion
- **AccordionTrigger**: The clickable header that expands/collapses the content
- **AccordionContent**: The collapsible content that appears when expanded

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Animated**: Smooth open/close animations by default
- **Flexible**: Supports single or multiple open items
- **Customizable**: Accepts className props for styling customization
- **Arrow Control**: Optional arrow icon positioning and visibility control

## When to Use

Use the Accordion component when you need to:

1. **Organize Related Content**: Group related information into collapsible sections to reduce visual clutter and help users focus on specific topics

   - FAQ sections
   - Feature explanations
   - Step-by-step instructions
   - Settings panels with grouped options

2. **Progressive Disclosure**: Show summary information first, with details available on demand

   - Product specifications
   - Terms and conditions
   - Detailed documentation
   - Error explanations

3. **Space Efficiency**: Display a lot of content in a compact space without overwhelming the user

   - Navigation menus with sub-items
   - Form sections
   - Dashboard widgets
   - Help documentation

4. **Hierarchical Information**: Present information in a clear hierarchy where not all details need to be visible at once
   - Nested categories
   - Multi-level content structures
   - Expandable lists

## When NOT to Use

Avoid using the Accordion component when:

1. **Critical Information**: The content must always be visible and immediately accessible

   - Error messages that need immediate attention
   - Required form fields
   - Critical warnings or alerts
   - Primary call-to-action buttons

2. **Simple Lists**: For straightforward lists without hierarchical relationships, use simpler components

   - Basic navigation menus (use a Menu or Nav component)
   - Simple item lists (use a List component)
   - Tabular data (use a Table component)

3. **Frequent Interaction**: When users need to see and interact with multiple sections simultaneously

   - Comparison tables
   - Multi-step forms where all steps need visibility
   - Dashboard widgets that should all be visible

4. **Single Item**: If you only have one collapsible section, consider using a simpler collapsible component or a Details/Summary HTML element

5. **Mobile Navigation**: For primary navigation on mobile devices, consider a drawer or menu component instead

## Usage Example

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@tennr/lasso/accordion";

function MyComponent() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Question 1</AccordionTrigger>
        <AccordionContent>Answer to question 1 goes here.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Question 2</AccordionTrigger>
        <AccordionContent>Answer to question 2 goes here.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Props Reference

### Accordion

- `type`: `"single" | "multiple"` - Controls whether one or multiple items can be open
- `collapsible`: `boolean` - When `type="single"`, allows closing the open item
- `defaultValue`: `string | string[]` - Initial open item(s)
- `value`: `string | string[]` - Controlled value
- `onValueChange`: `(value: string | string[]) => void` - Change handler

### AccordionTrigger

- `showArrowByName`: `boolean` - If true, arrow appears after the content instead of before
- `hideArrow`: `boolean` - If true, hides the arrow icon completely
- `className`: `string` - Additional CSS classes

### AccordionItem

- `value`: `string` - Unique identifier for the item (required)
- `className`: `string` - Additional CSS classes

### AccordionContent

- `className`: `string` - Additional CSS classes

## Accessibility

The Accordion component is fully accessible out of the box:

- Keyboard navigation support (Arrow keys, Enter, Space)
- ARIA attributes automatically managed
- Focus management handled correctly
- Screen reader announcements for state changes

## Related Components

- For simple expand/collapse of a single section, consider a Collapsible component
- For tabbed interfaces, use a Tabs component
- For dropdown menus, use a DropdownMenu component
