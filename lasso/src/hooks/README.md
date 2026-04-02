# Hooks

## Overview

The hooks directory contains reusable React hooks for the Tennr design system. These hooks provide common functionality that can be shared across multiple components, helping to keep logic consistent and reduce code duplication.

## Available Hooks

### useIsMobile

A responsive design hook that detects whether the current viewport is at mobile size (below 768px width). It uses the `window.matchMedia` API to efficiently listen for viewport changes and update the state accordingly.

## useIsMobile Hook

### What It Is

The `useIsMobile` hook is a simple utility that:

- **Detects Mobile Viewports**: Returns `true` when the viewport width is below 768px
- **Responsive Updates**: Automatically updates when the viewport is resized
- **SSR Safe**: Returns `false` initially on the server side, then hydrates correctly on the client
- **Memory Efficient**: Uses `matchMedia` listener instead of continuous resize events

### Key Features

- **Standard Breakpoint**: Uses 768px as the mobile breakpoint, aligning with common CSS frameworks like Tailwind
- **Reactive**: Re-renders components when crossing the breakpoint threshold
- **Lightweight**: Minimal overhead with efficient event handling
- **Cleanup**: Properly removes event listeners on unmount

### When to Use

Use the `useIsMobile` hook when you need to:

1. **Conditional Rendering**: Render different components or layouts based on viewport size

   - Mobile-specific navigation (e.g., hamburger menus)
   - Different component variants for mobile vs desktop
   - Simplified mobile interfaces

2. **Behavior Changes**: Alter component behavior based on device type

   - Touch-friendly interactions on mobile
   - Different tooltip behaviors (hover vs tap)
   - Sidebar collapse behavior

3. **Layout Decisions**: Make layout choices that depend on viewport size

   - Switching between Sheet and Dialog
   - Grid column adjustments
   - Spacing modifications

4. **Performance Optimization**: Load lighter content on mobile devices

   - Simpler animations on mobile
   - Reduced visual complexity
   - Optimized image loading

### When NOT to Use

Avoid using `useIsMobile` when:

1. **CSS Can Handle It**: Pure styling changes that CSS media queries can handle

   - Font size changes
   - Padding/margin adjustments
   - Grid column changes
   - Use Tailwind's responsive utilities instead (e.g., `md:hidden`)

2. **Server-Side Decisions**: You need to make decisions before JavaScript loads

   - Initial page layout
   - SEO-critical content
   - Use CSS or server-side user-agent detection instead

3. **Feature Detection**: You need to detect specific device capabilities

   - Touch support (use `'ontouchstart' in window`)
   - Device orientation (use `screen.orientation`)
   - Device pixel ratio (use `window.devicePixelRatio`)

4. **Granular Breakpoints**: You need multiple or custom breakpoints

   - Create a custom hook with your specific breakpoints
   - Consider using a more comprehensive responsive hook library

## Usage Example

```tsx
import { useIsMobile } from "@tennr/lasso/hooks";

function ResponsiveComponent() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNavigation />;
  }

  return <DesktopNavigation />;
}
```

### Example with Conditional Behavior

```tsx
import { Dialog, DialogContent } from "@tennr/lasso/dialog";
import { useIsMobile } from "@tennr/lasso/hooks";
import { Sheet, SheetContent } from "@tennr/lasso/sheet";

function ResponsiveModal({ open, onOpenChange, children }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>{children}</SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
```

### Example with Layout Switching

```tsx
import { useIsMobile } from "@tennr/lasso/hooks";

function SidebarLayout({ sidebar, content }) {
  const isMobile = useIsMobile();

  return (
    <div className="flex">
      {!isMobile && <aside className="w-64">{sidebar}</aside>}
      <main className="flex-1">{content}</main>
      {isMobile && <MobileDrawer>{sidebar}</MobileDrawer>}
    </div>
  );
}
```

## API Reference

### useIsMobile

```tsx
function useIsMobile(): boolean;
```

#### Returns

- `boolean` - `true` if the viewport width is less than 768px, `false` otherwise

#### Behavior

1. **Initial State**: Returns `false` on initial render (undefined coerced to false)
2. **Client Hydration**: Updates to actual viewport state after mount
3. **Resize Handling**: Updates whenever viewport crosses the 768px threshold
4. **Cleanup**: Removes event listener when component unmounts

### Constants

- `MOBILE_BREAKPOINT`: `768` - The pixel width threshold for mobile detection

## Technical Notes

### SSR Considerations

The hook initializes with `undefined` state and returns `false` (via `!!undefined`). This means:

- On the server, `useIsMobile()` returns `false`
- On initial client render, it returns `false`
- After hydration, it returns the actual viewport state

This can cause a brief flash if the actual state differs. For critical UI elements, consider using CSS media queries instead.

### Performance

The hook uses `window.matchMedia` which is more performant than listening to the `resize` event directly:

- Only fires when crossing the threshold
- Browser-optimized for media query changes
- Single event listener per hook instance

## Related

- For responsive sidebars, see the `Sidebar` component which uses this hook internally
- For CSS-only responsive design, use Tailwind's responsive utilities (`sm:`, `md:`, `lg:`, etc.)
- For more complex responsive needs, consider a dedicated responsive hook library
