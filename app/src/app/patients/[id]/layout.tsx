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
  mrn: '336974',
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
    patientDob: '1985-03-15',
    orderName: 'Aerosol Mask',
    orderType: 'DME',
    status: 'on_track',
    statusUpdated: '2026-01-19',
    orderAge: '9 days',
    items: [{ id: 'LI001', description: 'Aerosol face mask', hcpcsCode: 'A7015', product: 'Vyaire AirLife Aerosol Mask', quantity: 1 }],
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
    patientDob: '1985-03-15',
    orderName: 'Wheelchair',
    orderType: 'DME',
    status: 'missing_info',
    statusUpdated: '2026-01-20',
    orderAge: '8 days',
    items: [{ id: 'LI002', description: 'Standard manual wheelchair', hcpcsCode: 'K0001', product: 'Drive Medical Silver Sport 2', quantity: 1 }],
    stage: 'eligibility',
    subStatus: 'in_progress',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Sleep Center',
    dateCreated: '2026-01-12',
    lastUpdated: '2026-01-20',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD003',
    externalOrderId: 'Rm4K7vNcQ2Hs-jYtW',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    status: 'on_track',
    statusUpdated: '2026-01-22',
    orderAge: '6 days',
    items: [{ id: 'LI003', description: 'CGM supply allowance', hcpcsCode: 'A4239', product: 'Freestyle Libre 3 sensors', quantity: 2 }],
    stage: 'validation',
    subStatus: 'in_progress',
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2026-01-16',
    lastUpdated: '2026-01-22',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD004',
    externalOrderId: 'Jv7G3bCxZ1Np-qEwF',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-23',
    orderAge: '5 days',
    items: [{ id: 'LI004', description: 'CGM receiver unit', hcpcsCode: 'A4226', product: 'Dexcom G7 Receiver', quantity: 1 }],
    stage: 'eligibility',
    subStatus: 'in_progress',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Medical Group',
    dateCreated: '2026-01-18',
    lastUpdated: '2026-01-23',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD005',
    externalOrderId: 'Tn5F8kPwV3Qr-mXaB',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Aerosol Mask',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-25',
    orderAge: '3 days',
    items: [{ id: 'LI005', description: 'Pediatric aerosol mask', hcpcsCode: 'A7015', product: 'Hudson RCI Dragon Mask', quantity: 2 }],
    stage: 'qualification',
    subStatus: 'in_progress',
    referringPractitioner: 'Dr. James Park',
    referringFacility: 'Summit Health Clinic',
    dateCreated: '2026-01-22',
    lastUpdated: '2026-01-25',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD006',
    externalOrderId: 'Wq2L9nRtY6Km-pHsD',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Wheelchair',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-24',
    orderAge: '4 days',
    items: [{ id: 'LI006', description: 'Lightweight folding wheelchair', hcpcsCode: 'K0004', product: 'Invacare Tracer SX5', quantity: 1 }],
    stage: 'validation',
    subStatus: 'in_progress',
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2026-01-20',
    lastUpdated: '2026-01-24',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD007',
    externalOrderId: 'Pk1N5eGwB9Ms-tVrJ',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Wheelchair',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-27',
    orderAge: '1 day',
    items: [{ id: 'LI007', description: 'Transport wheelchair', hcpcsCode: 'K0001', product: 'Medline Ultralight Transport', quantity: 1 }],
    stage: 'eligibility',
    subStatus: 'in_progress',
    referringPractitioner: 'Dr. Lisa Wong',
    referringFacility: 'Riverside Rehabilitation Center',
    dateCreated: '2026-01-26',
    lastUpdated: '2026-01-27',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD008',
    externalOrderId: 'Zm8Q4hIxC2Ot-uWnL',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-28',
    orderAge: '0 days',
    items: [{ id: 'LI008', description: 'CGM transmitter', hcpcsCode: 'A4238', product: 'Dexcom G7 Transmitter', quantity: 1 }],
    stage: 'qualification',
    subStatus: 'in_progress',
    referringPractitioner: 'Dr. Michael Torres',
    referringFacility: 'Cascade Endocrinology',
    dateCreated: '2026-01-28',
    lastUpdated: '2026-01-28',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD009',
    externalOrderId: 'Hy4M6dFvA8Lr-sUtK',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Aerosol Mask',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-26',
    orderAge: '2 days',
    items: [{ id: 'LI009', description: 'Adult aerosol mask with tubing', hcpcsCode: 'A7015', product: 'Teleflex Micro Mist Nebulizer', quantity: 3 }],
    stage: 'eligibility',
    subStatus: 'in_progress',
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2026-01-28',
    lastUpdated: '2026-01-28',
    documents: [],
    notes: [],
  },
];

const mockTimelineActivities = [
  {
    id: '1',
    type: 'verification' as const,
    title: 'Insurance verification initiated',
    orderId: 'ORD-4821',
    timestamp: '2026-03-30T17:07:00Z',
  },
  {
    id: '2',
    type: 'document' as const,
    title: 'Insurance card uploaded by patient',
    orderId: 'ORD-4821',
    timestamp: '2026-03-28T14:15:00Z',
  },
  {
    id: '3',
    type: 'referral' as const,
    title: 'Referral received from PresNow Urgent Care',
    orderId: 'ORD-4821',
    timestamp: '2026-03-25T11:17:00Z',
  },
  {
    id: '4',
    type: 'order_complete' as const,
    title: 'Order completed — claim submitted',
    orderId: 'ORD-3190',
    timestamp: '2026-02-15T09:30:00Z',
  },
  {
    id: '5',
    type: 'prior_auth' as const,
    title: 'Prior auth approved by Aetna',
    orderId: 'ORD-3190',
    timestamp: '2026-02-01T15:45:00Z',
  },
  {
    id: '6',
    type: 'prior_auth' as const,
    title: 'Prior auth submitted to Aetna',
    orderId: 'ORD-3190',
    timestamp: '2026-01-22T10:00:00Z',
  },
  {
    id: '7',
    type: 'referral' as const,
    title: 'Referral received from PresNow Urgent Care',
    orderId: 'ORD-3190',
    timestamp: '2026-01-10T08:30:00Z',
  },
  {
    id: '8',
    type: 'verification' as const,
    title: 'Eligibility re-verified with BlueCross',
    orderId: 'ORD-3190',
    timestamp: '2026-01-08T13:20:00Z',
  },
  {
    id: '9',
    type: 'document' as const,
    title: 'CMN form signed by Dr. Sarah Chen',
    orderId: 'ORD-4821',
    timestamp: '2026-01-06T16:45:00Z',
  },
  {
    id: '10',
    type: 'prior_auth' as const,
    title: 'Prior auth request denied — resubmitted',
    orderId: 'ORD-4821',
    timestamp: '2026-01-04T11:30:00Z',
  },
  {
    id: '11',
    type: 'document' as const,
    title: 'Sleep study report uploaded from BrightTree',
    orderId: 'ORD-3190',
    timestamp: '2026-01-02T09:00:00Z',
  },
  {
    id: '12',
    type: 'order_complete' as const,
    title: 'Order fulfilled — shipped to patient',
    orderId: 'ORD-2847',
    timestamp: '2025-12-28T14:10:00Z',
  },
  {
    id: '13',
    type: 'verification' as const,
    title: 'Secondary insurance verified — Medicaid',
    orderId: 'ORD-4821',
    timestamp: '2025-12-22T10:30:00Z',
  },
  {
    id: '14',
    type: 'comment' as const,
    title: 'Patient called to confirm delivery address',
    author: { name: 'Maria Lopez', initials: 'ML' },
    timestamp: '2025-12-18T15:00:00Z',
  },
  {
    id: '15',
    type: 'referral' as const,
    title: 'Referral received from Cascade Endocrinology',
    orderId: 'ORD-4821',
    timestamp: '2025-12-15T08:45:00Z',
  },
];

interface PatientDocument extends OrderDocument {
  orderId?: string;
  orderNumber?: string;
}

interface TimelineActivity {
  id: string;
  type: 'verification' | 'document' | 'referral' | 'order_complete' | 'prior_auth' | 'comment';
  title: string;
  description?: string;
  orderId?: string;
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
