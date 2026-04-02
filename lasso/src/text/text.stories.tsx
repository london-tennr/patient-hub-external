import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./text";

/** The Text component is designed to help enforce our typography standards as part of Lasso. Use the `variant` prop to apply a preset style in most cases.
 *
 *
 * If you need to customize the style because a designer explicitly notes a one-off deviation, you can use the `family`, `size`, `weight`, `mono`, `leading`, and `tracking` props to customize the style.
 * **Note that this should almost never occur!** Double check with design to make sure the deviation is intentional and that we can't use an existing preset.
 *
 * If a designer wants to specify a new type style for use in multiple places, add a new preset variant to the Lasso component itself.
 */
const meta: Meta<typeof Text> = {
  title: "Foundations/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        // New design token variants
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
        "heading-xs",
        "base",
        "base-sm",
        "base-sm-tight",
        "base-xs",
        "eyebrow",
        "caption",
        // Legacy variants
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "body",
        "technical",
        "technicalBold",
        "code",
      ],
    },
    family: {
      control: "select",
      options: ["display", "body"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold"],
    },
    mono: {
      control: "select",
      options: ["none", "low", "medium", "full"],
    },
    leading: {
      control: "select",
      options: [
        "none",
        "tight",
        "normal",
        "relaxed",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "12",
      ],
    },
    tracking: {
      control: "select",
      options: ["tighter", "tight", "normal", "wide", "wider"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Default controllable story
export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "base",
  },
};

// Design Token Variants
export const HeadingXL: Story = {
  args: {
    variant: "heading-xl",
    family: "display",
    children: "Heading XL (48px)",
  },
};

export const HeadingXLMarfa: Story = {
  args: {
    variant: "heading-xl",
    children: "Heading XL (48px)",
  },
};

export const HeadingLarge: Story = {
  args: {
    variant: "heading-lg",
    family: "display",
    children: "Heading Large (36px)",
  },
};

export const HeadingLargeMarfa: Story = {
  args: {
    variant: "heading-lg",
    children: "Heading Large (36px)",
  },
};

export const HeadingMedium: Story = {
  args: {
    variant: "heading-md",
    family: "display",
    children: "Heading Medium (30px)",
  },
};

export const HeadingMediumMarfa: Story = {
  args: {
    variant: "heading-md",
    children: "Heading Medium (30px)",
  },
};

export const HeadingSmall: Story = {
  args: {
    variant: "heading-sm",
    family: "display",
    children: "Heading Small (24px)",
  },
};

export const HeadingSmallMarfa: Story = {
  args: {
    variant: "heading-sm",
    children: "Heading Small (24px)",
  },
};

export const HeadingXS: Story = {
  args: {
    variant: "heading-xs",
    family: "display",
    children: "Heading XS (20px)",
  },
};

export const HeadingXSMarfa: Story = {
  args: {
    variant: "heading-xs",
    children: "Heading XS (20px)",
  },
};

export const Base: Story = {
  args: {
    variant: "base",
    children: "Base text (16px)",
  },
};

export const BaseSmall: Story = {
  args: {
    variant: "base-sm",
    children: "Base Small (14px)",
  },
};

export const BaseSmallTight: Story = {
  args: {
    variant: "base-sm-tight",
    children: "Base Small with tight line height (14px)",
  },
};

export const BaseXS: Story = {
  args: {
    variant: "base-xs",
    children: "Base Extra Small (12px)",
  },
};

export const Eyebrow: Story = {
  args: {
    variant: "eyebrow",
    children: "Eyebrow Text",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Caption text",
  },
};
