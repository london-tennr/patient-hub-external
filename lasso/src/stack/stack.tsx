import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils/cn.js";

/**
 * Variant configuration for the Stack component.
 *
 * Defines the available variants for direction, alignment, justification, and spacing.
 * Built with class-variance-authority (CVA) for type-safe styling.
 */
const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      stretch: "justify-stretch",
      between: "justify-between",
    },
    spacing: {
      none: "gap-none",
      xs: "gap-1", // 4px - icons & other rare cases
      sm: "gap-2", // 8px - standard smaller spacing
      md: "gap-3", // 12px - rarely used
      base: "gap-4", // 16px - standard spacing
      lg: "gap-6", // 24px
      xl: "gap-8", // 32px
      "2xl": "gap-10", // 40px
      "3xl": "gap-12", // 48px
      "4xl": "gap-16", // 64px
      "5xl": "gap-20", // 80px
      "6xl": "gap-24", // 96px
      "7xl": "gap-32", // 128px
      "8xl": "gap-40", // 160px
      "9xl": "gap-48", // 192px
      "10xl": "gap-56", // 224px
      "11xl": "gap-64", // 256px
    },
  },
  defaultVariants: {
    direction: "col",
    align: "start",
    justify: "start",
    spacing: "base",
  },
});

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
export interface StackProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof stackVariants> {
  /** The flex direction of the stack. Defaults to "col". */
  direction?: "row" | "col";
  /** Cross-axis alignment (items-*). Defaults to "start". */
  align?: "start" | "center" | "end" | "stretch";
  /** Main-axis distribution (justify-*). Defaults to "start". */
  justify?: "start" | "center" | "end" | "stretch" | "between";
  /** Gap between children using the spacing scale. Defaults to "base" (16px). */
  spacing?:
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | "10xl"
    | "11xl";
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
export const Stack = ({
  className,
  direction,
  align,
  justify,
  spacing,
  ...props
}: StackProps) => {
  return (
    <div
      className={cn(
        stackVariants({ direction, align, justify, spacing }),
        className,
      )}
      {...props}
    />
  );
};
