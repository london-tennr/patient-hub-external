import { Icon } from "@iconify/react";
import * as React from "react";

import { Button } from "../button/button";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
import {
  alertHeaderVariants,
  AlertVariant,
  variantIcons,
} from "./alert-styles";

const AlertContext = React.createContext<{
  variant: AlertVariant;
  onClose?: () => void;
} | null>(null);

/**
 * Alert Component
 *
 * A full-style alert with a colored header and content area.
 * Use this variant when you need prominent, detailed alerts with a title and description.
 * @see [Lasso Alert README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/alert/README.md)
 *
 * @example
 * ```tsx
 * <Alert variant="warning" onClose={() => handleClose()}>
 *   <AlertHeader>Payment Required</AlertHeader>
 *   <AlertContent>Your subscription expires in 3 days.</AlertContent>
 * </Alert>
 * ```
 *
 * @param variant - The visual style of the alert (success, warning, info, error, ai)
 * @param onClose - Optional callback when close button is clicked. Shows close button when provided.
 * @param className - Additional CSS classes
 * @param children - The content (typically AlertHeader and AlertContent)
 */
function Alert({
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
    <AlertContext.Provider value={{ variant, onClose }}>
      <div className="mx-0.5">
        <div
          data-slot="alert"
          role="alert"
          className={cn(
            "relative w-full rounded-md overflow-hidden flex flex-col shadow-card",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </AlertContext.Provider>
  );
}

interface AlertHeaderProps extends React.ComponentProps<"div"> {
  iconName?: string;
}

/**
 * AlertHeader - The colored header section of an Alert
 *
 * Displays a colored banner with an icon, title text, and optional close button.
 * Must be used as a child of the Alert component.
 *
 * @param iconName - Optional custom icon (Iconify format). Defaults to variant-specific icon.
 * @param className - Additional CSS classes
 * @param children - The header text content
 */
function AlertHeader({
  className,
  iconName,
  children,
  ...props
}: AlertHeaderProps) {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error("AlertHeader must be used within an Alert component");
  }
  const { variant, onClose } = context;

  const defaultIcon = variantIcons[variant];
  const iconToRender = iconName || defaultIcon;

  return (
    <div
      data-slot="alert-header"
      className={cn(alertHeaderVariants({ variant }), className)}
      {...props}
    >
      <div className="flex flex-row items-center justify-between w-full gap-2">
        <div className="flex items-start gap-1">
          {iconToRender && (
            <div className="size-5 p-0.5">
              <Icon icon={iconToRender} className="shrink-0" />
            </div>
          )}
          <Text variant="base-sm" weight="medium">
            {children}
          </Text>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-black/10 shrink-0 w-6.5 h-6.5 self-start text-inherit hover:text-inherit"
            onClick={onClose}
          >
            <Icon icon="ph:x" />
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * AlertContent
 *
 * Displays the main content/description of the alert.
 * Must be used as a child of the Alert component.
 *
 * @param className - Additional CSS classes
 * @param children - The content to display
 */
function AlertContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error("AlertContent must be used within an Alert component");
  }

  return (
    <div
      data-slot="alert-content"
      className={cn("bg-white py-3 px-4 text-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Alert, AlertHeader, AlertContent };
