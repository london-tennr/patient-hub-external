import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

const buttonV2Variants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-terracotta text-white shadow-[0_1px_1px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)] " +
          "before:absolute before:inset-0 before:rounded-[inherit] before:shadow-[inset_0_1.5px_0.5px_rgba(255,255,255,0.5)] before:pointer-events-none " +
          "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_-3px_4px_rgba(0,0,0,0.2)] after:pointer-events-none hover:brightness-105 " +
          "active:translate-y-[0.5px] active:shadow-none",
        outline:
          "bg-gradient-to-b from-white from-[31%] to-neutral-2 to-[93%] text-text-primary " +
          "shadow-[0_1px_1px_0_rgba(0,0,0,0.22),0_0_0_1px_#fefefe] " +
          "before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none " +
          "before:shadow-[inset_0_1px_0_0_#efede9,inset_0_-1px_0_0_#e8e6df,inset_-1px_0_0_0_#f8f7f4,inset_1px_0_0_0_#f8f7f4] " +
          "hover:from-[#fefefe] hover:to-[#f5f4f0] " +
          "active:translate-y-[0.5px] active:shadow-[0_0_0_1px_#fefefe]",
        muted:
          "bg-[#efede9] text-[#232018] " +
          "shadow-[0_1px_2px_0_rgba(0,0,0,0.25),0_0_0_1px_#efede9] " +
          "hover:bg-[#e8e6df] active:translate-y-[0.5px] active:shadow-[0_0_0_1px_#efede9]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonV2Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonV2Variants> & {
    asChild?: boolean;
  };

const ButtonV2 = React.forwardRef<HTMLButtonElement, ButtonV2Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonV2Variants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
ButtonV2.displayName = "ButtonV2";

export { ButtonV2, buttonV2Variants };
