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
import { CaretLeft, CaretRight, CaretUp, CaretDown, CheckCircle, WarningCircle, CircleNotch, Circle, Copy, Check, Eye } from '@phosphor-icons/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import { Tooltip, TooltipTrigger, TooltipContent } from '@tennr/lasso/tooltip';
import type { Patient, PatientPriority, PatientStage, PatientStatus } from '@/types/patient';
import { PatientStatusBadge, PatientDotIndicator } from '@/components/patient/patient-status-badge';

const statusBadgeConfig: Record<PatientStatus, { label: string; variant: 'success' | 'warning' | 'destructive' | 'muted' | 'outline' | 'info' }> = {
  on_track: { label: 'On Track', variant: 'success' },
  missing_info: { label: 'Missing Info', variant: 'warning' },
  needs_attention: { label: 'Ready for Review', variant: 'destructive' },
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

export type OnStageClick = (patientId: string, stage: PatientStage) => void;
export type ProgressStyle = 'stepper' | 'ring';

function RingProgress({ patient, onStageClick }: { patient: Patient; onStageClick?: OnStageClick }) {
  const currentStageIndex = stageOrder.indexOf(patient.stage);
  const isBlocked = patient.status === 'blocked';
  const isAttention = patient.status === 'needs_attention' || patient.status === 'missing_info';
  const isCompleted = patient.status === 'completed';
  const isInactive = patient.status === 'inactive';

  // For completed patients, show full ring; for others, count from stageCompletedAt
  const completedStages = isCompleted ? TOTAL_STAGES : Object.keys(patient.stageCompletedAt ?? {}).length;
  const percentage = Math.round((completedStages / TOTAL_STAGES) * 100);

  // Ring SVG params
  const size = 32;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Color based on status
  let strokeColor = 'var(--green-9)';
  let textColor = 'text-[var(--green-9)]';
  if (isBlocked) {
    strokeColor = '#ef4444';
    textColor = 'text-[#ef4444]';
  } else if (isAttention) {
    strokeColor = 'var(--amber-9)';
    textColor = 'text-[var(--amber-9)]';
  } else if (isInactive) {
    strokeColor = 'var(--neutral-8)';
    textColor = 'text-text-tertiary';
  }

  const currentStageLabel = stageConfig[patient.stage]?.label ?? patient.stage;
  const needsAction = isBlocked || isAttention;
  const clickable = needsAction && onStageClick;
  const isInProgress = !isCompleted && !isInactive && !isBlocked && !isAttention;

  // Unique ID for the shimmer gradient per instance
  const gradientId = `shimmer-${patient.id}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-2.5',
            clickable && 'cursor-pointer hover:opacity-80 transition-opacity'
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (clickable) {
              onStageClick(patient.id, patient.stage);
            }
          }}
        >
          <div className="relative shrink-0">
            <svg width={size} height={size} className="-rotate-90">
              {isInProgress && (
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--green-9)" stopOpacity="1" />
                    <stop offset="40%" stopColor="var(--green-9)" stopOpacity="1" />
                    <stop offset="50%" stopColor="var(--green-11)" stopOpacity="1" />
                    <stop offset="60%" stopColor="var(--green-9)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--green-9)" stopOpacity="1" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      from="-1 0"
                      to="1 0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                </defs>
              )}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="var(--neutral-4)"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={isInProgress ? `url(#${gradientId})` : strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <span className={cn('absolute inset-0 flex items-center justify-center text-[10px] font-semibold', textColor)}>
              {percentage}%
            </span>
          </div>
          <span className="text-xs text-text-secondary truncate">{currentStageLabel}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="p-3 max-w-[220px]">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-xs">{currentStageLabel}</span>
          <div className="flex flex-col gap-1">
            {(() => {
              const runningSet = new Set(patient.runningStages ?? []);
              const completedSet = new Set(Object.keys(patient.stageCompletedAt ?? {}) as PatientStage[]);
              return stageOrder.map((stage, i) => {
                const isStageCurrent = i === currentStageIndex;
                const isRunning = isInProgress && runningSet.has(stage);
                const stageCompleted = completedSet.has(stage);
                const stageCurrent = isStageCurrent && (isBlocked || isAttention);

                let dotColor = 'bg-border-secondary';
                let label = stageConfig[stage].label;
                let suffix = '';

                if (isRunning) {
                  suffix = ' — Processing';
                } else if (stageCompleted) {
                  dotColor = 'bg-[var(--green-9)]';
                  suffix = '';
                } else if (stageCurrent && isBlocked) {
                  dotColor = 'bg-neutral-400';
                  suffix = ' — Platform issue';
                } else if (stageCurrent) {
                  dotColor = 'bg-[var(--amber-9)]';
                  suffix = ' — Ready for review';
                } else {
                  suffix = ' — Pending';
                }

                const completedAt = stageCompleted ? patient.stageCompletedAt?.[stage] : undefined;
                const timestamp = completedAt
                  ? new Date(completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
                  : undefined;

                return (
                  <div key={stage} className="flex items-start gap-2">
                    <div className="mt-0.5">
                      {stageCompleted ? (
                        <CheckCircle weight="fill" className="size-3.5 text-[var(--green-9)] shrink-0" />
                      ) : isRunning ? (
                        <CircleNotch weight="bold" className="size-3.5 text-blue-500 shrink-0 animate-spin" />
                      ) : (
                        <span className={cn('block size-2 rounded-full shrink-0 mt-[3px]', dotColor)} />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        'text-[11px] leading-tight',
                        stageCompleted ? 'text-[var(--green-11)]' :
                        isRunning ? 'text-blue-400 font-medium' :
                        stageCurrent ? 'text-white font-medium' :
                        'text-[var(--neutral-9)]'
                      )}>
                        {label}{suffix}
                      </span>
                      {timestamp && (
                        <span className="text-[10px] text-[var(--neutral-8)] leading-tight">{timestamp}</span>
                      )}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function DotProgress({ patient }: { patient: Patient }) {
  const currentStageIndex = stageOrder.indexOf(patient.stage);
  const isBlocked = patient.status === 'blocked';
  const isAttention = patient.status === 'needs_attention' || patient.status === 'missing_info';
  const isCompleted = patient.status === 'completed';
  const isInactive = patient.status === 'inactive';
  const runningSet = new Set(patient.runningStages ?? []);
  const completedSet = new Set(Object.keys(patient.stageCompletedAt ?? {}) as PatientStage[]);

  const currentLabel = stageConfig[patient.stage]?.label ?? patient.stage;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col gap-1.5 cursor-default">
          {/* Dots row */}
          <div className="flex items-center gap-1">
            {stageOrder.map((stage, i) => {
              const isCurrent = i === currentStageIndex;
              const isOnTrack = !isCompleted && !isInactive && !isBlocked && !isAttention;
              const isRunning = isOnTrack && runningSet.has(stage);
              const isStageCompleted = isCompleted || completedSet.has(stage);

              // Gray-to-green on hover only for completed/inactive patients; green by default for others
              const useGrayDefault = isCompleted || isInactive;
              let dotColor = 'bg-border-secondary';
              let showSpinner = false;
              let showPing = false;
              if (isCurrent && isAttention) {
                dotColor = 'bg-amber-500';
                showPing = true;
              } else if (isCurrent && isBlocked) {
                dotColor = 'bg-neutral-400';
              } else if (isRunning) {
                showSpinner = true;
              } else if (isStageCompleted) {
                dotColor = 'bg-neutral-500 group-hover/row:bg-emerald-500';
              }

              const connectorCompleted = isStageCompleted
                ? 'bg-neutral-400 group-hover/row:bg-emerald-400'
                : 'bg-border-secondary';

              return (
                <div key={stage} className="flex items-center gap-1">
                  {showSpinner ? (
                    <svg className="size-3 shrink-0 animate-spin text-blue-500" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
                      <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  ) : showPing ? (
                    <span className="relative flex size-2.5 shrink-0 items-center justify-center">
                      <span className="absolute inline-flex size-2.5 rounded-full bg-amber-400 opacity-50 animate-ping" />
                      <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
                    </span>
                  ) : (
                    <span className={cn(
                      'size-2 rounded-full transition-colors',
                      dotColor,
                    )} />
                  )}
                  {i < stageOrder.length - 1 && (
                    <span className={cn(
                      'w-2.5 h-px transition-colors',
                      connectorCompleted,
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="p-3 max-w-[220px]">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-xs">{currentLabel}</span>
          <div className="flex flex-col gap-1">
            {stageOrder.map((stage, i) => {
              const isStageCompleted = isCompleted || completedSet.has(stage);
              const isCurrent = i === currentStageIndex;
              const isOnTrack = !isCompleted && !isInactive && !isBlocked && !isAttention;
              const isRunning = isOnTrack && runningSet.has(stage);

              let suffix = '';
              if (isRunning) {
                suffix = ' — Processing';
              } else if (isStageCompleted) {
                // no suffix
              } else if (isCurrent && isBlocked) {
                suffix = ' — Platform issue';
              } else if (isCurrent && isAttention) {
                suffix = ' — Ready for review';
              } else if (!isStageCompleted && !isRunning) {
                suffix = ' — Pending';
              }

              return (
                <div key={stage} className="flex items-center gap-2">
                  {isRunning ? (
                    <CircleNotch weight="bold" className="size-2.5 text-blue-500 animate-spin shrink-0" />
                  ) : (
                    <span className={cn(
                      'size-2 rounded-full shrink-0',
                      isStageCompleted ? 'bg-emerald-500' : isCurrent && isBlocked ? 'bg-neutral-400' : isCurrent && isAttention ? 'bg-amber-500' : 'bg-border-secondary',
                    )} />
                  )}
                  <span className={cn(
                    'text-[11px]',
                    isRunning ? 'text-blue-400 font-medium' : isStageCompleted ? 'text-emerald-400' : isCurrent ? 'text-white font-medium' : 'text-[var(--neutral-9)]',
                  )}>
                    {stageConfig[stage].label}{suffix}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export type OnPreviewPatient = (patient: Patient) => void;

function createColumns(onFilterBy?: OnFilterBy, onStageClick?: OnStageClick, progressStyle: ProgressStyle = 'stepper', onPreviewPatient?: OnPreviewPatient, onOpenWorkflow?: (patient: Patient) => void) {
  return [
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
      id: 'patient',
      header: 'Patient',
      size: 220,
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
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Patient Status',
      size: 180,
      cell: (info) => {
        const patient = info.row.original;
        return <PatientStatusBadge status={patient.status} stage={patient.stage} onOpenWorkflow={() => onOpenWorkflow?.(patient)} />;
      },
      sortingFn: (rowA, rowB) => {
        const priority: Record<PatientStatus, number> = {
          needs_attention: 0,
          missing_info: 0,
          on_track: 1,
          blocked: 2,
          completed: 3,
          inactive: 4,
        };
        return priority[rowA.original.status] - priority[rowB.original.status];
      },
    }),
    columnHelper.accessor((row) => row.lastActivity, {
      id: 'lastActivity',
      header: 'Last Activity',
      cell: (info) => {
        const activity = info.getValue();
        if (!activity) return <span className="text-text-tertiary">—</span>;
        const date = new Date(activity.timestamp);
        const formatted = date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        });
        return (
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-text-primary truncate max-w-[220px]">{activity.title}</span>
            <span className="text-xs text-text-tertiary">{formatted}</span>
          </div>
        );
      },
      size: 220,
    }),
    columnHelper.accessor('referralDate', {
      id: 'referralDate',
      header: 'Most Recent Referral',
      size: 180,
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        });
      },
    }),
    columnHelper.accessor('stage', {
      id: 'progress',
      header: 'Progress',
      cell: (info) => {
        const patient = info.row.original;
        return <DotProgress patient={patient} />;
      },
      enableSorting: false,
      size: 220,
    }),
    ...(onPreviewPatient ? [columnHelper.display({
      id: 'preview',
      header: '',
      size: 48,
      cell: (info) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreviewPatient(info.row.original);
              }}
              className="flex items-center justify-center size-7 rounded-md hover:bg-bg-secondary transition-colors cursor-pointer"
            >
              <Eye weight="regular" className="size-4 text-text-tertiary" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">Quick view</TooltipContent>
        </Tooltip>
      ),
    })] : []),
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
              className="cursor-pointer h-[52px] border-b border-border hover:bg-accent/50 transition-colors group/row"
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
              className="cursor-pointer h-[52px] border-b border-border hover:bg-accent/50 transition-colors group/row"
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
export function usePatientsTable(patients: Patient[], onFilterBy?: OnFilterBy, onStageClick?: OnStageClick, progressStyle: ProgressStyle = 'stepper', onPreviewPatient?: OnPreviewPatient, onOpenWorkflow?: (patient: Patient) => void) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'status', desc: false }]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Use refs so columns don't re-create on every render
  const onFilterByRef = useRef(onFilterBy);
  onFilterByRef.current = onFilterBy;
  const onStageClickRef = useRef(onStageClick);
  onStageClickRef.current = onStageClick;
  const onPreviewPatientRef = useRef(onPreviewPatient);
  onPreviewPatientRef.current = onPreviewPatient;
  const onOpenWorkflowRef = useRef(onOpenWorkflow);
  onOpenWorkflowRef.current = onOpenWorkflow;

  const hasPreview = !!onPreviewPatient;
  const hasWorkflow = !!onOpenWorkflow;
  const cols = useMemo(
    () => createColumns(
      (...args) => onFilterByRef.current?.(...args),
      (...args) => onStageClickRef.current?.(...args),
      progressStyle,
      hasPreview ? (patient) => onPreviewPatientRef.current?.(patient) : undefined,
      hasWorkflow ? (patient) => onOpenWorkflowRef.current?.(patient) : undefined,
    ),
    [progressStyle, hasPreview, hasWorkflow]
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
                    style={{ width: header.getSize() }}
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
              className="cursor-pointer h-[52px] border-b border-border hover:bg-accent/50 transition-colors group/row"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className="text-foreground">
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
