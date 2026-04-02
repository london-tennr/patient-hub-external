'use client';

import { useState, useMemo, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
  type VisibilityState,
  type ColumnOrderState,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { CaretLeft, CaretRight, CaretUp, CaretDown, CheckCircle, WarningCircle, CircleNotch, Circle, Copy, Check } from '@phosphor-icons/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import { Tooltip, TooltipTrigger, TooltipContent } from '@tennr/lasso/tooltip';
import type { Patient, PatientPriority, PatientStage, PatientStatus } from '@/types/patient';

const statusBadgeConfig: Record<PatientStatus, { label: string; variant: 'success' | 'warning' | 'destructive' | 'muted' | 'outline' | 'info' }> = {
  on_track: { label: 'On Track', variant: 'success' },
  missing_info: { label: 'Missing Info', variant: 'warning' },
  needs_attention: { label: 'Needs Attention', variant: 'destructive' },
  blocked: { label: 'Blocked', variant: 'destructive' },
  completed: { label: 'Completed', variant: 'muted' },
  inactive: { label: 'Inactive', variant: 'outline' },
};

const priorityConfig: Record<PatientPriority, { label: string; variant: 'destructive' | 'warning' | 'muted' }> = {
  p0: { label: 'P0', variant: 'destructive' },
  p1: { label: 'P1', variant: 'destructive' },
  p2: { label: 'P2', variant: 'destructive' },
  p3: { label: 'P3', variant: 'warning' },
  p4: { label: 'P4', variant: 'warning' },
  p5: { label: 'P5', variant: 'warning' },
  p6: { label: 'P6', variant: 'muted' },
  p7: { label: 'P7', variant: 'muted' },
  p8: { label: 'P8', variant: 'muted' },
};

const tennrStatusConfig: Record<Patient['tennrStatus'], { label: string; dotColor: string }> = {
  in_queue: { label: 'In Queue', dotColor: 'bg-yellow-500' },
  processing: { label: 'Processing', dotColor: 'bg-blue-500' },
  completed: { label: 'Completed', dotColor: 'bg-green-500' },
  idle: { label: 'Idle', dotColor: 'bg-neutral-400' },
};

const stageConfig: Record<PatientStage, { label: string; step: number }> = {
  referral_received: { label: 'Referral Received', step: 1 },
  intake_review: { label: 'Intake Review', step: 2 },
  insurance_verification: { label: 'Insurance Verification', step: 3 },
  prior_authorization: { label: 'Prior Authorization', step: 4 },
  scheduling: { label: 'Scheduling', step: 5 },
  ready_for_claim: { label: 'Ready for Claim', step: 6 },
  claim_submitted: { label: 'Claim Submitted', step: 7 },
};

const TOTAL_STAGES = 7;

const stageOrder: PatientStage[] = [
  'referral_received',
  'intake_review',
  'insurance_verification',
  'prior_authorization',
  'scheduling',
  'ready_for_claim',
  'claim_submitted',
];

interface PatientsTableProps {
  patients: Patient[];
  onPatientClick: (patient: Patient) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

function formatAddress(address: Patient['address']): string {
  return address.street;
}

function formatLastUpdated(lastSynced: string): string {
  const date = new Date(lastSynced);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(lastSynced);
}

const columnHelper = createColumnHelper<Patient>();

export type OnFilterBy = (filterId: string, value: string) => void;

function CopyableValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span
      onClick={handleCopy}
      className="relative inline-flex items-center cursor-pointer group hover:text-text-primary transition-colors"
    >
      {label} {value}
      <span className={cn(
        'absolute -right-0.5 top-1/2 -translate-y-1/2 flex items-center justify-center size-4 rounded-sm transition-opacity',
        copied ? 'opacity-100 bg-white shadow-xs' : 'opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:shadow-xs'
      )}>
        {copied ? (
          <Check weight="bold" className="size-3 text-[var(--green-9)]" />
        ) : (
          <Copy weight="regular" className="size-3 text-text-secondary" />
        )}
      </span>
    </span>
  );
}

function createColumns(onFilterBy?: OnFilterBy) {
  return [
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
      id: 'patient',
      header: 'Patient',
      cell: (info) => {
        const patient = info.row.original;
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">{info.getValue()}</span>
            <span className="text-xs text-text-secondary flex items-center gap-0.5 flex-wrap">
              {formatDate(patient.dob)} ·{' '}
              <CopyableValue label="MRN" value={patient.mrn} /> ·{' '}
              <CopyableValue label="ID" value={patient.patientId} />
            </span>
          </div>
        );
      },
      enableHiding: false,
    }),
    columnHelper.accessor('priority', {
      id: 'priority',
      header: 'Priority',
      cell: (info) => {
        const config = priorityConfig[info.getValue()];
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFilterBy?.('priority', info.getValue());
            }}
            className="cursor-pointer"
          >
            <Badge variant={config.variant}>{config.label}</Badge>
          </button>
        );
      },
    }),
    columnHelper.accessor('stage', {
      id: 'stage',
      header: 'Stage',
      cell: (info) => {
        const patient = info.row.original;
        const currentStageIndex = stageOrder.indexOf(info.getValue());
        const isBlocked = patient.status === 'blocked';
        const isAttention = patient.status === 'needs_attention' || patient.status === 'missing_info';
        const isBlockedOrAttention = isBlocked || isAttention;
        const runningSet = new Set(patient.runningStages ?? []);

        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFilterBy?.('stage', info.getValue());
            }}
            className="cursor-pointer w-full"
          >
            <div className="flex items-center gap-0.5">
              {stageOrder.map((stage, i) => {
                const isCompleted = i < currentStageIndex;
                const isCurrent = i === currentStageIndex;
                const isFuture = i > currentStageIndex;
                const isRunning = isFuture && !isBlockedOrAttention && runningSet.has(stage);

                const stageLabel = stageConfig[stage].label;
                let tooltipText = stageLabel;
                if (isCompleted) {
                  tooltipText = `${stageLabel} — Completed`;
                } else if (isCurrent && isBlocked) {
                  tooltipText = `${stageLabel} — Blocked — awaiting resolution`;
                } else if (isCurrent && isAttention) {
                  const reason = patient.status === 'missing_info' ? 'Missing information required' : 'Needs attention';
                  tooltipText = `${stageLabel} — ${reason}`;
                } else if (isCurrent && !isBlockedOrAttention) {
                  tooltipText = `${stageLabel} — Completed`;
                } else if (isRunning) {
                  tooltipText = `${stageLabel} — Runs are running`;
                } else if (isFuture) {
                  tooltipText = `${stageLabel} — Pending`;
                }

                return (
                  <div key={stage} className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex">
                          {isCompleted && (
                            <CheckCircle weight="fill" className="size-4 text-[var(--green-9)] shrink-0" />
                          )}
                          {isCurrent && isBlocked && (
                            <WarningCircle weight="fill" className="size-4 text-[#b44a3a] shrink-0" />
                          )}
                          {isCurrent && isAttention && (
                            <WarningCircle weight="fill" className="size-4 text-[var(--amber-9)] shrink-0" />
                          )}
                          {isCurrent && !isBlockedOrAttention && (
                            <CheckCircle weight="fill" className="size-4 text-[var(--green-9)] shrink-0" />
                          )}
                          {isRunning && (
                            <div className="size-4 shrink-0 rounded-full border-2 border-border-secondary border-t-text-tertiary animate-spin [animation-duration:3.5s]" />
                          )}
                          {isFuture && !isRunning && (
                            <Circle weight="fill" className="size-4 text-border-secondary shrink-0" />
                          )}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {tooltipText}
                      </TooltipContent>
                    </Tooltip>
                    {i < stageOrder.length - 1 && (
                      <div className={cn(
                        'h-[2px] w-2',
                        i < currentStageIndex ? 'bg-[var(--green-9)]' : 'bg-border-secondary'
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </button>
        );
      },
    }),
    columnHelper.accessor((row) => row.syncStatus.lastSynced, {
      id: 'lastUpdated',
      header: 'Last updated',
      cell: (info) => formatLastUpdated(info.getValue()),
      size: 120,
    }),
  ];
}

export function PatientsTable({ patients, onPatientClick }: PatientsTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const table = useReactTable({
    data: patients,
    columns: createColumns(),
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    state: {
      columnVisibility,
      columnOrder,
    },
  });

  if (patients.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No patients found
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-bg-secondary h-10 border-b border-border hover:bg-bg-secondary"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-muted-foreground font-medium h-full"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onPatientClick(row.original)}
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
    </div>
  );
}

interface PatientsTableWithControlsProps extends PatientsTableProps {
  showColumnControl?: boolean;
}

export function PatientsTableWithControls({
  patients,
  onPatientClick,
}: PatientsTableWithControlsProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const table = useReactTable({
    data: patients,
    columns: createColumns(),
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    state: {
      columnVisibility,
      columnOrder,
    },
  });

  if (patients.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No patients found
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-bg-secondary h-10 border-b border-border hover:bg-bg-secondary"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-muted-foreground font-medium h-full"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onPatientClick(row.original)}
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
    </div>
  );
}

// Export the table hook for use in parent components
export function usePatientsTable(patients: Patient[], onFilterBy?: OnFilterBy) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Use a ref so columns don't re-create on every render
  const onFilterByRef = useRef(onFilterBy);
  onFilterByRef.current = onFilterBy;

  const cols = useMemo(
    () => createColumns((...args) => onFilterByRef.current?.(...args)),
    []
  );

  const table = useReactTable({
    data: patients,
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

interface PatientsTableContentProps {
  table: ReturnType<typeof usePatientsTable>;
  onPatientClick: (patient: Patient) => void;
}

function getVisiblePages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages: (number | 'ellipsis')[] = [];

  // Always show current page and its neighbor
  const near = new Set<number>();
  near.add(current);
  if (current > 0) near.add(current - 1);
  if (current < total - 1) near.add(current + 1);
  // Always show first and last
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

export function PatientsTableContent({ table, onPatientClick }: PatientsTableContentProps) {
  if (table.getRowModel().rows.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No patients found
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
                    style={header.column.columnDef.size !== 150 ? { width: header.getSize() } : undefined}
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
              onClick={() => onPatientClick(row.original)}
              className="cursor-pointer h-[52px] border-b border-border hover:bg-accent/50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={cell.column.columnDef.size !== 150 ? { width: cell.column.getSize() } : undefined} className="text-foreground">
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
