import type { StoryObj } from "@storybook/react";
import { CalendarV2 } from "./calendarV2";
declare const meta: {
    title: string;
    component: typeof CalendarV2;
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
export declare const WithMultipleMonths: Story;
export declare const WithPresets: Story;
//# sourceMappingURL=calendarV2.stories.d.ts.map