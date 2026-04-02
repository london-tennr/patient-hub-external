import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "./input-group";

const meta = {
  title: "Components/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className="w-[350px] space-y-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <MagnifyingGlassIcon className="size-4" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupTextarea placeholder="Message..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton size="xs">Send</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
