# FilterGroup Component

## Overview

The FilterGroup component is a flexible, composable filtering system that allows users to build complex filter queries through an intuitive pill-based interface. Each filter consists of a category pill (defining what to filter) and a value pill (defining the filter criteria). It supports multiple filter variants including searchable dropdowns, sliders for ranges, and multi-select checkboxes. Built for the Tennr design system with consistent styling and accessibility.

## What It Is

The FilterGroup component consists of several sub-components that work together:

- **FilterGroup** (root): The container that manages filter state and renders filter instances
- **CategorySelector**: A searchable popover for selecting filter categories
- **CategoryPill**: Displays the selected filter category with a remove button
- **ValuePill**: Displays and allows editing of the filter value through different variant UIs
- **CommandVariant**: A searchable single-select dropdown for selecting values
- **SliderVariant**: A range slider for numeric filters
- **CheckboxVariant**: A multi-select checkbox list for selecting multiple values

### Key Features

- **Multiple Filter Types**: Supports command (single-select), slider (range), and checkbox (multi-select) variants
- **Dynamic State Management**: Fully controlled component with external state management
- **Multiple Instances**: Allows multiple filters of the same category
- **Searchable Options**: Command variants include built-in search functionality
- **Value Filtering**: Automatically excludes already-selected values from options
- **Responsive Layout**: Wraps filters naturally on smaller screens
- **Pill-Based UI**: Clear visual hierarchy with category and value pills

## When to Use

Use the FilterGroup component when you need to:

1. **Complex Data Filtering**: Build filter interfaces for tables, lists, or data grids

   - Product catalogs
   - User directories
   - Document searches
   - Task/issue trackers
   - Log viewers

2. **Dynamic Query Building**: Allow users to construct multi-criteria searches

   - Search pages
   - Report builders
   - Data exploration tools
   - Advanced search interfaces

3. **Multiple Filter Criteria**: Support filtering by multiple attributes simultaneously

   - Assignee + Priority + Status
   - Date range + Category + Tags
   - Price range + Brand + Color

4. **Mixed Filter Types**: Combine different input types for different criteria

   - Dropdowns for categories
   - Sliders for numeric ranges
   - Checkboxes for multi-select options

5. **Progressive Filter Building**: Let users add filters one at a time as needed

   - "Add filter" workflows
   - Saved search interfaces
   - Custom view builders

## When NOT to Use

Avoid using the FilterGroup component when:

1. **Simple Single Filters**: You only need one or two basic filters

   - Single dropdown (use a Select component)
   - Single search box (use an Input component)
   - Toggle between two states (use a Switch or SegmentedControl)

2. **Predefined Filter Sets**: All filters should always be visible

   - Dashboard filter panels (use individual form controls)
   - Simple sort options (use a Select component)
   - Quick filter buttons (use ButtonGroup or ToggleGroup)

3. **Static Filters**: The filter criteria are fixed and don't need the add/remove functionality

   - Form field filtering
   - Static faceted search
   - Sidebar filter panels

4. **Real-Time Search**: You need instant filtering as the user types

   - Search-as-you-type (use Command or Combobox)
   - Autocomplete fields
   - Live data filtering

5. **Mobile-First Interfaces**: The pill-based UI may be too compact for touch

   - Mobile filter sheets (use a BottomSheet with form controls)
   - Touch-optimized interfaces
   - Small screen filtering

6. **Simple Sorting**: You just need to change sort order

   - Table column sorting (use built-in table sorting)
   - List reordering (use dropdown or buttons)

## Usage Example

```tsx
import {
  FilterGroup,
  type FilterCategoryType,
  type FilterState,
} from "@tennr/lasso/filter-group";

function MyComponent() {
  const [filterState, setFilterState] = useState<FilterState>([]);

  const filters: FilterCategoryType[] = [
    {
      id: "assignee",
      label: "Assignee",
      variant: "command",
      childVariant: "command",
      values: [
        { id: "john", label: "John Doe" },
        { id: "jane", label: "Jane Smith" },
      ],
    },
    {
      id: "priority",
      label: "Priority",
      variant: "command",
      childVariant: "command",
      values: [
        { id: "high", label: "High" },
        { id: "medium", label: "Medium" },
        { id: "low", label: "Low" },
      ],
    },
    {
      id: "tags",
      label: "Tags",
      variant: "command",
      childVariant: "checkbox",
      values: [
        { id: "bug", label: "Bug" },
        { id: "feature", label: "Feature" },
      ],
    },
  ];

  return (
    <FilterGroup
      filters={filters}
      state={filterState}
      onChange={setFilterState}
    />
  );
}
```

### Example with Slider Filter

```tsx
const rangeFilters: FilterCategoryType[] = [
  {
    id: "price",
    label: "Price",
    variant: "slider",
    childVariant: "slider",
    values: [],
    min: 0,
    max: 1000,
    step: 10,
    formatLabel: (value) => `$${value}`,
  },
  {
    id: "rating",
    label: "Rating",
    variant: "slider",
    childVariant: "slider",
    values: [],
    min: 1,
    max: 5,
    step: 0.5,
  },
];
```

### Example with Pre-populated Filters

```tsx
const [filterState, setFilterState] = useState<FilterState>([
  { id: "1", filterId: "assignee", value: "jane" },
  { id: "2", filterId: "priority", value: "high" },
  { id: "3", filterId: "tags", value: ["bug", "feature"] },
]);
```

## Props Reference

### FilterGroup

- `filters`: `FilterCategoryType[]` - **Required**. Array of available filter categories
- `state`: `FilterState` - **Required**. Current filter state (array of FilterInstance)
- `onChange`: `(state: FilterState) => void` - **Required**. Callback when filter state changes

### FilterCategoryType

- `id`: `string` - Unique identifier for the filter category
- `label`: `string` - Display label shown in the category pill
- `variant`: `"command" | "slider" | "checkbox"` - Variant for the category selector
- `childVariant`: `"command" | "slider" | "checkbox"` - Variant for the value selector
- `values`: `FilterValue[]` - Array of possible values for command/checkbox variants
- `min`: `number` - Minimum value for slider variant
- `max`: `number` - Maximum value for slider variant
- `step`: `number` - Step increment for slider variant
- `formatLabel`: `(value: number) => string` - Custom label formatter for slider values
- `dependency`: `FilterDependency` - Optional dependency configuration

### FilterValue

- `id`: `string` - Unique identifier for the value
- `label`: `string` - Display label for the value

### FilterInstance

- `id`: `string` - Unique identifier for the filter instance
- `filterId`: `string` - References the FilterCategoryType.id
- `value`: `string | string[] | [number, number] | undefined` - The selected value(s)

### FilterState

Type alias for `FilterInstance[]` - represents the complete filter state.

## Filter Variants

### Command Variant

A searchable single-select dropdown. Best for:

- User selection (assignees, authors)
- Status or priority selection
- Category selection

### Slider Variant

A range slider for numeric values. Best for:

- Price ranges
- Date ranges
- Quantity filters
- Rating filters

### Checkbox Variant

A multi-select checkbox list. Best for:

- Tags or labels
- Multiple status selection
- Feature flags
- Category multi-select

## State Management

The FilterGroup is a fully controlled component:

1. **Adding Filters**: Click "Add a filter" → select category → select value
2. **Editing Values**: Click the value pill to change the selected value
3. **Removing Filters**: Click the X on the category pill
4. **Clearing Values**: Click the X on the value pill (keeps the filter, clears value)

The component prevents adding new filters until all existing filters have values.

## Accessibility

The FilterGroup component includes accessibility features:

- Keyboard navigation through filter options
- Screen reader support via proper ARIA attributes
- Focus management when opening/closing popovers
- Clear visual indicators for interactive elements

## Related Components

- For simple single-select filtering, use the `Select` or `Combobox` component
- For search functionality, use the `Command` component
- For toggle-based filtering, use `ToggleGroup` or `SegmentedControl`
- For form-based filters, use individual form controls with `Form`
