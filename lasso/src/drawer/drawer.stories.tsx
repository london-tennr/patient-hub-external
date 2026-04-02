import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Title Text</DrawerTitle>
          <DrawerDescription>This is a drawer description.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className="bg-accent/50 p-4 rounded-md text-center text-sm text-muted-foreground">
            Slot (swap it with your content)
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Rich Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Title Text</DrawerTitle>
          <DrawerDescription>This is a drawer description.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="bg-accent/50 p-4 rounded-md text-center text-sm text-muted-foreground">
            Slot (swap it with your content)
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              className="w-full px-3 py-2 border border-input rounded-sm bg-white text-sm"
              placeholder="Placeholder"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <input
              className="w-full px-3 py-2 border border-input rounded-sm bg-white text-sm"
              placeholder="Placeholder"
            />
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
