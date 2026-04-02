import * as React from "react";

/**
 * The pixel width threshold for mobile viewport detection.
 * Aligns with common CSS frameworks like Tailwind's `md` breakpoint.
 */
const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile Hook
 *
 * A responsive design hook that detects whether the current viewport is at
 * mobile size (below 768px width). Uses the `window.matchMedia` API to
 * efficiently listen for viewport changes and update the state accordingly.
 *
 * @returns `true` if the viewport width is less than 768px, `false` otherwise
 *
 * @example
 * ```tsx
 * import { useIsMobile } from "@tennr/lasso/hooks";
 *
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *
 *   if (isMobile) {
 *     return <MobileNavigation />;
 *   }
 *
 *   return <DesktopNavigation />;
 * }
 * ```
 *
 * @remarks
 * - Returns `false` on initial server-side render and first client render
 * - Updates to actual viewport state after hydration
 * - Uses `matchMedia` for efficient threshold-based updates
 * - Properly cleans up event listeners on unmount
 *
 * @see [Lasso Hooks README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/hooks/README.md)
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
