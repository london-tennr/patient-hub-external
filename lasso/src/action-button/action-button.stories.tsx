import { Icon } from "@iconify/react";
import type { Meta, StoryObj } from "@storybook/react";

import { ActionButton } from "./action-button.js";

const meta: Meta<typeof ActionButton> = {
  title: "Components/ActionButton",
  component: ActionButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    onSuccess: { action: "success" },
    onError: { action: "error" },
    postSuccessClick: { action: "postSuccessClick" },
    postErrorClick: { action: "postErrorClick" },
  },
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

// Default story with basic configuration
export const Default: Story = {
  args: {
    onClick: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
};

// Story with custom loading text
export const CustomLoadingText: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    loadingText: "Processing...",
  },
};

// Story with custom success text
export const CustomSuccessText: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    successText: "Completed!",
  },
};

// Story with custom error text
export const CustomErrorText: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      throw new Error("Something went wrong");
    },
    errorText: "Failed to process",
  },
};

// Story with custom icons
export const CustomIcons: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    idleIcon: <Icon icon="ph:plus-circle-light" className="h-5 w-5" />,
    successIcon: <Icon icon="ph:check-circle-light" className="h-5 w-5" />,
    errorIcon: <Icon icon="ph:x-circle-light" className="h-5 w-5" />,
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    className: "bg-blue-600 hover:bg-blue-700",
  },
};

// Story with state-specific styling
export const StateSpecificStyling: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    loadingClassName: "bg-yellow-600 hover:bg-yellow-700",
    successClassName: "bg-green-600 hover:bg-green-700",
    errorClassName: "bg-red-600 hover:bg-red-700",
  },
};

// Story with post-success action
export const WithPostSuccessAction: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    postSuccessClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Post-success action completed");
    },
  },
};

// Story with post-error action
export const WithPostErrorAction: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      throw new Error("Something went wrong");
    },
    postErrorClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Post-error action completed");
    },
  },
};

// Story with all customizations
export const FullyCustomized: Story = {
  args: {
    onClick: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    loadingText: "Processing request...",
    successText: "Request completed!",
    errorText: "Request failed",
    idleIcon: <Icon icon="ph:arrow-right-light" className="h-5 w-5" />,
    successIcon: <Icon icon="ph:check-circle-light" className="h-5 w-5" />,
    errorIcon: <Icon icon="ph:x-circle-light" className="h-5 w-5" />,
    className: "bg-purple-600 hover:bg-purple-700",
    loadingClassName: "bg-yellow-600 hover:bg-yellow-700",
    successClassName: "bg-green-600 hover:bg-green-700",
    errorClassName: "bg-red-600 hover:bg-red-700",
    onSuccess: () => console.log("Success callback triggered"),
    onError: (error) => console.log("Error callback triggered", error),
  },
};
