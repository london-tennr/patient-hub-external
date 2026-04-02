import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./text";
/** The Text component is designed to help enforce our typography standards as part of Lasso. Use the `variant` prop to apply a preset style in most cases.
 *
 *
 * If you need to customize the style because a designer explicitly notes a one-off deviation, you can use the `family`, `size`, `weight`, `mono`, `leading`, and `tracking` props to customize the style.
 * **Note that this should almost never occur!** Double check with design to make sure the deviation is intentional and that we can't use an existing preset.
 *
 * If a designer wants to specify a new type style for use in multiple places, add a new preset variant to the Lasso component itself.
 */
declare const meta: Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof Text>;
export declare const Default: Story;
export declare const HeadingXL: Story;
export declare const HeadingXLMarfa: Story;
export declare const HeadingLarge: Story;
export declare const HeadingLargeMarfa: Story;
export declare const HeadingMedium: Story;
export declare const HeadingMediumMarfa: Story;
export declare const HeadingSmall: Story;
export declare const HeadingSmallMarfa: Story;
export declare const HeadingXS: Story;
export declare const HeadingXSMarfa: Story;
export declare const Base: Story;
export declare const BaseSmall: Story;
export declare const BaseSmallTight: Story;
export declare const BaseXS: Story;
export declare const Eyebrow: Story;
export declare const Caption: Story;
//# sourceMappingURL=text.stories.d.ts.map