import * as React from "react";
import { AlertVariant } from "./alert-styles";
/**
 * CompactAlert Component
 *
 * A compact-style alert with an icon badge and content in a single row.
 * Use this variant for subtle alerts that need a shadow but minimal visual weight.
 * @see [Lasso Alert README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/alert/README.md)
 *
 * @example
 * ```tsx
 * <CompactAlert variant="success" onClose={() => handleClose()}>
 *   <CompactAlertContent>File uploaded successfully.</CompactAlertContent>
 * </CompactAlert>
 * ```
 *
 * @param variant - The visual style of the alert (success, warning, info, error, ai)
 * @param onClose - Optional callback when close button is clicked. Shows close button when provided.
 * @param className - Additional CSS classes
 * @param children - The content (typically CompactAlertContent)
 */
declare function CompactAlert({ className, variant, children, onClose, ...props }: React.ComponentProps<"div"> & {
    variant: AlertVariant;
    onClose?: () => void;
}): import("react/jsx-runtime").JSX.Element;
interface CompactAlertContentProps extends React.ComponentProps<"div"> {
    iconName?: string;
}
/**
 * CompactAlertContent - The content area of a CompactAlert with icon badge
 *
 * Displays the alert content with a circular icon badge.
 * Must be used as a child of the CompactAlert component.
 *
 * @param iconName - Optional custom icon (Iconify format). Defaults to variant-specific icon.
 * @param className - Additional CSS classes
 * @param children - The content to display
 */
declare function CompactAlertContent({ className, iconName, children, ...props }: CompactAlertContentProps): import("react/jsx-runtime").JSX.Element;
export { CompactAlert, CompactAlertContent };
//# sourceMappingURL=compact-alert.d.ts.map