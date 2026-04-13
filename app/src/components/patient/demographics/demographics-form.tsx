'use client';

import { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import type { Patient } from '@/types/patient';

interface DemographicsFormProps {
  patient: Patient;
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <p className="text-sm text-text-primary">{value || <span className="text-text-tertiary">Not provided</span>}</p>
    </div>
  );
}

function SSNField({ value }: { value: string }) {
  const [revealed, setRevealed] = useState(false);
  const lastFour = value.replace(/\D/g, '').slice(-4);
  const masked = '***-**-****';
  const partial = `***-**-${lastFour}`;

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text-secondary">SSN</label>
      <div className="flex items-center gap-2">
        <p className="text-sm text-text-primary font-mono">{revealed ? partial : masked}</p>
        <button
          onClick={() => setRevealed(!revealed)}
          className="text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
        >
          {revealed ? (
            <EyeSlash weight="regular" className="size-4" />
          ) : (
            <Eye weight="regular" className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export function DemographicsForm({ patient }: DemographicsFormProps) {
  const cardClass = 'bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden';
  const headerClass = 'flex items-center px-4 py-2 border-b border-border-tertiary';
  const titleClass = 'text-base font-medium lasso:wght-medium leading-6 text-foreground';

  return (
    <div className="flex flex-col gap-4">
      {/* Personal Information */}
      <div className={cardClass}>
        <div className={headerClass}>
          <div className={titleClass}>Personal Information</div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="First Name" value={patient.firstName} />
            <Field label="Middle Name" value="Alexander" />
            <Field label="Last Name" value={patient.lastName} />
            <Field label="Date of Birth" value={patient.dob ? new Date(patient.dob).toLocaleDateString() : undefined} />
            <Field label="Gender" value="Male" />
            <Field label="Race" value="White" />
            <Field label="Ethnicity" value="Not Hispanic or Latino" />
            <Field label="Marital Status" value="Married" />
            <Field label="Preferred Language" value="English" />
            <Field label="MRN" value={patient.mrn} />
            <SSNField value="482-36-6789" />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className={cardClass}>
        <div className={headerClass}>
          <div className={titleClass}>Contact Information</div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Primary Phone" value={patient.phone} />
            <div className="md:col-span-2">
              <Field label="Email" value={patient.email} />
            </div>
            <div className="md:col-span-2">
              <Field label="Street" value={patient.address.street} />
            </div>
            <div className="md:col-span-2">
              <Field label="Street 2" />
            </div>
            <Field label="City" value={patient.address.city} />
            <Field label="State" value={patient.address.state} />
            <Field label="ZIP Code" value={patient.address.zip} />
            <Field label="Country" value="United States" />
          </div>
        </div>
      </div>

    </div>
  );
}
