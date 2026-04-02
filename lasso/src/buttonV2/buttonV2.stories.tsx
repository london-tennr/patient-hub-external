import { Icon as Iconify } from "@iconify/react";
import type { Meta, StoryObj } from "@storybook/react";

import { ButtonV2 } from "./buttonV2";

const meta: Meta<typeof ButtonV2> = {
  title: "Components/ButtonV2",
  component: ButtonV2,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "muted"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description: "Whether to render as a child component",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonV2>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Muted: Story = {
  args: {
    children: "Muted Button",
    variant: "muted",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    variant: "outline",
    children: <Iconify icon="ph:magnifying-glass-light" />,
    size: "icon",
    "aria-label": "Search",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Next
        <Iconify icon="ph:arrow-right-light" />
      </>
    ),
  },
};
