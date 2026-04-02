import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FormBuilder,
  SubmitButton,
  type FieldConfig,
  type FormValues,
} from "../form-builder/form-builder";
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
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <DatePicker />
        <div className="text-sm text-muted-foreground">
          Try typing "today", "tomorrow", "in 3 days", or click the calendar
          icon
        </div>
      </div>
    );
  },
};

export const MultipleInstances: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Start Date</label>
          <DatePicker />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">End Date</label>
          <DatePicker />
        </div>
        <div className="text-sm text-muted-foreground">
          Multiple independent DatePicker instances
        </div>
      </div>
    );
  },
};

export const WithFormBuilder: Story = {
  render: () => {
    const [message, setMessage] = useState<string>();

    const form = useForm<FormValues>({
      defaultValues: {
        eventName: "",
        eventDate: undefined,
      },
    });

    const onSubmit = (data: FormValues) => {
      const date = data.eventDate as Date;
      setMessage(
        date
          ? `Event "${data.eventName}" scheduled for ${date.toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}`
          : "Please select a date and enter an event name!",
      );
    };

    const fieldConfig: Record<string, FieldConfig> = {
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

    return (
      <div className="w-[400px] p-6 border rounded-lg space-y-4">
        <h3 className="text-lg font-medium">Event Details</h3>
        <FormBuilder
          form={form}
          onSubmit={onSubmit}
          fieldConfig={fieldConfig}
          className="space-y-4"
        >
          <SubmitButton type="submit">Schedule Event</SubmitButton>
        </FormBuilder>
        {message && (
          <div className="text-sm text-green-600 font-medium">{message}</div>
        )}
      </div>
    );
  },
};

export const DateFormatExamples: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 w-[500px]">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Natural Language Date Input</h3>
          <DatePicker />
          <div className="text-sm text-muted-foreground">
            Try typing any of the formats below or use the calendar picker
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Supported Date Formats</h3>
          <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-lg">
            <div>
              <strong>Relative dates:</strong> "today", "yesterday", "tomorrow",
              "in 2 days", "next week", "last month"
            </div>
            <div>
              <strong>Month and day:</strong> "Jan 15", "March 1", "2/14", "Dec
              25"
            </div>
            <div>
              <strong>Full dates:</strong> "Jan 15 2023", "March 1 2024",
              "2/14/2023"
            </div>
            <div>
              <strong>Month only:</strong> "January", "Jan", "December"
              (defaults to 1st of month)
            </div>
            <div>
              <strong>Time expressions:</strong> "next Friday", "this weekend",
              "end of month"
            </div>
          </div>
        </div>
      </div>
    );
  },
};
