'use client';

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
            <Field label="SSN" value="***-**-6789" />
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
            <Field label="Secondary Phone" />
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

      {/* Emergency Contact */}
      <div className={cardClass}>
        <div className={headerClass}>
          <div className={titleClass}>Emergency Contact</div>
        </div>
        <div className="p-4">
          {!patient.emergencyContact?.name && !patient.emergencyContact?.phone && !patient.emergencyContact?.relationship ? (
            <p className="text-sm text-text-tertiary">No emergency contact on file</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Name" value={patient.emergencyContact?.name} />
              <Field label="Phone" value={patient.emergencyContact?.phone} />
              <Field label="Relationship" value={patient.emergencyContact?.relationship} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
