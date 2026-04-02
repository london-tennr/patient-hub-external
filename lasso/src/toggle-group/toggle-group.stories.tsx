import { TextH, TextItalic, TextUnderline } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold">
        <TextH weight="light" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <TextItalic weight="light" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <TextUnderline weight="light" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="small">Small</ToggleGroupItem>
      <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
      <ToggleGroupItem value="large">Large</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
      <ToggleGroupItem value="published">Published</ToggleGroupItem>
      <ToggleGroupItem value="archived">Archived</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithManyOptions: Story = {
  render: () => (
    <ToggleGroup type="single" className="max-w-sm" spacing={2}>
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
      <ToggleGroupItem value="three">Three</ToggleGroupItem>
      <ToggleGroupItem value="four">Four</ToggleGroupItem>
      <ToggleGroupItem value="five">Five</ToggleGroupItem>
      <ToggleGroupItem value="six">Six</ToggleGroupItem>
      <ToggleGroupItem value="seven">Seven</ToggleGroupItem>
      <ToggleGroupItem value="eight">Eight</ToggleGroupItem>
      <ToggleGroupItem value="nine">Nine</ToggleGroupItem>
      <ToggleGroupItem value="ten">Ten</ToggleGroupItem>
      <ToggleGroupItem value="eleven">Eleven</ToggleGroupItem>
      <ToggleGroupItem value="twelve">Twelve</ToggleGroupItem>
      <ToggleGroupItem value="thirteen">Thirteen</ToggleGroupItem>
      <ToggleGroupItem value="fourteen">Fourteen</ToggleGroupItem>
      <ToggleGroupItem value="fifteen">Fifteen</ToggleGroupItem>
      <ToggleGroupItem value="sixteen">Sixteen</ToggleGroupItem>
      <ToggleGroupItem value="seventeen">Seventeen</ToggleGroupItem>
      <ToggleGroupItem value="eighteen">Eighteen</ToggleGroupItem>
      <ToggleGroupItem value="nineteen">Nineteen</ToggleGroupItem>
      <ToggleGroupItem value="twenty">Twenty</ToggleGroupItem>
    </ToggleGroup>
  ),
};
