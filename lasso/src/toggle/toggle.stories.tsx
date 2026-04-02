import { TextB, TextItalic, TextStrikethrough } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <TextB weight="light" />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => <Toggle>Subscribe</Toggle>,
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      <TextItalic weight="light" />
    </Toggle>
  ),
};

export const WithTextAndIcon: Story = {
  render: () => (
    <Toggle>
      <TextStrikethrough weight="light" />
      Strikethrough
    </Toggle>
  ),
};

export const Large: Story = {
  render: () => (
    <Toggle size="lg" aria-label="Toggle bold">
      <TextB weight="light" />
    </Toggle>
  ),
};

export const Small: Story = {
  render: () => (
    <Toggle size="sm" aria-label="Toggle bold">
      <TextB weight="light" />
    </Toggle>
  ),
};
