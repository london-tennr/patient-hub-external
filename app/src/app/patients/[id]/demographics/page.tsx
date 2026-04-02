'use client';

import { use } from 'react';
import { DemographicsForm } from '@/components/patient/demographics/demographics-form';
import type { Patient } from '@/types/patient';

const mockPatient: Patient = {
  id: '1',
  patientId: '593107',
  mrn: 'MRN001',
  firstName: 'John',
  lastName: 'Smith',
  dob: '1965-04-22',
  phone: '(555) 555-5555',
  email: 'john.smith@example.com',
  address: {
    street: '42 Abbey Road',
    city: 'Liverpool',
    state: 'NY',
    zip: '10001',
  },
  deliveryAddress: {
    street: '12 Maple Lane',
    city: 'Syracuse',
    state: 'NY',
    zip: '13210',
  },
  primaryInsurance: {
    carrier: 'BlueCross BlueShield',
    plan: 'PPO',
    memberId: 'XYA123456789',
    groupNumber: 'GRP001',
    policyHolder: 'John Smith',
    relationship: 'self',
    eligibilityStatus: 'verified',
    effectiveDate: '2025-11-25',
    status: 'active',
    lastVerified: '2026-01-15',
  },
  status: 'on_track',
  priority: 'p3',
  stage: 'insurance_verification',
  tennrStatus: 'processing',
  syncStatus: { ehrSystem: 'BrightTree', lastSynced: '2026-01-21T09:15:00Z' },
};

export default function DemographicsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = use(params);
  // TODO: Use _id to fetch patient demographics from API
  const handleSave = async (data: Partial<Patient>) => {
    // TODO: Save to API and sync to EHR
    console.log('Saving demographics:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return <DemographicsForm patient={mockPatient} onSave={handleSave} />;
}
