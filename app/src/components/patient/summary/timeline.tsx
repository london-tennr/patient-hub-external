'use client';

import { useState } from 'react';
import { Heartbeat, FolderOpen, FileText, CheckCircle, ShieldCheck, Clock, Hash, ArrowSquareOut } from '@phosphor-icons/react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@tennr/lasso/sheet';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';

interface TimelineActivity {
  id: string;
  type: 'verification' | 'document' | 'referral' | 'order_complete' | 'prior_auth' | 'comment';
  title: string;
  description?: string;
  orderId?: string;
  author?: {
    name: string;
    initials: string;
  };
  timestamp: string;
}

interface TimelineProps {
  activities: TimelineActivity[];
  onAddComment?: (comment: string) => void;
  className?: string;
}

const activityIcon: Record<TimelineActivity['type'], React.ReactNode> = {
  verification: <Heartbeat weight="regular" className="size-4 text-text-tertiary" />,
  document: <FolderOpen weight="regular" className="size-4 text-text-tertiary" />,
  referral: <FileText weight="regular" className="size-4 text-text-tertiary" />,
  order_complete: <CheckCircle weight="regular" className="size-4 text-text-tertiary" />,
  prior_auth: <ShieldCheck weight="regular" className="size-4 text-text-tertiary" />,
  comment: <FileText weight="regular" className="size-4 text-text-tertiary" />,
};

const activityDrawerIcon: Record<TimelineActivity['type'], React.ReactNode> = {
  verification: <Heartbeat weight="regular" className="size-5 text-text-tertiary" />,
  document: <FolderOpen weight="regular" className="size-5 text-text-tertiary" />,
  referral: <FileText weight="regular" className="size-5 text-text-tertiary" />,
  order_complete: <CheckCircle weight="regular" className="size-5 text-text-success-primary" />,
  prior_auth: <ShieldCheck weight="regular" className="size-5 text-text-tertiary" />,
  comment: <FileText weight="regular" className="size-5 text-text-tertiary" />,
};

const activityTypeLabel: Record<TimelineActivity['type'], string> = {
  verification: 'Insurance Verification',
  document: 'Document Upload',
  referral: 'Referral',
  order_complete: 'Order Completion',
  prior_auth: 'Prior Authorization',
  comment: 'Comment',
};

const activityTypeBadgeVariant: Record<TimelineActivity['type'], 'success' | 'warning' | 'outline' | 'default'> = {
  verification: 'warning',
  document: 'outline',
  referral: 'outline',
  order_complete: 'success',
  prior_auth: 'default',
  comment: 'outline',
};

interface DetailField {
  label: string;
  value: string;
  href?: string;
}

const activityDetails: Record<TimelineActivity['type'], { description: string; fields: DetailField[] }> = {
  verification: {
    description: 'An automated insurance verification check was initiated to confirm patient eligibility and benefits coverage with the carrier on file.',
    fields: [
      { label: 'Carrier', value: 'Aetna', href: 'https://ehr.example.com/payers/aetna' },
      { label: 'Plan Type', value: 'PPO' },
      { label: 'Verification Method', value: 'Electronic (270/271)' },
      { label: 'Initiated By', value: 'System — Auto Trigger' },
    ],
  },
  document: {
    description: 'A document was uploaded and attached to the patient record. The document has been processed and is available for review.',
    fields: [
      { label: 'Document Type', value: 'Insurance Card' },
      { label: 'Uploaded By', value: 'Patient Portal' },
      { label: 'File Format', value: 'PDF' },
      { label: 'Pages', value: '2' },
    ],
  },
  referral: {
    description: 'A referral was received from an external provider. The referral has been matched to the patient record and linked to the relevant order.',
    fields: [
      { label: 'Referring Provider', value: 'PresNow Urgent Care' },
      { label: 'Provider NPI', value: '1234567890' },
      { label: 'Referral Type', value: 'DME Referral' },
      { label: 'Received Via', value: 'eFax' },
    ],
  },
  order_complete: {
    description: 'The order has been fully processed and a claim has been submitted to the payer for reimbursement.',
    fields: [
      { label: 'Claim Number', value: 'CLM-2026-04821' },
      { label: 'Submitted To', value: 'Aetna', href: 'https://ehr.example.com/payers/aetna' },
      { label: 'Total Billed', value: '$1,247.00' },
      { label: 'Expected Reimbursement', value: '$998.40' },
    ],
  },
  prior_auth: {
    description: 'A prior authorization request was processed with the insurance carrier. This step is required before the order can proceed to fulfillment.',
    fields: [
      { label: 'Auth Number', value: 'PA-2026-38291' },
      { label: 'Carrier', value: 'Aetna', href: 'https://ehr.example.com/payers/aetna' },
      { label: 'Decision', value: 'Approved' },
      { label: 'Valid Through', value: '07/01/2026' },
    ],
  },
  comment: {
    description: 'A comment was added to the patient record.',
    fields: [],
  },
};

function ActivityDetailDrawer({ activity, open, onClose }: { activity: TimelineActivity | null; open: boolean; onClose: () => void }) {
  if (!activity) return null;

  const details = activityDetails[activity.type];
  const typeLabel = activityTypeLabel[activity.type];
  const badgeVariant = activityTypeBadgeVariant[activity.type];

  const formatFullTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Sheet open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <SheetContent className="w-[440px] sm:w-[440px] p-0 overflow-y-auto">
        {/* Hero */}
        <div className="bg-bg-secondary px-6 pt-6 pb-5">
          <SheetHeader className="p-0">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full border border-border-secondary flex items-center justify-center bg-bg-white">
                {activityDrawerIcon[activity.type]}
              </div>
              <div className="flex flex-col gap-0.5">
                <SheetTitle className="text-lg leading-tight">{activity.title}</SheetTitle>
                <Badge variant={badgeVariant} className="w-fit">{typeLabel}</Badge>
              </div>
            </div>
          </SheetHeader>
        </div>

        {/* Details */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Timestamp & Order */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Clock weight="regular" className="size-3.5 text-text-tertiary" />
                <span className="text-xs text-text-tertiary uppercase tracking-wide">Date & Time</span>
              </div>
              <span className="text-sm text-text-primary">{formatFullTimestamp(activity.timestamp)}</span>
            </div>
            {activity.orderId && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Hash weight="regular" className="size-3.5 text-text-tertiary" />
                  <span className="text-xs text-text-tertiary uppercase tracking-wide">Order</span>
                </div>
                <span className="text-sm text-text-primary font-mono">{activity.orderId}</span>
              </div>
            )}
          </div>

          <div className="border-t border-border-secondary" />

          {/* Description */}
          <div>
            <span className="text-xs text-text-tertiary uppercase tracking-wide">Description</span>
            <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{details.description}</p>
          </div>

          {/* Detail fields */}
          {details.fields.length > 0 && (
            <>
              <div className="border-t border-border-secondary" />
              <div>
                <span className="text-xs text-text-tertiary uppercase tracking-wide">Details</span>
                <div className="mt-2 bg-bg-secondary rounded-md border border-border-secondary">
                  {details.fields.map((field, i) => (
                    <div key={field.label} className={cn(
                      "flex items-center justify-between px-3 py-2.5",
                      i > 0 && "border-t border-border-secondary"
                    )}>
                      <span className="text-sm text-text-secondary">{field.label}</span>
                      {field.href ? (
                        <a
                          href={field.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium lasso:wght-medium text-text-info-primary hover:underline"
                        >
                          {field.value}
                          <ArrowSquareOut weight="regular" className="size-3.5" />
                        </a>
                      ) : (
                        <span className="text-sm font-medium lasso:wght-medium text-text-primary">{field.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Timeline({ activities, className }: TimelineProps) {
  const [selectedActivity, setSelectedActivity] = useState<TimelineActivity | null>(null);

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <>
      <div className={cn("bg-white border border-[#efede9] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col", className)}>
        {/* Header */}
        <div className="px-4 py-2 shrink-0">
          <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">Patient Activity Timeline</div>
        </div>

        {/* Timeline Events */}
        <div className="flex flex-col border-t border-border-tertiary pt-3.5 pb-3.5 overflow-y-auto min-h-0">
          {activities.map((activity, index) => {
            const isLast = index === activities.length - 1;

            return (
              <button
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
                className="flex gap-3 px-4 text-left hover:bg-bg-primary-hover transition-colors cursor-pointer"
              >
                {/* Icon Column with Connector Line */}
                <div className="flex flex-col items-center w-8 shrink-0">
                  <div className="size-8 rounded-full border border-border-secondary flex items-center justify-center bg-bg-white">
                    {activityIcon[activity.type]}
                  </div>
                  {!isLast && (
                    <div className="w-px bg-border-secondary mt-1 mb-1 min-h-[12px] flex-1" />
                  )}
                </div>

                {/* Content */}
                <div className={cn(
                  "flex flex-col gap-0.5 w-full",
                  !isLast && "pb-5"
                )}>
                  <span className="text-sm font-medium lasso:wght-medium text-text-primary">
                    {activity.title}
                  </span>
                  <span className="text-xs text-text-tertiary">
                    {formatTimestamp(activity.timestamp)}
                    {activity.orderId && (
                      <> &middot; <span className="font-mono">{activity.orderId}</span></>
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ActivityDetailDrawer
        activity={selectedActivity}
        open={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </>
  );
}
