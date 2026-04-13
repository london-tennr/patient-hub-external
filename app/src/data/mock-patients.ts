import type { Patient, PatientStatus, PatientPriority, PatientStage, PatientOrder, PatientOrderDoc } from '@/types/patient';

// Hollywood celebrities with real birth dates (used for DOB generation)
interface CelebrityInfo {
  firstName: string;
  lastName: string;
  dob: string; // YYYY-MM-DD
}

const celebrities: CelebrityInfo[] = [
  { firstName: 'Leonardo', lastName: 'DiCaprio', dob: '1974-11-11' },
  { firstName: 'Scarlett', lastName: 'Johansson', dob: '1984-11-22' },
  { firstName: 'Brad', lastName: 'Pitt', dob: '1963-12-18' },
  { firstName: 'Angelina', lastName: 'Jolie', dob: '1975-06-04' },
  { firstName: 'Tom', lastName: 'Hanks', dob: '1956-07-09' },
  { firstName: 'Meryl', lastName: 'Streep', dob: '1949-06-22' },
  { firstName: 'Denzel', lastName: 'Washington', dob: '1954-12-28' },
  { firstName: 'Jennifer', lastName: 'Lawrence', dob: '1990-08-15' },
  { firstName: 'Robert', lastName: 'Downey', dob: '1965-04-04' },
  { firstName: 'Margot', lastName: 'Robbie', dob: '1990-07-02' },
  { firstName: 'Morgan', lastName: 'Freeman', dob: '1937-06-01' },
  { firstName: 'Natalie', lastName: 'Portman', dob: '1981-06-09' },
  { firstName: 'Will', lastName: 'Smith', dob: '1968-09-25' },
  { firstName: 'Cate', lastName: 'Blanchett', dob: '1969-05-14' },
  { firstName: 'Ryan', lastName: 'Gosling', dob: '1980-11-12' },
  { firstName: 'Emma', lastName: 'Stone', dob: '1988-11-06' },
  { firstName: 'Samuel', lastName: 'Jackson', dob: '1948-12-21' },
  { firstName: 'Viola', lastName: 'Davis', dob: '1965-08-11' },
  { firstName: 'Chris', lastName: 'Hemsworth', dob: '1983-08-11' },
  { firstName: 'Zendaya', lastName: 'Coleman', dob: '1996-09-01' },
  { firstName: 'Keanu', lastName: 'Reeves', dob: '1964-09-02' },
  { firstName: 'Sandra', lastName: 'Bullock', dob: '1964-07-26' },
  { firstName: 'Dwayne', lastName: 'Johnson', dob: '1972-05-02' },
  { firstName: 'Anne', lastName: 'Hathaway', dob: '1982-11-12' },
  { firstName: 'Matt', lastName: 'Damon', dob: '1970-10-08' },
  { firstName: 'Charlize', lastName: 'Theron', dob: '1975-08-07' },
  { firstName: 'Tom', lastName: 'Cruise', dob: '1962-07-03' },
  { firstName: 'Florence', lastName: 'Pugh', dob: '1996-01-03' },
  { firstName: 'Harrison', lastName: 'Ford', dob: '1942-07-13' },
  { firstName: 'Lupita', lastName: 'Nyongo', dob: '1983-03-01' },
  { firstName: 'Jake', lastName: 'Gyllenhaal', dob: '1980-12-19' },
  { firstName: 'Halle', lastName: 'Berry', dob: '1966-08-14' },
  { firstName: 'Chris', lastName: 'Evans', dob: '1981-06-13' },
  { firstName: 'Saoirse', lastName: 'Ronan', dob: '1994-04-12' },
  { firstName: 'Benedict', lastName: 'Cumberbatch', dob: '1976-07-19' },
  { firstName: 'Reese', lastName: 'Witherspoon', dob: '1976-03-22' },
  { firstName: 'Oscar', lastName: 'Isaac', dob: '1979-03-09' },
  { firstName: 'Kerry', lastName: 'Washington', dob: '1977-01-31' },
  { firstName: 'Pedro', lastName: 'Pascal', dob: '1975-04-02' },
  { firstName: 'Awkwafina', lastName: 'Nora', dob: '1988-06-02' },
  { firstName: 'Timothee', lastName: 'Chalamet', dob: '1995-12-27' },
  { firstName: 'Michelle', lastName: 'Yeoh', dob: '1962-08-06' },
  { firstName: 'Jason', lastName: 'Momoa', dob: '1979-08-01' },
  { firstName: 'Emma', lastName: 'Watson', dob: '1990-04-15' },
  { firstName: 'Jeff', lastName: 'Goldblum', dob: '1952-10-22' },
  { firstName: 'Gal', lastName: 'Gadot', dob: '1985-04-30' },
  { firstName: 'Michael', lastName: 'Jordan', dob: '1987-02-09' },
  { firstName: 'Sydney', lastName: 'Sweeney', dob: '1997-09-12' },
  { firstName: 'Hugh', lastName: 'Jackman', dob: '1968-10-12' },
  { firstName: 'Salma', lastName: 'Hayek', dob: '1966-09-02' },
];

const firstNames = celebrities.map(c => c.firstName);
const lastNames = celebrities.map(c => c.lastName);

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

const orderCategories = [
  'Respiratory / Oxygen',
  'CPAP / BiPAP',
  'Enteral Nutrition',
  'Wound Care Supplies',
  'Infusion Therapy',
  'Mobility / Wheelchair',
  'Hospital Bed / Equipment',
  'Nebulizer / Accessories',
];

const referringProviders = [
  'MARTIN LUTHER KING, JR. - LOS ANGELES (MLK-LA) HEALTHCARE CORPORATION, JACK GEOULA',
  'CEDARS-SINAI MEDICAL CENTER, DR. SARAH CHEN',
  'MAYO CLINIC ROCHESTER, DR. JAMES WILSON',
  'MOUNT SINAI HEALTH SYSTEM, DR. ANNA KOVAC',
  'JOHNS HOPKINS HOSPITAL, DR. MICHAEL BROOKS',
  'UCLA HEALTH, DR. PATRICIA NGUYEN',
  'CLEVELAND CLINIC, DR. ROBERT ANDERSON',
  'MASSACHUSETTS GENERAL HOSPITAL, DR. EMILY TAYLOR',
];

const payers = ['Aetna', 'Blue Cross Blue Shield', 'UnitedHealthcare', 'Cigna', 'Humana', 'Medicare', 'Medicaid'];

function generateExternalOrderId(): string {
  const num = 3000000 + Math.floor(rand() * 9000000);
  return `Order-${num}`;
}

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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

function randomReferralDate(index: number): string {
  const base = new Date('2026-03-28T10:00:00Z');
  base.setDate(base.getDate() - index - Math.floor(rand() * 30));
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
  runningStages?: PatientStage[];
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

  // ~10% needs_attention — ready for review
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

  // Pick 2-3 random non-completed stages as running (processing spinners)
  const uncompletedStages = stages.filter((_, idx) => idx >= stageIndex);
  const runningStages: PatientStage[] = [];
  if (uncompletedStages.length > 0) {
    const r2 = rand();
    const numRunning = Math.min(uncompletedStages.length, r2 < 0.35 ? 2 : 3);
    const shuffled = shuffle(uncompletedStages);
    for (let j = 0; j < numRunning; j++) {
      runningStages.push(shuffled[j]);
    }
  }

  return {
    status: 'on_track',
    stage,
    runningStages,
    tennrStatus,
    priority: (['p4', 'p5', 'p6', 'p7'] as const)[Math.floor(rand() * 4)],
  };
}

function generateStageCompletedAt(
  state: CoherentState,
  referralDate: string,
): Partial<Record<PatientStage, string>> | undefined {
  const stageIndex = stages.indexOf(state.stage);
  const isBlockedOrAttention =
    state.status === 'blocked' ||
    state.status === 'needs_attention' ||
    state.status === 'missing_info';

  // Number of completed stages (not including current if blocked/attention)
  const completedCount = isBlockedOrAttention ? stageIndex : stageIndex + 1;

  if (completedCount === 0) return undefined;

  // Exclude running stages so they show as spinners in the UI
  const runningSet = new Set((state.runningStages ?? []).map(s => stages.indexOf(s)));
  const eligibleIndices = stages.map((_, i) => i).filter(i => !runningSet.has(i));
  const shuffled = shuffle(eligibleIndices);
  const pickedIndices = shuffled.slice(0, Math.min(completedCount, eligibleIndices.length)).sort((a, b) => a - b);

  const result: Partial<Record<PatientStage, string>> = {};
  const base = new Date(referralDate);

  for (const idx of pickedIndices) {
    base.setDate(base.getDate() + 1 + Math.floor(rand() * 3));
    base.setHours(8 + Math.floor(rand() * 10), Math.floor(rand() * 60));
    result[stages[idx]] = base.toISOString();
  }

  return result;
}

const activityTypes = ['Order created', 'Order updated', 'Patient created', 'Patient updated'] as const;

const updateOrderMetadata = [
  'Status changed to In Progress',
  'Payer verified',
  'Documents uploaded',
  'Prior auth submitted',
  'Shipping address updated',
  'Notes added',
];

const updatePatientMetadata = [
  'Demographics updated',
  'Payer info updated',
  'Phone number changed',
  'Address updated',
  'Primary care provider updated',
  'Emergency contact added',
];

const activityUserNames = [
  'Sarah Chen',
  'Mike Rivera',
  'Emily Nguyen',
  'James Park',
  'Lisa Thompson',
  'David Kim',
  'Rachel Foster',
  'Carlos Mendez',
  'Amanda Wright',
  'Kevin O\'Brien',
];

type ActivitySource = 'tennr' | 'user' | 'integration';

function generateActivitySource(): { source: ActivitySource; sourceLabel: string } {
  const r = rand();
  if (r < 0.4) {
    return { source: 'tennr', sourceLabel: 'Tennr' };
  } else if (r < 0.75) {
    const name = activityUserNames[Math.floor(rand() * activityUserNames.length)];
    return { source: 'user', sourceLabel: name };
  } else {
    return { source: 'integration', sourceLabel: 'Integration' };
  }
}

function generateActivityEntry(referralDate: string, dayOffset: number): { title: string; timestamp: string; metadata?: string; source: ActivitySource; sourceLabel: string } {
  const type = activityTypes[Math.floor(rand() * activityTypes.length)];
  const orderId = `Order-${String(1000 + Math.floor(rand() * 9000))}`;
  const orderType = orderCategories[Math.floor(rand() * orderCategories.length)];
  const { source, sourceLabel } = generateActivitySource();

  let title: string = type;
  let metadata: string | undefined;
  if (type === 'Order created') {
    title = `${orderId} created`;
    metadata = orderType;
  } else if (type === 'Order updated') {
    title = `${orderId} updated`;
    metadata = updateOrderMetadata[Math.floor(rand() * updateOrderMetadata.length)];
  } else if (type === 'Patient updated') {
    metadata = updatePatientMetadata[Math.floor(rand() * updatePatientMetadata.length)];
  }

  const ts = new Date(referralDate);
  ts.setDate(ts.getDate() + dayOffset);
  ts.setHours(8 + Math.floor(rand() * 10), Math.floor(rand() * 60));

  return { title, timestamp: ts.toISOString(), metadata, source, sourceLabel };
}

function generateLastActivity(status: PatientStatus, referralDate: string): { title: string; timestamp: string; metadata?: string; source: ActivitySource; sourceLabel: string } {
  return generateActivityEntry(referralDate, Math.floor(rand() * 14));
}

function generateRecentActivities(status: PatientStatus, referralDate: string): { title: string; timestamp: string; metadata?: string; source: ActivitySource; sourceLabel: string }[] {
  const activities: { title: string; timestamp: string; metadata?: string; source: ActivitySource; sourceLabel: string }[] = [];

  for (let i = 0; i < 5; i++) {
    activities.push(generateActivityEntry(referralDate, Math.floor(rand() * 14) - i * 2));
  }

  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return activities;
}

function generatePatients(count: number): Patient[] {
  const patients: Patient[] = [];

  for (let i = 0; i < count; i++) {
    const celeb = celebrities[i % celebrities.length];
    const firstName = celeb.firstName;
    const lastName = celeb.lastName;
    const loc = pick(cities);
    const id = String(i + 1);
    const patientId = String(593101 + i);
    const coherentState = generateCoherentState();
    const referralDate = randomReferralDate(i);

    const docs: PatientOrderDoc[] = [
      { id: `doc-${id}-1`, name: `${lastName}_referral`, pages: Math.floor(rand() * 8) + 2 },
    ];
    if (rand() > 0.4) {
      docs.push({ id: `doc-${id}-2`, name: `${lastName}_cmn`, pages: Math.floor(rand() * 4) + 1 });
    }
    if (rand() > 0.5) {
      docs.push({ id: `doc-${id}-3`, name: `${lastName}_prior_auth`, pages: Math.floor(rand() * 3) + 1 });
    }

    const order: PatientOrder = {
      id: `order-${id}`,
      externalOrderId: generateExternalOrderId(),
      category: pick(orderCategories),
      referredBy: pick(referringProviders),
      receivedDate: referralDate,
      payer: rand() > 0.3 ? pick(payers) : null,
      documents: docs,
    };

    patients.push({
      id,
      patientId,
      mrn: String(100000 + Math.floor(rand() * 900000)),
      firstName,
      lastName,
      dob: celeb.dob,
      phone: randomPhone(),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      address: {
        street: pick(streets),
        city: loc.city,
        state: loc.state,
        zip: loc.zip,
      },
      ...coherentState,
      stageCompletedAt: generateStageCompletedAt(coherentState, referralDate),
      referralDate,
      syncStatus: {
        ehrSystem: pick(ehrSystems),
        lastSynced: randomSyncDate(i),
      },
      lastActivity: generateLastActivity(coherentState.status, referralDate),
      recentActivities: generateRecentActivities(coherentState.status, referralDate),
      order,
    });
  }

  // Helper: rebuild stageCompletedAt to match current stage & status
  function rebuildStageCompletedAt(p: Patient) {
    const stageIdx = stages.indexOf(p.stage);
    const isBlockedOrAttention =
      p.status === 'blocked' || p.status === 'needs_attention' || p.status === 'missing_info';
    const completedCount = isBlockedOrAttention ? stageIdx : stageIdx + 1;
    const runSet = new Set(p.runningStages ?? []);

    const result: Partial<Record<PatientStage, string>> = {};
    const base = new Date(p.referralDate);

    for (let j = 0; j < completedCount; j++) {
      const s = stages[j];
      if (!runSet.has(s)) {
        base.setDate(base.getDate() + 1 + Math.floor(rand() * 3));
        base.setHours(8 + Math.floor(rand() * 10), Math.floor(rand() * 60));
        result[s] = base.toISOString();
      }
    }

    p.stageCompletedAt = Object.keys(result).length > 0 ? result : undefined;
  }

  // Override statuses: 1 bug, 1 action required, 3 on_track, rest completed
  // Action needed and platform issues are surfaced first
  for (let i = 0; i < patients.length; i++) {
    if (i === 0) {
      patients[i].status = 'blocked';
      patients[i].stage = 'prior_authorization';
      patients[i].tennrStatus = 'idle';
      patients[i].runningStages = undefined;
      patients[i].lastActivity = generateLastActivity('blocked', patients[i].referralDate);
      rebuildStageCompletedAt(patients[i]);
    } else if (i === 1) {
      patients[i].status = 'missing_info';
      patients[i].stage = 'insurance_verification';
      patients[i].tennrStatus = 'in_queue';
      patients[i].runningStages = undefined;
      patients[i].actionCount = 1;
      patients[i].actionItems = [
        { id: 'action-1', label: 'Verify payer details', description: 'Member ID appears invalid for Aetna' },
      ];
      patients[i].lastActivity = generateLastActivity('missing_info', patients[i].referralDate);
      rebuildStageCompletedAt(patients[i]);
    } else if (i < 5) {
      patients[i].status = 'on_track';
      patients[i].lastActivity = generateLastActivity('on_track', patients[i].referralDate);
      // Ensure running stages exist for processing patients
      if (!patients[i].runningStages || patients[i].runningStages!.length === 0) {
        const stageIdx = stages.indexOf(patients[i].stage);
        const uncompleted = stages.filter((_, idx) => idx >= stageIdx);
        const numRunning = Math.min(uncompleted.length, rand() < 0.35 ? 2 : 3);
        patients[i].runningStages = shuffle(uncompleted).slice(0, numRunning);
      }
      rebuildStageCompletedAt(patients[i]);
    } else {
      patients[i].status = 'completed';
      patients[i].stage = 'claim_submitted';
      patients[i].tennrStatus = 'completed';
      patients[i].runningStages = undefined;
      patients[i].lastActivity = generateLastActivity('completed', patients[i].referralDate);
      // All stages completed
      const result: Partial<Record<PatientStage, string>> = {};
      const base = new Date(patients[i].referralDate);
      for (const s of stages) {
        base.setDate(base.getDate() + 1 + Math.floor(rand() * 3));
        base.setHours(8 + Math.floor(rand() * 10), Math.floor(rand() * 60));
        result[s] = base.toISOString();
      }
      patients[i].stageCompletedAt = result;
    }
  }

  return patients;
}

export const mockPatients: Patient[] = generatePatients(100);
