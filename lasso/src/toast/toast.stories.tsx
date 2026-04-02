import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button/button";
import { toast, Toaster } from "./toast.js";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "Position of the toast notifications",
      defaultValue: "bottom-right",
    },
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
      description: "Theme for the toast notifications",
    },
    closeButton: {
      control: "boolean",
      description: "Whether to show close button on toasts",
    },
    duration: {
      control: "number",
      description: "Duration in milliseconds before toast auto-dismisses",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() => toast("This is a default toast notification")}
        variant="outline"
      >
        Show Default Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
    theme: "system",
    richColors: false,
    closeButton: true,
    duration: 4000,
  },
};

export const Success: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() =>
          toast.success("Success! Your action was completed successfully.")
        }
        variant="outline"
      >
        Show Success Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const Error: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() =>
          toast.error("Error! Something went wrong. Please try again.")
        }
        variant="outline"
      >
        Show Error Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const Warning: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() =>
          toast.warning("Warning! Please review your input before proceeding.")
        }
        variant="outline"
      >
        Show Warning Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const Info: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() =>
          toast.info("Info: Here's some helpful information for you.")
        }
        variant="outline"
      >
        Show Info Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const IndefiniteDuration: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() =>
          toast("This toast will stay visible indefinitely for debugging", {
            duration: Infinity,
          })
        }
        variant="outline"
      >
        Show Indefinite Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
    richColors: true,
  },
};

export const CustomDuration: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() =>
          toast("This toast will stay visible for 10 seconds", {
            duration: 10000,
          })
        }
        variant="outline"
      >
        Show 10s Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "top-center",
    duration: 10000,
  },
};

export const BottomPosition: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() => toast("Toast appearing at the bottom center")}
        variant="outline"
      >
        Show Bottom Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-center",
  },
};

export const WithAction: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() =>
          toast("Action required", {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo clicked"),
            },
          })
        }
        variant="outline"
      >
        Show Toast with Action
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const WithDescription: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() =>
          toast("File uploaded", {
            description:
              "Your file has been successfully uploaded to the server.",
          })
        }
        variant="outline"
      >
        Show Toast with Description
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const MultipleToasts: Story = {
  render: (args) => (
    <div style={{ minHeight: "400px", width: "100%" }}>
      <Button
        onClick={() => {
          toast.success("First toast");
          setTimeout(() => toast.error("Second toast"), 500);
          setTimeout(() => toast.warning("Third toast"), 1000);
          setTimeout(() => toast.info("Fourth toast"), 1500);
        }}
        variant="outline"
      >
        Show Multiple Toasts
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};
