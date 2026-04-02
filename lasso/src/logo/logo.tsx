import { SVGProps } from "react";

import { cn } from "../utils/cn";

/**
 * Props for the Logo component.
 */
type LogoProps = SVGProps<SVGSVGElement> & {
  /**
   * The visual variant of the logo to render.
   *
   * - `"primary-icon"`: Square icon with brand rust (#9B4E45) background and white mark.
   *   Best for primary brand contexts, app icons, and favicons.
   *
   * - `"neutral-icon"`: Square icon with neutral peat (#4B4140) background and white mark.
   *   Best for subtle branding, dark mode, and secondary contexts.
   *
   * - `"text-icon"`: Standalone mark/icon in peat color (#4B4140).
   *   Best for pairing with custom text or compact layouts.
   *
   * - `"logo"` (default): Full horizontal logo with mark and "Tennr" text.
   *   Uses `currentColor` to inherit text color. Best for headers and marketing materials.
   *
   * @default "logo"
   */
  variant?: "primary-icon" | "neutral-icon" | "text-icon" | "logo";
};

/**
 * Renders the Tennr/Lasso brand logo in various formats.
 *
 * The Logo component is a flexible SVG-based branding element that supports multiple
 * visual variants to accommodate different design contexts, from app headers and
 * sidebars to marketing materials and loading screens.
 *
 * @example
 * // Full logo (default) - inherits text color
 * <Logo className="h-8 w-auto text-brand-peat" />
 *
 * @example
 * // Primary icon variant - brand color background
 * <Logo variant="primary-icon" className="h-8 w-8" aria-label="Tennr" />
 *
 * @example
 * // Neutral icon variant - peat background
 * <Logo variant="neutral-icon" className="h-8 w-8" />
 *
 * @example
 * // Text icon variant - standalone mark
 * <Logo variant="text-icon" className="h-8 w-auto text-brand-peat" />
 *
 * @see {@link https://storybook.tennr.com/?path=/docs/foundations-logo--docs Storybook Documentation}
 *
 * @see [Lasso Logo README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/logo/README.md)
 */
function Logo(props: LogoProps) {
  if (props.variant === "primary-icon" || props.variant === "neutral-icon") {
    return (
      <svg
        width="375"
        height="375"
        viewBox="0 0 375 375"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          width="375"
          height="375"
          fill={cn(props.variant === "neutral-icon" ? "#4B4140" : "#9B4E45")}
        />
        <path
          d="M209.818 47.5H57.5V245.46H210.933V259.46H165.182V327.5H317.5V129.54H209.818V47.5Z"
          fill="#FBFBF9"
        />
      </svg>
    );
  }

  if (props.variant === "text-icon") {
    return (
      <svg
        width="261"
        height="281"
        viewBox="0 0 261 281"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M152.818 0.5H0.5V198.46H153.933V212.46H108.182V280.5H260.5V82.54H152.818V0.5Z"
          fill="#4B4140"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={102}
      width={399}
      viewBox="0 0 399 102"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M361.644 28.95h10.286v26.572l-2.286-1.143c2.095-6.476 4.238-11.619 6.428-15.428 2.191-3.905 4.81-6.81 7.857-8.715 3.143-2 6.953-3 11.429-3 .952 0 1.667.048 2.143.143v11.572c-.857-.19-1.857-.286-3-.286-6.952 0-12.429 2.619-16.429 7.857-4 5.143-6 11.952-6 20.429v33.285h-10.428V28.951ZM294.644 28.95h10.429v20.429l-1.857-2.858c3.333-6.19 7.238-10.952 11.714-14.285 4.571-3.429 9.809-5.143 15.714-5.143 4.476 0 8.381 1.047 11.714 3.143 3.429 2.095 6.048 5.143 7.858 9.143 1.904 4 2.857 8.761 2.857 14.285v46.572h-10.572V57.664c0-7.619-1.285-13-3.857-16.143-2.476-3.238-6.286-4.857-11.428-4.857-3.905 0-7.572 1.095-11 3.286-3.334 2.19-6.048 5.333-8.143 9.428-2 4-3 8.62-3 13.858v37h-10.429V28.95ZM227.644 28.95h10.428v20.429l-1.857-2.858c3.333-6.19 7.238-10.952 11.714-14.285 4.572-3.429 9.81-5.143 15.715-5.143 4.476 0 8.38 1.047 11.714 3.143 3.428 2.095 6.047 5.143 7.857 9.143 1.905 4 2.857 8.761 2.857 14.285v46.572h-10.571V57.664c0-7.619-1.286-13-3.857-16.143-2.477-3.238-6.286-4.857-11.429-4.857-3.905 0-7.571 1.095-11 3.286-3.333 2.19-6.048 5.333-8.143 9.428-2 4-3 8.62-3 13.858v37h-10.428V28.95ZM189.518 101.95c-6.667 0-12.572-1.524-17.714-4.572-5.048-3.142-9-7.523-11.858-13.142-2.761-5.62-4.142-12.143-4.142-19.572 0-7.333 1.381-13.857 4.142-19.571 2.858-5.715 6.762-10.143 11.715-13.286 4.952-3.143 10.666-4.714 17.143-4.714 5.809 0 11 1.428 15.571 4.285 4.571 2.762 8.19 6.715 10.857 11.858 2.667 5.143 4 11.143 4 18v3.143h-57.143V55.52h52.429l-6.429 5v-3.428c0-6.381-1.857-11.476-5.571-15.286-3.619-3.81-8.286-5.714-14-5.714-4 0-7.667 1-11 3-3.238 2-5.81 4.904-7.714 8.714-1.905 3.81-2.905 8.143-3 13-.096.762-.143 1.286-.143 1.572 0 .285-.048.761-.143 1.428-.095 8.952 1.952 16.048 6.143 21.286 4.19 5.143 9.809 7.714 16.857 7.714 4.667 0 8.571-1.19 11.714-3.571 3.238-2.381 5.524-5.762 6.857-10.143h10.572c-1.81 6.762-5.238 12.285-10.286 16.571-4.952 4.19-11.238 6.286-18.857 6.286Z"
      />
      <path
        fill="currentColor"
        d="M132.07 10.093H93.356V.236h88.428v9.857H143.07v90.143h-11V10.093ZM54.641 29.522h38.571v70.714H38.57V75.95H55v-5H-.003V.236h54.643v29.286Z"
      />
    </svg>
  );
}

export { Logo };
export type { LogoProps };
