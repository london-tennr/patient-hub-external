import { cva } from "class-variance-authority";

export type AlertVariant = "info" | "warning" | "success" | "error" | "ai";

export const variantIcons = {
  info: "ph:info",
  warning: "ph:warning",
  success: "ph:check-circle",
  error: "ph:warning-diamond",
  ai: "ph:sparkle",
} satisfies Record<AlertVariant, string>;

export const alertHeaderVariants = cva(
  "flex items-center justify-between py-3 px-4 w-full shrink-0",
  {
    variants: {
      variant: {
        success: "bg-[#30A46C] text-white",
        warning: "bg-[#FFC53D]",
        info: "bg-[#ACD8FC]",
        error: "bg-[#E54D2E] text-white",
        ai: "bg-[#8e4ec6] text-white",
      },
    },
  },
);
