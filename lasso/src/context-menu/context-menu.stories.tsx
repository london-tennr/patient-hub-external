import { Copy, CreditCard, Gear, Keyboard, User } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./context-menu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-sm border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>More Tools</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <User weight="light" />
          Profile
          <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <CreditCard weight="light" />
          Billing
          <ContextMenuShortcut>⌘B</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Gear weight="light" />
          Settings
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Keyboard weight="light" />
          Keyboard shortcuts
          <ContextMenuShortcut>⌘K</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[100px] w-[250px] items-center justify-center rounded-sm border text-sm">
        Right click on this text
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Copy weight="light" />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Select All</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
