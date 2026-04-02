/**
 * Props for the Searchbar component.
 *
 * @example
 * ```tsx
 * <Searchbar
 *   value={searchValue}
 *   onChange={setSearchValue}
 *   placeholder="Search documents..."
 *   onClear={() => setSearchValue("")}
 * />
 * ```
 */
export interface SearchbarProps {
    /** The current search value. Required for controlled component behavior. */
    value: string;
    /** Callback fired when the input value changes. Receives the new value string. */
    onChange: (value: string) => void;
    /** Placeholder text for the input. Defaults to "Search...". */
    placeholder?: string;
    /** Additional CSS classes for the container wrapper. */
    className?: string;
    /** Callback fired when the clear button is clicked. If provided, shows a clear button when there's input. */
    onClear?: () => void;
    /** Additional CSS classes for the input element. */
    inputClassName?: string;
    /** Callback for keyboard events on the input. Useful for handling Enter key to submit search. */
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
/**
 * Searchbar Component
 *
 * A styled input field designed specifically for search functionality. Features a magnifying
 * glass icon on the left, an optional clear button on the right, and consistent styling for
 * the Tennr design system. The component is controlled, requiring external state management
 * for the search value.
 *
 * @see [Lasso Searchbar README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/searchbar/README.md)
 *
 * @example
 * ```tsx
 * const [searchValue, setSearchValue] = useState("");
 *
 * <Searchbar
 *   value={searchValue}
 *   onChange={setSearchValue}
 *   placeholder="Search..."
 *   onClear={() => setSearchValue("")}
 * />
 * ```
 */
export declare function Searchbar({ value, onChange, placeholder, className, onClear, inputClassName, onKeyDown, }: SearchbarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=searchbar.d.ts.map