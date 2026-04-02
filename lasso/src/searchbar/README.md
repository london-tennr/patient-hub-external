# Searchbar Component

## Overview

The Searchbar component is a styled input field designed specifically for search functionality. It features a magnifying glass icon, an optional clear button, and consistent styling for the Tennr design system. The component is controlled, meaning it requires external state management for the search value.

## What It Is

The Searchbar is a focused input component that:

- **Displays a Search Icon**: Shows a magnifying glass icon on the left to clearly indicate search functionality
- **Provides Clear Functionality**: Optionally shows a clear button when there's input, allowing users to quickly reset the search
- **Supports Controlled State**: Works with external state management for the search value
- **Handles Keyboard Events**: Supports custom keyboard event handling for features like search on Enter
- **Flexible Styling**: Accepts className props for container and input customization

### Key Features

- **Visual Clarity**: Magnifying glass icon provides immediate recognition of search functionality
- **Clear Button**: Optional clear button appears when there's input text
- **Controlled Component**: Full control over the search value and change handling
- **Keyboard Support**: Custom onKeyDown handler for search submission or other interactions
- **Responsive**: Flexbox-based layout that adapts to container width
- **Consistent Styling**: Built with the Tennr design system tokens

## When to Use

Use the Searchbar component when you need to:

1. **Filter Content**: Allow users to search and filter through lists, tables, or collections

   - Document lists
   - User directories
   - Product catalogs
   - Log entries
   - Navigation menus

2. **Quick Find**: Provide a way to quickly locate specific items

   - Settings panels
   - Command palettes
   - Dropdown menus with search
   - Select inputs with filtering
   - Sidebar navigation

3. **Real-time Filtering**: Filter results as the user types

   - Autocomplete interfaces
   - Live search results
   - Type-ahead suggestions
   - Dynamic filtering

4. **Search Forms**: Create dedicated search interfaces

   - Page-level search bars
   - Modal search dialogs
   - Header search components
   - Sidebar search widgets

## When NOT to Use

Avoid using the Searchbar component when:

1. **Complex Search Forms**: You need multiple input fields or advanced search options

   - Advanced search with multiple criteria (use a form with multiple inputs)
   - Date range searches (use date pickers)
   - Multi-field searches (use a dedicated search form)

2. **Non-Search Text Input**: The input is not related to search functionality

   - Form fields (use Input component)
   - Comments or notes (use Textarea component)
   - Password fields (use Input with type="password")
   - Email fields (use Input with type="email")

3. **Server-Side Search Only**: Search only triggers on form submission

   - Traditional form submissions (use a form with Input and Button)
   - Search that requires explicit user action

4. **No Clear Needed**: Users shouldn't clear the entire search at once

   - Required search fields
   - Pre-populated search terms that shouldn't be cleared

5. **Global Search**: For application-wide search with special behaviors

   - Command palettes (use a dedicated Command component)
   - Spotlight-style search (use a modal-based search)

## Usage Example

```tsx
import { useState } from "react";

import { Searchbar } from "@tennr/lasso/searchbar";

function MyComponent() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Searchbar
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Search documents..."
      onClear={() => setSearchValue("")}
    />
  );
}
```

### Example with Keyboard Submit

```tsx
import { useState } from "react";

import { Searchbar } from "@tennr/lasso/searchbar";

function SearchWithSubmit() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
    // Perform search operation
  };

  return (
    <Searchbar
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Press Enter to search..."
      onClear={() => setSearchValue("")}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
    />
  );
}
```

### Example with Custom Styling

```tsx
import { Searchbar } from "@tennr/lasso/searchbar";

<Searchbar
  value={searchValue}
  onChange={setSearchValue}
  placeholder="Search..."
  className="max-w-md"
  inputClassName="bg-muted border-none"
  onClear={() => setSearchValue("")}
/>;
```

## Props Reference

### SearchbarProps

- `value`: `string` - **Required**. The current search value (controlled)
- `onChange`: `(value: string) => void` - **Required**. Callback fired when the input value changes
- `placeholder`: `string` - Placeholder text for the input. Defaults to "Search..."
- `className`: `string` - Additional CSS classes for the container wrapper
- `inputClassName`: `string` - Additional CSS classes for the input element
- `onClear`: `() => void` - Callback fired when the clear button is clicked. If provided, shows a clear button when there's input
- `onKeyDown`: `(e: React.KeyboardEvent<HTMLInputElement>) => void` - Callback for keyboard events on the input

## Anatomy

The Searchbar consists of:

1. **Container**: A flex container that holds all elements with relative positioning
2. **Search Icon**: A magnifying glass icon positioned absolutely on the left
3. **Input**: The actual input field with left padding to accommodate the icon
4. **Clear Button**: An optional X button that appears on the right when `onClear` is provided and there's input

## Accessibility

The Searchbar component includes accessibility considerations:

- Uses semantic HTML input element
- Placeholder text provides context when empty
- Clear button is a proper button element for keyboard accessibility
- Icons are decorative and don't require alt text
- Input can be focused via keyboard navigation

For enhanced accessibility, consider adding:

```tsx
<div role="search">
  <Searchbar
    value={searchValue}
    onChange={setSearchValue}
    aria-label="Search documents"
  />
</div>
```

## Related Components

- For general text input, use the `Input` component
- For command palette-style search, use a `Command` component
- For dropdown with search, use a `Combobox` or searchable `Select` component
- For form-based search with a submit button, combine `Input` with `Button`
