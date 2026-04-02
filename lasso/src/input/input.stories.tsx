import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[350px]">
      <Input placeholder="Enter your name" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[350px] space-y-2">
      <label htmlFor="name" className="text-sm font-medium">
        Name
      </label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[350px]">
      <Input placeholder="Disabled input" disabled />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("John Doe");

    return (
      <div className="w-[350px] space-y-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your name"
        />
        <p className="text-sm text-muted-foreground">Current value: {value}</p>
      </div>
    );
  },
};

export const Types: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div className="space-y-2">
        <label htmlFor="text" className="text-sm font-medium">
          Text
        </label>
        <Input id="text" type="text" placeholder="Text input" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="Email input" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input id="password" type="password" placeholder="Password input" />
      </div>
    </div>
  ),
};
