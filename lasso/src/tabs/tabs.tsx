"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

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
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

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
const tabsListVariants = cva("inline-flex items-center justify-start", {
  variants: {
    variant: {
      default: "h-9 w-fit gap-0.5",
      line: "relative border-b border-border",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
  compoundVariants: [
    // Size variants only apply to line variant
    {
      variant: "line",
      size: "default",
      class: "h-10",
    },
    {
      variant: "line",
      size: "sm",
      class: "h-8",
    },
    {
      variant: "line",
      size: "lg",
      class: "h-12",
    },
  ],
});

/**
 * Props for the TabsList component.
 *
 * @extends React.ComponentProps<typeof TabsPrimitive.List>
 * @extends VariantProps<typeof tabsListVariants>
 */
interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

/**
 * TabsList - Container for the tab triggers.
 *
 * @param variant - Visual style variant: "default" (pill-style) or "line" (underline-style)
 * @param size - Size variant (only applies to line variant): "default", "sm", or "lg"
 * @param className - Additional CSS classes to apply
 */
function TabsList({ className, variant, size, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  );
}

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
const tabsTriggerVariants = cva(
  "inline-flex items-center hover:cursor-pointer justify-center whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-border data-[state=active]:text-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 h-full px-2 py-1 text-sm font-medium lasso:wght-medium leading-5 rounded-sm transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        line: "relative px-2 h-full text-sm font-normal lasso:wght-normal leading-5 data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:lasso:wght-medium data-[state=inactive]:text-muted-foreground after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] data-[state=active]:after:bg-brand-terracotta",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      // Size variants only apply to line variant
      {
        variant: "line",
        size: "default",
        class: "text-sm font-normal lasso:wght-normal leading-5",
      },
      {
        variant: "line",
        size: "sm",
        class: "text-xs font-normal lasso:wght-normal leading-4 px-1",
      },
      {
        variant: "line",
        size: "lg",
        class: "text-base font-normal lasso:wght-normal leading-6 px-3",
      },
    ],
  },
);

/**
 * Props for the TabsTrigger component.
 *
 * @extends React.ComponentProps<typeof TabsPrimitive.Trigger>
 * @extends VariantProps<typeof tabsTriggerVariants>
 */
interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

/**
 * TabsTrigger - The clickable button that activates its associated tab panel.
 *
 * @param value - A unique value that associates the trigger with a content panel (required)
 * @param variant - Visual style variant: "default" (pill-style) or "line" (underline-style)
 * @param size - Size variant (only applies to line variant): "default", "sm", or "lg"
 * @param disabled - Whether the tab trigger is disabled
 * @param className - Additional CSS classes to apply
 */
function TabsTrigger({ className, variant, size, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/**
 * TabsContent - The content panel that is shown when its associated tab is active.
 *
 * @param value - A unique value that associates the content with a trigger (required)
 * @param forceMount - Force content to be rendered when inactive (useful for animations)
 * @param className - Additional CSS classes to apply
 */
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
export type { TabsListProps, TabsTriggerProps };
