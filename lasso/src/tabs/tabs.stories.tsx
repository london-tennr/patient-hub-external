import { Icon } from "@iconify/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">Account settings content goes here.</div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">Password settings content goes here.</div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">General settings content goes here.</div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">
          <Icon icon="ph:user" className="size-6" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Icon icon="ph:bell" className="size-6" />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="p-4">Profile information and settings.</div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4">Notification preferences and settings.</div>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active Tab</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled Tab
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="p-4">This is an active tab.</div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4">This tab is disabled.</div>
      </TabsContent>
    </Tabs>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Tabs defaultValue="single">
      <TabsList>
        <TabsTrigger value="single">Single Patient</TabsTrigger>
        <TabsTrigger value="multiple">Multiple Patients</TabsTrigger>
        <TabsTrigger value="batch">Batch Upload</TabsTrigger>
      </TabsList>
      <TabsContent value="single">
        <div className="p-4">Single patient content goes here.</div>
      </TabsContent>
      <TabsContent value="multiple">
        <div className="p-4">Multiple patients content goes here.</div>
      </TabsContent>
      <TabsContent value="batch">
        <div className="p-4">Batch upload content goes here.</div>
      </TabsContent>
    </Tabs>
  ),
};

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList variant="line">
        <TabsTrigger variant="line" value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger variant="line" value="analytics">
          Analytics
        </TabsTrigger>
        <TabsTrigger variant="line" value="reports">
          Reports
        </TabsTrigger>
        <TabsTrigger variant="line" value="settings">
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4">Overview content with line variant tabs.</div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4">Analytics content with line variant tabs.</div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4">Reports content with line variant tabs.</div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">Settings content with line variant tabs.</div>
      </TabsContent>
    </Tabs>
  ),
};

export const LineSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Small Size (Line Variant)</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="sm">
            <TabsTrigger variant="line" size="sm" value="tab1">
              Tab 1
            </TabsTrigger>
            <TabsTrigger variant="line" size="sm" value="tab2">
              Tab 2
            </TabsTrigger>
            <TabsTrigger variant="line" size="sm" value="tab3">
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4">Small line tabs content.</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4">Small line tabs content.</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4">Small line tabs content.</div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">
          Default Size (Line Variant)
        </h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="default">
            <TabsTrigger variant="line" size="default" value="tab1">
              Tab 1
            </TabsTrigger>
            <TabsTrigger variant="line" size="default" value="tab2">
              Tab 2
            </TabsTrigger>
            <TabsTrigger variant="line" size="default" value="tab3">
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4">Default line tabs content.</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4">Default line tabs content.</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4">Default line tabs content.</div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large Size (Line Variant)</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="lg">
            <TabsTrigger variant="line" size="lg" value="tab1">
              Tab 1
            </TabsTrigger>
            <TabsTrigger variant="line" size="lg" value="tab2">
              Tab 2
            </TabsTrigger>
            <TabsTrigger variant="line" size="lg" value="tab3">
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4">Large line tabs content.</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4">Large line tabs content.</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4">Large line tabs content.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};
