export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export type PatientStatus =
  | 'on_track'
  | 'missing_info'
  | 'needs_attention'
  | 'blocked'
  | 'completed'
  | 'inactive';

export type PatientPriority = 'p0' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8';

export type PatientStage =
  | 'referral_received'
  | 'intake_review'
  | 'insurance_verification'
  | 'prior_authorization'
  | 'scheduling'
  | 'ready_for_claim'
  | 'claim_submitted';

export interface Patient {
  id: string;
  patientId: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  address: Address;
  deliveryAddress?: Address;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  primaryInsurance?: Insurance;
  secondaryInsurance?: Insurance;
  status: PatientStatus;
  priority: PatientPriority;
  stage: PatientStage;
  stageCompletedAt?: Partial<Record<PatientStage, string>>;
  runningStages?: PatientStage[];
  referralDate: string;
  tennrStatus: 'in_queue' | 'processing' | 'completed' | 'idle';
  syncStatus: {
    ehrSystem: 'BrightTree' | 'WeInfuse' | 'Niko';
    lastSynced: string;
  };
  lastActivity?: {
    title: string;
    timestamp: string;
    metadata?: string;
    source?: 'tennr' | 'user' | 'integration';
    sourceLabel?: string;
  };
  recentActivities?: {
    title: string;
    timestamp: string;
    metadata?: string;
    source?: 'tennr' | 'user' | 'integration';
    sourceLabel?: string;
  }[];
  order?: PatientOrder;
  actionCount?: number;
  actionItems?: { id: string; label: string; description?: string }[];
}

export interface PatientOrderDoc {
  id: string;
  name: string;
  pages: number;
}

export interface PatientOrder {
  id: string;
  externalOrderId: string;
  category: string;
  referredBy: string;
  receivedDate: string;
  payer: string | null;
  documents: PatientOrderDoc[];
}

export interface Insurance {
  carrier: string;
  plan: string;
  memberId: string;
  groupNumber: string;
  policyHolder: string;
  relationship: string;
  eligibilityStatus: 'verified' | 'pending' | 'failed';
  effectiveDate?: string;
  status: 'active' | 'inactive' | 'pending';
  lastVerified?: string;
}
