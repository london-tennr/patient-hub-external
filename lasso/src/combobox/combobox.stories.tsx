import { Code, Globe, Laptop } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Combobox, type ComboboxOption } from "./combobox";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for the search input",
    },
    emptyMessage: {
      control: "text",
      description: "Message shown when no options match the search",
    },
    disabled: {
      control: "boolean",
      description: "Whether the combobox is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks: ComboboxOption[] = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "gatsby", label: "Gatsby" },
  { value: "vite", label: "Vite" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
        searchPlaceholder="Search framework..."
        className="w-[250px]"
      />
    );
  },
};

const languages: ComboboxOption[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
];

export const WithCustomWidth: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <Combobox
        options={languages}
        value={value}
        onValueChange={setValue}
        placeholder="Select language..."
        searchPlaceholder="Search languages..."
        className="w-[300px]"
      />
    );
  },
};

interface TeamMember extends ComboboxOption {
  role: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    value: "john",
    label: "John Doe",
    role: "Frontend Developer",
    avatar: "👨‍💻",
  },
  {
    value: "jane",
    label: "Jane Smith",
    role: "Backend Developer",
    avatar: "👩‍💻",
  },
  { value: "bob", label: "Bob Johnson", role: "Designer", avatar: "🎨" },
  {
    value: "alice",
    label: "Alice Brown",
    role: "Product Manager",
    avatar: "👩‍💼",
  },
  {
    value: "charlie",
    label: "Charlie Wilson",
    role: "DevOps Engineer",
    avatar: "⚙️",
  },
];

export const WithCustomRender: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <Combobox
        options={teamMembers}
        value={value}
        onValueChange={setValue}
        placeholder="Select team member..."
        searchPlaceholder="Search team members..."
        className="w-[300px]"
        renderOption={(member) => (
          <div className="flex items-center gap-2">
            <span>{member.avatar}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{member.label}</span>
              <span className="text-xs text-muted-foreground">
                {member.role}
              </span>
            </div>
          </div>
        )}
      />
    );
  },
};

interface Technology extends ComboboxOption {
  icon: React.ReactNode;
  category: string;
}

const technologies: Technology[] = [
  {
    value: "react",
    label: "React",
    icon: <Code className="h-4 w-4" weight="light" />,
    category: "Frontend",
  },
  {
    value: "node",
    label: "Node.js",
    icon: <Laptop className="h-4 w-4" weight="light" />,
    category: "Backend",
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: <Code className="h-4 w-4" weight="light" />,
    category: "Language",
  },
  {
    value: "graphql",
    label: "GraphQL",
    icon: <Globe className="h-4 w-4" weight="light" />,
    category: "API",
  },
  {
    value: "docker",
    label: "Docker",
    icon: <Laptop className="h-4 w-4" weight="light" />,
    category: "DevOps",
  },
];

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <Combobox
        options={technologies}
        value={value}
        onValueChange={setValue}
        placeholder="Select technology..."
        searchPlaceholder="Search technologies..."
        className="w-[280px]"
        renderOption={(tech) => (
          <div className="flex items-center gap-2">
            {tech.icon}
            <span>{tech.label}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {tech.category}
            </span>
          </div>
        )}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Combobox
        options={frameworks}
        value="next.js"
        placeholder="Select framework..."
        searchPlaceholder="Search framework..."
        className="w-[250px]"
        disabled
      />
    );
  },
};

export const LongList: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    const countries: ComboboxOption[] = [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
      { value: "gb", label: "United Kingdom" },
      { value: "fr", label: "France" },
      { value: "de", label: "Germany" },
      { value: "it", label: "Italy" },
      { value: "es", label: "Spain" },
      { value: "jp", label: "Japan" },
      { value: "kr", label: "South Korea" },
      { value: "cn", label: "China" },
      { value: "in", label: "India" },
      { value: "au", label: "Australia" },
      { value: "br", label: "Brazil" },
      { value: "ar", label: "Argentina" },
      { value: "ru", label: "Russia" },
      { value: "za", label: "South Africa" },
      { value: "eg", label: "Egypt" },
      { value: "ng", label: "Nigeria" },
      { value: "ke", label: "Kenya" },
    ];

    return (
      <Combobox
        options={countries}
        value={value}
        onValueChange={setValue}
        placeholder="Select country..."
        searchPlaceholder="Search countries..."
        emptyMessage="No country found."
        className="w-[250px]"
      />
    );
  },
};

export const LongOptionNames: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    const filesWithLongNames: ComboboxOption[] = [
      {
        value: "1",
        label:
          "redacted_sleep_referral_with_a_really_long_name_for_patient_ID_293138183AFBCBDEF_processed_final_version_for_processing.pdf",
      },
      {
        value: "2",
        label:
          "patient_medical_history_comprehensive_report_final_version_reviewed_and_approved_by_multiple_doctors_2025.pdf",
      },
      {
        value: "3",
        label:
          "insurance_claim_form_authorization_letter_supplemental_documentation_attachments_complete_package.pdf",
      },
      {
        value: "4",
        label: "short_file_name.pdf",
      },
      {
        value: "5",
        label: "file name with a long file name with spaces.pdf",
      },
    ];

    return (
      <div className="w-full max-w-md">
        <Combobox
          options={filesWithLongNames}
          value={value}
          onValueChange={setValue}
          placeholder="Select file..."
          searchPlaceholder="Search files..."
          className="w-[300px]"
        />
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);

    return (
      <Combobox
        variant="multiple"
        options={frameworks}
        value={values}
        onValueChange={setValues}
        placeholder="Select frameworks..."
        searchPlaceholder="Search frameworks..."
        className="w-[300px]"
      />
    );
  },
};

export const MultiSelectWithMaxDisplay: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);

    return (
      <Combobox
        variant="multiple"
        options={languages}
        value={values}
        onValueChange={setValues}
        placeholder="Select languages..."
        searchPlaceholder="Search languages..."
        className="w-[300px]"
        maxDisplay={2}
      />
    );
  },
};

export const MultiSelectGhostMode: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);

    return (
      <Combobox
        variant="multiple"
        options={teamMembers}
        value={values}
        onValueChange={setValues}
        placeholder="Select team members..."
        searchPlaceholder="Search team members..."
        className="w-[300px]"
        ghost={true}
        renderOption={(member) => (
          <div className="flex items-center gap-2">
            <span>{member.avatar}</span>
            <span className="text-sm font-medium">{member.label}</span>
          </div>
        )}
      />
    );
  },
};
