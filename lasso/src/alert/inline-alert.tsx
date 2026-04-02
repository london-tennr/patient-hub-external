import { Icon } from "@iconify/react";
import { cva } from "class-variance-authority";
import * as React from "react";

import { Button } from "../button/button";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
import { AlertVariant, variantIcons } from "./alert-styles";

const InlineAlertContext = React.createContext<{
  variant: AlertVariant;
  onClose?: () => void;
} | null>(null);

const inlineAlertContentVariants = cva(
  "flex items-center justify-between py-3 px-4 w-full shrink-0",
  {
    variants: {
      variant: {
        success: "bg-[#D6F1DF] text-[#18794E]",
        warning: "bg-[#FFF7C2] text-[#AB6400]",
        info: "bg-[#E6F4FE] text-[#0D74CE]",
        error: "bg-[#FEEBE7] text-[#D13415]",
        ai: "bg-[#E0C4F4] text-[#402060]",
      },
    },
  },
);

/**
 * InlineAlert Component
 *
 * An inline-style alert with a subtle background color (no shadow).
 * Use this variant for less prominent, inline notifications that blend with content.
 * @see [Lasso Alert README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/alert/README.md)
 *
 * @example
 * ```tsx
 * <InlineAlert variant="info" onClose={() => handleClose()}>
 *   <InlineAlertContent>Your changes have been saved.</InlineAlertContent>
 * </InlineAlert>
 * ```
 *
 * @param variant - The visual style of the alert (success, warning, info, error, ai)
 * @param onClose - Optional callback when close button is clicked. Shows close button when provided.
 * @param className - Additional CSS classes
 * @param children - The content (typically InlineAlertContent)
 */
function InlineAlert({
  className,
  variant,
  children,
  onClose,
  ...props
}: React.ComponentProps<"div"> & {
  variant: AlertVariant;
  onClose?: () => void;
}) {
  return (
    <InlineAlertContext.Provider value={{ variant, onClose }}>
      <div className="mx-0.5">
        <div
          data-slot="alert"
          role="alert"
          className={cn(
            "relative w-full rounded-md overflow-hidden flex flex-col",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </InlineAlertContext.Provider>
  );
}

interface InlineAlertContentProps extends React.ComponentProps<"div"> {
  iconName?: string;
}

/**
 * InlineAlertContent - The content area of an InlineAlert
 *
 * Displays the alert content with an icon on a subtle colored background.
 * Must be used as a child of the InlineAlert component.
 *
 * @param iconName - Optional custom icon (Iconify format). Defaults to variant-specific icon.
 * @param className - Additional CSS classes
 * @param children - The content to display
 */
function InlineAlertContent({
  className,
  iconName,
  children,
  ...props
}: InlineAlertContentProps) {
  const context = React.useContext(InlineAlertContext);
  if (!context) {
    throw new Error(
      "InlineAlertContent must be used within an InlineAlert component",
    );
  }
  const { variant, onClose } = context;

  const defaultIcon = variantIcons[variant];
  const iconToRender = iconName || defaultIcon;

  return (
    <div
      data-slot="alert-header"
      className={cn(inlineAlertContentVariants({ variant }), className)}
      {...props}
    >
      <div className="flex flex-row items-center justify-between w-full gap-2">
        <div className="flex items-start gap-2">
          {iconToRender && (
            <div className="size-5 p-0.5">
              <Icon icon={iconToRender} className="shrink-0" />
            </div>
          )}
          <Text as="div" variant="base-sm">
            {children}
          </Text>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-black/10 shrink-0 w-6 h-6 self-start text-inherit hover:text-inherit"
            onClick={onClose}
          >
            <Icon icon="ph:x" />
          </Button>
        )}
      </div>
    </div>
  );
}

export { InlineAlert, InlineAlertContent };
