# Sidebar Component

## Overview

The Sidebar component is a responsive navigation container that provides a collapsible side panel for organizing application navigation, actions, and content. It adapts automatically to different screen sizes, displaying as a slide-out sheet on mobile devices and a fixed/floating panel on desktop. Built on top of Radix UI primitives with consistent styling for the Tennr design system.

## What It Is

The Sidebar is a comprehensive component system consisting of multiple sub-components that work together:

### Core Components

- **SidebarProvider**: Context provider that manages sidebar state and provides the `useSidebar` hook
- **Sidebar**: The main sidebar container with support for different variants and positions
- **SidebarTrigger**: A button to toggle the sidebar open/closed
- **SidebarRail**: An invisible rail for toggling the sidebar via drag/click
- **SidebarInset**: Main content area that adjusts based on sidebar state

### Layout Components

- **SidebarHeader**: Container for sidebar header content (logo, title, etc.)
- **SidebarContent**: Scrollable content area for the main sidebar body
- **SidebarFooter**: Container for sidebar footer content (user info, actions)
- **SidebarSeparator**: Visual divider between sidebar sections
- **SidebarInput**: Styled input component for search or filtering

### Grouping Components

- **SidebarGroup**: Container for grouping related menu items
- **SidebarGroupLabel**: Label/title for a sidebar group
- **SidebarGroupAction**: Action button positioned in the group header
- **SidebarGroupContent**: Content container within a group

### Menu Components

- **SidebarMenu**: Container for menu items (renders as `<ul>`)
- **SidebarMenuItem**: Individual menu item container (renders as `<li>`)
- **SidebarMenuButton**: Interactive button/link for menu items with tooltip support
- **SidebarMenuAction**: Secondary action button within a menu item
- **SidebarMenuBadge**: Badge/notification indicator for menu items
- **SidebarMenuSkeleton**: Loading placeholder for menu items
- **SidebarMenuSub**: Container for nested sub-menu items
- **SidebarMenuSubItem**: Individual sub-menu item container
- **SidebarMenuSubButton**: Interactive button/link for sub-menu items

### Hooks

- **useSidebar**: Hook to access sidebar state and controls from any child component

### Key Features

- **Responsive**: Automatically adapts between mobile (sheet) and desktop (fixed panel) views
- **Collapsible**: Multiple collapse modes (offcanvas, icon-only, none)
- **Keyboard Accessible**: Toggle with `Cmd/Ctrl + B` keyboard shortcut
- **State Persistence**: Remembers open/closed state via cookies
- **Customizable**: Three variants (sidebar, floating, inset) and left/right positioning
- **Accessible**: Built on Radix UI primitives with proper ARIA attributes
- **Tooltips**: Automatic tooltips for menu items when collapsed to icon-only mode

## When to Use

Use the Sidebar component when you need to:

1. **Application Navigation**: Provide primary navigation for multi-page applications

   - Dashboard navigation
   - Admin panel menus
   - Settings and configuration pages
   - Multi-section applications

2. **Hierarchical Menus**: Display navigation with nested sub-items

   - Category-based navigation
   - Feature sections with sub-features
   - Documentation with nested topics
   - Project or workspace navigation

3. **Persistent Actions**: Keep common actions accessible throughout the application

   - Quick action buttons
   - User account controls
   - Search functionality
   - Notifications and alerts

4. **Space-Efficient Layouts**: Maximize content area while keeping navigation accessible

   - Data-heavy dashboards
   - Document editors
   - Email clients
   - Project management tools

5. **Responsive Applications**: Need navigation that works well on both mobile and desktop

   - Mobile-first applications
   - Progressive web apps
   - Cross-platform interfaces

## When NOT to Use

Avoid using the Sidebar component when:

1. **Simple Navigation**: For applications with only a few pages

   - Simple landing pages (use a header nav instead)
   - Single-page applications with minimal navigation
   - Marketing sites (use a navigation menu)

2. **Content-First Layouts**: When the sidebar would compete with primary content

   - Article/blog reading experiences
   - Media viewing applications
   - Full-screen presentations
   - Image galleries

3. **Wizard/Step Flows**: For linear multi-step processes

   - Checkout flows (use a stepper)
   - Onboarding wizards
   - Form sequences

4. **Temporary Menus**: When you only need a quick menu

   - Context menus (use ContextMenu or DropdownMenu)
   - Action sheets (use Sheet)
   - Quick settings (use Popover)

5. **Mobile-Only Applications**: When sidebar pattern doesn't fit the mobile UX

   - Tab-based navigation might be more appropriate
   - Bottom sheet navigation
   - Swipe-based interfaces

## Usage Example

```tsx
import { Gear, House, User } from "@phosphor-icons/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@tennr/lasso/sidebar";

function AppLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { title: "Home", url: "/", icon: House },
    { title: "Settings", url: "/settings", icon: Gear },
    { title: "Profile", url: "/profile", icon: User },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="px-2 text-lg font-semibold">My App</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="px-2 text-sm text-muted-foreground">© 2025</p>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
```

### Example with Nested Menu Items

```tsx
<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton>
      <Folder />
      <span>Projects</span>
    </SidebarMenuButton>
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <a href="/projects/active">Active</a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <a href="/projects/archived">Archived</a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarMenuItem>
</SidebarMenu>
```

### Example with Controlled State

```tsx
import { useSidebar } from "@tennr/lasso/sidebar";

function MyComponent() {
  const { open, setOpen, toggleSidebar, state, isMobile } = useSidebar();

  return (
    <div>
      <p>Sidebar is {state}</p>
      <button onClick={toggleSidebar}>Toggle</button>
      <button onClick={() => setOpen(true)}>Open</button>
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  );
}
```

### Example with Different Variants

```tsx
// Floating variant with icon collapse
<SidebarProvider>
  <Sidebar variant="floating" collapsible="icon">
    {/* sidebar content */}
  </Sidebar>
</SidebarProvider>

// Inset variant with SidebarInset for main content
<SidebarProvider>
  <Sidebar variant="inset" collapsible="icon">
    {/* sidebar content */}
  </Sidebar>
  <SidebarInset>
    <main>{/* main content */}</main>
  </SidebarInset>
</SidebarProvider>

// Right-side sidebar
<SidebarProvider>
  <Sidebar side="right" variant="sidebar">
    {/* sidebar content */}
  </Sidebar>
</SidebarProvider>
```

## Props Reference

### SidebarProvider

- `defaultOpen`: `boolean` - Initial open state (default: `true`)
- `open`: `boolean` - Controlled open state
- `onOpenChange`: `(open: boolean) => void` - Callback when open state changes
- `className`: `string` - Additional CSS classes
- `style`: `React.CSSProperties` - Inline styles

### Sidebar

- `side`: `"left" | "right"` - Which side to display the sidebar (default: `"left"`)
- `variant`: `"sidebar" | "floating" | "inset"` - Visual variant (default: `"sidebar"`)
- `collapsible`: `"offcanvas" | "icon" | "none"` - Collapse behavior (default: `"offcanvas"`)
- `className`: `string` - Additional CSS classes

### SidebarTrigger

Extends `Button` props:

- `onClick`: `(event) => void` - Additional click handler (toggle is automatic)
- `className`: `string` - Additional CSS classes

### SidebarMenuButton

- `asChild`: `boolean` - Render as child element (for links)
- `isActive`: `boolean` - Whether the item is currently active
- `variant`: `"default" | "outline"` - Visual variant
- `size`: `"default" | "sm" | "lg"` - Size variant
- `tooltip`: `string | TooltipContentProps` - Tooltip content for collapsed state
- `className`: `string` - Additional CSS classes

### SidebarMenuSubButton

- `asChild`: `boolean` - Render as child element (for links)
- `isActive`: `boolean` - Whether the item is currently active
- `size`: `"sm" | "md"` - Size variant (default: `"md"`)
- `className`: `string` - Additional CSS classes

### SidebarMenuAction

- `asChild`: `boolean` - Render as child element
- `showOnHover`: `boolean` - Only show on hover (default: `false`)
- `className`: `string` - Additional CSS classes

### SidebarMenuSkeleton

- `showIcon`: `boolean` - Whether to show icon skeleton (default: `false`)
- `className`: `string` - Additional CSS classes

### SidebarGroupLabel / SidebarGroupAction

- `asChild`: `boolean` - Render as child element
- `className`: `string` - Additional CSS classes

### useSidebar Hook

Returns an object with:

- `state`: `"expanded" | "collapsed"` - Current sidebar state
- `open`: `boolean` - Whether sidebar is open
- `setOpen`: `(open: boolean) => void` - Set open state
- `openMobile`: `boolean` - Whether mobile sidebar is open
- `setOpenMobile`: `(open: boolean) => void` - Set mobile open state
- `isMobile`: `boolean` - Whether currently on mobile viewport
- `toggleSidebar`: `() => void` - Toggle the sidebar

## CSS Variables

The sidebar uses CSS variables for sizing:

- `--sidebar-width`: Width when expanded (default: `16rem`)
- `--sidebar-width-icon`: Width when collapsed to icons (default: `3rem`)
- `--sidebar-width-mobile`: Width on mobile (default: `18rem`)

## Keyboard Shortcuts

- `Cmd/Ctrl + B`: Toggle sidebar open/closed

## State Persistence

The sidebar automatically persists its open/closed state using a cookie (`sidebar_state`) that lasts for 7 days.

## Accessibility

The Sidebar component is fully accessible:

- Keyboard navigation support
- Proper ARIA attributes via Radix UI primitives
- Screen reader announcements for state changes
- Focus management for mobile sheet
- Skip links compatible

## Related Components

- For simple slide-out panels, use the `Sheet` component
- For dropdown navigation, use the `DropdownMenu` component
- For mobile-only bottom navigation, consider a custom tab bar
- For temporary overlays with actions, use the `Drawer` component
