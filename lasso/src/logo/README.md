# Logo Component

## Overview

The Logo component renders the Tennr/Lasso brand logo in various formats. It's a flexible SVG-based component that supports multiple visual variants to accommodate different design contexts, from app headers and sidebars to marketing materials and loading screens. The component uses semantic SVG markup and supports all standard SVG props for customization.

## What It Is

The Logo component is a self-contained branding element that:

- **Renders Brand Assets**: Displays the official Tennr/Lasso logo in different formats
- **Supports Multiple Variants**: Offers icon-only, text-only, and combined logo formats
- **Uses SVG**: Renders as scalable vector graphics for crisp display at any size
- **Inherits Colors**: The default logo variant uses `currentColor` to inherit text color
- **Accepts SVG Props**: Passes through all standard SVG attributes for flexible styling

### Key Features

- **Four Variants**: Primary icon (brand color background), neutral icon (peat background), text icon (standalone mark), and full logo (text + mark)
- **Scalable**: SVG format ensures crisp rendering at any size
- **Color Flexibility**: Default variant inherits text color via `currentColor`
- **Lightweight**: Pure SVG with no external dependencies
- **Type-Safe**: Full TypeScript support with proper prop types

## When to Use

Use the Logo component when you need to:

1. **Brand Identification**: Display the Tennr/Lasso brand in your application

   - App headers and navigation bars
   - Sidebar headers
   - Footer branding
   - Splash screens and loading states

2. **Icon-Only Contexts**: Use a compact brand mark without text

   - Collapsed sidebars
   - Favicons and app icons
   - Small UI elements
   - Mobile navigation

3. **Marketing Materials**: Display the full brand logo

   - Landing pages
   - Email templates
   - External-facing applications
   - Partner integrations

4. **Consistent Branding**: Ensure brand consistency across applications

   - Multi-app ecosystems
   - White-label implementations
   - Internal tools
   - Customer-facing portals

## When NOT to Use

Avoid using the Logo component when:

1. **Non-Brand Contexts**: You need a generic icon or illustration

   - Use an icon library like Phosphor Icons instead
   - Consider custom illustrations for specific features
   - Use product-specific imagery where appropriate

2. **Decorative Elements**: The logo is purely decorative without semantic meaning

   - Use CSS backgrounds instead
   - Consider if branding is appropriate in the context
   - Ensure accessibility is maintained

3. **High-Performance Scenarios**: You need maximum rendering performance

   - Pre-render to static images for critical paths
   - Use CSS sprites for repeated instances
   - Consider lazy loading for below-fold content

4. **Print Materials**: You need print-ready assets

   - Use official brand asset files from the design team
   - Request vector files (AI, EPS) for print production
   - Ensure proper color profile (CMYK) for print

## Usage Example

```tsx
import { Logo } from "@tennr/lasso/logo";

function Header() {
  return (
    <header className="flex items-center gap-4">
      <Logo className="h-8 w-auto text-brand-peat" />
      <span>Tennr</span>
    </header>
  );
}
```

### Example with Icon Variant

```tsx
import { Logo } from "@tennr/lasso/logo";

function CollapsedSidebar() {
  return (
    <div className="w-12 p-2">
      <Logo variant="primary-icon" className="h-8 w-8" aria-label="Tennr" />
    </div>
  );
}
```

### Example with Different Variants

```tsx
import { Logo } from "@tennr/lasso/logo";

function LogoShowcase() {
  return (
    <div className="flex flex-col gap-4">
      {/* Full logo with text - inherits text color */}
      <Logo className="h-12 w-auto text-brand-peat" />

      {/* Primary icon - brand color background */}
      <Logo variant="primary-icon" className="h-12 w-12" />

      {/* Neutral icon - peat/dark background */}
      <Logo variant="neutral-icon" className="h-12 w-12" />

      {/* Text icon - standalone mark */}
      <Logo variant="text-icon" className="h-12 w-auto text-brand-peat" />
    </div>
  );
}
```

## Props Reference

### LogoProps

The Logo component extends `SVGProps<SVGSVGElement>` with the following additional prop:

- `variant`: `"primary-icon" | "neutral-icon" | "text-icon" | "logo"` - Controls which logo variant to render
  - `"primary-icon"`: Square icon with brand rust (#9B4E45) background and white mark
  - `"neutral-icon"`: Square icon with neutral peat (#4B4140) background and white mark
  - `"text-icon"`: Standalone mark/icon in peat color, suitable for use with text
  - `"logo"` (default): Full horizontal logo with mark and "Tennr" text, uses `currentColor`

### Inherited SVG Props

All standard SVG attributes are supported, including:

- `className`: `string` - CSS classes for styling (sizing, colors, etc.)
- `width` / `height`: `number | string` - Explicit dimensions (prefer className for responsive sizing)
- `fill`: `string` - Fill color (overrides default colors)
- `aria-label`: `string` - Accessibility label for screen readers
- `aria-hidden`: `boolean` - Hide from assistive technology when decorative

## Variant Details

### Default (Full Logo)

- Dimensions: 399×102 viewBox
- Contains both the mark and "Tennr" text
- Uses `currentColor` - set color via CSS `color` property or `text-*` classes
- Best for: Headers, landing pages, marketing materials

### Primary Icon

- Dimensions: 375×375 viewBox (square)
- Brand rust background (#9B4E45) with white mark
- Best for: Primary brand contexts, app icons, favicons

### Neutral Icon

- Dimensions: 375×375 viewBox (square)
- Neutral peat background (#4B4140) with white mark
- Best for: Subtle branding, dark mode, secondary contexts

### Text Icon

- Dimensions: 261×281 viewBox
- Standalone mark in peat color (#4B4140)
- Best for: Pairing with custom text, compact layouts

## Accessibility

The Logo component follows accessibility best practices:

- Use `aria-label` to provide descriptive text for screen readers
- Use `aria-hidden="true"` when the logo is purely decorative
- The component renders as an SVG with proper semantic structure
- Color contrast is maintained in all variants

```tsx
{
  /* Meaningful logo - provides context */
}
<Logo aria-label="Tennr Logo" className="h-8 w-auto" />;

{
  /* Decorative logo - hidden from screen readers */
}
<Logo aria-hidden="true" className="h-8 w-auto" />;
```

## Related Components

- For general icons, use icon libraries like `@phosphor-icons/react`
- For avatar-style branding, consider the `Avatar` component
- For loading states with branding, consider a custom loading component
