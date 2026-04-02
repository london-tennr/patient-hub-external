import { SVGProps } from "react";
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
declare function Logo(props: LogoProps): import("react/jsx-runtime").JSX.Element;
export { Logo };
export type { LogoProps };
//# sourceMappingURL=logo.d.ts.map