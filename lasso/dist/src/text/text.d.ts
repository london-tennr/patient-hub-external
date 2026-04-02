import { type VariantProps } from "class-variance-authority";
import React from "react";
/**
 * Base style variants using class-variance-authority.
 * Provides fine-grained control over typography properties including
 * font family, size, weight, mono-spacing, line height, letter spacing, and text transform.
 */
declare const baseVariants: (props?: ({
    family?: "body" | "display" | null | undefined;
    size?: "sm" | "lg" | "base" | "xs" | "xl" | "2xl" | "3xl" | "4xl" | null | undefined;
    weight?: "bold" | "light" | "normal" | "medium" | "semibold" | null | undefined;
    mono?: "none" | "medium" | "low" | "full" | null | undefined;
    leading?: "none" | "normal" | "tight" | "relaxed" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "12" | null | undefined;
    tracking?: "normal" | "tight" | "tighter" | "wide" | "wider" | null | undefined;
    transform?: "none" | "uppercase" | "lowercase" | "capitalize" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Named typography variants based on Figma design tokens.
 * Use these preset styles for consistent typography across the application.
 *
 * Design Token Variants:
 * - `heading-xl` through `heading-xs`: Heading sizes from 48px to 20px
 * - `base`, `base-sm`, `base-sm-tight`, `base-xs`: Body text sizes
 * - `eyebrow`: Uppercase, monospaced label text
 * - `caption`: Small descriptive text
 *
 * Legacy Variants (used in referral center):
 * - `h1` through `h5`: Display font headings
 * - `body`, `technical`, `technicalBold`, `code`: Body text styles
 */
declare const textVariants: {
    readonly "heading-xl": "text-5xl leading-12";
    readonly "heading-lg": "text-4xl leading-10";
    readonly "heading-md": "text-3xl leading-9";
    readonly "heading-sm": "text-2xl leading-9";
    readonly "heading-xs": "text-xl leading-7";
    readonly base: "text-base leading-6";
    readonly "base-sm": "text-sm leading-5";
    readonly "base-sm-tight": "text-sm leading-none";
    readonly "base-xs": "text-xs leading-4";
    readonly eyebrow: "text-xs leading-4 uppercase mono-full";
    readonly caption: "text-xs leading-4";
    readonly h1: "font-display text-5xl leading-12 tracking-tight";
    readonly h2: "font-display text-4xl leading-10 tracking-tight";
    readonly h3: "font-display text-3xl leading-9 tracking-tight";
    readonly h4: "font-display text-2xl leading-9 tracking-tight";
    readonly h5: "font-display text-xl leading-7 tracking-tight";
    readonly body: "font-body text-base leading-6 wght-normal mono-none";
    readonly technical: "font-body text-sm leading-5 wght-normal mono-medium";
    readonly technicalBold: "font-body text-sm leading-5 wght-medium mono-medium";
    readonly code: "font-body text-sm leading-5 wght-normal mono-full";
};
/**
 * Props for the Text component.
 *
 * @example
 * ```tsx
 * // Using a preset variant
 * <Text variant="heading-lg" family="display">Page Title</Text>
 *
 * // Using individual style props (for one-off deviations only)
 * <Text size="lg" weight="medium" leading="tight">Custom Text</Text>
 *
 * // Polymorphic usage
 * <Text as="h1" variant="heading-xl">Main Heading</Text>
 * ```
 */
export interface TextProps extends React.ComponentProps<React.ElementType>, VariantProps<typeof baseVariants> {
    /** The HTML element to render. Defaults to "p". */
    as?: React.ElementType;
    /** Preset typography style based on Figma design tokens. */
    variant?: keyof typeof textVariants;
}
/**
 * Text Component
 *
 * A typography primitive that enforces consistent text styling across the Tennr design system.
 * Provides preset variants based on Figma design tokens, or individual style props for fine-grained
 * control. Built with class-variance-authority for type-safe variant handling.
 *
 * Use preset variants for standard cases. Only use individual style props when designers explicitly
 * specify a one-off deviation from the design system.
 *
 * @see [Class Variance Authority](https://cva.style/docs)
 *
 * @see [Lasso Text README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/text/README.md)
 *
 * @param props - Text component props including variant selection and style overrides
 * @returns A styled text element
 */
declare const Text: ({ className, variant, family, size, weight, mono, leading, tracking, transform, as: Component, ref, ...props }: TextProps) => import("react/jsx-runtime").JSX.Element;
export { Text, baseVariants, textVariants };
//# sourceMappingURL=text.d.ts.map