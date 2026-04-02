'use client';

import { useState } from 'react';
import { CaretUp, CaretDown, Tag } from '@phosphor-icons/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@tennr/lasso/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { Separator } from '@tennr/lasso/separator';
import { Badge } from '@tennr/lasso/badge';
import type { Order, OrderSubStatus } from '@/types/order';

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

const subStatusLabel: Record<OrderSubStatus, string> = {
  in_progress: 'In Progress',
  blocked: 'Blocked',
  awaiting_response: 'Awaiting Response',
  completed: 'Completed',
};

const subStatusVariant: Record<OrderSubStatus, 'outline' | 'secondary' | 'destructive' | 'default'> = {
  in_progress: 'secondary',
  blocked: 'destructive',
  awaiting_response: 'outline',
  completed: 'default',
};

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-bg-white border border-border-secondary rounded-md shadow-xs overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="flex items-start justify-between w-full p-4 text-left hover:bg-bg-primary-hover transition-colors">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium lasso:wght-medium text-text-primary">
                  {order.orderName}
                </span>
                <Badge variant={subStatusVariant[order.subStatus]} className="text-xs">
                  {subStatusLabel[order.subStatus]}
                </Badge>
              </div>
              <span className="text-xs text-text-tertiary">
                External order ID: {order.externalOrderId}
              </span>
            </div>
            {isOpen ? (
              <CaretUp weight="bold" className="size-4 text-text-tertiary shrink-0 mt-0.5" />
            ) : (
              <CaretDown weight="bold" className="size-4 text-text-tertiary shrink-0 mt-0.5" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Separator />

          {/* Items table */}
          <div className="px-4 pt-3 pb-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-medium lasso:wght-medium text-text-secondary uppercase tracking-wide">
                Items
              </span>
              <span className="text-xs font-medium lasso:wght-medium text-text-secondary uppercase tracking-wide">
                Quantity
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Tag weight="regular" className="size-4 text-text-tertiary shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm text-text-primary leading-5">
                        {item.description}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {item.hcpcsCode} &bull; {item.product}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-text-primary tabular-nums shrink-0">
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Referring Practitioner */}
          <div className="px-4 pt-3 pb-4">
            <span className="text-sm font-medium lasso:wght-medium text-text-primary">
              Referring Practitioner
            </span>
            <Separator className="my-2" />
            <Select defaultValue={order.referringPractitioner ?? undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select practitioner..." />
              </SelectTrigger>
              <SelectContent>
                {practitioners.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Referring Facility */}
          <div className="px-4 pb-4">
            <span className="text-sm font-medium lasso:wght-medium text-text-primary">
              Referring Facility
            </span>
            <Separator className="my-2" />
            <Select defaultValue={order.referringFacility ?? undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select facility..." />
              </SelectTrigger>
              <SelectContent>
                {facilities.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

interface OrdersPanelProps {
  orders: Order[];
}

export function OrdersPanel({ orders }: OrdersPanelProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No orders found for this patient
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-medium lasso:wght-medium text-text-primary">
        Active Orders ({orders.length})
      </p>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
