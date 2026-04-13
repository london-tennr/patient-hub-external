'use client';

import { useState } from 'react';
import { X, CaretDown, Clock, FileText } from '@phosphor-icons/react';
import { Sheet, SheetContent, SheetTitle } from '@tennr/lasso/sheet';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import type { Patient, PatientStatus, PatientStage } from '@/types/patient';
import { DocumentFullViewer, type ViewableDocument } from '@/components/patient/documents/document-full-viewer';

interface OrderDetailSheetProps {
  patient: Patient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusBadgeConfig: Record<
  PatientStatus,
  { label: string; variant: 'success' | 'warning' | 'destructive' | 'muted' | 'outline' }
> = {
  on_track: { label: 'On Track', variant: 'success' },
  missing_info: { label: 'Missing Info', variant: 'warning' },
  needs_attention: { label: 'Action Required', variant: 'destructive' },
  blocked: { label: 'Blocked', variant: 'destructive' },
  completed: { label: 'Completed', variant: 'muted' },
  inactive: { label: 'Inactive', variant: 'outline' },
};

const ORDER_STEPS = [
  { id: 'referral_received', label: 'Referral Received' },
  { id: 'insurance_verification', label: 'Payer Verification' },
  { id: 'insurance_policy_review', label: 'Payer Policy Review' },
  { id: 'ready_for_claim', label: 'Ready for Claim Submission' },
] as const;

const stageToCompletedSteps: Record<PatientStage, number> = {
  referral_received: 1,
  intake_review: 1,
  insurance_verification: 2,
  prior_authorization: 2,
  scheduling: 3,
  ready_for_claim: 3,
  claim_submitted: 4,
};

const TABS = ['Order processing', 'Call history', 'Documents', 'Notes'];

function formatDob(dob: string): string {
  const date = new Date(dob + 'T00:00:00');
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function formatReceivedAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Received just now';
  if (diffHours < 24) return `Received ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays === 1) return 'Received yesterday';
  if (diffDays < 7) return `Received ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Received ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Received ${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `Received ${years} ${years === 1 ? 'year' : 'years'} ago`;
}

function formatUpdatedAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Updated just now';
  if (diffHours < 24) return `Updated ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays === 1) return 'Updated yesterday';
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Updated ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `Updated ${months} ${months === 1 ? 'month' : 'months'} ago`;
}

function deriveStepStatuses(patient: Patient): ('completed' | 'current' | 'pending')[] {
  const completedCount = stageToCompletedSteps[patient.stage];
  const hasIssue = ['missing_info', 'needs_attention', 'blocked'].includes(patient.status);

  if (patient.status === 'completed') {
    return ORDER_STEPS.map(() => 'completed');
  }

  return ORDER_STEPS.map((_, i) => {
    if (hasIssue) {
      if (i < completedCount) return 'completed';
      if (i === completedCount) return 'current';
      return 'pending';
    }
    if (i < completedCount) return 'completed';
    if (i === completedCount) return 'current';
    return 'pending';
  });
}

export function OrderDetailSheet({ patient, open, onOpenChange }: OrderDetailSheetProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [viewingDoc, setViewingDoc] = useState<ViewableDocument | null>(null);

  if (!patient) return null;

  const order = patient.order;
  const badgeConfig = statusBadgeConfig[patient.status];
  const stepStatuses = deriveStepStatuses(patient);
  const documents = order?.documents ?? [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-[520px] sm:max-w-[520px] p-0 flex flex-col gap-0 [&>button]:hidden"
      >
        <SheetTitle className="sr-only">
          {patient.firstName} {patient.lastName} — Order Detail
        </SheetTitle>
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div className="flex flex-col gap-0.5" />
          <button
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center size-8 rounded-md hover:bg-bg-secondary transition-colors cursor-pointer"
          >
            <X weight="regular" className="size-5 text-text-secondary" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Order Status / Payer */}
          <div className="flex gap-10 px-6 py-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
                Order Status
              </span>
              <Badge variant={badgeConfig.variant}>{badgeConfig.label}</Badge>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
                Payer
              </span>
              <span className="text-sm text-text-secondary">{order?.payer ?? '—'}</span>
            </div>
          </div>

          {/* Order Section */}
          <div className="px-6 pb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-text-primary">Order</h3>
              <span className="text-sm font-medium text-text-primary">
                {order ? formatReceivedAgo(order.receivedDate) : ''}
              </span>
            </div>

            {/* Order Card */}
            {order && (
              <div className="border border-border-secondary rounded-lg overflow-hidden">
                <div className="flex items-start justify-between p-4 pb-3">
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-sm font-semibold text-text-primary">
                      {order.category}
                    </span>
                    <span className="text-xs text-text-tertiary truncate">
                      External order ID: {order.externalOrderId}
                    </span>
                  </div>
                  <button className="shrink-0 ml-3 mt-0.5 cursor-pointer">
                    <CaretDown weight="regular" className="size-5 text-text-tertiary" />
                  </button>
                </div>
                <div className="border-t border-border-secondary mx-4" />
                <div className="p-4 pt-3">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Referred by {order.referredBy}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 px-6 border-b border-border-secondary">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'relative pb-3 text-sm transition-colors cursor-pointer whitespace-nowrap',
                  i === activeTab
                    ? 'font-semibold text-text-primary'
                    : 'text-text-tertiary hover:text-text-secondary'
                )}
              >
                {tab}
                {i === activeTab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-terracotta rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Order Processing — Horizontal Stepper */}
          {activeTab === 0 && (
            <div className="px-6 py-6 flex flex-col gap-6">
              {/* Stepper */}
              <div className="grid grid-cols-4 gap-3">
                {ORDER_STEPS.map((step, i) => {
                  const status = stepStatuses[i];
                  const isCompleted = status === 'completed';
                  const isCurrent = status === 'current';

                  return (
                    <div key={step.id} className="flex flex-col gap-2">
                      {/* Progress bar */}
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
                      {/* Label */}
                      <span
                        className={cn(
                          'text-xs leading-tight',
                          isCompleted
                            ? 'text-text-primary font-medium'
                            : isCurrent
                              ? 'text-text-secondary'
                              : 'text-text-tertiary'
                        )}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Updated ago */}
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <Clock weight="regular" className="size-4" />
                  <span className="text-sm font-medium">
                    {order ? formatUpdatedAgo(order.receivedDate) : 'Updated recently'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Documents tab */}
          {activeTab === 2 && (
            <div className="px-6 py-5 flex flex-col gap-2">
              {documents.length === 0 ? (
                <div className="py-12 text-center text-sm text-text-tertiary">
                  No documents yet
                </div>
              ) : (
                documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setViewingDoc(doc)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border-secondary hover:bg-bg-secondary transition-colors text-left cursor-pointer group"
                  >
                    <FileText
                      weight="regular"
                      className="size-5 text-text-tertiary group-hover:text-text-secondary shrink-0"
                    />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-medium text-text-primary truncate">
                        {doc.name}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {doc.pages} {doc.pages === 1 ? 'page' : 'pages'}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 0 && activeTab !== 2 && (
            <div className="px-6 py-12 text-center text-sm text-text-tertiary">
              No {TABS[activeTab]?.toLowerCase()} yet
            </div>
          )}
        </div>

        {/* Full-page document viewer */}
        {viewingDoc && (
          <DocumentFullViewer
            patient={patient}
            document={viewingDoc}
            documents={documents}
            onClose={() => setViewingDoc(null)}
            onSelectDocument={setViewingDoc}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
