import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "./carousel";
const meta = {
    title: "Components/Carousel",
    component: Carousel,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsx("div", { className: "mx-auto max-w-xs", children: _jsxs(Carousel, { children: [_jsx(CarouselContent, { children: Array.from({ length: 5 }).map((_, index) => (_jsx(CarouselItem, { children: _jsx("div", { className: "p-1", children: _jsx("div", { className: "flex aspect-square items-center justify-center p-6 bg-gray-100 rounded-lg", children: _jsx("span", { className: "text-4xl font-semibold", children: index + 1 }) }) }) }, index))) }), _jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }) })),
};
export const Vertical = {
    render: () => (_jsx("div", { className: "mx-auto max-w-xs", children: _jsxs(Carousel, { orientation: "vertical", className: "w-full max-w-xs", children: [_jsx(CarouselContent, { className: "-mt-1 h-[200px]", children: Array.from({ length: 5 }).map((_, index) => (_jsx(CarouselItem, { className: "pt-1 md:basis-1/2", children: _jsx("div", { className: "p-1", children: _jsx("div", { className: "flex aspect-square items-center justify-center p-6 bg-gray-100 rounded-lg", children: _jsx("span", { className: "text-3xl font-semibold", children: index + 1 }) }) }) }, index))) }), _jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }) })),
};
export const MultipleItems = {
    render: () => (_jsx("div", { className: "mx-auto max-w-sm", children: _jsxs(Carousel, { opts: {
                align: "start",
            }, className: "w-full max-w-sm", children: [_jsx(CarouselContent, { children: Array.from({ length: 10 }).map((_, index) => (_jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3", children: _jsx("div", { className: "p-1", children: _jsx("div", { className: "flex aspect-square items-center justify-center p-6 bg-blue-100 rounded-lg", children: _jsx("span", { className: "text-2xl font-semibold", children: index + 1 }) }) }) }, index))) }), _jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }) })),
};
export const WithCards = {
    render: () => (_jsx("div", { className: "mx-auto max-w-lg", children: _jsxs(Carousel, { className: "w-full max-w-lg", children: [_jsx(CarouselContent, { children: Array.from({ length: 6 }).map((_, index) => (_jsx(CarouselItem, { children: _jsx("div", { className: "p-1", children: _jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 border", children: [_jsxs("h3", { className: "text-lg font-semibold mb-2", children: ["Card ", index + 1] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["This is some example content for carousel item ", index + 1, ". It demonstrates how the carousel works with card-like content."] }), _jsx("div", { className: "mt-4", children: _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors", children: "Action" }) })] }) }) }, index))) }), _jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }) })),
};
