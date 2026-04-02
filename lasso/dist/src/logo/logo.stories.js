import { Logo } from "./logo";
const meta = {
    title: "Foundations/Logo",
    component: Logo,
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        className: "w-24 h-auto text-brand-peat",
    },
};
export const Large = {
    args: {
        className: "w-48 h-auto text-brand-peat",
    },
};
export const Small = {
    args: {
        className: "w-16 h-auto text-brand-peat",
    },
};
export const NeutralIcon = {
    args: {
        className: "w-24 h-auto",
        variant: "neutral-icon",
    },
};
export const PrimaryIcon = {
    args: {
        className: "w-24 h-auto",
        variant: "primary-icon",
    },
};
export const TextIcon = {
    args: {
        className: "w-24 h-auto text-brand-peat",
        variant: "text-icon",
    },
};
