'use client';

import { ReactNode, use, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { PatientSummaryVariantB } from '@/components/patient/summary/patient-summary-variant-b';
import { useAppShell } from '@/components/shell/app-shell';
import { mockPatients } from '@/data/mock-patients';
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
  referralDate: '2026-03-15T10:00:00Z',
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
    statusUpdated: '2026-03-30',
    orderAge: '3 days',
    items: [{ id: 'LI001', description: 'Aerosol face mask', hcpcsCode: 'A7015', product: 'Vyaire AirLife Aerosol Mask', quantity: 1 }],
    stage: 'qualification',
    subStatus: 'in_progress',
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2026-03-30',
    lastUpdated: '2026-03-30',
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
    status: 'on_track',
    statusUpdated: '2026-03-31',
    orderAge: '2 days',
    items: [{ id: 'LI002', description: 'Standard manual wheelchair', hcpcsCode: 'K0001', product: 'Drive Medical Silver Sport 2', quantity: 1 }],
    stage: 'eligibility',
    subStatus: 'in_progress',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Sleep Center',
    dateCreated: '2026-03-31',
    lastUpdated: '2026-03-31',
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
    status: 'missing_info',
    statusUpdated: '2026-04-02',
    orderAge: '1 day',
    items: [{ id: 'LI003', description: 'CGM supply allowance', hcpcsCode: 'A4239', product: 'Freestyle Libre 3 sensors', quantity: 2 }],
    stage: 'validation',
    subStatus: 'awaiting_response',
    missingInfo: ['Physician signature on CMN form', 'Updated insurance card (front and back)'],
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2026-04-02',
    lastUpdated: '2026-04-02',
    documents: [],
    notes: [
      { id: 'N-003a', content: 'Insurance verification submitted to carrier.', author: 'Tennr System', createdAt: '2026-04-02T09:15:00Z' },
      { id: 'N-003b', content: 'Patient confirmed current address and delivery preferences.', author: 'Jane Miller', createdAt: '2026-04-02T11:30:00Z' },
    ],
  },
  {
    id: 'ORD-BUG',
    externalOrderId: 'Qf6T1rAvD4Wk-yLmN',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'CPAP Machine',
    orderType: 'DME',
    status: 'rejected',
    statusUpdated: '2026-03-29',
    orderAge: '4 days',
    items: [{ id: 'LI-BUG', description: 'CPAP device with humidifier', hcpcsCode: 'E0601', product: 'ResMed AirSense 11', quantity: 1 }],
    stage: 'eligibility',
    subStatus: 'blocked',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Sleep Center',
    dateCreated: '2026-03-29',
    lastUpdated: '2026-03-29',
    documents: [],
    notes: [
      { id: 'N-BUG1', content: 'Payer denied coverage — patient does not meet AHI threshold per LCD policy.', author: 'Tennr System', createdAt: '2026-03-29T14:22:00Z' },
      { id: 'N-BUG2', content: 'Contacted referring provider to request updated sleep study.', author: 'Jane Miller', createdAt: '2026-03-29T16:05:00Z' },
    ],
    rejectionReasons: ['Patient does not meet AHI ≥ 15 threshold per LCD L33718', 'Sleep study older than 24 months'],
  },
  {
    id: 'ORD-ACT',
    externalOrderId: 'Hs9W2pBxE7Jn-cRgK',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Nebulizer',
    orderType: 'DME',
    status: 'on_track',
    statusUpdated: '2026-04-01',
    orderAge: '2 days',
    items: [{ id: 'LI-ACT', description: 'Compressor nebulizer system', hcpcsCode: 'E0570', product: 'Philips InnoSpire Go', quantity: 1 }],
    stage: 'validation',
    subStatus: 'in_progress',
    referringPractitioner: 'Dr. James Park',
    referringFacility: 'Summit Health Clinic',
    dateCreated: '2026-04-01',
    lastUpdated: '2026-04-01',
    documents: [],
    notes: [
      { id: 'N-ACT1', content: 'Order received from Summit Health Clinic. Beginning intake review.', author: 'Tennr System', createdAt: '2026-04-01T08:00:00Z' },
    ],
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
    stage: 'complete',
    subStatus: 'completed',
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
    stage: 'complete',
    subStatus: 'completed',
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
    stage: 'complete',
    subStatus: 'completed',
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
    stage: 'complete',
    subStatus: 'completed',
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
    orderAge: '1 day',
    items: [{ id: 'LI008', description: 'CGM transmitter', hcpcsCode: 'A4238', product: 'Dexcom G7 Transmitter', quantity: 1 }],
    stage: 'complete',
    subStatus: 'completed',
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
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2026-01-28',
    lastUpdated: '2026-01-28',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD010',
    externalOrderId: 'Bq3R7wLtN5Gk-zPcJ',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-02-02',
    orderAge: '3 days',
    items: [{ id: 'LI010', description: 'CGM sensor pack', hcpcsCode: 'A4239', product: 'Freestyle Libre 3 Sensor 14-Day', quantity: 4 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Medical Group',
    dateCreated: '2026-01-30',
    lastUpdated: '2026-02-02',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD011',
    externalOrderId: 'Gf8P1mDxK4Ws-hNrQ',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Wheelchair',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-02-04',
    orderAge: '5 days',
    items: [{ id: 'LI011', description: 'Power wheelchair base', hcpcsCode: 'K0856', product: 'Permobil M3 Corpus', quantity: 1 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. James Park',
    referringFacility: 'Summit Health Clinic',
    dateCreated: '2026-01-30',
    lastUpdated: '2026-02-04',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD012',
    externalOrderId: 'Ux6T9sFvR2Ml-bWcA',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Aerosol Mask',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-02-05',
    orderAge: '2 days',
    items: [{ id: 'LI012', description: 'Nebulizer compressor system', hcpcsCode: 'E0570', product: 'PARI Vios PRO Nebulizer', quantity: 1 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. Lisa Wong',
    referringFacility: 'Riverside Rehabilitation Center',
    dateCreated: '2026-02-03',
    lastUpdated: '2026-02-05',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD013',
    externalOrderId: 'Nk4W2pHtE7Bj-yQgR',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-02-06',
    orderAge: '1 day',
    items: [{ id: 'LI013', description: 'CGM adhesive patches', hcpcsCode: 'A4239', product: 'Dexcom G7 Adhesive Patches', quantity: 10 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. Michael Torres',
    referringFacility: 'Cascade Endocrinology',
    dateCreated: '2026-02-05',
    lastUpdated: '2026-02-06',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD014',
    externalOrderId: 'Cx9J5rKwT3Fn-dAmH',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Wheelchair',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-02-01',
    orderAge: '6 days',
    items: [{ id: 'LI014', description: 'Wheelchair cushion', hcpcsCode: 'E2601', product: 'ROHO Quadtro Select Cushion', quantity: 1 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Sleep Center',
    dateCreated: '2026-01-26',
    lastUpdated: '2026-02-01',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD015',
    externalOrderId: 'Vt7B8nGwQ1Rp-kLsE',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Aerosol Mask',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-20',
    orderAge: '18 days',
    items: [{ id: 'LI015', description: 'Nebulizer tubing replacement', hcpcsCode: 'A7010', product: 'Teleflex Corrugated Tubing', quantity: 5 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2026-01-02',
    lastUpdated: '2026-01-20',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD016',
    externalOrderId: 'Lw2D4xAzF6Hp-mYtN',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-18',
    orderAge: '20 days',
    items: [{ id: 'LI016', description: 'CGM insertion device', hcpcsCode: 'A4226', product: 'Dexcom G7 Applicator', quantity: 2 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. James Park',
    referringFacility: 'Summit Health Clinic',
    dateCreated: '2025-12-29',
    lastUpdated: '2026-01-18',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD017',
    externalOrderId: 'Qr5G1kMtV8Wn-jXfP',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Wheelchair',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-15',
    orderAge: '23 days',
    items: [{ id: 'LI017', description: 'Wheelchair armrest pads', hcpcsCode: 'E0973', product: 'Medline Gel Armrest Pads', quantity: 2 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. Lisa Wong',
    referringFacility: 'Riverside Rehabilitation Center',
    dateCreated: '2025-12-23',
    lastUpdated: '2026-01-15',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD018',
    externalOrderId: 'Ap8F3sNwK9Ct-rBqW',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Aerosol Mask',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-12',
    orderAge: '26 days',
    items: [{ id: 'LI018', description: 'Compressor nebulizer filter', hcpcsCode: 'A7013', product: 'PARI Nebulizer Filter Set', quantity: 6 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. Michael Torres',
    referringFacility: 'Cascade Endocrinology',
    dateCreated: '2025-12-17',
    lastUpdated: '2026-01-12',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD019',
    externalOrderId: 'Yz1L6pRtB4Mk-wHnD',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-08',
    orderAge: '30 days',
    items: [{ id: 'LI019', description: 'CGM receiver case', hcpcsCode: 'A4226', product: 'Dexcom G7 Protective Case', quantity: 1 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: null,
    referringFacility: null,
    dateCreated: '2025-12-09',
    lastUpdated: '2026-01-08',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD020',
    externalOrderId: 'Ej7K2vNwG5Sq-tFxR',
    patientId: '1',
    patientName: 'John Smith',
    patientDob: '1985-03-15',
    orderName: 'Wheelchair',
    orderType: 'DME',
    status: 'completed',
    statusUpdated: '2026-01-05',
    orderAge: '33 days',
    items: [{ id: 'LI020', description: 'Wheelchair seat belt', hcpcsCode: 'E0978', product: 'Skil-Care Safety Belt', quantity: 1 }],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Sleep Center',
    dateCreated: '2025-12-03',
    lastUpdated: '2026-01-05',
    documents: [],
    notes: [],
  },
];

// Enrich orders with referring practitioner/facility details
const practitionerDetails: Record<string, { npi: string; credentials: string; address: string }> = {
  'Dr. Sarah Chen': { npi: '9296377864', credentials: 'MD, FCCP', address: '355 Washington Ave Ext, Suite 240, Albany, NY, 12205' },
  'Dr. James Park': { npi: '1548293076', credentials: 'DO', address: '1200 NE 78th St, Suite 100, Portland, OR, 97213' },
  'Dr. Lisa Wong': { npi: '8721450963', credentials: 'MD', address: '4500 Riverside Blvd, Suite 310, Sacramento, CA, 95822' },
  'Dr. Michael Torres': { npi: '6039184752', credentials: 'MD, FACE', address: '820 Cascade Pkwy, Suite 150, Bellevue, WA, 98004' },
};

const facilityDetails: Record<string, { npi: string; address: string }> = {
  'Pacific Northwest Sleep Center': { npi: '9151049346', address: '355 Washington Ave Ext, Suite 240, Albany, NY, 12205' },
  'Pacific Northwest Medical Group': { npi: '3847291056', address: '700 NE Multnomah St, Suite 300, Portland, OR, 97232' },
  'Summit Health Clinic': { npi: '2750183694', address: '1200 NE 78th St, Suite 100, Portland, OR, 97213' },
  'Riverside Rehabilitation Center': { npi: '4192837560', address: '4500 Riverside Blvd, Suite 310, Sacramento, CA, 95822' },
  'Cascade Endocrinology': { npi: '5803746129', address: '820 Cascade Pkwy, Suite 150, Bellevue, WA, 98004' },
};

for (const order of mockOrders) {
  if (order.referringPractitioner && practitionerDetails[order.referringPractitioner]) {
    const pd = practitionerDetails[order.referringPractitioner];
    order.referringPractitionerNpi = pd.npi;
    order.referringPractitionerCredentials = pd.credentials;
    order.referringPractitionerAddress = pd.address;
  }
  if (order.referringFacility && facilityDetails[order.referringFacility]) {
    const fd = facilityDetails[order.referringFacility];
    order.referringFacilityNpi = fd.npi;
    order.referringFacilityAddress = fd.address;
  }
}

const activityTemplates: {
  type: TimelineActivity['type'];
  title: string;
  descriptions: string[];
  orderIds?: string[];
}[] = [
  { type: 'order_created', title: 'Order created', descriptions: ['Respiratory / Oxygen', 'CPAP / BiPAP', 'Enteral Nutrition', 'Wound Care Supplies', 'Infusion Therapy', 'Mobility / Wheelchair', 'Hospital Bed / Equipment'], orderIds: ['Order-4821', 'Order-3190', 'Order-2847', 'Order-5512', 'Order-6103'] },
  { type: 'order_update', title: 'Order updated', descriptions: ['Insurance verified', 'Prior auth submitted', 'Status changed to In Progress', 'Documents uploaded', 'Shipping address updated', 'Notes added', 'Claim submitted', 'Authorization approved'], orderIds: ['Order-4821', 'Order-3190', 'Order-2847', 'Order-5512', 'Order-6103'] },
  { type: 'patient_created', title: 'Patient created', descriptions: [] },
  { type: 'patient_update', title: 'Patient updated', descriptions: ['Demographics updated', 'Insurance info updated', 'Phone number changed', 'Address updated', 'Primary care provider updated', 'Emergency contact added'] },
];

const timelineUserNames: { name: string; initials: string }[] = [
  { name: 'Sarah Chen', initials: 'SC' },
  { name: 'Mike Rivera', initials: 'MR' },
  { name: 'Emily Nguyen', initials: 'EN' },
  { name: 'James Park', initials: 'JP' },
  { name: 'Lisa Thompson', initials: 'LT' },
  { name: 'David Kim', initials: 'DK' },
  { name: 'Rachel Foster', initials: 'RF' },
  { name: 'Carlos Mendez', initials: 'CM' },
  { name: 'Amanda Wright', initials: 'AW' },
  { name: 'Kevin O\'Brien', initials: 'KO' },
];

function generateTimelineActivities(count: number): TimelineActivity[] {
  const activities: TimelineActivity[] = [];
  const baseDate = new Date('2026-03-30T17:00:00Z');

  for (let i = 0; i < count; i++) {
    const seed = (i * 7 + 13) % 100;
    const template = activityTemplates[seed % activityTemplates.length];
    const ts = new Date(baseDate);
    ts.setDate(ts.getDate() - Math.floor(i * 1.8));
    ts.setHours(8 + (seed % 10), (seed * 7) % 60);

    const sourceRoll = (seed * 3) % 10;
    let source: 'tennr' | 'user' | 'system';
    let author: { name: string; initials: string } | undefined;
    if (sourceRoll < 4) {
      source = 'tennr';
    } else if (sourceRoll < 7) {
      source = 'user';
      author = timelineUserNames[seed % timelineUserNames.length];
    } else {
      source = 'system';
    }

    let description: string | undefined;
    const orderId = template.orderIds?.[seed % template.orderIds.length];
    if (template.descriptions.length > 0) {
      const desc = template.descriptions[seed % template.descriptions.length];
      description = orderId ? `${orderId} · ${desc}` : desc;
    } else if (orderId) {
      description = orderId;
    }

    activities.push({
      id: String(i + 1),
      type: template.type,
      title: template.title,
      description,
      orderId: orderId?.replace('Order-', 'ORD-'),
      source,
      author,
      timestamp: ts.toISOString(),
    });
  }

  return activities;
}

const mockTimelineActivities: TimelineActivity[] = generateTimelineActivities(50);

interface PatientDocument extends OrderDocument {
  orderId?: string;
  orderNumber?: string;
}

interface TimelineActivity {
  id: string;
  type: 'order_created' | 'order_update' | 'patient_created' | 'patient_update';
  title: string;
  description?: string;
  orderId?: string;
  source?: 'tennr' | 'user' | 'system';
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
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const { setDisableInsetWrapper } = useAppShell();
  const searchParams = useSearchParams();
  const isExploreMvp = searchParams.get('from') === 'explore-mvp';

  // Look up real patient from mock data to get actual status/stage
  const realPatient = mockPatients.find((p) => p.id === id);
  const patient: Patient = realPatient
    ? { ...mockPatient, ...realPatient }
    : mockPatient;
  const [activities, setActivities] = useState<TimelineActivity[]>(mockTimelineActivities);

  const handleAddComment = useCallback((comment: string) => {
    const newActivity: TimelineActivity = {
      id: `update-${Date.now()}`,
      type: 'patient_update',
      title: 'Patient updated',
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
        patient={patient}
        orders={mockOrders}
        activities={activities}
        documents={mockDocuments}
        onAddComment={handleAddComment}
        hideOrderIllustrations={isExploreMvp}
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
