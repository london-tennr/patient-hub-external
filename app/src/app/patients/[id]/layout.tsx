'use client';

import { ReactNode, use, useEffect, useState, useCallback } from 'react';
import { PatientSummaryVariantB } from '@/components/patient/summary/patient-summary-variant-b';
import { useAppShell } from '@/components/shell/app-shell';
import type { Patient } from '@/types/patient';
import type { Order, OrderDocument } from '@/types/order';

// Mock patient for development
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
  secondaryInsurance: {
    carrier: 'Medicaid',
    plan: 'HMO',
    memberId: 'MC129483708',
    groupNumber: 'GRP002',
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

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    externalOrderId: 'ClH6A0xTUYS-bgJa',
    patientId: '1',
    patientName: 'John Smith',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    items: [{ id: 'LI001', description: 'CGM supply allowance', hcpcsCode: 'A4239', product: 'Freestyle Libre 3 sensors', quantity: 2 }],
    stage: 'qualification',
    subStatus: 'in_progress',
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2026-01-10',
    lastUpdated: '2026-01-19',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD002',
    externalOrderId: 'Xk9B2mWqR7Lp-dNfE',
    patientId: '1',
    patientName: 'John Smith',
    orderName: 'CPAP Equipment',
    orderType: 'DME',
    items: [{ id: 'LI002', description: 'CPAP device with accessories', hcpcsCode: 'E0601', product: 'ResMed AirSense 11', quantity: 1 }],
    stage: 'qualification',
    subStatus: 'in_progress',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Sleep Center',
    dateCreated: '2026-01-12',
    lastUpdated: '2026-01-20',
    documents: [],
    notes: [],
  },
];

const mockTimelineActivities = [
  {
    id: '1',
    type: 'automated' as const,
    title: 'Automated Eligibility & Benefits check ran',
    timestamp: '2026-01-21T10:30:00Z',
  },
  {
    id: '2',
    type: 'comment' as const,
    title: 'Liam K Commented on Order',
    description: 'Call with account today to mention there was a connection problem with the EHR',
    author: {
      name: 'Liam K',
      initials: 'LK',
    },
    timestamp: '2026-01-20T16:15:00Z',
  },
  {
    id: '3',
    type: 'automated' as const,
    title: 'Automated Eligibility & Benefits check ran',
    timestamp: '2026-01-21T10:30:00Z',
  },
];

interface PatientDocument extends OrderDocument {
  orderId?: string;
  orderNumber?: string;
}

interface TimelineActivity {
  id: string;
  type: 'automated' | 'comment';
  title: string;
  description?: string;
  author?: {
    name: string;
    initials: string;
  };
  timestamp: string;
}

const mockDocuments: PatientDocument[] = [
  {
    id: 'doc1',
    name: 'Sleep Study Report.pdf',
    type: 'sleep_study',
    dateAdded: '2026-01-09',
    source: 'bright_tree',
    url: '#',
    orderId: 'ORD001',
    orderNumber: 'Order number',
  },
  {
    id: 'doc2',
    name: 'Prior Authorization Form.pdf',
    type: 'prior_auth',
    dateAdded: '2026-01-14',
    source: 'bright_tree',
    url: '#',
    orderId: 'ORD001',
    orderNumber: 'Order number',
  },
  {
    id: 'doc3',
    name: 'Certificate of Medical Necessity.pdf',
    type: 'cmn',
    dateAdded: '2026-01-15',
    source: 'bright_tree',
    url: '#',
    orderId: 'ORD002',
    orderNumber: 'Order number',
  },
];

function PatientLayoutContent({
  children: _children,
  id: _id,
}: {
  children: ReactNode;
  id: string;
}) {
  const { setDisableInsetWrapper } = useAppShell();
  const [activities, setActivities] = useState<TimelineActivity[]>(mockTimelineActivities);

  const handleAddComment = useCallback((comment: string) => {
    const newActivity: TimelineActivity = {
      id: `comment-${Date.now()}`,
      type: 'comment',
      title: 'You Commented',
      description: comment,
      author: {
        name: 'You',
        initials: 'YO',
      },
      timestamp: new Date().toISOString(),
    };
    setActivities(prev => [newActivity, ...prev]);
  }, []);

  useEffect(() => {
    setDisableInsetWrapper(true);
    return () => setDisableInsetWrapper(false);
  }, [setDisableInsetWrapper]);

  return (
    <div className="flex-1 flex h-full">
      <PatientSummaryVariantB
        patient={mockPatient}
        orders={mockOrders}
        activities={activities}
        documents={mockDocuments}
        onAddComment={handleAddComment}
      />
    </div>
  );
}

export default function PatientLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <PatientLayoutContent id={id}>{children}</PatientLayoutContent>;
}
