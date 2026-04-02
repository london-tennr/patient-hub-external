import type { StoryObj } from "@storybook/react";
import { Drawer } from "./drawer";
declare const meta: {
    title: string;
    component: typeof Drawer;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithRichContent: Story;
//# sourceMappingURL=drawer.stories.d.ts.map