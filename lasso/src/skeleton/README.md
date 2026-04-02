# Skeleton Component

## Overview

The Skeleton component is a placeholder loading indicator that mimics the shape of content while it's being loaded. It provides a smooth, animated pulse effect to indicate loading state and helps prevent layout shift by reserving space for content before it renders. It's designed for use in the Tennr design system to create polished loading experiences.

## What It Is

The Skeleton is a simple, single component that:

- **Displays a Placeholder**: Renders a rounded, animated placeholder that mimics content shape
- **Animates Loading State**: Shows a subtle pulse animation to indicate content is loading
- **Preserves Layout**: Maintains consistent dimensions to prevent content shift when data loads
- **Flexible Sizing**: Accepts className props for custom dimensions to match any content shape

### Key Features

- **Animated Pulse**: Built-in CSS animation that provides visual feedback for loading states
- **Customizable Dimensions**: Easily sized via className to match any content shape
- **Accessible**: Non-interactive, purely visual indicator with no accessibility concerns
- **Lightweight**: Minimal implementation with no dependencies
- **Consistent Styling**: Uses accent color from the Tennr design system

## When to Use

Use the Skeleton component when you need to:

1. **Indicate Loading States**: Show users that content is being fetched or processed

   - Data loading from APIs
   - Image loading placeholders
   - Text content loading
   - List item placeholders

2. **Prevent Layout Shift**: Reserve space for content before it loads to maintain stable layouts

   - Card content loading
   - Table rows loading
   - Form fields loading
   - Dashboard widgets loading

3. **Improve Perceived Performance**: Make loading feel faster by showing structure immediately

   - Page initial loads
   - Tab content transitions
   - Modal content loading
   - Infinite scroll loading

4. **Create Content Previews**: Show the shape of content before it's available

   - Profile avatars
   - Article text blocks
   - Media thumbnails
   - Navigation items

5. **Compose Loading States**: Build complex loading UI by combining multiple skeletons

   - Card skeletons
   - List skeletons
   - Table skeletons
   - Form skeletons

## When NOT to Use

Avoid using the Skeleton component when:

1. **Quick Operations**: The operation completes so fast that a skeleton would flash briefly

   - Instant state changes
   - Local data updates
   - UI-only interactions
   - Cached content display

2. **Blocking Operations**: The user cannot proceed until loading completes

   - Critical errors (use an Alert or error state)
   - Required authentication (use a full-page loader)
   - Confirmation dialogs (use a loading button or spinner)

3. **Progress Indication**: You need to show progress of a specific operation

   - File uploads (use a Progress component)
   - Multi-step processes (use a Stepper or Progress)
   - Download progress (use a Progress component)

4. **Background Loading**: Content loads in the background without user awareness

   - Prefetching
   - Background data sync
   - Service worker caching

5. **Interactive Elements**: The placeholder needs to be interactive

   - Loading buttons (use ActionButton or button with spinner)
   - Loading form fields (use disabled state with loading indicator)
   - Interactive loading states (use appropriate loading patterns)

6. **Already Visible Content**: Content is already visible and being refreshed

   - Pull-to-refresh (use a spinner overlay)
   - Background refresh (use subtle indicators)
   - Partial updates (update specific elements)

## Usage Example

```tsx
import { Skeleton } from "@tennr/lasso/skeleton";

function LoadingCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
```

### Example with Avatar and Text

```tsx
import { Skeleton } from "@tennr/lasso/skeleton";

function LoadingProfile() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}
```

### Example with Table Rows

```tsx
import { Skeleton } from "@tennr/lasso/skeleton";

function LoadingTable() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-6 w-[80px]" />
        </div>
      ))}
    </div>
  );
}
```

### Example with Conditional Rendering

```tsx
import { Skeleton } from "@tennr/lasso/skeleton";

function UserProfile({ user, isLoading }: { user?: User; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <img src={user?.avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
      <span>{user?.name}</span>
    </div>
  );
}
```

## Props Reference

### Skeleton

- `className`: `string` - CSS classes to define dimensions and shape of the skeleton
  - Use width classes like `w-32`, `w-[200px]`, or `w-full`
  - Use height classes like `h-4`, `h-[100px]`, or `h-full`
  - Use border-radius classes like `rounded-sm`, `rounded-full`, or `rounded-xl`
- `...props`: `React.ComponentProps<"div">` - All standard div HTML attributes

## Styling

The Skeleton component uses:

- **Background Color**: Uses `bg-accent` from the design system
- **Animation**: Built-in `animate-pulse` for loading indication
- **Border Radius**: Default `rounded-sm`, customizable via className
- **Dimensions**: Set via className - no default size (must be specified)

### Common Dimension Patterns

| Content Type   | Typical Classes                  |
| -------------- | -------------------------------- |
| Avatar (small) | `h-8 w-8 rounded-full`           |
| Avatar (large) | `h-12 w-12 rounded-full`         |
| Text line      | `h-4 w-[200px]`                  |
| Heading        | `h-6 w-[300px]`                  |
| Card image     | `h-[200px] w-full rounded-xl`    |
| Button         | `h-10 w-24 rounded-md`           |
| Icon           | `h-5 w-5 rounded-sm`             |
| Thumbnail      | `h-[100px] w-[100px] rounded-md` |

## Accessibility

The Skeleton component is accessibility-friendly:

- **Non-Interactive**: Pure visual indicator with no interactive elements
- **Screen Reader Neutral**: Does not interfere with screen reader announcements
- **No ARIA Role Needed**: Decorative element that doesn't require special accessibility handling
- **Loading State Communication**: Should be paired with appropriate loading announcements at the container level if needed

## Performance Considerations

- **CSS Animation**: Uses efficient CSS `animate-pulse` animation
- **Minimal DOM**: Single div element with no children
- **No JavaScript Animation**: Animation is CSS-only for better performance
- **Reflow Prevention**: Helps prevent layout shift by reserving space

## Related Components

- For async operations with visual feedback, use the `ActionButton` component
- For progress indication, use the `Progress` component
- For blocking loading states, consider a full-page loader or overlay
- For inline loading spinners, use a `Spinner` component
- For loading states with retry logic, combine with error handling patterns
