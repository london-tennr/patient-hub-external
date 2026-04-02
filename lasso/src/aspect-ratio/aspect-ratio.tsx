"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * AspectRatio Component
 *
 * A utility component that maintains a specific width-to-height ratio for its content.
 * Ensures that images, videos, or any other content maintain their intended proportions
 * regardless of the container size or screen dimensions. Built on top of Radix UI's
 * AspectRatio primitive with consistent styling for the Tennr design system.
 *
 * @param ratio - The desired width-to-height ratio (e.g., `16 / 9` for widescreen, `1` for square)
 * @param className - Additional CSS classes to apply to the container
 * @param children - The content to display within the aspect ratio container
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9} className="bg-muted">
 *   <img
 *     src="/image.jpg"
 *     alt="Descriptive text"
 *     className="object-cover h-full w-full"
 *   />
 * </AspectRatio>
 * ```
 *
 * @see [Radix UI AspectRatio](https://github.com/radix-ui/primitives/blob/main/packages/react/aspect-ratio/src/aspect-ratio.tsx)
 *
 * @see [Lasso AspectRatio README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/aspect-ratio/README.md)
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
