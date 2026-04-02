'use client';

import { useState, useMemo, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type VisibilityState,
  type ColumnOrderState,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { CaretLeft, CaretRight, CaretUp, CaretDown, Archive } from '@phosphor-icons/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import type { Order, OrderStatus } from '@/types/order';

const statusConfig: Record<OrderStatus, { label: string; variant: 'default' | 'warning' | 'destructive' | 'outline' }> = {
  on_track: { label: 'On Track', variant: 'default' },
  missing_info: { label: 'Missing Info', variant: 'warning' },
  rejected: { label: 'Rejected', variant: 'destructive' },
  completed: { label: 'Completed', variant: 'outline' },
};

const stageLabels: Record<string, string> = {
  validation: 'Patient Intake',
  eligibility: 'Resupply Confirmed',
  qualification: 'Prior Auth',
  complete: 'Complete',
};

const columnHelper = createColumnHelper<Order>();

function createColumns() {
  return [
    columnHelper.accessor('patientName', {
      id: 'patientName',
      header: 'Patient name',
      cell: (info) => {
        const order = info.row.original;
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-primary">{info.getValue()}</span>
            <span className="text-xs text-text-secondary">{order.patientDob}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor('orderType', {
      id: 'orderType',
      header: 'Order type',
      cell: (info) => (
        <span className="text-sm text-text-primary truncate block max-w-[160px]">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: (info) => {
        const config = statusConfig[info.getValue()];
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    }),
    columnHelper.accessor('stage', {
      id: 'stage',
      header: 'Stage',
      cell: (info) => (
        <span className="text-sm text-text-primary">{stageLabels[info.getValue()] ?? info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('statusUpdated', {
      id: 'statusUpdated',
      header: 'Status updated',
      cell: (info) => (
        <span className="text-sm text-text-secondary">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('orderAge', {
      id: 'orderAge',
      header: 'Order age',
      cell: (info) => (
        <span className="text-sm text-text-secondary">{info.getValue()}</span>
      ),
    }),
    columnHelper.display({
      id: 'facilityPractitioner',
      header: 'Facility and Practitioner',
      cell: ({ row }) => {
        const order = row.original;
        if (!order.referringFacility) {
          return <span className="text-sm text-text-secondary">—</span>;
        }
        return (
          <div className="flex flex-col max-w-[180px]">
            <span className="text-sm font-medium text-text-primary truncate">
              {order.referringFacility?.substring(0, 20)}{(order.referringFacility?.length ?? 0) > 20 ? '...' : ''}
            </span>
            <span className="text-xs text-text-secondary truncate">{order.referringPractitioner}</span>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'archive',
      header: 'Archive',
      cell: () => (
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center size-8 rounded-md hover:bg-bg-secondary-hover transition-colors"
        >
          <Archive weight="regular" className="size-4 text-icon-secondary" />
        </button>
      ),
    }),
  ];
}

export function useOrdersTable(orders: Order[]) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const cols = useMemo(() => createColumns(), []);

  const table = useReactTable({
    data: orders,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
      pagination,
    },
  });

  return table;
}

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

interface OrdersTableContentProps {
  table: ReturnType<typeof useOrdersTable>;
  onOrderClick?: (order: Order) => void;
}

export function OrdersTableContent({ table, onOrderClick }: OrdersTableContentProps) {
  if (table.getRowModel().rows.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No orders found
      </div>
    );
  }

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <>
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-bg-secondary h-10 border-b border-border hover:bg-bg-secondary"
            >
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'text-muted-foreground font-medium h-full',
                      canSort && 'cursor-pointer select-none hover:text-foreground transition-colors'
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {canSort && (
                        <span className="flex flex-col -space-y-1">
                          <CaretUp
                            weight="bold"
                            className={cn(
                              'size-3',
                              sorted === 'asc' ? 'text-foreground' : 'text-muted-foreground/40'
                            )}
                          />
                          <CaretDown
                            weight="bold"
                            className={cn(
                              'size-3',
                              sorted === 'desc' ? 'text-foreground' : 'text-muted-foreground/40'
                            )}
                          />
                        </span>
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onOrderClick?.(row.original)}
              className="cursor-pointer h-[52px] border-b border-border hover:bg-accent/50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-foreground">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pageCount > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-text-secondary">
            Showing {currentPage * 10 + 1}-{Math.min((currentPage + 1) * 10, table.getRowCount())} of{' '}
            {table.getRowCount()} results
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-1 px-2 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <CaretLeft weight="regular" className="size-3.5" />
              Previous
            </button>

            {getVisiblePages(currentPage, pageCount).map((page, i) =>
              page === 'ellipsis' ? (
                <span key={`ellipsis-${i}`} className="flex items-center justify-center size-8 text-sm text-text-secondary">
                  &middot;&middot;&middot;
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => table.setPageIndex(page)}
                  className={cn(
                    'flex items-center justify-center size-8 text-sm rounded-md transition-colors cursor-pointer',
                    page === currentPage
                      ? 'border border-border-primary text-text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {page + 1}
                </button>
              )
            )}

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-1 px-2 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              Next
              <CaretRight weight="regular" className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
