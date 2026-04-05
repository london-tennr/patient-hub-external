'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlass, SquareHalf, FunnelSimple, X, CaretDown, XCircle } from '@phosphor-icons/react';
import { DataTableViewOptions } from '@tennr/lasso/data-table';
import { FilterGroup, type FilterCategoryType, type FilterState } from '@tennr/lasso/filter-group';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@tennr/lasso/tabs';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import { usePatientsTable, PatientsTableContent, type OnFilterBy, type OnStageClick, type OnPreviewPatient } from '@/components/patient/patients-table';
import { PatientStatusBar, STATUS_CATEGORY_MAP, type StatusCategory } from '@/components/patient/patient-status-bar';
import { useOrdersTable, OrdersTableContent } from '@/components/order/orders-table';
import { OrderStatusBar, type OrderStatusCategory } from '@/components/order/order-status-bar';
import { mockPatients } from '@/data/mock-patients';
import { mockOrders } from '@/data/mock-orders';
import type { Patient, PatientStatus, PatientPriority, PatientStage } from '@/types/patient';
import type { OrderStatus } from '@/types/order';
import { WorkflowSheet } from '@/components/patient/workflow-sheet';

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
      { id: 'needs_attention', label: 'Ready for Review' },
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

export default function PatientsPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [filterState, setFilterState] = useState<FilterState>([]);
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<StatusCategory | null>(null);

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

  const handleStageClick = useCallback<OnStageClick>((patientId, stage) => {
    router.push(`/patients/${patientId}?stage=${stage}`);
  }, [router]);

  // Patient preview sidebar
  const [previewPatient, setPreviewPatient] = useState<Patient | null>(null);
  const [expandedSections, setExpandedSections] = useState({ patient: true, insurance: true, data: true });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePreviewPatient = useCallback<OnPreviewPatient>((patient) => {
    setPreviewPatient(patient);
  }, []);

  // Workflow review overlay
  const [workflowPatient, setWorkflowPatient] = useState<Patient | null>(null);

  const handleOpenWorkflow = useCallback((patient: Patient) => {
    setWorkflowPatient(patient);
  }, []);

  const formatDateFull = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const table = usePatientsTable(filteredPatients, handleFilterBy, handleStageClick, 'stepper', handlePreviewPatient, handleOpenWorkflow);

  // Orders state
  const [orderSearchValue, setOrderSearchValue] = useState('');
  const [activeOrderCategory, setActiveOrderCategory] = useState<OrderStatusCategory | null>(null);

  const orderStatusCounts = useMemo(() => {
    const counts: Record<OrderStatus, number> = {
      on_track: 0,
      missing_info: 0,
      rejected: 0,
      completed: 0,
    };
    for (const order of mockOrders) {
      counts[order.status]++;
    }
    return counts;
  }, []);

  const filteredOrders = useMemo(() => {
    let result = mockOrders;

    if (activeOrderCategory) {
      result = result.filter((order) => order.status === activeOrderCategory);
    }

    if (orderSearchValue.trim()) {
      const query = orderSearchValue.toLowerCase();
      result = result.filter((order) =>
        order.patientName.toLowerCase().includes(query) ||
        order.orderType.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query)
      );
    }

    return result;
  }, [orderSearchValue, activeOrderCategory]);

  const ordersTable = useOrdersTable(filteredOrders);

  const handlePatientClick = (patient: Patient) => {
    router.push(`/patients/${patient.id}`);
  };

  const handleClearFilters = () => {
    setFilterState([]);
  };

  return (
    <div className="flex w-full min-h-full">
      {/* Main Content */}
      <div className={cn("flex flex-col items-center w-full min-h-full px-6 py-8 transition-all duration-300", previewPatient && "pr-0")}>
        <div className={cn("flex flex-col w-full gap-10 transition-all duration-300", previewPatient ? "max-w-[1280px]" : "max-w-[1600px]")}>
          {/* Page Title */}
          <div className="flex flex-col gap-1">
            <h1 className="font-display font-light text-5xl text-foreground">Explore v.1</h1>
            <p className="text-sm text-text-secondary">
              Total <span className="font-semibold text-text-primary">{mockPatients.length} patients</span> <span className="font-semibold text-text-primary">{mockOrders.length} orders</span>
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="patients" className="w-full flex flex-col gap-6">
            <TabsList variant="line">
              <TabsTrigger variant="line" value="patients">Patients</TabsTrigger>
              <TabsTrigger variant="line" value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="patients" className="flex flex-col gap-6 mt-0">
              {/* Status Filter Bar */}
              <PatientStatusBar
                statusCounts={statusCounts}
                totalCount={mockPatients.length}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

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
                          placeholder="Search by patient name, date of birth, MRN, internal ID, or Run ID"
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

                    {/* View Toggles */}
                    <div className="flex items-center gap-2">
                      <DataTableViewOptions
                        table={table}
                        trigger={
                          <button className="flex items-center justify-center size-7 rounded-full border border-border bg-white shadow-xs hover:bg-accent transition-colors">
                            <SquareHalf weight="regular" className="w-4 h-4 text-foreground" />
                          </button>
                        }
                      />
                      <button
                        onClick={() => setIsFilterRowVisible(!isFilterRowVisible)}
                        className={`flex items-center justify-center size-7 rounded-full border border-border bg-white shadow-xs hover:bg-accent transition-colors ${isFilterRowVisible ? 'bg-accent' : ''}`}
                      >
                        <FunnelSimple weight="regular" className="w-4 h-4 text-foreground" />
                      </button>
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
            </TabsContent>

            <TabsContent value="orders" className="flex flex-col gap-6 mt-0">
              {/* Order Status Filter Bar */}
              <OrderStatusBar
                statusCounts={orderStatusCounts}
                totalCount={mockOrders.length}
                activeCategory={activeOrderCategory}
                onCategoryChange={setActiveOrderCategory}
              />

              {/* Orders Table Container */}
              <div className="flex flex-col w-full border border-border-secondary rounded-md overflow-hidden bg-white shadow-xs">
                {/* Search Bar */}
                <div className="flex items-center w-full p-2 gap-4 bg-white border-b border-border">
                  <div className="flex-1 flex items-center h-full gap-2">
                    <div className="bg-neutral-2 flex items-center gap-1 px-3 py-1 rounded-sm shadow-xs flex-1 h-8">
                      <div className="size-4 shrink-0 flex items-center justify-center">
                        <MagnifyingGlass weight="regular" className="text-muted-foreground w-full h-full" />
                      </div>
                      <input
                        type="text"
                        value={orderSearchValue}
                        onChange={(e) => setOrderSearchValue(e.target.value)}
                        placeholder="Search"
                        className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground font-body h-full leading-[20px]"
                      />
                      {orderSearchValue.length > 0 && (
                        <button
                          onClick={() => setOrderSearchValue('')}
                          className="size-4 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-3 transition-colors"
                          aria-label="Clear search"
                        >
                          <X weight="bold" className="size-3 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Orders Table */}
                <OrdersTableContent table={ordersTable} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Patient Preview Sidebar */}
      {previewPatient && (
        <aside className="w-[340px] shrink-0 border-l border-border-secondary bg-bg-white h-screen sticky top-0 flex flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-secondary">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-medium text-text-primary truncate">{previewPatient.firstName} {previewPatient.lastName}</span>
              <span className="text-xs text-text-tertiary">MRN: {previewPatient.mrn}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => router.push(`/patients/${previewPatient.id}`)}
                className="text-xs text-text-secondary hover:text-text-primary hover:underline cursor-pointer px-2 py-1"
              >
                Open
              </button>
              <button
                onClick={() => setPreviewPatient(null)}
                className="flex items-center justify-center size-7 rounded-md hover:bg-bg-secondary transition-colors cursor-pointer"
              >
                <X weight="regular" className="size-4 text-text-tertiary" />
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Patient Section */}
            <div className="border-b border-border-secondary">
              <button
                onClick={() => toggleSection('patient')}
                className="flex items-center justify-between px-4 h-[40px] w-full hover:bg-bg-secondary/50 transition-colors"
              >
                <span className="text-base font-medium text-text-primary">Patient</span>
                <CaretDown className={cn(
                  "size-4 text-text-tertiary transition-transform duration-200",
                  !expandedSections.patient && "-rotate-90"
                )} />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  expandedSections.patient ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Contact</p>
                        <a href={`mailto:${previewPatient.email}`} className="text-sm text-brand-terracotta block leading-6">{previewPatient.email}</a>
                        <p className="text-sm text-text-primary leading-6">{previewPatient.phone}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Primary Address</p>
                        <p className="text-sm text-text-primary leading-5">{previewPatient.address.street}, {previewPatient.address.city}, {previewPatient.address.state} {previewPatient.address.zip}</p>
                      </div>
                      {previewPatient.deliveryAddress && (
                        <div>
                          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Delivery Address</p>
                          <p className="text-sm text-text-primary leading-5">{previewPatient.deliveryAddress.street}, {previewPatient.deliveryAddress.city}, {previewPatient.deliveryAddress.state} {previewPatient.deliveryAddress.zip}</p>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-border-secondary my-4" />
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">DOB</p>
                        <p className="text-sm text-text-primary leading-5">{formatDateFull(previewPatient.dob)}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Patient ID</p>
                        <p className="text-sm text-text-primary leading-5">{previewPatient.patientId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Section */}
            <div className="border-b border-border-secondary">
              <button
                onClick={() => toggleSection('insurance')}
                className="flex items-center justify-between px-4 h-[40px] w-full hover:bg-bg-secondary/50 transition-colors"
              >
                <span className="text-base font-medium text-text-primary">Insurance</span>
                <CaretDown className={cn(
                  "size-4 text-text-tertiary transition-transform duration-200",
                  !expandedSections.insurance && "-rotate-90"
                )} />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  expandedSections.insurance ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Primary</p>
                        <p className="text-sm font-medium text-text-primary leading-5">{previewPatient.primaryInsurance?.carrier ?? '—'}</p>
                        <p className="text-sm text-text-secondary leading-5">{previewPatient.primaryInsurance?.plan ?? ''}</p>
                      </div>
                      {previewPatient.primaryInsurance && (
                        <div>
                          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-2">Policy Info</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm leading-5">
                              <span className="text-text-secondary">Member ID</span>
                              <span className="text-text-primary">{previewPatient.primaryInsurance.memberId}</span>
                            </div>
                            <div className="flex justify-between text-sm leading-5">
                              <span className="text-text-secondary">Effective Date</span>
                              <span className="text-text-primary">{previewPatient.primaryInsurance.effectiveDate ? formatDateFull(previewPatient.primaryInsurance.effectiveDate) : '—'}</span>
                            </div>
                            <div className="flex justify-between text-sm leading-5 items-center">
                              <span className="text-text-secondary">Status</span>
                              <Badge variant="default" className="bg-bg-success-primary text-text-success-primary text-xs h-5">Active</Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {previewPatient.secondaryInsurance && (
                      <>
                        <div className="border-t border-border-secondary my-4" />
                        <div className="space-y-4">
                          <div>
                            <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Secondary</p>
                            <p className="text-sm font-medium text-text-primary leading-5">{previewPatient.secondaryInsurance.carrier}</p>
                            <p className="text-sm text-text-secondary leading-5">{previewPatient.secondaryInsurance.plan}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-2">Policy Info</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm leading-5">
                                <span className="text-text-secondary">Member ID</span>
                                <span className="text-text-primary">{previewPatient.secondaryInsurance.memberId}</span>
                              </div>
                              <div className="flex justify-between text-sm leading-5">
                                <span className="text-text-secondary">Effective Date</span>
                                <span className="text-text-primary">{previewPatient.secondaryInsurance.effectiveDate ? formatDateFull(previewPatient.secondaryInsurance.effectiveDate) : '—'}</span>
                              </div>
                              <div className="flex justify-between text-sm leading-5 items-center">
                                <span className="text-text-secondary">Status</span>
                                <Badge variant="default" className="bg-bg-success-primary text-text-success-primary text-xs h-5">Active</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Data Section */}
            <div>
              <button
                onClick={() => toggleSection('data')}
                className="flex items-center justify-between px-4 h-[40px] w-full hover:bg-bg-secondary/50 transition-colors"
              >
                <span className="text-base font-medium text-text-primary">Data</span>
                <CaretDown className={cn(
                  "size-4 text-text-tertiary transition-transform duration-200",
                  !expandedSections.data && "-rotate-90"
                )} />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  expandedSections.data ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 space-y-4">
                    <div>
                      <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Source</p>
                      <p className="text-sm text-text-primary leading-5">{previewPatient.syncStatus.ehrSystem}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide mb-1">Last Sync</p>
                      <p className="text-sm text-text-primary leading-5">{formatDateFull(previewPatient.syncStatus.lastSynced)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Workflow Review Overlay */}
      <WorkflowSheet
        patient={workflowPatient}
        open={!!workflowPatient}
        onOpenChange={(open) => { if (!open) setWorkflowPatient(null); }}
      />
    </div>
  );
}
