'use client';

import { useState } from 'react';
import { CaretDown, CaretLeft, CaretRight, Tag, CheckCircle, WarningCircle, Circle } from '@phosphor-icons/react';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import type { Order, OrderStage, OrderStatus } from '@/types/order';

const orderIllustrations: Record<string, React.ReactNode> = {
  aerosol_mask: (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/aerosol-mask.png" alt="Aerosol Mask" className="size-40 object-contain" />
  ),
  cgm: (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/cgm-supplies.png" alt="CGM & Supplies" className="size-40 object-contain" />
  ),
  wheelchair: (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/wheelchair.png" alt="Wheelchair" className="size-40 object-contain" />
  ),
};

function getOrderIllustration(orderName: string): React.ReactNode | null {
  const name = orderName.toLowerCase();
  if (name.includes('aerosol') || name.includes('mask')) return orderIllustrations.aerosol_mask;
  if (name.includes('wheelchair')) return orderIllustrations.wheelchair;
  if (name.includes('cgm')) return orderIllustrations.cgm;
  return null;
}

export const statusBadgeConfig: Record<OrderStatus, { label: string; variant: 'success' | 'warning' | 'outline' | 'muted' }> = {
  on_track: { label: 'On Track', variant: 'success' },
  missing_info: { label: 'Action Required', variant: 'warning' },
  rejected: { label: 'Rejected', variant: 'outline' },
  completed: { label: 'Completed', variant: 'muted' },
};


interface ActiveOrdersCardProps {
  patientId: string;
  orders: Order[];
  onSelectOrder?: (order: Order) => void;
  onViewAll?: () => void;
  hideIllustrations?: boolean;
}

export function OrderCard({ order, onSelect }: { order: Order; onSelect: (order: Order) => void; hideIllustrations?: boolean }) {
  const statusConfig = statusBadgeConfig[order.status];

  return (
    <button
      onClick={() => onSelect(order)}
      className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden flex flex-col hover:bg-accent/50 transition-colors text-left cursor-pointer"
    >
      <div className="p-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium lasso:wght-medium text-text-primary">{order.orderName}</span>
            <Badge variant={statusConfig.variant} className="text-xs">
              {statusConfig.label}
            </Badge>
          </div>
          <span className="text-xs text-text-tertiary truncate">Order {order.id}</span>
        </div>
      </div>
    </button>
  );
}

const orderStages: { key: OrderStage | 'referral' | 'order_created'; label: string }[] = [
  { key: 'referral', label: 'Referral Received' },
  { key: 'order_created', label: 'Order Created' },
  { key: 'validation', label: 'Insurance Verified' },
  { key: 'eligibility', label: 'Eligibility & Benefits' },
  { key: 'qualification', label: 'Order Qualification' },
  { key: 'complete', label: 'Completed' },
];

function getStageIndex(stage: OrderStage): number {
  const stageMap: Record<OrderStage, number> = {
    validation: 2,
    eligibility: 3,
    qualification: 4,
    complete: 5,
  };
  return stageMap[stage];
}

interface StageNote {
  message: string;
  actionLabel?: string;
}

const stageNotes: Partial<Record<OrderStage, StageNote>> = {
  qualification: { message: 'Additional documentation may be required', actionLabel: 'Provide' },
  eligibility: { message: 'Awaiting carrier response for benefits', actionLabel: 'Follow Up' },
};

export function OrderProgressStepper({ order }: { order: Order }) {
  const currentIndex = getStageIndex(order.stage);
  const note = order.status === 'missing_info' ? stageNotes[order.stage] : undefined;

  return (
    <div className="flex flex-col">
      {orderStages.map((stage, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isFuture = i > currentIndex;
        const isLast = i === orderStages.length - 1;

        return (
          <div key={stage.key} className="flex gap-3">
            {/* Icon + connector */}
            <div className="flex flex-col items-center">
              {isCompleted ? (
                <CheckCircle weight="fill" className="size-5 text-text-success-primary shrink-0" />
              ) : isCurrent ? (
                <WarningCircle weight="fill" className={cn(
                  'size-5 shrink-0',
                  order.status === 'missing_info' ? 'text-text-warning-primary' : 'text-text-info-primary'
                )} />
              ) : (
                <Circle weight="regular" className="size-5 text-text-tertiary shrink-0" />
              )}
              {!isLast && (
                <div className={cn(
                  'w-px flex-1 min-h-[20px] mt-1 mb-1',
                  isCompleted ? 'bg-border-success-primary' : 'bg-border-secondary'
                )} />
              )}
            </div>

            {/* Label + note */}
            <div className={cn('flex flex-col pb-3', isLast && 'pb-0')}>
              <span className={cn(
                'text-sm leading-5',
                isCompleted && 'text-text-primary font-medium lasso:wght-medium',
                isCurrent && 'text-text-primary font-medium lasso:wght-medium',
                isFuture && 'text-text-tertiary'
              )}>
                {stage.label}
              </span>

              {isCurrent && note && (
                <div className="mt-1.5 flex items-center gap-2 rounded-md border border-dashed border-border-warning-primary bg-bg-warning-secondary px-2.5 py-1.5">
                  <span className="text-xs text-text-warning-primary flex-1">{note.message}</span>
                  {note.actionLabel && (
                    <button className="text-xs font-medium lasso:wght-medium text-text-warning-primary hover:underline cursor-pointer shrink-0">
                      {note.actionLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}


const ORDERS_PER_PAGE = 3;

function getVisiblePages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const near = new Set<number>();
  near.add(current);
  if (current > 0) near.add(current - 1);
  if (current < total - 1) near.add(current + 1);
  near.add(0);
  near.add(total - 1);

  const sorted = Array.from(near).sort((a, b) => a - b);
  const pages: (number | 'ellipsis')[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      pages.push('ellipsis');
    }
    pages.push(sorted[i]);
  }

  return pages;
}

const activeStatusLabel: Record<string, string> = {
  on_track: 'On Track',
  missing_info: 'Action Required',
  rejected: 'Rejected',
  completed: 'Completed',
};

const activeStatusVariant: Record<string, 'success' | 'warning' | 'outline' | 'secondary'> = {
  on_track: 'secondary',
  missing_info: 'warning',
  rejected: 'outline',
  completed: 'success',
};

const activeStageLabel: Record<string, string> = {
  validation: 'Validation',
  eligibility: 'Eligibility',
  qualification: 'Qualification',
  complete: 'Complete',
};

export function ActiveOrdersCard({ patientId, orders, onSelectOrder, onViewAll, hideIllustrations }: ActiveOrdersCardProps) {
  const activeOrders = orders.filter(o => o.stage !== 'complete');
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(activeOrders.length / ORDERS_PER_PAGE);
  const pagedOrders = activeOrders.slice(page * ORDERS_PER_PAGE, (page + 1) * ORDERS_PER_PAGE);

  return (
      <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">
            Active orders
          </p>
          <button
            onClick={onViewAll}
            className="text-sm text-text-secondary hover:text-text-primary hover:underline cursor-pointer"
          >
            View all orders
          </button>
        </div>

        {/* Order Cards */}
        {activeOrders.length === 0 ? (
          <div className="px-4 py-3 border-t border-border-tertiary">
            <p className="text-sm text-text-secondary">No active orders</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 px-4 py-3 border-t border-border-tertiary">
            {pagedOrders.map(order => (
              <OrderCard key={order.id} order={order} onSelect={o => onSelectOrder?.(o)} hideIllustrations={hideIllustrations} />
            ))}
          </div>
        )}
      </div>
  );
}
