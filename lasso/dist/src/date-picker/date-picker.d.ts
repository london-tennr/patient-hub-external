/**
 * Props for the DatePicker component.
 *
 * @example
 * ```tsx
 * // Controlled usage
 * const [date, setDate] = useState<Date>();
 * <DatePicker
 *   date={date}
 *   onDateChange={setDate}
 *   placeholder="Select a date"
 * />
 *
 * // Uncontrolled usage
 * <DatePicker
 *   onDateChange={(date) => console.log("Selected:", date)}
 * />
 * ```
 */
export interface DatePickerProps {
    /** The current date value. When provided, the component operates in controlled mode. */
    date?: Date;
    /** Callback fired when the date changes, either via text input or calendar selection. */
    onDateChange?: (date: Date | undefined) => void;
    /** Placeholder text for the input field. Defaults to "Type or select a date". */
    placeholder?: string;
    /** Additional CSS classes to apply to the container div. */
    className?: string;
    /** Whether the picker is disabled. Disables both the input and calendar button. */
    disabled?: boolean;
    /** The first selectable month in the calendar dropdown. */
    startMonth?: Date;
    /** The last selectable month in the calendar dropdown. */
    endMonth?: Date;
}
/**
 * DatePicker Component
 *
 * A date selection component that allows users to input dates through either natural language
 * text input or a visual calendar popover. Supports intelligent date parsing via chrono-node,
 * enabling users to type expressions like "today", "tomorrow", "next Friday", or "Jan 15".
 *
 * The component supports both controlled and uncontrolled usage patterns, and preserves time
 * components when parsing new dates from an existing value.
 *
 * @see [chrono-node](https://github.com/wanasit/chrono) for natural language date parsing
 *
 * @see [Lasso DatePicker README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/date-picker/README.md)
 */
export declare function DatePicker({ date: controlledDate, onDateChange, placeholder, className, disabled, startMonth, endMonth, }?: DatePickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=date-picker.d.ts.map