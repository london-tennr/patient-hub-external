"use client";

import { Check, Plus, Spinner, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";

import { cn } from "../utils/cn.js";

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
  postSuccessClick?: (
    event?: React.MouseEvent<HTMLElement>,
  ) => Promise<unknown>;
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
export function ActionButton({
  onClick,
  onSuccess,
  onError,
  postSuccessClick,
  postErrorClick,
  loadingText = "Loading...",
  successText = "Success",
  errorText = "Error",
  className,
  idleIcon = <Plus size={20} weight="light" />,
  successIcon = <Check size={20} weight="light" />,
  errorIcon = <X size={20} weight="light" />,
  loadingClassName,
  successClassName,
  errorClassName,
  defaultState,
}: ActionButtonProps) {
  const [state, setState] = useState<ActionButtonState>(defaultState ?? "idle");

  const handleClick = async (event?: React.MouseEvent<HTMLElement>) => {
    if (state === "success") {
      await postSuccessClick?.(event);
      return;
    }
    if (state === "error") {
      await postErrorClick?.(event);
      return;
    }
    if (state === "loading") return;

    setState("loading");

    try {
      const result = await onClick(event);
      setState("success");
      onSuccess?.(result);
    } catch (error) {
      if (error instanceof Error && error.message === "cancelled") {
        setState("idle");
      } else {
        setState("error");
        onError?.(error);
      }
    }
  };

  const isExpanded = state !== "idle";

  return (
    <motion.button
      onClick={(event) => void handleClick(event)}
      disabled={state === "loading"}
      className={cn(
        "flex items-center bg-primary rounded-none text-primary-foreground overflow-hidden hover:cursor-pointer hover:bg-muted-foreground",
        isExpanded ? "py-3 pl-3 pr-5" : "p-3",
        className,
        state === "loading" && loadingClassName,
        state === "success" && successClassName,
        state === "error" && errorClassName,
      )}
      layout
      transition={{
        layout: {
          type: "spring",
          bounce: 0.35,
          duration: 0.5,
          delay: 0.15,
        },
      }}
    >
      {!isExpanded ? (
        <motion.div layout className="flex items-center justify-center">
          {idleIcon}
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {state === "loading" && (
            <motion.div
              key="loading"
              layout
              className="flex items-center gap-2"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                layout
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                  ease: "linear",
                }}
              >
                <Spinner size={20} weight="light" />
              </motion.div>
              <motion.span
                className="whitespace-nowrap"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, delay: 0.15 }}
              >
                {loadingText}
              </motion.span>
            </motion.div>
          )}

          {state === "success" && (
            <motion.div
              key="success"
              layout
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {successIcon}
              <motion.span layout className="whitespace-nowrap">
                {successText}
              </motion.span>
            </motion.div>
          )}

          {state === "error" && (
            <motion.div
              key="error"
              layout
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {errorIcon}
              <motion.span layout className="whitespace-nowrap">
                {errorText}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.button>
  );
}
