import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarSeparator, SidebarTrigger } from "./sidebar";
declare const _default: {
    title: string;
    component: typeof Sidebar;
    subcomponents: {
        SidebarProvider: typeof SidebarProvider;
        SidebarContent: typeof SidebarContent;
        SidebarHeader: typeof SidebarHeader;
        SidebarFooter: typeof SidebarFooter;
        SidebarGroup: typeof SidebarGroup;
        SidebarGroupLabel: typeof SidebarGroupLabel;
        SidebarGroupContent: typeof SidebarGroupContent;
        SidebarMenu: typeof SidebarMenu;
        SidebarMenuItem: typeof SidebarMenuItem;
        SidebarMenuButton: typeof SidebarMenuButton;
        SidebarMenuSub: typeof SidebarMenuSub;
        SidebarMenuSubItem: typeof SidebarMenuSubItem;
        SidebarMenuSubButton: typeof SidebarMenuSubButton;
        SidebarSeparator: typeof SidebarSeparator;
        SidebarInset: typeof SidebarInset;
        SidebarTrigger: typeof SidebarTrigger;
    };
    parameters: {
        layout: string;
    };
    argTypes: {
        side: {
            control: {
                type: string;
            };
            options: string[];
            defaultValue: string;
        };
        variant: {
            control: {
                type: string;
            };
            options: string[];
            defaultValue: string;
        };
        collapsible: {
            control: {
                type: string;
            };
            options: string[];
            defaultValue: string;
        };
    };
};
export default _default;
declare const Template: (args: React.ComponentProps<typeof Sidebar>) => import("react/jsx-runtime").JSX.Element;
export declare const Default: typeof Template & {
    args: React.ComponentProps<typeof Sidebar>;
};
export declare const Floating: typeof Template & {
    args: React.ComponentProps<typeof Sidebar>;
};
export declare const Inset: typeof Template & {
    args: React.ComponentProps<typeof Sidebar>;
};
//# sourceMappingURL=sidebar.stories.d.ts.map