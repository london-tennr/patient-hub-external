import { cn } from "../utils/cn";

/**
 * Skeleton Component
 *
 * A placeholder loading indicator that mimics the shape of content while it's being loaded.
 * Provides a smooth, animated pulse effect to indicate loading state and helps prevent
 * layout shift by reserving space for content before it renders. Designed for composability
 * to build complex loading states by combining multiple skeletons.
 *
 * @see [Lasso Skeleton README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/skeleton/README.md)
 *
 * @example
 * ```tsx
 * // Basic usage - text placeholder
 * <Skeleton className="h-4 w-[200px]" />
 *
 * // Avatar placeholder
 * <Skeleton className="h-12 w-12 rounded-full" />
 *
 * // Card loading state
 * <div className="flex flex-col space-y-3">
 *   <Skeleton className="h-[125px] w-[250px] rounded-xl" />
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-[250px]" />
 *     <Skeleton className="h-4 w-[200px]" />
 *   </div>
 * </div>
 * ```
 *
 * @param className - CSS classes to define dimensions and shape. Use width/height classes
 *                    (e.g., `w-32`, `h-4`) and border-radius classes (e.g., `rounded-full`)
 *                    to match the shape of the content being loaded.
 * @param props - All standard div HTML attributes are supported
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-sm", className)}
      {...props}
    />
  );
}

export { Skeleton };
