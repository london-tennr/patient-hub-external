# Collapsible Component

## Overview

The Collapsible component is a simple primitive for creating expandable/collapsible sections of content. Unlike the Accordion component which provides opinionated styling and manages multiple sections, Collapsible is a headless primitive that gives you full control over the visual design while handling all the state management and accessibility concerns. It's built on top of Radix UI's Collapsible primitive for the Tennr design system.

## What It Is

The Collapsible component consists of three sub-components that work together:

- **Collapsible** (root): The container that manages the open/closed state
- **CollapsibleTrigger**: The clickable element that toggles the content visibility
- **CollapsibleContent**: The container for content that will be shown or hidden

### Key Features

- **Accessible**: Built on Radix UI primitives with full keyboard and screen reader support
- **Headless**: No default styling - complete freedom over visual design
- **Controlled or Uncontrolled**: Supports both controlled (`open`/`onOpenChange`) and uncontrolled (`defaultOpen`) usage
- **Composable**: Trigger can wrap any element using the `asChild` prop
- **Animation-Ready**: Exposes `data-state` attribute for CSS transitions and animations

## When to Use

Use the Collapsible component when you need to:

1. **Single Expandable Section**: Show/hide a single piece of content with a toggle

   - "Show more" / "Show less" toggles
   - Expandable cards
   - Reveal additional options
   - Detail panels

2. **Custom Visual Design**: Need full control over the trigger and content styling

   - Custom animations
   - Non-standard toggle patterns
   - Brand-specific designs
   - Complex nested layouts

3. **Custom Trigger Elements**: Need the trigger to be something other than a button

   - Clickable headers
   - Icon toggles
   - Interactive cards
   - Custom button components

4. **Simple State Management**: Need basic open/closed state without multiple-section coordination

   - Single reveal sections
   - Expandable notes
   - Optional content areas
   - Progressive disclosure

## When NOT to Use

Avoid using the Collapsible component when:

1. **Multiple Related Sections**: You have several collapsible sections that should be coordinated

   - FAQ lists (use Accordion)
   - Expandable menus with multiple items (use Accordion)
   - Settings with grouped options (use Accordion)

2. **You Need Default Styling**: You want opinionated, consistent styling out of the box

   - Standard accordions (use Accordion component)
   - Consistent UI patterns across the app
   - Quick implementations without custom styling

3. **Complex Interactions**: The expand/collapse is part of a larger interaction pattern

   - Navigation menus (use NavigationMenu or Sidebar)
   - Dropdown menus (use DropdownMenu)
   - Modal-like reveals (use Dialog or Sheet)

4. **Content Should Always Be Visible**: The information is critical and shouldn't be hidden

   - Error messages
   - Required form fields
   - Primary actions or calls-to-action

## Usage Example

### Basic Usage (Uncontrolled)

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@tennr/lasso/collapsible";

function MyComponent() {
  return (
    <Collapsible defaultOpen={false}>
      <CollapsibleTrigger className="flex items-center gap-2">
        <span>Show more details</span>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>This content can be shown or hidden.</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### Controlled Usage

```tsx
import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@tennr/lasso/collapsible";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger>
        {isOpen ? "Hide details" : "Show details"}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>Controlled content that responds to external state.</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### Using asChild for Custom Triggers

```tsx
import { Button } from "@tennr/lasso/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@tennr/lasso/collapsible";

function MyComponent() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm">
          Toggle
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>Content revealed by the custom button trigger.</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### With CSS Animations

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@tennr/lasso/collapsible";

function MyComponent() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Animated Section</CollapsibleTrigger>
      <CollapsibleContent className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
        <p>This content animates in and out.</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

## Props Reference

### Collapsible (Root)

- `defaultOpen`: `boolean` - The default open state when uncontrolled
- `open`: `boolean` - The controlled open state
- `onOpenChange`: `(open: boolean) => void` - Event handler called when the open state changes
- `disabled`: `boolean` - When true, prevents the user from interacting with the collapsible
- `className`: `string` - Additional CSS classes

### CollapsibleTrigger

- `asChild`: `boolean` - When true, renders the child element instead of the default button
- `className`: `string` - Additional CSS classes

### CollapsibleContent

- `forceMount`: `boolean` - When true, content remains in the DOM when closed (useful for animations)
- `className`: `string` - Additional CSS classes

## Accessibility

The Collapsible component is fully accessible out of the box:

- Keyboard navigation support (Enter, Space to toggle)
- ARIA attributes automatically managed (`aria-expanded`, `aria-controls`)
- Focus management handled correctly
- Screen reader announcements for state changes

## Related Components

- For multiple collapsible sections, use the **Accordion** component
- For dropdown content triggered by buttons, use the **DropdownMenu** component
- For modal-like overlays, use the **Dialog** or **Sheet** component
- For navigation hierarchies, use the **NavigationMenu** or **Sidebar** component
