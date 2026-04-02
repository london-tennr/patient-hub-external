'use client';

import { cn } from '@tennr/lasso/utils/cn';
import type { PatientStatus } from '@/types/patient';

export type StatusCategory = 'on_track' | 'action_required' | 'blocked' | 'closed';

/** Maps each category to the underlying PatientStatus values it includes */
export const STATUS_CATEGORY_MAP: Record<StatusCategory, PatientStatus[]> = {
  on_track: ['on_track'],
  action_required: ['missing_info', 'needs_attention'],
  blocked: ['blocked'],
  closed: ['completed', 'inactive'],
};

const CATEGORY_CONFIG: {
  id: StatusCategory;
  label: string;
  dotColor: string;
}[] = [
  { id: 'on_track', label: 'On Track', dotColor: 'bg-[#4a7a4a]' },
  { id: 'action_required', label: 'Action Required', dotColor: 'bg-[#c5a24d]' },
  { id: 'blocked', label: 'Blocked', dotColor: 'bg-[#b44a3a]' },
  { id: 'closed', label: 'Archived', dotColor: 'bg-[#8a8a7e]' },
];

interface PatientStatusBarProps {
  statusCounts: Record<PatientStatus, number>;
  totalCount: number;
  activeCategory: StatusCategory | null;
  onCategoryChange: (category: StatusCategory | null) => void;
}

export function PatientStatusBar({
  statusCounts,
  totalCount,
  activeCategory,
  onCategoryChange,
}: PatientStatusBarProps) {
  const isAllActive = activeCategory === null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        {/* All tab */}
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1 text-sm font-medium transition-colors rounded-sm',
            isAllActive
              ? 'bg-border text-text-primary'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          All
          <span className="text-xs bg-bg-tertiary text-text-secondary rounded-full px-1.5 py-0.5 min-w-[20px] text-center tabular-nums">
            {totalCount}
          </span>
        </button>

        {/* Category tabs */}
        {CATEGORY_CONFIG.map((cat) => {
          const count = STATUS_CATEGORY_MAP[cat.id].reduce(
            (sum, s) => sum + statusCounts[s],
            0
          );
          if (count === 0) return null;

          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(isActive ? null : cat.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 text-sm font-medium transition-colors rounded-sm',
                isActive
                  ? 'bg-border text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              <span
                className={cn('size-2 rounded-full shrink-0', cat.dotColor)}
              />
              {cat.label}
              <span className="text-xs bg-bg-tertiary text-text-secondary rounded-full px-1.5 py-0.5 min-w-[20px] text-center tabular-nums">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
