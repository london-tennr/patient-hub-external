import { jsx as _jsx } from "react/jsx-runtime";
import { AspectRatio } from "./aspect-ratio";
const meta = {
    title: "Components/Aspect Ratio",
    component: AspectRatio,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        ratio: {
            control: "number",
            description: "The desired ratio",
        },
    },
};
export default meta;
export const Default = {
    render: () => (_jsx("div", { className: "w-[450px]", children: _jsx(AspectRatio, { ratio: 16 / 9, className: "bg-muted", children: _jsx("img", { src: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80", alt: "Photo by Drew Beamer", className: "rounded-sm object-cover h-full w-full" }) }) })),
};
export const Square = {
    render: () => (_jsx("div", { className: "w-[300px]", children: _jsx(AspectRatio, { ratio: 1, className: "bg-muted", children: _jsx("img", { src: "https://images.unsplash.com/photo-1492199105148-2b72b58df3c7?w=800&dpr=2&q=80", alt: "Photo by Alvan Nee", className: "rounded-sm object-cover h-full w-full" }) }) })),
};
export const Portrait = {
    render: () => (_jsx("div", { className: "w-[300px]", children: _jsx(AspectRatio, { ratio: 3 / 4, className: "bg-muted", children: _jsx("div", { className: "flex h-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-sm", children: _jsx("p", { className: "text-lg font-semibold", children: "3:4 Portrait" }) }) }) })),
};
