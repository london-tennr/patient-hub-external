"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "../utils/cn";

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
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
