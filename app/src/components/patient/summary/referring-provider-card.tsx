'use client';

import { Copy, Check } from '@phosphor-icons/react';
import { useState } from 'react';
import { cn } from '@tennr/lasso/utils/cn';

interface ReferringProvider {
  name: string;
  npi: string;
  specialty: string;
  facility: string;
  phone: string;
  fax: string;
  address: string;
}

interface ReferringProviderCardProps {
  provider: ReferringProvider;
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
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[13px] text-text-tertiary">{label}</span>
      <span
        onClick={handleCopy}
        className="relative inline-flex items-center text-[13px] font-medium lasso:wght-medium text-text-primary cursor-pointer group hover:text-text-primary transition-colors"
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

const mockProvider: ReferringProvider = {
  name: 'Dr. Sarah Chen',
  npi: '1234567890',
  specialty: 'Internal Medicine',
  facility: 'Pacific Northwest Medical Group',
  phone: '(503) 555-0142',
  fax: '(503) 555-0143',
  address: '1200 NW Marshall St, Portland, OR 97209',
};

export function ReferringProviderCard({ provider = mockProvider }: Partial<ReferringProviderCardProps>) {
  const p = provider ?? mockProvider;

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-sm font-medium lasso:wght-medium text-text-primary">
          Referring Provider
        </p>
      </div>

      {/* Provider Details */}
      <div className="px-4 border-t border-border-tertiary pt-1.5 pb-2">
        <CopyableField label="Provider" value={p.name} />
        <CopyableField label="NPI" value={p.npi} />
        <CopyableField label="Specialty" value={p.specialty} />
        <CopyableField label="Facility" value={p.facility} />
        <CopyableField label="Phone" value={p.phone} />
        <CopyableField label="Fax" value={p.fax} />
        <CopyableField label="Address" value={p.address} />
      </div>
    </div>
  );
}
