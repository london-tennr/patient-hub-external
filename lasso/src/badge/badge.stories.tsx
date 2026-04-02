import { Icon } from "@iconify/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Default Badge",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Badge",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Badge",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success Badge",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning Badge",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Badge",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info Badge",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon icon="ph:bell" />
        New Feature
      </>
    ),
  },
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: <a href="#">Link Badge</a>,
  },
};
