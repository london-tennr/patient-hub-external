import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button/button";
import { Input } from "../input/input";
import { Label } from "../label/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="mono-medium">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width" className="text-sm mono-medium">
                Width
              </Label>
              <Input id="width" defaultValue="100%" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth" className="text-sm mono-medium">
                Max. width
              </Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height" className="text-sm font-medium">
                Height
              </Label>
              <Input id="height" defaultValue="25px" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight" className="text-sm font-medium">
                Max. height
              </Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithActions: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Account Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          <div className="grid gap-2">
            <PopoverClose asChild>
              <Button variant="outline" className="justify-start">
                Profile
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button variant="outline" className="justify-start">
                Billing
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button variant="outline" className="justify-start">
                Settings
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button variant="destructive" className="justify-start">
                Logout
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
