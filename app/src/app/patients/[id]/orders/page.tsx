import { OrdersPanel } from '@/components/patient/orders/orders-panel';
import type { Order } from '@/types/order';

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    externalOrderId: 'ClH6A0xTUYS-bgJa',
    patientId: '1',
    patientName: 'John Smith',
    orderName: 'CGM & Supplies',
    orderType: 'DME',
    items: [
      {
        id: 'LI001',
        description:
          'Code for Supply allowance for non-adjunctive, non-implanted continuous glucose monitor (cgm), includes all supplies and accessories, 1 month supply = 1 unit of service',
        hcpcsCode: 'A4239',
        product: 'Freestyle Libre 3 sensors',
        quantity: 2,
      },
    ],
    stage: 'eligibility',
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
    items: [
      {
        id: 'LI002',
        description:
          'Continuous positive airway pressure (CPAP) device, includes all accessories, replacement supplies, humidifier, and tubing',
        hcpcsCode: 'E0601',
        product: 'ResMed AirSense 11 AutoSet',
        quantity: 1,
      },
      {
        id: 'LI003',
        description:
          'Replacement supplies for CPAP device, includes mask, cushion, headgear, tubing, and filters, per month',
        hcpcsCode: 'A7030',
        product: 'ResMed F20 Full Face Mask Kit',
        quantity: 3,
      },
    ],
    stage: 'validation',
    subStatus: 'awaiting_response',
    referringPractitioner: 'Dr. Sarah Chen',
    referringFacility: 'Pacific Northwest Sleep Center',
    dateCreated: '2026-01-15',
    lastUpdated: '2026-01-18',
    documents: [],
    notes: [],
  },
  {
    id: 'ORD003',
    externalOrderId: 'Qw3F8nVtM1Hy-jKsR',
    patientId: '1',
    patientName: 'John Smith',
    orderName: 'Nebulizer Supplies',
    orderType: 'DME',
    items: [
      {
        id: 'LI004',
        description:
          'Nebulizer, durable, glass or autoclavable plastic, bottle type, for use with regulator or flowmeter',
        hcpcsCode: 'E7000',
        product: 'Philips InnoSpire Go Portable Mesh Nebulizer',
        quantity: 1,
      },
    ],
    stage: 'complete',
    subStatus: 'completed',
    referringPractitioner: 'Dr. Michael Torres',
    referringFacility: 'Cascade Pulmonary Associates',
    dateCreated: '2025-12-01',
    lastUpdated: '2026-01-05',
    documents: [],
    notes: [],
  },
];

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = await params;
  return <OrdersPanel orders={mockOrders} />;
}
