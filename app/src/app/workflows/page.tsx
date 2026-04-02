'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  EyeSlash,
  DotsSixVertical,
  DotsThreeVertical,
  Plus,
  Pencil,
  Minus,
  TreeStructure,
  Upload,
} from '@phosphor-icons/react';
import { Button } from '@tennr/lasso/button';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import { Tabs, TabsList, TabsTrigger } from '@tennr/lasso/tabs';
import { Avatar, AvatarFallback } from '@tennr/lasso/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tennr/lasso/dropdown-menu';
import { cn } from '@tennr/lasso/utils/cn';

type WorkflowVisibility = 'visible' | 'invisible' | 'development';

interface WorkflowVersion {
  id: string;
  name: string;
  version: string;
  visibility: WorkflowVisibility;
  author: {
    name: string;
    initials: string;
  };
  deployedAt: string;
  stats: {
    added: number;
    modified: number;
    removed: number;
  };
}

const mockWorkflowVersions: WorkflowVersion[] = [
  {
    id: 'wf-1',
    name: 'Qualification',
    version: 'v3.0',
    visibility: 'visible',
    author: { name: 'Spencer Paul', initials: 'SP' },
    deployedAt: '2025-04-23T14:32:00Z',
    stats: { added: 0, modified: 3, removed: 1 },
  },
  {
    id: 'wf-2',
    name: 'Qual V3',
    version: 'v1.2',
    visibility: 'visible',
    author: { name: 'Katie Pelton', initials: 'KP' },
    deployedAt: '2025-08-08T10:08:00Z',
    stats: { added: 4, modified: 2, removed: 1 },
  },
  {
    id: 'wf-3',
    name: 'Test ICD Extraction',
    version: 'v1.0',
    visibility: 'invisible',
    author: { name: 'Jackie J', initials: 'JJ' },
    deployedAt: '2025-04-11T17:51:00Z',
    stats: { added: 3, modified: 2, removed: 0 },
  },
  {
    id: 'wf-4',
    name: 'Qual Testing',
    version: 'v1.0',
    visibility: 'development',
    author: { name: 'Jackie J', initials: 'JJ' },
    deployedAt: '2025-04-21T12:56:00Z',
    stats: { added: 0, modified: 0, removed: 0 },
  },
  {
    id: 'wf-5',
    name: 'Qual Demo Insurance',
    version: 'v1.0',
    visibility: 'development',
    author: { name: 'Spencer Paul', initials: 'SP' },
    deployedAt: '2025-06-13T13:47:00Z',
    stats: { added: 0, modified: 0, removed: 0 },
  },
  {
    id: 'wf-6',
    name: 'Prior Auth Workflow',
    version: 'v2.1',
    visibility: 'visible',
    author: { name: 'Alex Apple', initials: 'AA' },
    deployedAt: '2025-07-15T09:22:00Z',
    stats: { added: 2, modified: 5, removed: 0 },
  },
  {
    id: 'wf-7',
    name: 'Patient Intake',
    version: 'v4.0',
    visibility: 'visible',
    author: { name: 'Katie Pelton', initials: 'KP' },
    deployedAt: '2025-08-01T11:30:00Z',
    stats: { added: 1, modified: 2, removed: 3 },
  },
];

function formatDeployDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }) + ' at ' + date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

interface WorkflowCardProps {
  workflow: WorkflowVersion;
  showDragHandle?: boolean;
}

function WorkflowCard({ workflow, showDragHandle = true }: WorkflowCardProps) {
  const hasStats = workflow.stats.added > 0 || workflow.stats.modified > 0 || workflow.stats.removed > 0;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[var(--neutral-1)] border border-[var(--neutral-5)] rounded-md group hover:border-[var(--neutral-7)] transition-colors">
      {showDragHandle && (
        <button className="p-1 -ml-2 cursor-grab text-[var(--neutral-8)] hover:text-[var(--neutral-10)] transition-colors">
          <DotsSixVertical weight="bold" className="w-4 h-4" />
        </button>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/workflows/${workflow.id}`}
            className="text-base font-semibold text-[var(--neutral-12)] hover:underline"
          >
            {workflow.name}
          </Link>
          <span className="text-sm text-[var(--neutral-9)]">{workflow.version}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <Avatar className="w-5 h-5">
            <AvatarFallback className="text-[9px] bg-[var(--neutral-6)] text-[var(--neutral-11)]">
              {workflow.author.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-[var(--neutral-11)]">
            {workflow.author.name}
          </span>
          <span className="text-sm text-[var(--neutral-9)]">
            deployed on {formatDeployDate(workflow.deployedAt)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex items-center gap-0.5 text-sm',
              workflow.stats.added > 0
                ? 'text-[var(--green-11)]'
                : 'text-[var(--neutral-8)]'
            )}
          >
            +&nbsp;{workflow.stats.added}
          </span>
          <span
            className={cn(
              'flex items-center gap-1 px-1.5 py-0.5 rounded text-sm',
              workflow.stats.modified > 0
                ? 'bg-[var(--amber-3)] text-[var(--amber-11)]'
                : 'text-[var(--neutral-8)]'
            )}
          >
            <Pencil weight="fill" className="w-3.5 h-3.5" />
            {workflow.stats.modified}
          </span>
          <span
            className={cn(
              'flex items-center gap-0.5 text-sm',
              workflow.stats.removed > 0
                ? 'text-[var(--red-11)]'
                : 'text-[var(--neutral-8)]'
            )}
          >
            —&nbsp;{workflow.stats.removed}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="!size-7">
              <DotsThreeVertical weight="bold" className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/workflows/${workflow.id}`}>
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/workflows/visualizer">
                <TreeStructure className="w-4 h-4 mr-2" />
                View Relationships
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Workflow</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[var(--red-11)]">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

interface WorkflowGroupProps {
  title: string;
  icon?: React.ReactNode;
  workflows: WorkflowVersion[];
  showDragHandle?: boolean;
}

function WorkflowGroup({ title, icon, workflows, showDragHandle = true }: WorkflowGroupProps) {
  if (workflows.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        {icon}
        <h3 className="text-sm text-[var(--neutral-10)]">{title}</h3>
      </div>
      <div className="space-y-2">
        {workflows.map(workflow => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            showDragHandle={showDragHandle}
          />
        ))}
      </div>
    </div>
  );
}

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState('versions');

  const visibleWorkflows = mockWorkflowVersions.filter(w => w.visibility === 'visible');
  const invisibleWorkflows = mockWorkflowVersions.filter(w => w.visibility === 'invisible');
  const developmentWorkflows = mockWorkflowVersions.filter(w => w.visibility === 'development');

  return (
    <div className="flex flex-col items-center w-full min-h-full px-6 py-8">
      <div className="flex flex-col w-full max-w-[1200px] gap-6">
        {/* Page Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="font-display font-light text-5xl text-foreground">Workflows</h1>
          <div className="flex items-center gap-3">
            <ButtonV2 variant="outline" className="gap-2">
              <Upload weight="bold" className="w-4 h-4" />
              Import Worker
            </ButtonV2>
            <ButtonV2 variant="primary" className="gap-2">
              <Plus weight="bold" className="w-4 h-4" />
              New Worker
            </ButtonV2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList variant="line">
              <TabsTrigger variant="line" value="versions">
                Versions
              </TabsTrigger>
              <TabsTrigger variant="line" value="documentation">
                Documentation
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Link
            href="/workflows/visualizer"
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[var(--neutral-11)] hover:text-[var(--neutral-12)] hover:bg-[var(--neutral-4)] rounded-md transition-colors"
          >
            <TreeStructure weight="duotone" className="w-4 h-4" />
            View Relationships
          </Link>
        </div>

        {/* Content */}
        {activeTab === 'versions' && (
          <div className="space-y-8">
            <WorkflowGroup
              title="Visible"
              icon={<Eye weight="regular" className="w-4 h-4 text-[var(--neutral-10)]" />}
              workflows={visibleWorkflows}
            />

            <WorkflowGroup
              title="Invisible"
              icon={<EyeSlash weight="regular" className="w-4 h-4 text-[var(--neutral-10)]" />}
              workflows={invisibleWorkflows}
            />

            <WorkflowGroup
              title="In Development"
              workflows={developmentWorkflows}
              showDragHandle={false}
            />
          </div>
        )}

        {activeTab === 'documentation' && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--neutral-4)] flex items-center justify-center mb-4">
              <TreeStructure weight="duotone" className="w-6 h-6 text-[var(--neutral-9)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--neutral-12)] mb-2">
              Documentation Coming Soon
            </h3>
            <p className="text-sm text-[var(--neutral-10)] max-w-md">
              Workflow documentation will be available here. You&apos;ll be able to view and edit
              documentation for each workflow version.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
