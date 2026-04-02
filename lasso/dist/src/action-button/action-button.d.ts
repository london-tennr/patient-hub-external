import type React from "react";
/**
 * The possible states for an ActionButton component.
 * - `idle`: Initial state, shows only the icon
 * - `loading`: Action in progress, shows spinner and loading text
 * - `success`: Action completed successfully, shows success icon and text
 * - `error`: Action failed, shows error icon and text
 */
export type ActionButtonState = "idle" | "loading" | "success" | "error";
/**
 * Props for the ActionButton component.
 *
 * @example
 * ```tsx
 * <ActionButton
 *   onClick={async () => {
 *     await saveData();
 *   }}
 *   loadingText="Saving..."
 *   successText="Saved!"
 *   onSuccess={(result) => console.log("Success:", result)}
 * />
 * ```
 */
export interface ActionButtonProps {
    /** The async function to execute when the button is clicked. Required. */
    onClick: (event?: React.MouseEvent<HTMLElement>) => Promise<unknown>;
    /** Text to display during loading state. Defaults to "Loading...". */
    loadingText?: string;
    /** Text to display on success. Defaults to "Success". */
    successText?: string;
    /** Text to display on error. Defaults to "Error". */
    errorText?: string;
    /** Base CSS classes for the button. */
    className?: string;
    /** Icon to display in idle state. Defaults to a Plus icon. */
    idleIcon?: React.ReactNode;
    /** Icon to display in success state. Defaults to a Check icon. */
    successIcon?: React.ReactNode;
    /** Icon to display in error state. Defaults to an X icon. */
    errorIcon?: React.ReactNode;
    /** Callback fired when the action succeeds. Receives the result from onClick. */
    onSuccess?: (result: unknown) => void;
    /** Callback fired when the action fails. Receives the error from onClick. */
    onError?: (error: unknown) => void;
    /** Handler for clicks when in success state. Useful for resetting or performing follow-up actions. */
    postSuccessClick?: (event?: React.MouseEvent<HTMLElement>) => Promise<unknown>;
    /** Handler for clicks when in error state. Useful for retry logic or error recovery. */
    postErrorClick?: (event?: React.MouseEvent<HTMLElement>) => Promise<unknown>;
    /** Additional CSS classes applied during loading state. */
    loadingClassName?: string;
    /** Additional CSS classes applied during success state. */
    successClassName?: string;
    /** Additional CSS classes applied during error state. */
    errorClassName?: string;
    /** Initial state of the button. Defaults to "idle". */
    defaultState?: ActionButtonState;
}
/**
 * ActionButton Component
 *
 * A smart button component that handles asynchronous actions with built-in state management
 * and visual feedback. Automatically transitions through states (idle → loading → success/error)
 * and provides smooth animations to communicate action progress. Built with motion/react for
 * animations and consistent styling for the Tennr design system.
 *
 * @see [Motion React](https://motion.dev/)
 *
 * @see [Lasso ActionButton README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/action-button/README.md)
 */
export declare function ActionButton({ onClick, onSuccess, onError, postSuccessClick, postErrorClick, loadingText, successText, errorText, className, idleIcon, successIcon, errorIcon, loadingClassName, successClassName, errorClassName, defaultState, }: ActionButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=action-button.d.ts.map