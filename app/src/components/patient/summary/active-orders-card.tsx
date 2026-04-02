'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@tennr/lasso/badge';
import type { Order, OrderStage } from '@/types/order';

interface ActiveOrdersCardProps {
  patientId: string;
  orders: Order[];
}

const stageLabel: Record<OrderStage, string> = {
  validation: 'Validation',
  eligibility: 'Eligibility',
  qualification: 'Qualification',
  complete: 'Complete',
};

export function ActiveOrdersCard({ patientId, orders }: ActiveOrdersCardProps) {
  const router = useRouter();
  const activeOrders = orders.filter(o => o.stage !== 'complete');

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
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

      {/* Order Rows */}
      {activeOrders.length === 0 ? (
        <div className="px-4 py-3 border-t border-border-secondary">
          <p className="text-sm text-text-secondary">No active orders</p>
        </div>
      ) : (
        <div>
          {activeOrders.map(order => (
            <div
              key={order.id}
              className="flex items-center justify-between px-4 py-3 border-t border-border-secondary cursor-pointer hover:bg-bg-primary-hover transition-colors"
              onClick={() => router.push(`/patients/${patientId}/orders?order=${order.id}`)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Order number</span>
                <span className="text-sm font-medium lasso:wght-medium text-text-primary">{order.orderName}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {stageLabel[order.stage]}
              </Badge>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end px-4 py-2 bg-bg-secondary border-t border-border-tertiary">
        <span className="text-xs text-text-secondary">
          Total: {activeOrders.length} order{activeOrders.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
