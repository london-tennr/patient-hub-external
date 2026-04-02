import * as React from "react";
import { DayPicker, type DateRange, type DayButton } from "react-day-picker";
import { Button } from "../button/button";
type PresetKey = "this-month" | "last-30-days" | "last-60-days" | "last-90-days" | "custom";
interface DatePreset {
    key: PresetKey;
    label: string;
    getRange: () => DateRange;
}
declare const datePresets: DatePreset[];
interface CalendarV2BaseProps {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
    /** Enable preset date range side menu */
    withPresets?: boolean;
    /** The currently active preset key (only used when withPresets is true) */
    activePreset?: PresetKey;
    onPresetChange?: (preset: PresetKey) => void;
}
type CalendarV2Props = CalendarV2BaseProps & React.ComponentProps<typeof DayPicker>;
declare function CalendarV2(props: CalendarV2Props): import("react/jsx-runtime").JSX.Element;
declare function CalendarV2DayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>): import("react/jsx-runtime").JSX.Element;
export { CalendarV2, CalendarV2DayButton, datePresets };
export type { PresetKey, DatePreset, CalendarV2Props };
//# sourceMappingURL=calendarV2.d.ts.map