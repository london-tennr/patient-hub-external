import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Searchbar } from "./searchbar";
const meta = {
    title: "Components/Searchbar",
    component: Searchbar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        value: "",
        onChange: () => { },
        placeholder: "Search...",
        className: "w-64",
    },
    render: (args) => {
        const [value, setValue] = useState("");
        return (_jsx("div", { className: "w-64", children: _jsx(Searchbar, { ...args, value: value, onChange: setValue }) }));
    },
};
