/**
 * CSS classes applied to inactive highlighted matches.
 * Uses a yellow background for visibility.
 */
export declare const HIGHLIGHT_CLASS = "bg-yellow-200 rounded";
/**
 * CSS classes applied to the currently active (focused) match.
 * Uses an orange background to distinguish from other matches.
 */
export declare const ACTIVE_HIGHLIGHT_CLASS = "bg-orange-400  rounded";
/**
 * HTML tags that are excluded from text search.
 * Content within these elements will not be highlighted.
 */
export declare const SKIP_TAGS: string[];
/**
 * Return type for the useSearchHighlight hook.
 */
export interface UseSearchHighlightReturn {
    /** Current search query string */
    searchTerm: string;
    /** Function to update the search query */
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    /** Total number of matches found in the container */
    totalMatches: number;
    /** Zero-based index of the currently active match */
    activeIndex: number;
    /** Function to change which match is active */
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    /** Array of HTMLElement references to all highlighted match elements */
    matches: HTMLElement[];
}
/**
 * useSearchHighlight Hook
 *
 * A custom hook that provides text search and highlighting functionality for a DOM container.
 * It highlights all text matches by wrapping them in `<mark>` elements and tracks an active
 * match that can be navigated by the user.
 *
 * ## How It Works
 *
 * 1. **Cleanup**: Removes any previous `<mark>` highlights by unwrapping them back to text nodes
 * 2. **Collection**: Traverses the DOM tree to collect all text nodes (excluding SKIP_TAGS)
 * 3. **Highlighting**: For each text node with matches, splits the text and wraps matches in `<mark>` elements
 * 4. **Tracking**: Maintains an array of match references for navigation
 *
 * ## Technical Notes
 *
 * - Uses `TreeWalker` API for efficient DOM traversal
 * - Properly escapes regex special characters in search terms
 * - Normalizes the DOM after cleanup to merge adjacent text nodes
 * - Re-runs on searchTerm, activeIndex, or container changes
 *
 * @param searchableContentContainer - The HTML element to search within. Pass `null` if not yet mounted.
 * @returns Object containing search state and controls
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const {
 *   searchTerm,
 *   setSearchTerm,
 *   totalMatches,
 *   activeIndex,
 *   setActiveIndex,
 *   matches,
 * } = useSearchHighlight(containerRef.current);
 * ```
 *
 * @see [Lasso SearchHighlight README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/search-highlight/README.md)
 */
export declare function useSearchHighlight(searchableContentContainer: HTMLElement | null): UseSearchHighlightReturn;
//# sourceMappingURL=use-search-highlight.d.ts.map