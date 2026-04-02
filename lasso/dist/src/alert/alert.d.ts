import * as React from "react";
import { AlertVariant } from "./alert-styles";
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
declare function Alert({ className, variant, children, onClose, ...props }: React.ComponentProps<"div"> & {
    variant: AlertVariant;
    onClose?: () => void;
}): import("react/jsx-runtime").JSX.Element;
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
declare function AlertHeader({ className, iconName, children, ...props }: AlertHeaderProps): import("react/jsx-runtime").JSX.Element;
/**
 * AlertContent
 *
 * Displays the main content/description of the alert.
 * Must be used as a child of the Alert component.
 *
 * @param className - Additional CSS classes
 * @param children - The content to display
 */
declare function AlertContent({ className, children, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export { Alert, AlertHeader, AlertContent };
//# sourceMappingURL=alert.d.ts.map