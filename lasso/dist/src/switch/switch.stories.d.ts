import type { StoryObj } from "@storybook/react";
import { Switch } from "./switch";
/**
 *  TODO: Needs a style pass */
declare const meta: {
    title: string;
    component: typeof Switch;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Checked: Story;
export declare const Disabled: Story;
export declare const WithState: Story;
export declare const WithForm: Story;
//# sourceMappingURL=switch.stories.d.ts.map