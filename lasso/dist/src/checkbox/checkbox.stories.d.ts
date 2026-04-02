import type { StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
declare const meta: {
    title: string;
    component: typeof Checkbox;
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
//# sourceMappingURL=checkbox.stories.d.ts.map