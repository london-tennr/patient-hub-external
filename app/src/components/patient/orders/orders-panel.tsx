'use client';

import { useState, useMemo } from 'react';
import { CaretUp, CaretDown, CaretLeft, CaretRight, Tag } from '@phosphor-icons/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@tennr/lasso/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { Separator } from '@tennr/lasso/separator';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import type { Order, OrderStatus, OrderSubStatus, OrderStage } from '@/types/order';

const subStatusLabel: Record<OrderSubStatus, string> = {
  in_progress: 'On Track',
  blocked: 'Rejected',
  awaiting_response: 'Action Required',
  completed: 'Completed',
};

const subStatusVariant: Record<OrderSubStatus, 'outline' | 'secondary' | 'destructive' | 'default' | 'warning' | 'success' | 'muted'> = {
  in_progress: 'success',
  blocked: 'outline',
  awaiting_response: 'warning',
  completed: 'muted',
};

const statusLabel: Record<OrderStatus, string> = {
  on_track: 'On Track',
  missing_info: 'Action Required',
  rejected: 'Rejected',
  completed: 'Completed',
};

const statusVariant: Record<OrderStatus, 'outline' | 'secondary' | 'destructive' | 'default' | 'warning' | 'success' | 'muted'> = {
  on_track: 'success',
  missing_info: 'warning',
  rejected: 'outline',
  completed: 'muted',
};

const stageLabel: Record<OrderStage, string> = {
  validation: 'Validation',
  eligibility: 'Eligibility',
  qualification: 'Qualification',
  complete: 'Complete',
};

const practitioners = [
  'Dr. Sarah Chen',
  'Dr. Michael Torres',
  'Dr. Anita Patel',
  'Dr. James Whitfield',
  'Dr. Lisa Nakamura',
];

const facilities = [
  'Pacific Northwest Sleep Center',
  'Cascade Pulmonary Associates',
  'Bellevue Medical Group',
  'Evergreen Health Clinic',
  'Summit Respiratory Care',
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function OrderExpandedRow({ order }: { order: Order }) {
  return (
    <tr>
      <td colSpan={6} className="p-0">
        <div className="bg-bg-secondary border-t border-border-secondary">
          {/* Items */}
          <div className="px-6 pt-4 pb-3">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Items
              </span>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Qty
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Tag weight="regular" className="size-4 text-text-tertiary shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm text-text-primary leading-5">{item.description}</span>
                      <span className="text-xs text-text-tertiary">
                        {item.hcpcsCode} &bull; {item.product}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-text-primary tabular-nums shrink-0">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Referring info */}
          <div className="px-6 pb-4 flex gap-6">
            <div className="flex-1">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Referring Practitioner
              </span>
              <div className="mt-1.5">
                <Select defaultValue={order.referringPractitioner ?? undefined}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select practitioner..." />
                  </SelectTrigger>
                  <SelectContent>
                    {practitioners.map((name) => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Referring Facility
              </span>
              <div className="mt-1.5">
                <Select defaultValue={order.referringFacility ?? undefined}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select facility..." />
                  </SelectTrigger>
                  <SelectContent>
                    {facilities.map((name) => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

function OrderRow({ order, expanded, onToggle }: { order: Order; expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="group/row cursor-pointer hover:bg-bg-primary-hover transition-colors border-b border-border-secondary last:border-b-0"
      >
        <td className="px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-text-primary">{order.orderName}</span>
            <span className="text-xs text-text-tertiary">{order.externalOrderId}</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-text-secondary">{order.orderType}</span>
        </td>
        <td className="px-4 py-3">
          <Badge variant={statusVariant[order.status]} className="text-xs">
            {statusLabel[order.status]}
          </Badge>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-text-secondary">{stageLabel[order.stage]}</span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-text-tertiary tabular-nums">{formatDate(order.lastUpdated)}</span>
        </td>
        <td className="px-4 py-3 text-right">
          {expanded ? (
            <CaretUp weight="bold" className="size-3.5 text-text-tertiary inline-block" />
          ) : (
            <CaretDown weight="bold" className="size-3.5 text-text-tertiary inline-block" />
          )}
        </td>
      </tr>
      {expanded && <OrderExpandedRow order={order} />}
    </>
  );
}

const ORDERS_PER_PAGE = 10;

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

function OrdersTable({ orders, title, count }: { orders: Order[]; title: string; count: number }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  if (orders.length === 0) return null;

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const pagedOrders = orders.slice(page * ORDERS_PER_PAGE, (page + 1) * ORDERS_PER_PAGE);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-text-primary">
        {title} <span className="text-text-tertiary font-normal">({count})</span>
      </p>
      <div className="border border-border-secondary rounded-md overflow-hidden bg-bg-white shadow-xs">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-secondary bg-bg-secondary">
              <th className="px-4 py-2 text-left text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Order</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Stage</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Last Updated</th>
              <th className="px-4 py-2 w-8" />
            </tr>
          </thead>
          <tbody>
            {pagedOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                expanded={expandedId === order.id}
                onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
              />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border-secondary">
            <p className="text-sm text-text-secondary">
              Showing {page * ORDERS_PER_PAGE + 1}-{Math.min((page + 1) * ORDERS_PER_PAGE, orders.length)} of{' '}
              {orders.length} results
            </p>
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
          </div>
        )}
      </div>
    </div>
  );
}

interface OrdersPanelProps {
  orders: Order[];
}

export function OrdersPanel({ orders }: OrdersPanelProps) {
  const { activeOrders, completedOrders } = useMemo(() => {
    const active: Order[] = [];
    const completed: Order[] = [];
    for (const order of orders) {
      if (order.status === 'completed') {
        completed.push(order);
      } else {
        active.push(order);
      }
    }
    return { activeOrders: active, completedOrders: completed };
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No orders found for this patient
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <OrdersTable orders={activeOrders} title="Active Orders" count={activeOrders.length} />
      <OrdersTable orders={completedOrders} title="Completed Orders" count={completedOrders.length} />
    </div>
  );
}
