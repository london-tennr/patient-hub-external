import { type VariantProps } from "class-variance-authority";
/**
 * Variant configuration for the Stack component.
 *
 * Defines the available variants for direction, alignment, justification, and spacing.
 * Built with class-variance-authority (CVA) for type-safe styling.
 */
declare const stackVariants: (props?: ({
    direction?: "row" | "col" | null | undefined;
    align?: "center" | "end" | "start" | "stretch" | null | undefined;
    justify?: "center" | "end" | "start" | "stretch" | "between" | null | undefined;
    spacing?: "sm" | "lg" | "none" | "base" | "xs" | "xl" | "2xl" | "3xl" | "4xl" | "md" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Props for the Stack component.
 *
 * @example
 * ```tsx
 * <Stack direction="row" spacing="sm" align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Stack>
 * ```
 */
export interface StackProps extends React.ComponentProps<"div">, VariantProps<typeof stackVariants> {
    /** The flex direction of the stack. Defaults to "col". */
    direction?: "row" | "col";
    /** Cross-axis alignment (items-*). Defaults to "start". */
    align?: "start" | "center" | "end" | "stretch";
    /** Main-axis distribution (justify-*). Defaults to "start". */
    justify?: "start" | "center" | "end" | "stretch" | "between";
    /** Gap between children using the spacing scale. Defaults to "base" (16px). */
    spacing?: "none" | "xs" | "sm" | "md" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl";
}
/**
 * Stack Component
 *
 * A foundational layout primitive that simplifies building flexible, consistent layouts
 * using CSS Flexbox. Provides a clean, prop-driven API for controlling direction,
 * alignment, justification, and spacing between child elements. Built with
 * class-variance-authority (CVA) for type-safe variant styling.
 *
 * @see [CVA Documentation](https://cva.style/docs)
 *
 * @see [Lasso Stack README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/stack/README.md)
 *
 * @param direction - The flex direction ("row" | "col"). Defaults to "col".
 * @param align - Cross-axis alignment. Defaults to "start".
 * @param justify - Main-axis distribution. Defaults to "start".
 * @param spacing - Gap between children. Defaults to "base" (16px).
 * @param className - Additional CSS classes to apply.
 */
export declare const Stack: ({ className, direction, align, justify, spacing, ...props }: StackProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=stack.d.ts.map