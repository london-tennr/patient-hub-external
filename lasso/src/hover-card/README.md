# HoverCard Component

## Overview

The HoverCard component displays rich content in a floating card that appears when a user hovers over a trigger element. It's built on top of Radix UI's HoverCard primitive and provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The HoverCard component consists of three sub-components that work together:

- **HoverCard** (root): The container that manages the hover state and behavior
- **HoverCardTrigger**: The element that triggers the hover card to appear
- **HoverCardContent**: The floating content that displays when hovering

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Animated**: Smooth open/close animations with fade and zoom effects
- **Flexible Positioning**: Supports multiple alignment options (start, center, end)
- **Customizable**: Accepts className props for styling customization
- **Portal Rendering**: Content renders in a portal to avoid z-index and overflow issues

## When to Use

Use the HoverCard component when you need to:

1. **Preview Content**: Show additional information about an element without requiring a click

   - User profile previews
   - Link previews
   - Product thumbnails
   - Social media mentions

2. **Contextual Information**: Display supplementary details on hover

   - Tooltip-like content with rich formatting
   - Metadata about an item
   - Quick actions or shortcuts
   - Status information

3. **Progressive Disclosure**: Reveal extra information without navigation

   - Author information on bylines
   - Definition or explanation of terms
   - Related content previews
   - Contact information

4. **Non-Intrusive Details**: Add information that doesn't interrupt the user flow

   - Additional context for links
   - Image or video previews
   - Statistics or metrics
   - Quick reference information

## When NOT to Use

Avoid using the HoverCard component when:

1. **Touch Devices**: The content is essential for mobile/touch users (hover doesn't work reliably on touch)

   - Primary navigation elements
   - Critical form information
   - Required user actions
   - Essential content that must be accessible to all users

2. **Interactive Content**: The hover card needs to contain complex interactions

   - Forms or input fields (use a Dialog or Popover instead)
   - Multi-step workflows (use a Modal)
   - Extensive interactive elements (use a Dropdown or Menu)

3. **Simple Text**: The content is just a short text label

   - Use a Tooltip component instead
   - Single-line descriptions
   - Status labels

4. **Critical Information**: Users must see this information to complete a task

   - Error messages (use inline errors or alerts)
   - Required form field hints (use inline help text)
   - Important warnings (use Alert or Banner)

5. **Frequently Accessed Content**: Users need quick, repeated access to this information

   - Use a sidebar or panel instead
   - Navigation menus (use a proper Nav component)
   - Persistent UI elements

## Usage Example

```tsx
import { Button } from "@tennr/lasso/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@tennr/lasso/hover-card";

function MyComponent() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="text">@username</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@username</h4>
            <p className="text-sm">
              Software engineer passionate about building great user
              experiences.
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Joined January 2023
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

### Example with Avatar

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="text">@vercel</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-sm font-semibold">V</span>
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@vercel</h4>
        <p className="text-sm">
          Develop. Preview. Ship. For the best frontend teams.
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Example with Custom Positioning

```tsx
<HoverCard openDelay={200} closeDelay={100}>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent align="start" sideOffset={8}>
    <p>Content aligned to start with larger offset</p>
  </HoverCardContent>
</HoverCard>
```

## Props Reference

### HoverCard

- `defaultOpen`: `boolean` - Whether the hover card is open by default
- `open`: `boolean` - Controlled open state
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes
- `openDelay`: `number` - Delay in ms before opening (default: 700)
- `closeDelay`: `number` - Delay in ms before closing (default: 300)

### HoverCardTrigger

- `asChild`: `boolean` - Merge props onto child element instead of rendering a button
- `className`: `string` - Additional CSS classes

### HoverCardContent

- `align`: `"start" | "center" | "end"` - Alignment relative to the trigger (default: "center")
- `sideOffset`: `number` - Distance in pixels from the trigger (default: 4)
- `className`: `string` - Additional CSS classes
- `side`: `"top" | "right" | "bottom" | "left"` - Preferred side to render
- `alignOffset`: `number` - Offset from the alignment position
- `avoidCollisions`: `boolean` - Whether to flip when constrained (default: true)

## Accessibility

The HoverCard component is fully accessible out of the box:

- Keyboard accessible when trigger is focusable
- ARIA attributes automatically managed
- Focus is not moved to the hover card (appropriate for supplementary content)
- Content is hidden from screen readers when closed
- Proper role attributes for the content container

## Related Components

- For simple text hints, use a Tooltip component
- For click-triggered floating content, use a Popover component
- For dropdown menus with actions, use a DropdownMenu component
- For modal dialogs, use a Dialog component
