"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { cn } from "../utils/cn";
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
export function Searchbar({ value, onChange, placeholder = "Search...", className, onClear, inputClassName, onKeyDown, }) {
    return (_jsxs("div", { className: cn("flex items-center w-full h-10 relative shrink-0 min-w-0 flex-1", className), children: [_jsx(MagnifyingGlass, { className: "text-muted-foreground size-4 absolute left-2 top-1/2 -translate-y-1/2 z-10" }), _jsx(Input, { placeholder: placeholder, value: value, onChange: (event) => onChange(event.target.value), className: cn("absolute w-full h-full pl-8 text-sm", "bg-white border border-[#e5e2db] rounded-[4px]", "shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06),inset_0_1px_3px_0_rgba(0,0,0,0.04)]", "focus-visible:shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06),inset_0_1px_3px_0_rgba(0,0,0,0.04),0_0_0_2px_rgba(0,0,0,0.05)]", onClear && "pr-8", inputClassName), onKeyDown: onKeyDown }), onClear && value.length > 0 && (_jsx(Button, { variant: "ghost", size: "icon", className: "text-muted-foreground size-4 absolute right-2 top-1/2 -translate-y-1/2 z-10", onClick: onClear, children: _jsx(X, { className: "size-4" }) }))] }));
}
