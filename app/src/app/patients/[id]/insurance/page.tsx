'use client';

import { use } from 'react';
import { InsuranceForm } from '@/components/patient/insurance/insurance-form';
import { VerificationHistory } from '@/components/patient/insurance/verification-history';
import type { Insurance } from '@/types/patient';

// Mock data
const mockPrimaryInsurance: Insurance = {
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
};

const mockVerificationHistory = [
  {
    id: '1',
    date: '2026-01-15T10:30:00Z',
    result: 'success' as const,
    runBy: 'Sarah M.',
    notes: 'Active coverage confirmed',
  },
  {
    id: '2',
    date: '2026-01-10T14:15:00Z',
    result: 'failed' as const,
    runBy: 'Mike T.',
    notes: 'Member ID not found - typo in original entry',
  },
];

export default function InsurancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = use(params);
  // TODO: Use _id to fetch insurance from API
  const handleSavePrimary = async (insurance: Insurance) => {
    // TODO: Save to API
    console.log('Saving primary insurance:', insurance);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSaveSecondary = async (insurance: Insurance) => {
    // TODO: Save to API
    console.log('Saving secondary insurance:', insurance);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6">
      <InsuranceForm
        insurance={mockPrimaryInsurance}
        title="Primary Insurance"
        onSave={handleSavePrimary}
      />
      <InsuranceForm
        insurance={undefined}
        title="Secondary Insurance"
        onSave={handleSaveSecondary}
      />
      <VerificationHistory history={mockVerificationHistory} />
    </div>
  );
}
