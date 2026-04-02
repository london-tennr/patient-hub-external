'use client';

import { use } from 'react';
import { DocumentsTableCard } from '@/components/patient/documents/documents-table-card';
import type { OrderDocument } from '@/types/order';

interface PatientDocument extends OrderDocument {
  orderId?: string;
  orderNumber?: string;
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

export default function DocumentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = use(params);
  // TODO: Use _id to fetch documents from API

  return <DocumentsTableCard documents={mockDocuments} />;
}
