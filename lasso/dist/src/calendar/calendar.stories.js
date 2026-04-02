import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { Calendar } from "./calendar";
const meta = {
    title: "Components/Calendar",
    component: Calendar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    render: () => {
        return (_jsx("div", { className: "p-4", children: _jsx(Calendar, { className: "rounded-sm border", mode: "single" }) }));
    },
};
export const WithSelectedDate = {
    render: () => {
        const [date, setDate] = useState(new Date());
        return (_jsxs("div", { className: "p-4", children: [_jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, className: "rounded-sm border" }), _jsxs("div", { className: "mt-4 text-sm", children: ["Selected date: ", date ? format(date, "PPP") : "None"] })] }));
    },
};
export const WithDateRange = {
    render: () => {
        const [dateRange, setDateRange] = useState({
            from: new Date(),
            to: addDays(new Date(), 7),
        });
        return (_jsxs("div", { className: "p-4", children: [_jsx(Calendar, { mode: "range", selected: dateRange, onSelect: (range) => setDateRange(range || { from: undefined, to: undefined }), className: "rounded-sm border" }), _jsx("div", { className: "mt-4 text-sm", children: dateRange?.from ? (dateRange.to ? (_jsxs(_Fragment, { children: ["From ", format(dateRange.from, "LLL dd, y"), " to", " ", format(dateRange.to, "LLL dd, y")] })) : (format(dateRange.from, "LLL dd, y"))) : (_jsx("span", { children: "Pick a date range" })) })] }));
    },
};
export const WithMultipleDates = {
    render: () => {
        const [selectedDates, setSelectedDates] = useState([]);
        return (_jsxs("div", { className: "p-4", children: [_jsx(Calendar, { mode: "multiple", selected: selectedDates, onSelect: (dates) => setSelectedDates(dates || []), className: "rounded-sm border" }), _jsxs("div", { className: "mt-4 text-sm", children: ["Selected dates: ", selectedDates.length, _jsx("div", { className: "mt-2 max-h-20 overflow-y-auto", children: selectedDates.map((date, index) => (_jsx("div", { children: format(date, "PPP") }, index))) })] })] }));
    },
};
export const WithDisabledDates = {
    render: () => {
        const [date, setDate] = useState(new Date());
        // Disable weekends
        const disabledDays = [
            { dayOfWeek: [0, 6] }, // Sunday and Saturday
        ];
        return (_jsxs("div", { className: "p-4", children: [_jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, disabled: disabledDays, className: "rounded-sm border" }), _jsxs("div", { className: "mt-4 text-sm", children: ["Selected date: ", date ? format(date, "PPP") : "None"] }), _jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: "Weekends are disabled" })] }));
    },
};
