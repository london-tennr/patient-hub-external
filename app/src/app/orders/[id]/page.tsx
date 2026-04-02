'use client';

import { use, useState } from 'react';
import { Card, CardContent } from '@tennr/lasso/card';
import { OrderHeader } from '@/components/order/order-header';
import { StageStepper } from '@/components/order/stage-stepper';
import { OrderNotes } from '@/components/order/order-notes';
import { OrderDocuments } from '@/components/order/order-documents';
import type { Order, OrderSubStatus, OrderDocument } from '@/types/order';

const mockOrder: Order = {
  id: 'ORD001',
  externalOrderId: 'ClH6A0xTUYS-bgJa',
  patientId: '1',
  patientName: 'John Smith',
  orderName: 'CGM & Supplies',
  orderType: 'DME',
  items: [{ id: 'LI001', description: 'CGM supply allowance', hcpcsCode: 'A4239', product: 'Freestyle Libre 3 sensors', quantity: 2 }],
  stage: 'eligibility',
  subStatus: 'in_progress',
  referringPractitioner: null,
  referringFacility: null,
  dateCreated: '2026-01-10',
  lastUpdated: '2026-01-19',
  documents: [
    {
      id: 'doc1',
      name: 'Sleep Study Results.pdf',
      type: 'sleep_study',
      dateAdded: '2026-01-10',
      source: 'ehr',
      url: '#',
    },
  ],
  notes: [
    {
      id: 'note1',
      content: 'Called insurance for pre-auth status. Rep said it will take 3-5 business days.',
      author: 'Sarah M.',
      createdAt: '2026-01-18T14:30:00Z',
    },
    {
      id: 'note2',
      content: 'Sleep study received and uploaded to EHR.',
      author: 'Mike T.',
      createdAt: '2026-01-10T09:15:00Z',
    },
  ],
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = use(params);
  // TODO: Use _id to fetch order from API
  const [order, setOrder] = useState(mockOrder);

  const handleSubStatusChange = (status: OrderSubStatus) => {
    setOrder(prev => ({ ...prev, subStatus: status, lastUpdated: new Date().toISOString() }));
    // TODO: Sync to API
  };

  const handleAddNote = async (content: string) => {
    const newNote = {
      id: `note${Date.now()}`,
      content,
      author: 'Current User',
      createdAt: new Date().toISOString(),
    };
    setOrder(prev => ({ ...prev, notes: [newNote, ...prev.notes] }));
    // TODO: Sync to API
  };

  const handleViewDocument = (doc: OrderDocument) => {
    // TODO: Open document viewer side tray
    console.log('View document:', doc);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <OrderHeader order={order} onSubStatusChange={handleSubStatusChange} />

        <Card>
          <CardContent className="py-6">
            <StageStepper currentStage={order.stage} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderDocuments documents={order.documents} onView={handleViewDocument} />
          <OrderNotes notes={order.notes} onAddNote={handleAddNote} />
        </div>
      </div>
    </div>
  );
}
