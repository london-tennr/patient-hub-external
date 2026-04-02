import { useCallback, useEffect, useState } from "react";

/**
 * CSS classes applied to inactive highlighted matches.
 * Uses a yellow background for visibility.
 */
export const HIGHLIGHT_CLASS = "bg-yellow-200 rounded";

/**
 * CSS classes applied to the currently active (focused) match.
 * Uses an orange background to distinguish from other matches.
 */
export const ACTIVE_HIGHLIGHT_CLASS = "bg-orange-400  rounded";

/**
 * HTML tags that are excluded from text search.
 * Content within these elements will not be highlighted.
 */
export const SKIP_TAGS = ["SCRIPT", "STYLE", "INPUT", "TEXTAREA"];

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
export function useSearchHighlight(
  searchableContentContainer: HTMLElement | null,
): UseSearchHighlightReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState<HTMLElement[]>([]);

  // main algorithm:
  // 1. remove previous highlights
  // 2. collect text elements
  // 3. highlight and collect matches
  // 4. set matches
  useEffect(() => {
    removePreviousHighlights();
    const textElements = collectTextElements();
    const newMatches = highlightAndCollectMatches(textElements);
    setMatches(newMatches);
    if (newMatches.length === 0) {
      setActiveIndex(0);
    }
  }, [searchableContentContainer, searchTerm, activeIndex]);

  // We remove previous highlights by unwrapping the previous matches and
  // replacing them with the original text content.
  const removePreviousHighlights = useCallback(() => {
    for (const match of matches) {
      match.parentNode?.replaceChild(
        document.createTextNode(match.textContent ?? ""),
        match,
      );
    }
    searchableContentContainer?.normalize();
  }, [matches, searchableContentContainer]);

  // We collect all text elements in the container that are not within SKIP_TAGS.
  // Traverses the DOM tree in a depth-first manner to collect them.
  const collectTextElements = useCallback((): Text[] => {
    if (!searchableContentContainer) return [];
    const walker = document.createTreeWalker(
      searchableContentContainer,
      NodeFilter.SHOW_TEXT,
    );
    const nodes: Text[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const parent = n.parentElement;

      if (!(n instanceof Text) || !parent || SKIP_TAGS.includes(parent.tagName))
        continue;

      nodes.push(n);
    }
    return nodes;
  }, [searchableContentContainer]);

  // We highlight and collect matches by splitting text elements into parts
  // and creating <mark> elements. We then collect all <mark> elements into matches.
  const highlightAndCollectMatches = useCallback(
    (textElements: Text[]) => {
      if (!searchTerm) return [];

      const newMatches: HTMLElement[] = [];

      for (const element of textElements) {
        const splitRegex = getSearchRegex(searchTerm);
        const text = element.nodeValue ?? "";
        const parts = text.split(splitRegex);

        const frag = document.createDocumentFragment();

        for (const part of parts) {
          const isMatch = splitRegex.test(part);
          if (!isMatch) {
            frag.appendChild(document.createTextNode(part));
            continue;
          }
          const mark = document.createElement("mark");
          const isActiveMatch = newMatches.length === activeIndex;
          mark.className = isActiveMatch
            ? ACTIVE_HIGHLIGHT_CLASS
            : HIGHLIGHT_CLASS;
          mark.textContent = part;
          frag.appendChild(mark);
          newMatches.push(mark);
        }

        element.parentNode?.replaceChild(frag, element);
      }
      return newMatches;
    },
    [searchTerm, activeIndex],
  );

  return {
    searchTerm,
    setSearchTerm,
    totalMatches: matches.length,
    activeIndex,
    setActiveIndex,
    matches,
  };
}

/**
 * Creates a case-insensitive regex for searching, with special characters escaped.
 * The regex uses a capturing group to preserve matched text during split operations.
 *
 * @param s - The search term to convert to a regex
 * @returns A global, case-insensitive RegExp with escaped special characters
 */
function getSearchRegex(s: string): RegExp {
  const escaped = s.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(${escaped})`, "gi");
}
