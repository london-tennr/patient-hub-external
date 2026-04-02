import { Icon } from "@iconify/react";
import { RefObject, useCallback } from "react";

import { Button } from "../button/button";
import { Searchbar } from "../searchbar/searchbar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import { useSearchHighlight } from "./use-search-highlight";

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
export function SearchHighlight({
  scrollableContainer,
  searchableContentContainer = scrollableContainer,
  placeholder = "Search",
}: SearchHighlightProps) {
  const {
    totalMatches,
    activeIndex,
    searchTerm,
    setSearchTerm,
    matches,
    setActiveIndex,
  } = useSearchHighlight(searchableContentContainer.current);

  const scrollToMatch = useCallback(
    (matchIdx: number) => {
      const node = matches[matchIdx];

      if (!scrollableContainer.current || !node) return;

      const containerRect = scrollableContainer.current.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();

      const nodeTopRelativeToContainer =
        nodeRect.top -
        containerRect.top +
        scrollableContainer.current.scrollTop;

      const scrollToPositionOfMatch =
        nodeTopRelativeToContainer -
        scrollableContainer.current.clientHeight / 2 +
        nodeRect.height / 2;

      scrollableContainer.current.scrollTo({
        top: scrollToPositionOfMatch,
        behavior: "smooth",
      });
    },
    [scrollableContainer, matches],
  );

  const next = useCallback(() => {
    if (matches.length === 0) return;
    const newIndex = (activeIndex + 1) % matches.length;
    setActiveIndex(newIndex);
    scrollToMatch(newIndex);
  }, [setActiveIndex, activeIndex, scrollToMatch, matches]);

  const prev = useCallback(() => {
    if (matches.length === 0) return;
    const newIndex = (activeIndex - 1 + matches.length) % matches.length;
    setActiveIndex(newIndex);
    scrollToMatch(newIndex);
  }, [setActiveIndex, activeIndex, scrollToMatch, matches]);

  const hasQuery = searchTerm.trim().length > 0;

  const counterText = `${Math.min(activeIndex + 1, totalMatches)}/${totalMatches}`;
  const areNavButtonsDisabled = !hasQuery || totalMatches === 0;

  return (
    <div className="sticky top-0 z-10 bg-white flex items-center gap-3">
      <Searchbar
        placeholder={placeholder}
        onChange={setSearchTerm}
        value={searchTerm}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          if (e.shiftKey) prev();
          else next();
        }}
      />

      {/* counter text */}
      {hasQuery && (
        <div className="text-sm whitespace-nowrap text-right w-8 flex-none">
          {counterText}
        </div>
      )}

      {/* navigation buttons */}
      <div className="flex items-center gap-1 flex-none">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="neutral"
              size="icon"
              className="size-4 p-0 disabled:opacity-50 rounded-sm disabled:hover:bg-transparent"
              onClick={prev}
              disabled={areNavButtonsDisabled}
              aria-label="Previous match"
            >
              <Icon icon="ph:caret-up" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous (Shift+Enter)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="neutral"
              size="icon"
              className="size-4 p-0 disabled:opacity-50 rounded-sm disabled:hover:bg-transparent"
              onClick={next}
              disabled={areNavButtonsDisabled}
              aria-label="Next match"
            >
              <Icon icon="ph:caret-down" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next (Enter)</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
