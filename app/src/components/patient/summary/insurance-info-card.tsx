'use client';

import type { Patient, Insurance } from '@/types/patient';

interface InsuranceInfoCardProps {
  patient: Patient;
  onEdit?: () => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-xs font-medium text-[#7a766d] uppercase ${className || ''}`}>
      {children}
    </p>
  );
}

function InsuranceSection({
  title,
  insurance,
}: {
  title: 'PRIMARY' | 'SECONDARY';
  insurance: Insurance;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Carrier Info */}
      <div className="flex flex-col gap-2">
        <SectionLabel>{title}</SectionLabel>
        <div className="flex flex-col">
          <p className="text-sm text-[#232018]">{insurance.carrier}</p>
          <p className="text-sm text-[#636056]">{insurance.plan}</p>
        </div>
      </div>

      {/* Policy Info */}
      <div className="flex flex-col gap-2">
        <SectionLabel>Policy Info</SectionLabel>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <span className="text-sm text-[#636056]">Member ID</span>
            <span className="text-sm text-[#232018] text-right">{insurance.memberId}</span>
          </div>
          {insurance.effectiveDate && (
            <div className="flex justify-between items-start">
              <span className="text-sm text-[#636056]">Effective Date</span>
              <span className="text-sm text-[#232018] text-right">{formatDate(insurance.effectiveDate)}</span>
            </div>
          )}
          <div className="flex justify-between items-start">
            <span className="text-sm text-[#636056]">Status</span>
            <span
              className={`text-xs font-regular px-2 py-[2px] rounded-full ${
                insurance.status === 'active'
                  ? 'bg-[#d6f1df] text-[#18794e]'
                  : 'bg-[#f5f3ef] text-[#636056]'
              }`}
            >
              {insurance.status.charAt(0).toUpperCase() + insurance.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InsuranceInfoCard({ patient, onEdit }: InsuranceInfoCardProps) {
  const hasInsurance = patient.primaryInsurance || patient.secondaryInsurance;

  return (
    <div className="bg-white border border-[#efede9] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#efede9]">
        <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">Insurance</div>
        <button
          onClick={onEdit}
          className="text-xs text-[#232018] hover:underline"
        >
          Edit
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {!hasInsurance ? (
          <p className="text-sm text-[#636056]">No insurance on file</p>
        ) : (
          <div className="flex flex-col">
            {patient.primaryInsurance && (
              <InsuranceSection title="PRIMARY" insurance={patient.primaryInsurance} />
            )}
            
            {patient.primaryInsurance && patient.secondaryInsurance && (
              <div className="h-px bg-[#efede9] my-4" />
            )}

            {patient.secondaryInsurance && (
              <InsuranceSection title="SECONDARY" insurance={patient.secondaryInsurance} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
