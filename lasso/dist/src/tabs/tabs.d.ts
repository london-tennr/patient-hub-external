import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
/**
 * Tabs Component
 *
 * A set of layered content sections—known as tab panels—that display one panel
 * at a time. Users can switch between panels by clicking or navigating to the
 * corresponding tab. Built on top of Radix UI's Tabs primitive with consistent
 * styling for the Tennr design system.
 *
 * @see [Radix UI Tabs](https://www.radix-ui.com/primitives/docs/components/tabs)
 *
 * @see [Lasso Tabs README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/tabs/README.md)
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Account content</TabsContent>
 *   <TabsContent value="password">Password content</TabsContent>
 * </Tabs>
 * ```
 */
declare function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * Style variants for the TabsList component using class-variance-authority.
 *
 * @variant default - Pill-style tabs with subtle background
 * @variant line - Underline-style tabs with border indicator
 *
 * @size default - Standard height (h-10 for line variant)
 * @size sm - Compact height (h-8 for line variant)
 * @size lg - Large height (h-12 for line variant)
 */
declare const tabsListVariants: (props?: ({
    variant?: "default" | "line" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Props for the TabsList component.
 *
 * @extends React.ComponentProps<typeof TabsPrimitive.List>
 * @extends VariantProps<typeof tabsListVariants>
 */
interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List>, VariantProps<typeof tabsListVariants> {
}
/**
 * TabsList - Container for the tab triggers.
 *
 * @param variant - Visual style variant: "default" (pill-style) or "line" (underline-style)
 * @param size - Size variant (only applies to line variant): "default", "sm", or "lg"
 * @param className - Additional CSS classes to apply
 */
declare function TabsList({ className, variant, size, ...props }: TabsListProps): import("react/jsx-runtime").JSX.Element;
/**
 * Style variants for the TabsTrigger component using class-variance-authority.
 *
 * @variant default - Pill-style trigger with background on active state
 * @variant line - Underline-style trigger with terracotta indicator on active state
 *
 * @size default - Standard text size (text-sm)
 * @size sm - Compact text size (text-xs, only for line variant)
 * @size lg - Large text size (text-base, only for line variant)
 */
declare const tabsTriggerVariants: (props?: ({
    variant?: "default" | "line" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Props for the TabsTrigger component.
 *
 * @extends React.ComponentProps<typeof TabsPrimitive.Trigger>
 * @extends VariantProps<typeof tabsTriggerVariants>
 */
interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger>, VariantProps<typeof tabsTriggerVariants> {
}
/**
 * TabsTrigger - The clickable button that activates its associated tab panel.
 *
 * @param value - A unique value that associates the trigger with a content panel (required)
 * @param variant - Visual style variant: "default" (pill-style) or "line" (underline-style)
 * @param size - Size variant (only applies to line variant): "default", "sm", or "lg"
 * @param disabled - Whether the tab trigger is disabled
 * @param className - Additional CSS classes to apply
 */
declare function TabsTrigger({ className, variant, size, ...props }: TabsTriggerProps): import("react/jsx-runtime").JSX.Element;
/**
 * TabsContent - The content panel that is shown when its associated tab is active.
 *
 * @param value - A unique value that associates the content with a trigger (required)
 * @param forceMount - Force content to be rendered when inactive (useful for animations)
 * @param className - Additional CSS classes to apply
 */
declare function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, };
export type { TabsListProps, TabsTriggerProps };
//# sourceMappingURL=tabs.d.ts.map