# Carousel Component

## Overview

The Carousel component is a slideshow-style container for cycling through a series of content items (slides). It provides navigation controls to move between items and supports both horizontal and vertical orientations. Built on top of Embla Carousel, it offers a smooth, touch-friendly, and accessible implementation for the Tennr design system.

## What It Is

The Carousel component consists of five sub-components that work together:

- **Carousel** (root): The container that manages carousel state, context, and keyboard navigation
- **CarouselContent**: The scrollable container that holds all slides
- **CarouselItem**: An individual slide within the carousel
- **CarouselPrevious**: Navigation button to scroll to the previous slide
- **CarouselNext**: Navigation button to scroll to the next slide

### Key Features

- **Touch-Friendly**: Built on Embla Carousel with native touch/swipe support
- **Accessible**: ARIA attributes and keyboard navigation support
- **Flexible Orientation**: Supports both horizontal and vertical layouts
- **Responsive**: Items can be sized using CSS basis classes for different breakpoints
- **Plugin Support**: Extensible with Embla Carousel plugins (autoplay, etc.)
- **Customizable**: Accepts className props and Embla options for fine-tuned behavior
- **API Access**: Exposes the underlying Embla API for programmatic control

## When to Use

Use the Carousel component when you need to:

1. **Showcase Multiple Items in Limited Space**: Display a collection of items without taking up excessive vertical space

   - Product galleries
   - Image slideshows
   - Feature highlights
   - Testimonial displays

2. **Create Visual Storytelling**: Guide users through sequential content

   - Onboarding flows
   - Tutorial steps
   - Before/after comparisons
   - Timeline presentations

3. **Display Related Content**: Group related items that users can browse through

   - Related products
   - Similar articles
   - Team member profiles
   - Portfolio items

4. **Mobile-First Experiences**: Present content optimized for touch interactions

   - Card-based layouts
   - Swipeable galleries
   - Mobile app-like interfaces

## When NOT to Use

Avoid using the Carousel component when:

1. **Critical Information**: All content must be immediately visible without user interaction

   - Important warnings or alerts
   - Key form fields
   - Primary navigation
   - Essential data that shouldn't be hidden

2. **Few Items**: You only have 2-3 items to display

   - Use a grid or flex layout instead
   - Consider side-by-side comparison layouts
   - Static card layouts are often more effective

3. **Text-Heavy Content**: The content requires careful reading

   - Long-form articles (use pagination or scroll)
   - Documentation (use proper navigation)
   - Legal content (show all at once)

4. **Data Tables**: The content is tabular in nature

   - Use a Table component
   - Consider horizontal scrolling tables
   - Data grids are more appropriate

5. **Accessibility Priority**: The primary audience relies heavily on screen readers

   - Carousels can be challenging for assistive technology users
   - Consider alternative layouts that don't hide content

6. **Auto-Advancing Content**: You want content to auto-rotate without user control

   - Auto-advancing carousels have poor usability
   - If you must, ensure pause controls are prominent
   - Consider static layouts instead

## Usage Example

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@tennr/lasso/carousel";

function MyComponent() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        <CarouselItem>
          <div className="p-4 bg-gray-100 rounded-lg">Slide 1</div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-4 bg-gray-100 rounded-lg">Slide 2</div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-4 bg-gray-100 rounded-lg">Slide 3</div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

### Example with Multiple Visible Items

```tsx
<Carousel opts={{ align: "start" }} className="w-full max-w-sm">
  <CarouselContent>
    {items.map((item, index) => (
      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
        <div className="p-4 bg-gray-100 rounded-lg">{item.content}</div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Example with Vertical Orientation

```tsx
<Carousel orientation="vertical" className="w-full max-w-xs">
  <CarouselContent className="h-[200px]">
    <CarouselItem className="pt-1 basis-1/2">
      <div className="p-4 bg-gray-100 rounded-lg">Slide 1</div>
    </CarouselItem>
    <CarouselItem className="pt-1 basis-1/2">
      <div className="p-4 bg-gray-100 rounded-lg">Slide 2</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Example with API Access

```tsx
import { type CarouselApi } from "@tennr/lasso/carousel";

function MyComponent() {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      console.log("Current slide:", api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>{/* ... */}</CarouselContent>
    </Carousel>
  );
}
```

## Props Reference

### Carousel

- `orientation`: `"horizontal" | "vertical"` - Direction of the carousel (default: "horizontal")
- `opts`: `CarouselOptions` - Embla Carousel options (align, loop, dragFree, etc.)
- `plugins`: `CarouselPlugin` - Array of Embla Carousel plugins
- `setApi`: `(api: CarouselApi) => void` - Callback to receive the Embla API instance
- `className`: `string` - Additional CSS classes

### CarouselContent

- `className`: `string` - Additional CSS classes for the scrollable container

### CarouselItem

- `className`: `string` - Additional CSS classes (use `basis-*` classes to control item width)

### CarouselPrevious

- `variant`: `ButtonVariant` - Button style variant (default: "outline")
- `size`: `ButtonSize` - Button size (default: "icon")
- `className`: `string` - Additional CSS classes

### CarouselNext

- `variant`: `ButtonVariant` - Button style variant (default: "outline")
- `size`: `ButtonSize` - Button size (default: "icon")
- `className`: `string` - Additional CSS classes

### CarouselApi

The Embla Carousel API instance, available via `setApi` prop or the `useCarousel` hook:

- `scrollPrev()` - Scroll to previous slide
- `scrollNext()` - Scroll to next slide
- `canScrollPrev()` - Check if previous scroll is possible
- `canScrollNext()` - Check if next scroll is possible
- `selectedScrollSnap()` - Get current slide index
- `scrollTo(index)` - Scroll to specific slide
- `on(event, callback)` - Subscribe to carousel events
- `off(event, callback)` - Unsubscribe from carousel events

### useCarousel Hook

A hook to access carousel context from child components:

```tsx
const {
  carouselRef,
  api,
  opts,
  orientation,
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
} = useCarousel();
```

## Accessibility

The Carousel component includes accessibility features:

- `role="region"` and `aria-roledescription="carousel"` on the container
- `role="group"` and `aria-roledescription="slide"` on each item
- Keyboard navigation support (Arrow Left/Right for horizontal, Arrow Up/Down for vertical)
- Navigation buttons with screen reader text ("Previous slide", "Next slide")
- Buttons are automatically disabled when scrolling is not possible

## Related Components

- For simple image galleries, consider a lightbox component
- For tab-like navigation, use a Tabs component
- For accordions with expandable sections, use the Accordion component
- For simple horizontal scrolling lists, consider a native scrollable container
