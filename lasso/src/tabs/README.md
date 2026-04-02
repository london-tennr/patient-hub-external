# Tabs Component

## Overview

The Tabs component is a set of layered content sections—known as tab panels—that display one panel at a time. Users can switch between panels by clicking or navigating to the corresponding tab. It's built on top of Radix UI's Tabs primitive and provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Tabs component consists of four sub-components that work together:

- **Tabs** (root): The container that manages the tabs state and behavior
- **TabsList**: The container for the tab triggers
- **TabsTrigger**: The clickable button that activates its associated tab panel
- **TabsContent**: The content panel that is shown when its associated tab is active

### Key Features

- **Accessible**: Built on Radix UI primitives, following WAI-ARIA design patterns
- **Variant Support**: Offers "default" (pill-style) and "line" (underline-style) variants
- **Size Options**: Line variant supports "sm", "default", and "lg" sizes
- **Customizable**: Accepts className props for styling customization
- **Controlled & Uncontrolled**: Supports both controlled and uncontrolled modes
- **Keyboard Navigation**: Full keyboard support for accessibility

## When to Use

Use the Tabs component when you need to:

1. **Organize Related Content**: Group related information into switchable sections without page navigation

   - Settings panels with different categories (Account, Password, Notifications)
   - Product details (Description, Specifications, Reviews)
   - User profile sections
   - Dashboard views

2. **Space Efficiency**: Display multiple sections of content in a compact space

   - Forms with multiple sections
   - Data views with different perspectives
   - Configuration panels
   - Documentation sections

3. **Clear Navigation**: Provide clear visual indication of available content sections

   - Step-free processes where users can jump between sections
   - Content filtering interfaces
   - Category-based browsing
   - Multi-view displays

4. **Content Comparison**: Allow users to quickly switch between related content views

   - Code vs preview views
   - Different data representations
   - Before/after comparisons
   - Multiple file views

## When NOT to Use

Avoid using the Tabs component when:

1. **Sequential Steps**: The content must be completed in a specific order

   - Multi-step forms with validation (use a Stepper or Wizard component)
   - Checkout flows
   - Onboarding sequences
   - Progressive processes

2. **Primary Navigation**: For main site or app navigation

   - Use a Navigation Menu or Sidebar component instead
   - Top-level app navigation
   - Site-wide navigation

3. **Too Many Options**: When there are more than 5-7 tabs

   - Consider a dropdown or navigation menu instead
   - Use a sidebar for many categories
   - Consider nested navigation patterns

4. **Mobile-First Interfaces**: When vertical space is limited on mobile

   - Consider an accordion or collapsible sections instead
   - Use a bottom navigation for app-level navigation
   - Consider a dropdown selector for many options

5. **Single Content**: If there's only one content section, tabs add unnecessary complexity

6. **Expandable Content**: When users need to see multiple sections at once

   - Use an accordion component instead
   - Consider expandable cards
   - Use a multi-column layout

## Usage Example

### Default Variant

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@tennr/lasso/tabs";

function MyComponent() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">Account settings content goes here.</div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">Password settings content goes here.</div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">General settings content goes here.</div>
      </TabsContent>
    </Tabs>
  );
}
```

### Line Variant

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@tennr/lasso/tabs";

function LineTabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger variant="line" value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger variant="line" value="analytics">
          Analytics
        </TabsTrigger>
        <TabsTrigger variant="line" value="reports">
          Reports
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4">Overview content with line variant tabs.</div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4">Analytics content with line variant tabs.</div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4">Reports content with line variant tabs.</div>
      </TabsContent>
    </Tabs>
  );
}
```

### With Icons

```tsx
import { Icon } from "@iconify/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@tennr/lasso/tabs";

function TabsWithIcons() {
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">
          <Icon icon="ph:user" className="size-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Icon icon="ph:bell" className="size-4" />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="p-4">Profile information and settings.</div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4">Notification preferences and settings.</div>
      </TabsContent>
    </Tabs>
  );
}
```

## Props Reference

### Tabs (Root)

Extends `@radix-ui/react-tabs` Root props:

- `defaultValue`: `string` - The value of the tab that should be active when initially rendered
- `value`: `string` - The controlled value of the tab to activate
- `onValueChange`: `(value: string) => void` - Event handler called when the value changes
- `orientation`: `"horizontal" | "vertical"` - The orientation of the tabs (default: "horizontal")
- `dir`: `"ltr" | "rtl"` - The reading direction
- `activationMode`: `"automatic" | "manual"` - Whether tabs are activated automatically on focus or manually
- `className`: `string` - Additional CSS classes

### TabsList

- `variant`: `"default" | "line"` - Visual style variant (default: "default")
- `size`: `"default" | "sm" | "lg"` - Size variant, only applies to line variant (default: "default")
- `className`: `string` - Additional CSS classes

### TabsTrigger

- `value`: `string` - A unique value for the tab (required)
- `variant`: `"default" | "line"` - Visual style variant (default: "default")
- `size`: `"default" | "sm" | "lg"` - Size variant, only applies to line variant (default: "default")
- `disabled`: `boolean` - Whether the tab is disabled
- `className`: `string` - Additional CSS classes

### TabsContent

- `value`: `string` - A unique value that associates the content with a trigger (required)
- `forceMount`: `boolean` - Force content to be rendered when inactive
- `className`: `string` - Additional CSS classes

## Variants

### Default Variant

The default variant displays tabs as pill-style buttons with a subtle background on the active state. Ideal for:

- Settings panels
- Configuration sections
- Standard tabbed interfaces

### Line Variant

The line variant displays tabs with an underline indicator on the active tab. Available in three sizes:

- **sm**: Compact tabs for dense interfaces
- **default**: Standard size for most use cases
- **lg**: Larger tabs for prominent sections

Ideal for:

- Dashboard views
- Analytics pages
- Content with a more editorial feel

## Accessibility

The Tabs component is fully accessible out of the box:

- **Keyboard Navigation**:

  - `Tab`: Move focus to the active tab, then to the tab content
  - `Arrow Left/Right`: Move focus between tabs (horizontal orientation)
  - `Arrow Up/Down`: Move focus between tabs (vertical orientation)
  - `Home`: Move focus to the first tab
  - `End`: Move focus to the last tab
  - `Enter/Space`: Activate the focused tab

- **ARIA Attributes**: Automatically managed `role`, `aria-selected`, `aria-controls`, and `aria-labelledby`
- **Focus Management**: Proper focus indication and management
- **Screen Reader Support**: Announces tab changes and current selection

## Related Components

- For collapsible sections where multiple can be open, use an Accordion component
- For navigation purposes, use a Navigation Menu or Sidebar component
- For wizard-like flows, use a Stepper component
- For toggling between two options, use a Toggle or Switch component
