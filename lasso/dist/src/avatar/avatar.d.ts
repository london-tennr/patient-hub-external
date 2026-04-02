import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";
/**
 * Avatar Component
 *
 * Displays a user's profile image with a fallback mechanism. Shows an image when
 * available, and gracefully falls back to displaying initials or other content
 * when the image fails to load or is not provided. Built on top of Radix UI's
 * Avatar primitive with consistent styling for the Tennr design system.
 *
 * @see [Radix UI Avatar](https://github.com/radix-ui/primitives/blob/main/packages/react/avatar/src/avatar.tsx)
 *
 * @see [Lasso Avatar README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/avatar/README.md)
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="https://example.com/user.jpg" alt="John Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
declare function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * AvatarImage - The image element that displays the user's photo or profile picture.
 *
 * The image is rendered within the Avatar container and will automatically trigger
 * the AvatarFallback to display if the image fails to load.
 *
 * @param src - The URL of the image to display
 * @param alt - Alternative text for the image (required for accessibility)
 * @param className - Additional CSS classes to apply to the image element
 */
declare function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>): import("react/jsx-runtime").JSX.Element;
/**
 * AvatarFallback - The fallback content that appears when the image is loading,
 * fails to load, or is not provided.
 *
 * Typically contains user initials, but can accept any React node as children.
 * The fallback is styled with a muted background and centered content.
 *
 * @param children - The fallback content to display (typically initials)
 * @param className - Additional CSS classes to apply to the fallback container
 * @param delayMs - Optional delay in milliseconds before showing the fallback (prevents flicker)
 */
declare function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>): import("react/jsx-runtime").JSX.Element;
export { Avatar, AvatarImage, AvatarFallback };
//# sourceMappingURL=avatar.d.ts.map