'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  SidebarSimple,
  CaretLeft,
  CaretRight,
  CaretDown,
  Copy,
  Check,
  CircleNotch,
  CheckCircle,
  WarningCircle,
  Circle,
  Tag,
  Heartbeat,
  FolderOpen,
  FileText,
  ShieldCheck,
  Clock,
  Hash,
  X as XIcon,
  DownloadSimple,
  LockSimple,
  ArrowSquareOut,
  MagnifyingGlass,
  FunnelSimple,
  CaretUp,
  Package,
  UserCircle,
  Stethoscope,
  Database,
  NotePencil,
  PlusCircle,
  ArrowRight,
  User,
  MapPin,
  Phone,
  Envelope,
  FirstAid,
  ClipboardText,
} from '@phosphor-icons/react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@tennr/lasso/tabs';
import { Button } from '@tennr/lasso/button';
import { Badge } from '@tennr/lasso/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '@tennr/lasso/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@tennr/lasso/popover';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@tennr/lasso/command';
import { cn } from '@tennr/lasso/utils/cn';
import type { Patient, Insurance, PatientStage } from '@/types/patient';
import type { Order, OrderDocument, OrderStatus, OrderStage } from '@/types/order';
import { ActiveOrdersCard, OrderCard, OrderProgressStepper, statusBadgeConfig } from './active-orders-card';
import { Timeline } from './timeline';
import type { ActivitySource } from './timeline';
import { SidebarTimeline } from './sidebar-timeline';
import { EngagementCard } from './engagement-card';
import { ReferringProviderCard } from './referring-provider-card';
import { PayerContactCard } from './payer-contact-card';
import { PatientStatusBadge, getStatusConfig } from '@/components/patient/patient-status-badge';
import { DemographicsForm } from '../demographics/demographics-form';
import { InsuranceForm } from '../insurance/insurance-form';
import { VerificationHistory } from '../insurance/verification-history';
import { DocumentsTableCard } from '../documents/documents-table-card';
import { DocumentFullViewer, type ViewableDocument } from '../documents/document-full-viewer';
import { WorkflowSheet } from '../workflow-sheet';

interface ChangeLogEntry {
  field: string;
  before: string;
  after: string;
}

interface TimelineActivity {
  id: string;
  type: 'ehr_log' | 'order_update' | 'order_created' | 'patient_update' | 'patient_created' | 'note' | 'prior_auth' | 'eligibility_benefits';
  title: string;
  description?: string;
  orderId?: string;
  source?: ActivitySource;
  author?: {
    name: string;
    initials: string;
  };
  timestamp: string;
  changeLog?: ChangeLogEntry[];
  noteContent?: string;
}

type SidebarDetailView =
  | { kind: 'patient' }
  | { kind: 'activity'; activity: TimelineActivity }
  | { kind: 'order'; order: Order }
  | { kind: 'document'; document: OrderDocument };

interface PatientDocument extends OrderDocument {
  orderId?: string;
  orderNumber?: string;
}

interface PatientSummaryVariantBProps {
  patient: Patient;
  orders: Order[];
  activities: TimelineActivity[];
  documents?: PatientDocument[];
  onAddComment?: (comment: string) => void;
  hideOrderIllustrations?: boolean;
}

const stageOrder: PatientStage[] = [
  'referral_received',
  'intake_review',
  'insurance_verification',
  'prior_authorization',
  'scheduling',
  'ready_for_claim',
  'claim_submitted',
];

const stageLabels: Record<PatientStage, string> = {
  referral_received: 'Referral Received',
  intake_review: 'Intake Review',
  insurance_verification: 'Insurance Verification',
  prior_authorization: 'Prior Authorization',
  scheduling: 'Scheduling',
  ready_for_claim: 'Ready for Claim',
  claim_submitted: 'Claim Submitted',
};

const TOTAL_STAGES = 7;

// --- Runs ---

interface RunEntry {
  id: string;
  stage: string;
  type: string;
  updatesCount: number;
  startedAt: string;
}

const runStages = [
  'Extracting Patient Information',
  'Verifying Insurance Eligibility',
  'Processing Prior Authorization',
  'Validating Order Details',
  'Submitting Claim',
];

const runTypes = ['Intake', 'Eligibility', 'Prior Auth', 'Validation', 'Claim'];

function generateMockRuns(seed: number): RunEntry[] {
  let s = seed;
  function rand() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  }

  const runs: RunEntry[] = [];
  const baseDate = new Date('2026-04-03T14:30:00Z');

  for (let i = 0; i < 8; i++) {
    const stageIdx = Math.floor(rand() * runStages.length);
    const typeIdx = Math.min(stageIdx, runTypes.length - 1);
    const date = new Date(baseDate);
    date.setHours(date.getHours() - Math.floor(rand() * 72));
    date.setMinutes(Math.floor(rand() * 60));
    date.setSeconds(Math.floor(rand() * 60));

    const hex = Math.floor(rand() * 0xffffffff).toString(16).padStart(8, '0').slice(0, 7);

    runs.push({
      id: hex,
      stage: runStages[stageIdx],
      type: runTypes[typeIdx],
      updatesCount: 1 + Math.floor(rand() * 3),
      startedAt: date.toISOString(),
    });
  }

  return runs.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
}

function formatRunTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  if (diffDays === 0) return `Started Today at ${time} (EST)`;
  if (diffDays === 1) return `Started Yesterday at ${time} (EST)`;

  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return `Started ${dateStr} at ${time} (EST)`;
}

function RunCard({ run, patientName }: { run: RunEntry; patientName: string }) {
  return (
    <div className="border border-border-secondary rounded-lg px-5 py-4 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <LockSimple weight="regular" className="size-4 text-text-tertiary shrink-0" />
          <span className="text-sm font-semibold text-text-primary truncate">{patientName}</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border-secondary text-xs text-text-primary whitespace-nowrap">
            Stage: {run.stage}
          </span>
        </div>
        <span className="text-xs text-text-tertiary whitespace-nowrap shrink-0">
          {formatRunTimestamp(run.startedAt)}
        </span>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#c4715b]/15 text-[#8b4a3a] border border-[#c4715b]/25">
            {run.type}
          </span>
          <span className="text-xs text-text-secondary">{run.updatesCount} Update{run.updatesCount !== 1 ? 's' : ''} Made</span>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-primary transition-colors cursor-pointer">
          <span className="font-mono">{run.id}</span>
          <ArrowSquareOut weight="regular" className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

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

const orderStageLabel: Record<OrderStage, string> = {
  validation: 'Validation',
  eligibility: 'Eligibility',
  qualification: 'Qualification',
  complete: 'Complete',
};

function formatOrderDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatOrderAge(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

type OrderFilterStatus = 'all' | OrderStatus;

type SortColumn = 'orderName' | 'status' | 'stage' | 'statusUpdated' | 'orderAge' | 'facility';
type SortDirection = 'asc' | 'desc';

function OrdersTabContent({ orders, onSelectOrder }: { orders: Order[]; onSelectOrder: (order: Order) => void }) {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderFilterStatus>('all');
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<SortColumn>('orderAge');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(0);
  const ORDERS_PER_PAGE = 10;

  const handleSort = useCallback((column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  }, [sortColumn]);

  const filtered = useMemo(() => {
    let result = [...orders];

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(o => o.status === statusFilter);
    }

    // Search
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      result = result.filter(o =>
        o.orderName.toLowerCase().includes(q) ||
        o.externalOrderId.toLowerCase().includes(q) ||
        (o.referringFacility ?? '').toLowerCase().includes(q) ||
        (o.referringPractitioner ?? '').toLowerCase().includes(q)
      );
    }

    // Sort by selected column
    const dir = sortDirection === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      switch (sortColumn) {
        case 'orderName':
          return dir * a.orderName.localeCompare(b.orderName);
        case 'status':
          return dir * (orderStatusLabel[a.status] ?? '').localeCompare(orderStatusLabel[b.status] ?? '');
        case 'stage':
          return dir * (orderStageLabel[a.stage] ?? '').localeCompare(orderStageLabel[b.stage] ?? '');
        case 'statusUpdated':
          return dir * (new Date(a.statusUpdated).getTime() - new Date(b.statusUpdated).getTime());
        case 'orderAge':
          return dir * (new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
        case 'facility':
          return dir * (a.referringFacility ?? '').localeCompare(b.referringFacility ?? '');
        default:
          return 0;
      }
    });

    return result;
  }, [orders, searchValue, statusFilter, sortColumn, sortDirection]);

  // Reset page when filters change
  useEffect(() => { setPage(0); }, [searchValue, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ORDERS_PER_PAGE);
  const pagedOrders = filtered.slice(page * ORDERS_PER_PAGE, (page + 1) * ORDERS_PER_PAGE);

  const statusFilterOptions: { value: OrderFilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'on_track', label: 'On Track' },
    { value: 'missing_info', label: 'Missing Info' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col w-full border border-border-tertiary rounded-md overflow-hidden bg-bg-white shadow-xs">
      {/* Top bar: Search + Status filter */}
      <div className="flex items-center w-full p-2 gap-2 bg-bg-white border-b border-border-tertiary">
        <div className="flex-1 flex items-center h-full gap-2">
          <div className="bg-neutral-2 flex items-center gap-1 px-3 py-1 rounded-sm shadow-xs flex-1 h-8">
            <div className="size-4 shrink-0 flex items-center justify-center">
              <MagnifyingGlass weight="regular" className="text-text-tertiary w-full h-full" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by order type, ID, facility, or practitioner"
              className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-tertiary font-body h-full leading-[20px]"
            />
            {searchValue.length > 0 && (
              <button
                onClick={() => setSearchValue('')}
                className="size-4 shrink-0 flex items-center justify-center rounded-sm hover:bg-bg-secondary transition-colors cursor-pointer"
              >
                <XIcon weight="bold" className="size-3 text-text-tertiary" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center border border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-l-full">
            <span className="text-sm text-text-tertiary font-medium">Status</span>
          </div>
          <Popover open={statusFilterOpen} onOpenChange={setStatusFilterOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 border border-l-0 border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-r-full hover:bg-bg-tertiary transition-colors cursor-pointer">
                <span className="text-sm text-text-primary font-medium">
                  {statusFilterOptions.find(o => o.value === statusFilter)?.label ?? 'All'}
                </span>
                <CaretDown className="size-4 text-text-primary" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-0 w-[160px]">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {statusFilterOptions.map(option => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          setStatusFilter(option.value);
                          setStatusFilterOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="px-4 py-12 text-center text-sm text-text-tertiary">
          No orders match your search
        </div>
      ) : (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="bg-bg-secondary h-10 border-b border-border hover:bg-bg-secondary">
              {([
                { key: 'orderName' as SortColumn, label: 'Order type', sortable: false, width: 'w-[14%]' },
                { key: 'status' as SortColumn, label: 'Status', sortable: false, width: 'w-[12%]' },
                { key: 'stage' as SortColumn, label: 'Stage', sortable: false, width: 'w-[12%]' },
                { key: 'statusUpdated' as SortColumn, label: 'Status updated', sortable: false, width: 'w-[12%]' },
                { key: 'orderAge' as SortColumn, label: 'Order age', sortable: true, width: 'w-[10%]' },
                { key: 'facility' as SortColumn, label: 'Facility and Practitioner', sortable: false, width: 'w-[40%]' },
              ]).map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    'text-muted-foreground font-medium h-full',
                    col.width,
                    col.sortable && 'cursor-pointer select-none hover:text-foreground transition-colors'
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="flex flex-col -space-y-1">
                        <CaretUp
                          weight="bold"
                          className={cn(
                            'size-3',
                            sortColumn === col.key && sortDirection === 'asc' ? 'text-foreground' : 'text-muted-foreground/40'
                          )}
                        />
                        <CaretDown
                          weight="bold"
                          className={cn(
                            'size-3',
                            sortColumn === col.key && sortDirection === 'desc' ? 'text-foreground' : 'text-muted-foreground/40'
                          )}
                        />
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedOrders.map((order) => (
              <TableRow
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="cursor-pointer h-[60px] border-b border-border hover:bg-accent/50 transition-colors"
              >
                <TableCell className="text-foreground">
                  <span className="text-sm font-medium">{order.orderName}</span>
                </TableCell>
                <TableCell className="text-foreground">
                  <Badge variant={orderStatusVariant[order.status]} className="text-xs">
                    {orderStatusLabel[order.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">
                  <span className="text-sm text-text-secondary">{orderStageLabel[order.stage]}</span>
                </TableCell>
                <TableCell className="text-foreground">
                  <span className="text-sm text-text-secondary">{formatOrderAge(order.statusUpdated)}</span>
                </TableCell>
                <TableCell className="text-foreground">
                  <span className="text-sm text-text-secondary">{order.orderAge}</span>
                </TableCell>
                <TableCell className="text-foreground">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-medium text-text-primary truncate">
                      {order.referringFacility ?? '—'}
                    </span>
                    <span className="text-xs text-text-tertiary uppercase tracking-wide truncate">
                      {order.referringPractitioner ?? '—'}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination footer */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-text-secondary">
            Showing {page * ORDERS_PER_PAGE + 1}-{Math.min((page + 1) * ORDERS_PER_PAGE, filtered.length)} of{' '}
            {filtered.length} orders
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1 px-2 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <CaretLeft weight="regular" className="size-3.5" />
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={cn(
                    'flex items-center justify-center size-8 text-sm rounded-md transition-colors cursor-pointer',
                    i === page
                      ? 'border border-border-primary text-text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="flex items-center gap-1 px-2 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                Next
                <CaretRight weight="regular" className="size-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RunsSection({ patient }: { patient: Patient }) {
  const runs = generateMockRuns(parseInt(patient.id) || 42);
  const fullName = `${patient.firstName} ${patient.lastName}`;

  return (
    <div className="flex flex-col gap-3">
      {runs.map((run) => (
        <RunCard key={run.id} run={run} patientName={fullName} />
      ))}
    </div>
  );
}

type StepStatus = 'completed' | 'current' | 'running' | 'blocked' | 'attention' | 'future';

const stageDescriptions: Record<PatientStage, string> = {
  referral_received: 'Referral documents received and logged into the system',
  intake_review: 'Patient demographics and order details reviewed for accuracy',
  insurance_verification: 'Verifying coverage, eligibility, and benefits with the carrier',
  prior_authorization: 'Submitting and tracking prior authorization with the payer',
  scheduling: 'Coordinating delivery or service appointment with the patient',
  ready_for_claim: 'All documentation gathered and claim package prepared',
  claim_submitted: 'Claim submitted to the payer for reimbursement',
};

const stageStatusLabels: Record<string, string> = {
  completed: 'Completed',
  current: 'In progress',
  running: 'Processing',
  blocked: 'Blocked',
  attention: 'Action required',
  future: 'Pending',
};

function WorkerStatusIcon({ status }: { status: StepStatus }) {
  switch (status) {
    case 'completed':
      return <CheckCircle weight="fill" className="size-4 text-emerald-500 shrink-0" />;
    case 'running':
    case 'current':
      return <CircleNotch weight="bold" className="size-4 text-blue-500 animate-spin shrink-0" />;
    case 'blocked':
      return <WarningCircle weight="fill" className="size-4 text-neutral-400 shrink-0" />;
    case 'attention':
      return <WarningCircle weight="fill" className="size-4 text-amber-500 shrink-0" />;
    case 'future':
    default:
      return <Circle weight="regular" className="size-4 text-border-secondary shrink-0" />;
  }
}

function WorkerStatusLabel({ status }: { status: StepStatus }) {
  const labelMap: Record<StepStatus, { text: string; className: string }> = {
    completed: { text: 'Completed', className: 'text-emerald-600 bg-emerald-50' },
    running: { text: 'Processing', className: 'text-blue-600 bg-blue-50' },
    current: { text: 'Processing', className: 'text-blue-600 bg-blue-50' },
    blocked: { text: 'Blocked', className: 'text-neutral-500 bg-neutral-100' },
    attention: { text: 'Action Required', className: 'text-amber-600 bg-amber-50' },
    future: { text: 'Pending', className: 'text-text-tertiary bg-bg-secondary' },
  };
  const config = labelMap[status];
  return (
    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', config.className)}>
      {config.text}
    </span>
  );
}

function formatActivityDate(timestamp: string) {
  const ts = new Date(timestamp);
  return ts.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

function formatActivityTime(timestamp: string) {
  const ts = new Date(timestamp);
  return ts.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function LastActivityCard({ activities }: { activities: TimelineActivity[] }) {
  const recent = activities
    .slice()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  if (recent.length === 0) {
    return (
      <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">Recent Activity</p>
        </div>
        <div className="px-4 py-2 border-t border-border-tertiary">
          <p className="text-[13px] text-text-tertiary">No activity recorded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">Recent Activity</p>
      </div>
      <div className="border-t border-border-tertiary">
        {recent.map((activity, i) => (
          <div
            key={activity.id}
            className={cn(
              'flex flex-col gap-0 px-3 py-3 hover:bg-accent/50 transition-colors',
              i < recent.length - 1 && 'border-b border-border-tertiary',
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[13px] font-medium lasso:wght-medium text-text-primary truncate">{activity.title}</span>
                {(() => {
                  const label = activity.source === 'user' && activity.author?.name ? activity.author.name : activity.source === 'tennr' ? 'Tennr' : activity.source === 'system' ? 'Integration' : '';
                  return label ? <span className="text-[10px] text-text-tertiary shrink-0 border border-border-secondary bg-bg-secondary px-1.5 py-0.5 rounded-full">{label}</span> : null;
                })()}
              </div>
              <span className="text-[11px] text-text-tertiary whitespace-nowrap shrink-0">
                {formatActivityDate(activity.timestamp)}
              </span>
            </div>
            {activity.description && (
              <span className="text-[11px] text-text-secondary truncate">{activity.description}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveStagesSection({ patient, onOpenWorkflow }: { patient: Patient; onOpenWorkflow?: () => void }) {
  const [isWorkerListExpanded, setIsWorkerListExpanded] = useState(true);
  const [hoveredStageIndex, setHoveredStageIndex] = useState<number | null>(null);
  const isBlocked = patient.status === 'blocked';
  const isAttention = patient.status === 'needs_attention' || patient.status === 'missing_info';
  const isCompleted = patient.status === 'completed';
  const isInactive = patient.status === 'inactive';
  const useGrayDefault = isCompleted || isInactive;
  const runningSet = new Set(patient.runningStages ?? []);
  const completedSet = new Set(Object.keys(patient.stageCompletedAt ?? {}) as PatientStage[]);
  const completedCount = isCompleted ? TOTAL_STAGES : completedSet.size;

  const currentStageIndex = stageOrder.indexOf(patient.stage);

  function getStepStatus(stageKey: PatientStage): StepStatus {
    const idx = stageOrder.indexOf(stageKey);
    if (isCompleted) return 'completed';
    if (completedSet.has(stageKey)) return 'completed';
    if (idx === currentStageIndex) {
      if (isBlocked) return 'blocked';
      if (isAttention) return 'attention';
      if (runningSet.has(stageKey)) return 'running';
      return 'current';
    }
    if (runningSet.has(stageKey)) return 'running';
    return 'future';
  }

  const statusConfig = getStatusConfig(patient.status);

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">Patient Status</p>
          <PatientStatusBadge status={patient.status} stage={patient.stage} actionCount={patient.actionCount} actionItems={patient.actionItems} onOpenWorkflow={onOpenWorkflow} disablePopover />
        </div>
        <span className="text-[11px] text-text-tertiary">{completedCount}/{TOTAL_STAGES} stages</span>
      </div>

      {/* Status alert banner */}
      {(isBlocked || isAttention) && (
        <div className={cn('px-4 py-2.5 border-t border-border-tertiary flex items-center justify-between gap-3', statusConfig.color.bg)}>
          <p className={cn('text-xs', statusConfig.color.text)}>{statusConfig.description}</p>
          {isAttention && onOpenWorkflow && (
            <button
              onClick={onOpenWorkflow}
              className={cn('text-xs font-medium shrink-0 cursor-pointer hover:underline', statusConfig.color.text)}
            >
              Open tasks &rarr;
            </button>
          )}
          {isBlocked && (
            <a
              href="/notifications"
              className={cn('text-xs font-medium shrink-0 cursor-pointer hover:underline', statusConfig.color.text)}
            >
              Notification center &rarr;
            </a>
          )}
        </div>
      )}

      {/* Horizontal dot progress */}
      <div className="border-t border-border-tertiary px-4 py-4">
        <div className="flex items-center group/dots">
          {stageOrder.map((stage, i) => {
            const status = getStepStatus(stage);
            const isStageCompleted = status === 'completed';
            const isRunning = status === 'running' || status === 'current';

            return (
              <div key={stage} className="flex items-center flex-1 last:flex-none">
                {/* Dot — hover highlights corresponding worker row */}
                <button
                  className="cursor-default shrink-0"
                  onMouseEnter={() => setHoveredStageIndex(i)}
                  onMouseLeave={() => setHoveredStageIndex(null)}
                >
                  {isRunning ? (
                    <CircleNotch weight="bold" className="size-4 text-blue-500 animate-spin" />
                  ) : (
                    <span className={cn(
                      'block size-3 rounded-full transition-colors',
                      isStageCompleted ? (useGrayDefault ? 'bg-neutral-400 group-hover/dots:bg-emerald-500' : 'bg-emerald-500') :
                      status === 'blocked' ? 'bg-neutral-400' :
                      status === 'attention' ? 'bg-amber-500' :
                      'bg-border-secondary',
                    )} />
                  )}
                </button>

                {/* Connector line */}
                {i < stageOrder.length - 1 && (
                  <div className={cn(
                    'h-px flex-1 mx-1 transition-colors',
                    isStageCompleted ? (useGrayDefault ? 'bg-neutral-300 group-hover/dots:bg-emerald-400' : 'bg-emerald-400') : 'bg-border-secondary',
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Worker Status Dropdown — expanded by default */}
      <div className="border-t border-border-tertiary">
        <button
          onClick={() => setIsWorkerListExpanded(!isWorkerListExpanded)}
          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-bg-secondary transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium text-text-secondary">Worker Status</span>
          <CaretDown
            weight="bold"
            className={cn(
              'size-3.5 text-text-tertiary transition-transform duration-200',
              isWorkerListExpanded && 'rotate-180'
            )}
          />
        </button>

        {isWorkerListExpanded && (
          <div className="px-4 pb-3 flex flex-col gap-0.5">
            {stageOrder.map((stage, i) => {
              const status = getStepStatus(stage);
              const label = stageLabels[stage];
              const ts = patient.stageCompletedAt?.[stage];
              const timestamp = ts
                ? new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
                : undefined;
              const isHighlighted = hoveredStageIndex === i;
              const isMuted = hoveredStageIndex !== null && hoveredStageIndex !== i;

              return (
                <div
                  key={stage}
                  className={cn(
                    'flex items-center gap-3 px-2.5 py-2 rounded-md transition-all duration-150',
                    isHighlighted && 'bg-bg-secondary ring-1 ring-border-primary',
                    isMuted && 'opacity-30',
                    !isHighlighted && !isMuted && 'hover:bg-bg-secondary',
                  )}
                >
                  <WorkerStatusIcon status={status} />
                  <span className="text-sm text-text-primary flex-1 min-w-0 truncate">{label}</span>
                  {timestamp && (
                    <span className="text-[10px] text-text-tertiary shrink-0">{timestamp}</span>
                  )}
                  <WorkerStatusLabel status={status} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Sidebar detail views ---

const activityIcon: Record<TimelineActivity['type'], React.ReactNode> = {
  ehr_log: <Database weight="regular" className="size-4 text-text-tertiary" />,
  order_update: <Package weight="regular" className="size-4 text-text-tertiary" />,
  order_created: <PlusCircle weight="regular" className="size-4 text-text-tertiary" />,
  patient_update: <UserCircle weight="regular" className="size-4 text-text-tertiary" />,
  patient_created: <PlusCircle weight="regular" className="size-4 text-text-tertiary" />,
  note: <NotePencil weight="regular" className="size-4 text-text-tertiary" />,
  prior_auth: <ShieldCheck weight="regular" className="size-4 text-text-tertiary" />,
  eligibility_benefits: <Stethoscope weight="regular" className="size-4 text-text-tertiary" />,
};

const activityTypeLabel: Record<TimelineActivity['type'], string> = {
  ehr_log: 'EHR Audit',
  order_update: 'Order updated',
  order_created: 'Order created',
  patient_update: 'Patient updated',
  patient_created: 'Patient created',
  note: 'Note',
  prior_auth: 'Prior Auth',
  eligibility_benefits: 'E&B',
};

const activityTypeBadgeVariant: Record<TimelineActivity['type'], 'outline'> = {
  ehr_log: 'outline',
  order_update: 'outline',
  order_created: 'outline',
  patient_update: 'outline',
  patient_created: 'outline',
  note: 'outline',
  prior_auth: 'outline',
  eligibility_benefits: 'outline',
};

// Generate contextual mock change data based on activity description
function getActivityChangeLog(activity: TimelineActivity): ChangeLogEntry[] {
  if (activity.changeLog) return activity.changeLog;
  const desc = (activity.description ?? '').toLowerCase();

  if (activity.type === 'patient_update') {
    if (desc.includes('address')) {
      return [
        { field: 'Address', before: '123 Main Street, Apt 4B, Springfield, IL 62704', after: '456 Oak Avenue, Suite 200, Riverside, CA 92501' },
      ];
    }
    if (desc.includes('insurance')) {
      return [
        { field: 'Carrier', before: 'Blue Cross Blue Shield — Bronze HMO', after: 'Aetna — Gold PPO' },
        { field: 'Member ID', before: 'BCBS-881234', after: 'AET-990421' },
        { field: 'Copay', before: '$40.00', after: '$20.00' },
      ];
    }
    if (desc.includes('phone')) {
      return [
        { field: 'Phone', before: '(555) 123-4567', after: '(555) 987-6543' },
      ];
    }
    if (desc.includes('primary care')) {
      return [
        { field: 'Provider', before: 'Dr. Michael Torres — Springfield Family Medicine (NPI 1234567890)', after: 'Dr. Sarah Chen — Riverside Internal Medicine (NPI 0987654321)' },
      ];
    }
    if (desc.includes('emergency contact')) {
      return [
        { field: 'Emergency Contact', before: '—', after: 'Maria Johnson (Spouse) · (555) 222-3344' },
      ];
    }
    if (desc.includes('demographics')) {
      return [
        { field: 'Email', before: 'patient@oldmail.com', after: 'patient@newmail.com' },
        { field: 'Preferred Language', before: 'English', after: 'Spanish' },
      ];
    }
    return [
      { field: 'Record', before: 'Previous value', after: 'Updated value' },
    ];
  }

  if (activity.type === 'order_update') {
    if (desc.includes('status')) {
      return [
        { field: 'Status', before: 'Pending', after: 'In Progress' },
      ];
    }
    if (desc.includes('insurance verified')) {
      return [
        { field: 'Verification', before: 'Unverified', after: 'Verified — Active' },
        { field: 'Verified By', before: '—', after: 'System (Auto)' },
      ];
    }
    if (desc.includes('shipping')) {
      return [
        { field: 'Shipping Address', before: '123 Main St, Springfield, IL 62704', after: '456 Oak Ave, Riverside, CA 92501' },
        { field: 'Shipping Method', before: 'Standard (5–7 business days)', after: 'Expedited (2–3 business days)' },
      ];
    }
  }

  return [];
}

interface NoteEntry {
  content: string;
  author: string;
  timestamp: string;
}

function getActivityNotes(activity: TimelineActivity): NoteEntry[] {
  if (activity.type === 'note') {
    return [
      {
        content: 'Spoke with patient regarding upcoming CPAP device delivery. Patient confirmed current address and requested expedited shipping. Discussed proper device usage and maintenance schedule.',
        author: activity.author?.name ?? 'Sarah Chen',
        timestamp: activity.timestamp,
      },
      {
        content: 'Follow-up appointment scheduled for 2 weeks post-delivery to assess compliance and comfort. Patient expressed concerns about mask fitting — referred to respiratory therapist.',
        author: 'Emily Nguyen',
        timestamp: new Date(new Date(activity.timestamp).getTime() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        content: 'Initial intake call completed. Patient is new to CPAP therapy. Insurance pre-verified.',
        author: 'Mike Rivera',
        timestamp: new Date(new Date(activity.timestamp).getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
  }
  if (activity.type === 'order_update' && (activity.description ?? '').toLowerCase().includes('notes added')) {
    return [
      {
        content: 'Prior authorization approval received from Aetna. Order cleared for fulfillment. Patient has been notified via phone and email.',
        author: activity.author?.name ?? 'System',
        timestamp: activity.timestamp,
      },
      {
        content: 'Shipping label generated — tracking number will be available within 24 hours.',
        author: 'James Park',
        timestamp: new Date(new Date(activity.timestamp).getTime() - 30 * 60 * 1000).toISOString(),
      },
    ];
  }
  return [];
}

interface ActivityDetailConfig {
  description: string;
  fields: { label: string; value: string; highlight?: boolean }[];
}

function getActivityDetailConfig(activity: TimelineActivity): ActivityDetailConfig {
  switch (activity.type) {
    case 'order_update':
      return {
        description: 'An existing order was modified.',
        fields: [
          { label: 'Carrier', value: 'Aetna' },
        ],
      };
    case 'order_created':
      return {
        description: 'A new order was created and submitted for processing.',
        fields: [
          { label: 'Type', value: 'CPAP Device' },
          { label: 'Carrier', value: 'Aetna' },
        ],
      };
    case 'patient_update':
      return {
        description: activity.description ?? 'Patient information was updated.',
        fields: [],
      };
    case 'patient_created':
      return {
        description: 'A new patient record was created in the system.',
        fields: [
          { label: 'Source', value: 'EHR Sync' },
        ],
      };
    case 'prior_auth':
      return {
        description: 'A prior authorization request was submitted and processed.',
        fields: [
          { label: 'Auth Number', value: 'PA-2026-38291' },
          { label: 'Carrier', value: 'Aetna' },
          { label: 'Decision', value: 'Approved', highlight: true },
          { label: 'Valid Through', value: '07/01/2026' },
        ],
      };
    case 'eligibility_benefits':
      return {
        description: 'Eligibility and benefits verification was performed.',
        fields: [
          { label: 'Carrier', value: 'Aetna' },
          { label: 'Plan Type', value: 'Gold PPO' },
          { label: 'Status', value: 'Active', highlight: true },
          { label: 'Effective', value: '01/01/2026 — 12/31/2026' },
          { label: 'Copay', value: '$20.00' },
          { label: 'Deductible', value: '$350.00 remaining' },
          { label: 'Method', value: 'Electronic (270/271)' },
        ],
      };
    case 'ehr_log':
      return {
        description: activity.description ?? 'An event was logged from the EHR system.',
        fields: [
          { label: 'EHR System', value: activity.description?.includes('Epic') ? 'Epic' : 'BrightTree' },
          { label: 'Sync Type', value: 'Automatic' },
        ],
      };
    case 'note':
      return {
        description: 'A note was added to this patient record.',
        fields: [],
      };
    default:
      return { description: '', fields: [] };
  }
}

function ChangeLogDiff({ changes }: { changes: ChangeLogEntry[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Changes</span>
      <div className="border border-border-tertiary rounded-md overflow-hidden">
        {changes.map((change, i) => {
          const isNew = change.before === '—';
          return (
            <div key={change.field} className={cn(i > 0 && 'border-t border-border-tertiary')}>
              <div className="px-3 py-2">
                <span className="text-xs text-text-tertiary">{change.field}</span>
              </div>
              {isNew ? (
                <div className="flex items-start gap-2.5 bg-bg-success-primary px-3 py-2">
                  <span className="text-xs font-medium lasso:wght-medium text-text-success-primary shrink-0 leading-4">+</span>
                  <span className="text-xs text-text-primary leading-4">{change.after}</span>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-2.5 bg-bg-error-primary px-3 py-2">
                    <span className="text-xs font-medium lasso:wght-medium text-text-error-primary shrink-0 leading-4">−</span>
                    <span className="text-xs text-text-primary leading-4">{change.before}</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-bg-success-primary px-3 py-2">
                    <span className="text-xs font-medium lasso:wght-medium text-text-success-primary shrink-0 leading-4">+</span>
                    <span className="text-xs text-text-primary leading-4">{change.after}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NotesCard({ notes }: { notes: NoteEntry[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Notes</span>
      <div className="border border-border-tertiary rounded-md overflow-hidden">
        {notes.map((note, i) => (
          <div key={i} className={cn(
            'bg-bg-warning-primary px-3 py-2.5',
            i > 0 && 'border-t border-border-warning-secondary/15'
          )}>
            <p className="text-xs text-text-primary leading-[18px]">{note.content}</p>
            <p className="text-[10px] text-text-tertiary mt-1.5">
              {note.author} · {formatFullTimestamp(note.timestamp)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatFullTimestamp(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' at ' + date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function SidebarActivityDetail({ activity, onClose }: { activity: TimelineActivity; onClose: () => void }) {
  const config = getActivityDetailConfig(activity);
  const typeLabel = activityTypeLabel[activity.type];
  const changeLog = getActivityChangeLog(activity);
  const notes = getActivityNotes(activity);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <p className="text-[20px] font-medium lasso:wght-medium leading-7 text-text-primary">{activity.title}</p>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full size-7 hover:bg-bg-tertiary shrink-0"
          onClick={onClose}
        >
          <SidebarSimple className="size-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-5 px-4 pb-6">
        {/* Type badge + timestamp */}
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-[10px]">{typeLabel}</Badge>
          <span className="text-xs text-text-tertiary">{formatFullTimestamp(activity.timestamp)}</span>
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Details</span>
          <div className="border border-border-tertiary rounded-md">
            <div className="flex items-start gap-4 px-3 py-2">
              <span className="text-xs text-text-tertiary w-20 shrink-0">Description</span>
              <span className="text-xs text-text-primary">{config.description}</span>
            </div>
            {activity.author && (
              <div className="flex items-center gap-4 px-3 py-2 border-t border-border-tertiary">
                <span className="text-xs text-text-tertiary w-20 shrink-0">Performed by</span>
                <span className="text-xs text-text-primary">{activity.author.name}</span>
              </div>
            )}
            {activity.orderId && (
              <div className="flex items-center gap-4 px-3 py-2 border-t border-border-tertiary">
                <span className="text-xs text-text-tertiary w-20 shrink-0">Order</span>
                <span className="text-xs text-text-primary">{activity.orderId}</span>
              </div>
            )}
            {config.fields.map((field) => (
              <div key={field.label} className="flex items-center gap-4 px-3 py-2 border-t border-border-tertiary">
                <span className="text-xs text-text-tertiary w-20 shrink-0">{field.label}</span>
                <span className={cn(
                  "text-xs",
                  field.highlight ? "text-text-success-primary" : "text-text-primary"
                )}>{field.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Change log */}
        {changeLog.length > 0 && <ChangeLogDiff changes={changeLog} />}

        {/* Notes */}
        {notes.length > 0 && <NotesCard notes={notes} />}
      </div>
    </div>
  );
}

const SIDEBAR_ORDER_STEPS = [
  { id: 'referral', label: 'Referral Received' },
  { id: 'insurance_verification', label: 'Insurance Verification' },
  { id: 'insurance_policy_review', label: 'Insurance Policy Review' },
  { id: 'ready_for_claim', label: 'Ready for Claim Submission' },
] as const;

const orderStageToCompleted: Record<OrderStage, number> = {
  validation: 1,
  eligibility: 2,
  qualification: 3,
  complete: 4,
};

const ORDER_TABS = ['Order processing', 'Call history', 'Documents', 'Notes'];

function formatSidebarDob(dob: string): string {
  const date = new Date(dob + 'T00:00:00');
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function formatSidebarAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
}

function SidebarOrderDetail({ order, patient, onClose }: { order: Order; patient: Patient; onClose: () => void }) {
  const orderStatusConfig = statusBadgeConfig[order.status];
  const completedCount = orderStageToCompleted[order.stage];

  const formatNoteDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const formatTimestamp = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${date} at ${time}`;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header with close */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <p className="text-[20px] font-medium lasso:wght-medium leading-7 text-text-primary">{order.orderName}</p>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full size-7 hover:bg-bg-tertiary shrink-0"
          onClick={onClose}
        >
          <SidebarSimple className="size-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-5 px-4 pb-6">
        {/* Order type + Status */}
        <div className="flex items-center gap-3">
          <Badge variant={orderStatusConfig.variant}>{orderStatusConfig.label}</Badge>
          <span className="text-xs text-text-tertiary">Order {order.id}</span>
        </div>

        {/* Stage tracker */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Processing Stage</span>
          <div className="flex flex-col">
            {SIDEBAR_ORDER_STEPS.map((step, i) => {
              const isCompleted = i < completedCount;
              const isCurrent = i === completedCount;
              const isLast = i === SIDEBAR_ORDER_STEPS.length - 1;

              return (
                <div key={step.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {isCompleted || isCurrent ? (
                      <div className="size-3 rounded-full bg-[var(--green-9)] shrink-0 mt-1" />
                    ) : (
                      <div className="size-3 rounded-full bg-border-secondary shrink-0 mt-1" />
                    )}
                    {!isLast && (
                      <div className={cn(
                        'w-px flex-1 min-h-[20px] mt-1 mb-1',
                        isCompleted ? 'bg-border-success-primary' : 'bg-border-secondary'
                      )} />
                    )}
                  </div>
                  <div className={cn('flex flex-col pb-3', isLast && 'pb-0')}>
                    <span className={cn(
                      'text-sm leading-5',
                      isCompleted || isCurrent ? 'text-text-primary font-medium lasso:wght-medium' : 'text-text-tertiary'
                    )}>
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order items */}
        {order.items.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Order Items</span>
            <div className="border border-border-tertiary rounded-md overflow-hidden">
              {order.items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-start justify-between px-3 py-2.5 hover:bg-accent/50 transition-colors',
                    i < order.items.length - 1 && 'border-b border-border-tertiary'
                  )}
                >
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-sm text-text-primary">{item.product}</span>
                    <span className="text-xs text-text-tertiary truncate">{item.description}</span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0 ml-3">
                    <span className="text-xs font-medium text-text-secondary">{item.hcpcsCode}</span>
                    <span className="text-xs text-text-tertiary">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing information */}
        {order.missingInfo && order.missingInfo.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-text-warning-primary uppercase tracking-wider">Missing Information</span>
            <div className="border border-dashed border-border-warning-primary rounded-md bg-bg-warning-secondary px-3 py-2.5">
              <ul className="flex flex-col gap-1.5">
                {order.missingInfo.map((info, i) => (
                  <li key={i} className="text-sm text-text-warning-primary flex items-start gap-2">
                    <span className="shrink-0 mt-1.5 size-1 rounded-full bg-text-warning-primary" />
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Rejection reasons */}
        {order.rejectionReasons && order.rejectionReasons.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-text-error-primary uppercase tracking-wider">Rejection Reasons</span>
            <div className="border border-border-error-secondary rounded-md bg-bg-error-secondary px-3 py-2.5">
              <ul className="flex flex-col gap-1.5">
                {order.rejectionReasons.map((reason, i) => (
                  <li key={i} className="text-sm text-text-error-primary flex items-start gap-2">
                    <span className="shrink-0 mt-1.5 size-1 rounded-full bg-text-error-primary" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Referring Practitioner */}
        {order.referringPractitioner && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Referring Practitioner</span>
            <div className="border border-border-tertiary rounded-md px-3 py-2.5 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-20 shrink-0">Name</span>
                <span className="text-sm font-medium text-text-primary">{order.referringPractitioner}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-20 shrink-0">NPI</span>
                <span className="text-sm text-text-primary">{order.referringPractitionerNpi ?? '—'}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-20 shrink-0">Credentials</span>
                <span className="text-sm text-text-primary">{order.referringPractitionerCredentials ?? '—'}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs text-text-tertiary w-20 shrink-0">Address</span>
                <span className="text-sm text-text-primary">{order.referringPractitionerAddress ?? '—'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Referring Facility */}
        {order.referringFacility && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Referring Facility</span>
            <div className="border border-border-tertiary rounded-md px-3 py-2.5 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-20 shrink-0">Name</span>
                <span className="text-sm font-medium text-text-primary">{order.referringFacility}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-20 shrink-0">NPI</span>
                <span className="text-sm text-text-primary">{order.referringFacilityNpi ?? '—'}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs text-text-tertiary w-20 shrink-0">Address</span>
                <span className="text-sm text-text-primary">{order.referringFacilityAddress ?? '—'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {order.notes.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Notes</span>
            <div className="border border-border-tertiary rounded-md overflow-hidden">
              {order.notes.map((note, i) => (
                <div
                  key={note.id}
                  className={cn(
                    'px-3 py-2.5 flex flex-col gap-1 hover:bg-accent/50 transition-colors',
                    i < order.notes.length - 1 && 'border-b border-border-tertiary'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-text-primary">{note.author}</span>
                    <span className="text-[11px] text-text-tertiary shrink-0">{formatNoteDate(note.createdAt)}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Timeline</span>
          <div className="border border-border-tertiary rounded-md px-3 py-2.5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary">Created</span>
              <span className="text-sm text-text-primary">{formatTimestamp(order.dateCreated)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary">Last updated</span>
              <span className="text-sm text-text-primary">{formatTimestamp(order.lastUpdated)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock verification history for insurance tab
const mockVerificationHistory = [
  {
    id: '1',
    date: '2026-01-15T10:30:00Z',
    result: 'success' as const,
    runBy: 'Sarah M.',
    notes: 'Active coverage confirmed',
  },
  {
    id: '2',
    date: '2026-01-10T14:15:00Z',
    result: 'failed' as const,
    runBy: 'Mike T.',
    notes: 'Member ID not found - typo in original entry',
  },
];

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

const documentTypeLabels: Record<string, string> = {
  sleep_study: 'Sleep Study',
  prior_auth: 'Prior Auth',
  cmn: 'CMN',
  other: 'Other',
};

const documentSourceLabels: Record<string, string> = {
  ehr: 'EHR',
  tennr: 'Tennr',
  bright_tree: 'Bright Tree',
};

function SidebarDocumentDetail({ document, onClose }: { document: OrderDocument; onClose: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium lasso:wght-medium text-text-primary">{document.name}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant="outline" className="text-[10px]">{documentTypeLabels[document.type] || document.type}</Badge>
            <Badge variant={document.source === 'tennr' ? 'default' : 'secondary'} className="text-[10px]">
              {documentSourceLabels[document.source] || document.source}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full size-7 hover:bg-bg-tertiary shrink-0"
          onClick={onClose}
        >
          <SidebarSimple className="size-4" />
        </Button>
      </div>

      <div className="border-t border-border-secondary" />

      {/* Details */}
      <div className="px-4 py-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-text-tertiary uppercase tracking-wide">Type</span>
            <span className="text-sm text-text-primary">{documentTypeLabels[document.type] || document.type}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-text-tertiary uppercase tracking-wide">Source</span>
            <span className="text-sm text-text-primary">{documentSourceLabels[document.source] || document.source}</span>
          </div>
        </div>

        <div className="border-t border-border-secondary" />

        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-text-tertiary uppercase tracking-wide">Date Added</span>
          <span className="text-sm text-text-primary">
            {new Date(document.dateAdded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="border-t border-border-secondary" />

        {/* Preview placeholder */}
        <div>
          <span className="text-[11px] text-text-tertiary uppercase tracking-wide">Preview</span>
          <div className="mt-2 aspect-[8.5/11] bg-bg-secondary rounded-md border border-border-secondary flex items-center justify-center">
            <p className="text-sm text-text-tertiary">PDF Preview</p>
          </div>
        </div>

        <div className="border-t border-border-secondary" />

        {/* Download */}
        <a
          href={document.url}
          download={document.name}
          className="flex items-center justify-center gap-1.5 text-sm text-text-primary hover:underline cursor-pointer"
        >
          <DownloadSimple weight="regular" className="size-3.5" />
          Download
        </a>
      </div>
    </div>
  );
}

// Sidebar width constraints (as percentages of container)
const MIN_SIDEBAR_PERCENT = 15;
const MAX_SIDEBAR_PERCENT = 35;
const DEFAULT_SIDEBAR_PERCENT = 25;

export function PatientSummaryVariantB({
  patient,
  orders,
  activities,
  documents = [],
  onAddComment,
  hideOrderIllustrations,
}: PatientSummaryVariantBProps) {
  const [activeMainTab, setActiveMainTab] = useState('activity');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [sidebarPercent, setSidebarPercent] = useState(DEFAULT_SIDEBAR_PERCENT);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarDetailView, setSidebarDetailView] = useState<SidebarDetailView>({ kind: 'patient' });
  const [sidebarTab, setSidebarTab] = useState<'details' | 'timeline'>('details');
  const [viewingFullDoc, setViewingFullDoc] = useState<ViewableDocument | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState({
    patient: true,
    insurance: true,
    data: true,
  });
  const [workflowOpen, setWorkflowOpen] = useState(false);

  const auditLogEntries: TimelineActivity[] = useMemo(() => [
    { id: 'audit-1', type: 'ehr_log', title: 'Patient record accessed', description: 'Demographics viewed via EHR portal', ehrSystem: 'Epic', timestamp: '2026-04-08T09:14:00Z' },
    { id: 'audit-2', type: 'ehr_log', title: 'Insurance eligibility queried', description: 'Real-time 270/271 transaction sent to Aetna', ehrSystem: 'Athenahealth', timestamp: '2026-04-07T16:42:00Z' },
    { id: 'audit-3', type: 'ehr_log', title: 'Order ORD001 synced to EHR', description: 'Aerosol Mask order pushed via HL7 ADT feed', ehrSystem: 'Epic', timestamp: '2026-04-07T11:05:00Z' },
    { id: 'audit-4', type: 'ehr_log', title: 'Patient demographics updated', description: 'Address changed from EHR sync — 123 Main St → 456 Oak Ave', ehrSystem: 'Cerner', timestamp: '2026-04-06T14:30:00Z' },
    { id: 'audit-5', type: 'ehr_log', title: 'Clinical document received', description: 'Sleep study report ingested from referring provider fax', ehrSystem: 'Epic', timestamp: '2026-04-06T10:18:00Z' },
    { id: 'audit-6', type: 'ehr_log', title: 'Prior authorization submitted', description: 'PA request sent to Aetna for CGM & Supplies order', ehrSystem: 'eClinicalWorks', timestamp: '2026-04-05T15:55:00Z' },
    { id: 'audit-7', type: 'ehr_log', title: 'Patient record accessed', description: 'Orders tab viewed by sarah.chen@tennr.com', ehrSystem: 'Epic', timestamp: '2026-04-05T09:22:00Z' },
    { id: 'audit-8', type: 'ehr_log', title: 'Eligibility response received', description: '271 response — active coverage confirmed through 2026-12-31', ehrSystem: 'Athenahealth', timestamp: '2026-04-04T13:47:00Z' },
    { id: 'audit-9', type: 'ehr_log', title: 'Order ORD003 synced to EHR', description: 'Nebulizer order pushed via HL7 ORM feed', ehrSystem: 'Epic', timestamp: '2026-04-04T08:10:00Z' },
    { id: 'audit-10', type: 'ehr_log', title: 'Patient consent form logged', description: 'HIPAA authorization recorded — signed digitally', ehrSystem: 'Cerner', timestamp: '2026-04-03T17:30:00Z' },
    { id: 'audit-11', type: 'ehr_log', title: 'Referral document received', description: 'Inbound CCD from Evergreen Pulmonology via Direct messaging', ehrSystem: 'eClinicalWorks', timestamp: '2026-04-03T11:02:00Z' },
    { id: 'audit-12', type: 'ehr_log', title: 'Patient record created', description: 'New patient record generated from inbound referral', ehrSystem: 'Epic', timestamp: '2026-04-02T08:45:00Z' },
  ], []);

  // Handle resize drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const newWidth = containerRect.right - e.clientX;

      // Calculate percentage and clamp between min and max
      const newPercent = (newWidth / containerWidth) * 100;
      const clampedPercent = Math.min(Math.max(newPercent, MIN_SIDEBAR_PERCENT), MAX_SIDEBAR_PERCENT);
      setSidebarPercent(clampedPercent);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Open sidebar with specific detail view
  const handleSelectActivity = useCallback((activity: TimelineActivity) => {
    setSidebarDetailView({ kind: 'activity', activity });
    setSidebarTab('details');
    setIsRightSidebarOpen(true);
  }, []);

  const handleSelectOrder = useCallback((order: Order) => {
    setSidebarDetailView({ kind: 'order', order });
    setSidebarTab('details');
    setIsRightSidebarOpen(true);
  }, []);

  const handleBackToPatientDetails = useCallback(() => {
    setSidebarDetailView({ kind: 'patient' });
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveMainTab(tab);
    setIsRightSidebarOpen(false);
  }, []);

  const handleViewAllOrders = useCallback(() => {
    setActiveMainTab('orders');
  }, []);

  const viewableDocs: ViewableDocument[] = useMemo(() =>
    documents.map((doc) => ({ id: doc.id, name: doc.name, pages: 5 })),
    [documents]
  );

  const handleViewDocument = useCallback((doc: OrderDocument) => {
    setViewingFullDoc({ id: doc.id, name: doc.name, pages: 5 });
  }, []);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div ref={containerRef} className="flex flex-1 gap-0 h-full">
      {/* Main Content Area Panel */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-bg-primary rounded-xs shadow-[0_0_6px_1px_rgba(0,0,0,0.03),0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]">
        <Tabs value={activeMainTab} onValueChange={handleTabChange} className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Fixed Header Section */}
          <div className="pt-6 px-6 flex flex-col items-start w-full bg-bg-primary shrink-0">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-1 items-start">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-sm">
                  <a href="/explore" className="text-text-secondary hover:text-text-primary transition-colors">
                    Patient Hub
                  </a>
                  <span className="text-text-tertiary">/</span>
                  <span className="text-text-primary font-medium">Patient Profile</span>
                </nav>
                {/* Title */}
                <h2 className="text-[30px] leading-[36px] font-serif font-light text-text-primary">
                  {patient.firstName} {patient.lastName}
                </h2>
                <p className="text-sm text-text-secondary flex items-center gap-0.5">
                  {formatDate(patient.dob)} ·{' '}
                  <CopyableValue label="MRN" value={patient.mrn.replace(/\D/g, '') || patient.mrn} />
                </p>
              </div>

              {/* Contact Info, Sync Status and Sidebar Toggle */}
              <div className="flex flex-col items-end gap-1 self-start pt-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-text-tertiary">
                    Last activity today at 9:15 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Main Tabs Navigation */}
            <nav className="w-full h-10 mt-4 relative border-b border-border">
              <TabsList className="inline-flex h-full items-center justify-start bg-transparent p-0 gap-0">
                <TabsTrigger
                  value="activity"
                  className={cn(
                    'relative px-2 h-full inline-flex items-center justify-center text-sm transition-colors rounded-none border-0 shadow-none',
                    'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]',
                    'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:after:bg-brand-terracotta',
                    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:text-foreground'
                  )}
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="demographics"
                  className={cn(
                    'relative px-2 h-full inline-flex items-center justify-center text-sm transition-colors rounded-none border-0 shadow-none',
                    'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]',
                    'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:after:bg-brand-terracotta',
                    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:text-foreground'
                  )}
                >
                  Demographics
                </TabsTrigger>
                <TabsTrigger
                  value="insurance"
                  className={cn(
                    'relative px-2 h-full inline-flex items-center justify-center text-sm transition-colors rounded-none border-0 shadow-none',
                    'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]',
                    'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:after:bg-brand-terracotta',
                    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:text-foreground'
                  )}
                >
                  Insurance
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className={cn(
                    'relative px-2 h-full inline-flex items-center justify-center text-sm transition-colors rounded-none border-0 shadow-none',
                    'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]',
                    'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:after:bg-brand-terracotta',
                    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:text-foreground'
                  )}
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className={cn(
                    'relative px-2 h-full inline-flex items-center justify-center text-sm transition-colors rounded-none border-0 shadow-none',
                    'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]',
                    'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:after:bg-brand-terracotta',
                    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:text-foreground'
                  )}
                >
                  Notes
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className={cn(
                    'relative px-2 h-full inline-flex items-center justify-center text-sm transition-colors rounded-none border-0 shadow-none',
                    'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]',
                    'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:after:bg-brand-terracotta',
                    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:text-foreground'
                  )}
                >
                  Documents
                </TabsTrigger>
              </TabsList>
            </nav>
          </div>

          {/* Scrollable Tab Content */}
          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
            {/* Activity Tab */}
            <TabsContent value="activity" className="mt-0">
              <Timeline activities={activities} onAddComment={onAddComment} onSelectActivity={handleSelectActivity} />
            </TabsContent>

            {/* Demographics Tab */}
            <TabsContent value="demographics" className="mt-0">
              <DemographicsForm patient={patient} />
            </TabsContent>

            {/* Insurance Tab */}
            <TabsContent value="insurance" className="mt-0">
              <div className="space-y-6">
                <InsuranceForm
                  insurance={patient.primaryInsurance}
                  title="Primary Insurance"
                />
                <InsuranceForm
                  insurance={patient.secondaryInsurance}
                  title="Secondary Insurance"
                />
                <VerificationHistory history={mockVerificationHistory} />
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-0">
              <OrdersTabContent orders={orders} onSelectOrder={handleSelectOrder} />
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-0">
              <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border-tertiary">
                  <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">Notes</div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-text-secondary">No notes available</p>
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-0">
              <DocumentsTableCard documents={documents} onViewDocument={handleViewDocument} />
            </TabsContent>

          </div>
        </Tabs>
      </main>

      {/* Resize Handle */}
      <div
        className={cn(
          "h-full flex items-center justify-center cursor-col-resize group shrink-0",
          "transition-[width,opacity] duration-300 ease-in-out",
          isRightSidebarOpen ? "w-2 opacity-100" : "w-0 opacity-0 pointer-events-none"
        )}
        onMouseDown={handleMouseDown}
      >
        <div
          className={cn(
            "w-[3px] h-12 rounded-full transition-all duration-150",
            "bg-transparent group-hover:bg-border-primary",
            isResizing && "bg-brand-terracotta"
          )}
        />
      </div>

      {/* Right Sidebar Panel */}
      <aside
        className={cn(
          "rounded-xs shadow-[0_0_6px_1px_rgba(0,0,0,0.03),0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] flex flex-col h-full shrink-0",
          "overflow-hidden",
          !isResizing && "transition-[width,opacity] duration-300 ease-in-out",
          !isRightSidebarOpen && "opacity-0"
        )}
        style={{
          backgroundColor: 'var(--bg-white)',
          width: isRightSidebarOpen ? `${sidebarPercent}%` : 0,
        }}
      >
        <div
          className={cn(
            "h-full w-full flex flex-col",
            !isResizing && "transition-opacity duration-300 ease-in-out",
            isRightSidebarOpen ? "opacity-100 delay-75" : "opacity-0"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header — only for default patient view */}
            {sidebarDetailView.kind === 'patient' && (
              <div className="flex items-center justify-end px-4 h-[56px] shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full size-7 hover:bg-bg-tertiary"
                  onClick={() => { setIsRightSidebarOpen(false); setSidebarDetailView({ kind: 'patient' }); }}
                >
                  <SidebarSimple className="size-4" />
                </Button>
              </div>
            )}

            {/* Details Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Activity or Order detail view */}
              {sidebarDetailView.kind === 'activity' && (
                <SidebarActivityDetail activity={sidebarDetailView.activity} onClose={() => { setIsRightSidebarOpen(false); setSidebarDetailView({ kind: 'patient' }); }} />
              )}
              {sidebarDetailView.kind === 'order' && (
                <SidebarOrderDetail order={sidebarDetailView.order} patient={patient} onClose={() => { setIsRightSidebarOpen(false); setSidebarDetailView({ kind: 'patient' }); }} />
              )}
              {sidebarDetailView.kind === 'document' && (
                <SidebarDocumentDetail document={sidebarDetailView.document} onClose={() => { setIsRightSidebarOpen(false); setSidebarDetailView({ kind: 'patient' }); }} />
              )}

              {/* Patient Section (default) */}
              {sidebarDetailView.kind === 'patient' && <>
              {/* Patient Section */}
              <div className="border-b border-border-secondary">
                <button
                  onClick={() => toggleSection('patient')}
                  className="flex items-center justify-between px-4 h-[40px] w-full hover:bg-bg-secondary/50 transition-colors"
                >
                  <span className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">Patient</span>
                  <CaretDown className={cn(
                    "size-4 text-text-tertiary transition-transform duration-200",
                    !expandedSections.patient && "-rotate-90"
                  )} />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-in-out",
                    expandedSections.patient ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                      {/* Contact & Address Group */}
                      <div className="space-y-4">
                        {/* Contact */}
                        <div>
                          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Contact</p>
                          <a href={`mailto:${patient.email}`} className="text-sm text-brand-terracotta block leading-6">{patient.email}</a>
                          <p className="text-sm text-text-primary leading-6">{patient.phone}</p>
                        </div>

                        {/* Primary Address */}
                        <div>
                          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Primary Address</p>
                          <p className="text-sm text-text-primary leading-5">{patient.address.street}, {patient.address.city}, {patient.address.state} {patient.address.zip}</p>
                        </div>

                        {/* Delivery Address */}
                        {patient.deliveryAddress && (
                          <div>
                            <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Delivery Address</p>
                            <p className="text-sm text-text-primary leading-5">{patient.deliveryAddress.street}, {patient.deliveryAddress.city}, {patient.deliveryAddress.state} {patient.deliveryAddress.zip}</p>
                          </div>
                        )}
                      </div>

                      {/* Separator */}
                      <div className="border-t border-border-secondary my-4" />

                      {/* DOB & ID Group */}
                      <div className="space-y-4">
                        {/* DOB */}
                        <div>
                          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">DOB</p>
                          <p className="text-sm text-text-primary leading-5">{formatDate(patient.dob)}</p>
                        </div>

                        {/* Patient ID */}
                        <div>
                          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Patient ID</p>
                          <p className="text-sm text-text-primary leading-5">{patient.patientId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Section */}
              <div className="border-b border-border-secondary">
                <button
                  onClick={() => toggleSection('insurance')}
                  className="flex items-center justify-between px-4 h-[40px] w-full hover:bg-bg-secondary/50 transition-colors"
                >
                  <span className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">Insurance</span>
                  <CaretDown className={cn(
                    "size-4 text-text-tertiary transition-transform duration-200",
                    !expandedSections.insurance && "-rotate-90"
                  )} />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-in-out",
                    expandedSections.insurance ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                      {/* Primary Insurance */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Primary</p>
                          <p className="text-sm font-medium text-text-primary leading-5">{patient.primaryInsurance?.carrier}</p>
                          <p className="text-sm text-text-secondary leading-5">{patient.primaryInsurance?.plan}</p>
                        </div>

                        {/* Primary Policy Info */}
                        <div>
                          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-2">Policy Info</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm leading-5">
                              <span className="text-text-secondary">Member ID</span>
                              <span className="text-text-primary">{patient.primaryInsurance?.memberId}</span>
                            </div>
                            <div className="flex justify-between text-sm leading-5">
                              <span className="text-text-secondary">Effective Date</span>
                              <span className="text-text-primary">{patient.primaryInsurance?.effectiveDate ? formatDate(patient.primaryInsurance.effectiveDate) : '—'}</span>
                            </div>
                            <div className="flex justify-between text-sm leading-5 items-center">
                              <span className="text-text-secondary">Status</span>
                              <Badge variant="default" className="bg-bg-success-primary text-text-success-primary text-xs h-5">Active</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Secondary Insurance */}
                      {patient.secondaryInsurance && (
                        <>
                          {/* Separator */}
                          <div className="border-t border-border-secondary my-4" />

                          <div className="space-y-4">
                            <div>
                              <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Secondary</p>
                              <p className="text-sm font-medium text-text-primary leading-5">{patient.secondaryInsurance.carrier}</p>
                              <p className="text-sm text-text-secondary leading-5">{patient.secondaryInsurance.plan}</p>
                            </div>

                            {/* Secondary Policy Info */}
                            <div>
                              <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-2">Policy Info</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm leading-5">
                                  <span className="text-text-secondary">Member ID</span>
                                  <span className="text-text-primary">{patient.secondaryInsurance.memberId}</span>
                                </div>
                                <div className="flex justify-between text-sm leading-5">
                                  <span className="text-text-secondary">Effective Date</span>
                                  <span className="text-text-primary">{patient.secondaryInsurance.effectiveDate ? formatDate(patient.secondaryInsurance.effectiveDate) : '—'}</span>
                                </div>
                                <div className="flex justify-between text-sm leading-5 items-center">
                                  <span className="text-text-secondary">Status</span>
                                  <Badge variant="default" className="bg-bg-success-primary text-text-success-primary text-xs h-5">Active</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Section */}
              <div>
                <button
                  onClick={() => toggleSection('data')}
                  className="flex items-center justify-between px-4 h-[40px] w-full hover:bg-bg-secondary/50 transition-colors"
                >
                  <span className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">Data</span>
                  <CaretDown className={cn(
                    "size-4 text-text-tertiary transition-transform duration-200",
                    !expandedSections.data && "-rotate-90"
                  )} />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-in-out",
                    expandedSections.data ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 space-y-4">
                      <div>
                        <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Source</p>
                        <p className="text-sm text-text-primary leading-5">{patient.syncStatus.ehrSystem}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Last Sync</p>
                        <p className="text-sm text-text-primary leading-5">Today, 4:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>}
            </div>
          </div>
        </div>
      </aside>

      {/* Full-page document viewer */}
      {viewingFullDoc && (
        <DocumentFullViewer
          patient={patient}
          document={viewingFullDoc}
          documents={viewableDocs}
          onClose={() => setViewingFullDoc(null)}
          onSelectDocument={setViewingFullDoc}
        />
      )}

      <WorkflowSheet
        patient={patient}
        open={workflowOpen}
        onOpenChange={(open) => { if (!open) setWorkflowOpen(false); }}
      />
    </div>
  );
}
