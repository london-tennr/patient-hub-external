# Lasso Utils

## Overview

The Lasso Utils module provides essential utility functions for the Tennr design system. These utilities handle common patterns used throughout the component library, such as CSS class name management. The utils are designed to be lightweight, type-safe, and optimized for Tailwind CSS workflows.

## What It Is

The utils module contains helper functions that support Lasso components:

- **cn**: A utility function for merging and conditionally applying CSS class names with intelligent Tailwind CSS class conflict resolution

### Key Features

- **Tailwind-Optimized**: Built specifically for Tailwind CSS projects with proper class conflict resolution
- **Type-Safe**: Full TypeScript support with proper type definitions
- **Lightweight**: Minimal dependencies (clsx + tailwind-merge)
- **Flexible**: Accepts various input types (strings, arrays, objects, conditionals)
- **Composable**: Designed to work seamlessly with all Lasso components

## Utilities Reference

### cn (Class Name Merger)

The `cn` function combines [clsx](https://github.com/lukeed/clsx) for conditional class name construction with [tailwind-merge](https://github.com/dcastil/tailwind-merge) for intelligent Tailwind CSS class conflict resolution.

#### What It Does

1. **Combines Class Names**: Merges multiple class name inputs into a single string
2. **Handles Conditionals**: Supports conditional class application via object syntax
3. **Resolves Conflicts**: Automatically resolves Tailwind CSS class conflicts (e.g., `p-2` and `p-4` → `p-4`)
4. **Filters Falsy Values**: Removes `false`, `null`, `undefined`, and empty strings

#### When to Use

Use `cn` when you need to:

1. **Merge Component Classes**: Combine base styles with user-provided className props

   ```tsx
   function Button({ className, ...props }) {
     return (
       <button
         className={cn("px-4 py-2 bg-primary text-white", className)}
         {...props}
       />
     );
   }
   ```

2. **Apply Conditional Styles**: Toggle classes based on component state

   ```tsx
   <div
     className={cn("border rounded", {
       "border-red-500": hasError,
       "border-green-500": isValid,
       "opacity-50": isDisabled,
     })}
   />
   ```

3. **Override Default Styles**: Let consumer classes properly override defaults

   ```tsx
   // Base: "p-4 text-sm"
   // Override: "p-8"
   // Result: "p-8 text-sm" (p-4 is removed, not duplicated)
   cn("p-4 text-sm", "p-8");
   ```

4. **Combine Multiple Sources**: Merge classes from variants, props, and state

   ```tsx
   cn(
     baseClasses,
     sizeVariants[size],
     colorVariants[color],
     isActive && "ring-2 ring-primary",
     className,
   );
   ```

#### When NOT to Use

Avoid using `cn` when:

1. **Static Classes Only**: If classes never change, use a plain string

   ```tsx
   // Just use a string literal
   <div className="flex items-center gap-2" />
   ```

2. **Non-Tailwind Projects**: For non-Tailwind CSS, use `clsx` directly instead

3. **Performance-Critical Loops**: For rendering thousands of items, consider pre-computing class strings

4. **Simple Concatenation**: If just joining strings without conflicts, template literals work fine

   ```tsx
   // Simple case - template literal is fine
   <div className={`icon ${iconName}`} />
   ```

## Usage Examples

### Basic Usage

```tsx
import { cn } from "@tennr/lasso/utils";

// Simple merge
cn("px-4 py-2", "bg-blue-500");
// → "px-4 py-2 bg-blue-500"

// Conflict resolution
cn("px-4 py-2", "px-8");
// → "py-2 px-8" (px-4 is replaced)

// Conditional classes
cn("base-class", isActive && "active-class");
// → "base-class active-class" (if isActive is true)
// → "base-class" (if isActive is false)

// Object syntax
cn("base", { "text-red-500": hasError, "text-green-500": !hasError });
// → "base text-red-500" (if hasError)
// → "base text-green-500" (if !hasError)
```

### Component Patterns

```tsx
import { cn } from "@tennr/lasso/utils";

// Forwarding className to a component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined";
}

function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-4",
        variant === "default" && "bg-white shadow-md",
        variant === "outlined" && "border border-gray-200",
        className,
      )}
      {...props}
    />
  );
}

// Usage - consumer can override defaults
<Card className="p-8" />; // p-4 is replaced with p-8
```

### Array and Mixed Inputs

```tsx
import { cn } from "@tennr/lasso/utils";

const classes = cn(
  // String
  "base-class",
  // Array
  ["class-1", "class-2"],
  // Conditional
  isLoading && "animate-pulse",
  // Object
  { "opacity-50": isDisabled },
  // Undefined/null (ignored)
  undefined,
  null,
);
```

## API Reference

### cn(...inputs: ClassValue[]): string

Merges class names with Tailwind CSS conflict resolution.

#### Parameters

- `...inputs`: `ClassValue[]` - Any number of class name inputs

#### ClassValue Types

The function accepts the following input types (from clsx):

- `string` - Class name string
- `string[]` - Array of class names
- `Record<string, boolean | undefined>` - Object with class names as keys and boolean conditions as values
- `undefined | null | false` - Falsy values are ignored

#### Returns

- `string` - Merged class names with conflicts resolved

## How It Works

1. **clsx Processing**: First, all inputs are processed by clsx which:

   - Joins strings and arrays
   - Includes object keys where values are truthy
   - Filters out falsy values

2. **tailwind-merge Processing**: Then, tailwind-merge:
   - Parses Tailwind class names
   - Identifies conflicting utilities (e.g., multiple padding classes)
   - Keeps only the last occurrence of conflicting classes
   - Preserves non-conflicting classes in order

## Related

- [clsx](https://github.com/lukeed/clsx) - Tiny utility for constructing className strings
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind CSS classes without style conflicts
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
