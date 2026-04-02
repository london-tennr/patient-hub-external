import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea, } from "./input-group";
const meta = {
    title: "Components/Input Group",
    component: InputGroup,
    tags: ["autodocs"],
    parameters: { layout: "centered" },
};
export default meta;
export const Basic = {
    render: () => (_jsxs("div", { className: "w-[350px] space-y-6", children: [_jsxs(InputGroup, { children: [_jsx(InputGroupInput, { placeholder: "Search..." }), _jsx(InputGroupAddon, { children: _jsx(MagnifyingGlassIcon, { className: "size-4" }) })] }), _jsxs(InputGroup, { children: [_jsx(InputGroupTextarea, { placeholder: "Message..." }), _jsx(InputGroupAddon, { align: "block-end", children: _jsx(InputGroupButton, { size: "xs", children: "Send" }) })] })] })),
};
