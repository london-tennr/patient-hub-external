import type { StoryObj } from "@storybook/react";
import { Command } from "./command";
declare const meta: {
    title: string;
    component: typeof Command;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Dialog: Story;
export declare const WithShortcuts: Story;
//# sourceMappingURL=command.stories.d.ts.map