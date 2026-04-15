'use client';

import { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlass, FunnelSimple, X } from '@phosphor-icons/react';
import { FilterGroup, type FilterCategoryType, type FilterState } from '@tennr/lasso/filter-group';
import { Badge } from '@tennr/lasso/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@tennr/lasso/pagination';
import { cn } from '@tennr/lasso/utils/cn';
import type { Order, OrderStatus, OrderStage } from '@/types/order';

const ORDERS_PER_PAGE = 10;

const orderStatusLabel: Record<OrderStatus, string> = {
  on_track: 'On Track',
  missing_info: 'Missing Info',
  rejected: 'Rejected',
  completed: 'Completed',
};

const orderStatusVariant: Record<OrderStatus, 'success' | 'warning' | 'destructive' | 'outline' | 'muted'> = {
  on_track: 'success',
  missing_info: 'warning',
  rejected: 'destructive',
  completed: 'muted',
};

const orderFilterCategories: FilterCategoryType[] = [
  {
    id: 'status',
    label: 'Status',
    variant: 'command',
    childVariant: 'checkbox',
    values: [
      { id: 'on_track', label: 'On Track' },
      { id: 'missing_info', label: 'Missing Info' },
      { id: 'rejected', label: 'Rejected' },
      { id: 'completed', label: 'Completed' },
    ],
  },
];

interface OrdersPanelProps {
  orders: Order[];
  onSelectOrder?: (order: Order) => void;
}

export function OrdersPanel({ orders, onSelectOrder }: OrdersPanelProps) {
  const [searchValue, setSearchValue] = useState('');
  const [filterState, setFilterState] = useState<FilterState>([]);
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);
  const [page, setPage] = useState(0);

  const filteredOrders = useMemo(() => {
    let result = orders;

    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      result = result.filter((o) =>
        o.orderName.toLowerCase().includes(q) ||
        o.externalOrderId.toLowerCase().includes(q) ||
        o.orderType.toLowerCase().includes(q) ||
        (o.referringFacility ?? '').toLowerCase().includes(q) ||
        (o.referringPractitioner ?? '').toLowerCase().includes(q)
      );
    }

    for (const filterInstance of filterState) {
      if (!filterInstance.value) continue;
      const val = filterInstance.value;

      if (filterInstance.filterId === 'status' && Array.isArray(val) && val.length > 0) {
        result = result.filter((o) => (val as string[]).includes(o.status));
      }
    }

    return result;
  }, [orders, searchValue, filterState]);

  useEffect(() => { setPage(0); }, [searchValue, filterState]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const pagedOrders = filteredOrders.slice(page * ORDERS_PER_PAGE, (page + 1) * ORDERS_PER_PAGE);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No orders found for this patient
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="border border-border-tertiary rounded-md overflow-hidden bg-bg-white shadow-xs">
        {/* Title */}
        <div className="px-4 py-3">
          <div className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">Orders</div>
        </div>

        {/* Search + Filter Top Bar */}
        <div className="flex flex-col w-full border-t border-border-secondary border-b border-b-border">
          <div className="flex items-center w-full p-2 gap-4 bg-white">
            <div className="flex-1 flex flex-col items-start h-full">
              <div className="bg-neutral-2 flex items-center gap-1 px-3 py-1 rounded-sm shadow-xs w-full h-7">
                <div className="size-4 shrink-0 flex items-center justify-center">
                  <MagnifyingGlass weight="regular" className="text-muted-foreground w-full h-full" />
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by order type, ID, facility, or practitioner"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground font-body h-full leading-[20px]"
                />
                {searchValue.length > 0 && (
                  <button
                    onClick={() => setSearchValue('')}
                    className="size-4 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-3 transition-colors"
                    aria-label="Clear search"
                  >
                    <X weight="bold" className="size-3 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFilterRowVisible(!isFilterRowVisible)}
                className={`flex items-center justify-center size-7 rounded-full border border-border bg-white shadow-xs hover:bg-accent transition-colors ${isFilterRowVisible ? 'bg-accent' : ''}`}
              >
                <FunnelSimple weight="regular" className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          {isFilterRowVisible && (
            <div className="flex items-center gap-2 px-2 py-1.5 bg-white border-t border-border min-h-11">
              <FilterGroup
                filters={orderFilterCategories}
                state={filterState}
                onChange={setFilterState}
                onClearAll={() => setFilterState([])}
              />
            </div>
          )}
        </div>

        {/* Table */}
        {filteredOrders.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-text-tertiary">
            No orders match your search or filters
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-bg-secondary border-b border-border-secondary">
                <th className="h-10 pl-4 pr-2 text-left text-sm font-medium lasso:wght-medium text-text-secondary">Order type</th>
                <th className="h-10 px-2 text-left text-sm font-medium lasso:wght-medium text-text-secondary">Status</th>
                <th className="h-10 px-2 text-left text-sm font-medium lasso:wght-medium text-text-secondary table-cell">Facility and Practitioner</th>
              </tr>
            </thead>
            <tbody>
              {pagedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border-secondary last:border-b-0 hover:bg-bg-primary-hover transition-colors cursor-pointer"
                  onClick={() => onSelectOrder?.(order)}
                >
                  <td className="pl-4 pr-2 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-text-primary">{order.orderName}</span>
                      <span className="text-xs text-text-tertiary">{order.externalOrderId}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <Badge variant={orderStatusVariant[order.status]} className="text-xs">
                      {orderStatusLabel[order.status]}
                    </Badge>
                  </td>
                  <td className="px-2 py-3 table-cell">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-medium text-text-primary">
                        {order.referringFacility ?? '—'}
                      </span>
                      <span className="text-xs text-text-tertiary uppercase tracking-wide">
                        {order.referringPractitioner ?? '—'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination outside the card */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-text-secondary">
            Showing {page * ORDERS_PER_PAGE + 1}-{Math.min((page + 1) * ORDERS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length} results
          </span>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  className={cn(page === 0 && 'pointer-events-none opacity-40')}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={i === page}
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  className={cn(page === totalPages - 1 && 'pointer-events-none opacity-40')}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
