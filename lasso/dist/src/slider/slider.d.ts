import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
/**
 * Slider Component
 *
 * An interactive input control that allows users to select a value or range of values
 * within a specified range by dragging a thumb along a track. Supports single value
 * selection or range selection with multiple thumbs. Built on top of Radix UI's Slider
 * primitive with consistent styling for the Tennr design system.
 *
 * @see [Radix UI Slider](https://github.com/radix-ui/primitives/blob/main/packages/react/slider/src/slider.tsx)
 *
 * @see [Lasso Slider README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/slider/README.md)
 *
 * @param className - Additional CSS classes to apply to the slider root
 * @param defaultValue - Initial value(s) for uncontrolled usage (array of numbers)
 * @param value - Controlled value(s) (array of numbers)
 * @param min - Minimum value (default: 0)
 * @param max - Maximum value (default: 100)
 * @param step - Step increment for value changes
 * @param orientation - Slider orientation: "horizontal" or "vertical"
 * @param disabled - Whether the slider is disabled
 * @param onValueChange - Callback fired when value changes
 * @param onValueCommit - Callback fired when value change is committed
 *
 * @example
 * ```tsx
 * // Single value slider
 * <Slider defaultValue={[50]} max={100} step={1} />
 *
 * // Range slider
 * <Slider defaultValue={[20, 80]} max={100} step={1} />
 *
 * // Controlled slider
 * const [value, setValue] = useState([33]);
 * <Slider value={value} onValueChange={setValue} max={100} />
 * ```
 */
declare function Slider({ className, defaultValue, value, min, max, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
export { Slider };
//# sourceMappingURL=slider.d.ts.map