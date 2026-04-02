import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { useCallback } from "react";
import { Button } from "../button/button";
import { Searchbar } from "../searchbar/searchbar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import { useSearchHighlight } from "./use-search-highlight";
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
export function SearchHighlight({ scrollableContainer, searchableContentContainer = scrollableContainer, placeholder = "Search", }) {
    const { totalMatches, activeIndex, searchTerm, setSearchTerm, matches, setActiveIndex, } = useSearchHighlight(searchableContentContainer.current);
    const scrollToMatch = useCallback((matchIdx) => {
        const node = matches[matchIdx];
        if (!scrollableContainer.current || !node)
            return;
        const containerRect = scrollableContainer.current.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();
        const nodeTopRelativeToContainer = nodeRect.top -
            containerRect.top +
            scrollableContainer.current.scrollTop;
        const scrollToPositionOfMatch = nodeTopRelativeToContainer -
            scrollableContainer.current.clientHeight / 2 +
            nodeRect.height / 2;
        scrollableContainer.current.scrollTo({
            top: scrollToPositionOfMatch,
            behavior: "smooth",
        });
    }, [scrollableContainer, matches]);
    const next = useCallback(() => {
        if (matches.length === 0)
            return;
        const newIndex = (activeIndex + 1) % matches.length;
        setActiveIndex(newIndex);
        scrollToMatch(newIndex);
    }, [setActiveIndex, activeIndex, scrollToMatch, matches]);
    const prev = useCallback(() => {
        if (matches.length === 0)
            return;
        const newIndex = (activeIndex - 1 + matches.length) % matches.length;
        setActiveIndex(newIndex);
        scrollToMatch(newIndex);
    }, [setActiveIndex, activeIndex, scrollToMatch, matches]);
    const hasQuery = searchTerm.trim().length > 0;
    const counterText = `${Math.min(activeIndex + 1, totalMatches)}/${totalMatches}`;
    const areNavButtonsDisabled = !hasQuery || totalMatches === 0;
    return (_jsxs("div", { className: "sticky top-0 z-10 bg-white flex items-center gap-3", children: [_jsx(Searchbar, { placeholder: placeholder, onChange: setSearchTerm, value: searchTerm, onKeyDown: (e) => {
                    if (e.key !== "Enter")
                        return;
                    e.preventDefault();
                    if (e.shiftKey)
                        prev();
                    else
                        next();
                } }), hasQuery && (_jsx("div", { className: "text-sm whitespace-nowrap text-right w-8 flex-none", children: counterText })), _jsxs("div", { className: "flex items-center gap-1 flex-none", children: [_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "neutral", size: "icon", className: "size-4 p-0 disabled:opacity-50 rounded-sm disabled:hover:bg-transparent", onClick: prev, disabled: areNavButtonsDisabled, "aria-label": "Previous match", children: _jsx(Icon, { icon: "ph:caret-up" }) }) }), _jsx(TooltipContent, { children: "Previous (Shift+Enter)" })] }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "neutral", size: "icon", className: "size-4 p-0 disabled:opacity-50 rounded-sm disabled:hover:bg-transparent", onClick: next, disabled: areNavButtonsDisabled, "aria-label": "Next match", children: _jsx(Icon, { icon: "ph:caret-down" }) }) }), _jsx(TooltipContent, { children: "Next (Enter)" })] })] })] }));
}
