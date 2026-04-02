import type { Meta, StoryObj } from "@storybook/react";

import { AcceptedFileTypes, FileUpload } from "./file-upload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onFilesChange: {
      action: "file selected",
      description: "Callback function triggered when files are selected",
      table: {
        type: { summary: "(files: File[]) => void" },
        category: "Events",
      },
    },

    onError: {
      action: "error occurred",
      description:
        "Callback function triggered when an error occurs during file upload",
      table: {
        type: { summary: "(error: Error | string) => void" },
        category: "Events",
      },
    },
    hideDragAndDrop: {
      control: "boolean",
      description:
        "Show only a compact button instead of the full drag-and-drop area",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Appearance",
      },
    },
    inputTypes: {
      control: "multi-select",
      options: [
        AcceptedFileTypes.PDF,
        AcceptedFileTypes.JPEG,
        AcceptedFileTypes.PNG,
        AcceptedFileTypes["TIF/TIFF"],
        AcceptedFileTypes.DOCX,
        AcceptedFileTypes.CSV,
        AcceptedFileTypes.TXT,
        AcceptedFileTypes.XLSX,
        AcceptedFileTypes.SVG,
        AcceptedFileTypes.JSON,
        AcceptedFileTypes.ZIP,
      ],
      description:
        "Array of accepted file types. Limits which file extensions users can upload.",
      table: {
        type: { summary: "string[]" },
        defaultValue: {
          summary:
            "PDF, JPEG, PNG, TIF/TIFF, DOCX, CSV, TXT, XLSX, SVG, JSON, ZIP",
        },
        category: "Configuration",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    onFilesChange: () => {},
  },
};

export const WithCustomFileTypes: Story = {
  args: {
    onFilesChange: () => {},
    inputTypes: [AcceptedFileTypes.JSON, AcceptedFileTypes.CSV],
  },
};

export const SingleFileType: Story = {
  args: {
    onFilesChange: () => {},
    inputTypes: [AcceptedFileTypes.PDF],
  },
};

export const CompactMode: Story = {
  args: {
    onFilesChange: () => {},
    hideDragAndDrop: true,
  },
};

export const CompactModeWithCustomTypes: Story = {
  args: {
    onFilesChange: () => {},
    hideDragAndDrop: true,
    inputTypes: [AcceptedFileTypes.JSON],
  },
};

export const AllFileTypes: Story = {
  args: {
    onFilesChange: () => {},
    inputTypes: [
      AcceptedFileTypes.PDF,
      AcceptedFileTypes.JPEG,
      AcceptedFileTypes.PNG,
      AcceptedFileTypes["TIF/TIFF"],
      AcceptedFileTypes.DOCX,
      AcceptedFileTypes.CSV,
      AcceptedFileTypes.TXT,
      AcceptedFileTypes.XLSX,
      AcceptedFileTypes.SVG,
      AcceptedFileTypes.JSON,
      AcceptedFileTypes.ZIP,
    ],
  },
};
