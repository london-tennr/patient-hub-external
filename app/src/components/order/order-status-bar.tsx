'use client';

import { cn } from '@tennr/lasso/utils/cn';
import type { OrderStatus } from '@/types/order';

export type OrderStatusCategory = OrderStatus;

const CATEGORY_CONFIG: {
  id: OrderStatusCategory;
  label: string;
  dotColor: string;
}[] = [
  { id: 'on_track', label: 'On Track', dotColor: 'bg-[var(--green-9)]' },
  { id: 'missing_info', label: 'Missing Info', dotColor: 'bg-[var(--amber-9)]' },
  { id: 'rejected', label: 'Rejected', dotColor: 'bg-[#b44a3a]' },
  { id: 'completed', label: 'Completed', dotColor: 'bg-[#8a8a7e]' },
];

interface OrderStatusBarProps {
  statusCounts: Record<OrderStatus, number>;
  totalCount: number;
  activeCategory: OrderStatusCategory | null;
  onCategoryChange: (category: OrderStatusCategory | null) => void;
}

export function OrderStatusBar({
  statusCounts,
  totalCount,
  activeCategory,
  onCategoryChange,
}: OrderStatusBarProps) {
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
        const count = statusCounts[cat.id] ?? 0;
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
