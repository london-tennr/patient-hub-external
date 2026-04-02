'use client';

import Link from 'next/link';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { ArrowLeft } from '@phosphor-icons/react';
import type { Order, OrderSubStatus } from '@/types/order';

interface OrderHeaderProps {
  order: Order;
  onSubStatusChange: (status: OrderSubStatus) => void;
}

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  validation: 'outline',
  eligibility: 'secondary',
  qualification: 'secondary',
  complete: 'default',
};

export function OrderHeader({ order, onSubStatusChange }: OrderHeaderProps) {
  return (
    <header className="border-b pb-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/patients/${order.patientId}/orders`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{order.id}</h1>
            <Badge variant={stageBadgeVariant[order.stage]}>
              {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            <Link href={`/patients/${order.patientId}`} className="hover:underline">
              {order.patientName}
            </Link>{' '}
            · {order.orderType} · {order.orderName}
          </p>
          <p className="text-sm text-muted-foreground">
            Created: {new Date(order.dateCreated).toLocaleDateString()} · Last updated:{' '}
            {new Date(order.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Select value={order.subStatus} onValueChange={onSubStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="awaiting_response">Awaiting Response</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
