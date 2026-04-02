import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { Metric, MetricGroup } from "./metric";

const meta: Meta<typeof Metric> = {
  title: "Components/Metric",
  component: Metric,
  tags: ["autodocs"],
  argTypes: {
    number: { control: "number" },
    label: { control: "text" },
    class: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "error"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Metric>;

export const Neutral: Story = {
  args: {
    number: 12,
    label: "Missing Info",
    class: "warning",
  },
};

export const Info: Story = {
  args: {
    number: 12,
    label: "Running Eligibility",
    class: "info",
  },
};

export const Success: Story = {
  args: {
    number: 12,
    label: "In Qualification",
    class: "success",
  },
};

export const Error: Story = {
  args: {
    number: 17,
    label: "Not Qualified",
    class: "neutral",
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 48 }}>
      <Metric number={12} label="Missing Info" class="warning" />
      <Metric number={12} label="Running Eligibility" class="info" />
      <Metric number={12} label="In Qualification" class="success" />
      <Metric number={17} label="Not Qualified" class="neutral" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    number: 42,
    label: "Custom Metric",
    class: "info",
  },
};

export const AnimatedNumberChange: Story = {
  render: () => {
    const numbers = [5, 12, 24, 8, 17];
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setIdx((i) => (i + 1) % numbers.length);
      }, 2000);
      return () => clearInterval(interval);
    }, []);
    return (
      <Metric number={numbers[idx]} label="Running Eligibility" class="info" />
    );
  },
};

export const Group: Story = {
  render: () => (
    <div className="max-w-screen">
      <MetricGroup
        metrics={[
          { number: 5, label: "Missing Info", class: "warning" },
          { number: 2, label: "Running Eligibility", class: "info" },
          { number: 7, label: "In Qualification", class: "success" },
          { number: 1, label: "Not Qualified", class: "neutral" },
        ]}
      />
    </div>
  ),
};
