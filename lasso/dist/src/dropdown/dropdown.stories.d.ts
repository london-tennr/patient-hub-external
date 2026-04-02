import type { StoryObj } from "@storybook/react";
import { DropdownMenu } from "./dropdown";
declare const meta: {
    title: string;
    component: typeof DropdownMenu;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithIcons: Story;
export declare const WithCheckboxes: Story;
export declare const WithRadioGroup: Story;
export declare const WithSubMenu: Story;
//# sourceMappingURL=dropdown.stories.d.ts.map