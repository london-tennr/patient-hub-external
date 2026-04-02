import type { Meta, StoryObj } from "@storybook/react";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { CalendarV2, type PresetKey } from "./calendarV2";

const meta = {
  title: "Components/CalendarV2",
  component: CalendarV2,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="p-4">
        <CalendarV2 className="rounded-md border" mode="single" />
      </div>
    );
  },
};

export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="p-4">
        <CalendarV2
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="mt-4 text-sm">
          Selected date: {date ? format(date, "PPP") : "None"}
        </div>
      </div>
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });

    return (
      <div className="p-4">
        <CalendarV2
          mode="range"
          selected={dateRange}
          onSelect={(range) =>
            setDateRange(range || { from: undefined, to: undefined })
          }
          className="rounded-md border"
        />
        <div className="mt-4 text-sm">
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                From {format(dateRange.from, "LLL dd, y")} to{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </div>
      </div>
    );
  },
};

export const WithMultipleDates: Story = {
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    return (
      <div className="p-4">
        <CalendarV2
          mode="multiple"
          selected={selectedDates}
          onSelect={(dates) => setSelectedDates(dates || [])}
          className="rounded-md border"
        />
        <div className="mt-4 text-sm">
          Selected dates: {selectedDates.length}
          <div className="mt-2 max-h-20 overflow-y-auto">
            {selectedDates.map((date, index) => (
              <div key={index}>{format(date, "PPP")}</div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Disable weekends
    const disabledDays = [
      { dayOfWeek: [0, 6] }, // Sunday and Saturday
    ];

    return (
      <div className="p-4">
        <CalendarV2
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          className="rounded-md border"
        />
        <div className="mt-4 text-sm">
          Selected date: {date ? format(date, "PPP") : "None"}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Weekends are disabled
        </div>
      </div>
    );
  },
};

export const WithMultipleMonths: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      from: new Date(),
      to: addDays(new Date(), 14),
    });

    return (
      <div className="p-4">
        <CalendarV2
          mode="range"
          numberOfMonths={2}
          selected={dateRange}
          onSelect={(range) =>
            setDateRange(range || { from: undefined, to: undefined })
          }
          className="rounded-md border"
        />
        <div className="mt-4 text-sm">
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                From {format(dateRange.from, "LLL dd, y")} to{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </div>
      </div>
    );
  },
};

export const WithPresets: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [activePreset, setActivePreset] = useState<PresetKey>("last-30-days");

    return (
      <div className="p-4">
        <CalendarV2
          withPresets
          activePreset={activePreset}
          onPresetChange={setActivePreset}
          selected={dateRange}
          onSelect={(range: DateRange | undefined) => setDateRange(range)}
          className="rounded-md border"
        />
        <div className="mt-4 text-sm">
          <div className="font-medium">Active preset: {activePreset}</div>
          {dateRange?.from ? (
            dateRange.to ? (
              <div>
                From {format(dateRange.from, "LLL dd, y")} to{" "}
                {format(dateRange.to, "LLL dd, y")}
              </div>
            ) : (
              <div>{format(dateRange.from, "LLL dd, y")}</div>
            )
          ) : (
            <div className="text-muted-foreground">No date range selected</div>
          )}
        </div>
      </div>
    );
  },
};
