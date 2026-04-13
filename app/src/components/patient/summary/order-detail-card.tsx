'use client';

import { useState } from 'react';
import { CaretDown, Clock } from '@phosphor-icons/react';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@tennr/lasso/tabs';
import { cn } from '@tennr/lasso/utils/cn';
import type { Order, OrderStage, OrderStatus } from '@/types/order';

const statusBadgeConfig: Record<OrderStatus, { label: string; variant: 'success' | 'warning' | 'outline' | 'muted' }> = {
  on_track: { label: 'On Track', variant: 'success' },
  missing_info: { label: 'Missing Info', variant: 'warning' },
  rejected: { label: 'Rejected', variant: 'outline' },
  completed: { label: 'Completed', variant: 'muted' },
};

const stages: { id: OrderStage; label: string }[] = [
  { id: 'validation', label: 'Patient Intake' },
  { id: 'eligibility', label: 'Payer Verified' },
  { id: 'qualification', label: 'Resupply Confirmed' },
  { id: 'complete', label: 'Ready for Shipment' },
];

const stageOrder: OrderStage[] = ['validation', 'eligibility', 'qualification', 'complete'];

interface OrderDetailCardProps {
  orders: Order[];
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

function OrderStageProgress({ order }: { order: Order }) {
  const currentIndex = stageOrder.indexOf(order.stage);
  const isWarning = order.status === 'missing_info';
  const isError = order.status === 'rejected';

  return (
    <div className="flex gap-1 w-full">
      {stages.map((stage, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isFuture = i > currentIndex;

        let barColor = 'bg-border-secondary';
        if (isCompleted) barColor = 'bg-[var(--green-9)]';
        if (isCurrent && isWarning) barColor = 'bg-[var(--amber-9)]';
        if (isCurrent && isError) barColor = 'bg-[#b44a3a]';
        if (isCurrent && !isWarning && !isError) barColor = 'bg-[var(--green-9)]';

        return (
          <div key={stage.id} className="flex-1 flex flex-col gap-1.5">
            <div className={cn('h-1 rounded-full', barColor)} />
            <span className={cn(
              'text-xs',
              isFuture ? 'text-text-tertiary' : 'text-text-primary'
            )}>
              {stage.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function OrderDetailCard({ orders }: OrderDetailCardProps) {
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeOrders = orders.filter(o => o.stage !== 'complete');
  if (activeOrders.length === 0) return null;

  const order = activeOrders[selectedOrderIndex] ?? activeOrders[0];
  const statusConfig = statusBadgeConfig[order.status];

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Status + Payer Row */}
      <div className="flex items-start gap-8 px-4 pt-4 pb-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide">Order Status</span>
          <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide">Payer</span>
          <span className="text-sm text-text-secondary">—</span>
        </div>
      </div>

      {/* Order selector */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">Order</span>
          <span className="text-sm text-text-secondary">Received {formatTimeAgo(order.dateCreated)}</span>
        </div>

        {/* Order dropdown */}
        <div className="relative mt-2">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full px-4 py-3 border border-border-secondary rounded-md hover:bg-bg-primary-hover transition-colors"
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-base font-medium text-text-primary">{order.orderName}</span>
              <span className="text-sm text-text-tertiary">External order ID: {order.externalOrderId}</span>
            </div>
            <CaretDown weight="regular" className={cn(
              'size-5 text-text-tertiary transition-transform',
              isDropdownOpen && 'rotate-180'
            )} />
          </button>

          {isDropdownOpen && activeOrders.length > 1 && (
            <div className="absolute z-10 mt-1 w-full bg-bg-white border border-border-secondary rounded-md shadow-md overflow-hidden">
              {activeOrders.map((o, i) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSelectedOrderIndex(i);
                    setIsDropdownOpen(false);
                  }}
                  className={cn(
                    'flex flex-col items-start gap-0.5 w-full px-4 py-3 hover:bg-bg-primary-hover transition-colors text-left',
                    i > 0 && 'border-t border-border-secondary'
                  )}
                >
                  <span className="text-sm font-medium text-text-primary">{o.orderName}</span>
                  <span className="text-xs text-text-tertiary">External order ID: {o.externalOrderId}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs defaultValue="processing" className="w-full">
          <TabsList variant="line">
            <TabsTrigger variant="line" value="processing">Order processing</TabsTrigger>
            <TabsTrigger variant="line" value="calls">Call history</TabsTrigger>
            <TabsTrigger variant="line" value="documents">Documents</TabsTrigger>
            <TabsTrigger variant="line" value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="processing" className="mt-4 pb-4">
            <OrderStageProgress order={order} />
            <div className="flex items-center justify-end mt-4">
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <Clock weight="regular" className="size-4" />
                Updated {formatTimeAgo(order.lastUpdated)}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calls" className="mt-4 pb-4">
            <p className="text-sm text-text-secondary">No call history available.</p>
          </TabsContent>

          <TabsContent value="documents" className="mt-4 pb-4">
            {order.documents.length === 0 ? (
              <p className="text-sm text-text-secondary">No documents attached.</p>
            ) : (
              <div className="space-y-2">
                {order.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between py-2 border-b border-border-secondary last:border-0">
                    <span className="text-sm text-text-primary">{doc.name}</span>
                    <span className="text-xs text-text-secondary">{new Date(doc.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="mt-4 pb-4">
            {order.notes.length === 0 ? (
              <p className="text-sm text-text-secondary">No notes yet.</p>
            ) : (
              <div className="space-y-2">
                {order.notes.map(note => (
                  <div key={note.id} className="flex flex-col gap-0.5 py-2 border-b border-border-secondary last:border-0">
                    <p className="text-sm text-text-primary">{note.content}</p>
                    <span className="text-xs text-text-secondary">{note.author} · {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
