import type { StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";
declare const meta: {
    title: string;
    component: typeof Calendar;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithSelectedDate: Story;
export declare const WithDateRange: Story;
export declare const WithMultipleDates: Story;
export declare const WithDisabledDates: Story;
//# sourceMappingURL=calendar.stories.d.ts.map