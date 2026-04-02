import type { StoryObj } from "@storybook/react";
import { DatePicker } from "./date-picker";
declare const meta: {
    title: string;
    component: typeof DatePicker;
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const MultipleInstances: Story;
export declare const WithFormBuilder: Story;
export declare const DateFormatExamples: Story;
//# sourceMappingURL=date-picker.stories.d.ts.map