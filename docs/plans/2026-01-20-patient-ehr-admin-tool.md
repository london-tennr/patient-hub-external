# Patient EHR Admin Tool Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an internal admin tool for Tennr's CSX team to manage patient referrals (orders) without switching to customer EHRs.

**Architecture:** Next.js App Router with @tennr/lasso component library. Command-palette search as entry point, patient profile with tabbed navigation (Overview, Demographics, Insurance, Documents, Orders). All data syncs bidirectionally with customer EHRs via TOM.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, @tennr/lasso components (Radix UI primitives), Framer Motion

---

## Completion Criteria

When ALL phases are complete:
- Search modal works with keyboard navigation (Cmd+K)
- Patient profile displays with persistent header
- All 5 tabs implemented (Overview, Demographics, Insurance, Documents, Orders)
- Order detail view with stage progression and notes
- All components follow Lasso conventions
- Build passes with no TypeScript errors
- Output: <promise>PATIENT_EHR_COMPLETE</promise>

---

## Phase 1: Search (Command Palette)

Primary entry point. Raycast/Linear-style search modal.

### Task 1.1: Create Search Types

**Files:**
- Create: `app/src/types/patient.ts`
- Create: `app/src/types/order.ts`
- Create: `app/src/types/search.ts`

**Step 1: Create patient type**

```typescript
// app/src/types/patient.ts
export interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  primaryInsurance?: Insurance;
  secondaryInsurance?: Insurance;
  syncStatus: {
    ehrSystem: 'BrightTree' | 'WeInfuse' | 'Niko';
    lastSynced: string;
  };
}

export interface Insurance {
  carrier: string;
  plan: string;
  memberId: string;
  groupNumber: string;
  policyHolder: string;
  relationship: string;
  eligibilityStatus: 'verified' | 'pending' | 'failed';
  lastVerified?: string;
}
```

**Step 2: Create order type**

```typescript
// app/src/types/order.ts
export type OrderStage = 'validation' | 'eligibility' | 'qualification' | 'complete';
export type OrderSubStatus = 'in_progress' | 'blocked' | 'awaiting_response' | 'completed';

export interface Order {
  id: string;
  patientId: string;
  patientName: string;
  orderType: string;
  item: string;
  stage: OrderStage;
  subStatus: OrderSubStatus;
  dateCreated: string;
  lastUpdated: string;
  documents: OrderDocument[];
  notes: OrderNote[];
}

export interface OrderDocument {
  id: string;
  name: string;
  type: 'sleep_study' | 'prior_auth' | 'cmn' | 'other';
  dateAdded: string;
  source: 'ehr' | 'tennr';
  url: string;
}

export interface OrderNote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}
```

**Step 3: Create search types**

```typescript
// app/src/types/search.ts
import type { Patient } from './patient';
import type { Order } from './order';

export interface PatientSearchResult {
  type: 'patient';
  patient: Patient;
  currentOrderStage?: string;
}

export interface OrderSearchResult {
  type: 'order';
  order: Order;
}

export type SearchResult = PatientSearchResult | OrderSearchResult;

export interface SearchState {
  query: string;
  results: SearchResult[];
  recentSearches: SearchResult[];
  isLoading: boolean;
  selectedIndex: number;
}
```

**Step 4: Commit**

```bash
git add app/src/types/
git commit -m "feat: add patient, order, and search types"
```

---

### Task 1.2: Create Search Modal Component

**Files:**
- Create: `app/src/components/search/search-modal.tsx`
- Create: `app/src/components/search/search-result-card.tsx`
- Create: `app/src/components/search/use-search.ts`

**Step 1: Create search hook**

```typescript
// app/src/components/search/use-search.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import type { SearchResult, SearchState } from '@/types/search';

// Mock data for development
const mockPatients = [
  {
    type: 'patient' as const,
    patient: {
      id: '1',
      mrn: 'MRN001',
      firstName: 'John',
      lastName: 'Smith',
      dob: '1985-03-15',
      phone: '555-0101',
      email: 'john.smith@email.com',
      address: { street: '123 Main St', city: 'Austin', state: 'TX', zip: '78701' },
      primaryInsurance: {
        carrier: 'Blue Cross',
        plan: 'PPO Gold',
        memberId: 'BC123456',
        groupNumber: 'GRP001',
        policyHolder: 'John Smith',
        relationship: 'self',
        eligibilityStatus: 'verified' as const,
        lastVerified: '2026-01-15',
      },
      syncStatus: { ehrSystem: 'BrightTree' as const, lastSynced: '2026-01-20T10:30:00Z' },
    },
    currentOrderStage: 'Eligibility & Benefits',
  },
];

const mockOrders = [
  {
    type: 'order' as const,
    order: {
      id: 'ORD001',
      patientId: '1',
      patientName: 'John Smith',
      orderType: 'DME',
      item: 'CPAP Machine',
      stage: 'eligibility' as const,
      subStatus: 'in_progress' as const,
      dateCreated: '2026-01-10',
      lastUpdated: '2026-01-19',
      documents: [],
      notes: [],
    },
  },
];

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    recentSearches: [],
    isLoading: false,
    selectedIndex: 0,
  });

  const search = useCallback((query: string) => {
    setState(prev => ({ ...prev, query, isLoading: true, selectedIndex: 0 }));

    // Simulate search delay
    setTimeout(() => {
      const q = query.toLowerCase();
      const patientResults = mockPatients.filter(
        p =>
          p.patient.firstName.toLowerCase().includes(q) ||
          p.patient.lastName.toLowerCase().includes(q) ||
          p.patient.mrn.toLowerCase().includes(q) ||
          p.patient.primaryInsurance?.memberId.toLowerCase().includes(q)
      );
      const orderResults = mockOrders.filter(
        o =>
          o.order.id.toLowerCase().includes(q) ||
          o.order.patientName.toLowerCase().includes(q) ||
          o.order.item.toLowerCase().includes(q)
      );

      setState(prev => ({
        ...prev,
        results: [...patientResults, ...orderResults],
        isLoading: false,
      }));
    }, 150);
  }, []);

  const selectNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedIndex: Math.min(prev.selectedIndex + 1, prev.results.length - 1),
    }));
  }, []);

  const selectPrev = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedIndex: Math.max(prev.selectedIndex - 1, 0),
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setState(prev => ({ ...prev, query: '', results: [], selectedIndex: 0 }));
  }, []);

  return {
    ...state,
    search,
    selectNext,
    selectPrev,
    clearSearch,
  };
}
```

**Step 2: Create search result card**

```typescript
// app/src/components/search/search-result-card.tsx
'use client';

import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import type { SearchResult } from '@/types/search';

interface SearchResultCardProps {
  result: SearchResult;
  isSelected: boolean;
  onClick: () => void;
}

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  validation: 'outline',
  eligibility: 'secondary',
  qualification: 'default',
  complete: 'default',
};

export function SearchResultCard({ result, isSelected, onClick }: SearchResultCardProps) {
  if (result.type === 'patient') {
    const { patient, currentOrderStage } = result;
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full text-left px-4 py-3 rounded-lg transition-colors',
          'hover:bg-muted/50',
          isSelected && 'bg-muted'
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              DOB: {patient.dob} · MRN: {patient.mrn}
            </p>
            {patient.primaryInsurance && (
              <p className="text-sm text-muted-foreground">
                {patient.primaryInsurance.carrier} · {patient.primaryInsurance.memberId}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline">Patient</Badge>
            {currentOrderStage && (
              <span className="text-xs text-muted-foreground">{currentOrderStage}</span>
            )}
          </div>
        </div>
      </button>
    );
  }

  const { order } = result;
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3 rounded-lg transition-colors',
        'hover:bg-muted/50',
        isSelected && 'bg-muted'
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{order.id}</p>
          <p className="text-sm text-muted-foreground">
            {order.patientName} · {order.item}
          </p>
          <p className="text-sm text-muted-foreground">Created: {order.dateCreated}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline">Order</Badge>
          <Badge variant={stageBadgeVariant[order.stage]}>
            {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
          </Badge>
        </div>
      </div>
    </button>
  );
}
```

**Step 3: Create search modal**

```typescript
// app/src/components/search/search-modal.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '@tennr/lasso/dialog';
import { Input } from '@tennr/lasso/input';
import { MagnifyingGlass, Clock } from '@phosphor-icons/react';
import { useSearch } from './use-search';
import { SearchResultCard } from './search-result-card';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPatient: (patientId: string) => void;
  onSelectOrder: (orderId: string) => void;
}

export function SearchModal({
  open,
  onOpenChange,
  onSelectPatient,
  onSelectOrder,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, results, recentSearches, isLoading, selectedIndex, search, selectNext, selectPrev, clearSearch } =
    useSearch();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      clearSearch();
    }
  }, [open, clearSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectNext();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectPrev();
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      const result = results[selectedIndex];
      if (result.type === 'patient') {
        onSelectPatient(result.patient.id);
      } else {
        onSelectOrder(result.order.id);
      }
      onOpenChange(false);
    }
  };

  const handleSelect = (index: number) => {
    const result = results[index];
    if (result.type === 'patient') {
      onSelectPatient(result.patient.id);
    } else {
      onSelectOrder(result.order.id);
    }
    onOpenChange(false);
  };

  const displayResults = query ? results : recentSearches;
  const showRecent = !query && recentSearches.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <MagnifyingGlass className="w-5 h-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={e => search(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search patients, orders, member IDs..."
            className="border-0 shadow-none focus-visible:ring-0 px-0"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {showRecent && (
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-3 h-3" />
              Recent
            </div>
          )}

          {isLoading ? (
            <div className="px-4 py-8 text-center text-muted-foreground">Searching...</div>
          ) : displayResults.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              {query ? 'No results found' : 'Start typing to search'}
            </div>
          ) : (
            <div className="space-y-1">
              {displayResults.map((result, index) => (
                <SearchResultCard
                  key={result.type === 'patient' ? result.patient.id : result.order.id}
                  result={result}
                  isSelected={index === selectedIndex}
                  onClick={() => handleSelect(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t bg-muted/30 text-xs text-muted-foreground flex items-center gap-4">
          <span>
            <kbd className="px-1 rounded bg-muted">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="px-1 rounded bg-muted">↵</kbd> select
          </span>
          <span>
            <kbd className="px-1 rounded bg-muted">esc</kbd> close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

**Step 4: Commit**

```bash
git add app/src/components/search/
git commit -m "feat: add search modal with keyboard navigation"
```

---

### Task 1.3: Add Global Search Trigger

**Files:**
- Create: `app/src/components/search/search-provider.tsx`
- Modify: `app/src/app/layout.tsx`

**Step 1: Create search provider with Cmd+K shortcut**

```typescript
// app/src/components/search/search-provider.tsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SearchModal } from './search-modal';

interface SearchContextValue {
  openSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearchTrigger() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchTrigger must be used within SearchProvider');
  }
  return context;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const openSearch = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPatient = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  const handleSelectOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <SearchContext.Provider value={{ openSearch }}>
      {children}
      <SearchModal
        open={open}
        onOpenChange={setOpen}
        onSelectPatient={handleSelectPatient}
        onSelectOrder={handleSelectOrder}
      />
    </SearchContext.Provider>
  );
}
```

**Step 2: Update layout to include search provider**

Read existing layout first, then modify to wrap with SearchProvider.

**Step 3: Commit**

```bash
git add app/src/components/search/search-provider.tsx app/src/app/layout.tsx
git commit -m "feat: add global Cmd+K search trigger"
```

---

## Phase 2: Patient Header + Tab Navigation

Shell/frame for the patient profile.

### Task 2.1: Create Patient Header Component

**Files:**
- Create: `app/src/components/patient/patient-header.tsx`

**Step 1: Create patient header**

```typescript
// app/src/components/patient/patient-header.tsx
'use client';

import { Badge } from '@tennr/lasso/badge';
import { ArrowsClockwise, MagnifyingGlass } from '@phosphor-icons/react';
import { Button } from '@tennr/lasso/button';
import { useSearchTrigger } from '@/components/search/search-provider';
import type { Patient } from '@/types/patient';

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const { openSearch } = useSearchTrigger();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">
                {patient.firstName} {patient.lastName}
              </h1>
              <Badge variant="outline">{patient.syncStatus.ehrSystem}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>DOB: {formatDate(patient.dob)}</span>
              <span>MRN: {patient.mrn}</span>
              {patient.primaryInsurance && (
                <span>
                  {patient.primaryInsurance.carrier} · {patient.primaryInsurance.memberId}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={openSearch}>
              <MagnifyingGlass className="w-4 h-4" />
              Search
              <kbd className="ml-2 text-xs bg-muted px-1 rounded">⌘K</kbd>
            </Button>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <ArrowsClockwise className="w-3 h-3" />
          <span>Last synced: {formatTime(patient.syncStatus.lastSynced)}</span>
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Commit**

```bash
git add app/src/components/patient/patient-header.tsx
git commit -m "feat: add persistent patient header component"
```

---

### Task 2.2: Create Tab Navigation

**Files:**
- Create: `app/src/components/patient/patient-tabs.tsx`
- Create: `app/src/app/patients/[id]/layout.tsx`

**Step 1: Create patient tabs**

```typescript
// app/src/components/patient/patient-tabs.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@tennr/lasso/utils/cn';

interface PatientTabsProps {
  patientId: string;
}

const tabs = [
  { name: 'Overview', href: '' },
  { name: 'Demographics', href: '/demographics' },
  { name: 'Insurance', href: '/insurance' },
  { name: 'Documents', href: '/documents' },
  { name: 'Orders', href: '/orders' },
];

export function PatientTabs({ patientId }: PatientTabsProps) {
  const pathname = usePathname();
  const basePath = `/patients/${patientId}`;

  return (
    <nav className="border-b px-6">
      <div className="flex gap-6">
        {tabs.map(tab => {
          const href = `${basePath}${tab.href}`;
          const isActive = tab.href === ''
            ? pathname === basePath
            : pathname.startsWith(href);

          return (
            <Link
              key={tab.name}
              href={href}
              className={cn(
                'py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                isActive
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

**Step 2: Create patient layout**

```typescript
// app/src/app/patients/[id]/layout.tsx
import { PatientHeader } from '@/components/patient/patient-header';
import { PatientTabs } from '@/components/patient/patient-tabs';
import type { Patient } from '@/types/patient';

// Mock patient for development
const mockPatient: Patient = {
  id: '1',
  mrn: 'MRN001',
  firstName: 'John',
  lastName: 'Smith',
  dob: '1985-03-15',
  phone: '555-0101',
  email: 'john.smith@email.com',
  address: { street: '123 Main St', city: 'Austin', state: 'TX', zip: '78701' },
  primaryInsurance: {
    carrier: 'Blue Cross',
    plan: 'PPO Gold',
    memberId: 'BC123456',
    groupNumber: 'GRP001',
    policyHolder: 'John Smith',
    relationship: 'self',
    eligibilityStatus: 'verified',
    lastVerified: '2026-01-15',
  },
  syncStatus: { ehrSystem: 'BrightTree', lastSynced: '2026-01-20T10:30:00Z' },
};

export default async function PatientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // TODO: Fetch patient from API
  const patient = mockPatient;

  return (
    <div className="min-h-screen flex flex-col">
      <PatientHeader patient={patient} />
      <PatientTabs patientId={id} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add app/src/components/patient/patient-tabs.tsx app/src/app/patients/
git commit -m "feat: add patient tab navigation and layout"
```

---

## Phase 3: Overview Tab

Landing state with at-a-glance summary.

### Task 3.1: Create Overview Tab

**Files:**
- Create: `app/src/app/patients/[id]/page.tsx`
- Create: `app/src/components/patient/overview/demographics-card.tsx`
- Create: `app/src/components/patient/overview/insurance-card.tsx`
- Create: `app/src/components/patient/overview/orders-card.tsx`
- Create: `app/src/components/patient/overview/activity-feed.tsx`

**Step 1: Create demographics card**

```typescript
// app/src/components/patient/overview/demographics-card.tsx
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Phone, Envelope, MapPin, ArrowRight } from '@phosphor-icons/react';
import type { Patient } from '@/types/patient';

interface DemographicsCardProps {
  patient: Patient;
}

export function DemographicsCard({ patient }: DemographicsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/patients/${patient.id}/demographics`}>
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Envelope className="w-4 h-4 text-muted-foreground" />
          <span>{patient.email}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
          <span>
            {patient.address.street}
            <br />
            {patient.address.city}, {patient.address.state} {patient.address.zip}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
```

**Step 2: Create insurance card**

```typescript
// app/src/components/patient/overview/insurance-card.tsx
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Badge } from '@tennr/lasso/badge';
import { ArrowRight, CheckCircle, Clock, XCircle } from '@phosphor-icons/react';
import type { Patient } from '@/types/patient';

interface InsuranceCardProps {
  patient: Patient;
}

const statusConfig = {
  verified: { icon: CheckCircle, variant: 'default' as const, label: 'Verified' },
  pending: { icon: Clock, variant: 'secondary' as const, label: 'Pending' },
  failed: { icon: XCircle, variant: 'destructive' as const, label: 'Failed' },
};

export function InsuranceCard({ patient }: InsuranceCardProps) {
  const insurance = patient.primaryInsurance;

  if (!insurance) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Insurance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No insurance on file</p>
        </CardContent>
      </Card>
    );
  }

  const status = statusConfig[insurance.eligibilityStatus];
  const StatusIcon = status.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/patients/${patient.id}/insurance`}>
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-medium">{insurance.carrier}</p>
          <p className="text-sm text-muted-foreground">{insurance.plan}</p>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Member ID:</span> {insurance.memberId}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={status.variant}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
          {insurance.lastVerified && (
            <span className="text-xs text-muted-foreground">
              Last verified: {new Date(insurance.lastVerified).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

**Step 3: Create orders card**

```typescript
// app/src/components/patient/overview/orders-card.tsx
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Badge } from '@tennr/lasso/badge';
import { ArrowRight } from '@phosphor-icons/react';
import type { Order } from '@/types/order';

interface OrdersCardProps {
  patientId: string;
  orders: Order[];
}

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  validation: 'outline',
  eligibility: 'secondary',
  qualification: 'secondary',
  complete: 'default',
};

export function OrdersCard({ patientId, orders }: OrdersCardProps) {
  const activeOrders = orders.filter(o => o.stage !== 'complete');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Orders ({activeOrders.length})</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/patients/${patientId}/orders`}>
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {activeOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active orders</p>
        ) : (
          <div className="space-y-3">
            {activeOrders.slice(0, 3).map(order => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{order.item}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <Badge variant={stageBadgeVariant[order.stage]}>
                    {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 4: Create activity feed**

```typescript
// app/src/components/patient/overview/activity-feed.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { Avatar } from '@tennr/lasso/avatar';

interface Activity {
  id: string;
  type: 'status_change' | 'note';
  description: string;
  author: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex gap-3">
                <Avatar className="w-8 h-8" fallback={activity.author.slice(0, 2).toUpperCase()} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.author} · {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 5: Create overview page**

```typescript
// app/src/app/patients/[id]/page.tsx
import { DemographicsCard } from '@/components/patient/overview/demographics-card';
import { InsuranceCard } from '@/components/patient/overview/insurance-card';
import { OrdersCard } from '@/components/patient/overview/orders-card';
import { ActivityFeed } from '@/components/patient/overview/activity-feed';
import type { Patient } from '@/types/patient';
import type { Order } from '@/types/order';

// Mock data
const mockPatient: Patient = {
  id: '1',
  mrn: 'MRN001',
  firstName: 'John',
  lastName: 'Smith',
  dob: '1985-03-15',
  phone: '555-0101',
  email: 'john.smith@email.com',
  address: { street: '123 Main St', city: 'Austin', state: 'TX', zip: '78701' },
  primaryInsurance: {
    carrier: 'Blue Cross',
    plan: 'PPO Gold',
    memberId: 'BC123456',
    groupNumber: 'GRP001',
    policyHolder: 'John Smith',
    relationship: 'self',
    eligibilityStatus: 'verified',
    lastVerified: '2026-01-15',
  },
  syncStatus: { ehrSystem: 'BrightTree', lastSynced: '2026-01-20T10:30:00Z' },
};

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    patientId: '1',
    patientName: 'John Smith',
    orderType: 'DME',
    item: 'CPAP Machine',
    stage: 'eligibility',
    subStatus: 'in_progress',
    dateCreated: '2026-01-10',
    lastUpdated: '2026-01-19',
    documents: [],
    notes: [],
  },
];

const mockActivities = [
  {
    id: '1',
    type: 'status_change' as const,
    description: 'Order ORD001 moved to Eligibility & Benefits',
    author: 'Sarah M.',
    timestamp: '2026-01-19T14:30:00Z',
  },
  {
    id: '2',
    type: 'note' as const,
    description: 'Called insurance for pre-auth. Awaiting callback.',
    author: 'Mike T.',
    timestamp: '2026-01-18T11:15:00Z',
  },
];

export default async function PatientOverviewPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DemographicsCard patient={mockPatient} />
          <InsuranceCard patient={mockPatient} />
        </div>
        <OrdersCard patientId={mockPatient.id} orders={mockOrders} />
      </div>
      <div>
        <ActivityFeed activities={mockActivities} />
      </div>
    </div>
  );
}
```

**Step 6: Commit**

```bash
git add app/src/components/patient/overview/ app/src/app/patients/
git commit -m "feat: add patient overview tab with summary cards"
```

---

## Phase 4: Insurance Tab

Primary workflow destination with eligibility verification.

### Task 4.1: Create Insurance Tab

**Files:**
- Create: `app/src/app/patients/[id]/insurance/page.tsx`
- Create: `app/src/components/patient/insurance/insurance-form.tsx`
- Create: `app/src/components/patient/insurance/verification-history.tsx`

**Step 1: Create insurance form**

```typescript
// app/src/components/patient/insurance/insurance-form.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Input } from '@tennr/lasso/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { Badge } from '@tennr/lasso/badge';
import { Pencil, FloppyDisk, X, CheckCircle, Clock, XCircle } from '@phosphor-icons/react';
import type { Insurance } from '@/types/patient';

interface InsuranceFormProps {
  insurance: Insurance | undefined;
  title: string;
  onSave: (insurance: Insurance) => Promise<void>;
  onVerify: () => Promise<void>;
}

const statusConfig = {
  verified: { icon: CheckCircle, variant: 'default' as const, label: 'Verified' },
  pending: { icon: Clock, variant: 'secondary' as const, label: 'Pending' },
  failed: { icon: XCircle, variant: 'destructive' as const, label: 'Failed' },
};

export function InsuranceForm({ insurance, title, onSave, onVerify }: InsuranceFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState<Partial<Insurance>>(insurance || {});

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData as Insurance);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      await onVerify();
    } finally {
      setIsVerifying(false);
    }
  };

  if (!insurance && !isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardAction>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Add Insurance
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No insurance on file</p>
        </CardContent>
      </Card>
    );
  }

  const status = insurance ? statusConfig[insurance.eligibilityStatus] : null;
  const StatusIcon = status?.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{title}</CardTitle>
          {status && (
            <Badge variant={status.variant}>
              {StatusIcon && <StatusIcon className="w-3 h-3 mr-1" />}
              {status.label}
            </Badge>
          )}
        </div>
        <CardAction>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                <FloppyDisk className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleVerify} disabled={isVerifying}>
                {isVerifying ? 'Verifying...' : 'Verify Eligibility'}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Carrier</label>
            {isEditing ? (
              <Input
                value={formData.carrier || ''}
                onChange={e => setFormData({ ...formData, carrier: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.carrier}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Plan</label>
            {isEditing ? (
              <Input
                value={formData.plan || ''}
                onChange={e => setFormData({ ...formData, plan: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.plan}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Member ID</label>
            {isEditing ? (
              <Input
                value={formData.memberId || ''}
                onChange={e => setFormData({ ...formData, memberId: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.memberId}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Group Number</label>
            {isEditing ? (
              <Input
                value={formData.groupNumber || ''}
                onChange={e => setFormData({ ...formData, groupNumber: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.groupNumber}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Policy Holder</label>
            {isEditing ? (
              <Input
                value={formData.policyHolder || ''}
                onChange={e => setFormData({ ...formData, policyHolder: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.policyHolder}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Relationship</label>
            {isEditing ? (
              <Select
                value={formData.relationship}
                onValueChange={value => setFormData({ ...formData, relationship: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">Self</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm capitalize">{insurance?.relationship}</p>
            )}
          </div>
        </div>
        {insurance?.lastVerified && (
          <p className="text-xs text-muted-foreground mt-4">
            Last verified: {new Date(insurance.lastVerified).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 2: Create verification history**

```typescript
// app/src/components/patient/insurance/verification-history.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';

interface VerificationAttempt {
  id: string;
  date: string;
  result: 'success' | 'failed' | 'pending';
  runBy: string;
  notes?: string;
}

interface VerificationHistoryProps {
  history: VerificationAttempt[];
}

const resultConfig = {
  success: { variant: 'default' as const, label: 'Success' },
  failed: { variant: 'destructive' as const, label: 'Failed' },
  pending: { variant: 'secondary' as const, label: 'Pending' },
};

export function VerificationHistory({ history }: VerificationHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification History</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">No verification attempts</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Run By</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map(attempt => (
                <TableRow key={attempt.id}>
                  <TableCell>{new Date(attempt.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={resultConfig[attempt.result].variant}>
                      {resultConfig[attempt.result].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{attempt.runBy}</TableCell>
                  <TableCell className="text-muted-foreground">{attempt.notes || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 3: Create insurance page**

```typescript
// app/src/app/patients/[id]/insurance/page.tsx
'use client';

import { InsuranceForm } from '@/components/patient/insurance/insurance-form';
import { VerificationHistory } from '@/components/patient/insurance/verification-history';
import type { Insurance } from '@/types/patient';

// Mock data
const mockPrimaryInsurance: Insurance = {
  carrier: 'Blue Cross',
  plan: 'PPO Gold',
  memberId: 'BC123456',
  groupNumber: 'GRP001',
  policyHolder: 'John Smith',
  relationship: 'self',
  eligibilityStatus: 'verified',
  lastVerified: '2026-01-15',
};

const mockVerificationHistory = [
  {
    id: '1',
    date: '2026-01-15T10:30:00Z',
    result: 'success' as const,
    runBy: 'Sarah M.',
    notes: 'Active coverage confirmed',
  },
  {
    id: '2',
    date: '2026-01-10T14:15:00Z',
    result: 'failed' as const,
    runBy: 'Mike T.',
    notes: 'Member ID not found - typo in original entry',
  },
];

export default function InsurancePage() {
  const handleSavePrimary = async (insurance: Insurance) => {
    // TODO: Save to API
    console.log('Saving primary insurance:', insurance);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSaveSecondary = async (insurance: Insurance) => {
    // TODO: Save to API
    console.log('Saving secondary insurance:', insurance);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleVerify = async () => {
    // TODO: Trigger verification
    console.log('Triggering verification');
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div className="space-y-6">
      <InsuranceForm
        insurance={mockPrimaryInsurance}
        title="Primary Insurance"
        onSave={handleSavePrimary}
        onVerify={handleVerify}
      />
      <InsuranceForm
        insurance={undefined}
        title="Secondary Insurance"
        onSave={handleSaveSecondary}
        onVerify={handleVerify}
      />
      <VerificationHistory history={mockVerificationHistory} />
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add app/src/components/patient/insurance/ app/src/app/patients/
git commit -m "feat: add insurance tab with edit and verification"
```

---

## Phase 5: Orders Tab + Order Detail

Second workflow with notes functionality.

### Task 5.1: Create Orders List

**Files:**
- Create: `app/src/app/patients/[id]/orders/page.tsx`
- Create: `app/src/components/patient/orders/orders-list.tsx`

**Step 1: Create orders list component**

```typescript
// app/src/components/patient/orders/orders-list.tsx
'use client';

import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';
import type { Order } from '@/types/order';

interface OrdersListProps {
  orders: Order[];
}

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  validation: 'outline',
  eligibility: 'secondary',
  qualification: 'secondary',
  complete: 'default',
};

const subStatusBadgeVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  in_progress: 'secondary',
  blocked: 'destructive',
  awaiting_response: 'outline',
  completed: 'default',
};

export function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No orders found for this patient
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Type / Item</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
            <TableCell>
              <Link href={`/orders/${order.id}`} className="font-medium text-primary hover:underline">
                {order.id}
              </Link>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{order.item}</p>
                <p className="text-xs text-muted-foreground">{order.orderType}</p>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={stageBadgeVariant[order.stage]}>
                {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={subStatusBadgeVariant[order.subStatus]}>
                {order.subStatus.replace('_', ' ')}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(order.dateCreated).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(order.lastUpdated).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

**Step 2: Create orders page**

```typescript
// app/src/app/patients/[id]/orders/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { OrdersList } from '@/components/patient/orders/orders-list';
import type { Order } from '@/types/order';

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    patientId: '1',
    patientName: 'John Smith',
    orderType: 'DME',
    item: 'CPAP Machine',
    stage: 'eligibility',
    subStatus: 'in_progress',
    dateCreated: '2026-01-10',
    lastUpdated: '2026-01-19',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD002',
    patientId: '1',
    patientName: 'John Smith',
    orderType: 'DME',
    item: 'CPAP Supplies',
    stage: 'validation',
    subStatus: 'awaiting_response',
    dateCreated: '2026-01-15',
    lastUpdated: '2026-01-18',
    documents: [],
    notes: [],
  },
];

export default async function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <OrdersList orders={mockOrders} />
      </CardContent>
    </Card>
  );
}
```

**Step 3: Commit**

```bash
git add app/src/components/patient/orders/ app/src/app/patients/
git commit -m "feat: add orders list tab"
```

---

### Task 5.2: Create Order Detail View

**Files:**
- Create: `app/src/app/orders/[id]/page.tsx`
- Create: `app/src/components/order/order-header.tsx`
- Create: `app/src/components/order/stage-stepper.tsx`
- Create: `app/src/components/order/order-notes.tsx`
- Create: `app/src/components/order/order-documents.tsx`

**Step 1: Create stage stepper**

```typescript
// app/src/components/order/stage-stepper.tsx
'use client';

import { cn } from '@tennr/lasso/utils/cn';
import { Check } from '@phosphor-icons/react';
import type { OrderStage } from '@/types/order';

interface StageStepperProps {
  currentStage: OrderStage;
}

const stages: { key: OrderStage; label: string }[] = [
  { key: 'validation', label: 'Validation' },
  { key: 'eligibility', label: 'Eligibility & Benefits' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'complete', label: 'Complete' },
];

export function StageStepper({ currentStage }: StageStepperProps) {
  const currentIndex = stages.findIndex(s => s.key === currentStage);

  return (
    <div className="flex items-center justify-between">
      {stages.map((stage, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={stage.key} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  isComplete && 'bg-primary text-primary-foreground',
                  isCurrent && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                  !isComplete && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isComplete ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium text-center',
                  isCurrent ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {stage.label}
              </span>
            </div>
            {index < stages.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2',
                  index < currentIndex ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
```

**Step 2: Create order notes**

```typescript
// app/src/components/order/order-notes.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Textarea } from '@tennr/lasso/textarea';
import { Input } from '@tennr/lasso/input';
import { Avatar } from '@tennr/lasso/avatar';
import { MagnifyingGlass, PaperPlaneTilt } from '@phosphor-icons/react';
import type { OrderNote } from '@/types/order';

interface OrderNotesProps {
  notes: OrderNote[];
  onAddNote: (content: string) => Promise<void>;
}

export function OrderNotes({ notes, onAddNote }: OrderNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!newNote.trim()) return;
    setIsSubmitting(true);
    try {
      await onAddNote(newNote);
      setNewNote('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="pl-9"
          />
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              {notes.length === 0 ? 'No notes yet' : 'No matching notes'}
            </p>
          ) : (
            filteredNotes.map(note => (
              <div key={note.id} className="flex gap-3">
                <Avatar className="w-8 h-8" fallback={note.author.slice(0, 2).toUpperCase()} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{note.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{note.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Add a note..."
            rows={2}
            className="flex-1"
          />
          <Button onClick={handleSubmit} disabled={!newNote.trim() || isSubmitting}>
            <PaperPlaneTilt className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

**Step 3: Create order documents**

```typescript
// app/src/components/order/order-documents.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { Eye, DownloadSimple } from '@phosphor-icons/react';
import type { OrderDocument } from '@/types/order';

interface OrderDocumentsProps {
  documents: OrderDocument[];
  onView: (doc: OrderDocument) => void;
}

const typeLabels: Record<string, string> = {
  sleep_study: 'Sleep Study',
  prior_auth: 'Prior Auth',
  cmn: 'CMN',
  other: 'Other',
};

export function OrderDocuments({ documents, onView }: OrderDocumentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No documents attached</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{typeLabels[doc.type] || doc.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(doc.dateAdded).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={doc.source === 'tennr' ? 'default' : 'secondary'}>
                      {doc.source === 'tennr' ? 'Tennr' : 'EHR'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => onView(doc)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={doc.url} download>
                          <DownloadSimple className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 4: Create order header**

```typescript
// app/src/components/order/order-header.tsx
'use client';

import Link from 'next/link';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { ArrowLeft } from '@phosphor-icons/react';
import type { Order, OrderSubStatus } from '@/types/order';

interface OrderHeaderProps {
  order: Order;
  onSubStatusChange: (status: OrderSubStatus) => void;
}

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  validation: 'outline',
  eligibility: 'secondary',
  qualification: 'secondary',
  complete: 'default',
};

export function OrderHeader({ order, onSubStatusChange }: OrderHeaderProps) {
  return (
    <header className="border-b pb-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/patients/${order.patientId}/orders`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{order.id}</h1>
            <Badge variant={stageBadgeVariant[order.stage]}>
              {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            <Link href={`/patients/${order.patientId}`} className="hover:underline">
              {order.patientName}
            </Link>{' '}
            · {order.orderType} · {order.item}
          </p>
          <p className="text-sm text-muted-foreground">
            Created: {new Date(order.dateCreated).toLocaleDateString()} · Last updated:{' '}
            {new Date(order.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Select value={order.subStatus} onValueChange={onSubStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="awaiting_response">Awaiting Response</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
```

**Step 5: Create order detail page**

```typescript
// app/src/app/orders/[id]/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@tennr/lasso/card';
import { OrderHeader } from '@/components/order/order-header';
import { StageStepper } from '@/components/order/stage-stepper';
import { OrderNotes } from '@/components/order/order-notes';
import { OrderDocuments } from '@/components/order/order-documents';
import type { Order, OrderSubStatus, OrderDocument } from '@/types/order';

const mockOrder: Order = {
  id: 'ORD001',
  patientId: '1',
  patientName: 'John Smith',
  orderType: 'DME',
  item: 'CPAP Machine',
  stage: 'eligibility',
  subStatus: 'in_progress',
  dateCreated: '2026-01-10',
  lastUpdated: '2026-01-19',
  documents: [
    {
      id: 'doc1',
      name: 'Sleep Study Results.pdf',
      type: 'sleep_study',
      dateAdded: '2026-01-10',
      source: 'ehr',
      url: '#',
    },
  ],
  notes: [
    {
      id: 'note1',
      content: 'Called insurance for pre-auth status. Rep said it will take 3-5 business days.',
      author: 'Sarah M.',
      createdAt: '2026-01-18T14:30:00Z',
    },
    {
      id: 'note2',
      content: 'Sleep study received and uploaded to EHR.',
      author: 'Mike T.',
      createdAt: '2026-01-10T09:15:00Z',
    },
  ],
};

export default function OrderDetailPage() {
  const [order, setOrder] = useState(mockOrder);

  const handleSubStatusChange = (status: OrderSubStatus) => {
    setOrder(prev => ({ ...prev, subStatus: status, lastUpdated: new Date().toISOString() }));
    // TODO: Sync to API
  };

  const handleAddNote = async (content: string) => {
    const newNote = {
      id: `note${Date.now()}`,
      content,
      author: 'Current User',
      createdAt: new Date().toISOString(),
    };
    setOrder(prev => ({ ...prev, notes: [newNote, ...prev.notes] }));
    // TODO: Sync to API
  };

  const handleViewDocument = (doc: OrderDocument) => {
    // TODO: Open document viewer side tray
    console.log('View document:', doc);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <OrderHeader order={order} onSubStatusChange={handleSubStatusChange} />

        <Card>
          <CardContent className="py-6">
            <StageStepper currentStage={order.stage} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderDocuments documents={order.documents} onView={handleViewDocument} />
          <OrderNotes notes={order.notes} onAddNote={handleAddNote} />
        </div>
      </div>
    </div>
  );
}
```

**Step 6: Commit**

```bash
git add app/src/components/order/ app/src/app/orders/
git commit -m "feat: add order detail view with stepper, notes, and documents"
```

---

## Phase 6: Documents Tab

Supporting workflow with document table and side tray viewer.

### Task 6.1: Create Documents Tab

**Files:**
- Create: `app/src/app/patients/[id]/documents/page.tsx`
- Create: `app/src/components/patient/documents/documents-table.tsx`
- Create: `app/src/components/patient/documents/document-viewer.tsx`

**Step 1: Create documents table**

```typescript
// app/src/components/patient/documents/documents-table.tsx
'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { Eye, DownloadSimple, CaretUpDown } from '@phosphor-icons/react';
import type { OrderDocument } from '@/types/order';

interface DocumentsTableProps {
  documents: (OrderDocument & { orderId?: string })[];
  onView: (doc: OrderDocument) => void;
}

const typeLabels: Record<string, string> = {
  sleep_study: 'Sleep Study',
  prior_auth: 'Prior Auth',
  cmn: 'CMN',
  other: 'Other',
};

type SortField = 'name' | 'dateAdded' | 'type';
type SortDirection = 'asc' | 'desc';

export function DocumentsTable({ documents, onView }: DocumentsTableProps) {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('dateAdded');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const uniqueOrders = [...new Set(documents.map(d => d.orderId).filter(Boolean))];

  const filteredDocs = documents
    .filter(doc => typeFilter === 'all' || doc.type === typeFilter)
    .filter(doc => orderFilter === 'all' || doc.orderId === orderFilter)
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'dateAdded') {
        return (new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()) * modifier;
      }
      return a[sortField].localeCompare(b[sortField]) * modifier;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sleep_study">Sleep Study</SelectItem>
            <SelectItem value="prior_auth">Prior Auth</SelectItem>
            <SelectItem value="cmn">CMN</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={orderFilter} onValueChange={setOrderFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            {uniqueOrders.map(orderId => (
              <SelectItem key={orderId} value={orderId!}>
                {orderId}
              </SelectItem>
            ))}
            <SelectItem value="unattached">Unattached</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No documents found</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('name')}>
                  Name
                  <CaretUpDown className="w-4 h-4 ml-1" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('type')}>
                  Type
                  <CaretUpDown className="w-4 h-4 ml-1" />
                </Button>
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('dateAdded')}>
                  Date Added
                  <CaretUpDown className="w-4 h-4 ml-1" />
                </Button>
              </TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocs.map(doc => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{typeLabels[doc.type] || doc.type}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{doc.orderId || '—'}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(doc.dateAdded).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={doc.source === 'tennr' ? 'default' : 'secondary'}>
                    {doc.source === 'tennr' ? 'Tennr' : 'EHR'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => onView(doc)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={doc.url} download>
                        <DownloadSimple className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
```

**Step 2: Create document viewer side tray**

```typescript
// app/src/components/patient/documents/document-viewer.tsx
'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@tennr/lasso/sheet';
import { Button } from '@tennr/lasso/button';
import { Badge } from '@tennr/lasso/badge';
import { DownloadSimple, X } from '@phosphor-icons/react';
import type { OrderDocument } from '@/types/order';

interface DocumentViewerProps {
  document: OrderDocument | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeLabels: Record<string, string> = {
  sleep_study: 'Sleep Study',
  prior_auth: 'Prior Auth',
  cmn: 'CMN',
  other: 'Other',
};

export function DocumentViewer({ document, open, onOpenChange }: DocumentViewerProps) {
  if (!document) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle>{document.name}</SheetTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{typeLabels[document.type] || document.type}</Badge>
                <Badge variant={document.source === 'tennr' ? 'default' : 'secondary'}>
                  {document.source === 'tennr' ? 'Tennr' : 'EHR'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Added: {new Date(document.dateAdded).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={document.url} download>
                  <DownloadSimple className="w-4 h-4" />
                  Download
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-auto p-6">
          {/* PDF Preview - in production would use react-pdf or similar */}
          <div className="aspect-[8.5/11] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">PDF Preview</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

**Step 3: Create documents page**

```typescript
// app/src/app/patients/[id]/documents/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { DocumentsTable } from '@/components/patient/documents/documents-table';
import { DocumentViewer } from '@/components/patient/documents/document-viewer';
import type { OrderDocument } from '@/types/order';

const mockDocuments: (OrderDocument & { orderId?: string })[] = [
  {
    id: 'doc1',
    name: 'Sleep Study Results.pdf',
    type: 'sleep_study',
    dateAdded: '2026-01-10',
    source: 'ehr',
    url: '#',
    orderId: 'ORD001',
  },
  {
    id: 'doc2',
    name: 'Prior Authorization Form.pdf',
    type: 'prior_auth',
    dateAdded: '2026-01-12',
    source: 'tennr',
    url: '#',
    orderId: 'ORD001',
  },
  {
    id: 'doc3',
    name: 'Certificate of Medical Necessity.pdf',
    type: 'cmn',
    dateAdded: '2026-01-15',
    source: 'ehr',
    url: '#',
    orderId: 'ORD002',
  },
];

export default function DocumentsPage() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<OrderDocument | null>(null);

  const handleViewDocument = (doc: OrderDocument) => {
    setSelectedDocument(doc);
    setViewerOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentsTable documents={mockDocuments} onView={handleViewDocument} />
        </CardContent>
      </Card>

      <DocumentViewer
        document={selectedDocument}
        open={viewerOpen}
        onOpenChange={setViewerOpen}
      />
    </>
  );
}
```

**Step 4: Commit**

```bash
git add app/src/components/patient/documents/ app/src/app/patients/
git commit -m "feat: add documents tab with filtering and side tray viewer"
```

---

## Phase 7: Demographics Tab

Lower frequency, editable form.

### Task 7.1: Create Demographics Tab

**Files:**
- Create: `app/src/app/patients/[id]/demographics/page.tsx`
- Create: `app/src/components/patient/demographics/demographics-form.tsx`

**Step 1: Create demographics form**

```typescript
// app/src/components/patient/demographics/demographics-form.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Input } from '@tennr/lasso/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { Pencil, FloppyDisk, X } from '@phosphor-icons/react';
import type { Patient } from '@/types/patient';

interface DemographicsFormProps {
  patient: Patient;
  onSave: (patient: Partial<Patient>) => Promise<void>;
}

export function DemographicsForm({ patient, onSave }: DemographicsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: patient.firstName,
    lastName: patient.lastName,
    dob: patient.dob,
    gender: 'male', // Add to Patient type if needed
    phone: patient.phone,
    secondaryPhone: '',
    email: patient.email,
    address: { ...patient.address },
    emergencyContact: patient.emergencyContact || { name: '', phone: '', relationship: '' },
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: patient.firstName,
      lastName: patient.lastName,
      dob: patient.dob,
      gender: 'male',
      phone: patient.phone,
      secondaryPhone: '',
      email: patient.email,
      address: { ...patient.address },
      emergencyContact: patient.emergencyContact || { name: '', phone: '', relationship: '' },
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
        <CardAction>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                <FloppyDisk className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Name Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Name</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                {isEditing ? (
                  <Input
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{patient.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                {isEditing ? (
                  <Input
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{patient.lastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{new Date(patient.dob).toLocaleDateString()}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                {isEditing ? (
                  <Select
                    value={formData.gender}
                    onValueChange={value => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm capitalize">{formData.gender}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Phone</label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{patient.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Secondary Phone</label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={formData.secondaryPhone}
                    onChange={e => setFormData({ ...formData, secondaryPhone: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{formData.secondaryPhone || '—'}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{patient.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Street</label>
                {isEditing ? (
                  <Input
                    value={formData.address.street}
                    onChange={e =>
                      setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.address.street}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                {isEditing ? (
                  <Input
                    value={formData.address.city}
                    onChange={e =>
                      setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.address.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                {isEditing ? (
                  <Input
                    value={formData.address.state}
                    onChange={e =>
                      setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.address.state}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ZIP Code</label>
                {isEditing ? (
                  <Input
                    value={formData.address.zip}
                    onChange={e =>
                      setFormData({ ...formData, address: { ...formData.address, zip: e.target.value } })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.address.zip}</p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                {isEditing ? (
                  <Input
                    value={formData.emergencyContact.name}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, name: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.emergencyContact?.name || '—'}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, phone: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.emergencyContact?.phone || '—'}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Relationship</label>
                {isEditing ? (
                  <Input
                    value={formData.emergencyContact.relationship}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, relationship: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.emergencyContact?.relationship || '—'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

**Step 2: Create demographics page**

```typescript
// app/src/app/patients/[id]/demographics/page.tsx
'use client';

import { DemographicsForm } from '@/components/patient/demographics/demographics-form';
import type { Patient } from '@/types/patient';

const mockPatient: Patient = {
  id: '1',
  mrn: 'MRN001',
  firstName: 'John',
  lastName: 'Smith',
  dob: '1985-03-15',
  phone: '555-0101',
  email: 'john.smith@email.com',
  address: { street: '123 Main St', city: 'Austin', state: 'TX', zip: '78701' },
  primaryInsurance: {
    carrier: 'Blue Cross',
    plan: 'PPO Gold',
    memberId: 'BC123456',
    groupNumber: 'GRP001',
    policyHolder: 'John Smith',
    relationship: 'self',
    eligibilityStatus: 'verified',
    lastVerified: '2026-01-15',
  },
  syncStatus: { ehrSystem: 'BrightTree', lastSynced: '2026-01-20T10:30:00Z' },
};

export default function DemographicsPage() {
  const handleSave = async (data: Partial<Patient>) => {
    // TODO: Save to API and sync to EHR
    console.log('Saving demographics:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return <DemographicsForm patient={mockPatient} onSave={handleSave} />;
}
```

**Step 3: Commit**

```bash
git add app/src/components/patient/demographics/ app/src/app/patients/
git commit -m "feat: add demographics tab with editable form"
```

---

## Phase 8: Final Integration & Polish

### Task 8.1: Verify Build

**Step 1: Run build**

```bash
cd app && pnpm build
```

Expected: Build succeeds with no TypeScript errors.

**Step 2: Fix any errors**

If errors, fix and rerun until passing.

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: resolve build errors"
```

---

### Task 8.2: Create Index Page with Search Trigger

**Files:**
- Modify: `app/src/app/page.tsx`

**Step 1: Update home page**

```typescript
// app/src/app/page.tsx
'use client';

import { Button } from '@tennr/lasso/button';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useSearchTrigger } from '@/components/search/search-provider';

export default function HomePage() {
  const { openSearch } = useSearchTrigger();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl font-bold">Patient EHR Admin</h1>
        <p className="text-muted-foreground">
          Manage patient referrals, check insurance eligibility, and track orders without switching
          to customer EHRs.
        </p>
        <Button size="lg" onClick={openSearch}>
          <MagnifyingGlass className="w-5 h-5" />
          Search Patients & Orders
          <kbd className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded">⌘K</kbd>
        </Button>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/src/app/page.tsx
git commit -m "feat: add home page with search trigger"
```

---

### Task 8.3: Final Verification

**Step 1: Run development server**

```bash
cd app && pnpm dev
```

**Step 2: Verify all features**

- [ ] Cmd+K opens search modal
- [ ] Keyboard navigation works (↑↓ Enter)
- [ ] Clicking search result navigates to patient/order
- [ ] Patient header displays correctly
- [ ] Tab navigation works
- [ ] Overview tab shows summary cards
- [ ] Demographics tab edits and saves
- [ ] Insurance tab edits and verifies
- [ ] Documents tab filters and opens viewer
- [ ] Orders tab lists orders
- [ ] Order detail shows stepper, notes, docs

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Patient EHR admin tool v1"
```

---

## Ralph Loop Prompt

To run this implementation with Ralph Loop:

```bash
/ralph-loop "Implement the Patient EHR Admin Tool following the plan in docs/plans/2026-01-20-patient-ehr-admin-tool.md. Execute each task sequentially, committing after each task. When all phases complete and the build passes, output <promise>PATIENT_EHR_COMPLETE</promise>" --completion-promise "PATIENT_EHR_COMPLETE" --max-iterations 100
```

---

## Out of Scope (V1)

Per the PRD, these are explicitly out of scope:
- Clinical tab
- Task management
- Quick actions on Overview
- Order creation (orders come from customer EHR)
- Patient-level notes (notes are order-specific)
