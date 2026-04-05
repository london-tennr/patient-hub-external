'use client';

import { Badge } from '@tennr/lasso/badge';
import { CheckCircle, Clock, XCircle } from '@phosphor-icons/react';
import type { Insurance } from '@/types/patient';

interface InsuranceFormProps {
  insurance: Insurance | undefined;
  title: string;
}

const statusConfig = {
  verified: { icon: CheckCircle, variant: 'default' as const, label: 'Verified' },
  pending: { icon: Clock, variant: 'secondary' as const, label: 'Pending' },
  failed: { icon: XCircle, variant: 'destructive' as const, label: 'Failed' },
};

export function InsuranceForm({ insurance, title }: InsuranceFormProps) {
  if (!insurance) {
    return (
      <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-tertiary">
          <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">{title}</div>
        </div>
        <div className="p-4">
          <p className="text-sm text-text-secondary">No insurance on file</p>
        </div>
      </div>
    );
  }

  const status = statusConfig[insurance.eligibilityStatus];
  const StatusIcon = status.icon;

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-tertiary">
        <div className="flex items-center gap-2">
          <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">{title}</div>
          <Badge variant={status.variant}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Carrier</label>
            <p className="text-sm">{insurance.carrier}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Plan</label>
            <p className="text-sm">{insurance.plan}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Member ID</label>
            <p className="text-sm">{insurance.memberId}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Group Number</label>
            <p className="text-sm">{insurance.groupNumber}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Policy Holder</label>
            <p className="text-sm">{insurance.policyHolder}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Relationship</label>
            <p className="text-sm capitalize">{insurance.relationship}</p>
          </div>
        </div>
        {insurance.lastVerified && (
          <p className="text-xs text-text-tertiary mt-4">
            Last verified: {new Date(insurance.lastVerified).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
