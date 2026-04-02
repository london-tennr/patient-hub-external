import type { StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
declare const meta: {
    title: string;
    component: typeof Textarea;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithLabel: Story;
export declare const Disabled: Story;
export declare const WithValue: Story;
export declare const Sizes: Story;
//# sourceMappingURL=textarea.stories.d.ts.map