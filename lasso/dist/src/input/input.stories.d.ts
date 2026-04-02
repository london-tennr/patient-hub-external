import type { StoryObj } from "@storybook/react";
import { Input } from "./input";
declare const meta: {
    title: string;
    component: typeof Input;
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
export declare const Types: Story;
//# sourceMappingURL=input.stories.d.ts.map