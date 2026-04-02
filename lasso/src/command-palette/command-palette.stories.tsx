import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { FilterCategoryType } from "../filter-group/filter-group";
import { Text } from "../text/text";
import { CommandPalette, KeyboardShortcutType } from "./command-palette";

const meta: Meta<typeof CommandPalette> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

const statusFilter: FilterCategoryType = {
  id: "status",
  label: "Status",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "active", label: "Active" },
    { id: "pending", label: "Pending" },
    { id: "inactive", label: "Inactive" },
  ],
};

const priorityFilter: FilterCategoryType = {
  id: "priority",
  label: "Priority",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "high", label: "High" },
    { id: "medium", label: "Medium" },
    { id: "low", label: "Low" },
  ],
};

const dateRangeFilter: FilterCategoryType & {
  min: number;
  max: number;
  step?: number;
  formatLabel?: (value: number) => string;
} = {
  id: "dateRange",
  label: "Date Range",
  variant: "slider",
  childVariant: "slider",
  values: [],
  min: 0,
  max: 365,
  step: 1,
  formatLabel: (value: number) => `${value} days`,
};

const tagsFilter: FilterCategoryType = {
  id: "tags",
  label: "Tags",
  variant: "checkbox",
  childVariant: "checkbox",
  values: [
    { id: "important", label: "Important" },
    { id: "urgent", label: "Urgent" },
    { id: "review", label: "Review" },
    { id: "followup", label: "Follow-up" },
  ],
};

const departmentFilter: FilterCategoryType = {
  id: "department",
  label: "Department",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "engineering", label: "Engineering" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
    { id: "sales", label: "Sales" },
    { id: "support", label: "Support" },
    { id: "operations", label: "Operations" },
  ],
};

const payerFamilyFilter: FilterCategoryType & {
  dependency?: { dependsOn: string; matchType?: "substring" | "exact" };
} = {
  id: "payerFamily",
  label: "Payer Family",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "United Healthcare", label: "United Healthcare" },
    { id: "Blue Cross Blue Shield", label: "Blue Cross Blue Shield" },
    { id: "Aetna", label: "Aetna" },
    { id: "Cigna", label: "Cigna" },
  ],
  dependency: {
    dependentFilterId: "insurancePayer",
    dependsOn: "insurancePayer",
    matchType: "substring",
  },
};

const insurancePayerFilter: FilterCategoryType & {
  dependency?: { dependsOn: string; matchType?: "substring" | "exact" };
} = {
  id: "insurancePayer",
  label: "Insurance Payer",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "United Healthcare - PPO", label: "United Healthcare - PPO" },
    { id: "United Healthcare - HMO", label: "United Healthcare - HMO" },
    {
      id: "Blue Cross Blue Shield - Medicare",
      label: "Blue Cross Blue Shield - Medicare",
    },
    {
      id: "Blue Cross Blue Shield - Commercial",
      label: "Blue Cross Blue Shield - Commercial",
    },
    { id: "Aetna - Medicare Advantage", label: "Aetna - Medicare Advantage" },
    { id: "Aetna - Commercial", label: "Aetna - Commercial" },
    { id: "Cigna - PPO", label: "Cigna - PPO" },
    { id: "Cigna - HMO", label: "Cigna - HMO" },
  ],
  dependency: {
    dependentFilterId: "payerFamily",
    dependsOn: "payerFamily",
    matchType: "substring",
  },
};

const planCategoryFilter: FilterCategoryType = {
  id: "planCategory",
  label: "Plan Category",
  variant: "command",
  childVariant: "command",
  values: [
    { id: "Medicare", label: "Medicare" },
    { id: "Commercial", label: "Commercial" },
    { id: "PPO", label: "PPO" },
    { id: "HMO", label: "HMO" },
  ],
};

interface CommandPaletteWithStateProps {
  options: typeof complexOptions;
  filterCategories?: FilterCategoryType[];
  listHeading?: string;
  keyboardShortcutsLeft?: KeyboardShortcutType[];
  keyboardShortcutsRight?: KeyboardShortcutType[];
  enableTriggerShortcut?: boolean;
}

const complexOptions = [
  {
    id: "auth",
    label: "Authentication Task",
    value: "auth",
    department: "engineering",
    status: "active",
    priority: "high",
    tags: ["important"],
  },
  {
    id: "design",
    label: "Design Task",
    value: "design",
    department: "design",
    status: "pending",
    priority: "medium",
    tags: ["urgent"],
  },
  {
    id: "marketing",
    label: "Marketing Task",
    value: "marketing",
    department: "marketing",
    status: "active",
    priority: "low",
    tags: ["review"],
  },
  {
    id: "sales",
    label: "Sales Task",
    value: "sales",
    department: "sales",
    status: "inactive",
    priority: "high",
    tags: ["followup"],
  },
  {
    id: "support",
    label: "Support Task",
    value: "support",
    department: "support",
    status: "active",
    priority: "medium",
    tags: ["important"],
  },
  {
    id: "operations",
    label: "Operations Task",
    value: "operations",
    department: "operations",
    status: "pending",
    priority: "low",
    tags: ["urgent"],
  },
];

const insuranceOptions = [
  {
    id: "uhc-ppo-1",
    label: "United Healthcare PPO - Physical Therapy",
    value: "uhc-ppo-1",
    payerFamily: "United Healthcare",
    insurancePayer: "United Healthcare - PPO",
    planCategory: "PPO",
  },
  {
    id: "uhc-ppo-2",
    label: "United Healthcare PPO - MRI",
    value: "uhc-ppo-2",
    payerFamily: "United Healthcare",
    insurancePayer: "United Healthcare - PPO",
    planCategory: "PPO",
  },
  {
    id: "uhc-hmo-1",
    label: "United Healthcare HMO - Physical Therapy",
    value: "uhc-hmo-1",
    payerFamily: "United Healthcare",
    insurancePayer: "United Healthcare - HMO",
    planCategory: "HMO",
  },
  {
    id: "bcbs-medicare-1",
    label: "BCBS Medicare - DME",
    value: "bcbs-medicare-1",
    payerFamily: "Blue Cross Blue Shield",
    insurancePayer: "Blue Cross Blue Shield - Medicare",
    planCategory: "Medicare",
  },
  {
    id: "bcbs-commercial-1",
    label: "BCBS Commercial - Physical Therapy",
    value: "bcbs-commercial-1",
    payerFamily: "Blue Cross Blue Shield",
    insurancePayer: "Blue Cross Blue Shield - Commercial",
    planCategory: "Commercial",
  },
  {
    id: "aetna-medicare-1",
    label: "Aetna Medicare Advantage - Home Health",
    value: "aetna-medicare-1",
    payerFamily: "Aetna",
    insurancePayer: "Aetna - Medicare Advantage",
    planCategory: "Medicare",
  },
  {
    id: "aetna-commercial-1",
    label: "Aetna Commercial - MRI",
    value: "aetna-commercial-1",
    payerFamily: "Aetna",
    insurancePayer: "Aetna - Commercial",
    planCategory: "Commercial",
  },
  {
    id: "cigna-ppo-1",
    label: "Cigna PPO - Physical Therapy",
    value: "cigna-ppo-1",
    payerFamily: "Cigna",
    insurancePayer: "Cigna - PPO",
    planCategory: "PPO",
  },
  {
    id: "cigna-hmo-1",
    label: "Cigna HMO - Specialist Visit",
    value: "cigna-hmo-1",
    payerFamily: "Cigna",
    insurancePayer: "Cigna - HMO",
    planCategory: "HMO",
  },
];

// Generate large dataset for performance testing
const taskPrefixes = [
  "Implement",
  "Fix",
  "Update",
  "Review",
  "Optimize",
  "Refactor",
  "Debug",
  "Test",
  "Deploy",
  "Configure",
  "Migrate",
  "Analyze",
  "Document",
  "Research",
  "Design",
  "Prototype",
  "Monitor",
  "Audit",
  "Integrate",
  "Validate",
];

const taskSubjects = [
  "authentication system",
  "user dashboard",
  "API endpoints",
  "database queries",
  "payment processing",
  "email notifications",
  "file uploads",
  "search functionality",
  "mobile responsiveness",
  "error handling",
  "cache layer",
  "logging system",
  "analytics tracking",
  "security headers",
  "rate limiting",
  "backup system",
  "monitoring alerts",
  "user permissions",
  "data validation",
  "API documentation",
  "CI/CD pipeline",
  "performance metrics",
  "load balancing",
  "session management",
  "password reset flow",
  "OAuth integration",
  "webhook handlers",
  "image optimization",
  "SEO metadata",
  "accessibility features",
  "dark mode theme",
  "responsive layouts",
  "form validation",
  "error boundaries",
  "state management",
  "routing logic",
  "test coverage",
  "code reviews",
  "deployment scripts",
  "environment configs",
];

const departments = [
  "engineering",
  "design",
  "marketing",
  "sales",
  "support",
  "operations",
];
const statuses = ["active", "pending", "inactive"];
const priorities = ["high", "medium", "low"];
const tagOptions = ["important", "urgent", "review", "followup"];

function generateLargeDataset(count: number) {
  const options = [];
  for (let i = 0; i < count; i++) {
    const prefix = taskPrefixes[i % taskPrefixes.length];
    const subject = taskSubjects[i % taskSubjects.length];
    const department = departments[i % departments.length];
    const status = statuses[i % statuses.length];
    const priority = priorities[i % priorities.length];

    const numTags = (i % 3) + 1;
    const tags: string[] = [];
    for (let j = 0; j < numTags; j++) {
      const tagIndex = (i + j) % tagOptions.length;
      if (!tags.includes(tagOptions[tagIndex])) {
        tags.push(tagOptions[tagIndex]);
      }
    }

    const id = `task-${i}`;
    const label = `${prefix} ${subject} #${i + 1}`;
    const value = `${prefix.toLowerCase()}-${subject.replace(/\s+/g, "-")}-${i}`;

    options.push({
      id,
      label,
      value,
      department,
      status,
      priority,
      tags,
    });
  }
  return options;
}

const largeDataset = generateLargeDataset(400);

function CommandPaletteWithState(props: CommandPaletteWithStateProps) {
  const { enableTriggerShortcut = false, ...restProps } = props;
  const [selectedOptions, setSelectedOptions] = React.useState<
    typeof complexOptions
  >([]);

  return (
    <>
      <CommandPalette
        {...restProps}
        selectedOptions={selectedOptions}
        onSelectedOptionsChange={setSelectedOptions}
        onSelectOption={(option) => {
          console.log("[v0] Selected option:", option);
        }}
        icon="ph:plus"
        label="Add new task"
        enableTriggerShortcut={enableTriggerShortcut}
      />
      {selectedOptions.length > 0 && (
        <div className="mt-4">
          <Text
            variant="base-xs"
            weight="light"
            className="border p-2 rounded-md w-fit"
          >
            Selected: {selectedOptions.map((option) => option.label).join(", ")}
          </Text>
        </div>
      )}
    </>
  );
}

export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <CommandPaletteWithState
        options={largeDataset}
        filterCategories={[departmentFilter, statusFilter]}
        listHeading="Tasks"
        keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
        keyboardShortcutsRight={[
          KeyboardShortcutType.NAVIGATE,
          KeyboardShortcutType.SELECT,
        ]}
      />
    </div>
  ),
};

export const WithTriggerShortcut: Story = {
  render: () => (
    <div className="w-[600px]">
      <CommandPaletteWithState
        options={complexOptions}
        filterCategories={[departmentFilter, statusFilter]}
        listHeading="Tasks"
        keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
        keyboardShortcutsRight={[
          KeyboardShortcutType.NAVIGATE,
          KeyboardShortcutType.SELECT,
        ]}
        enableTriggerShortcut={true}
      />
    </div>
  ),
};

export const WithMultipleFilters: Story = {
  render: () => (
    <div className="w-[600px]">
      <CommandPaletteWithState
        options={complexOptions}
        filterCategories={[departmentFilter, statusFilter, priorityFilter]}
        listHeading="Tasks"
      />
    </div>
  ),
};

export const WithCheckboxFilter: Story = {
  render: () => (
    <div className="w-[600px]">
      <CommandPaletteWithState
        options={complexOptions}
        filterCategories={[departmentFilter, priorityFilter, tagsFilter]}
        listHeading="Tasks"
      />
    </div>
  ),
};

export const WithMixedFilters: Story = {
  render: () => (
    <div className="w-[600px]">
      <CommandPaletteWithState
        options={complexOptions}
        filterCategories={[departmentFilter, dateRangeFilter, tagsFilter]}
        listHeading="Tasks"
      />
    </div>
  ),
};

export const WithCascadingFilters: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = React.useState<
      typeof insuranceOptions
    >([]);

    return (
      <div className="w-[600px]">
        <CommandPalette
          options={insuranceOptions}
          filterCategories={[
            payerFamilyFilter,
            insurancePayerFilter,
            planCategoryFilter,
          ]}
          listHeading="Insurance Plans"
          selectedOptions={selectedOptions}
          onSelectedOptionsChange={setSelectedOptions}
          icon="ph:plus"
          label="Add Insurance Plan"
          keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
          keyboardShortcutsRight={[
            KeyboardShortcutType.NAVIGATE,
            KeyboardShortcutType.SELECT,
          ]}
        />
        {selectedOptions.length > 0 && (
          <div className="mt-4">
            <Text
              variant="base-xs"
              weight="light"
              className="border p-2 rounded-md w-fit"
            >
              Selected: {selectedOptions[0].label}
            </Text>
          </div>
        )}
      </div>
    );
  },
};

export const CenteredPopover: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = React.useState<
      typeof complexOptions
    >([]);

    return (
      <div className="p-8">
        <CommandPalette
          options={complexOptions}
          filterCategories={[departmentFilter, statusFilter, priorityFilter]}
          listHeading="Tasks"
          selectedOptions={selectedOptions}
          onSelectedOptionsChange={setSelectedOptions}
          icon="ph:magnifying-glass"
          label="Open centered command palette"
          centered={true}
          keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
          keyboardShortcutsRight={[
            KeyboardShortcutType.NAVIGATE,
            KeyboardShortcutType.SELECT,
          ]}
        />
      </div>
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = React.useState<
      typeof largeDataset
    >([]);

    return (
      <div className="w-[600px]">
        <CommandPalette
          options={largeDataset}
          filterCategories={[
            departmentFilter,
            statusFilter,
            priorityFilter,
            tagsFilter,
          ]}
          listHeading={`All Tasks (${largeDataset.length})`}
          selectedOptions={selectedOptions}
          onSelectedOptionsChange={setSelectedOptions}
          icon="ph:list"
          label="Browse all tasks"
          keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
          keyboardShortcutsRight={[
            KeyboardShortcutType.NAVIGATE,
            KeyboardShortcutType.SELECT,
          ]}
        />
      </div>
    );
  },
};

export const LargeDatasetCentered: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = React.useState<
      typeof largeDataset
    >([]);

    return (
      <div className="p-8">
        <CommandPalette
          options={largeDataset}
          filterCategories={[
            departmentFilter,
            statusFilter,
            priorityFilter,
            tagsFilter,
          ]}
          listHeading={`All Tasks (${largeDataset.length})`}
          selectedOptions={selectedOptions}
          onSelectedOptionsChange={setSelectedOptions}
          icon="ph:magnifying-glass"
          label="Search all tasks"
          centered={true}
          enableTriggerShortcut={true}
          keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
          keyboardShortcutsRight={[
            KeyboardShortcutType.NAVIGATE,
            KeyboardShortcutType.SELECT,
          ]}
        />
      </div>
    );
  },
};
