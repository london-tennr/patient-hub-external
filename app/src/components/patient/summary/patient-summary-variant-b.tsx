'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  SidebarSimple,
  CaretLeft,
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

interface TimelineActivity {
  id: string;
  type: 'verification' | 'document' | 'referral' | 'order_complete' | 'prior_auth' | 'comment';
  title: string;
  description?: string;
  orderId?: string;
  source?: ActivitySource;
  author?: {
    name: string;
    initials: string;
  };
  timestamp: string;
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
  attention: 'Ready for review',
  future: 'Pending',
};

function ActiveStagesSection({ patient, onOpenWorkflow }: { patient: Patient; onOpenWorkflow?: () => void }) {
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
          <p className="text-sm font-medium lasso:wght-medium text-text-primary">Patient Status</p>
          <PatientStatusBadge status={patient.status} stage={patient.stage} onOpenWorkflow={onOpenWorkflow} />
        </div>
        <span className="text-[11px] text-text-tertiary">{completedCount}/{TOTAL_STAGES} stages</span>
      </div>

      {/* Status alert banner */}
      {(isBlocked || isAttention) && (
        <div className={cn('px-4 py-2.5 border-t border-border-tertiary', statusConfig.color.bg)}>
          <p className={cn('text-xs', statusConfig.color.text)}>{statusConfig.description}</p>
        </div>
      )}

      {/* Horizontal dot progress */}
      <div className="border-t border-border-tertiary px-4 py-4">
        <div className="flex items-center group/dots">
          {stageOrder.map((stage, i) => {
            const status = getStepStatus(stage);
            const isStageCompleted = status === 'completed';
            const isRunning = status === 'running' || status === 'current';
            const label = stageLabels[stage];
            const description = stageDescriptions[stage];
            const ts = patient.stageCompletedAt?.[stage];
            const timestamp = ts
              ? new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
              : undefined;

            return (
              <div key={stage} className="flex items-center flex-1 last:flex-none">
                {/* Dot with tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="cursor-default shrink-0">
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
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="center" className="max-w-[220px] p-0">
                    <div className="px-3 pt-2.5 pb-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-text-primary">{label}</span>
                        <span className={cn(
                          'text-[10px] shrink-0',
                          isStageCompleted ? 'text-emerald-500' :
                          isRunning ? 'text-blue-500' :
                          status === 'blocked' ? 'text-neutral-500' :
                          status === 'attention' ? 'text-amber-500' :
                          'text-text-tertiary',
                        )}>
                          {timestamp ?? stageStatusLabels[status]}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-tertiary leading-4 mt-1">{description}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>

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
    </div>
  );
}

// --- Sidebar detail views ---

const activityIcon: Record<TimelineActivity['type'], React.ReactNode> = {
  verification: <Heartbeat weight="regular" className="size-4 text-text-tertiary" />,
  document: <FolderOpen weight="regular" className="size-4 text-text-tertiary" />,
  referral: <FileText weight="regular" className="size-4 text-text-tertiary" />,
  order_complete: <CheckCircle weight="regular" className="size-4 text-text-success-primary" />,
  prior_auth: <ShieldCheck weight="regular" className="size-4 text-text-tertiary" />,
  comment: <FileText weight="regular" className="size-4 text-text-tertiary" />,
};

const activityTypeLabel: Record<TimelineActivity['type'], string> = {
  verification: 'Insurance Verification',
  document: 'Document Upload',
  referral: 'Referral',
  order_complete: 'Order Completion',
  prior_auth: 'Prior Authorization',
  comment: 'Comment',
};

const activityTypeBadgeVariant: Record<TimelineActivity['type'], 'outline'> = {
  verification: 'outline',
  document: 'outline',
  referral: 'outline',
  order_complete: 'outline',
  prior_auth: 'outline',
  comment: 'outline',
};

const activityDetails: Record<TimelineActivity['type'], { description: string; fields: { label: string; value: string }[] }> = {
  verification: {
    description: 'An automated insurance verification check was initiated to confirm patient eligibility and benefits coverage with the carrier on file.',
    fields: [
      { label: 'Carrier', value: 'Aetna' },
      { label: 'Plan Type', value: 'PPO' },
      { label: 'Verification Method', value: 'Electronic (270/271)' },
      { label: 'Initiated By', value: 'System — Auto Trigger' },
    ],
  },
  document: {
    description: 'A document was uploaded and attached to the patient record.',
    fields: [
      { label: 'Document Type', value: 'Insurance Card' },
      { label: 'Uploaded By', value: 'Patient Portal' },
      { label: 'File Format', value: 'PDF' },
      { label: 'Pages', value: '2' },
    ],
  },
  referral: {
    description: 'A referral was received from an external provider and linked to the relevant order.',
    fields: [
      { label: 'Referring Provider', value: 'PresNow Urgent Care' },
      { label: 'Provider NPI', value: '1234567890' },
      { label: 'Referral Type', value: 'DME Referral' },
      { label: 'Received Via', value: 'eFax' },
    ],
  },
  order_complete: {
    description: 'The order has been fully processed and a claim has been submitted.',
    fields: [
      { label: 'Claim Number', value: 'CLM-2026-04821' },
      { label: 'Submitted To', value: 'Aetna' },
      { label: 'Total Billed', value: '$1,247.00' },
      { label: 'Expected Reimbursement', value: '$998.40' },
    ],
  },
  prior_auth: {
    description: 'A prior authorization request was processed with the insurance carrier.',
    fields: [
      { label: 'Auth Number', value: 'PA-2026-38291' },
      { label: 'Carrier', value: 'Aetna' },
      { label: 'Decision', value: 'Approved' },
      { label: 'Valid Through', value: '07/01/2026' },
    ],
  },
  comment: {
    description: 'A comment was added to the patient record.',
    fields: [],
  },
};

function formatFullTimestamp(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }) + ' at ' + date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatOrderId(orderId: string): string {
  return orderId.replace(/^ORD-/i, 'Order ');
}

function SidebarActivityDetail({ activity, onClose }: { activity: TimelineActivity; onClose: () => void }) {
  const details = activityDetails[activity.type];
  const typeLabel = activityTypeLabel[activity.type];
  const badgeVariant = activityTypeBadgeVariant[activity.type];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-start gap-2.5">
        <div className="size-8 rounded-full border border-border-secondary flex items-center justify-center bg-bg-white shrink-0">
          {activityIcon[activity.type]}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span className="text-sm font-medium lasso:wght-medium text-text-primary leading-tight">{activity.title}</span>
          <Badge variant={badgeVariant} className="w-fit text-[10px]">{typeLabel}</Badge>
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
        {/* Timestamp & Order */}
        <div className="space-y-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <Clock weight="regular" className="size-3 text-text-tertiary" />
              <span className="text-[11px] text-text-tertiary uppercase tracking-wide">Date & Time</span>
            </div>
            <span className="text-sm text-text-primary">{formatFullTimestamp(activity.timestamp)}</span>
          </div>
          {activity.orderId && (
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <Hash weight="regular" className="size-3 text-text-tertiary" />
                <span className="text-[11px] text-text-tertiary uppercase tracking-wide">Order</span>
              </div>
              <span className="text-sm text-text-primary font-mono">{formatOrderId(activity.orderId)}</span>
            </div>
          )}
        </div>

        <div className="border-t border-border-secondary" />

        {/* Description */}
        <div>
          <span className="text-[11px] text-text-tertiary uppercase tracking-wide">Description</span>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">{details.description}</p>
        </div>

        {/* Detail fields */}
        {details.fields.length > 0 && (
          <>
            <div className="border-t border-border-secondary" />
            <div>
              <span className="text-[11px] text-text-tertiary uppercase tracking-wide">Details</span>
              <div className="mt-2 bg-bg-secondary rounded-md border border-border-secondary">
                {details.fields.map((field, i) => (
                  <div key={field.label} className={cn(
                    "flex items-center justify-between px-3 py-2",
                    i > 0 && "border-t border-border-secondary"
                  )}>
                    <span className="text-sm text-text-secondary">{field.label}</span>
                    <span className="text-sm font-medium lasso:wght-medium text-text-primary">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
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
  const [activeOrderTab, setActiveOrderTab] = useState(0);
  const orderStatusConfig = statusBadgeConfig[order.status];
  const completedCount = orderStageToCompleted[order.stage];
  const referredBy = [order.referringFacility, order.referringPractitioner].filter(Boolean).join(', ') || order.orderName;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Patient header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-semibold text-text-primary">
            {patient.firstName} {patient.lastName}, {formatSidebarDob(patient.dob)}
          </h2>
          <p className="text-xs text-text-tertiary">EHR ID MRN-{patient.mrn}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full size-7 hover:bg-bg-tertiary shrink-0 mt-0.5"
          onClick={onClose}
        >
          <SidebarSimple className="size-4" />
        </Button>
      </div>

      {/* ORDER STATUS / PAYER */}
      <div className="flex gap-8 px-4 py-3">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Order Status</span>
          <Badge variant={orderStatusConfig.variant}>{orderStatusConfig.label}</Badge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Payer</span>
          <span className="text-sm text-text-secondary">—</span>
        </div>
      </div>

      {/* Order heading + received ago */}
      <div className="flex items-center justify-between px-4 pt-1 pb-2">
        <h3 className="text-lg font-semibold text-text-primary">Order</h3>
        <span className="text-sm font-medium text-text-primary">Received {formatSidebarAgo(order.dateCreated)}</span>
      </div>

      {/* Order card */}
      <div className="mx-4 mb-5 border border-border-secondary rounded-lg overflow-hidden">
        <div className="flex items-start justify-between p-4 pb-3">
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <span className="text-sm font-semibold text-text-primary">{order.orderName}</span>
            <span className="text-xs text-text-tertiary truncate">External order ID: {order.externalOrderId}</span>
          </div>
          <CaretDown weight="regular" className="size-5 text-text-tertiary shrink-0 ml-3 mt-0.5" />
        </div>
        <div className="border-t border-border-secondary mx-4" />
        <div className="p-4 pt-3">
          <p className="text-sm text-text-secondary leading-relaxed">Referred by {referredBy}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-5 px-4 border-b border-border-secondary">
        {ORDER_TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveOrderTab(i)}
            className={cn(
              'relative pb-2.5 text-sm transition-colors cursor-pointer whitespace-nowrap',
              i === activeOrderTab
                ? 'font-semibold text-text-primary'
                : 'text-text-tertiary hover:text-text-secondary'
            )}
          >
            {tab}
            {i === activeOrderTab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-terracotta rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Order processing tab — horizontal stepper */}
      {activeOrderTab === 0 && (
        <div className="px-4 py-5 flex flex-col gap-5">
          <div className="grid grid-cols-4 gap-2.5">
            {SIDEBAR_ORDER_STEPS.map((step, i) => {
              const isCompleted = i < completedCount;
              const isCurrent = i === completedCount;

              return (
                <div key={step.id} className="flex flex-col gap-1.5">
                  <div
                    className={cn(
                      'h-1.5 rounded-full',
                      isCompleted
                        ? 'bg-[var(--green-9)]'
                        : isCurrent
                          ? 'bg-[var(--green-9)]/40'
                          : 'bg-neutral-200'
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs leading-tight',
                      isCompleted
                        ? 'text-text-primary font-medium'
                        : 'text-text-tertiary'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Clock weight="regular" className="size-4" />
              <span className="text-sm font-medium">Updated {formatSidebarAgo(order.lastUpdated)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {activeOrderTab !== 0 && (
        <div className="px-4 py-12 text-center text-sm text-text-tertiary">
          No {ORDER_TABS[activeOrderTab]?.toLowerCase()} yet
        </div>
      )}
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
  const [activeMainTab, setActiveMainTab] = useState('summary');
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
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="flex-1 flex flex-col h-full overflow-hidden">
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
                  <CopyableValue label="MRN" value={patient.mrn.replace(/\D/g, '') || patient.mrn} /> ·{' '}
                  <CopyableValue label="ID" value={patient.patientId} />
                </p>
              </div>

              {/* Contact Info, Sync Status and Sidebar Toggle */}
              <div className="flex flex-col items-end gap-1 self-start pt-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-text-tertiary">
                    Last synced today at 9:15 AM
                  </p>
                  {!isRightSidebarOpen && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full size-7 hover:bg-bg-tertiary transition-opacity duration-200"
                      onClick={() => setIsRightSidebarOpen(true)}
                    >
                      <SidebarSimple className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Tabs Navigation */}
            <nav className="w-full h-10 mt-4 relative border-b border-border">
              <TabsList className="inline-flex h-full items-center justify-start bg-transparent p-0 gap-0">
                <TabsTrigger
                  value="summary"
                  className={cn(
                    'relative px-2 h-full inline-flex items-center justify-center text-sm transition-colors rounded-none border-0 shadow-none',
                    'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]',
                    'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:after:bg-brand-terracotta',
                    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:text-foreground'
                  )}
                >
                  Summary
                </TabsTrigger>
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
                <TabsTrigger
                  value="runs"
                  className={cn(
                    'relative px-2 h-full inline-flex items-center justify-center text-sm transition-colors rounded-none border-0 shadow-none',
                    'bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]',
                    'data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:after:bg-brand-terracotta',
                    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:text-foreground'
                  )}
                >
                  Runs
                </TabsTrigger>
              </TabsList>
            </nav>
          </div>

          {/* Scrollable Tab Content */}
          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
            {/* Summary Tab */}
            <TabsContent value="summary" className="mt-0 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4 items-stretch">
                <div className="col-span-2 flex flex-col gap-4">
                  <ActiveStagesSection patient={patient} onOpenWorkflow={() => setWorkflowOpen(true)} />
                  <ActiveOrdersCard patientId={patient.id} orders={orders} onSelectOrder={handleSelectOrder} onViewAll={handleViewAllOrders} hideIllustrations={hideOrderIllustrations} />
                </div>
                <div className="flex flex-col gap-4">
                  <EngagementCard phone={patient.phone} />
                  <PayerContactCard insurance={patient.primaryInsurance} />
                  <ReferringProviderCard />
                </div>
              </div>
            </TabsContent>

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
              <div className="flex flex-col gap-4">
                {/* Active Orders */}
                {orders.filter(o => o.status !== 'completed').length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">
                        Active orders
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {orders.filter(o => o.status !== 'completed').length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {orders.filter(o => o.status !== 'completed').map(order => (
                        <OrderCard key={order.id} order={order} onSelect={handleSelectOrder} hideIllustrations={hideOrderIllustrations} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Orders */}
                {orders.filter(o => o.status === 'completed').length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-base font-medium lasso:wght-medium leading-6 text-text-secondary">
                        Completed
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {orders.filter(o => o.status === 'completed').length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {orders.filter(o => o.status === 'completed').map(order => (
                        <OrderCard key={order.id} order={order} onSelect={handleSelectOrder} hideIllustrations={hideOrderIllustrations} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
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

            {/* Runs Tab */}
            <TabsContent value="runs" className="mt-0">
              <RunsSection patient={patient} />
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
                  <span className="text-base font-medium text-text-primary">Patient</span>
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
                  <span className="text-base font-medium text-text-primary">Insurance</span>
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
                  <span className="text-base font-medium text-text-primary">Data</span>
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
