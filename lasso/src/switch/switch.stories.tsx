import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Switch } from "./switch";

/**
 *  TODO: Needs a style pass */
const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
  render: (_args) => {
    return (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <label
          htmlFor="airplane-mode"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Airplane Mode
        </label>
      </div>
    );
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (_args) => {
    return (
      <div className="flex items-center space-x-2">
        <Switch id="notifications" defaultChecked />
        <label
          htmlFor="notifications"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Notifications
        </label>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (_args) => {
    return (
      <div className="flex items-center space-x-2">
        <Switch id="disabled" disabled />
        <label
          htmlFor="disabled"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled Switch
        </label>
      </div>
    );
  },
};

export const WithState: Story = {
  args: {
    defaultChecked: false,
  },
  render: (_args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="state-switch"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <label
            htmlFor="state-switch"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Toggle Feature
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          Switch is {checked ? "enabled" : "disabled"}
        </p>
      </div>
    );
  },
};

export const WithForm: Story = {
  args: {
    defaultChecked: false,
  },
  render: (_args) => {
    const [settings, setSettings] = useState({
      notifications: false,
      darkMode: false,
      sound: true,
    });

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    return (
      <div className="w-[300px] p-4 border rounded-sm space-y-4">
        <h3 className="text-lg font-medium">Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="notifications" className="text-sm font-medium">
              Notifications
            </label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={() => toggleSetting("notifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="dark-mode" className="text-sm font-medium">
              Dark Mode
            </label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={() => toggleSetting("darkMode")}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="sound" className="text-sm font-medium">
              Sound
            </label>
            <Switch
              id="sound"
              checked={settings.sound}
              onCheckedChange={() => toggleSetting("sound")}
            />
          </div>
        </div>
      </div>
    );
  },
};
