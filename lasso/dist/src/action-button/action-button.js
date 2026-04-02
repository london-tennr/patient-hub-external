"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Plus, Spinner, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "../utils/cn.js";
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
export function ActionButton({ onClick, onSuccess, onError, postSuccessClick, postErrorClick, loadingText = "Loading...", successText = "Success", errorText = "Error", className, idleIcon = _jsx(Plus, { size: 20, weight: "light" }), successIcon = _jsx(Check, { size: 20, weight: "light" }), errorIcon = _jsx(X, { size: 20, weight: "light" }), loadingClassName, successClassName, errorClassName, defaultState, }) {
    const [state, setState] = useState(defaultState ?? "idle");
    const handleClick = async (event) => {
        if (state === "success") {
            await postSuccessClick?.(event);
            return;
        }
        if (state === "error") {
            await postErrorClick?.(event);
            return;
        }
        if (state === "loading")
            return;
        setState("loading");
        try {
            const result = await onClick(event);
            setState("success");
            onSuccess?.(result);
        }
        catch (error) {
            if (error instanceof Error && error.message === "cancelled") {
                setState("idle");
            }
            else {
                setState("error");
                onError?.(error);
            }
        }
    };
    const isExpanded = state !== "idle";
    return (_jsx(motion.button, { onClick: (event) => void handleClick(event), disabled: state === "loading", className: cn("flex items-center bg-primary rounded-none text-primary-foreground overflow-hidden hover:cursor-pointer hover:bg-muted-foreground", isExpanded ? "py-3 pl-3 pr-5" : "p-3", className, state === "loading" && loadingClassName, state === "success" && successClassName, state === "error" && errorClassName), layout: true, transition: {
            layout: {
                type: "spring",
                bounce: 0.35,
                duration: 0.5,
                delay: 0.15,
            },
        }, children: !isExpanded ? (_jsx(motion.div, { layout: true, className: "flex items-center justify-center", children: idleIcon })) : (_jsxs(AnimatePresence, { mode: "wait", children: [state === "loading" && (_jsxs(motion.div, { layout: true, className: "flex items-center gap-2", initial: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 }, children: [_jsx(motion.div, { animate: { rotate: 360 }, layout: true, transition: {
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1,
                                ease: "linear",
                            }, children: _jsx(Spinner, { size: 20, weight: "light" }) }), _jsx(motion.span, { className: "whitespace-nowrap", layout: true, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15, delay: 0.15 }, children: loadingText })] }, "loading")), state === "success" && (_jsxs(motion.div, { layout: true, className: "flex items-center gap-2", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 }, children: [successIcon, _jsx(motion.span, { layout: true, className: "whitespace-nowrap", children: successText })] }, "success")), state === "error" && (_jsxs(motion.div, { layout: true, className: "flex items-center gap-2", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 }, children: [errorIcon, _jsx(motion.span, { layout: true, className: "whitespace-nowrap", children: errorText })] }, "error"))] })) }));
}
