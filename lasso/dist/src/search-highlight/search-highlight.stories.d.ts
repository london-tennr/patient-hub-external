import type { StoryObj } from "@storybook/react";
import { SearchHighlight } from "./search-highlight";
declare const meta: {
    title: string;
    component: typeof SearchHighlight;
    parameters: {
        layout: string;
    };
    tags: string[];
    args: {
        scrollableContainer: {
            current: null;
        };
        searchableContentContainer: {
            current: null;
        };
        placeholder: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
//# sourceMappingURL=search-highlight.stories.d.ts.map