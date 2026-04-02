'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  TreeStructure,
  Clock,
  User,
  Calendar,
  GitBranch,
  Eye,
  EyeSlash,
  Pencil,
  Play,
  Pause,
} from '@phosphor-icons/react';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import { Badge } from '@tennr/lasso/badge';
import { Avatar, AvatarFallback } from '@tennr/lasso/avatar';
import { Separator } from '@tennr/lasso/separator';
import { cn } from '@tennr/lasso/utils/cn';

// Mock workflow data - in a real app this would come from an API
const mockWorkflowDetails: Record<string, {
  id: string;
  name: string;
  version: string;
  description: string;
  visibility: 'visible' | 'invisible' | 'development';
  status: 'active' | 'paused';
  author: { name: string; initials: string };
  deployedAt: string;
  createdAt: string;
  lastRun: string;
  runCount: number;
  avgDuration: number;
}> = {
  'wf-1': {
    id: 'wf-1',
    name: 'Qualification',
    version: 'v3.0',
    description: 'Handles patient qualification workflows including insurance verification, eligibility checks, and approval routing.',
    visibility: 'visible',
    status: 'active',
    author: { name: 'Spencer Paul', initials: 'SP' },
    deployedAt: '2025-04-23T14:32:00Z',
    createdAt: '2024-11-15T10:00:00Z',
    lastRun: '2025-08-10T15:45:00Z',
    runCount: 12847,
    avgDuration: 2400,
  },
  'wf-2': {
    id: 'wf-2',
    name: 'Qual V3',
    version: 'v1.2',
    description: 'Updated qualification workflow with enhanced validation rules and automated routing.',
    visibility: 'visible',
    status: 'active',
    author: { name: 'Katie Pelton', initials: 'KP' },
    deployedAt: '2025-08-08T10:08:00Z',
    createdAt: '2025-06-01T09:00:00Z',
    lastRun: '2025-08-10T14:22:00Z',
    runCount: 3421,
    avgDuration: 1800,
  },
  'wf-3': {
    id: 'wf-3',
    name: 'Test ICD Extraction',
    version: 'v1.0',
    description: 'Extracts ICD codes from clinical documents using pattern matching and ML models.',
    visibility: 'invisible',
    status: 'paused',
    author: { name: 'Jackie J', initials: 'JJ' },
    deployedAt: '2025-04-11T17:51:00Z',
    createdAt: '2025-03-20T11:00:00Z',
    lastRun: '2025-05-01T09:00:00Z',
    runCount: 892,
    avgDuration: 4500,
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' at ' + date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

export default function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const workflow = mockWorkflowDetails[id];

  if (!workflow) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-full px-6 py-16">
        <h2 className="text-xl font-semibold text-[var(--neutral-12)] mb-2">
          Workflow Not Found
        </h2>
        <p className="text-sm text-[var(--neutral-10)] mb-4">
          The workflow you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <ButtonV2 asChild variant="outline">
          <Link href="/workflows">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workflows
          </Link>
        </ButtonV2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-full px-6 py-8">
      <div className="flex flex-col w-full max-w-[1200px] gap-6">
        {/* Back Link */}
        <Link
          href="/workflows"
          className="flex items-center gap-2 text-sm text-[var(--neutral-10)] hover:text-[var(--neutral-12)] transition-colors w-fit"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
          Back to Workflows
        </Link>

        {/* Page Header */}
        <div className="flex items-start justify-between w-full">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="font-display font-light text-4xl text-foreground">
                {workflow.name}
              </h1>
              <Badge variant="outline" className="text-sm">
                {workflow.version}
              </Badge>
              <Badge
                variant={workflow.status === 'active' ? 'default' : 'secondary'}
                className="text-sm"
              >
                {workflow.status === 'active' ? (
                  <>
                    <Play weight="fill" className="w-3 h-3 mr-1" />
                    Active
                  </>
                ) : (
                  <>
                    <Pause weight="fill" className="w-3 h-3 mr-1" />
                    Paused
                  </>
                )}
              </Badge>
            </div>
            <p className="text-[var(--neutral-10)] max-w-2xl">
              {workflow.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ButtonV2 variant="outline" asChild>
              <Link href="/workflows/visualizer">
                <TreeStructure weight="bold" className="w-4 h-4 mr-2" />
                View Relationships
              </Link>
            </ButtonV2>
            <ButtonV2 variant="primary">
              <Pencil weight="bold" className="w-4 h-4 mr-2" />
              Edit Workflow
            </ButtonV2>
          </div>
        </div>

        <Separator />

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[var(--neutral-2)] border border-[var(--neutral-5)]">
            <div className="flex items-center gap-2 text-[var(--neutral-10)] mb-2">
              <Clock weight="regular" className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Last Run</span>
            </div>
            <div className="text-lg font-semibold text-[var(--neutral-12)]">
              {formatDateTime(workflow.lastRun)}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--neutral-2)] border border-[var(--neutral-5)]">
            <div className="flex items-center gap-2 text-[var(--neutral-10)] mb-2">
              <GitBranch weight="regular" className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Total Runs</span>
            </div>
            <div className="text-lg font-semibold text-[var(--neutral-12)]">
              {workflow.runCount.toLocaleString()}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--neutral-2)] border border-[var(--neutral-5)]">
            <div className="flex items-center gap-2 text-[var(--neutral-10)] mb-2">
              <Clock weight="regular" className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Avg Duration</span>
            </div>
            <div className="text-lg font-semibold text-[var(--neutral-12)]">
              {formatDuration(workflow.avgDuration)}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--neutral-2)] border border-[var(--neutral-5)]">
            <div className="flex items-center gap-2 text-[var(--neutral-10)] mb-2">
              {workflow.visibility === 'visible' ? (
                <Eye weight="regular" className="w-4 h-4" />
              ) : (
                <EyeSlash weight="regular" className="w-4 h-4" />
              )}
              <span className="text-xs font-mono uppercase tracking-wider">Visibility</span>
            </div>
            <div className="text-lg font-semibold text-[var(--neutral-12)] capitalize">
              {workflow.visibility}
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-5 rounded-lg bg-[var(--neutral-1)] border border-[var(--neutral-5)]">
            <h3 className="text-sm font-semibold text-[var(--neutral-12)] mb-4">Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--neutral-10)]">Author</span>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-[10px] bg-[var(--neutral-6)] text-[var(--neutral-11)]">
                      {workflow.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-[var(--neutral-12)]">
                    {workflow.author.name}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--neutral-10)]">Created</span>
                <span className="text-sm text-[var(--neutral-12)]">
                  {formatDate(workflow.createdAt)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--neutral-10)]">Deployed</span>
                <span className="text-sm text-[var(--neutral-12)]">
                  {formatDateTime(workflow.deployedAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[var(--neutral-1)] border border-[var(--neutral-5)]">
            <h3 className="text-sm font-semibold text-[var(--neutral-12)] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <ButtonV2 variant="outline" className="justify-start" asChild>
                <Link href="/workflows/visualizer">
                  <TreeStructure weight="bold" className="w-4 h-4 mr-2" />
                  View Relationships
                </Link>
              </ButtonV2>
              <ButtonV2 variant="outline" className="justify-start">
                <Clock weight="bold" className="w-4 h-4 mr-2" />
                View Run History
              </ButtonV2>
              <ButtonV2 variant="outline" className="justify-start">
                <GitBranch weight="bold" className="w-4 h-4 mr-2" />
                View Versions
              </ButtonV2>
              <ButtonV2 variant="outline" className="justify-start">
                <Pencil weight="bold" className="w-4 h-4 mr-2" />
                Edit Configuration
              </ButtonV2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
