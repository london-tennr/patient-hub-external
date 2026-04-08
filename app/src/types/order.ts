export type OrderStage = 'validation' | 'eligibility' | 'qualification' | 'complete';
export type OrderSubStatus = 'in_progress' | 'blocked' | 'awaiting_response' | 'completed';
export type OrderStatus = 'on_track' | 'missing_info' | 'rejected' | 'completed';

export interface OrderLineItem {
  id: string;
  description: string;
  hcpcsCode: string;
  product: string;
  quantity: number;
}

export interface Order {
  id: string;
  externalOrderId: string;
  patientId: string;
  patientName: string;
  orderName: string;
  orderType: string;
  items: OrderLineItem[];
  patientDob: string;
  status: OrderStatus;
  stage: OrderStage;
  subStatus: OrderSubStatus;
  statusUpdated: string;
  orderAge: string;
  referringPractitioner: string | null;
  referringFacility: string | null;
  dateCreated: string;
  lastUpdated: string;
  documents: OrderDocument[];
  notes: OrderNote[];
  missingInfo?: string[];
  rejectionReasons?: string[];
}

export interface OrderDocument {
  id: string;
  name: string;
  type: 'sleep_study' | 'prior_auth' | 'cmn' | 'other';
  dateAdded: string;
  source: 'ehr' | 'tennr' | 'bright_tree';
  url: string;
}

export interface OrderNote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}
