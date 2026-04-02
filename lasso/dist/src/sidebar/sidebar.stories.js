import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, Envelope, Gear, House, MagnifyingGlass, } from "@phosphor-icons/react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarSeparator, SidebarTrigger, } from "./sidebar";
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
const Template = (args) => {
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
    return (_jsxs(SidebarProvider, { children: [_jsx(Sidebar, { ...args, children: _jsx(SidebarContent, { children: _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Application" }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: items.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, children: _jsxs("a", { href: item.url, children: [_jsx(item.icon, {}), _jsx("span", { children: item.title })] }) }) }, item.title))) }) })] }) }) }), args.variant === "inset" ? (_jsx(SidebarInset, { children: _jsx("main", { children: _jsx(SidebarTrigger, {}) }) })) : (_jsx("main", { children: _jsx(SidebarTrigger, {}) }))] }));
};
export const Default = Template.bind({});
Default.args = {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
};
export const Floating = Template.bind({});
Floating.args = {
    side: "left",
    variant: "floating",
    collapsible: "icon",
};
export const Inset = Template.bind({});
Inset.args = {
    side: "left",
    variant: "inset",
    collapsible: "icon",
};
