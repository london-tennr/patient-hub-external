"use client";

import {
  CheckCircle,
  CircleNotch,
  Info,
  Warning,
  X,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast, ToasterProps } from "sonner";

/**
 * Toaster Component
 *
 * A container component that renders and manages toast notifications in the application.
 * Built on top of Sonner with consistent styling for the Tennr design system. Toast
 * notifications are ideal for communicating feedback about user actions, system status,
 * or important updates without interrupting the user's workflow.
 *
 * Place this component once in your application layout (typically in `_app.tsx` or `layout.tsx`),
 * then use the `toast` function to trigger notifications from anywhere.
 *
 * @param props - ToasterProps from Sonner, including position, theme, duration, and closeButton options
 *
 * @example
 * ```tsx
 * // In your layout file
 * import { Toaster } from "@tennr/lasso/toast";
 *
 * function MyApp({ Component, pageProps }) {
 *   return (
 *     <>
 *       <Component {...pageProps} />
 *       <Toaster position="bottom-right" />
 *     </>
 *   );
 * }
 * ```
 *
 * @see [Sonner Documentation](https://sonner.emilkowal.ski/)
 *
 * @see [Lasso Toast README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/toast/README.md)
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircle />,
        info: <Info />,
        warning: <Warning />,
        error: <X />,
        loading: <CircleNotch />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "!bg-white !border !border-border !text-foreground !rounded-md !p-4 !text-sm !font-medium !lasso:wght-medium !leading-5 !shadow-md",
          success: "!shadow-fractal-success",
          info: "!shadow-fractal-info",
          warning: "!shadow-fractal-warning",
          error: "!shadow-fractal-error",
          loading: "!shadow-fractal-neutral",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--accent)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

/**
 * toast - Function for triggering toast notifications
 *
 * A utility function to display toast notifications from anywhere in your application.
 * Supports multiple variants (success, error, warning, info, loading) and various
 * customization options like duration, actions, and descriptions.
 *
 * @example
 * ```tsx
 * import { toast } from "@tennr/lasso/toast";
 *
 * // Success notification
 * toast.success("Changes saved successfully!");
 *
 * // Error notification
 * toast.error("Something went wrong. Please try again.");
 *
 * // Warning notification
 * toast.warning("Your session will expire in 5 minutes.");
 *
 * // Info notification
 * toast.info("New features are available!");
 *
 * // Toast with description
 * toast("File uploaded", {
 *   description: "Your file has been successfully uploaded.",
 * });
 *
 * // Toast with action button
 * toast("Item deleted", {
 *   action: {
 *     label: "Undo",
 *     onClick: () => restoreItem(),
 *   },
 * });
 *
 * // Custom duration (10 seconds)
 * toast("Important message", { duration: 10000 });
 * ```
 *
 * @see [Sonner Documentation](https://sonner.emilkowal.ski/)
 *
 * @see [Lasso Toast README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/toast/README.md)
 */
export { Toaster, toast };
