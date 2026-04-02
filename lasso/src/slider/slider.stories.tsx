import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[33]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[20, 80]} max={100} step={1} />
    </div>
  ),
};

export const WithStep: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={10} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="h-[200px]">
      <Slider defaultValue={[33]} max={100} step={1} orientation="vertical" />
    </div>
  ),
};
