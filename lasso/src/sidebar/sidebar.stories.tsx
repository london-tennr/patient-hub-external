import {
  Calendar,
  Envelope,
  Gear,
  House,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  subcomponents: {
    SidebarProvider,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarSeparator,
    SidebarInset,
    SidebarTrigger,
  },
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    side: {
      control: { type: "radio" },
      options: ["left", "right"],
      defaultValue: "left",
    },
    variant: {
      control: { type: "radio" },
      options: ["sidebar", "floating", "inset"],
      defaultValue: "sidebar",
    },
    collapsible: {
      control: { type: "radio" },
      options: ["offcanvas", "icon", "none"],
      defaultValue: "offcanvas",
    },
  },
};

const Template = (args: React.ComponentProps<typeof Sidebar>) => {
  const items = [
    {
      title: "Home",
      url: "#",
      icon: House,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Envelope,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: MagnifyingGlass,
    },
    {
      title: "Settings",
      url: "#",
      icon: Gear,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar {...args}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {args.variant === "inset" ? (
        <SidebarInset>
          <main>
            <SidebarTrigger />
          </main>
        </SidebarInset>
      ) : (
        <main>
          <SidebarTrigger />
        </main>
      )}
    </SidebarProvider>
  );
};

export const Default = Template.bind({}) as typeof Template & {
  args: React.ComponentProps<typeof Sidebar>;
};
Default.args = {
  side: "left",
  variant: "sidebar",
  collapsible: "offcanvas",
};

export const Floating = Template.bind({}) as typeof Template & {
  args: React.ComponentProps<typeof Sidebar>;
};
Floating.args = {
  side: "left",
  variant: "floating",
  collapsible: "icon",
};

export const Inset = Template.bind({}) as typeof Template & {
  args: React.ComponentProps<typeof Sidebar>;
};
Inset.args = {
  side: "left",
  variant: "inset",
  collapsible: "icon",
};
