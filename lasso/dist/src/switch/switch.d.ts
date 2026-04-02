import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
/**
 * Switch Component
 *
 * A toggle control that allows users to turn a setting on or off. It provides a
 * binary choice similar to a checkbox but with a more visual, sliding toggle
 * interaction. Built on top of Radix UI's Switch primitive with consistent styling
 * for the Tennr design system.
 *
 * @see [Radix UI Switch](https://github.com/radix-ui/primitives/blob/main/packages/react/switch/src/switch.tsx)
 *
 * @see [Lasso Switch README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/switch/README.md)
 *
 * @example
 * ```tsx
 * <Switch id="airplane-mode" />
 * ```
 *
 * @example Controlled usage
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * ```
 *
 * @param className - Additional CSS classes to apply to the switch root element
 */
declare function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
export { Switch };
//# sourceMappingURL=switch.d.ts.map