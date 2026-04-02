import { RefObject } from "react";
/**
 * Props for the SearchHighlight component.
 */
export interface SearchHighlightProps {
    /**
     * Reference to the scrollable container. Used for scrolling to matches when navigating.
     * This is the element that has `overflow: auto/scroll` set.
     */
    scrollableContainer: RefObject<HTMLElement | null>;
    /**
     * Reference to the container with searchable content. If not provided, defaults to the
     * scrollable container. Useful when you want to search only a subset of the scrollable area.
     */
    searchableContentContainer?: RefObject<HTMLElement | null>;
    /**
     * Placeholder text for the search input.
     * @default "Search"
     */
    placeholder?: string;
}
/**
 * SearchHighlight Component
 *
 * A search component that provides text search functionality within a scrollable container,
 * highlighting matches and enabling navigation between them. It combines a search input with
 * match navigation controls (up/down buttons), a match counter, and keyboard shortcuts
 * (Enter/Shift+Enter) for efficient content discovery.
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 *
 * <div ref={containerRef} className="max-h-[400px] overflow-y-auto">
 *   <SearchHighlight scrollableContainer={containerRef} />
 *   <div className="p-4">Your searchable content...</div>
 * </div>
 * ```
 *
 * @see [Lasso SearchHighlight README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/search-highlight/README.md)
 */
export declare function SearchHighlight({ scrollableContainer, searchableContentContainer, placeholder, }: SearchHighlightProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=search-highlight.d.ts.map