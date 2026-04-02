import type { Meta, StoryObj } from "@storybook/react";

import { Stack } from "./stack";

const meta: Meta<typeof Stack> = {
  title: "Foundations/Stack",
  component: Stack,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stack>;

// Basic example with default props
export const Default: Story = {
  args: {
    children: (
      <>
        <div className="bg-blue-200 p-4">Item 1</div>
        <div className="bg-blue-200 p-4">Item 2</div>
        <div className="bg-blue-200 p-4">Item 3</div>
      </>
    ),
  },
};

// Row direction example
export const Row: Story = {
  args: {
    direction: "row",
    children: (
      <>
        <div className="bg-green-200 p-4">Item 1</div>
        <div className="bg-green-200 p-4">Item 2</div>
        <div className="bg-green-200 p-4">Item 3</div>
      </>
    ),
  },
};

// Different spacing examples
export const SpacingVariants: Story = {
  render: () => (
    <Stack spacing="xl">
      <Stack spacing="none">
        <div className="bg-red-200 p-4">No Spacing</div>
        <div className="bg-red-200 p-4">No Spacing</div>
      </Stack>
      <Stack spacing="sm">
        <div className="bg-orange-200 p-4">Small Spacing</div>
        <div className="bg-orange-200 p-4">Small Spacing</div>
      </Stack>
      <Stack spacing="base">
        <div className="bg-yellow-200 p-4">Base Spacing</div>
        <div className="bg-yellow-200 p-4">Base Spacing</div>
      </Stack>
      <Stack spacing="xl">
        <div className="bg-green-200 p-4">Extra Large Spacing</div>
        <div className="bg-green-200 p-4">Extra Large Spacing</div>
      </Stack>
    </Stack>
  ),
};

// Alignment examples
export const Alignment: Story = {
  render: () => (
    <Stack spacing="xl">
      <Stack align="start" direction="row" className="h-32 bg-gray-100">
        <div className="bg-purple-200 p-4">Start Aligned</div>
        <div className="bg-purple-200 p-4">Start Aligned</div>
      </Stack>
      <Stack align="center" direction="row" className="h-32 bg-gray-100">
        <div className="bg-purple-200 p-4">Center Aligned</div>
        <div className="bg-purple-200 p-4">Center Aligned</div>
      </Stack>
      <Stack align="end" direction="row" className="h-32 bg-gray-100">
        <div className="bg-purple-200 p-4">End Aligned</div>
        <div className="bg-purple-200 p-4">End Aligned</div>
      </Stack>
      <Stack align="stretch" direction="row" className="h-32 bg-gray-100">
        <div className="bg-purple-200 p-4">Stretch Aligned</div>
        <div className="bg-purple-200 p-4">Stretch Aligned</div>
      </Stack>
    </Stack>
  ),
};

// Justify examples
export const Justify: Story = {
  render: () => (
    <Stack spacing="xl">
      <Stack direction="row" justify="start" className="bg-gray-100">
        <div className="bg-blue-200 p-4">Start</div>
        <div className="bg-blue-200 p-4">Justified</div>
      </Stack>
      <Stack direction="row" justify="center" className="bg-gray-100">
        <div className="bg-blue-200 p-4">Center</div>
        <div className="bg-blue-200 p-4">Justified</div>
      </Stack>
      <Stack direction="row" justify="end" className="bg-gray-100">
        <div className="bg-blue-200 p-4">End</div>
        <div className="bg-blue-200 p-4">Justified</div>
      </Stack>
      <Stack direction="row" justify="stretch" className="bg-gray-100">
        <div className="bg-blue-200 p-4">Stretch</div>
        <div className="bg-blue-200 p-4">Justified</div>
      </Stack>
    </Stack>
  ),
};
