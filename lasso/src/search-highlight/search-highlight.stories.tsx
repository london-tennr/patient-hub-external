import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { SearchHighlight } from "./search-highlight";

const meta = {
  title: "Components/SearchHighlight",
  component: SearchHighlight,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    scrollableContainer: { current: null },
    searchableContentContainer: { current: null },
    placeholder: "Search",
  },
} satisfies Meta<typeof SearchHighlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const sample = `The quick brown fox jumps over the lazy dog.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nFoxes are quick and clever. Dogs can be lazy or lively.`;

    return (
      <div style={{ width: 800 }}>
        <div ref={containerRef} className="max-h-[240px] overflow-y-auto">
          <SearchHighlight scrollableContainer={containerRef} />
          <div className="px-4">
            {sample} {sample} {sample} {sample} {sample} {sample} {sample}
            {sample} {sample} {sample} {sample} {sample} {sample} {sample}
          </div>
        </div>
      </div>
    );
  },
};
