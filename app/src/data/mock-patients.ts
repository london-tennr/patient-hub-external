import type { Patient, PatientStatus, PatientPriority, PatientStage } from '@/types/patient';

const firstNames = [
  'Kael', 'Giana', 'Jaquan', 'Brigid', 'Turner', 'Lena', 'Mateo', 'Priya',
  'Desmond', 'Nadia', 'Felix', 'Celeste', 'Rowan', 'Amara', 'Silas', 'Ingrid',
  'Kai', 'Maren', 'Darius', 'Elin', 'Thiago', 'Zara', 'Oren', 'Livia',
  'Jasper', 'Suki', 'Callum', 'Noor', 'Beckett', 'Petra', 'Idris', 'Astrid',
  'Emeka', 'Vera', 'Nico', 'Freya', 'Joaquin', 'Tessa', 'Malachi', 'Elara',
  'Henrik', 'Yara', 'Bennett', 'Solana', 'Eamon', 'Iris', 'Tobias', 'Camille',
  'Ravi', 'Linnea',
];

const lastNames = [
  'Oakley', 'Bergson', 'Crona', 'Ankunding', 'Wintheiser', 'Halvorsen',
  'Padilla', 'Chandrasekhar', 'Mbeki', 'Kowalski', 'Reyes', 'Johansson',
  'Nakamura', 'Okonkwo', 'Fernandez', 'Lindqvist', 'Parekh', 'Moreau',
  'Stavros', 'Adeyemi', 'Zhao', 'Ivanova', 'Delgado', 'Henriksen', 'Bautista',
  'Larsen', 'Kimura', 'Mensah', 'Volkov', 'Gutierrez', 'Sørensen', 'Achebe',
  'Petrov', 'Kaminski', 'Sundaram', 'Nilsen', 'Tremblay', 'Osei', 'Tanaka',
  'Holm', 'Castillo', 'Björk', 'Nwosu', 'Pham', 'Engström', 'Okafor',
  'Magnusson', 'Ayala', 'Singh', 'Eriksson',
];

const streets = [
  '472 Cascade Place, Apt 3B', '891 Willow Creek Drive', '321 High Ridge Circle',
  '99 Mountain View Terrace', '555 Lake Washington Blvd', '1200 Elm Street',
  '88 Pine Valley Road', '743 Sunset Boulevard', '29 Harbor View Lane',
  '160 Cedar Park Way', '501 Birch Hollow Court', '2340 Maple Ridge Drive',
  '77 Aspen Trail', '415 Riverside Avenue', '630 Summit Place',
  '18 Fox Meadow Lane', '920 Valley Forge Road', '1105 Briar Creek Path',
  '284 Stone Bridge Way', '3001 Lakeshore Drive',
];

const cities: { city: string; state: string; zip: string }[] = [
  { city: 'Seattle', state: 'WA', zip: '98101' },
  { city: 'Portland', state: 'OR', zip: '97201' },
  { city: 'Denver', state: 'CO', zip: '80202' },
  { city: 'Salt Lake City', state: 'UT', zip: '84101' },
  { city: 'Bellevue', state: 'WA', zip: '98004' },
  { city: 'Boise', state: 'ID', zip: '83702' },
  { city: 'Spokane', state: 'WA', zip: '99201' },
  { city: 'Tacoma', state: 'WA', zip: '98402' },
  { city: 'Eugene', state: 'OR', zip: '97401' },
  { city: 'Boulder', state: 'CO', zip: '80301' },
  { city: 'Provo', state: 'UT', zip: '84601' },
  { city: 'Bend', state: 'OR', zip: '97701' },
];

const ehrSystems: ('BrightTree' | 'WeInfuse' | 'Niko')[] = [
  'BrightTree', 'WeInfuse', 'Niko',
];

// Deterministic seeded random for reproducibility
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function randomDob(): string {
  const year = 1945 + Math.floor(rand() * 60);
  const month = 1 + Math.floor(rand() * 12);
  const day = 1 + Math.floor(rand() * 28);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function randomPhone(): string {
  const a = 200 + Math.floor(rand() * 800);
  const b = 100 + Math.floor(rand() * 900);
  const c = 1000 + Math.floor(rand() * 9000);
  return `555-${a}-${b}${String(c).slice(1)}`;
}

function randomSyncDate(index: number): string {
  const base = new Date('2024-01-15T10:00:00Z');
  base.setHours(base.getHours() - index * 7 - Math.floor(rand() * 48));
  return base.toISOString();
}

// Coherent patient state generation — status, stage, tennrStatus, and priority
// are linked so the data makes logical sense.

const stages: PatientStage[] = [
  'referral_received',
  'intake_review',
  'insurance_verification',
  'prior_authorization',
  'scheduling',
  'ready_for_claim',
  'claim_submitted',
];

type TennrStatus = 'in_queue' | 'processing' | 'completed' | 'idle';

interface CoherentState {
  status: PatientStatus;
  stage: PatientStage;
  tennrStatus: TennrStatus;
  priority: PatientPriority;
}

function generateCoherentState(): CoherentState {
  const r = rand();

  // ~10% completed — finished the full pipeline
  if (r < 0.10) {
    return {
      status: 'completed',
      stage: 'claim_submitted',
      tennrStatus: 'completed',
      priority: 'p7',
    };
  }

  // ~7% inactive — dropped out early
  if (r < 0.17) {
    const earlyStage = stages[Math.floor(rand() * 3)]; // first 3 stages
    return {
      status: 'inactive',
      stage: earlyStage,
      tennrStatus: 'idle',
      priority: 'p8',
    };
  }

  // ~8% blocked — stuck at a mid-stage, high priority
  if (r < 0.25) {
    const blockedStages: PatientStage[] = ['insurance_verification', 'prior_authorization', 'scheduling'];
    const stage = blockedStages[Math.floor(rand() * blockedStages.length)];
    return {
      status: 'blocked',
      stage,
      tennrStatus: 'idle',
      priority: 'p1',
    };
  }

  // ~10% needs_attention — processing but something is off
  if (r < 0.35) {
    const midStages: PatientStage[] = ['intake_review', 'insurance_verification', 'prior_authorization'];
    const stage = midStages[Math.floor(rand() * midStages.length)];
    return {
      status: 'needs_attention',
      stage,
      tennrStatus: rand() < 0.5 ? 'processing' : 'in_queue',
      priority: 'p0',
    };
  }

  // ~15% missing_info — early/mid stage, waiting for data
  if (r < 0.50) {
    const earlyMidStages: PatientStage[] = ['referral_received', 'intake_review', 'insurance_verification'];
    const stage = earlyMidStages[Math.floor(rand() * earlyMidStages.length)];
    return {
      status: 'missing_info',
      stage,
      tennrStatus: 'in_queue',
      priority: rand() < 0.4 ? 'p2' : 'p4',
    };
  }

  // ~50% on_track — progressing normally through pipeline
  const stageIndex = Math.floor(rand() * (stages.length - 1)); // not claim_submitted yet
  const stage = stages[stageIndex];

  // Later stages are more likely to be processing/completed by Tennr
  let tennrStatus: TennrStatus;
  const t = rand();
  if (stageIndex >= 4) {
    tennrStatus = t < 0.6 ? 'completed' : 'processing';
  } else {
    tennrStatus = t < 0.3 ? 'completed' : t < 0.6 ? 'processing' : 'in_queue';
  }

  return {
    status: 'on_track',
    stage,
    tennrStatus,
    priority: (['p4', 'p5', 'p6', 'p7'] as const)[Math.floor(rand() * 4)],
  };
}

function generatePatients(count: number): Patient[] {
  const patients: Patient[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = pick(firstNames);
    const lastName = pick(lastNames);
    const loc = pick(cities);
    const id = String(i + 1);
    const patientId = String(593101 + i);

    patients.push({
      id,
      patientId,
      mrn: String(100000 + Math.floor(rand() * 900000)),
      firstName,
      lastName,
      dob: randomDob(),
      phone: randomPhone(),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      address: {
        street: pick(streets),
        city: loc.city,
        state: loc.state,
        zip: loc.zip,
      },
      ...generateCoherentState(),
      syncStatus: {
        ehrSystem: pick(ehrSystems),
        lastSynced: randomSyncDate(i),
      },
    });
  }

  return patients;
}

export const mockPatients: Patient[] = generatePatients(100);
