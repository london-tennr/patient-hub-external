'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
  MarkerType,
  Panel,
  PanOnScrollMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  MagnifyingGlass,
  X,
  TreeStructure,
  Play,
  Calendar,
  WebhooksLogo,
  GitBranch,
  Lightning,
  ArrowRight,
  CaretRight,
  CaretDown,
  Clock,
  Database,
  Sidebar,
  Flask,
} from '@phosphor-icons/react';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import { Input } from '@tennr/lasso/input';
import { cn } from '@tennr/lasso/utils/cn';
import type { Workflow, WorkflowStatus, WorkflowTriggerType } from '@/types/workflow';

type StatusFilter = 'all' | 'inactive' | 'development';

// Mock workflow data representing a realistic workflow graph
const mockWorkflows: Workflow[] = [
  {
    id: 'wf-intake',
    name: 'Patient Intake',
    description: 'Processes new patient intake forms and creates patient records',
    status: 'active',
    triggerType: 'webhook',
    inputs: [
      { name: 'form_data', type: 'object', required: true, description: 'Raw form submission' },
      { name: 'source', type: 'string', required: false },
    ],
    calls: [
      { targetWorkflowId: 'wf-verify-insurance', dataMapping: { patient_id: 'patient_id' } },
      { targetWorkflowId: 'wf-create-chart', dataMapping: { patient_id: 'patient_id', intake_record: 'intake_data' } },
    ],
    calledBy: [],
    lastRun: '2024-01-15T14:32:00Z',
    runCount: 1247,
    avgDuration: 1200,
    tags: ['intake', 'patient'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'wf-verify-insurance',
    name: 'Verify Insurance',
    description: 'Validates insurance eligibility and benefits with payer systems',
    status: 'active',
    triggerType: 'workflow',
    triggerConfig: { sourceWorkflowId: 'wf-intake' },
    inputs: [
      { name: 'patient_id', type: 'string', required: true },
    ],
    calls: [
      { targetWorkflowId: 'wf-notify-team', dataMapping: { patient_id: 'patient_id', eligibility_status: 'status' } },
    ],
    calledBy: ['wf-intake', 'wf-order-submit', 'wf-comprehensive-intake'],
    lastRun: '2024-01-15T14:33:00Z',
    runCount: 2891,
    avgDuration: 3400,
    tags: ['insurance', 'verification'],
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  {
    id: 'wf-create-chart',
    name: 'Create Patient Chart',
    description: 'Initializes patient chart in EHR system with intake data',
    status: 'active',
    triggerType: 'workflow',
    inputs: [
      { name: 'patient_id', type: 'string', required: true },
      { name: 'intake_data', type: 'object', required: true },
    ],
    calls: [
      { targetWorkflowId: 'wf-sync-ehr', dataMapping: { chart_id: 'chart_id', patient_id: 'patient_id' } },
    ],
    calledBy: ['wf-intake'],
    lastRun: '2024-01-15T14:32:30Z',
    runCount: 1245,
    avgDuration: 800,
    tags: ['chart', 'ehr'],
    createdAt: '2023-07-01T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'wf-notify-team',
    name: 'Notify Care Team',
    description: 'Sends notifications to relevant care team members',
    status: 'active',
    triggerType: 'workflow',
    inputs: [
      { name: 'patient_id', type: 'string', required: true },
      { name: 'status', type: 'string', required: true },
      { name: 'message_template', type: 'string', required: false },
    ],
    calls: [],
    calledBy: ['wf-verify-insurance', 'wf-order-submit', 'wf-prior-auth'],
    lastRun: '2024-01-15T14:45:00Z',
    runCount: 8923,
    avgDuration: 450,
    tags: ['notification', 'team'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  {
    id: 'wf-sync-ehr',
    name: 'Sync to EHR',
    description: 'Synchronizes data with external EHR systems (BrightTree, WeInfuse, Niko)',
    status: 'active',
    triggerType: 'workflow',
    inputs: [
      { name: 'chart_id', type: 'string', required: true },
      { name: 'patient_id', type: 'string', required: true },
      { name: 'sync_type', type: 'string', required: false },
    ],
    calls: [],
    calledBy: ['wf-create-chart', 'wf-order-complete'],
    lastRun: '2024-01-15T14:35:00Z',
    runCount: 3421,
    avgDuration: 2100,
    tags: ['sync', 'ehr', 'integration'],
    createdAt: '2023-08-01T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
  },
  {
    id: 'wf-order-submit',
    name: 'Submit Order',
    description: 'Processes and submits new orders for review',
    status: 'active',
    triggerType: 'manual',
    inputs: [
      { name: 'patient_id', type: 'string', required: true },
      { name: 'order_details', type: 'object', required: true },
      { name: 'priority', type: 'string', required: false },
    ],
    calls: [
      { targetWorkflowId: 'wf-verify-insurance', dataMapping: { patient_id: 'patient_id' } },
      { targetWorkflowId: 'wf-prior-auth', dataMapping: { order_id: 'order_id', patient_id: 'patient_id' } },
      { targetWorkflowId: 'wf-notify-team', dataMapping: { patient_id: 'patient_id' } },
    ],
    calledBy: [],
    lastRun: '2024-01-15T15:01:00Z',
    runCount: 4521,
    avgDuration: 1800,
    tags: ['order', 'submission'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'wf-prior-auth',
    name: 'Prior Authorization',
    description: 'Handles prior authorization requests with payers',
    status: 'active',
    triggerType: 'workflow',
    inputs: [
      { name: 'order_id', type: 'string', required: true },
      { name: 'patient_id', type: 'string', required: true },
    ],
    calls: [
      { targetWorkflowId: 'wf-notify-team', dataMapping: { patient_id: 'patient_id', auth_status: 'status' } },
      { targetWorkflowId: 'wf-order-complete', dataMapping: { order_id: 'order_id', auth_status: 'auth_status' } },
    ],
    calledBy: ['wf-order-submit'],
    lastRun: '2024-01-15T14:55:00Z',
    runCount: 3892,
    avgDuration: 5600,
    tags: ['prior-auth', 'payer'],
    createdAt: '2023-07-15T00:00:00Z',
    updatedAt: '2024-01-13T00:00:00Z',
  },
  {
    id: 'wf-order-complete',
    name: 'Complete Order',
    description: 'Finalizes order processing and updates all systems',
    status: 'active',
    triggerType: 'workflow',
    inputs: [
      { name: 'order_id', type: 'string', required: true },
      { name: 'auth_status', type: 'string', required: false },
    ],
    calls: [
      { targetWorkflowId: 'wf-sync-ehr', dataMapping: { order_id: 'chart_id' } },
    ],
    calledBy: ['wf-prior-auth'],
    lastRun: '2024-01-15T14:58:00Z',
    runCount: 3201,
    avgDuration: 900,
    tags: ['order', 'completion'],
    createdAt: '2023-08-01T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z',
  },
  {
    id: 'wf-daily-report',
    name: 'Daily Summary Report',
    description: 'Generates daily summary reports of all workflow activity',
    status: 'active',
    triggerType: 'schedule',
    triggerConfig: { schedule: '0 6 * * *' },
    inputs: [],
    calls: [],
    calledBy: [],
    lastRun: '2024-01-15T06:00:00Z',
    runCount: 412,
    avgDuration: 12000,
    tags: ['reporting', 'scheduled'],
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'wf-data-cleanup',
    name: 'Data Cleanup',
    description: 'Scheduled cleanup of temporary data and expired records',
    status: 'inactive',
    triggerType: 'schedule',
    triggerConfig: { schedule: '0 2 * * 0' },
    inputs: [
      { name: 'retention_days', type: 'number', required: false },
    ],
    calls: [],
    calledBy: [],
    lastRun: '2024-01-14T02:00:00Z',
    runCount: 58,
    avgDuration: 45000,
    tags: ['maintenance', 'scheduled'],
    createdAt: '2023-10-01T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z',
  },
  {
    id: 'wf-ai-triage',
    name: 'AI Order Triage',
    description: 'Uses ML model to automatically triage and prioritize incoming orders',
    status: 'development',
    triggerType: 'workflow',
    inputs: [
      { name: 'order_id', type: 'string', required: true },
      { name: 'patient_data', type: 'object', required: true },
    ],
    calls: [],
    calledBy: [],
    lastRun: undefined,
    runCount: 0,
    avgDuration: undefined,
    tags: ['ai', 'triage', 'experimental'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'wf-smart-routing',
    name: 'Smart Case Routing',
    description: 'Intelligently routes cases to appropriate teams based on workload and expertise',
    status: 'development',
    triggerType: 'event',
    inputs: [
      { name: 'case_id', type: 'string', required: true },
      { name: 'case_type', type: 'string', required: true },
    ],
    calls: [],
    calledBy: [],
    lastRun: undefined,
    runCount: 0,
    avgDuration: undefined,
    tags: ['routing', 'automation', 'experimental'],
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
  },
  {
    id: 'wf-bulk-eligibility',
    name: 'Bulk Eligibility Check',
    description: 'Batch process for checking eligibility across multiple patients',
    status: 'inactive',
    triggerType: 'schedule',
    triggerConfig: { schedule: '0 5 * * 1' },
    inputs: [
      { name: 'patient_ids', type: 'array', required: true },
    ],
    calls: [],
    calledBy: [],
    lastRun: '2024-01-08T05:00:00Z',
    runCount: 12,
    avgDuration: 180000,
    tags: ['eligibility', 'batch', 'scheduled'],
    createdAt: '2023-11-01T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  {
    id: 'wf-comprehensive-intake',
    name: 'Comprehensive Patient Intake',
    description: 'Full patient intake form processing with all demographic, insurance, and medical history fields',
    status: 'active',
    triggerType: 'webhook',
    inputs: [
      { name: 'patient_id', type: 'string', required: true },
      { name: 'first_name', type: 'string', required: true },
      { name: 'last_name', type: 'string', required: true },
      { name: 'middle_name', type: 'string', required: false },
      { name: 'date_of_birth', type: 'string', required: true },
      { name: 'ssn', type: 'string', required: false },
      { name: 'gender', type: 'string', required: true },
      { name: 'email', type: 'string', required: false },
      { name: 'phone_primary', type: 'string', required: true },
      { name: 'phone_secondary', type: 'string', required: false },
      { name: 'address_line1', type: 'string', required: true },
      { name: 'address_line2', type: 'string', required: false },
      { name: 'city', type: 'string', required: true },
      { name: 'state', type: 'string', required: true },
      { name: 'zip_code', type: 'string', required: true },
      { name: 'insurance_provider', type: 'string', required: true },
      { name: 'insurance_policy_number', type: 'string', required: true },
      { name: 'insurance_group_number', type: 'string', required: false },
      { name: 'subscriber_name', type: 'string', required: false },
      { name: 'subscriber_relationship', type: 'string', required: false },
      { name: 'secondary_insurance', type: 'object', required: false },
      { name: 'emergency_contact_name', type: 'string', required: true },
      { name: 'emergency_contact_phone', type: 'string', required: true },
      { name: 'emergency_contact_relationship', type: 'string', required: false },
      { name: 'primary_care_physician', type: 'string', required: false },
      { name: 'referring_physician', type: 'string', required: false },
      { name: 'allergies', type: 'array', required: false },
      { name: 'current_medications', type: 'array', required: false },
      { name: 'medical_history', type: 'object', required: false },
      { name: 'surgical_history', type: 'array', required: false },
      { name: 'family_history', type: 'object', required: false },
      { name: 'preferred_pharmacy', type: 'object', required: false },
      { name: 'consent_forms', type: 'array', required: true },
      { name: 'hipaa_acknowledgment', type: 'boolean', required: true },
      { name: 'payment_method', type: 'object', required: false },
      { name: 'notes', type: 'string', required: false },
    ],
    calls: [
      { targetWorkflowId: 'wf-verify-insurance', dataMapping: { patient_id: 'patient_id' } },
    ],
    calledBy: [],
    lastRun: '2024-01-15T16:20:00Z',
    runCount: 892,
    avgDuration: 2400,
    tags: ['intake', 'comprehensive', 'patient'],
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

const statusVariant: Record<WorkflowStatus, 'default' | 'secondary' | 'outline' | 'muted'> = {
  active: 'default',
  inactive: 'muted',
  draft: 'outline',
  development: 'outline',
};

const triggerIcons: Record<WorkflowTriggerType, React.ElementType> = {
  manual: Play,
  schedule: Calendar,
  webhook: WebhooksLogo,
  workflow: GitBranch,
  event: Lightning,
};

const typeColors: Record<string, string> = {
  string: 'text-[var(--green-11)]',
  number: 'text-[var(--blue-11)]',
  boolean: 'text-[var(--amber-11)]',
  object: 'text-[var(--purple-11)]',
  array: 'text-[var(--pink-11)]',
};

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

// Workflow Schema Card Node Component
interface WorkflowNodeData {
  workflow: Workflow;
  isSelected: boolean;
  onSelect: (workflow: Workflow) => void;
}

function WorkflowSchemaNode({ data }: { data: WorkflowNodeData }) {
  const { workflow, isSelected } = data;
  const TriggerIcon = triggerIcons[workflow.triggerType];
  const [isInputsExpanded, setIsInputsExpanded] = useState(false);
  const collapsedCount = 4;
  const hasMoreInputs = workflow.inputs.length > collapsedCount;
  const displayedInputs = isInputsExpanded ? workflow.inputs : workflow.inputs.slice(0, collapsedCount);

  return (
    <div
      className={cn(
        'bg-[var(--neutral-1)] rounded-lg shadow-lg border-2 transition-all duration-200 min-w-[280px] cursor-pointer',
        isSelected
          ? 'border-[var(--brand-terracotta)] shadow-xl ring-4 ring-[var(--brand-terracotta)]/20'
          : 'border-border-secondary hover:border-[var(--neutral-8)]'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--neutral-5)] bg-[var(--neutral-2)] rounded-t-lg">
        <div
          className={cn(
            'w-2.5 h-2.5 rounded-full shrink-0',
            workflow.status === 'active' ? 'bg-[var(--green-9)]' :
            workflow.status === 'inactive' ? 'bg-[var(--neutral-8)]' :
            workflow.status === 'development' ? 'bg-[var(--amber-9)]' :
            'bg-[var(--amber-9)]'
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-[var(--neutral-12)] truncate">
            {workflow.name}
          </div>
        </div>
        <TriggerIcon weight="duotone" className="w-4 h-4 text-[var(--neutral-10)] shrink-0" />
      </div>

      {/* Inputs Section */}
      {workflow.inputs.length > 0 && (
        <div className="relative">
          <div className="px-3 py-1.5 bg-[var(--neutral-2)] border-b border-[var(--neutral-4)] flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--neutral-9)]">
              Inputs ({workflow.inputs.length})
            </span>
            {hasMoreInputs && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInputsExpanded(!isInputsExpanded);
                }}
                className="flex items-center gap-0.5 text-[9px] text-[var(--neutral-9)] hover:text-[var(--neutral-11)] transition-colors"
              >
                {isInputsExpanded ? 'Collapse' : 'Expand'}
                <CaretDown
                  weight="bold"
                  className={cn(
                    'w-3 h-3 transition-transform duration-200',
                    isInputsExpanded && 'rotate-180'
                  )}
                />
              </button>
            )}
          </div>
          <div className="py-1 transition-all duration-200">
            {displayedInputs.map((input) => (
              <div
                key={input.name}
                className="relative flex items-center justify-between px-3 py-1.5 hover:bg-[var(--neutral-2)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[var(--neutral-12)]">
                    {input.name}
                  </span>
                  {input.required && (
                    <span className="text-[var(--red-9)] text-xs">*</span>
                  )}
                </div>
                <span className={cn('font-mono text-[10px]', typeColors[input.type] || 'text-[var(--neutral-10)]')}>
                  {input.type}
                </span>
              </div>
            ))}
            {!isInputsExpanded && hasMoreInputs && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInputsExpanded(true);
                }}
                className="w-full px-3 py-1.5 text-[10px] text-[var(--neutral-9)] hover:text-[var(--neutral-11)] hover:bg-[var(--neutral-2)] transition-colors text-left"
              >
                +{workflow.inputs.length - collapsedCount} more...
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--neutral-2)] border-t border-[var(--neutral-5)] rounded-b-lg">
        <span className="font-mono text-[10px] text-[var(--neutral-9)]">
          {workflow.runCount.toLocaleString()} runs
        </span>
        {workflow.avgDuration && (
          <span className="font-mono text-[10px] text-[var(--neutral-9)]">
            ~{formatDuration(workflow.avgDuration)}
          </span>
        )}
      </div>

      {/* Source handle for outgoing connections (invisible) */}
      {workflow.calls.length > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{
            right: 0,
            top: '50%',
            width: 1,
            height: 1,
            opacity: 0,
            background: 'transparent',
            border: 'none',
          }}
        />
      )}

      {/* Target handle for incoming connections (invisible) */}
      {workflow.calledBy.length > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{
            left: 0,
            top: '50%',
            width: 1,
            height: 1,
            opacity: 0,
            background: 'transparent',
            border: 'none',
          }}
        />
      )}
    </div>
  );
}

const nodeTypes: NodeTypes = {
  workflowSchema: WorkflowSchemaNode,
};

// Calculate initial node positions using a layered approach
function calculateInitialLayout(workflows: Workflow[]): Node[] {
  const workflowMap = new Map(workflows.map(w => [w.id, w]));

  // Find root nodes (no calledBy) and calculate depths
  const depths = new Map<string, number>();
  const visited = new Set<string>();

  function calculateDepth(id: string, currentDepth: number): number {
    if (visited.has(id)) return depths.get(id) || 0;
    visited.add(id);

    const workflow = workflowMap.get(id);
    if (!workflow) return currentDepth;

    let maxChildDepth = currentDepth;
    for (const call of workflow.calls) {
      const childDepth = calculateDepth(call.targetWorkflowId, currentDepth + 1);
      maxChildDepth = Math.max(maxChildDepth, childDepth);
    }

    depths.set(id, currentDepth);
    return maxChildDepth;
  }

  // Start from root nodes
  const roots = workflows.filter(w => w.calledBy.length === 0);
  roots.forEach(r => calculateDepth(r.id, 0));

  // Handle any unvisited nodes (isolated or cycles)
  workflows.forEach(w => {
    if (!depths.has(w.id)) {
      depths.set(w.id, 0);
    }
  });

  // Group by depth
  const depthGroups = new Map<number, string[]>();
  for (const [id, depth] of depths) {
    if (!depthGroups.has(depth)) depthGroups.set(depth, []);
    depthGroups.get(depth)!.push(id);
  }

  // Create nodes with positions
  const nodeWidth = 300;
  const nodeHeight = 320;
  const horizontalGap = 200;
  const verticalGap = 60;

  const nodes: Node[] = [];

  for (const [depth, ids] of depthGroups) {
    ids.forEach((id, rowIndex) => {
      const workflow = workflowMap.get(id)!;
      nodes.push({
        id,
        type: 'workflowSchema',
        position: {
          x: depth * (nodeWidth + horizontalGap) + 50,
          y: rowIndex * (nodeHeight + verticalGap) + 50,
        },
        data: {
          workflow,
          isSelected: false,
          onSelect: () => {},
        },
      });
    });
  }

  return nodes;
}

// Calculate edges from workflow relationships
function calculateEdges(workflows: Workflow[]): Edge[] {
  const edges: Edge[] = [];

  for (const workflow of workflows) {
    for (const call of workflow.calls) {
      edges.push({
        id: `${workflow.id}->${call.targetWorkflowId}`,
        source: workflow.id,
        target: call.targetWorkflowId,
        sourceHandle: 'output',
        targetHandle: 'input',
        type: 'smoothstep',
        animated: false,
        pathOptions: { offset: 8 },
        style: { stroke: 'var(--neutral-7)', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.Arrow,
          color: 'var(--neutral-7)',
          width: 12,
          height: 12,
          strokeWidth: 1.5,
        },
      } as Edge);
    }
  }

  return edges;
}

function WorkflowsPageContent() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');

  const { setCenter, getNode } = useReactFlow();

  const initialNodes = useMemo(() => calculateInitialLayout(mockWorkflows), []);
  const initialEdges = useMemo(() => calculateEdges(mockWorkflows), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update node selection state
  const nodesWithSelection = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isSelected: selectedWorkflow?.id === node.id,
        onSelect: (workflow: Workflow) => setSelectedWorkflow(workflow),
      },
    }));
  }, [nodes, selectedWorkflow]);

  // Highlight connected edges when a workflow is selected
  const edgesWithHighlight = useMemo(() => {
    if (!selectedWorkflow) return edges;

    return edges.map(edge => {
      const isConnected = edge.source === selectedWorkflow.id || edge.target === selectedWorkflow.id;
      return {
        ...edge,
        animated: isConnected,
        style: {
          ...edge.style,
          stroke: isConnected ? 'var(--brand-terracotta)' : 'var(--neutral-7)',
          strokeWidth: isConnected ? 3 : 2,
        },
        markerEnd: {
          type: MarkerType.Arrow,
          color: isConnected ? 'var(--brand-terracotta)' : 'var(--neutral-7)',
          width: 12,
          height: 12,
          strokeWidth: 1.5,
        },
      };
    });
  }, [edges, selectedWorkflow]);

  const filteredWorkflows = useMemo(() => {
    let filtered = mockWorkflows;

    // Apply status filter
    if (statusFilter === 'inactive') {
      filtered = filtered.filter(w => w.status === 'inactive');
    } else if (statusFilter === 'development') {
      filtered = filtered.filter(w => w.status === 'development');
    }

    // Apply search filter
    if (searchValue.trim()) {
      const query = searchValue.toLowerCase();
      filtered = filtered.filter(
        w =>
          w.name.toLowerCase().includes(query) ||
          w.description.toLowerCase().includes(query) ||
          w.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchValue, statusFilter]);

  // Get counts for filter badges
  const inactiveCount = mockWorkflows.filter(w => w.status === 'inactive').length;
  const developmentCount = mockWorkflows.filter(w => w.status === 'development').length;

  const onNodeClick = useCallback((event: React.MouseEvent, clickedNode: Node) => {
    const workflow = mockWorkflows.find(w => w.id === clickedNode.id);
    if (workflow) {
      const isDeselecting = selectedWorkflow?.id === workflow.id;
      setSelectedWorkflow(isDeselecting ? null : workflow);

      // Pan to center the node if selecting (not deselecting)
      if (!isDeselecting) {
        setCenter(
          clickedNode.position.x + 150 + 180,
          clickedNode.position.y + 100,
          { duration: 500, zoom: 1 }
        );
      }
    }
  }, [selectedWorkflow, setCenter]);

  const onPaneClick = useCallback(() => {
    setSelectedWorkflow(null);
  }, []);

  // Handle selecting a workflow from the side panel - also pans to the node
  const handleSelectWorkflow = useCallback((workflow: Workflow | null) => {
    setSelectedWorkflow(workflow);
    setInputSearchValue(''); // Clear input search when selecting a different workflow

    if (workflow) {
      const node = getNode(workflow.id);
      if (node) {
        // Pan to center the node with smooth animation
        // Offset x position to account for:
        // - Node width (~300px) / 2 = 150
        // - Right detail panel (~360px) / 2 = 180 (shift right so node appears left of true center)
        // Offset y for node height (~200px) / 2 = 100
        setCenter(
          node.position.x + 150 + 180,
          node.position.y + 100,
          { duration: 500, zoom: 1 }
        );
      }
    }
  }, [getNode, setCenter]);

  return (
    <div className="flex h-full w-full overflow-hidden animate-in fade-in duration-300">
      {/* Left Panel - Workflow List */}
      <div
        className={cn(
          'flex flex-col h-full bg-bg-primary border-r border-[var(--neutral-6)] transition-all duration-300 animate-in slide-in-from-left-4 duration-300',
          isPanelCollapsed ? 'w-12' : 'w-80'
        )}
      >
        {isPanelCollapsed ? (
          <div className="flex flex-col items-center py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPanelCollapsed(false)}
              title="Expand panel"
            >
              <Sidebar weight="bold" className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--neutral-5)]">
              <div className="flex items-center gap-2">
                <TreeStructure weight="duotone" className="w-5 h-5 text-[var(--neutral-11)]" />
                <span className="text-sm font-semibold text-[var(--neutral-12)]">Workflows</span>
                <Badge variant="secondary" className="text-xs">
                  {mockWorkflows.length}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPanelCollapsed(true)}
                title="Collapse panel"
                className="!size-7"
              >
                <Sidebar weight="bold" className="w-4 h-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-[var(--neutral-5)]">
              <div className="relative">
                <MagnifyingGlass
                  weight="regular"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-icon-secondary pointer-events-none z-10"
                />
                <Input
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search workflows..."
                  className="!pl-8 pr-8"
                />
                {searchValue && (
                  <button
                    onClick={() => setSearchValue('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-bg-tertiary-hover z-10"
                  >
                    <X weight="bold" className="w-3 h-3 text-icon-secondary" />
                  </button>
                )}
              </div>
              {/* Filter Badges */}
              <div className="flex gap-2 mt-2">
                <Badge
                  variant="muted"
                  className={cn(
                    "cursor-pointer transition-colors",
                    statusFilter === 'all' && "bg-bg-tertiary-hover"
                  )}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Badge>
                <Badge
                  variant="muted"
                  className={cn(
                    "cursor-pointer transition-colors",
                    statusFilter === 'inactive' && "bg-bg-tertiary-hover"
                  )}
                  onClick={() => setStatusFilter('inactive')}
                >
                  Inactive ({inactiveCount})
                </Badge>
                <Badge
                  variant="muted"
                  className={cn(
                    "cursor-pointer transition-colors gap-1",
                    statusFilter === 'development' && "bg-bg-tertiary-hover"
                  )}
                  onClick={() => setStatusFilter('development')}
                >
                  <Flask weight="fill" className="w-3 h-3" />
                  Dev ({developmentCount})
                </Badge>
              </div>
            </div>

            {/* Workflow List */}
            <div className="flex-1 overflow-y-auto">
              {filteredWorkflows.map(workflow => {
                const TriggerIcon = triggerIcons[workflow.triggerType];
                const isSelected = selectedWorkflow?.id === workflow.id;

                return (
                  <button
                    key={workflow.id}
                    onClick={() => handleSelectWorkflow(isSelected ? null : workflow)}
                    className={cn(
                      'w-full text-left px-4 py-3 border-b border-[var(--neutral-4)] transition-colors',
                      isSelected
                        ? 'bg-[var(--brand-peat)]/10'
                        : 'hover:bg-[var(--neutral-2)]'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'w-2 h-2 rounded-full shrink-0',
                              workflow.status === 'active' ? 'bg-[var(--green-9)]' :
                              workflow.status === 'inactive' ? 'bg-[var(--neutral-8)]' :
                              workflow.status === 'development' ? 'bg-[var(--amber-9)]' :
                              'bg-[var(--amber-9)]'
                            )}
                          />
                          <span className="text-sm font-medium text-[var(--neutral-12)] truncate">
                            {workflow.name}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--neutral-10)] mt-1 line-clamp-2">
                          {workflow.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-[10px] text-[var(--neutral-9)] font-mono">
                            <TriggerIcon weight="regular" className="w-3 h-3" />
                            {workflow.triggerType}
                          </span>
                          {workflow.calls.length > 0 && (
                            <span className="flex items-center gap-1 text-[10px] text-[var(--neutral-9)]">
                              <ArrowRight weight="bold" className="w-3 h-3" />
                              {workflow.calls.length}
                            </span>
                          )}
                          {workflow.calledBy.length > 0 && (
                            <span className="flex items-center gap-1 text-[10px] text-[var(--neutral-9)]">
                              {workflow.calledBy.length}
                              <ArrowRight weight="bold" className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                      {workflow.status !== 'active' && (
                        <Badge
                          variant={statusVariant[workflow.status]}
                          className="text-[10px] shrink-0"
                        >
                          {workflow.status === 'development' ? 'dev' : workflow.status}
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Main Canvas - React Flow Graph */}
      <div className="flex-1 relative bg-bg-white animate-in fade-in zoom-in-95 duration-500 delay-100">
        <ReactFlow
          nodes={nodesWithSelection}
          edges={edgesWithHighlight}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={1.5}
          panOnScroll
          panOnScrollMode={PanOnScrollMode.Free}
          defaultEdgeOptions={{
            type: 'smoothstep',
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            color="var(--neutral-6)"
            gap={16}
            size={1}
          />
          <Controls
            showInteractive={false}
            className="!bg-[var(--neutral-1)] !border-[var(--neutral-6)] !shadow-lg [&>button]:!bg-[var(--neutral-1)] [&>button]:!border-[var(--neutral-5)] [&>button]:hover:!bg-[var(--neutral-3)] [&>button>svg]:!fill-[var(--neutral-11)]"
          />
          <Panel position="top-left" className="!m-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--neutral-1)] border border-[var(--neutral-6)] rounded-md shadow-sm">
              <Database weight="duotone" className="w-4 h-4 text-[var(--neutral-10)]" />
              <span className="text-xs font-mono text-[var(--neutral-10)] uppercase tracking-wider">
                Workflow Relationships
              </span>
            </div>
          </Panel>
          <Panel position="top-right" className="!m-4">
            <ButtonV2 variant="outline" size="icon" asChild>
              <Link href="/workflows" title="Close visualizer">
                <X weight="bold" className="w-4 h-4" />
              </Link>
            </ButtonV2>
          </Panel>
        </ReactFlow>

        {/* Floating Workflow Detail Panel */}
        {selectedWorkflow && (
          <div className="absolute top-[56px] right-2 bottom-2 w-[360px] flex flex-col bg-[var(--neutral-1)] rounded-lg shadow-[-12px_0_32px_-8px_rgba(0,0,0,0.12)] overflow-hidden animate-in slide-in-from-right-4 duration-200">
            {/* Detail Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--neutral-5)]">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'w-2.5 h-2.5 rounded-full',
                    selectedWorkflow.status === 'active' ? 'bg-[var(--green-9)]' :
                    selectedWorkflow.status === 'inactive' ? 'bg-[var(--neutral-8)]' :
                    selectedWorkflow.status === 'development' ? 'bg-[var(--amber-9)]' :
                    'bg-[var(--amber-9)]'
                  )}
                />
                <span className="text-base font-semibold text-[var(--neutral-12)]">
                  {selectedWorkflow.name}
                </span>
                {selectedWorkflow.status === 'development' && (
                  <Badge variant="outline" className="text-[10px]">
                    <Flask weight="fill" className="w-3 h-3 mr-1" />
                    dev
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedWorkflow(null)}
                className="!size-7"
              >
                <X weight="bold" className="w-4 h-4" />
              </Button>
            </div>

            {/* Detail Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Description */}
              <div>
                <p className="text-sm text-[var(--neutral-11)] leading-relaxed">
                  {selectedWorkflow.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-md bg-bg-white border border-border-tertiary">
                  <div className="text-[10px] font-mono text-[var(--neutral-9)] uppercase tracking-wider mb-1">
                    Total Runs
                  </div>
                  <div className="text-lg font-semibold text-[var(--neutral-12)]">
                    {selectedWorkflow.runCount.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-md bg-bg-white border border-border-tertiary">
                  <div className="text-[10px] font-mono text-[var(--neutral-9)] uppercase tracking-wider mb-1">
                    Avg Duration
                  </div>
                  <div className="text-lg font-semibold text-[var(--neutral-12)]">
                    {selectedWorkflow.avgDuration ? formatDuration(selectedWorkflow.avgDuration) : '—'}
                  </div>
                </div>
              </div>

              {/* Trigger */}
              <div>
                <div className="text-[10px] font-mono text-[var(--neutral-9)] uppercase tracking-wider mb-2">
                  Trigger
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-bg-white border border-border-tertiary">
                  {(() => {
                    const TriggerIcon = triggerIcons[selectedWorkflow.triggerType];
                    return <TriggerIcon weight="duotone" className="w-4 h-4 text-[var(--neutral-11)]" />;
                  })()}
                  <span className="text-sm text-[var(--neutral-12)] capitalize">
                    {selectedWorkflow.triggerType}
                  </span>
                  {selectedWorkflow.triggerConfig?.schedule && (
                    <code className="ml-auto text-xs font-mono text-[var(--neutral-10)] bg-[var(--neutral-4)] px-1.5 py-0.5 rounded">
                      {selectedWorkflow.triggerConfig.schedule}
                    </code>
                  )}
                </div>
              </div>

              {/* Inputs */}
              {selectedWorkflow.inputs.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono text-[var(--neutral-9)] uppercase tracking-wider mb-2">
                    Inputs ({selectedWorkflow.inputs.length})
                  </div>
                  {/* Search for inputs when 10+ */}
                  {selectedWorkflow.inputs.length >= 10 && (
                    <div className="relative mb-2">
                      <MagnifyingGlass
                        weight="regular"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-icon-secondary pointer-events-none z-10"
                      />
                      <Input
                        type="text"
                        value={inputSearchValue}
                        onChange={e => setInputSearchValue(e.target.value)}
                        placeholder="Search inputs..."
                        className="!pl-7 !pr-7 !py-1.5 !text-xs"
                      />
                      {inputSearchValue && (
                        <button
                          onClick={() => setInputSearchValue('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-bg-tertiary-hover z-10"
                        >
                          <X weight="bold" className="w-3 h-3 text-icon-secondary" />
                        </button>
                      )}
                    </div>
                  )}
                  <div className={cn(
                    'space-y-1',
                    selectedWorkflow.inputs.length >= 10 && 'max-h-[240px] overflow-y-auto'
                  )}>
                    {selectedWorkflow.inputs
                      .filter(input =>
                        !inputSearchValue ||
                        input.name.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
                        input.type.toLowerCase().includes(inputSearchValue.toLowerCase())
                      )
                      .map(input => (
                        <div
                          key={input.name}
                          className="flex items-center justify-between p-2 rounded-md bg-bg-white border border-border-tertiary"
                        >
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono text-[var(--neutral-12)]">
                              {input.name}
                            </code>
                            {input.required && (
                              <span className="text-[9px] text-[var(--red-9)]">*</span>
                            )}
                          </div>
                          <code className={cn('text-[10px] font-mono', typeColors[input.type] || 'text-[var(--neutral-10)]')}>
                            {input.type}
                          </code>
                        </div>
                      ))}
                    {inputSearchValue && selectedWorkflow.inputs.filter(input =>
                      input.name.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
                      input.type.toLowerCase().includes(inputSearchValue.toLowerCase())
                    ).length === 0 && (
                      <div className="text-xs text-[var(--neutral-9)] text-center py-3">
                        No inputs matching "{inputSearchValue}"
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Calls (downstream) */}
              {selectedWorkflow.calls.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono text-[var(--neutral-9)] uppercase tracking-wider mb-2">
                    Calls ({selectedWorkflow.calls.length})
                  </div>
                  <div className="space-y-1">
                    {selectedWorkflow.calls.map(call => {
                      const target = mockWorkflows.find(w => w.id === call.targetWorkflowId);
                      return (
                        <button
                          key={call.targetWorkflowId}
                          onClick={() => target && handleSelectWorkflow(target)}
                          className="w-full flex items-center gap-2 p-2 rounded-md bg-bg-white border border-border-tertiary hover:border-[var(--neutral-7)] transition-colors text-left"
                        >
                          <ArrowRight weight="bold" className="w-3 h-3 text-[var(--brand-terracotta)]" />
                          <span className="text-sm text-[var(--neutral-12)]">
                            {target?.name || call.targetWorkflowId}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Called By (upstream) */}
              {selectedWorkflow.calledBy.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono text-[var(--neutral-9)] uppercase tracking-wider mb-2">
                    Called By ({selectedWorkflow.calledBy.length})
                  </div>
                  <div className="space-y-1">
                    {selectedWorkflow.calledBy.map(callerId => {
                      const caller = mockWorkflows.find(w => w.id === callerId);
                      return (
                        <button
                          key={callerId}
                          onClick={() => caller && handleSelectWorkflow(caller)}
                          className="w-full flex items-center gap-2 p-2 rounded-md bg-bg-white border border-border-tertiary hover:border-[var(--neutral-7)] transition-colors text-left"
                        >
                          <ArrowRight weight="bold" className="w-3 h-3 text-[var(--neutral-9)] rotate-180" />
                          <span className="text-sm text-[var(--neutral-12)]">
                            {caller?.name || callerId}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedWorkflow.tags.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono text-[var(--neutral-9)] uppercase tracking-wider mb-2">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWorkflow.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Last Run */}
              {selectedWorkflow.lastRun && (
                <div className="flex items-center gap-2 text-xs text-[var(--neutral-10)]">
                  <Clock weight="regular" className="w-3.5 h-3.5" />
                  Last run {formatRelativeTime(selectedWorkflow.lastRun)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorkflowsPage() {
  return (
    <ReactFlowProvider>
      <WorkflowsPageContent />
    </ReactFlowProvider>
  );
}
