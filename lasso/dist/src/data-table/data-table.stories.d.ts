import type { StoryObj } from "@storybook/react";
import { DataTable } from "./data-table";
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
}
declare const meta: {
    title: string;
    component: (props: React.ComponentProps<typeof DataTable<User, string>>) => import("react/jsx-runtime").JSX.Element;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithPagination: Story;
export declare const WithSorting: Story;
export declare const WithSearch: Story;
export declare const WithColumnVisibility: Story;
export declare const WithRowSelection: Story;
//# sourceMappingURL=data-table.stories.d.ts.map