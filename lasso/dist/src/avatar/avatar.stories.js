import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar.js";
const meta = {
    title: "Components/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};
export default meta;
export const Default = {
    render: () => (_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "https://i.pinimg.com/736x/e5/bf/04/e5bf0443d716aea51174dedc37ebda4b.jpg", alt: "Come to where the flavor is" }), _jsx(AvatarFallback, { children: "CN" })] })),
};
export const WithFallback = {
    render: () => (_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/broken-image.jpg", alt: "@user" }), _jsx(AvatarFallback, { children: "JD" })] })),
};
export const CustomSize = {
    render: () => (_jsxs(Avatar, { className: "h-36 w-36", children: [_jsx(AvatarImage, { src: "https://i.pinimg.com/736x/e5/bf/04/e5bf0443d716aea51174dedc37ebda4b.jpg", alt: "Come to where the flavor is" }), _jsx(AvatarFallback, { children: "CN" })] })),
};
export const FallbackOnly = {
    render: () => (_jsx(Avatar, { children: _jsx(AvatarFallback, { children: "JD" }) })),
};
