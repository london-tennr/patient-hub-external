import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, } from "./input-otp";
const meta = {
    title: "Components/InputOTP",
    component: InputOTP,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(InputOTP, { maxLength: 6, children: [_jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 0 }), _jsx(InputOTPSlot, { index: 1 }), _jsx(InputOTPSlot, { index: 2 })] }), _jsx(InputOTPSeparator, {}), _jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 3 }), _jsx(InputOTPSlot, { index: 4 }), _jsx(InputOTPSlot, { index: 5 })] })] })),
};
