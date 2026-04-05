'use client';

import { useState, useMemo } from 'react';
import { Heartbeat, FolderOpen, FileText, CheckCircle, ShieldCheck, FunnelSimple, X, MagnifyingGlass } from '@phosphor-icons/react';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';

export type ActivitySource = 'tennr' | 'user' | 'system';

interface TimelineActivity {
  id: string;
  type: 'verification' | 'document' | 'referral' | 'order_complete' | 'prior_auth' | 'comment';
  title: string;
  description?: string;
  orderId?: string;
  source?: ActivitySource;
  author?: {
    name: string;
    initials: string;
  };
  timestamp: string;
}

const sourceConfig: Record<ActivitySource, { label: string }> = {
  tennr: { label: 'Tennr' },
  user: { label: 'User' },
  system: { label: 'System' },
};

interface TimelineProps {
  activities: TimelineActivity[];
  onAddComment?: (comment: string) => void;
  onSelectActivity?: (activity: TimelineActivity) => void;
  className?: string;
}

const activityIcon: Record<TimelineActivity['type'], React.ReactNode> = {
  verification: <Heartbeat weight="regular" className="size-4 text-text-tertiary" />,
  document: <FolderOpen weight="regular" className="size-4 text-text-tertiary" />,
  referral: <FileText weight="regular" className="size-4 text-text-tertiary" />,
  order_complete: <CheckCircle weight="regular" className="size-4 text-text-tertiary" />,
  prior_auth: <ShieldCheck weight="regular" className="size-4 text-text-tertiary" />,
  comment: <FileText weight="regular" className="size-4 text-text-tertiary" />,
};

const allSources: ActivitySource[] = ['tennr', 'user', 'system'];

function formatOrderId(orderId: string): string {
  return orderId.replace(/^ORD-/i, 'Order ');
}

function getSourceLabel(activity: TimelineActivity): string {
  if (activity.author?.name) return activity.author.name;
  if (activity.source) return sourceConfig[activity.source].label;
  return '';
}

export function Timeline({ activities, onSelectActivity, className }: TimelineProps) {
  const [sourceFilters, setSourceFilters] = useState<Set<ActivitySource>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const hasActiveFilters = sourceFilters.size > 0;

  const filteredActivities = useMemo(() => {
    return activities.filter(a => {
      if (sourceFilters.size > 0 && (!a.source || !sourceFilters.has(a.source))) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(q);
        const matchesOrder = a.orderId?.toLowerCase().includes(q);
        const matchesAuthor = a.author?.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrder && !matchesAuthor) return false;
      }
      return true;
    });
  }, [activities, sourceFilters, searchQuery]);

  const toggleSource = (source: ActivitySource) => {
    setSourceFilters(prev => {
      const next = new Set(prev);
      if (next.has(source)) next.delete(source);
      else next.add(source);
      return next;
    });
  };

  const clearFilters = () => {
    setSourceFilters(new Set());
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
      <div className={cn("bg-white border border-[#efede9] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col", className)}>
        {/* Header */}
        <div className="px-4 py-2 shrink-0 flex items-center justify-between">
          <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">Patient Activity Timeline</div>
          <button
            onClick={() => setShowFilters(prev => !prev)}
            className={cn(
              "flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-colors cursor-pointer",
              showFilters || hasActiveFilters
                ? "bg-bg-secondary text-text-primary"
                : "text-text-tertiary hover:text-text-secondary hover:bg-bg-primary-hover"
            )}
          >
            <FunnelSimple weight="regular" className="size-3.5" />
            Filter
            {hasActiveFilters && (
              <span className="bg-bg-black-solid text-text-white text-[10px] rounded-full size-4 flex items-center justify-center leading-none">
                {sourceFilters.size}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-2">
          <div className="relative">
            <MagnifyingGlass weight="regular" className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-border-secondary bg-bg-primary text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-1 focus:ring-border-focus-ring"
            />
          </div>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <div className="px-4 pb-3 flex flex-col gap-2">
            {/* Source filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-text-tertiary uppercase tracking-wide mr-1">Source</span>
              {allSources.map(source => (
                <button
                  key={source}
                  onClick={() => toggleSource(source)}
                  className="cursor-pointer"
                >
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-1.5 py-0 h-5 leading-none transition-opacity",
                      sourceFilters.has(source) && "bg-bg-secondary",
                      sourceFilters.size > 0 && !sourceFilters.has(source) && "opacity-50"
                    )}
                  >
                    {sourceConfig[source].label}
                  </Badge>
                </button>
              ))}
            </div>
            {/* Clear */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-[10px] text-text-tertiary hover:text-text-primary transition-colors self-start cursor-pointer"
              >
                <X weight="regular" className="size-3" />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Timeline Events */}
        <div className="flex flex-col border-t border-border-tertiary pt-3.5 pb-3.5 overflow-y-auto min-h-0">
          {filteredActivities.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-text-tertiary">
              {searchQuery ? 'No activities match your search.' : 'No activities match the selected filters.'}
            </div>
          )}
          {filteredActivities.map((activity, index) => {
            const isLast = index === filteredActivities.length - 1;
            const label = getSourceLabel(activity);

            return (
              <button
                key={activity.id}
                onClick={() => onSelectActivity?.(activity)}
                className="flex gap-3 px-4 text-left hover:bg-bg-primary-hover transition-colors cursor-pointer"
              >
                {/* Icon Column with Connector Line */}
                <div className="flex flex-col items-center w-8 shrink-0">
                  <div className="size-8 rounded-full border border-border-secondary flex items-center justify-center bg-bg-white">
                    {activityIcon[activity.type]}
                  </div>
                  {!isLast && (
                    <div className="w-px bg-border-secondary mt-1 mb-1 min-h-[12px] flex-1" />
                  )}
                </div>

                {/* Content */}
                <div className={cn(
                  "flex flex-col gap-0.5 w-full",
                  !isLast && "pb-5"
                )}>
                  <span className="text-sm font-medium lasso:wght-medium text-text-primary">
                    {activity.title}
                  </span>
                  <span className="text-xs text-text-tertiary flex items-center gap-1.5 flex-wrap">
                    <span>
                      {formatTimestamp(activity.timestamp)}
                      {activity.orderId && (
                        <> &middot; <span className="font-mono">{formatOrderId(activity.orderId)}</span></>
                      )}
                    </span>
                    {label && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 leading-none">
                        {label}
                      </Badge>
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
  );
}
