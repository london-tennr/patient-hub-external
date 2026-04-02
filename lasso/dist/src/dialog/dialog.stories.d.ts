import type { StoryObj } from "@storybook/react";
import { Dialog } from "./dialog";
declare const meta: {
    title: string;
    component: typeof Dialog;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithForm: Story;
export declare const Alert: Story;
export declare const Alert2: Story;
//# sourceMappingURL=dialog.stories.d.ts.map