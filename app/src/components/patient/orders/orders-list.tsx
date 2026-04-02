'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@tennr/lasso/badge';
import type { Order, OrderSubStatus } from '@/types/order';

interface OrdersListProps {
  orders: Order[];
}

const subStatusLabel: Record<OrderSubStatus, string> = {
  in_progress: 'In progress',
  blocked: 'Blocked',
  awaiting_response: 'Awaiting response',
  completed: 'Completed',
};

// Format date to M/D/YYYY
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function OrdersList({ orders }: OrdersListProps) {
  const router = useRouter();

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No orders found for this patient
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-bg-secondary">
          <th className="h-10 pl-4 pr-2 text-left text-sm font-medium lasso:wght-medium text-text-secondary border-b border-border-secondary">
            Order ID
          </th>
          <th className="h-10 px-2 text-left text-sm font-medium lasso:wght-medium text-text-secondary border-b border-border-secondary">
            Type
          </th>
          <th className="h-10 px-2 text-left text-sm font-medium lasso:wght-medium text-text-secondary border-b border-border-secondary">
            Status
          </th>
          <th className="h-10 px-2 text-left text-sm font-medium lasso:wght-medium text-text-secondary border-b border-border-secondary">
            Created
          </th>
          <th className="h-10 pl-2 pr-4 text-right text-sm font-medium lasso:wght-medium text-text-secondary border-b border-border-secondary">
            Last updated
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr
            key={order.id}
            className="border-b border-border-secondary last:border-b-0 hover:bg-bg-primary-hover transition-colors cursor-pointer"
            onClick={() => router.push(`/orders/${order.id}`)}
          >
            <td className="h-[72px] pl-4 pr-2 py-2">
              <span className="text-sm text-text-primary">{order.id}</span>
            </td>
            <td className="h-[72px] px-2 py-2">
              <span className="text-sm text-text-primary">{order.orderType}</span>
            </td>
            <td className="h-[72px] px-2 py-2">
              <Badge variant="outline" className="text-xs">
                {subStatusLabel[order.subStatus]}
              </Badge>
            </td>
            <td className="h-[72px] px-2 py-2">
              <span className="text-sm text-text-primary">{formatDate(order.dateCreated)}</span>
            </td>
            <td className="h-[72px] pl-2 pr-4 py-2 text-right">
              <span className="text-sm text-text-primary">{formatDate(order.lastUpdated)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
