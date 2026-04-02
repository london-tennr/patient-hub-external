import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button/button";
import { Alert, AlertContent, AlertHeader } from "./alert";
import { AlertVariant } from "./alert-styles";
import { CompactAlert, CompactAlertContent } from "./compact-alert";
import { InlineAlert, InlineAlertContent } from "./inline-alert";

const meta: Meta = {
  title: "Components/Alert",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const ALERT_VARIANTS: AlertVariant[] = [
  "success",
  "warning",
  "info",
  "error",
  "ai",
];

const VARIANT_LABELS: Record<AlertVariant, string> = {
  success: "Success",
  warning: "Warning",
  info: "Info",
  error: "Error",
  ai: "AI",
};

function AlertShowcaseComponent() {
  return (
    <div className="flex flex-col gap-6 max-w-full">
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium">All variants</div>
        <div className="flex flex-col gap-3">
          {ALERT_VARIANTS.map((variant) => (
            <Alert key={variant} variant={variant}>
              <AlertHeader>{VARIANT_LABELS[variant]}</AlertHeader>
              <AlertContent>
                This is a {VARIANT_LABELS[variant].toLowerCase()} alert.
              </AlertContent>
            </Alert>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium">All variants (with close)</div>
        <div className="flex flex-col gap-3">
          {ALERT_VARIANTS.map((variant) => (
            <Alert
              key={`${variant}-close`}
              variant={variant}
              onClose={() => {}}
            >
              <AlertHeader>{VARIANT_LABELS[variant]}</AlertHeader>
              <AlertContent>
                This is a {VARIANT_LABELS[variant].toLowerCase()} alert.
              </AlertContent>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompactAlertShowcase() {
  return (
    <div className="flex flex-col gap-6 max-w-full">
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium">All variants</div>
        <div className="flex flex-col gap-3">
          {ALERT_VARIANTS.map((variant) => (
            <CompactAlert key={variant} variant={variant}>
              <CompactAlertContent>
                {VARIANT_LABELS[variant]}: This is a{" "}
                {VARIANT_LABELS[variant].toLowerCase()} alert.
              </CompactAlertContent>
            </CompactAlert>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium">All variants (with close)</div>
        <div className="flex flex-col gap-3">
          {ALERT_VARIANTS.map((variant) => (
            <CompactAlert
              key={`${variant}-close`}
              variant={variant}
              onClose={() => {}}
            >
              <CompactAlertContent>
                {VARIANT_LABELS[variant]}: This is a{" "}
                {VARIANT_LABELS[variant].toLowerCase()} alert.
              </CompactAlertContent>
            </CompactAlert>
          ))}
        </div>
      </div>
    </div>
  );
}

function InlineAlertShowcase() {
  return (
    <div className="flex flex-col gap-6 max-w-full">
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium">All variants</div>
        <div className="flex flex-col gap-3">
          {ALERT_VARIANTS.map((variant) => (
            <InlineAlert key={variant} variant={variant}>
              <InlineAlertContent>
                {VARIANT_LABELS[variant]}: This is a{" "}
                {VARIANT_LABELS[variant].toLowerCase()} alert.
              </InlineAlertContent>
            </InlineAlert>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium">All variants (with close)</div>
        <div className="flex flex-col gap-3">
          {ALERT_VARIANTS.map((variant) => (
            <InlineAlert
              key={`${variant}-close`}
              variant={variant}
              onClose={() => {}}
            >
              <InlineAlertContent>
                {VARIANT_LABELS[variant]}: This is a{" "}
                {VARIANT_LABELS[variant].toLowerCase()} alert.
              </InlineAlertContent>
            </InlineAlert>
          ))}
        </div>
      </div>
    </div>
  );
}

export const AlertShowcase: Story = {
  render: () => <AlertShowcaseComponent />,
};

export const CompactShowcase: Story = {
  render: () => <CompactAlertShowcase />,
};

export const InlineShowcase: Story = {
  render: () => <InlineAlertShowcase />,
};

export const AlertMultlineContent: Story = {
  render: () => (
    <div className="w-full">
      <Alert variant="warning" onClose={() => {}}>
        <AlertHeader>
          The patient has been flagged for manual review
        </AlertHeader>
        <AlertContent className="flex flex-col gap-2">
          <div>
            <span>Acme Health PPO (High)</span>
            <ul className="list-disc">
              <li className="list-inside indent-2">
                Coverage could not be confirmed automatically.
              </li>
              <li className="list-inside indent-2">
                Member ID format looks unusual—double-check before submitting.
              </li>
            </ul>
          </div>

          <div>
            <span>Blue River HMO (Medium)</span>
            <ul className="list-disc">
              <li className="list-inside indent-2">
                Plan name mismatch between eligibility response and intake.
              </li>
              <li className="list-inside indent-2">
                Patient DOB returned a partial match—verify in portal.
              </li>
            </ul>
          </div>
        </AlertContent>
      </Alert>
    </div>
  ),
};

export const AlertOverflowHeader: Story = {
  render: () => (
    <Alert variant="warning" onClose={() => {}} className="w-full max-w-md">
      <AlertHeader>
        This is a very long header text that should wrap to multiple lines when
        the container is narrow enough to cause overflow
      </AlertHeader>
      <AlertContent>
        The header above demonstrates how the alert handles long titles that
        need to wrap.
      </AlertContent>
    </Alert>
  ),
};

export const AlertRichContent: Story = {
  render: () => (
    <Alert variant="info" onClose={() => {}} className="w-full max-w-md">
      <AlertHeader>This patient has multiple insurances</AlertHeader>
      <AlertContent className="flex flex-col gap-2 items-start">
        <p>
          This patient has multiple insurances—be sure to check they qualify for
          benefits on this. Keep in mind that this is a long message to
          demonstrate wrapping.
        </p>
        <Button variant="outline" size="sm">
          See more
        </Button>
      </AlertContent>
    </Alert>
  ),
};

export const CompactMultilineContent: Story = {
  render: () => (
    <CompactAlert variant="info" className="w-full max-w-xl">
      <CompactAlertContent>
        This is a compact info alert with a longer message to demonstrate
        wrapping and spacing. It should span multiple lines in narrower
        containers without breaking the layout. Here's a final sentence to make
        it about four lines.
      </CompactAlertContent>
    </CompactAlert>
  ),
};

export const InlineMultilineContent: Story = {
  render: () => (
    <InlineAlert variant="info" onClose={() => {}} className="w-full max-w-md">
      <InlineAlertContent>
        This is an inline info alert with a longer message to demonstrate text
        wrapping. It should wrap cleanly across multiple lines while keeping the
        icon and close button aligned nicely.
      </InlineAlertContent>
    </InlineAlert>
  ),
};
