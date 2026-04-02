# AspectRatio Component

## Overview

The AspectRatio component is a utility component that maintains a specific width-to-height ratio for its content. It ensures that images, videos, or any other content maintain their intended proportions regardless of the container size or screen dimensions. It's built on top of Radix UI's AspectRatio primitive and provides a simple, consistent implementation for the Tennr design system.

## What It Is

The AspectRatio component is a container that:

- **Maintains Proportions**: Automatically resizes content to maintain a specific width-to-height ratio
- **Responsive**: Works seamlessly across different screen sizes while preserving the aspect ratio
- **Flexible Content**: Can contain any type of content including images, videos, iframes, or custom components
- **CSS-Based**: Uses CSS to maintain the ratio, ensuring smooth performance without JavaScript calculations

### Key Features

- **Simple API**: Single `ratio` prop to define the desired aspect ratio
- **Accessible**: Built on Radix UI primitives with proper semantic structure
- **Lightweight**: Minimal wrapper with no additional dependencies beyond Radix UI
- **Customizable**: Accepts className props for styling customization
- **Composable**: Works well with other components and layout systems

## When to Use

Use the AspectRatio component when you need to:

1. **Display Images Consistently**: Maintain consistent image proportions across a gallery or grid layout

   - Product image galleries
   - Photo grids
   - Thumbnail layouts
   - Hero images

2. **Embed Media**: Ensure videos and iframes maintain their native aspect ratio

   - YouTube/Vimeo embeds
   - Video players
   - Maps and charts
   - External content iframes

3. **Create Placeholder Layouts**: Reserve space for content that loads asynchronously

   - Skeleton loading states
   - Lazy-loaded images
   - Content placeholders
   - Image carousels

4. **Responsive Design**: Ensure content scales proportionally on different devices

   - Card components with images
   - Responsive image containers
   - Mobile-friendly layouts
   - Fluid grids

5. **Design Consistency**: Enforce specific proportions across the application

   - Profile picture containers
   - Logo displays
   - Icon containers
   - Featured content sections

## When NOT to Use

Avoid using the AspectRatio component when:

1. **Content Should Fill Available Space**: The content should expand to fill its container without constraints

   - Full-width banners
   - Background images (use CSS background-size instead)
   - Flexible containers that should adapt to content

2. **Fixed Dimensions Required**: You need exact pixel dimensions rather than proportional sizing

   - Pixel-perfect layouts
   - Fixed-size icons (use direct width/height)
   - Print layouts

3. **Text Content**: For text-heavy content that should flow naturally

   - Articles and blog posts
   - Form layouts
   - Navigation menus
   - Text blocks

4. **Dynamic Content Heights**: Content that needs to expand based on its natural height

   - Accordion content
   - Expandable sections
   - Variable-length lists
   - Comment sections

5. **Native Aspect Ratio Support**: When the native `aspect-ratio` CSS property is sufficient

   - Simple image containers where browser support allows
   - Modern browsers where you can use `aspect-ratio` directly

## Usage Example

```tsx
import { AspectRatio } from "@tennr/lasso/aspect-ratio";

function MyComponent() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src="/path/to/image.jpg"
          alt="A descriptive alt text"
          className="rounded-sm object-cover h-full w-full"
        />
      </AspectRatio>
    </div>
  );
}
```

### Common Aspect Ratios

```tsx
// Widescreen video (16:9)
<AspectRatio ratio={16 / 9}>
  <video src="/video.mp4" />
</AspectRatio>

// Square (1:1)
<AspectRatio ratio={1}>
  <img src="/avatar.jpg" alt="User avatar" />
</AspectRatio>

// Portrait (3:4)
<AspectRatio ratio={3 / 4}>
  <img src="/portrait.jpg" alt="Portrait photo" />
</AspectRatio>

// Classic photo (4:3)
<AspectRatio ratio={4 / 3}>
  <img src="/photo.jpg" alt="Classic photo" />
</AspectRatio>

// Cinematic (21:9)
<AspectRatio ratio={21 / 9}>
  <img src="/cinematic.jpg" alt="Cinematic image" />
</AspectRatio>
```

### With Placeholder Background

```tsx
<AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
  <div className="flex h-full items-center justify-center">
    <p className="text-muted-foreground">Loading...</p>
  </div>
</AspectRatio>
```

### With Gradient Overlay

```tsx
<AspectRatio ratio={16 / 9}>
  <img
    src="/image.jpg"
    alt="Background"
    className="object-cover h-full w-full"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="absolute bottom-4 left-4 text-white">
    <h3>Title</h3>
    <p>Description</p>
  </div>
</AspectRatio>
```

## Props Reference

### AspectRatio

The component accepts all props from Radix UI's AspectRatio primitive:

- `ratio`: `number` - The desired width-to-height ratio. For example, `16 / 9` for widescreen, `1` for square, `4 / 3` for classic photo proportions
- `className`: `string` - Additional CSS classes to apply to the container
- `children`: `React.ReactNode` - The content to display within the aspect ratio container
- `asChild`: `boolean` - When true, the component will render its child directly, merging props

### Common Ratio Values

| Use Case         | Ratio Value | Decimal  |
| ---------------- | ----------- | -------- |
| Square           | `1 / 1`     | `1`      |
| Classic Photo    | `4 / 3`     | `1.333`  |
| Portrait         | `3 / 4`     | `0.75`   |
| Widescreen Video | `16 / 9`    | `1.778`  |
| Vertical Video   | `9 / 16`    | `0.5625` |
| Ultrawide        | `21 / 9`    | `2.333`  |
| Golden Ratio     | `1.618`     | `1.618`  |
| Standard Photo   | `3 / 2`     | `1.5`    |

## Accessibility

The AspectRatio component itself is purely a layout utility and doesn't have specific accessibility requirements. However, when using it:

- Ensure images have descriptive `alt` text
- Videos should have captions or transcripts
- Interactive content within should be keyboard accessible
- Consider reduced motion preferences for animated content

## Related Components

- For responsive images that maintain aspect ratio, consider using Next.js Image component with the `fill` prop
- For video players with controls, use a dedicated video player component
- For image galleries, combine AspectRatio with a Grid or Masonry layout component
- For lazy loading images, use AspectRatio as a placeholder container
