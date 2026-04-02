"use client";

import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "../utils/cn";

/**
 * Base style variants using class-variance-authority.
 * Provides fine-grained control over typography properties including
 * font family, size, weight, mono-spacing, line height, letter spacing, and text transform.
 */
const baseVariants = cva("", {
  variants: {
    family: {
      display: "font-display tracking-tight", // Feature Display Light
      body: "font-body", // ABC Marfa
    },
    size: {
      xs: "text-xs", // 12px
      sm: "text-sm", // 14px
      base: "text-base", // 16px
      lg: "text-xl", // 20px → need text-xl (20px) instead of text-lg (18px)
      xl: "text-2xl", // 24px → need text-2xl (24px) instead of text-xl (20px)
      "2xl": "text-3xl", // 30px → need text-3xl (30px) instead of text-2xl (24px)
      "3xl": "text-4xl", // 36px → need text-4xl (36px) instead of text-3xl (30px)
      "4xl": "text-5xl", // 48px → need text-5xl (48px) instead of text-4xl (36px)
    },
    weight: {
      light: "wght-light legacy:font-light", // 300 for display, variable light for Marfa
      normal: "wght-normal legacy:font-normal", // 375 (Marfa normal weight)
      medium: "wght-medium legacy:font-medium", // 550 (Marfa medium weight)
      semibold: "wght-semibold legacy:font-semibold",
      bold: "wght-bold legacy:font-bold",
    },
    mono: {
      none: "mono-none", // 0
      low: "mono-low", // 0.2
      medium: "mono-medium", // 0.5
      full: "mono-full", // 1
    },
    leading: {
      none: "leading-none", // 100% for compact styles
      tight: "leading-tight", // 120%
      normal: "leading-normal", // 125%
      relaxed: "leading-relaxed", // 150%
      // Specific line heights based on design tokens
      "4": "leading-4", // 16px
      "5": "leading-5", // 20px
      "6": "leading-6", // 24px
      "7": "leading-7", // 28px
      "8": "leading-8", // 32px
      "9": "leading-9", // 36px
      "10": "leading-10", // 40px
      "12": "leading-12", // 48px
    },
    tracking: {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      none: "normal-case",
    },
  },
  defaultVariants: {},
  compoundVariants: [
    // Eyebrow styles should use mono and uppercase
    { mono: "full", transform: "uppercase", family: "body" },
  ],
});

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
const textVariants = {
  "heading-xl": "text-5xl leading-12", // 48px / 48px
  "heading-lg": "text-4xl leading-10", // 36px / 40px
  "heading-md": "text-3xl leading-9", // 30px / 36px
  "heading-sm": "text-2xl leading-9", // 24px / 36px
  "heading-xs": "text-xl leading-7", // 20px / 28px
  base: "text-base leading-6", // 16px / 24px
  "base-sm": "text-sm leading-5", // 14px / 20px
  "base-sm-tight": "text-sm leading-none", // 14px / 100% (tight line height)
  "base-xs": "text-xs leading-4", // 12px / 16px
  eyebrow: "text-xs leading-4 uppercase mono-full", // 12px / 16px, uppercase, mono - matches "Eyebrow"
  caption: "text-xs leading-4", // 12px / 16px - matches "Caption"

  // original variants — used in referral center
  h1: "font-display text-5xl leading-12 tracking-tight",
  h2: "font-display text-4xl leading-10 tracking-tight",
  h3: "font-display text-3xl leading-9 tracking-tight",
  h4: "font-display text-2xl leading-9 tracking-tight",
  h5: "font-display text-xl leading-7 tracking-tight",
  body: "font-body text-base leading-6 wght-normal mono-none",
  technical: "font-body text-sm leading-5 wght-normal mono-medium",
  technicalBold: "font-body text-sm leading-5 wght-medium mono-medium",
  code: "font-body text-sm leading-5 wght-normal mono-full",
} as const;

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
export interface TextProps
  extends React.ComponentProps<React.ElementType>,
    VariantProps<typeof baseVariants> {
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
const Text = ({
  className,
  variant,
  family,
  size,
  weight,
  mono,
  leading,
  tracking,
  transform,
  as: Component = "p",
  ref,
  ...props
}: TextProps) => {
  const variantClasses = variant ? textVariants[variant] : "";

  // Only apply individual classes if any of these props are provided
  const hasIndividualStyles =
    family || size || weight || mono || leading || tracking || transform;
  const individualClasses = hasIndividualStyles
    ? baseVariants({ family, size, weight, mono, leading, tracking, transform })
    : "";

  const classes = cn(variantClasses, individualClasses, className);

  return <Component className={classes} ref={ref} {...props} />;
};

export { Text, baseVariants, textVariants };
