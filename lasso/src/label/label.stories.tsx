import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "../checkbox/checkbox.js";
import { Input } from "../input/input.js";
import { Label } from "./label.js";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email",
  },
};

export const WithInput: Story = {
  args: {
    children: "Username",
  },
  render: (args) => (
    <div className="grid w-full max-w-160 items-center gap-1.5">
      <Label htmlFor="username" {...args} />
      <Input type="text" id="username" placeholder="Enter your username" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  args: {
    children: "Accept terms and conditions",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" {...args} />
    </div>
  ),
};

/**
 * Note that the `<Input />` component has a `peer` class that lets the label know where its disabled state comes from.
 * The `peer` marker only works on previous siblings due to [CSS Limitations](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator).
 */
export const Disabled: Story = {
  args: {
    children: "Disabled Label",
  },
  render: (args) => (
    <div className="grid w-full max-w-160 items-center gap-2">
      <Label htmlFor="disabled-input" {...args} />
      <Input
        type="text"
        className="peer"
        id="disabled-input"
        disabled
        placeholder="This input is disabled"
      />
    </div>
  ),
};
