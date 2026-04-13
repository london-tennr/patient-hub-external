import type { Order, OrderStatus, OrderStage } from '@/types/order';

// Deterministic pseudo-random using seed
let seed = 54321;
function rand(): number {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

const firstNames = [
  'Trey', 'Dakota', 'Charlie', 'Felix', 'Jamie', 'London', 'Genevieve',
  'Morgan', 'Avery', 'Quinn', 'Riley', 'Jordan', 'Taylor', 'Casey',
  'Skylar', 'Drew', 'Emery', 'Harper', 'Rowan', 'Blair', 'Sage',
  'Finley', 'Reese', 'Kendall', 'Hayden', 'Peyton', 'Cameron', 'Alex',
  'Marley', 'Frankie',
];

const lastNames = [
  'Holterman', 'Allen', 'Harris', 'Martin', 'Anderson', 'Zhang', 'Payzer',
  'Chen', 'Rivera', 'Thompson', 'Kim', 'Patel', 'Williams', 'Garcia',
  'Lopez', 'Lee', 'Walker', 'Hall', 'Young', 'King', 'Wright', 'Scott',
  'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell', 'Roberts', 'Evans',
];

const orderTypes = [
  'CGM & Supplies',
  'Respiratory / Oxygen',
  'Walk Aids & Accessories',
  'Commodes & Bath Safety',
  'CPAP Equipment',
  'Nebulizer Supplies',
  'Hospital Beds',
  'Wheelchair & Scooters',
];

const stages: OrderStage[] = ['validation', 'eligibility', 'qualification', 'complete'];
const stageLabels: Record<OrderStage, string> = {
  validation: 'Patient Intake',
  eligibility: 'Resupply Confirmed',
  qualification: 'Prior Auth',
  complete: 'Complete',
};

const facilities = [
  'MARTIN LUTHER KING JR. COMMUNITY HOSPITAL',
  'Rancho Los Amigos National Rehab Center',
  'SOUTHERN CALIFORNIA PERMANENTE',
  'ST.FRANCIS MEDICAL CENTER',
  'UCLA HEALTH SYSTEM',
  'CEDARS-SINAI MEDICAL CENTER',
  'KAISER PERMANENTE LOS ANGELES',
  'PROVIDENCE HOLY CROSS',
];

const practitioners = [
  'NICOLE BABARAN',
  'ALYSSA ANDERSON',
  'JAMSHID NIKNAM',
  'JOHANA CEJA',
  'MICHAEL CHEN',
  'SARAH PATEL',
  'DAVID RODRIGUEZ',
  'EMILY WRIGHT',
];

function randomDob(): string {
  const year = 1950 + Math.floor(rand() * 55);
  const month = 1 + Math.floor(rand() * 12);
  const day = 1 + Math.floor(rand() * 28);
  return `${month}/${day}/${year}`;
}

function randomTimeAgo(): { label: string; ms: number } {
  const r = rand();
  if (r < 0.3) {
    const hours = Math.floor(rand() * 48) + 1;
    return { label: `${hours} hours ago`, ms: hours * 3600000 };
  } else if (r < 0.6) {
    const days = Math.floor(rand() * 30) + 1;
    return { label: `${days} days ago`, ms: days * 86400000 };
  } else {
    const months = Math.floor(rand() * 12) + 1;
    return { label: `${months} months ago`, ms: months * 2592000000 };
  }
}

function generateOrders(count: number): Order[] {
  const orders: Order[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = pick(firstNames);
    const lastName = pick(lastNames);
    const orderType = pick(orderTypes);
    const statusUpdated = randomTimeAgo();
    const orderAge = randomTimeAgo();

    // Determine status
    let status: OrderStatus;
    const r = rand();
    if (r < 0.54) status = 'on_track';
    else if (r < 0.63) status = 'missing_info';
    else if (r < 0.64) status = 'rejected';
    else status = 'completed';

    // Determine stage based on status
    let stage: OrderStage;
    if (status === 'completed') {
      stage = 'complete';
    } else {
      stage = pick(stages.filter(s => s !== 'complete'));
    }

    // Facility and practitioner (some have none)
    const hasFacility = rand() > 0.35;
    const facility = hasFacility ? pick(facilities) : null;
    const practitioner = hasFacility ? pick(practitioners) : null;

    orders.push({
      id: `ORD-${String(i + 1).padStart(4, '0')}`,
      externalOrderId: `Order-${String(2000001 + i)}`,
      patientId: String(i + 1),
      patientName: `${firstName} ${lastName}`,
      patientDob: randomDob(),
      orderName: `${orderType} Order`,
      orderType,
      status,
      stage,
      subStatus: status === 'completed' ? 'completed' : status === 'rejected' ? 'blocked' : rand() < 0.5 ? 'in_progress' : 'awaiting_response',
      statusUpdated: statusUpdated.label,
      orderAge: orderAge.label,
      referringFacility: facility,
      referringPractitioner: practitioner,
      dateCreated: new Date(Date.now() - orderAge.ms).toISOString(),
      lastUpdated: new Date(Date.now() - statusUpdated.ms).toISOString(),
      items: [],
      documents: [],
      notes: [],
    });
  }

  return orders;
}

export const mockOrders = generateOrders(2242);
