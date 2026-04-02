import type { Meta, StoryObj } from "@storybook/react";

import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "Foundations/Logo",
  component: Logo,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    className: "w-24 h-auto text-brand-peat",
  },
};

export const Large: Story = {
  args: {
    className: "w-48 h-auto text-brand-peat",
  },
};

export const Small: Story = {
  args: {
    className: "w-16 h-auto text-brand-peat",
  },
};

export const NeutralIcon: Story = {
  args: {
    className: "w-24 h-auto",
    variant: "neutral-icon",
  },
};

export const PrimaryIcon: Story = {
  args: {
    className: "w-24 h-auto",
    variant: "primary-icon",
  },
};

export const TextIcon: Story = {
  args: {
    className: "w-24 h-auto text-brand-peat",
    variant: "text-icon",
  },
};
