'use client';

import { Copy, Check } from '@phosphor-icons/react';
import { useState } from 'react';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { cn } from '@tennr/lasso/utils/cn';
import type { Insurance } from '@/types/patient';

interface PayerContactCardProps {
  insurance?: Insurance;
}

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-start justify-between py-2">
      <span className="text-sm text-text-secondary">{label}</span>
      <span
        onClick={handleCopy}
        className="relative inline-flex items-center text-sm font-medium lasso:wght-medium text-text-primary cursor-pointer group hover:text-text-primary transition-colors"
      >
        {value}
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
    </div>
  );
}

const statusVariant: Record<Insurance['status'], 'success' | 'warning' | 'outline'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'outline',
};

export function PayerContactCard({ insurance }: PayerContactCardProps) {
  if (!insurance) {
    return (
      <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">
            Payer Contact
          </p>
        </div>
        <div className="px-4 py-3 border-t border-border-secondary">
          <p className="text-sm text-text-secondary">No insurance on file</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">
          Payer Contact
        </p>
        <Badge variant={statusVariant[insurance.status]} className="text-xs capitalize">
          {insurance.status}
        </Badge>
      </div>

      {/* Details */}
      <div className="px-4 border-t border-border-secondary divide-y divide-border-secondary">
        <CopyableField label="Carrier" value={insurance.carrier} />
        <CopyableField label="Plan" value={insurance.plan} />
        <CopyableField label="Member ID" value={insurance.memberId} />
        <CopyableField label="Group #" value={insurance.groupNumber} />
        <CopyableField label="Policy Holder" value={insurance.policyHolder} />
        <CopyableField label="Relationship" value={insurance.relationship} />
        {insurance.effectiveDate && (
          <CopyableField
            label="Effective Date"
            value={new Date(insurance.effectiveDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
          />
        )}
        {insurance.lastVerified && (
          <div className="flex items-start justify-between py-2">
            <span className="text-sm text-text-secondary">Last Verified</span>
            <span className="text-sm text-text-primary">
              {new Date(insurance.lastVerified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end px-4 py-2.5 border-t border-border-tertiary">
        <Button variant="outline" size="sm">
          Contact Payer
        </Button>
      </div>
    </div>
  );
}
