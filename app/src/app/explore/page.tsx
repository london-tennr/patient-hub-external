'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlass, SquareHalf, FunnelSimple, X } from '@phosphor-icons/react';
import { DataTableViewOptions } from '@tennr/lasso/data-table';
import { FilterGroup, type FilterCategoryType, type FilterState } from '@tennr/lasso/filter-group';
import { usePatientsTable, PatientsTableContent, type OnFilterBy } from '@/components/patient/patients-table';
import { STATUS_CATEGORY_MAP, type StatusCategory } from '@/components/patient/patient-status-bar';
import { WorkflowSheet } from '@/components/patient/workflow-sheet';
import { mockPatients } from '@/data/mock-patients';
import type { Patient, PatientStatus } from '@/types/patient';
import { cn } from '@tennr/lasso/utils/cn';

const tabConfigs: { id: StatusCategory; label: string; badge: string; icon: string; iconEl: React.ReactNode }[] = [
  {
    id: 'action_required',
    label: 'Action Required',
    badge: 'bg-amber-100 text-amber-700',
    icon: 'text-amber-500',
    iconEl: (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
    ),
  },
  {
    id: 'on_track',
    label: 'Processing',
    badge: 'bg-blue-100 text-blue-700',
    icon: 'text-blue-500',
    iconEl: (
      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
    ),
  },
  {
    id: 'blocked',
    label: 'Blocked',
    badge: 'bg-red-100 text-red-700',
    icon: 'text-red-500',
    iconEl: (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round"/>
        <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// Filter categories for the patients table
const patientFilterCategories: FilterCategoryType[] = [
  {
    id: 'status',
    label: 'Status',
    variant: 'command',
    childVariant: 'checkbox',
    values: [
      { id: 'on_track', label: 'On Track' },
      { id: 'missing_info', label: 'Missing Info' },
      { id: 'needs_attention', label: 'Action Required' },
      { id: 'blocked', label: 'Blocked' },
      { id: 'completed', label: 'Completed' },
      { id: 'inactive', label: 'Inactive' },
    ],
  },
  {
    id: 'priority',
    label: 'Priority',
    variant: 'command',
    childVariant: 'checkbox',
    values: [
      { id: 'p0', label: 'P0' },
      { id: 'p1', label: 'P1' },
      { id: 'p2', label: 'P2' },
      { id: 'p3', label: 'P3' },
      { id: 'p4', label: 'P4' },
      { id: 'p5', label: 'P5' },
      { id: 'p6', label: 'P6' },
      { id: 'p7', label: 'P7' },
      { id: 'p8', label: 'P8' },
    ],
  },
  {
    id: 'stage',
    label: 'Stage',
    variant: 'command',
    childVariant: 'checkbox',
    values: [
      { id: 'referral_received', label: 'Referral Received' },
      { id: 'intake_review', label: 'Intake Review' },
      { id: 'insurance_verification', label: 'Insurance Verification' },
      { id: 'prior_authorization', label: 'Prior Authorization' },
      { id: 'scheduling', label: 'Scheduling' },
      { id: 'ready_for_claim', label: 'Ready for Claim' },
      { id: 'claim_submitted', label: 'Claim Submitted' },
    ],
  },
  {
    id: 'tennrStatus',
    label: 'Tennr Status',
    variant: 'command',
    childVariant: 'checkbox',
    values: [
      { id: 'in_queue', label: 'In Queue' },
      { id: 'processing', label: 'Processing' },
      { id: 'completed', label: 'Completed' },
      { id: 'idle', label: 'Idle' },
    ],
  },
  {
    id: 'lastUpdated',
    label: 'Last Updated',
    variant: 'command',
    childVariant: 'command',
    values: [
      { id: 'today', label: 'Today' },
      { id: 'past_week', label: 'Past 7 days' },
      { id: 'past_month', label: 'Past 30 days' },
      { id: 'older', label: 'Older than 30 days' },
    ],
  },
  {
    id: 'ehrSystem',
    label: 'EHR System',
    variant: 'command',
    childVariant: 'command',
    values: [
      { id: 'BrightTree', label: 'BrightTree' },
      { id: 'WeInfuse', label: 'WeInfuse' },
      { id: 'Niko', label: 'Niko' },
    ],
  },
];

export default function ExploreMvpPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [filterState, setFilterState] = useState<FilterState>([]);
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<StatusCategory | null>(null);
  const [workflowPatient, setWorkflowPatient] = useState<Patient | null>(null);
  const [workflowActionId, setWorkflowActionId] = useState<string | null>(null);

  const statusCounts = useMemo(() => {
    const counts: Record<PatientStatus, number> = {
      on_track: 0,
      missing_info: 0,
      needs_attention: 0,
      blocked: 0,
      completed: 0,
      inactive: 0,
    };
    for (const patient of mockPatients) {
      counts[patient.status]++;
    }
    return counts;
  }, []);

  const filteredPatients = useMemo(() => {
    let result = mockPatients;

    // Apply category filter
    if (activeCategory) {
      const allowedStatuses = STATUS_CATEGORY_MAP[activeCategory];
      result = result.filter((patient) => allowedStatuses.includes(patient.status));
    }

    // Apply search filter across all fields
    if (searchValue.trim()) {
      const query = searchValue.toLowerCase();
      result = result.filter((patient) => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        return (
          fullName.includes(query) ||
          patient.dob.includes(query) ||
          patient.mrn.toLowerCase().includes(query) ||
          patient.patientId.toLowerCase().includes(query) ||
          patient.id.toLowerCase().includes(query)
        );
      });
    }

    // Apply FilterGroup filters
    for (const filterInstance of filterState) {
      if (!filterInstance.value) continue;
      const val = filterInstance.value;

      switch (filterInstance.filterId) {
        case 'status':
          if (Array.isArray(val) && val.length > 0) {
            result = result.filter((p) => (val as string[]).includes(p.status));
          }
          break;
        case 'priority':
          if (Array.isArray(val) && val.length > 0) {
            result = result.filter((p) => (val as string[]).includes(p.priority));
          }
          break;
        case 'stage':
          if (Array.isArray(val) && val.length > 0) {
            result = result.filter((p) => (val as string[]).includes(p.stage));
          }
          break;
        case 'tennrStatus':
          if (Array.isArray(val) && val.length > 0) {
            result = result.filter((p) => (val as string[]).includes(p.tennrStatus));
          }
          break;
        case 'lastUpdated':
          if (typeof val === 'string') {
            const now = new Date();
            result = result.filter((p) => {
              const synced = new Date(p.syncStatus.lastSynced);
              const diffDays = Math.floor((now.getTime() - synced.getTime()) / (1000 * 60 * 60 * 24));
              switch (val) {
                case 'today': return diffDays === 0;
                case 'past_week': return diffDays <= 7;
                case 'past_month': return diffDays <= 30;
                case 'older': return diffDays > 30;
                default: return true;
              }
            });
          }
          break;
        case 'ehrSystem':
          if (typeof val === 'string') {
            result = result.filter((p) => p.syncStatus.ehrSystem === val);
          }
          break;
      }
    }

    return result;
  }, [searchValue, filterState, activeCategory]);

  // Checkbox-style filters use arrays; clicking a cell value toggles it in the filter
  const handleFilterBy = useCallback<OnFilterBy>((filterId, value) => {
    setIsFilterRowVisible(true);
    setFilterState((prev) => {
      const existing = prev.find((f) => f.filterId === filterId);

      // For filters that use checkbox (array) values
      const checkboxFilters = ['status', 'priority', 'stage', 'tennrStatus'];
      if (checkboxFilters.includes(filterId)) {
        if (existing && Array.isArray(existing.value)) {
          const arr = existing.value as string[];
          if (arr.includes(value)) {
            // Already filtered by this value — remove it
            const next = arr.filter((v) => v !== value);
            if (next.length === 0) {
              return prev.filter((f) => f.filterId !== filterId);
            }
            return prev.map((f) => (f.filterId === filterId ? { ...f, value: next } : f));
          }
          // Add value to existing filter
          return prev.map((f) => (f.filterId === filterId ? { ...f, value: [...arr, value] } : f));
        }
        // Create new filter with this value
        return [...prev, { id: crypto.randomUUID(), filterId, value: [value] }];
      }

      // For command (single-value) filters
      if (existing && existing.value === value) {
        return prev.filter((f) => f.filterId !== filterId);
      }
      if (existing) {
        return prev.map((f) => (f.filterId === filterId ? { ...f, value } : f));
      }
      return [...prev, { id: crypto.randomUUID(), filterId, value }];
    });
  }, []);

  const handleOpenWorkflow = useCallback((patient: Patient, actionId?: string) => {
    setWorkflowPatient(patient);
    setWorkflowActionId(actionId ?? null);
  }, []);

  const table = usePatientsTable(filteredPatients, handleFilterBy, undefined, undefined, undefined, handleOpenWorkflow);

  const handlePatientClick = (patient: Patient) => {
    router.push(`/patients/${patient.id}?from=explore-mvp`);
  };

  const handleClearFilters = () => {
    setFilterState([]);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-full px-6 py-8">
      <div className="flex flex-col w-full max-w-[1600px] gap-10">
        {/* Page Title */}
        <div className="flex flex-col gap-1">
          <h1 className="font-display font-light text-5xl text-foreground">Patient Hub</h1>
          <p className="text-sm text-text-secondary">
            Total <span className="font-semibold text-text-primary">{mockPatients.length} patients</span>
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-0 border-b border-border-secondary">
            {/* All tab */}
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'relative px-3 py-2 text-sm transition-colors cursor-pointer',
                'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:rounded-full',
                activeCategory === null
                  ? 'text-foreground font-medium after:bg-brand-terracotta'
                  : 'text-muted-foreground font-normal hover:text-foreground after:bg-transparent'
              )}
            >
              Patients ({mockPatients.length})
            </button>

            {tabConfigs.map((cat) => {
              const count = STATUS_CATEGORY_MAP[cat.id].reduce(
                (sum, s) => sum + statusCounts[s],
                0
              );
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  className={cn(
                    'relative px-3 py-2 text-sm transition-colors cursor-pointer',
                    'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:rounded-full',
                    isActive
                      ? 'text-foreground font-medium after:bg-brand-terracotta'
                      : 'text-muted-foreground font-normal hover:text-foreground after:bg-transparent'
                  )}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Table Container */}
          <div className="flex flex-col w-full border border-border-secondary rounded-md overflow-hidden bg-white shadow-xs">
            {/* Index Filter Top Bar */}
            <div className="flex flex-col w-full border-b border-border">
              <div className="flex items-center w-full p-2 gap-4 bg-white">
                <div className="flex-1 flex items-center h-full gap-2">
                  {/* Search Input */}
                  <div className="bg-neutral-2 flex items-center gap-1 px-3 py-1 rounded-sm shadow-xs flex-1 h-8">
                    <div className="size-4 shrink-0 flex items-center justify-center">
                      <MagnifyingGlass weight="regular" className="text-muted-foreground w-full h-full" />
                    </div>
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search by patient name, date of birth, or MRN"
                      className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground font-body h-full leading-[20px]"
                    />
                    {searchValue.length > 0 && (
                      <button
                        onClick={() => setSearchValue('')}
                        className="size-4 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-3 transition-colors"
                        aria-label="Clear search"
                      >
                        <X weight="bold" className="size-3 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Filters Bar */}
              {isFilterRowVisible && (
                <div className="flex items-center gap-2 px-2 py-1.5 bg-white border-t border-border min-h-11">
                  <FilterGroup
                    filters={patientFilterCategories}
                    state={filterState}
                    onChange={setFilterState}
                    onClearAll={handleClearFilters}
                  />
                </div>
              )}
            </div>

            {/* Patients Table */}
            <PatientsTableContent table={table} onPatientClick={handlePatientClick} />
          </div>
        </div>
      </div>

      <WorkflowSheet
        patient={workflowPatient}
        open={!!workflowPatient}
        onOpenChange={(open) => { if (!open) { setWorkflowPatient(null); setWorkflowActionId(null); } }}
        actionId={workflowActionId}
      />
    </div>
  );
}
