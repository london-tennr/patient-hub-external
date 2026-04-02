import type { StoryObj } from "@storybook/react";
import { Label } from "./label.js";
declare const meta: {
    title: string;
    component: typeof Label;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithInput: Story;
export declare const WithCheckbox: Story;
/**
 * Note that the `<Input />` component has a `peer` class that lets the label know where its disabled state comes from.
 * The `peer` marker only works on previous siblings due to [CSS Limitations](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator).
 */
export declare const Disabled: Story;
//# sourceMappingURL=label.stories.d.ts.map