import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  FilterGroup,
  type FilterCategoryType,
  type FilterState,
} from "./filter-group";

const meta: Meta<typeof FilterGroup> = {
  title: "Components/FilterGroup",
  component: FilterGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilterGroup>;

const projectFilters: FilterCategoryType[] = [
  {
    id: "assignee",
    label: "Assignee",
    variant: "command",
    childVariant: "command",
    values: [
      { id: "john", label: "John Doe" },
      { id: "jane", label: "Jane Smith" },
      { id: "bob", label: "Bob Johnson" },
      { id: "alice", label: "Alice Williams" },
    ],
  },
  {
    id: "priority",
    label: "Priority",
    variant: "command",
    childVariant: "command",
    values: [
      { id: "high", label: "High" },
      { id: "medium", label: "Medium" },
      { id: "low", label: "Low" },
    ],
  },
  {
    id: "tags",
    label: "Tags",
    variant: "command",
    childVariant: "checkbox",
    values: [
      { id: "bug", label: "Bug" },
      { id: "feature", label: "Feature" },
      { id: "enhancement", label: "Enhancement" },
      { id: "documentation", label: "Documentation" },
    ],
  },
  {
    id: "age",
    label: "Age",
    variant: "slider",
    childVariant: "slider",
    values: [],
    min: 18,
    max: 100,
    step: 1,
  },
];

const simpleFilters: FilterCategoryType[] = [
  {
    id: "status",
    label: "Status",
    variant: "command",
    childVariant: "command",
    values: [
      { id: "active", label: "Active" },
      { id: "inactive", label: "Inactive" },
    ],
  },
  {
    id: "type",
    label: "Type",
    variant: "command",
    childVariant: "command",
    values: [
      { id: "personal", label: "Personal" },
      { id: "business", label: "Business" },
    ],
  },
];

function FilterGroupWithState({ filters }: { filters: FilterCategoryType[] }) {
  const [state, setState] = useState<FilterState>([]);

  return (
    <div className="space-y-6">
      <FilterGroup filters={filters} state={state} onChange={setState} />

      <div className="mt-8">
        <h4 className="text-sm font-medium mb-2 text-muted-foreground">
          Current Filter State
        </h4>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export const ProjectFilters: Story = {
  render: () => <FilterGroupWithState filters={projectFilters} />,
  parameters: {
    docs: {
      description: {
        story:
          "A project management filter with command (single-select) and checkbox (multi-select) variants.",
      },
    },
  },
};

export const SimpleFilters: Story = {
  render: () => <FilterGroupWithState filters={simpleFilters} />,
  parameters: {
    docs: {
      description: {
        story:
          "A simple filter group with two command (single-select) filters.",
      },
    },
  },
};

export const PrePopulated: Story = {
  render: () => {
    const [state, setState] = useState<FilterState>([
      { id: "1", filterId: "assignee", value: "jane" },
      { id: "2", filterId: "priority", value: "high" },
      { id: "3", filterId: "tags", value: ["bug", "feature"] },
    ]);

    return (
      <div className="space-y-6">
        <FilterGroup
          filters={projectFilters}
          state={state}
          onChange={setState}
        />

        <div className="mt-8">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">
            Current Filter State
          </h4>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter group with pre-populated values to demonstrate the initial state.",
      },
    },
  },
};

export const MultipleInstancesSameFilter: Story = {
  render: () => {
    const [state, setState] = useState<FilterState>([
      { id: "1", filterId: "tags", value: ["bug"] },
      { id: "2", filterId: "tags", value: ["feature"] },
      { id: "3", filterId: "priority", value: "high" },
    ]);

    return (
      <div className="space-y-6">
        <FilterGroup
          filters={projectFilters}
          state={state}
          onChange={setState}
        />

        <div className="mt-8">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">
            Current Filter State
          </h4>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates using the same filter category multiple times (e.g., two Tags filters).",
      },
    },
  },
};

export const WithSlider: Story = {
  render: () => {
    const [state, setState] = useState<FilterState>([
      { id: "1", filterId: "age", value: [25, 65] },
    ]);

    return (
      <div className="space-y-6">
        <FilterGroup
          filters={projectFilters}
          state={state}
          onChange={setState}
        />

        <div className="mt-8">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">
            Current Filter State
          </h4>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the slider variant for range-based filtering (e.g., age range 25-65).",
      },
    },
  },
};

export const Empty: Story = {
  render: () => <FilterGroupWithState filters={[]} />,
  parameters: {
    docs: {
      description: {
        story: "Empty filter group with no filters available.",
      },
    },
  },
};
