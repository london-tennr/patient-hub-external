import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Searchbar } from "./searchbar";

const meta = {
  title: "Components/Searchbar",
  component: Searchbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "Search...",
    className: "w-64",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-64">
        <Searchbar {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
