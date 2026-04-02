import type { Meta, StoryObj } from "@storybook/react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Chart",
  component: ChartContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export const Default: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" />
          <Bar dataKey="mobile" fill="var(--color-mobile)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};

export const Simple: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="min-h-[150px] w-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData.slice(0, 4)}>
          <XAxis dataKey="month" />
          <YAxis />
          <Bar dataKey="desktop" fill="var(--color-desktop)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};
