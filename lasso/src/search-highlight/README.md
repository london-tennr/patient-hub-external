# SearchHighlight Component

## Overview

The SearchHighlight component provides text search functionality within a scrollable container, highlighting matches and enabling navigation between them. It combines a search input with match navigation controls, making it easy for users to find and navigate to specific content within large documents or text areas. It's ideal for document viewers, long-form content, and any interface where users need to search within visible content.

## What It Is

The SearchHighlight component consists of a main component and a supporting hook:

- **SearchHighlight**: The UI component that renders a search bar with navigation controls
- **useSearchHighlight**: A custom hook that handles the search logic, highlighting, and match tracking

### Key Features

- **Real-time Highlighting**: Matches are highlighted as the user types
- **Match Navigation**: Up/down navigation buttons to cycle through matches
- **Active Match Tracking**: Current match is visually distinguished from other matches
- **Keyboard Support**: Enter to go to next match, Shift+Enter for previous match
- **Smooth Scrolling**: Automatically scrolls to center the active match in the viewport
- **Flexible Container Support**: Works with separate scrollable and searchable containers
- **Match Counter**: Shows current match position relative to total matches (e.g., "3/15")

## When to Use

Use the SearchHighlight component when you need to:

1. **Document Search**: Allow users to search within long documents or text content

   - PDF viewers
   - Text file viewers
   - Documentation pages
   - Legal document review

2. **Content Navigation**: Help users quickly find specific information in large content areas

   - Log viewers
   - Code viewers
   - Chat history search
   - Email content search

3. **Data Review**: Enable search within scrollable data displays

   - Long tables or lists
   - Detailed records
   - Audit logs
   - Transaction histories

4. **In-page Search**: Provide browser-like search functionality within a specific area

   - Modal content search
   - Sidebar content search
   - Embedded content viewers
   - Help documentation panels

## When NOT to Use

Avoid using the SearchHighlight component when:

1. **Global Search**: You need to search across multiple pages or the entire application

   - Use a global search dialog/command palette instead
   - Use a dedicated search page with results listing
   - Use server-side search with pagination

2. **Filtering Data**: You want to filter out non-matching items rather than highlight them

   - Use a filter component or data table with search
   - Use a filterable list component
   - Use faceted search

3. **Simple Text Inputs**: You just need a basic search input without highlighting

   - Use a Searchbar component
   - Use an Input with search icon

4. **Small Content Areas**: The content is small enough that search adds no value

   - Short paragraphs
   - Small lists (under 10 items)
   - Single-screen content

5. **Rich Media Content**: The content is primarily images, videos, or non-text elements

   - Use tags/labels search instead
   - Use metadata-based search

6. **Performance-Critical Scenarios**: The content has thousands of DOM nodes

   - Consider virtualized lists with server-side search
   - Use debounced search with backend filtering

## Usage Example

```tsx
import { useRef } from "react";

import { SearchHighlight } from "@tennr/lasso/search-highlight";

function DocumentViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="max-h-[500px] overflow-y-auto">
      <SearchHighlight scrollableContainer={containerRef} />
      <div className="p-4">
        <p>Your searchable content goes here...</p>
        <p>
          The SearchHighlight component will highlight matches in this text.
        </p>
      </div>
    </div>
  );
}
```

### Example with Separate Searchable Container

```tsx
import { useRef } from "react";

import { SearchHighlight } from "@tennr/lasso/search-highlight";

function SplitContainerSearch() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="max-h-[400px] overflow-y-auto">
      <SearchHighlight
        scrollableContainer={scrollContainerRef}
        searchableContentContainer={contentRef}
      />
      {/* Header that should not be searched */}
      <header className="p-4 bg-gray-100">
        <h1>Document Title</h1>
      </header>
      {/* Only this content will be searched */}
      <div ref={contentRef} className="p-4">
        <p>Only this content will be included in search...</p>
      </div>
    </div>
  );
}
```

### Using the Hook Directly

```tsx
import { useCallback, useRef } from "react";

import { useSearchHighlight } from "@tennr/lasso/search-highlight";

function CustomSearchUI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    searchTerm,
    setSearchTerm,
    totalMatches,
    activeIndex,
    setActiveIndex,
    matches,
  } = useSearchHighlight(containerRef.current);

  const goToNext = useCallback(() => {
    if (matches.length === 0) return;
    setActiveIndex((activeIndex + 1) % matches.length);
  }, [activeIndex, matches.length, setActiveIndex]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <span>
        {activeIndex + 1} of {totalMatches}
      </span>
      <button onClick={goToNext}>Next</button>
      <div ref={containerRef}>{/* Searchable content */}</div>
    </div>
  );
}
```

## Props Reference

### SearchHighlight

| Prop                         | Type                             | Default               | Description                                                                          |
| ---------------------------- | -------------------------------- | --------------------- | ------------------------------------------------------------------------------------ |
| `scrollableContainer`        | `RefObject<HTMLElement \| null>` | **Required**          | Reference to the scrollable container. Used for scrolling to matches.                |
| `searchableContentContainer` | `RefObject<HTMLElement \| null>` | `scrollableContainer` | Reference to the container with searchable content. Defaults to scrollable container |
| `placeholder`                | `string`                         | `"Search"`            | Placeholder text for the search input                                                |

### useSearchHighlight Hook

The `useSearchHighlight` hook handles all search logic and returns:

| Return Value     | Type                      | Description                                   |
| ---------------- | ------------------------- | --------------------------------------------- |
| `searchTerm`     | `string`                  | Current search query                          |
| `setSearchTerm`  | `(term: string) => void`  | Function to update the search query           |
| `totalMatches`   | `number`                  | Total number of matches found                 |
| `activeIndex`    | `number`                  | Index of the currently active (focused) match |
| `setActiveIndex` | `(index: number) => void` | Function to change the active match           |
| `matches`        | `HTMLElement[]`           | Array of highlighted match elements           |

### Exported Constants

| Constant                 | Value                      | Description                             |
| ------------------------ | -------------------------- | --------------------------------------- |
| `HIGHLIGHT_CLASS`        | `"bg-yellow-200 rounded"`  | CSS classes applied to inactive matches |
| `ACTIVE_HIGHLIGHT_CLASS` | `"bg-orange-400 rounded"`  | CSS classes applied to the active match |
| `SKIP_TAGS`              | `["SCRIPT", "STYLE", ...]` | HTML tags excluded from search          |

## Keyboard Navigation

- **Enter**: Go to next match
- **Shift + Enter**: Go to previous match

## Accessibility

The SearchHighlight component includes accessibility features:

- Navigation buttons have proper `aria-label` attributes
- Tooltips provide keyboard shortcut hints
- Search input is standard and accessible
- Focus management is handled correctly

## Technical Notes

- The component modifies the DOM by wrapping matched text in `<mark>` elements
- Previous highlights are cleaned up before each new search
- Uses `TreeWalker` API for efficient DOM traversal
- Script, style, input, and textarea elements are skipped during search
- Regex special characters in search terms are properly escaped

## Related Components

- For a standalone search input without highlighting, use the `Searchbar` component
- For filtering data in tables, use the `DataTable` component with built-in search
- For global application search, consider a command palette pattern
- For simple text highlighting without navigation, consider a custom solution with the hook
