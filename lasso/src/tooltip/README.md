# Tooltip Component

## Overview

The Tooltip component is a contextual overlay that displays additional information when users hover over or focus on an element. It provides helpful hints, labels, or descriptions without cluttering the interface. Built on top of Radix UI's Tooltip primitive, it offers a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Tooltip component consists of four sub-components that work together:

- **Tooltip** (root): The container that manages tooltip state and includes the TooltipProvider
- **TooltipTrigger**: The element that triggers the tooltip on hover or focus
- **TooltipContent**: The floating content that displays the tooltip message
- **TooltipProvider**: A context provider for shared tooltip configuration (delay, skip delay duration)
- **TooltipArrow**: An optional arrow element pointing to the trigger (included by default in TooltipContent)

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Animated**: Smooth fade and zoom animations on open/close
- **Instant Display**: Zero delay by default for immediate feedback
- **Flexible Positioning**: Supports top, right, bottom, and left placement with automatic collision detection
- **Arrow Support**: Optional arrow indicator that points to the trigger element
- **Customizable**: Accepts className props for styling customization

## When to Use

Use the Tooltip component when you need to:

1. **Provide Additional Context**: Explain the purpose of an element without adding visible text

   - Icon-only buttons
   - Abbreviated labels
   - Complex form fields
   - Feature hints

2. **Display Supplementary Information**: Show details that support but don't obstruct the primary content

   - Keyboard shortcuts
   - Status details
   - Date/time formatting hints
   - Data validation rules

3. **Label Interactive Elements**: Identify controls that don't have visible labels

   - Toolbar icons
   - Navigation icons
   - Action buttons with icon-only design
   - Avatar badges

4. **Guide User Interactions**: Help users understand what will happen when they interact with an element

   - Button actions
   - Link destinations
   - Drag handles
   - Resize controls

## When NOT to Use

Avoid using the Tooltip component when:

1. **Critical Information**: The content is essential for completing a task

   - Required field labels (use visible labels)
   - Error messages (use inline errors)
   - Important warnings (use alerts or banners)
   - Instructions needed to proceed (use visible text)

2. **Rich Content**: You need to display complex content

   - Images or media (use a Popover or Modal)
   - Multiple actions (use a DropdownMenu)
   - Forms or inputs (use a Popover)
   - Long text (use a Popover or collapsible section)

3. **Touch Devices**: The primary audience uses touch screens

   - Mobile-first interfaces (tooltips require hover)
   - Tablet applications
   - Touch-based kiosks

4. **Interactive Content**: Users need to interact with the tooltip content

   - Clickable links (use a Popover)
   - Buttons or actions (use a DropdownMenu)
   - Form inputs (use a Popover)
   - Selectable text (use a Popover)

5. **Permanent Information**: The information should always be visible

   - Important labels
   - Status indicators that need constant visibility
   - Primary instructions

## Usage Example

```tsx
import { Tooltip, TooltipContent, TooltipTrigger } from "@tennr/lasso/tooltip";

function MyComponent() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button>Hover me</button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is helpful information</p>
      </TooltipContent>
    </Tooltip>
  );
}
```

### Example with Custom Positioning

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <button>Settings</button>
  </TooltipTrigger>
  <TooltipContent side="right" sideOffset={8}>
    <p>Open settings panel</p>
  </TooltipContent>
</Tooltip>
```

### Example without Arrow

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <button>Save</button>
  </TooltipTrigger>
  <TooltipContent arrow={false}>
    <p>Save your changes (Ctrl+S)</p>
  </TooltipContent>
</Tooltip>
```

### Example with Shared Provider (Multiple Tooltips)

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@tennr/lasso/tooltip";

function Toolbar() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Bold</button>
          </TooltipTrigger>
          <TooltipContent>Bold (Ctrl+B)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button>Italic</button>
          </TooltipTrigger>
          <TooltipContent>Italic (Ctrl+I)</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

## Props Reference

### Tooltip

Inherits all props from Radix UI's `Tooltip.Root`. Automatically wraps content with a TooltipProvider.

- `open`: `boolean` - Controlled open state
- `defaultOpen`: `boolean` - Initial open state (uncontrolled)
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes
- `delayDuration`: `number` - Delay in ms before showing (default: 0 via provider)

### TooltipProvider

- `delayDuration`: `number` - Default delay before showing tooltips (default: 0)
- `skipDelayDuration`: `number` - Time to skip delay after a tooltip was shown
- `disableHoverableContent`: `boolean` - Disable hovering over tooltip content

### TooltipTrigger

Inherits all props from Radix UI's `Tooltip.Trigger`.

- `asChild`: `boolean` - Merge props onto child element instead of rendering a button

### TooltipContent

Inherits all props from Radix UI's `Tooltip.Content`.

- `side`: `"top" | "right" | "bottom" | "left"` - Preferred side (default: "top")
- `sideOffset`: `number` - Distance from trigger in pixels (default: 0)
- `align`: `"start" | "center" | "end"` - Alignment along the side (default: "center")
- `alignOffset`: `number` - Offset from alignment in pixels
- `arrow`: `boolean` - Whether to show the arrow indicator (default: true)
- `className`: `string` - Additional CSS classes

### TooltipArrow

Exported for legacy compatibility. Generally not needed as TooltipContent includes an arrow by default.

- `className`: `string` - Additional CSS classes

## Accessibility

The Tooltip component is fully accessible out of the box:

- Keyboard navigation support (Tab to focus trigger, Escape to close)
- ARIA attributes automatically managed (`aria-describedby`)
- Screen reader announcements for tooltip content
- Focus management handled correctly
- Respects `prefers-reduced-motion` for animations

## Related Components

- For interactive content in a floating overlay, use a Popover component
- For dropdown menus with actions, use a DropdownMenu component
- For inline help text, consider using a HelpText or FormDescription component
- For important messages that need attention, use an Alert or Toast component
