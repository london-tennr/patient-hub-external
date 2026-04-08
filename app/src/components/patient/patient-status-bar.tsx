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
  { id: 'on_track', label: 'In Progress', dotColor: 'bg-[#4a7a4a]' },
  { id: 'action_required', label: 'Action Required', dotColor: 'bg-[#c5a24d]' },
  { id: 'blocked', label: 'Blocked', dotColor: 'bg-[#ef4444]' },
  { id: 'closed', label: 'Complete', dotColor: 'bg-[#c46a4a]' },
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
    <div className="flex items-start gap-6">
      {/* All */}
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          'flex flex-col gap-0.5 transition-opacity',
          activeCategory && 'opacity-40'
        )}
      >
        <span className="text-xs text-text-secondary">All</span>
        <span className="text-sm font-semibold text-text-primary tabular-nums">{totalCount}</span>
      </button>

      {CATEGORY_CONFIG.map((cat) => {
        const count = STATUS_CATEGORY_MAP[cat.id].reduce(
          (sum, s) => sum + statusCounts[s],
          0
        );
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(isActive ? null : cat.id)}
            className={cn(
              'flex flex-col gap-0.5 transition-opacity',
              activeCategory && !isActive && 'opacity-40'
            )}
          >
            <span className="text-xs text-text-secondary">{cat.label}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-text-primary tabular-nums">{count}</span>
              <span className={cn('size-2.5 rounded-xs shrink-0', cat.dotColor)} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

