# Avatar Component

## Overview

The Avatar component displays a user's profile image with a fallback mechanism. It shows an image when available, and gracefully falls back to displaying initials or other content when the image fails to load or is not provided. Built on top of Radix UI's Avatar primitive, it provides a consistent, accessible, and styled implementation for the Tennr design system.

## What It Is

The Avatar component consists of three sub-components that work together:

- **Avatar** (root): The container that manages the avatar's size, shape, and overflow behavior
- **AvatarImage**: The image element that displays the user's photo or profile picture
- **AvatarFallback**: The fallback content that appears when the image is loading, fails to load, or is not provided

### Key Features

- **Accessible**: Built on Radix UI primitives with proper ARIA attributes
- **Graceful Fallback**: Automatically shows fallback content when the image fails to load
- **Customizable**: Accepts className props for styling and size customization
- **Consistent Styling**: Rounded circular design by default with consistent overflow handling
- **Lightweight**: Minimal component footprint with maximum flexibility

## When to Use

Use the Avatar component when you need to:

1. **Display User Identity**: Show a visual representation of a user in the interface

   - User profiles
   - Comments and discussions
   - Team member lists
   - Account menus and navigation
   - Author attribution

2. **Show Presence in Lists**: Display multiple users in a compact, recognizable format

   - Activity feeds
   - Notification items
   - Chat participants
   - Assignee displays
   - Collaboration indicators

3. **Personalize UI Elements**: Add a human touch to interface elements

   - Greeting messages
   - User-specific dashboards
   - Profile headers
   - Contact cards

4. **Handle Missing Images Gracefully**: When you need a reliable fallback for missing profile pictures

   - New user onboarding (before photo upload)
   - Systems with optional profile photos
   - External user displays where images may not exist

## When NOT to Use

Avoid using the Avatar component when:

1. **Decorative Images**: For non-user images or icons

   - Product images (use an Image component)
   - Logo displays (use a dedicated Logo component)
   - Decorative graphics (use standard img tags or Icon components)

2. **Large Profile Images**: For large, detailed profile photos

   - Profile page hero images
   - Full-page photo displays
   - Image galleries

3. **Interactive Images**: When the image needs complex interactions

   - Zoomable images
   - Image carousels
   - Editable profile photos (wrap Avatar with an edit trigger instead)

4. **Non-Circular Images**: When you need square or rectangular images

   - Thumbnails that must remain square
   - Product images
   - Document previews

5. **Status-Only Indicators**: When you only need to show a status dot without an image

   - Online/offline indicators alone (use a Badge component)
   - Status dots without user context

## Usage Example

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@tennr/lasso/avatar";

function MyComponent() {
  return (
    <Avatar>
      <AvatarImage src="https://example.com/user-photo.jpg" alt="John Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
```

### Example with Custom Size

```tsx
<Avatar className="h-16 w-16">
  <AvatarImage src="/profile.jpg" alt="User profile" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

### Example with Fallback Only

```tsx
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Example in a User List

```tsx
function UserList({ users }) {
  return (
    <div className="flex -space-x-2">
      {users.map((user) => (
        <Avatar key={user.id} className="border-2 border-white">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
```

## Props Reference

### Avatar

- `className`: `string` - Additional CSS classes to customize size, border, or other styles
- All other props are passed through to the Radix UI Avatar root component

### AvatarImage

- `src`: `string` - The URL of the image to display
- `alt`: `string` - Alternative text for the image (required for accessibility)
- `className`: `string` - Additional CSS classes for the image element
- All other props are passed through to the Radix UI Avatar Image component

### AvatarFallback

- `children`: `React.ReactNode` - The fallback content to display (typically initials)
- `className`: `string` - Additional CSS classes for the fallback container
- `delayMs`: `number` - Delay in milliseconds before showing the fallback (useful to prevent flicker)
- All other props are passed through to the Radix UI Avatar Fallback component

## Sizing

The default Avatar size is `size-8` (32x32 pixels). You can customize the size using Tailwind classes:

| Size Class | Dimensions | Use Case                       |
| ---------- | ---------- | ------------------------------ |
| `size-6`   | 24x24px    | Compact lists, inline mentions |
| `size-8`   | 32x32px    | Default, comments, small lists |
| `size-10`  | 40x40px    | User cards, navigation         |
| `size-12`  | 48x48px    | Profile sections, headers      |
| `size-16`  | 64x64px    | Large profile displays         |

## Accessibility

The Avatar component is fully accessible out of the box:

- Uses semantic image elements with proper alt text support
- Fallback content is properly rendered for screen readers
- The component maintains proper focus management
- Works correctly with assistive technologies

**Note**: Always provide meaningful `alt` text for `AvatarImage` to ensure accessibility. The alt text should describe the user, not just say "avatar" or "profile picture".

## Related Components

- For displaying user status (online/offline), combine Avatar with a Badge component
- For editable avatars, wrap Avatar with a button and file upload trigger
- For avatar groups showing multiple users, use a flex container with negative spacing
