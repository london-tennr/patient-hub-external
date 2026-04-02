'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Badge } from '@tennr/lasso/badge';
import { ArrowRight } from '@phosphor-icons/react';
import type { Order } from '@/types/order';

interface OrdersCardProps {
  patientId: string;
  orders: Order[];
}

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  validation: 'outline',
  eligibility: 'secondary',
  qualification: 'secondary',
  complete: 'default',
};

export function OrdersCard({ patientId, orders }: OrdersCardProps) {
  const activeOrders = orders.filter(o => o.stage !== 'complete');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Orders ({activeOrders.length})</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/patients/${patientId}/orders`}>
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {activeOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active orders</p>
        ) : (
          <div className="space-y-3">
            {activeOrders.slice(0, 3).map(order => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{order.orderName}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <Badge variant={stageBadgeVariant[order.stage]}>
                    {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
