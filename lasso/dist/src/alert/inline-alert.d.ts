import * as React from "react";
import { AlertVariant } from "./alert-styles";
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
declare function InlineAlert({ className, variant, children, onClose, ...props }: React.ComponentProps<"div"> & {
    variant: AlertVariant;
    onClose?: () => void;
}): import("react/jsx-runtime").JSX.Element;
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
declare function InlineAlertContent({ className, iconName, children, ...props }: InlineAlertContentProps): import("react/jsx-runtime").JSX.Element;
export { InlineAlert, InlineAlertContent };
//# sourceMappingURL=inline-alert.d.ts.map