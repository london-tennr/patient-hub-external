import type { Meta, StoryObj } from "@storybook/react";

import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-sm border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            <p className="mb-2 font-medium">Item {i + 1}</p>
            <p className="text-muted-foreground">
              This is some content for item {i + 1}. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-sm border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 rounded-sm border bg-muted p-4 w-[200px]"
          >
            <h3 className="font-medium">Card {i + 1}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This is a wide card that demonstrates horizontal scrolling.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithTags: Story = {
  render: () => {
    const tags = Array.from({ length: 50 }).map(
      (_, i, a) => `Tag ${(i % 12) + 1}: ${a.length - i}`,
    );

    return (
      <ScrollArea className="h-72 w-48 rounded-sm border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <div key={tag} className="text-sm p-2 border-b">
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
};
