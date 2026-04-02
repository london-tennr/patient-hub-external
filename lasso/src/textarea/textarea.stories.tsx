import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Label } from "../label/label";
import { Textarea } from "./textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[350px]">
      <Textarea placeholder="Enter your message" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[350px] flex flex-col gap-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Enter your message" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[350px]">
      <Textarea placeholder="Disabled textarea" disabled />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("This is a sample message.");

    return (
      <div className="w-[350px] flex flex-col gap-2">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your message"
        />
        <p className="text-sm text-muted-foreground">
          Character count: {value.length}
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="small">Small</Label>
        <Textarea
          id="small"
          placeholder="Small textarea"
          className="min-h-[80px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="medium">Medium</Label>
        <Textarea
          id="medium"
          placeholder="Medium textarea"
          className="min-h-[120px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="large" className="text-sm font-medium">
          Large
        </label>
        <Textarea
          id="large"
          placeholder="Large textarea"
          className="min-h-[200px]"
        />
      </div>
    </div>
  ),
};
