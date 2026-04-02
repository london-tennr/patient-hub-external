export type WorkflowTriggerType =
  | 'manual'
  | 'schedule'
  | 'webhook'
  | 'workflow'
  | 'event';

export type WorkflowStatus = 'active' | 'inactive' | 'draft' | 'development';

export interface WorkflowInput {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  description?: string;
}

export interface WorkflowConnection {
  targetWorkflowId: string;
  dataMapping?: Record<string, string>; // output -> input mapping
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  triggerType: WorkflowTriggerType;
  triggerConfig?: {
    schedule?: string; // cron expression
    event?: string;
    sourceWorkflowId?: string;
  };
  inputs: WorkflowInput[];
  calls: WorkflowConnection[]; // workflows this one calls
  calledBy: string[]; // workflow IDs that call this one
  lastRun?: string;
  runCount: number;
  avgDuration?: number; // in ms
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// For graph visualization
export interface WorkflowNode {
  id: string;
  workflow: Workflow;
  x: number;
  y: number;
  level: number; // depth in the graph
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  dataFields?: string[];
}
