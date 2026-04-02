import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Code, Globe, Laptop } from "@phosphor-icons/react";
import { useState } from "react";
import { Combobox } from "./combobox";
const meta = {
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
const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "gatsby", label: "Gatsby" },
    { value: "vite", label: "Vite" },
];
export const Default = {
    render: () => {
        const [value, setValue] = useState("");
        return (_jsx(Combobox, { options: frameworks, value: value, onValueChange: setValue, placeholder: "Select framework...", searchPlaceholder: "Search framework...", className: "w-[250px]" }));
    },
};
const languages = [
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
export const WithCustomWidth = {
    render: () => {
        const [value, setValue] = useState("");
        return (_jsx(Combobox, { options: languages, value: value, onValueChange: setValue, placeholder: "Select language...", searchPlaceholder: "Search languages...", className: "w-[300px]" }));
    },
};
const teamMembers = [
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
export const WithCustomRender = {
    render: () => {
        const [value, setValue] = useState("");
        return (_jsx(Combobox, { options: teamMembers, value: value, onValueChange: setValue, placeholder: "Select team member...", searchPlaceholder: "Search team members...", className: "w-[300px]", renderOption: (member) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: member.avatar }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: member.label }), _jsx("span", { className: "text-xs text-muted-foreground", children: member.role })] })] })) }));
    },
};
const technologies = [
    {
        value: "react",
        label: "React",
        icon: _jsx(Code, { className: "h-4 w-4", weight: "light" }),
        category: "Frontend",
    },
    {
        value: "node",
        label: "Node.js",
        icon: _jsx(Laptop, { className: "h-4 w-4", weight: "light" }),
        category: "Backend",
    },
    {
        value: "typescript",
        label: "TypeScript",
        icon: _jsx(Code, { className: "h-4 w-4", weight: "light" }),
        category: "Language",
    },
    {
        value: "graphql",
        label: "GraphQL",
        icon: _jsx(Globe, { className: "h-4 w-4", weight: "light" }),
        category: "API",
    },
    {
        value: "docker",
        label: "Docker",
        icon: _jsx(Laptop, { className: "h-4 w-4", weight: "light" }),
        category: "DevOps",
    },
];
export const WithIcons = {
    render: () => {
        const [value, setValue] = useState("");
        return (_jsx(Combobox, { options: technologies, value: value, onValueChange: setValue, placeholder: "Select technology...", searchPlaceholder: "Search technologies...", className: "w-[280px]", renderOption: (tech) => (_jsxs("div", { className: "flex items-center gap-2", children: [tech.icon, _jsx("span", { children: tech.label }), _jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: tech.category })] })) }));
    },
};
export const Disabled = {
    render: () => {
        return (_jsx(Combobox, { options: frameworks, value: "next.js", placeholder: "Select framework...", searchPlaceholder: "Search framework...", className: "w-[250px]", disabled: true }));
    },
};
export const LongList = {
    render: () => {
        const [value, setValue] = useState("");
        const countries = [
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
        return (_jsx(Combobox, { options: countries, value: value, onValueChange: setValue, placeholder: "Select country...", searchPlaceholder: "Search countries...", emptyMessage: "No country found.", className: "w-[250px]" }));
    },
};
export const LongOptionNames = {
    render: () => {
        const [value, setValue] = useState("");
        const filesWithLongNames = [
            {
                value: "1",
                label: "redacted_sleep_referral_with_a_really_long_name_for_patient_ID_293138183AFBCBDEF_processed_final_version_for_processing.pdf",
            },
            {
                value: "2",
                label: "patient_medical_history_comprehensive_report_final_version_reviewed_and_approved_by_multiple_doctors_2025.pdf",
            },
            {
                value: "3",
                label: "insurance_claim_form_authorization_letter_supplemental_documentation_attachments_complete_package.pdf",
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
        return (_jsx("div", { className: "w-full max-w-md", children: _jsx(Combobox, { options: filesWithLongNames, value: value, onValueChange: setValue, placeholder: "Select file...", searchPlaceholder: "Search files...", className: "w-[300px]" }) }));
    },
};
export const MultiSelect = {
    render: () => {
        const [values, setValues] = useState([]);
        return (_jsx(Combobox, { variant: "multiple", options: frameworks, value: values, onValueChange: setValues, placeholder: "Select frameworks...", searchPlaceholder: "Search frameworks...", className: "w-[300px]" }));
    },
};
export const MultiSelectWithMaxDisplay = {
    render: () => {
        const [values, setValues] = useState([]);
        return (_jsx(Combobox, { variant: "multiple", options: languages, value: values, onValueChange: setValues, placeholder: "Select languages...", searchPlaceholder: "Search languages...", className: "w-[300px]", maxDisplay: 2 }));
    },
};
export const MultiSelectGhostMode = {
    render: () => {
        const [values, setValues] = useState([]);
        return (_jsx(Combobox, { variant: "multiple", options: teamMembers, value: values, onValueChange: setValues, placeholder: "Select team members...", searchPlaceholder: "Search team members...", className: "w-[300px]", ghost: true, renderOption: (member) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: member.avatar }), _jsx("span", { className: "text-sm font-medium", children: member.label })] })) }));
    },
};
