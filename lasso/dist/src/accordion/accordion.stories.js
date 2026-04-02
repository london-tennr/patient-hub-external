import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "./accordion";
const meta = {
    title: "Components/Accordion",
    component: Accordion,
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => (_jsxs(Accordion, { type: "single", collapsible: true, className: "w-full", children: [_jsxs(AccordionItem, { value: "item-1", children: [_jsx(AccordionTrigger, { children: "Is it accessible?" }), _jsx(AccordionContent, { children: "Yes. It adheres to the WAI-ARIA design pattern." })] }), _jsxs(AccordionItem, { value: "item-2", children: [_jsx(AccordionTrigger, { children: "Is it styled?" }), _jsx(AccordionContent, { children: "Yes. It comes with default styles that matches the other components' aesthetic." })] }), _jsxs(AccordionItem, { value: "item-3", children: [_jsx(AccordionTrigger, { children: "Is it animated?" }), _jsx(AccordionContent, { children: "Yes. It's animated by default, but you can disable it if you prefer." })] })] })),
};
export const Multiple = {
    render: () => (_jsxs(Accordion, { type: "multiple", className: "w-full", children: [_jsxs(AccordionItem, { value: "item-1", children: [_jsx(AccordionTrigger, { children: "Can I open multiple items?" }), _jsx(AccordionContent, { children: "Yes. You can open multiple items at once by using the type=\"multiple\" prop." })] }), _jsxs(AccordionItem, { value: "item-2", children: [_jsx(AccordionTrigger, { children: "Is it customizable?" }), _jsx(AccordionContent, { children: "Yes. You can customize the appearance using className props and CSS." })] }), _jsxs(AccordionItem, { value: "item-3", children: [_jsx(AccordionTrigger, { children: "Is it responsive?" }), _jsx(AccordionContent, { children: "Yes. It works well on all screen sizes and devices." })] })] })),
};
export const CustomStyling = {
    render: () => (_jsxs(Accordion, { type: "single", collapsible: true, className: "w-full", children: [_jsxs(AccordionItem, { value: "item-1", className: "border-2 border-info-5 rounded-lg mb-4 p-2", children: [_jsx(AccordionTrigger, { className: "text-info-5 hover:text-info-7", children: "Custom Styled Item" }), _jsx(AccordionContent, { className: "text-gray-6", children: "This accordion item has custom styling applied to it." })] }), _jsxs(AccordionItem, { value: "item-2", className: "border-2 border-success-5 rounded-lg p-2", children: [_jsx(AccordionTrigger, { className: "text-success-5 hover:text-success-7", children: "Another Custom Item" }), _jsx(AccordionContent, { className: "text-neutral-6", children: "Each item can have its own unique styling." })] })] })),
};
