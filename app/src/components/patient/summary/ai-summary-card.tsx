'use client';

import { Sparkle, ArrowRight } from '@phosphor-icons/react';
import type { Patient, PatientStage } from '@/types/patient';
import type { Order } from '@/types/order';
import { PatientStatusCard } from '@/components/patient/patient-status-badge';

interface AiSummaryCardProps {
  patient: Patient;
  orders: Order[];
}

const stageLabels: Record<PatientStage, string> = {
  referral_received: 'Referral Received',
  intake_review: 'Intake Review',
  insurance_verification: 'Payer Verification',
  prior_authorization: 'Prior Authorization',
  scheduling: 'Scheduling',
  ready_for_claim: 'Ready for Claim',
  claim_submitted: 'Claim Submitted',
};

interface SummaryResult {
  sentiment: 'good' | 'warning' | 'critical';
  headline: string;
  body: string;
  nextSteps: string[];
}

function generateSummary(patient: Patient, orders: Order[]): SummaryResult {
  const activeOrders = orders.filter(o => o.status !== 'completed');
  const blockedOrders = orders.filter(o => o.status === 'missing_info' || o.status === 'rejected');
  const stageLabel = stageLabels[patient.stage];

  // Critical: patient is blocked
  if (patient.status === 'blocked') {
    return {
      sentiment: 'critical',
      headline: `Patient is blocked at ${stageLabel}`,
      body: `This patient has been stuck at the ${stageLabel} stage and requires immediate intervention. ${blockedOrders.length > 0 ? `${blockedOrders.length} order${blockedOrders.length > 1 ? 's' : ''} also need${blockedOrders.length === 1 ? 's' : ''} attention.` : ''}`,
      nextSteps: [
        `Resolve the blocker at ${stageLabel} to move the patient forward`,
        ...blockedOrders.map(o => `${o.orderName}: ${o.status === 'rejected' ? 'Review rejection reason and resubmit' : 'Provide missing documentation'}`),
        'Contact the patient or provider if additional information is needed',
      ],
    };
  }

  // Warning: needs attention or missing info
  if (patient.status === 'needs_attention' || patient.status === 'missing_info') {
    const missingInfoOrders = orders.filter(o => o.status === 'missing_info');
    return {
      sentiment: 'warning',
      headline: `Action required — ${stageLabel}`,
      body: `Patient is currently at ${stageLabel} and is ready for review. ${missingInfoOrders.length > 0 ? `${missingInfoOrders.length} order${missingInfoOrders.length > 1 ? 's are' : ' is'} missing information that needs to be resolved before proceeding.` : 'Review the current stage to identify what is needed to move forward.'}`,
      nextSteps: [
        ...missingInfoOrders.map(o => `${o.orderName} (${o.externalOrderId}): Provide missing info to continue ${o.stage} stage`),
        missingInfoOrders.length === 0 ? `Review ${stageLabel} requirements and resolve outstanding items` : '',
        'Follow up with referring provider if documentation is pending',
        activeOrders.length > missingInfoOrders.length ? `${activeOrders.length - missingInfoOrders.length} other order${activeOrders.length - missingInfoOrders.length > 1 ? 's are' : ' is'} progressing normally` : '',
      ].filter(Boolean),
    };
  }

  // Completed
  if (patient.status === 'completed' || patient.status === 'inactive') {
    return {
      sentiment: 'good',
      headline: patient.status === 'completed' ? 'All stages completed' : 'Patient is inactive',
      body: patient.status === 'completed'
        ? `All workflow stages have been completed for this patient. ${orders.filter(o => o.status === 'completed').length} of ${orders.length} orders are fulfilled.`
        : 'This patient is currently marked as inactive. No further action is required unless reactivation is needed.',
      nextSteps: patient.status === 'completed'
        ? ['Verify all claims have been submitted and accepted', 'Confirm delivery/fulfillment of all orders']
        : ['Review if patient needs to be reactivated', 'Check if there are pending referrals'],
    };
  }

  // On track — everything good
  return {
    sentiment: 'good',
    headline: 'Patient is progressing normally',
    body: `Currently at ${stageLabel} with ${activeOrders.length} active order${activeOrders.length !== 1 ? 's' : ''}. ${blockedOrders.length === 0 ? 'All orders are on track with no blockers.' : `${blockedOrders.length} order${blockedOrders.length > 1 ? 's' : ''} may need attention soon.`}`,
    nextSteps: blockedOrders.length > 0
      ? blockedOrders.map(o => `${o.orderName}: ${o.status === 'rejected' ? 'Review rejection' : 'Provide missing info'}`)
      : [
          `Continue monitoring ${stageLabel} progression`,
          activeOrders.length > 0 ? `Track ${activeOrders.length} active order${activeOrders.length > 1 ? 's' : ''} through completion` : 'No active orders to track',
        ],
  };
}

export function AiSummaryCard({ patient, orders }: AiSummaryCardProps) {
  const summary = generateSummary(patient, orders);

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2">
        <Sparkle weight="duotone" className="size-4 text-text-ai-primary" />
        <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">AI Summary</p>
        <span className="text-[11px] text-text-tertiary">Auto-generated</span>
      </div>

      {/* Summary content */}
      <div className="border-t border-border-tertiary px-4 pt-3 pb-3">
        {/* Status card */}
        <PatientStatusCard status={patient.status} />

        {/* AI context */}
        <div className="mt-3 rounded-md bg-bg-secondary px-3 py-2.5">
          <p className="text-[13px] font-medium lasso:wght-medium text-text-primary leading-5">
            {summary.headline}
          </p>
          <p className="text-[12px] text-text-secondary leading-[18px] mt-0.5">
            {summary.body}
          </p>
        </div>

        {/* Next steps */}
        {summary.nextSteps.length > 0 && (
          <div className="mt-3">
            <p className="text-[11px] font-medium lasso:wght-medium text-text-tertiary uppercase tracking-wider mb-1.5">
              Recommended next steps
            </p>
            <div className="flex flex-col gap-1">
              {summary.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-2 py-1">
                  <ArrowRight weight="bold" className="size-3 text-text-tertiary shrink-0 mt-0.5" />
                  <span className="text-[13px] text-text-primary leading-[18px]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
