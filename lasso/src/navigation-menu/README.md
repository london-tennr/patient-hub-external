# NavigationMenu Component

## Overview

The NavigationMenu component is a horizontal navigation bar with support for dropdown menus and rich content panels. It provides a flexible, accessible way to organize site navigation with hierarchical structure. Built on top of Radix UI's Navigation Menu primitive, it offers smooth animations, keyboard navigation, and a consistent, styled implementation for the Tennr design system.

## What It Is

The NavigationMenu component consists of multiple sub-components that work together:

- **NavigationMenu** (root): The container that manages the navigation state and behavior
- **NavigationMenuList**: A container for menu items, rendered as an unordered list
- **NavigationMenuItem**: An individual item within the navigation menu
- **NavigationMenuTrigger**: A button that opens a dropdown content panel
- **NavigationMenuContent**: The dropdown panel containing links or rich content
- **NavigationMenuLink**: A navigational link within the menu or content panel
- **NavigationMenuViewport**: The animated container for dropdown content
- **NavigationMenuIndicator**: An optional visual indicator showing the active trigger
- **navigationMenuTriggerStyle**: A reusable style function for consistent trigger/link styling

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns for navigation menus
- **Animated**: Smooth slide and fade animations for content transitions
- **Flexible Layout**: Supports both simple link menus and complex dropdown panels with rich content
- **Viewport Control**: Optional viewport wrapper for dropdown content positioning
- **Keyboard Navigation**: Full keyboard support including arrow keys and Tab navigation
- **Customizable**: Accepts className props for styling customization on all sub-components

## When to Use

Use the NavigationMenu component when you need to:

1. **Primary Site Navigation**: Create a main navigation bar for websites or applications

   - Header navigation with dropdowns
   - Documentation site navigation
   - Marketing site navigation
   - Dashboard top-level navigation

2. **Hierarchical Navigation**: Organize navigation items with sub-menus and categorized links

   - Product feature categories
   - Service offerings with detailed descriptions
   - Documentation sections with nested topics
   - Resource links grouped by type

3. **Rich Navigation Content**: Display more than just links in navigation dropdowns

   - Featured content previews
   - Quick action panels
   - Category cards with descriptions
   - Promotional banners within navigation

4. **Horizontal Menu Bars**: Present navigation options in a horizontal layout

   - Desktop navigation headers
   - Application toolbars
   - Section navigation within pages

## When NOT to Use

Avoid using the NavigationMenu component when:

1. **Vertical Navigation**: For sidebar or vertical navigation layouts

   - Sidebar menus (use a Sidebar component)
   - Vertical link lists (use a simple List or Nav component)
   - Tree navigation (use a Tree component)

2. **Mobile Primary Navigation**: For mobile-first navigation patterns

   - Mobile hamburger menus (use a Sheet/Drawer component)
   - Mobile tab bars (use a TabBar or BottomNavigation component)
   - Off-canvas navigation

3. **Context Menus**: For right-click or contextual action menus

   - Right-click menus (use a ContextMenu component)
   - Action menus on items (use a DropdownMenu component)
   - Tooltip-style quick actions

4. **Simple Link Lists**: When navigation doesn't need dropdown functionality

   - Footer link sections
   - Breadcrumb navigation (use a Breadcrumb component)
   - Tab navigation (use a Tabs component)
   - Pagination (use a Pagination component)

5. **In-Page Navigation**: For navigating within a single page

   - Table of contents (use anchor links)
   - Section jumps
   - Scroll-based navigation

6. **Command/Action Palettes**: For search-driven navigation or command execution

   - Command palettes (use a Command component)
   - Search interfaces

## Usage Example

### Basic Navigation Menu with Dropdowns

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@tennr/lasso/navigation-menu";

function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <a href="/products/analytics">
                    <div className="font-medium">Analytics</div>
                    <p className="text-sm text-muted-foreground">
                      Track and analyze your data
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a href="/products/automation">
                    <div className="font-medium">Automation</div>
                    <p className="text-sm text-muted-foreground">
                      Automate your workflows
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/pricing"
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### Simple Navigation Menu (Links Only)

```tsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@tennr/lasso/navigation-menu";

function SimpleNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/about"
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/contact"
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### Navigation Menu without Viewport (Inline Dropdowns)

```tsx
<NavigationMenu viewport={false}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Options</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Content renders inline without viewport wrapper */}
        <div className="p-4">Dropdown content here</div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Props Reference

### NavigationMenu

The root container component.

- `viewport`: `boolean` - Whether to render the viewport wrapper for content (default: `true`)
- `value`: `string` - Controlled value of the active menu item
- `defaultValue`: `string` - Default value of the active menu item
- `onValueChange`: `(value: string) => void` - Callback when active item changes
- `delayDuration`: `number` - Delay before opening on hover (default: 200ms)
- `skipDelayDuration`: `number` - How long to skip delay after last close (default: 300ms)
- `orientation`: `"horizontal" | "vertical"` - Menu orientation (default: "horizontal")
- `className`: `string` - Additional CSS classes

### NavigationMenuList

Container for menu items.

- `className`: `string` - Additional CSS classes

### NavigationMenuItem

Individual menu item container.

- `value`: `string` - Unique value for the item (required when using triggers)
- `className`: `string` - Additional CSS classes

### NavigationMenuTrigger

Button that toggles the dropdown content.

- `className`: `string` - Additional CSS classes
- `children`: `React.ReactNode` - Trigger label content

### NavigationMenuContent

The dropdown content panel.

- `className`: `string` - Additional CSS classes
- `forceMount`: `boolean` - Force mounting for animation control

### NavigationMenuLink

A navigational link.

- `active`: `boolean` - Whether the link is currently active
- `asChild`: `boolean` - Merge props onto child element
- `onSelect`: `(event: Event) => void` - Callback when link is selected
- `className`: `string` - Additional CSS classes

### NavigationMenuViewport

The animated viewport container for dropdown content.

- `className`: `string` - Additional CSS classes
- `forceMount`: `boolean` - Force mounting for animation control

### NavigationMenuIndicator

Visual indicator for the active trigger.

- `className`: `string` - Additional CSS classes
- `forceMount`: `boolean` - Force mounting for animation control

### navigationMenuTriggerStyle

A `cva` style function that returns consistent styling for triggers and standalone links. Use this to style `NavigationMenuLink` components that don't have dropdowns to match the appearance of triggers.

```tsx
<NavigationMenuLink className={navigationMenuTriggerStyle()} href="/page">
  Page Link
</NavigationMenuLink>
```

## Accessibility

The NavigationMenu component is fully accessible out of the box:

- Keyboard navigation support:
  - `Tab` / `Shift+Tab`: Move focus between items
  - `Enter` / `Space`: Open dropdown or activate link
  - `Arrow Left` / `Arrow Right`: Navigate between top-level items
  - `Arrow Down`: Open dropdown or move into content
  - `Escape`: Close open dropdown
- ARIA attributes automatically managed (`aria-expanded`, `aria-controls`, etc.)
- Focus management handled correctly with focus trapping in dropdowns
- Screen reader announcements for state changes
- Supports both mouse hover and click interactions

## Related Components

- For vertical sidebar navigation, use a `Sidebar` component
- For tab-based navigation, use a `Tabs` component
- For context menus triggered by right-click, use a `ContextMenu` component
- For dropdown menus triggered by a button, use a `DropdownMenu` component
- For mobile navigation, consider using a `Sheet` or `Drawer` component
- For breadcrumb navigation, use a `Breadcrumb` component
