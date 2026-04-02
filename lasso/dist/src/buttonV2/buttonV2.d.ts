import { type VariantProps } from "class-variance-authority";
import * as React from "react";
declare const buttonV2Variants: (props?: ({
    variant?: "primary" | "outline" | "muted" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type ButtonV2Props = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonV2Variants> & {
    asChild?: boolean;
};
declare const ButtonV2: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "primary" | "outline" | "muted" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & {
    asChild?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
export { ButtonV2, buttonV2Variants };
//# sourceMappingURL=buttonV2.d.ts.map