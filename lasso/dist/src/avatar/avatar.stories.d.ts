import { StoryObj } from "@storybook/react";
import { Avatar } from "./avatar.js";
declare const meta: {
    title: string;
    component: typeof Avatar;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithFallback: Story;
export declare const CustomSize: Story;
export declare const FallbackOnly: Story;
//# sourceMappingURL=avatar.stories.d.ts.map