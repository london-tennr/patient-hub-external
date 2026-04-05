'use client';

import { useState } from 'react';
import { cn } from '@tennr/lasso/utils/cn';
import { Popover, PopoverContent, PopoverTrigger } from '@tennr/lasso/popover';
import type { PatientStatus, PatientStage } from '@/types/patient';

const stageLabels: Record<PatientStage, string> = {
  referral_received: 'Referral Received',
  intake_review: 'Intake Review',
  insurance_verification: 'Insurance Verification',
  prior_authorization: 'Prior Authorization',
  scheduling: 'Scheduling',
  ready_for_claim: 'Ready for Claim',
  claim_submitted: 'Claim Submitted',
};

interface StatusConfig {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  color: {
    bg: string;
    border: string;
    dot: string;
    text: string;
    badge: string;
    icon: string;
    pulse: string;
  };
  icon: React.ReactNode;
  cta: string | null;
}

const statusConfigs: StatusConfig[] = [
  {
    id: 'active',
    label: 'Processing',
    sublabel: 'Tennr is working on this',
    description: 'Tennr is processing this patient automatically. No action needed.',
    color: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      dot: 'bg-blue-500',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700',
      icon: 'text-blue-500',
      pulse: 'bg-blue-400',
    },
    icon: (
      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
    ),
    cta: null,
  },
  {
    id: 'action',
    label: 'Ready for Review',
    sublabel: 'Your input is required',
    description: 'This patient is ready for your review before Tennr can continue.',
    color: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      text: 'text-amber-700',
      badge: 'bg-amber-100 text-amber-700',
      icon: 'text-amber-500',
      pulse: 'bg-amber-400',
    },
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
    ),
    cta: 'Complete workflow →',
  },
  {
    id: 'error',
    label: 'Platform Issue',
    sublabel: 'Tennr is on it',
    description: "Tennr is aware of this issue and is actively working on a fix. No action needed on your end.",
    color: {
      bg: 'bg-neutral-50',
      border: 'border-neutral-200',
      dot: 'bg-neutral-400',
      text: 'text-neutral-600',
      badge: 'bg-neutral-100 text-neutral-600',
      icon: 'text-neutral-400',
      pulse: 'bg-neutral-300',
    },
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round"/>
        <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round"/>
      </svg>
    ),
    cta: null,
  },
  {
    id: 'complete',
    label: 'Completed',
    sublabel: 'All done',
    description: "This patient's case has been fully processed and closed.",
    color: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      text: 'text-emerald-700',
      badge: 'bg-emerald-100 text-emerald-700',
      icon: 'text-emerald-500',
      pulse: 'bg-emerald-400',
    },
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
      </svg>
    ),
    cta: null,
  },
];

/** Map PatientStatus to the status config id */
function getStatusConfigId(status: PatientStatus): string {
  switch (status) {
    case 'on_track':
      return 'active';
    case 'missing_info':
    case 'needs_attention':
      return 'action';
    case 'blocked':
      return 'error';
    case 'completed':
    case 'inactive':
      return 'complete';
  }
}

export function getStatusConfig(status: PatientStatus): StatusConfig {
  const id = getStatusConfigId(status);
  return statusConfigs.find(s => s.id === id)!;
}

/** Inline badge for table rows — with rich popover for action/error/processing states */
export function PatientStatusBadge({ status, stage, onOpenWorkflow }: { status: PatientStatus; stage?: PatientStage; onOpenWorkflow?: () => void }) {
  const s = getStatusConfig(status);
  const id = getStatusConfigId(status);
  const [open, setOpen] = useState(false);

  const badge = (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-default', s.color.badge)}>
      <span className={s.color.icon}>{s.icon}</span>
      {s.label}
    </span>
  );

  // Processing — popover showing current workflow step
  if (id === 'active' && stage) {
    const stepLabel = stageLabels[stage] ?? stage;
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="cursor-pointer"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {badge}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="w-[260px] p-0"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="px-3.5 pt-3 pb-3">
            <p className="text-sm font-semibold text-text-primary">Processing</p>
            <p className="text-xs text-text-secondary mt-1">
              Tennr is currently working on <span className="font-medium text-text-primary">{stepLabel}</span> for this patient.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Action needed — popover with "Open workflow" button
  if (id === 'action') {
    const actionBadge = (
      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-default', s.color.badge)}>
        <span className="relative flex size-2.5 items-center justify-center">
          <span className="absolute inline-flex size-2.5 rounded-full bg-amber-400 opacity-50 animate-ping" />
          <span className="relative inline-flex size-[7px] rounded-full bg-amber-500" />
        </span>
        {s.label}
      </span>
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="cursor-pointer"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {actionBadge}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="w-[260px] p-0"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="px-3.5 pt-3 pb-2">
            <p className="text-sm font-semibold text-text-primary">Ready for review</p>
            <p className="text-xs text-text-secondary mt-1">
              This patient is ready for your review before Tennr can continue processing.
            </p>
          </div>
          <div className="border-t border-border-secondary px-3.5 py-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onOpenWorkflow?.();
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-text-primary hover:text-text-secondary transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Open workflow
            </button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Platform issue — gray badge with popover reassuring user
  if (id === 'error') {
    const grayBadge = (
      <span className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-default',
        'bg-neutral-100 text-neutral-600',
      )}>
        <span className="text-neutral-500">{s.icon}</span>
        {s.label}
      </span>
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="cursor-pointer"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {grayBadge}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="w-[260px] p-0"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="px-3.5 pt-3 pb-3">
            <p className="text-sm font-semibold text-text-primary">Platform issue</p>
            <p className="text-xs text-text-secondary mt-1">
              Tennr is aware of this issue and is actively working on a fix. No action needed on your end.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Completed — gray by default, green on row hover
  if (id === 'complete') {
    return (
      <span className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-default transition-colors',
        'bg-neutral-100 text-neutral-600',
        'group-hover/row:bg-emerald-100 group-hover/row:text-emerald-700',
      )}>
        <span className="text-neutral-500 group-hover/row:text-emerald-500 transition-colors">{s.icon}</span>
        {s.label}
      </span>
    );
  }

  return badge;
}

/** Dot indicator with optional pulse animation */
export function PatientDotIndicator({ status }: { status: PatientStatus }) {
  const s = getStatusConfig(status);
  const id = getStatusConfigId(status);
  const shouldPulse = id === 'active' || id === 'action';

  return (
    <span className="relative flex h-2.5 w-2.5">
      {shouldPulse && (
        <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-60', s.color.pulse)} />
      )}
      <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', s.color.dot)} />
    </span>
  );
}

/** Status card for detail/overview views */
export function PatientStatusCard({ status }: { status: PatientStatus }) {
  const s = getStatusConfig(status);

  return (
    <div className={cn('rounded-xl border p-4', s.color.bg, s.color.border)}>
      <div className="flex items-start gap-3">
        <div className={cn('mt-0.5 p-2 rounded-lg bg-white/60', s.color.icon)}>
          {s.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={cn('text-sm font-semibold', s.color.text)}>{s.label}</p>
          </div>
          <p className={cn('text-xs mt-0.5 opacity-80', s.color.text)}>{s.description}</p>
          {s.cta && (
            <button className={cn('mt-2 text-xs font-medium underline underline-offset-2 cursor-pointer', s.color.text)}>
              {s.cta}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
