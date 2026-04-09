'use client';

import { useState, useMemo, useEffect } from 'react';
import { CaretDown, CaretLeft, CaretRight } from '@phosphor-icons/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@tennr/lasso/popover';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@tennr/lasso/command';
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
}

const sourceConfig: Record<ActivitySource, { label: string }> = {
  tennr: { label: 'Tennr' },
  user: { label: '' },
  system: { label: 'Integration' },
};

function getActivitySourceLabel(activity: TimelineActivity): string {
  if (activity.ehrSystem) return activity.ehrSystem;
  if (activity.source === 'user' && activity.author?.name) return activity.author.name;
  if (activity.source) return sourceConfig[activity.source].label;
  return '';
}

interface TimelineProps {
  activities: TimelineActivity[];
  onAddComment?: (comment: string) => void;
  onSelectActivity?: (activity: TimelineActivity) => void;
  className?: string;
  filterBy?: 'source' | 'ehrSystem';
}

const defaultFilterOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tennr', label: 'Tennr' },
  { value: 'user', label: 'User' },
  { value: 'system', label: 'Integration' },
];

const ehrFilterOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Epic', label: 'Epic' },
  { value: 'Cerner', label: 'Cerner' },
  { value: 'Athenahealth', label: 'Athenahealth' },
  { value: 'eClinicalWorks', label: 'eClinicalWorks' },
];

const typeFilterOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'patient', label: 'Patient' },
  { value: 'order', label: 'Order' },
];

export function Timeline({ activities, onSelectActivity, className, filterBy = 'source' }: TimelineProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [typeFilterOpen, setTypeFilterOpen] = useState(false);
  const [page, setPage] = useState(0);

  const filterOptions = filterBy === 'ehrSystem' ? ehrFilterOptions : defaultFilterOptions;
  const filterLabel = filterBy === 'ehrSystem' ? 'EHR System' : 'Source';

  const filteredActivities = useMemo(() => {
    let result = activities;

    // Source / EHR filter
    if (selectedFilter !== 'all') {
      if (filterBy === 'ehrSystem') {
        result = result.filter(a => a.ehrSystem === selectedFilter);
      } else {
        result = result.filter(a => a.source === selectedFilter);
      }
    }

    // Type filter
    if (selectedTypeFilter !== 'all') {
      if (selectedTypeFilter === 'patient') {
        result = result.filter(a => a.type === 'patient_created' || a.type === 'patient_update');
      } else if (selectedTypeFilter === 'order') {
        result = result.filter(a => a.type === 'order_created' || a.type === 'order_update');
      }
    }

    return result;
  }, [activities, selectedFilter, selectedTypeFilter, filterBy]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const pagedActivities = filteredActivities.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const selectedLabel = filterOptions.find(o => o.value === selectedFilter)?.label ?? 'All';
  const selectedTypeLabel = typeFilterOptions.find(o => o.value === selectedTypeFilter)?.label ?? 'All';

  // Reset page when filters change
  useEffect(() => { setPage(0); }, [selectedFilter, selectedTypeFilter]);

  const formatActivityDate = (timestamp: string) => {
    const ts = new Date(timestamp);
    return ts.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatActivityTime = (timestamp: string) => {
    const ts = new Date(timestamp);
    return ts.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className={cn('bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden flex flex-col', className)}>
      {/* Filters Row */}
      <div className="flex items-center gap-2 px-2 py-2 bg-bg-white overflow-x-auto border-b border-border-tertiary">
        <div className="flex items-center">
          <div className="flex items-center border border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-l-full">
            <span className="text-sm text-text-tertiary font-medium">{filterLabel}</span>
          </div>
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 border border-l-0 border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-r-full hover:bg-bg-tertiary transition-colors cursor-pointer">
                <span className="text-sm text-text-primary font-medium">{selectedLabel}</span>
                <CaretDown className="size-4 text-text-primary" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[160px]">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {filterOptions.map(option => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          setSelectedFilter(option.value);
                          setPage(0);
                          setFilterOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Type filter */}
        <div className="flex items-center">
          <div className="flex items-center border border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-l-full">
            <span className="text-sm text-text-tertiary font-medium">Type</span>
          </div>
          <Popover open={typeFilterOpen} onOpenChange={setTypeFilterOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 border border-l-0 border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-r-full hover:bg-bg-tertiary transition-colors cursor-pointer">
                <span className="text-sm text-text-primary font-medium">{selectedTypeLabel}</span>
                <CaretDown className="size-4 text-text-primary" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[160px]">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {typeFilterOptions.map(option => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          setSelectedTypeFilter(option.value);
                          setTypeFilterOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
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
              onClick={onSelectActivity ? () => onSelectActivity(activity) : undefined}
              className={cn(
                'flex items-start gap-2.5 px-3 py-3 text-left hover:bg-accent/50 transition-colors',
                onSelectActivity && 'cursor-pointer',
                !isLast && 'border-b border-border',
              )}
            >
              <div className="flex flex-col gap-0 min-w-0 w-full">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[13px] font-medium lasso:wght-medium text-text-primary truncate">{activity.title}</span>
                    {getActivitySourceLabel(activity) && (
                      <span className="text-[10px] text-text-tertiary shrink-0 border border-border-secondary bg-bg-secondary px-1.5 py-0.5 rounded-full">{getActivitySourceLabel(activity)}</span>
                    )}
                  </div>
                  <span className="text-[11px] text-text-tertiary whitespace-nowrap shrink-0">
                    {formatActivityDate(activity.timestamp)} · {formatActivityTime(activity.timestamp)}
                  </span>
                </div>
                {activity.description && (
                  <span className="text-[11px] text-text-secondary truncate">{activity.description}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer with pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <p className="text-sm text-text-secondary">
          Showing {filteredActivities.length === 0 ? 0 : page * ITEMS_PER_PAGE + 1}-{Math.min((page + 1) * ITEMS_PER_PAGE, filteredActivities.length)} of{' '}
          {filteredActivities.length} results
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center gap-1 px-2 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <CaretLeft weight="regular" className="size-3.5" />
              Previous
            </button>

            {getVisiblePages(page, totalPages).map((p, i) =>
              p === 'ellipsis' ? (
                <span key={`ellipsis-${i}`} className="flex items-center justify-center size-8 text-sm text-text-secondary">
                  &middot;&middot;&middot;
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'flex items-center justify-center size-8 text-sm rounded-md transition-colors cursor-pointer',
                    p === page
                      ? 'border border-border-primary text-text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {p + 1}
                </button>
              )
            )}

            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="flex items-center gap-1 px-2 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              Next
              <CaretRight weight="regular" className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
