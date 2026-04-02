'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CaretDown, CaretLeft, CaretRight, Tag, CheckCircle, WarningCircle, Circle } from '@phosphor-icons/react';
import { Badge } from '@tennr/lasso/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@tennr/lasso/sheet';
import { cn } from '@tennr/lasso/utils/cn';
import type { Order, OrderStage, OrderStatus } from '@/types/order';

const statusBadgeConfig: Record<OrderStatus, { label: string; variant: 'success' | 'warning' | 'destructive' | 'outline' }> = {
  on_track: { label: 'On Track', variant: 'success' },
  missing_info: { label: 'Missing Info', variant: 'warning' },
  rejected: { label: 'Rejected', variant: 'destructive' },
  completed: { label: 'Completed', variant: 'outline' },
};

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

interface ActiveOrdersCardProps {
  patientId: string;
  orders: Order[];
}

function OrderCard({ order, onSelect }: { order: Order; onSelect: (order: Order) => void }) {
  const statusConfig = statusBadgeConfig[order.status];
  const illustration = getOrderIllustration(order.orderName);

  return (
    <button
      onClick={() => onSelect(order)}
      className="bg-bg-white border border-border-secondary rounded-md overflow-hidden flex flex-col hover:bg-bg-primary-hover transition-colors text-left cursor-pointer"
    >
      {/* Illustration */}
      {illustration && (
        <div className="flex items-center justify-center pt-3 text-text-tertiary">
          {illustration}
        </div>
      )}

      {/* Header */}
      <div className="p-3">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium lasso:wght-medium text-text-primary">{order.orderName}</span>
            <Badge variant={statusConfig.variant} className="text-xs">
              {statusConfig.label}
            </Badge>
          </div>
          <span className="text-xs text-text-tertiary truncate">ID: {order.externalOrderId}</span>
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

function OrderProgressStepper({ order }: { order: Order }) {
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

function OrderDetailDrawer({ order, open, onClose }: { order: Order | null; open: boolean; onClose: () => void }) {
  if (!order) return null;

  const statusConfig = statusBadgeConfig[order.status];
  const illustration = getOrderIllustration(order.orderName);

  return (
    <Sheet open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <SheetContent className="w-[440px] sm:w-[440px] p-0 overflow-y-auto">
        {/* Hero section with illustration */}
        <div className="bg-bg-secondary px-6 pt-6 pb-5">
          <SheetHeader className="p-0">
            <div className="flex items-center gap-2.5">
              <SheetTitle className="text-lg">{order.orderName}</SheetTitle>
              <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
            </div>
            <p className="text-xs text-text-tertiary font-mono mt-1">ID: {order.externalOrderId}</p>
          </SheetHeader>

          {illustration && (
            <div className="flex items-center justify-center mt-4">
              {illustration}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Order info row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-text-tertiary uppercase tracking-wide">Type</span>
              <span className="text-sm text-text-primary">{order.orderType}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-text-tertiary uppercase tracking-wide">Stage</span>
              <span className="text-sm text-text-primary capitalize">{order.stage}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border-secondary" />

          {/* Order Progress */}
          <div>
            <span className="text-xs text-text-tertiary uppercase tracking-wide">Order Progress</span>
            <div className="mt-2">
              <OrderProgressStepper order={order} />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border-secondary" />

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-tertiary uppercase tracking-wide">Items</span>
              <span className="text-xs text-text-tertiary uppercase tracking-wide">Qty</span>
            </div>
            <div className="bg-bg-secondary rounded-md border border-border-secondary">
              {order.items.map((item, i) => (
                <div key={item.id} className={cn(
                  "flex items-start gap-2.5 px-3 py-3",
                  i > 0 && "border-t border-border-secondary"
                )}>
                  <Tag weight="regular" className="size-4 text-text-tertiary shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary leading-5">{item.description}</p>
                    <p className="text-xs text-text-tertiary mt-0.5">{item.hcpcsCode} &bull; {item.product}</p>
                  </div>
                  <span className="text-sm font-medium lasso:wght-medium text-text-primary shrink-0">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border-secondary" />

          {/* Referring Practitioner */}
          <div>
            <span className="text-xs text-text-tertiary uppercase tracking-wide">Referring Practitioner</span>
            <div className="flex items-center justify-between px-3 py-2.5 mt-2 bg-bg-white border border-border-secondary rounded-md hover:border-border-primary transition-colors cursor-pointer">
              <span className={cn(
                'text-sm',
                order.referringPractitioner ? 'text-text-primary' : 'text-text-placeholder'
              )}>
                {order.referringPractitioner ?? 'Select practitioner...'}
              </span>
              <CaretDown weight="regular" className="size-4 text-text-tertiary" />
            </div>
          </div>

          {/* Referring Facility */}
          <div>
            <span className="text-xs text-text-tertiary uppercase tracking-wide">Referring Facility</span>
            <div className="flex items-center justify-between px-3 py-2.5 mt-2 bg-bg-white border border-border-secondary rounded-md hover:border-border-primary transition-colors cursor-pointer">
              <span className={cn(
                'text-sm',
                order.referringFacility ? 'text-text-primary' : 'text-text-placeholder'
              )}>
                {order.referringFacility ?? 'Select facility...'}
              </span>
              <CaretDown weight="regular" className="size-4 text-text-tertiary" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
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

export function ActiveOrdersCard({ patientId, orders }: ActiveOrdersCardProps) {
  const activeOrders = orders.filter(o => o.stage !== 'complete');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(activeOrders.length / ORDERS_PER_PAGE);
  const pagedOrders = activeOrders.slice(page * ORDERS_PER_PAGE, (page + 1) * ORDERS_PER_PAGE);

  return (
    <>
      <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-secondary">
          <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">
            Active orders
          </p>
          <Link
            href={`/patients/${patientId}/orders`}
            className="text-sm text-text-secondary hover:text-text-primary hover:underline"
          >
            View all orders
          </Link>
        </div>

        {/* Order Cards */}
        {activeOrders.length === 0 ? (
          <div className="px-4 py-3 border-t border-border-secondary">
            <p className="text-sm text-text-secondary">No active orders</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 px-4 py-3">
            {pagedOrders.map(order => (
              <OrderCard key={order.id} order={order} onSelect={setSelectedOrder} />
            ))}
          </div>
        )}

        {/* Footer with pagination */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border-tertiary">
          <span className="text-xs text-text-secondary">
            {activeOrders.length} order{activeOrders.length !== 1 ? 's' : ''}
          </span>
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

      <OrderDetailDrawer
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
