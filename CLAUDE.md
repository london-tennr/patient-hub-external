# CLAUDE.md - Admin Visualizer Development Rules

## Core Philosophy

This is a patient EHR admin tool built with Next.js 16, React 19, and the @tennr/lasso component library. All UI development must prioritize consistency, maintainability, and adherence to our design system.

**Before creating ANY new UI, invoke the `frontend-design` skill.**

---

## Component Rules

### REQUIRED: Use @tennr/lasso Components

All primitive UI elements MUST come from the Lasso component library. Never recreate primitives that already exist.

**Available primitives include:**
- Layout: Card, Stack, Separator, Sheet, Drawer, Tabs, Accordion, Collapsible
- Forms: Input, Textarea, Select, Combobox, Checkbox, Radio-Group, Switch, DatePicker, Form, FormBuilder
- Buttons: Button, ActionButton, Toggle, ToggleGroup
- Feedback: Dialog, AlertDialog, Popover, Tooltip, HoverCard, Badge, Progress, Skeleton
- Data: DataTable, Table, Pagination, FilterGroup
- Navigation: Breadcrumb, DropdownMenu, ContextMenu, Sidebar, NavigationMenu

### When Custom Components Are Allowed

You MAY create experience-specific components (e.g., `PatientHeader`, `OrderStepper`) when:
1. The component is specific to this application's domain
2. The component is composed primarily of Lasso primitives
3. No equivalent exists in the Lasso library

**You must NEVER create:**
- Custom buttons, inputs, selects, or form controls
- Custom dialogs, popovers, or tooltips
- Custom cards, badges, or layout primitives

---

## Styling Rules

### REQUIRED: Use Tailwind Classes with Theme Tokens

All styling must use Tailwind utility classes that reference our semantic theme tokens. Never use arbitrary values when a token exists.

**Semantic Background Tokens (`bg-*`):**
- Base: `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-tertiary`, `bg-bg-quartiary`, `bg-bg-white`
- Hover states: `bg-bg-primary-hover`, `bg-bg-secondary-hover`, `bg-bg-tertiary-hover`, `bg-bg-quartiary-hover`
- Solid: `bg-bg-black-solid`, `bg-bg-black-solid-hover`
- Disabled: `bg-bg-disabled`, `bg-bg-disabled-alt`
- AI/Accent: `bg-bg-ai-primary`, `bg-bg-ai-solid`
- Error: `bg-bg-error-primary`, `bg-bg-error-secondary`
- Success: `bg-bg-success-primary`, `bg-bg-success-secondary`
- Warning: `bg-bg-warning-primary`, `bg-bg-warning-secondary`
- Info: `bg-bg-info-primary`, `bg-bg-info-secondary`
- Brand: `bg-bg-brand-primary`, `bg-bg-brand-secondary`

**Semantic Text Tokens (`text-*`):**
- Base: `text-text-primary`, `text-text-secondary`, `text-text-tertiary`
- States: `text-text-disabled`, `text-text-placeholder`, `text-text-white`, `text-text-on-dark-color`
- AI/Accent: `text-text-ai-primary`, `text-text-ai-secondary`
- Error: `text-text-error-primary`, `text-text-error-secondary`
- Success: `text-text-success-primary`, `text-text-success-secondary`
- Warning: `text-text-warning-primary`, `text-text-warning-secondary`
- Info: `text-text-info-primary`, `text-text-info-secondary`

**Semantic Icon Tokens (`text-*` for icon colors):**
- Base: `text-icon-primary`, `text-icon-secondary`, `text-icon-tertiary`
- States: `text-icon-disabled`, `text-icon-white`, `text-icon-on-dark-color`
- Semantic: `text-icon-error-primary`, `text-icon-success-primary`, `text-icon-warning-primary`, `text-icon-info-primary`

**Semantic Border Tokens (`border-*`):**
- Base: `border-border-primary`, `border-border-secondary`, `border-border-tertiary`
- States: `border-border-primary-solid`, `border-border-disabled`, `border-border-focus-ring`
- AI/Accent: `border-border-ai-primary`, `border-border-ai-secondary`
- Error: `border-border-error-primary`, `border-border-error-secondary`
- Success: `border-border-success-primary`, `border-border-success-secondary`
- Warning: `border-border-warning-primary`, `border-border-warning-secondary`
- Info: `border-border-info-primary`, `border-border-info-secondary`
- Brand: `border-border-brand-primary`, `border-border-brand-secondary`

**Legacy tokens (still available but prefer new semantic tokens):**
- `bg-background`, `bg-card`, `bg-muted`, `bg-accent`, `bg-destructive`
- `text-foreground`, `text-muted-foreground`, `text-destructive`
- `border-border`, `text-primary`, `bg-primary`, `text-secondary`, `bg-secondary`

**DO:**
```tsx
<div className="bg-bg-tertiary text-text-secondary rounded-md p-4">
<div className="bg-bg-error-primary text-text-error-primary border border-border-error-secondary">
<Badge variant="destructive">Error</Badge>
```

**DON'T:**
```tsx
<div className="bg-gray-100 text-gray-500 rounded-md p-4">
<div style={{ backgroundColor: '#f5f5f5' }}>
```

### FORBIDDEN: Inline Styles

Inline styles (`style={{}}`) are NOT allowed without explicit user approval.

Before using any inline style, you MUST:
1. Explain why Tailwind classes cannot achieve the result
2. Ask for permission
3. Wait for approval before implementing

This applies even for dynamic values. If you need dynamic styling, ask first.

### Use the `cn` Utility for Conditional Classes

```tsx
import { cn } from '@tennr/lasso/utils/cn';

<div className={cn(
  'px-4 py-2 rounded-md',
  isActive && 'bg-primary text-primary-foreground',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>
```

---

## File Structure & Naming Conventions

### File Naming: kebab-case

All files use kebab-case:
- Components: `patient-header.tsx`, `order-notes.tsx`
- Hooks: `use-search.ts`, `use-patient.ts`
- Types: `patient.ts`, `order.ts`

### Component Naming: PascalCase

Exported components use PascalCase:
```tsx
// File: components/patient/patient-header.tsx
export function PatientHeader({ patient }: PatientHeaderProps) { ... }
```

### Directory Structure: Feature-Based

Organize by domain/feature, not by component type:

```
src/
├── app/                    # Next.js pages
│   └── patients/[id]/
│       ├── page.tsx
│       └── documents/page.tsx
├── components/             # By feature domain
│   ├── patient/
│   │   ├── patient-header.tsx
│   │   ├── patient-tabs.tsx
│   │   └── demographics/
│   │       └── demographics-form.tsx
│   ├── order/
│   │   └── order-header.tsx
│   └── search/
│       └── search-modal.tsx
└── types/
    ├── patient.ts
    └── order.ts
```

### Named Exports Only

Always use named exports, never default exports:

**DO:**
```tsx
export function PatientHeader() { ... }
```

**DON'T:**
```tsx
export default function PatientHeader() { ... }
```

---

## Import Patterns

### Lasso Components: Direct Path Imports

Import components from their specific paths, not from a barrel export:

**DO:**
```tsx
import { Button } from '@tennr/lasso/button';
import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { Dialog, DialogContent, DialogHeader } from '@tennr/lasso/dialog';
import { cn } from '@tennr/lasso/utils/cn';
```

**DON'T:**
```tsx
import { Button, Card, Dialog } from '@tennr/lasso';
```

### Icons: Phosphor Icons

Use Phosphor Icons for all iconography:

```tsx
import { Check, Pencil, ArrowLeft, X } from '@phosphor-icons/react';

<Button>
  <Check className="w-4 h-4 mr-2" />
  Save
</Button>
```

### Type Imports

Use `import type` for type-only imports:

```tsx
import type { Patient, PatientInsurance } from '@/types/patient';
import type { Order, OrderStatus } from '@/types/order';
```

### Import Order

Organize imports in this order:
1. React/Next.js imports
2. Third-party libraries
3. @tennr/lasso components
4. Local components
5. Types
6. Utilities/hooks

```tsx
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from '@phosphor-icons/react';
import { Button } from '@tennr/lasso/button';
import { Card } from '@tennr/lasso/card';
import { PatientHeader } from '@/components/patient/patient-header';
import type { Patient } from '@/types/patient';
import { cn } from '@tennr/lasso/utils/cn';
```

---

## Testing Requirements

### When to Write Tests

Write tests for:
- Custom hooks with business logic
- Utility functions
- Complex component logic (state machines, calculations)
- Form validation schemas

### Test File Location

Place test files adjacent to the code they test:

```
components/
├── patient/
│   ├── patient-header.tsx
│   └── patient-header.test.tsx
hooks/
├── use-search.ts
└── use-search.test.ts
```

### Test File Naming

Use `.test.tsx` for component tests, `.test.ts` for utilities/hooks:

```
demographics-form.test.tsx
use-patient.test.ts
validation-utils.test.ts
```

### Test Structure

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PatientHeader } from './patient-header';

describe('PatientHeader', () => {
  it('displays patient name and MRN', () => {
    render(<PatientHeader patient={mockPatient} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('MRN: 12345')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const onEdit = vi.fn();
    render(<PatientHeader patient={mockPatient} onEdit={onEdit} />);

    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalled();
  });
});
```

---

## UI Creation Workflow

### REQUIRED: Invoke frontend-design Skill

Before creating any new UI (pages, components, features), you MUST invoke the `frontend-design` skill:

```
/frontend-design
```

This ensures:
- Designs follow our visual language
- Proper use of spacing, typography, and color
- Consistent patterns across the application

### Client Components

Use the `'use client'` directive for components that need interactivity:

```tsx
'use client';

import { useState } from 'react';
```

### Props Interface Pattern

Define props interfaces above the component:

```tsx
interface PatientHeaderProps {
  patient: Patient;
  onEdit?: () => void;
  className?: string;
}

export function PatientHeader({ patient, onEdit, className }: PatientHeaderProps) {
  // ...
}
```

### State Patterns

Use discriminated unions for complex state:

```tsx
type FormState =
  | { status: 'idle' }
  | { status: 'editing'; draft: FormData }
  | { status: 'saving' }
  | { status: 'error'; message: string };
```

Use Record types for variant mappings:

```tsx
const statusVariant: Record<OrderStatus, BadgeVariant> = {
  pending: 'outline',
  active: 'secondary',
  complete: 'default',
};
```
