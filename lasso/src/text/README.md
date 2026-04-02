# Text Component

## Overview

The Text component is a typography primitive that enforces consistent text styling across the Tennr design system. It provides a flexible API for rendering text with different visual styles through preset variants or individual style properties. Built with class-variance-authority for type-safe variant handling, it serves as the foundation for all text content in the application.

## What It Is

The Text component is a polymorphic text rendering component that:

- **Renders Text Elements**: Outputs semantic HTML elements (`p`, `span`, `h1`, etc.) with applied styles
- **Supports Preset Variants**: Includes pre-configured typography styles based on Figma design tokens
- **Allows Custom Styling**: Provides fine-grained control over font family, size, weight, mono-spacing, line height, letter spacing, and text transform
- **Polymorphic API**: Can render as any HTML element via the `as` prop

### Key Features

- **Design Token Alignment**: Preset variants match Figma design tokens exactly
- **Two Font Families**: Supports `display` (Feature Display Light) and `body` (ABC Marfa) fonts
- **Variable Font Support**: Full support for ABC Marfa's variable font axes (weight, mono)
- **Flexible Composition**: Use variants for standard cases, individual props for one-off deviations
- **Type-Safe**: Full TypeScript support with variant type inference

## Preset Variants

The component includes two sets of variants:

### Design Token Variants (Recommended)

| Variant         | Size | Line Height | Notes                    |
| --------------- | ---- | ----------- | ------------------------ |
| `heading-xl`    | 48px | 48px        | Largest heading          |
| `heading-lg`    | 36px | 40px        | Large heading            |
| `heading-md`    | 30px | 36px        | Medium heading           |
| `heading-sm`    | 24px | 36px        | Small heading            |
| `heading-xs`    | 20px | 28px        | Extra small heading      |
| `base`          | 16px | 24px        | Default body text        |
| `base-sm`       | 14px | 20px        | Small body text          |
| `base-sm-tight` | 14px | 100%        | Small text, tight height |
| `base-xs`       | 12px | 16px        | Extra small text         |
| `eyebrow`       | 12px | 16px        | Uppercase, monospaced    |
| `caption`       | 12px | 16px        | Caption text             |

### Legacy Variants (Referral Center)

| Variant         | Description                  |
| --------------- | ---------------------------- |
| `h1` - `h5`     | Display font headings        |
| `body`          | Standard body text           |
| `technical`     | Monospaced medium text       |
| `technicalBold` | Monospaced medium text, bold |
| `code`          | Fully monospaced text        |

## When to Use

Use the Text component when you need to:

1. **Display Typography**: Render any text content in the application

   - Page headings and titles
   - Body paragraphs
   - Labels and captions
   - Navigation text
   - Form field labels

2. **Enforce Consistency**: Ensure text follows the design system

   - Use preset variants to match Figma designs
   - Maintain consistent typography across features
   - Prevent ad-hoc text styling

3. **Semantic HTML**: Render appropriate HTML elements with styling

   - Headings (`h1`-`h6`) for document structure
   - Paragraphs (`p`) for body content
   - Spans (`span`) for inline text
   - Labels (`label`) for form elements

4. **Responsive Typography**: When text needs consistent responsive behavior

   - The variants include appropriate line heights
   - Font weights are consistently applied
   - Letter spacing is handled automatically

## When NOT to Use

Avoid using the Text component when:

1. **Rich Text Content**: For content with mixed formatting or markdown

   - Use a RichText or Markdown component instead
   - For user-generated content with formatting

2. **Form Inputs**: For text inside form controls

   - Input placeholders (use the Input component)
   - Textarea content (use the Textarea component)
   - These have their own text styling

3. **Button Labels**: For text inside buttons

   - Use the Button component which has its own text styling
   - Ensures button-specific typography requirements

4. **Code Blocks**: For multi-line code snippets

   - Use a dedicated Code or CodeBlock component
   - These need syntax highlighting and proper formatting

5. **One-Off Custom Styles**: When design explicitly requires non-standard typography

   - First, confirm with design that a new variant isn't needed
   - If truly one-off, use the individual style props sparingly

## Usage Example

### Using Preset Variants

```tsx
import { Text } from "@tennr/lasso/text";

function MyComponent() {
  return (
    <div>
      <Text as="h1" variant="heading-xl" family="display">
        Page Title
      </Text>
      <Text variant="base">
        This is body text that uses the default paragraph styling.
      </Text>
      <Text variant="eyebrow">Category Label</Text>
      <Text variant="caption">Last updated: Dec 2025</Text>
    </div>
  );
}
```

### Using Individual Style Props

Only use this approach when designers explicitly specify a one-off deviation:

```tsx
<Text
  size="lg"
  weight="medium"
  leading="tight"
  className="text-muted-foreground"
>
  Custom styled text
</Text>
```

### Polymorphic Usage

```tsx
<Text as="span" variant="base-sm">
  Inline text
</Text>

<Text as="h2" variant="heading-lg" family="display">
  Section Heading
</Text>

<Text as="label" variant="base-sm" weight="medium">
  Form Label
</Text>
```

## Props Reference

### TextProps

- `as`: `React.ElementType` - The HTML element to render (default: `"p"`)
- `variant`: `keyof typeof textVariants` - Preset typography style (see variants table)
- `family`: `"display" | "body"` - Font family
- `size`: `"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"` - Font size
- `weight`: `"light" | "normal" | "medium" | "semibold" | "bold"` - Font weight
- `mono`: `"none" | "low" | "medium" | "full"` - Mono-spacing (ABC Marfa variable axis)
- `leading`: Line height - see options below
- `tracking`: `"tighter" | "tight" | "normal" | "wide" | "wider"` - Letter spacing
- `transform`: `"uppercase" | "lowercase" | "capitalize" | "none"` - Text transform
- `className`: `string` - Additional CSS classes

### Leading Options

- Named: `"none"` (100%), `"tight"` (120%), `"normal"` (125%), `"relaxed"` (150%)
- Numeric: `"4"` (16px), `"5"` (20px), `"6"` (24px), `"7"` (28px), `"8"` (32px), `"9"` (36px), `"10"` (40px), `"12"` (48px)

## Style Precedence

When both a `variant` and individual style props are provided, the individual props take precedence. This allows you to use a variant as a base and override specific properties:

```tsx
<Text variant="base" weight="bold">
  Base text with bold weight override
</Text>
```

## Accessibility

The Text component supports semantic HTML for proper document structure:

- Use appropriate heading levels (`h1`-`h6`) for document outline
- Use `p` for paragraphs of content
- Use `span` for inline text that doesn't need semantic meaning
- Use `label` for form field labels (with `htmlFor` attribute)

The component passes through all standard HTML attributes, including `aria-*` attributes for additional accessibility needs.

## Related Components

- For editable text, use the `InlineEditableText` component
- For text with search highlighting, use the `SearchHighlight` component
- For form field labels, use the `Label` component
- For badges and tags, use the `Badge` component
