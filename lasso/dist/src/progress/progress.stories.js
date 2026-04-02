import { Progress } from "./progress";
const meta = {
    title: "Components/Progress",
    component: Progress,
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: { type: "range", min: 0, max: 100, step: 1 },
            description: "The progress value (0-100)",
        },
    },
};
export default meta;
export const Default = {
    args: {
        value: 50,
    },
};
export const Empty = {
    args: {
        value: 0,
    },
};
export const Complete = {
    args: {
        value: 100,
    },
};
