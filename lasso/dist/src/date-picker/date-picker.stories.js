import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormBuilder, SubmitButton, } from "../form-builder/form-builder";
import { DatePicker } from "./date-picker";
const meta = {
    title: "Components/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
The DatePicker component allows users to select a date either by typing in a text input or by using a calendar popover.

### Text Input Features

The DatePicker supports natural language date input with intelligent parsing using chrono-node, as well as a calendar popover that can be opened by clicking the calendar icon or pressing the down arrow key.
`,
            },
        },
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => {
        return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(DatePicker, {}), _jsx("div", { className: "text-sm text-muted-foreground", children: "Try typing \"today\", \"tomorrow\", \"in 3 days\", or click the calendar icon" })] }));
    },
};
export const MultipleInstances = {
    render: () => {
        return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Start Date" }), _jsx(DatePicker, {})] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { className: "text-sm font-medium", children: "End Date" }), _jsx(DatePicker, {})] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Multiple independent DatePicker instances" })] }));
    },
};
export const WithFormBuilder = {
    render: () => {
        const [message, setMessage] = useState();
        const form = useForm({
            defaultValues: {
                eventName: "",
                eventDate: undefined,
            },
        });
        const onSubmit = (data) => {
            const date = data.eventDate;
            setMessage(date
                ? `Event "${data.eventName}" scheduled for ${date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}`
                : "Please select a date and enter an event name!");
        };
        const fieldConfig = {
            eventName: {
                label: "Event Name",
                placeholder: "Enter event name",
                fieldType: "Input",
            },
            eventDate: {
                label: "Event Date",
                fieldType: "DatePicker",
            },
        };
        return (_jsxs("div", { className: "w-[400px] p-6 border rounded-lg space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Event Details" }), _jsx(FormBuilder, { form: form, onSubmit: onSubmit, fieldConfig: fieldConfig, className: "space-y-4", children: _jsx(SubmitButton, { type: "submit", children: "Schedule Event" }) }), message && (_jsx("div", { className: "text-sm text-green-600 font-medium", children: message }))] }));
    },
};
export const DateFormatExamples = {
    render: () => {
        return (_jsxs("div", { className: "flex flex-col gap-6 w-[500px]", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("h3", { className: "text-lg font-medium", children: "Natural Language Date Input" }), _jsx(DatePicker, {}), _jsx("div", { className: "text-sm text-muted-foreground", children: "Try typing any of the formats below or use the calendar picker" })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("h3", { className: "text-lg font-medium", children: "Supported Date Formats" }), _jsxs("div", { className: "text-sm space-y-2 bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { children: [_jsx("strong", { children: "Relative dates:" }), " \"today\", \"yesterday\", \"tomorrow\", \"in 2 days\", \"next week\", \"last month\""] }), _jsxs("div", { children: [_jsx("strong", { children: "Month and day:" }), " \"Jan 15\", \"March 1\", \"2/14\", \"Dec 25\""] }), _jsxs("div", { children: [_jsx("strong", { children: "Full dates:" }), " \"Jan 15 2023\", \"March 1 2024\", \"2/14/2023\""] }), _jsxs("div", { children: [_jsx("strong", { children: "Month only:" }), " \"January\", \"Jan\", \"December\" (defaults to 1st of month)"] }), _jsxs("div", { children: [_jsx("strong", { children: "Time expressions:" }), " \"next Friday\", \"this weekend\", \"end of month\""] })] })] })] }));
    },
};
