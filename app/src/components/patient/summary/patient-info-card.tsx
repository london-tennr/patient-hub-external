'use client';

import Link from 'next/link';
import type { Patient, Address } from '@/types/patient';

interface PatientInfoCardProps {
  patient: Patient;
}

function formatAddress(address: Address): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium text-[#7a766d] uppercase mb-2">
      {children}
    </p>
  );
}

function ValueText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-[#232018] ${className || ''}`}>
      {children}
    </p>
  );
}

export function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <div className="bg-white border border-[#efede9] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#efede9]">
        <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">Patient</div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Top Section */}
        <div className="flex flex-col gap-4">
          {/* Contact */}
          <div>
            <SectionLabel>Contact</SectionLabel>
            <div className="flex flex-col gap-2">
              <Link
                href={`mailto:${patient.email}`}
                className="text-sm text-[#9b4e45] hover:underline"
              >
                {patient.email}
              </Link>
              <ValueText>{patient.phone}</ValueText>
            </div>
          </div>

          {/* Primary Address */}
          <div>
            <SectionLabel>Primary Address</SectionLabel>
            <ValueText>{formatAddress(patient.address)}</ValueText>
          </div>

          {/* Delivery Address */}
          {patient.deliveryAddress && (
            <div>
              <SectionLabel>Delivery Address</SectionLabel>
              <ValueText>{formatAddress(patient.deliveryAddress)}</ValueText>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#efede9] my-4" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          {/* DOB */}
          <div>
            <SectionLabel>DOB</SectionLabel>
            <ValueText>{formatDate(patient.dob)}</ValueText>
          </div>

          {/* Patient ID */}
          <div>
            <SectionLabel>Patient ID</SectionLabel>
            <ValueText>{patient.patientId}</ValueText>
          </div>
        </div>
      </div>
    </div>
  );
}
