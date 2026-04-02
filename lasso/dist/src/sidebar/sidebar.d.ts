import { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { Separator } from "../separator/separator";
import { TooltipContent } from "../tooltip/tooltip";
/**
 * Context properties for the Sidebar component system.
 * Provides state management and controls for sidebar behavior.
 */
type SidebarContextProps = {
    /** Current state of the sidebar: "expanded" or "collapsed" */
    state: "expanded" | "collapsed";
    /** Whether the sidebar is currently open (desktop) */
    open: boolean;
    /** Function to set the open state */
    setOpen: (open: boolean) => void;
    /** Whether the mobile sidebar sheet is open */
    openMobile: boolean;
    /** Function to set the mobile open state */
    setOpenMobile: (open: boolean) => void;
    /** Whether the current viewport is mobile */
    isMobile: boolean;
    /** Function to toggle the sidebar open/closed */
    toggleSidebar: () => void;
};
/**
 * Hook to access the sidebar context.
 *
 * Provides access to sidebar state and controls from any component
 * within the SidebarProvider tree.
 *
 * @returns The sidebar context with state and control functions
 * @throws Error if used outside of a SidebarProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { open, toggleSidebar, state } = useSidebar();
 *   return <button onClick={toggleSidebar}>Toggle ({state})</button>;
 * }
 * ```
 */
declare function useSidebar(): SidebarContextProps;
/**
 * SidebarProvider Component
 *
 * Context provider that manages sidebar state and provides the useSidebar hook.
 * Wraps the entire sidebar layout and handles responsive behavior, keyboard
 * shortcuts, and state persistence via cookies.
 *
 * @param defaultOpen - Initial open state (default: true)
 * @param open - Controlled open state
 * @param onOpenChange - Callback when open state changes
 * @param className - Additional CSS classes
 * @param style - Inline styles (CSS variables for sidebar width are automatically set)
 *
 * @see [Lasso Sidebar README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/sidebar/README.md)
 *
 * @example
 * ```tsx
 * <SidebarProvider defaultOpen={true}>
 *   <Sidebar>...</Sidebar>
 *   <main>...</main>
 * </SidebarProvider>
 * ```
 */
declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }: React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Sidebar Component
 *
 * The main sidebar container that adapts to different screen sizes and provides
 * multiple visual variants and collapse behaviors. Renders as a Sheet on mobile
 * and a fixed panel on desktop.
 *
 * @param side - Which side to display the sidebar: "left" or "right" (default: "left")
 * @param variant - Visual variant: "sidebar", "floating", or "inset" (default: "sidebar")
 * @param collapsible - Collapse behavior: "offcanvas", "icon", or "none" (default: "offcanvas")
 * @param className - Additional CSS classes
 *
 * @see [Lasso Sidebar README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/sidebar/README.md)
 *
 * @example
 * ```tsx
 * <Sidebar side="left" variant="sidebar" collapsible="icon">
 *   <SidebarHeader>...</SidebarHeader>
 *   <SidebarContent>...</SidebarContent>
 *   <SidebarFooter>...</SidebarFooter>
 * </Sidebar>
 * ```
 */
declare function Sidebar({ side, variant, collapsible, className, children, ...props }: React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarTrigger Component
 *
 * A button that toggles the sidebar open/closed state. Automatically calls
 * the toggleSidebar function from context while supporting additional onClick handlers.
 *
 * @param className - Additional CSS classes
 * @param onClick - Additional click handler (toggle is automatic)
 *
 * @example
 * ```tsx
 * <SidebarTrigger className="my-custom-class" />
 * ```
 */
declare function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarRail Component
 *
 * An invisible vertical rail along the sidebar edge that can be clicked or dragged
 * to toggle the sidebar. Provides a wider hit area for easier interaction.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarContent>...</SidebarContent>
 *   <SidebarRail />
 * </Sidebar>
 * ```
 */
declare function SidebarRail({ className, ...props }: React.ComponentProps<"button">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarInset Component
 *
 * Main content area that adjusts its layout based on sidebar state.
 * Use with the "inset" variant to create a visually distinct content area
 * that responds to sidebar collapse state.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarProvider>
 *   <Sidebar variant="inset">...</Sidebar>
 *   <SidebarInset>
 *     <main>Main content here</main>
 *   </SidebarInset>
 * </SidebarProvider>
 * ```
 */
declare function SidebarInset({ className, ...props }: React.ComponentProps<"main">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarInput Component
 *
 * A styled input component for use within the sidebar, typically for search
 * or filtering functionality.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <SidebarInput placeholder="Search..." />
 * </SidebarHeader>
 * ```
 */
declare function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarHeader Component
 *
 * Container for sidebar header content such as logos, titles, or branding.
 * Positioned at the top of the sidebar.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <img src="/logo.svg" alt="Logo" />
 *   <h2>My Application</h2>
 * </SidebarHeader>
 * ```
 */
declare function SidebarHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarFooter Component
 *
 * Container for sidebar footer content such as user info, settings links,
 * or copyright notices. Positioned at the bottom of the sidebar.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <UserAvatar />
 *   <p>© 2025 My Company</p>
 * </SidebarFooter>
 * ```
 */
declare function SidebarFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarSeparator Component
 *
 * A visual divider for separating sections within the sidebar.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarGroup>...</SidebarGroup>
 *   <SidebarSeparator />
 *   <SidebarGroup>...</SidebarGroup>
 * </SidebarContent>
 * ```
 */
declare function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarContent Component
 *
 * Scrollable main content area for the sidebar. Contains the primary navigation
 * groups and menu items. Automatically handles overflow scrolling.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarGroup>...</SidebarGroup>
 *   <SidebarGroup>...</SidebarGroup>
 * </SidebarContent>
 * ```
 */
declare function SidebarContent({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarGroup Component
 *
 * Container for grouping related menu items. Typically contains a label,
 * optional action button, and content with menu items.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 *   <SidebarGroupContent>
 *     <SidebarMenu>...</SidebarMenu>
 *   </SidebarGroupContent>
 * </SidebarGroup>
 * ```
 */
declare function SidebarGroup({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarGroupLabel Component
 *
 * A label/title for a sidebar group. Hidden when the sidebar is collapsed
 * to icon-only mode.
 *
 * @param className - Additional CSS classes
 * @param asChild - If true, renders as the child element using Slot
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Settings</SidebarGroupLabel>
 *   ...
 * </SidebarGroup>
 * ```
 */
declare function SidebarGroupLabel({ className, asChild, ...props }: React.ComponentProps<"div"> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarGroupAction Component
 *
 * An action button positioned in the top-right corner of a sidebar group.
 * Useful for add/create actions related to the group.
 *
 * @param className - Additional CSS classes
 * @param asChild - If true, renders as the child element using Slot
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Projects</SidebarGroupLabel>
 *   <SidebarGroupAction title="Add Project">
 *     <Plus />
 *   </SidebarGroupAction>
 *   ...
 * </SidebarGroup>
 * ```
 */
declare function SidebarGroupAction({ className, asChild, ...props }: React.ComponentProps<"button"> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarGroupContent Component
 *
 * Content container within a sidebar group. Wraps the menu items.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 *   <SidebarGroupContent>
 *     <SidebarMenu>...</SidebarMenu>
 *   </SidebarGroupContent>
 * </SidebarGroup>
 * ```
 */
declare function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarMenu Component
 *
 * Container for sidebar menu items. Renders as an unordered list (`<ul>`).
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarMenu>
 *   <SidebarMenuItem>...</SidebarMenuItem>
 *   <SidebarMenuItem>...</SidebarMenuItem>
 * </SidebarMenu>
 * ```
 */
declare function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarMenuItem Component
 *
 * Individual menu item container. Renders as a list item (`<li>`).
 * Contains a SidebarMenuButton and optionally a SidebarMenuAction or SidebarMenuBadge.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <House />
 *     <span>Home</span>
 *   </SidebarMenuButton>
 * </SidebarMenuItem>
 * ```
 */
declare function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
/**
 * Style variants for the SidebarMenuButton component.
 */
declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "outline" | "default" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * SidebarMenuButton Component
 *
 * Interactive button or link for menu items. Supports tooltips that appear
 * when the sidebar is collapsed to icon-only mode. Can render as a child
 * element using the asChild prop for use with links.
 *
 * @param asChild - If true, renders as the child element (useful for links)
 * @param isActive - Whether this menu item is currently active
 * @param variant - Visual variant: "default" or "outline"
 * @param size - Size variant: "default", "sm", or "lg"
 * @param tooltip - Tooltip content for collapsed state (string or TooltipContent props)
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * // As a button
 * <SidebarMenuButton isActive onClick={handleClick}>
 *   <House />
 *   <span>Home</span>
 * </SidebarMenuButton>
 *
 * // As a link with tooltip
 * <SidebarMenuButton asChild tooltip="Home">
 *   <a href="/">
 *     <House />
 *     <span>Home</span>
 *   </a>
 * </SidebarMenuButton>
 * ```
 */
declare function SidebarMenuButton({ asChild, isActive, variant, size, tooltip, className, ...props }: React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarMenuAction Component
 *
 * A secondary action button within a menu item, positioned on the right side.
 * Can be shown always or only on hover. Hidden when sidebar is collapsed.
 *
 * @param asChild - If true, renders as the child element using Slot
 * @param showOnHover - If true, only shows on menu item hover (default: false)
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <Folder />
 *     <span>Documents</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuAction showOnHover>
 *     <MoreHorizontal />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
 */
declare function SidebarMenuAction({ className, asChild, showOnHover, ...props }: React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarMenuBadge Component
 *
 * A badge or notification indicator for menu items, positioned on the right side.
 * Useful for showing counts, status, or other small indicators. Hidden when
 * sidebar is collapsed.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <Inbox />
 *     <span>Inbox</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuBadge>12</SidebarMenuBadge>
 * </SidebarMenuItem>
 * ```
 */
declare function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarMenuSkeleton Component
 *
 * A loading placeholder for menu items. Displays animated skeleton elements
 * to indicate content is loading. Width varies randomly for a more natural look.
 *
 * @param showIcon - Whether to show an icon skeleton (default: false)
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarMenu>
 *   <SidebarMenuSkeleton showIcon />
 *   <SidebarMenuSkeleton showIcon />
 *   <SidebarMenuSkeleton showIcon />
 * </SidebarMenu>
 * ```
 */
declare function SidebarMenuSkeleton({ className, showIcon, ...props }: React.ComponentProps<"div"> & {
    showIcon?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarMenuSub Component
 *
 * Container for nested sub-menu items. Renders as an indented list with a
 * left border. Hidden when sidebar is collapsed to icon-only mode.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <Folder />
 *     <span>Projects</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuSub>
 *     <SidebarMenuSubItem>...</SidebarMenuSubItem>
 *     <SidebarMenuSubItem>...</SidebarMenuSubItem>
 *   </SidebarMenuSub>
 * </SidebarMenuItem>
 * ```
 */
declare function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarMenuSubItem Component
 *
 * Individual sub-menu item container. Renders as a list item (`<li>`).
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarMenuSubItem>
 *   <SidebarMenuSubButton asChild>
 *     <a href="/projects/active">Active Projects</a>
 *   </SidebarMenuSubButton>
 * </SidebarMenuSubItem>
 * ```
 */
declare function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
/**
 * SidebarMenuSubButton Component
 *
 * Interactive button or link for sub-menu items. Typically used with asChild
 * to render as a link. Hidden when sidebar is collapsed.
 *
 * @param asChild - If true, renders as the child element (useful for links)
 * @param size - Size variant: "sm" or "md" (default: "md")
 * @param isActive - Whether this sub-menu item is currently active
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SidebarMenuSubButton asChild isActive>
 *   <a href="/projects/active">Active Projects</a>
 * </SidebarMenuSubButton>
 * ```
 */
declare function SidebarMenuSubButton({ asChild, size, isActive, className, ...props }: React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar, };
//# sourceMappingURL=sidebar.d.ts.map