'use client';

import { useState, useMemo, useEffect } from 'react';
import { FilterGroup, type FilterCategoryType, type FilterState } from '@tennr/lasso/filter-group';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@tennr/lasso/pagination';
import { cn } from '@tennr/lasso/utils/cn';

const ITEMS_PER_PAGE = 10;

function getVisiblePages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages: (number | 'ellipsis')[] = [];
  const near = new Set<number>();
  near.add(current);
  if (current > 0) near.add(current - 1);
  if (current < total - 1) near.add(current + 1);
  near.add(0);
  near.add(total - 1);

  const sorted = Array.from(near).sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      pages.push('ellipsis');
    }
    pages.push(sorted[i]);
  }

  return pages;
}

export type ActivitySource = 'tennr' | 'user' | 'system';
export type ActivityType = 'order_created' | 'order_update' | 'patient_created' | 'patient_update' | 'ehr_log' | 'note' | 'prior_auth' | 'eligibility_benefits';

export interface ChangeLogEntry {
  field: string;
  before: string;
  after: string;
}

export interface TimelineActivity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  orderId?: string;
  source?: ActivitySource;
  ehrSystem?: string;
  author?: {
    name: string;
    initials: string;
  };
  timestamp: string;
  changeLog?: ChangeLogEntry[];
  noteContent?: string;
}

interface TimelineProps {
  activities: TimelineActivity[];
  onAddComment?: (comment: string) => void;
  onSelectActivity?: (activity: TimelineActivity) => void;
  className?: string;
}

const activityFilterCategories: FilterCategoryType[] = [
  {
    id: 'type',
    label: 'Type',
    variant: 'command',
    childVariant: 'command',
    values: [
      { id: 'all', label: 'All' },
      { id: 'patient', label: 'Patient' },
      { id: 'order', label: 'Order' },
    ],
  },
];

// --- Detail helpers ---

function getActivityChangeLog(activity: TimelineActivity): ChangeLogEntry[] {
  if (activity.changeLog) return activity.changeLog;
  const desc = (activity.description ?? '').toLowerCase();

  if (activity.type === 'patient_update') {
    if (desc.includes('address')) {
      return [{ field: 'Address', before: '123 Main Street, Apt 4B, Springfield, IL 62704', after: '456 Oak Avenue, Suite 200, Riverside, CA 92501' }];
    }
    if (desc.includes('insurance') || desc.includes('payer')) {
      return [
        { field: 'Payer', before: 'Blue Cross Blue Shield — Bronze HMO', after: 'Aetna — Gold PPO' },
        { field: 'Member ID', before: 'BCBS-881234', after: 'AET-990421' },
        { field: 'Copay', before: '$40.00', after: '$20.00' },
      ];
    }
    if (desc.includes('phone')) {
      return [{ field: 'Phone', before: '(555) 123-4567', after: '(555) 987-6543' }];
    }
    if (desc.includes('primary care')) {
      return [{ field: 'Provider', before: 'Dr. Michael Torres — Springfield Family Medicine', after: 'Dr. Sarah Chen — Riverside Internal Medicine' }];
    }
    if (desc.includes('emergency contact')) {
      return [{ field: 'Emergency Contact', before: '—', after: 'Maria Johnson (Spouse) · (555) 222-3344' }];
    }
    if (desc.includes('demographics')) {
      return [
        { field: 'Email', before: 'patient@oldmail.com', after: 'patient@newmail.com' },
        { field: 'Preferred Language', before: 'English', after: 'Spanish' },
      ];
    }
    return [{ field: 'Record', before: 'Previous value', after: 'Updated value' }];
  }

  if (activity.type === 'order_update') {
    if (desc.includes('status')) {
      return [{ field: 'Status', before: 'Pending', after: 'In Progress' }];
    }
    if (desc.includes('insurance verified') || desc.includes('payer verified')) {
      return [
        { field: 'Verification', before: 'Unverified', after: 'Verified — Active' },
        { field: 'Verified By', before: '—', after: 'System (Auto)' },
      ];
    }
    if (desc.includes('shipping')) {
      return [
        { field: 'Shipping Address', before: '123 Main St, Springfield, IL 62704', after: '456 Oak Ave, Riverside, CA 92501' },
        { field: 'Shipping Method', before: 'Standard (5–7 business days)', after: 'Expedited (2–3 business days)' },
      ];
    }
  }

  return [];
}

interface DetailField {
  label: string;
  value: string;
  highlight?: boolean;
}

function getActivityFields(activity: TimelineActivity): DetailField[] {
  switch (activity.type) {
    case 'order_update':
      return [{ label: 'Payer', value: 'Aetna' }];
    case 'order_created':
      return [
        { label: 'Type', value: 'CPAP Device' },
        { label: 'Payer', value: 'Aetna' },
      ];
    case 'prior_auth':
      return [
        { label: 'Auth Number', value: 'PA-2026-38291' },
        { label: 'Payer', value: 'Aetna' },
        { label: 'Decision', value: 'Approved', highlight: true },
        { label: 'Valid Through', value: '07/01/2026' },
      ];
    case 'eligibility_benefits':
      return [
        { label: 'Payer', value: 'Aetna' },
        { label: 'Plan Type', value: 'Gold PPO' },
        { label: 'Status', value: 'Active', highlight: true },
        { label: 'Effective', value: '01/01/2026 — 12/31/2026' },
        { label: 'Copay', value: '$20.00' },
        { label: 'Deductible', value: '$350.00 remaining' },
      ];
    case 'ehr_log':
      return [
        { label: 'EHR System', value: activity.ehrSystem ?? 'BrightTree' },
        { label: 'Sync Type', value: 'Automatic' },
      ];
    default:
      return [];
  }
}

function getNoteContent(activity: TimelineActivity): string | null {
  if (activity.noteContent) return activity.noteContent;
  if (activity.type === 'note') {
    return 'Spoke with patient regarding upcoming device delivery. Patient confirmed current address and requested expedited shipping.';
  }
  return null;
}


export function Timeline({ activities, onSelectActivity, className }: TimelineProps) {
  const [filterState, setFilterState] = useState<FilterState>([
    { id: 'default-type', filterId: 'type', value: 'all' },
  ]);
  const [page, setPage] = useState(0);

  const typeFilterMap: Record<string, ActivityType[]> = {
    patient: ['patient_created', 'patient_update'],
    order: ['order_created', 'order_update'],
  };

  const filteredActivities = useMemo(() => {
    const typeFilter = filterState.find(f => f.filterId === 'type');
    const selected = typeof typeFilter?.value === 'string' ? typeFilter.value : 'all';

    if (selected === 'all') return activities;

    const allowedTypes = typeFilterMap[selected] ?? [];
    return activities.filter(a => allowedTypes.includes(a.type));
  }, [activities, filterState]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const pagedActivities = filteredActivities.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  useEffect(() => { setPage(0); }, [filterState]);

  const formatActivityDate = (timestamp: string) => {
    const ts = new Date(timestamp);
    return ts.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatActivityTime = (timestamp: string) => {
    const ts = new Date(timestamp);
    return ts.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden flex flex-col">
        {/* Title Row */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-tertiary shrink-0">
          <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">All activity</div>
        </div>
        {/* Filters Row */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-border-tertiary shrink-0 min-h-11 [&_ul>li:has(>.rounded-full)]:hidden">
          <FilterGroup
            filters={activityFilterCategories}
            state={filterState}
            onChange={setFilterState}
            onClearAll={() => setFilterState([{ id: 'default-type', filterId: 'type', value: 'all' }])}
          />
        </div>

        {/* Activity List */}
        <div className="flex flex-col overflow-y-auto min-h-0">
          {filteredActivities.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-text-tertiary">
              No activities match the selected filter.
            </div>
          )}
          {pagedActivities.map((activity, index) => {
            const isLast = index === pagedActivities.length - 1;

            return (
              <div
                key={activity.id}
                className={cn(
                  'flex items-start justify-between gap-2 px-3 py-2.5 text-left min-w-0 transition-colors cursor-pointer',
                  !isLast && 'border-b border-border',
                  'hover:bg-bg-secondary',
                )}
                onClick={() => onSelectActivity?.(activity)}
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[13px] font-medium lasso:wght-medium text-text-primary">{activity.title}</span>
                  {activity.description && (
                    <span className="text-[11px] text-text-secondary">{activity.description}</span>
                  )}
                </div>
                <span className="text-[11px] text-text-tertiary whitespace-nowrap shrink-0">
                  {formatActivityDate(activity.timestamp)} · {formatActivityTime(activity.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination outside the card */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-text-secondary">
            Showing {page * ITEMS_PER_PAGE + 1}-{Math.min((page + 1) * ITEMS_PER_PAGE, filteredActivities.length)} of {filteredActivities.length} results
          </span>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  className={cn(page === 0 && 'pointer-events-none opacity-40')}
                />
              </PaginationItem>
              {getVisiblePages(page, totalPages).map((p, i) =>
                p === 'ellipsis' ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  className={cn(page === totalPages - 1 && 'pointer-events-none opacity-40')}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

    </div>
  );
}
