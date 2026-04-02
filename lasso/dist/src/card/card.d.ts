import * as React from "react";
/**
 * Card Component
 *
 * A versatile container for grouping related content and actions. Provides a consistent
 * visual structure with distinct sections for headers, content, and footers. Built as
 * a set of composable sub-components for flexibility while maintaining design consistency
 * in the Tennr design system.
 *
 * @see [Lasso Card README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/card/README.md)
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 *   <CardFooter>Footer content</CardFooter>
 * </Card>
 * ```
 */
declare function Card({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * CardHeader - The header section of a Card containing title, description, and optional actions.
 *
 * Uses CSS grid layout to automatically position CardAction elements when present.
 * Supports container queries for responsive layouts.
 *
 * @param className - Additional CSS classes to apply to the header
 */
declare function CardHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * CardTitle - The primary title/heading text within a CardHeader.
 *
 * Styled with medium weight and foreground color for emphasis.
 *
 * @param className - Additional CSS classes to apply to the title
 */
declare function CardTitle({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * CardDescription - Secondary descriptive text within a CardHeader.
 *
 * Styled with muted foreground color and smaller text for supporting information.
 *
 * @param className - Additional CSS classes to apply to the description
 */
declare function CardDescription({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * CardAction - A positioned slot for action elements (buttons, menus) in the CardHeader.
 *
 * Automatically positioned in the top-right of CardHeader using CSS grid.
 * Spans both title and description rows for proper alignment.
 *
 * @param className - Additional CSS classes to apply to the action container
 */
declare function CardAction({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * CardContent - The main body content area of a Card.
 *
 * Provides consistent horizontal padding. Use for primary card content.
 *
 * @param className - Additional CSS classes to apply to the content container
 */
declare function CardContent({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
/**
 * CardFooter - The footer section of a Card for actions or supplementary information.
 *
 * Uses flexbox for horizontal layout. Add `border-t` class for a top border with automatic padding.
 *
 * @param className - Additional CSS classes to apply to the footer
 */
declare function CardFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, };
//# sourceMappingURL=card.d.ts.map