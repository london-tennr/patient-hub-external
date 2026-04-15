'use client';

import { useState } from 'react';
import {
  X,
  ArrowSquareOut,
  CalendarBlank,
  CaretUp,
  CaretDown,
  CheckCircle,
  Plus,
  Trash,
  ListBullets,
  Warning,
  FileText,
  IdentificationCard,
  Users,
  Eye,
} from '@phosphor-icons/react';
import { Input } from '@tennr/lasso/input';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import type { Patient } from '@/types/patient';

// ─── Types ──────────────────────────────────────────────────────────────────

type RadioOption = 'benefits' | 'manual' | 'reach_out' | 'phone_call';

// ─── Info Row ───────────────────────────────────────────────────────────────

function InfoRow({ label, value, highlight }: { label: string; value: string | React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-text-tertiary">{label}</span>
      <span className={cn('text-xs text-text-primary', highlight && 'text-text-warning-primary')}>{value}</span>
    </div>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-8 gap-y-3">{children}</div>;
}

// ─── Sub-section header (flat, inside parent card) ──────────────────────────

function SubSectionHeader({
  title,
  badge,
  open,
  onToggle,
}: {
  title: string;
  badge?: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-bg-secondary/30 transition-colors cursor-pointer border-t border-border-tertiary"
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium lasso:wght-medium text-text-primary">{title}</span>
        {badge}
      </div>
      {open ? (
        <CaretUp weight="regular" className="size-3.5 text-text-tertiary" />
      ) : (
        <CaretDown weight="regular" className="size-3.5 text-text-tertiary" />
      )}
    </button>
  );
}

// ─── Verify Insurance Content ───────────────────────────────────────────────

function VerifyInsuranceContent({ patient }: { patient: Patient }) {
  const [electronicResultsOpen, setElectronicResultsOpen] = useState(true);
  const [memberInfoOpen, setMemberInfoOpen] = useState(true);
  const [payerOpen, setPayerOpen] = useState(true);
  const [planInfoOpen, setPlanInfoOpen] = useState(true);

  const memberId = patient.primaryInsurance?.memberId ?? '49753732';
  const groupNumber = patient.primaryInsurance?.groupNumber ?? 'W32424';
  const dob = patient.dob;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="w-full space-y-3">
      {/* Electronic Results */}
      <div className="border border-border-tertiary rounded-md overflow-hidden">
        <button
          onClick={() => setElectronicResultsOpen(!electronicResultsOpen)}
          className="flex items-center justify-between w-full px-4 py-3 cursor-pointer hover:bg-bg-secondary/30 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium lasso:wght-medium text-text-primary">Electronic Results</span>
            <Badge variant="warning" className="text-[10px]">Verification Failed</Badge>
            <span className="text-[11px] text-text-tertiary">Mar 26, 2026 at 9:13 AM</span>
          </div>
          {electronicResultsOpen ? (
            <CaretUp weight="regular" className="size-3.5 text-text-tertiary" />
          ) : (
            <CaretDown weight="regular" className="size-3.5 text-text-tertiary" />
          )}
        </button>

        {electronicResultsOpen && (
          <>
            <SubSectionHeader title="Member Info" open={memberInfoOpen} onToggle={() => setMemberInfoOpen(!memberInfoOpen)} />
            {memberInfoOpen && (
              <div className="px-4 py-3 border-t border-border-tertiary">
                <InfoGrid>
                  <InfoRow label="First Name" value={patient.firstName} />
                  <InfoRow label="Last Name" value={patient.lastName} />
                  <InfoRow label="Date of Birth" value={formatDate(dob)} />
                  <InfoRow label="Gender" value="F" />
                  <InfoRow
                    label="Address"
                    value={<span>{patient.address.street}<br />{patient.address.city}, {patient.address.state}, {patient.address.zip}</span>}
                  />
                  <InfoRow label="Date of Service" value="01/01/2026" />
                  <InfoRow label="Member ID" value={memberId} highlight />
                </InfoGrid>
              </div>
            )}

            <SubSectionHeader title="Insurance" open={payerOpen} onToggle={() => setPayerOpen(!payerOpen)} />
            {payerOpen && (
              <div className="px-4 py-3 border-t border-border-tertiary">
                <InfoGrid>
                  <InfoRow label="Insurance Name" value="Aetna" />
                  <InfoRow label="Insurance ID" value="60054" />
                  <InfoRow label="Insurance Address" value={<span>151 Farmington Ave<br />Hartford, CT 06156</span>} />
                  <InfoRow label="Service Type" value="DME" />
                </InfoGrid>
              </div>
            )}

            <SubSectionHeader title="Plan Info" badge={<Badge variant="warning" className="text-[10px]">No Match</Badge>} open={planInfoOpen} onToggle={() => setPlanInfoOpen(!planInfoOpen)} />
            {planInfoOpen && (
              <div className="px-4 py-3 border-t border-border-tertiary">
                <InfoGrid>
                  <InfoRow label="Plan Name" value="—" />
                  <InfoRow label="Plan Type" value="—" />
                  <InfoRow label="Group Number" value={groupNumber} />
                  <InfoRow label="Eligibility Start Date" value="—" />
                </InfoGrid>
                <p className="text-[11px] text-text-tertiary mt-3">No plan information returned. Verify member ID and insurance details.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Benefit rows — disabled */}
      {[
        'Benefit — Health Benefit Plan Coverage',
        'Benefit — Durable Medical Equipment',
      ].map((title) => (
        <div key={title} className="border border-border-tertiary rounded-md overflow-hidden opacity-40">
          <div className="flex items-center justify-between w-full px-4 py-2.5">
            <span className="text-xs text-text-tertiary">{title}</span>
            <span className="text-[11px] text-text-tertiary">Pending verification</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Multi-Patient Split Content ────────────────────────────────────────────

function MultiPatientSplitContent({ patient }: { patient: Patient }) {
  const [selectedPatients, setSelectedPatients] = useState<Set<number>>(new Set([0, 1]));

  const detectedPatients = [
    {
      name: `${patient.firstName} ${patient.lastName}`,
      dob: patient.dob,
      pages: '1-4, 7-8',
      orderType: 'CPAP Device',
      confidence: 'High',
    },
    {
      name: 'Robert Johansson',
      dob: '1958-03-14',
      pages: '5-6, 9-12',
      orderType: 'Oxygen Concentrator',
      confidence: 'High',
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const togglePatient = (idx: number) => {
    setSelectedPatients(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="max-w-[900px] space-y-4">
      {/* Info banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-md border border-border-warning-secondary bg-bg-warning-primary">
        <Users weight="fill" className="size-4 text-text-warning-secondary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium lasso:wght-medium text-text-primary">Multiple patients detected</p>
          <p className="text-[11px] text-text-secondary leading-4">
            The uploaded referral contains information for <span className="font-medium lasso:wght-medium">2 patients</span>.
            Review and confirm the split before proceeding.
          </p>
        </div>
      </div>

      {/* Source document preview */}
      <div className="border border-border-tertiary rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-tertiary">
          <div className="flex items-center gap-2">
            <FileText weight="regular" className="size-3.5 text-text-tertiary" />
            <span className="text-xs font-medium lasso:wght-medium text-text-primary">Source Document</span>
            <span className="text-[11px] text-text-tertiary">Johansson_referral.pdf — 12 pages</span>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
            <Eye weight="regular" className="size-3" />
            View
          </button>
        </div>
        <div className="px-4 py-2.5 bg-bg-secondary/30">
          <p className="text-[11px] text-text-tertiary leading-4">
            Pages have been grouped by patient based on document analysis.
          </p>
        </div>
      </div>

      {/* Detected patients */}
      <div className="space-y-2">
        <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Detected Patients</span>
        {detectedPatients.map((dp, idx) => (
          <div
            key={idx}
            className={cn(
              'border rounded-md overflow-hidden transition-colors cursor-pointer',
              selectedPatients.has(idx) ? 'border-border-brand-primary' : 'border-border-tertiary'
            )}
            onClick={() => togglePatient(idx)}
          >
            <div className="flex items-start gap-3 px-4 py-3">
              <span className={cn(
                'size-4 rounded border-2 shrink-0 flex items-center justify-center mt-0.5 transition-colors',
                selectedPatients.has(idx) ? 'border-border-brand-primary bg-bg-brand-primary' : 'border-border-primary'
              )}>
                {selectedPatients.has(idx) && <CheckCircle weight="fill" className="size-3 text-white" />}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <IdentificationCard weight="regular" className="size-3.5 text-text-tertiary" />
                  <span className="text-xs font-medium lasso:wght-medium text-text-primary">{dp.name}</span>
                  <Badge variant={dp.confidence === 'High' ? 'success' : 'warning'} className="text-[10px]">
                    {dp.confidence} confidence
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InfoRow label="DOB" value={formatDate(dp.dob)} />
                  <InfoRow label="Pages" value={dp.pages} />
                  <InfoRow label="Order type" value={dp.orderType} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Page assignment summary */}
      <div className="border border-border-tertiary rounded-md overflow-hidden">
        <div className="px-4 py-2.5 border-b border-border-tertiary">
          <span className="text-xs font-medium lasso:wght-medium text-text-primary">Page Assignment Summary</span>
        </div>
        <div className="divide-y divide-border-tertiary">
          {[
            { page: 'Pages 1–4', desc: 'Referral form — Scarlett Johansson (CPAP)', patient: detectedPatients[0].name },
            { page: 'Pages 5–6', desc: 'Referral form — Robert Johansson (O2 Concentrator)', patient: detectedPatients[1].name },
            { page: 'Pages 7–8', desc: 'Sleep study results — Scarlett Johansson', patient: detectedPatients[0].name },
            { page: 'Pages 9–12', desc: 'Clinical notes — Robert Johansson', patient: detectedPatients[1].name },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-2">
              <span className="text-[11px] font-mono text-text-tertiary w-20 shrink-0">{row.page}</span>
              <span className="text-[11px] text-text-primary flex-1">{row.desc}</span>
              <span className="text-[10px] text-text-tertiary">{row.patient}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Validate Documents Content ─────────────────────────────────────────────

function ValidateDocumentsContent({ patient }: { patient: Patient }) {
  const [selectedDoc, setSelectedDoc] = useState(0);

  const documents = [
    {
      name: 'Johansson_referral.pdf',
      pages: 4,
      status: 'needs_review' as const,
      type: 'Referral',
      issues: [
        { field: 'Referring physician NPI', extracted: '1234567890', issue: 'NPI does not match Dr. Sarah Chen in our records' },
        { field: 'Diagnosis code', extracted: 'G47.33', issue: 'Verify ICD-10 code matches sleep apnea diagnosis' },
      ],
    },
    {
      name: 'Johansson_cmn.pdf',
      pages: 2,
      status: 'needs_review' as const,
      type: 'Certificate of Medical Necessity',
      issues: [
        { field: 'Physician signature', extracted: '—', issue: 'Signature block appears to be missing on page 2' },
        { field: 'Equipment description', extracted: 'CPAP E0601', issue: 'Confirm HCPCS code matches ordered equipment' },
      ],
    },
    {
      name: 'Johansson_sleep_study.pdf',
      pages: 3,
      status: 'validated' as const,
      type: 'Sleep Study',
      issues: [],
    },
  ];

  const currentDoc = documents[selectedDoc];

  return (
    <div className="max-w-[900px] space-y-4">
      {/* Info banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-md border border-border-warning-secondary bg-bg-warning-primary">
        <FileText weight="fill" className="size-4 text-text-warning-secondary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium lasso:wght-medium text-text-primary">Document review required</p>
          <p className="text-[11px] text-text-secondary leading-4">
            {documents.filter(d => d.status === 'needs_review').length} of {documents.length} documents
            have fields that need manual validation.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Document list sidebar */}
        <div className="w-[200px] shrink-0 space-y-1">
          {documents.map((doc, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDoc(idx)}
              className={cn(
                'w-full flex items-start gap-2 px-3 py-2.5 rounded-md text-left transition-colors cursor-pointer',
                selectedDoc === idx ? 'bg-bg-secondary border border-border-secondary' : 'hover:bg-bg-secondary/50'
              )}
            >
              <FileText weight="regular" className={cn(
                'size-3.5 shrink-0 mt-0.5',
                doc.status === 'validated' ? 'text-icon-success-primary' : 'text-text-warning-secondary'
              )} />
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[11px] font-medium lasso:wght-medium text-text-primary truncate">{doc.name}</span>
                <span className="text-[10px] text-text-tertiary">{doc.type} · {doc.pages}p</span>
                {doc.status === 'needs_review' && (
                  <span className="text-[10px] text-text-warning-secondary">{doc.issues.length} fields to review</span>
                )}
                {doc.status === 'validated' && (
                  <span className="text-[10px] text-text-success-primary">Validated</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Document detail panel */}
        <div className="flex-1 min-w-0">
          <div className="border border-border-tertiary rounded-md overflow-hidden">
            {/* Document header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-tertiary">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium lasso:wght-medium text-text-primary">{currentDoc.name}</span>
                {currentDoc.status === 'needs_review' ? (
                  <Badge variant="warning" className="text-[10px]">Needs Review</Badge>
                ) : (
                  <Badge variant="success" className="text-[10px]">Validated</Badge>
                )}
              </div>
              <button className="flex items-center gap-1.5 text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                <Eye weight="regular" className="size-3" />
                View PDF
              </button>
            </div>

            {/* Extracted fields */}
            {currentDoc.status === 'needs_review' ? (
              <div className="divide-y divide-border-tertiary">
                {currentDoc.issues.map((issue, idx) => (
                  <div key={idx} className="px-4 py-3">
                    <div className="flex items-start gap-2.5">
                      <Warning weight="fill" className="size-3.5 text-text-warning-secondary shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div>
                          <p className="text-xs font-medium lasso:wght-medium text-text-primary">{issue.field}</p>
                          <p className="text-[11px] text-text-tertiary mt-0.5">{issue.issue}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-text-tertiary">Extracted:</span>
                          <span className="text-[11px] font-mono bg-bg-secondary px-1.5 py-0.5 rounded text-text-primary">{issue.extracted}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] text-text-tertiary">Corrected value</label>
                          <Input defaultValue={issue.extracted === '—' ? '' : issue.extracted} className="h-7 text-xs max-w-xs" placeholder="Enter corrected value..." />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <CheckCircle weight="fill" className="size-6 text-icon-success-primary mx-auto mb-2" />
                <p className="text-xs font-medium lasso:wght-medium text-text-primary">All fields validated</p>
                <p className="text-[11px] text-text-tertiary mt-0.5">No issues found with extracted data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

interface WorkflowSheetProps {
  patient: Patient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionId?: string | null;
}

const actionTitles: Record<string, string> = {
  'action-1': 'Verify Insurance Details',
  'action-2': 'Multi-Patient Split',
  'action-3': 'Validate Document Information',
};

const actionTabs: Record<string, { tab1: string; tab2: string }> = {
  'action-1': { tab1: 'Eligibility Check', tab2: 'Patient Documents' },
  'action-2': { tab1: 'Patient Split', tab2: 'Source Documents' },
  'action-3': { tab1: 'Document Review', tab2: 'Extracted Data' },
};

export function WorkflowSheet({ patient, open, onOpenChange, actionId }: WorkflowSheetProps) {
  const resolvedAction = actionId || 'action-1';
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');
  const [selectedOption, setSelectedOption] = useState<RadioOption | null>(null);

  if (!open || !patient) return null;

  const fullName = `${patient.firstName} ${patient.lastName}`;
  const insuranceName = patient.primaryInsurance?.carrier ?? 'Aetna';
  const memberId = patient.primaryInsurance?.memberId ?? '49753732';
  const dob = patient.dob;
  const title = actionTitles[resolvedAction] ?? 'Electronic Check';
  const tabs = actionTabs[resolvedAction] ?? { tab1: 'Eligibility Check', tab2: 'Patient Documents' };

  const formatDateLong = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const bottomButtonLabel: Record<string, string> = {
    'action-1': 'Confirm insurance details',
    'action-2': 'Confirm patient split',
    'action-3': 'Approve all documents',
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg-primary">
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* LEFT PANEL */}
        <div className="flex-1 flex flex-col min-w-0 bg-bg-primary">
          {/* Top bar with breadcrumb */}
          <div className="flex items-center justify-between px-5 h-11 bg-bg-white border-b border-border-tertiary shrink-0">
            <nav className="flex items-center gap-1.5 text-sm">
              <button
                onClick={() => onOpenChange(false)}
                className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                Patient Hub
              </button>
              <span className="text-text-tertiary">/</span>
              <span className="text-text-primary font-medium">{title}</span>
            </nav>
            <div className="hidden md:flex items-center gap-1">
              <span className="text-[11px] text-text-tertiary mr-2">10 days open</span>
              <button className="size-7 flex items-center justify-center rounded-md hover:bg-bg-secondary transition-colors cursor-pointer">
                <ArrowSquareOut weight="regular" className="size-3.5 text-text-tertiary" />
              </button>
              <button className="size-7 flex items-center justify-center rounded-md hover:bg-bg-secondary transition-colors cursor-pointer">
                <CalendarBlank weight="regular" className="size-3.5 text-text-tertiary" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center px-5 bg-bg-white border-b border-border-tertiary shrink-0">
            <button
              onClick={() => setActiveTab('primary')}
              className={cn(
                'px-1 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer mr-5',
                activeTab === 'primary'
                  ? 'border-text-primary text-text-primary'
                  : 'border-transparent text-text-tertiary hover:text-text-secondary'
              )}
            >
              {tabs.tab1}
            </button>
            <button
              onClick={() => setActiveTab('secondary')}
              className={cn(
                'px-1 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer',
                activeTab === 'secondary'
                  ? 'border-text-primary text-text-primary'
                  : 'border-transparent text-text-tertiary hover:text-text-secondary'
              )}
            >
              {tabs.tab2}
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 md:px-5 md:py-5">
            {activeTab === 'primary' ? (
              <>
                {resolvedAction === 'action-1' && <VerifyInsuranceContent patient={patient} />}
                {resolvedAction === 'action-2' && <MultiPatientSplitContent patient={patient} />}
                {resolvedAction === 'action-3' && <ValidateDocumentsContent patient={patient} />}
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-xs text-text-tertiary">{tabs.tab2} will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL — Patient Info sidebar */}
        <div className="w-full md:w-[360px] shrink-0 border-t md:border-t-0 md:border-l border-border-tertiary bg-bg-white flex flex-col max-h-[40vh] md:max-h-none">
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 md:px-5 h-11 border-b border-border-tertiary shrink-0">
            <span className="text-sm font-medium lasso:wght-medium text-text-primary">{fullName} · CPAP</span>
            <button
              onClick={() => onOpenChange(false)}
              className="size-7 flex items-center justify-center rounded-md hover:bg-bg-secondary transition-colors cursor-pointer"
            >
              <X weight="regular" className="size-3.5 text-text-tertiary" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Provided Patient Info */}
            <div className="border-b border-border-tertiary">
              <div className="px-4 md:px-5 pt-4 pb-2">
                <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Patient Info</span>
              </div>

              <div className="px-4 md:px-5 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-text-tertiary">First Name</label>
                    <Input defaultValue={patient.firstName} className="h-8 text-xs" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-text-tertiary">Last Name</label>
                    <Input defaultValue={patient.lastName} className="h-8 text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-text-tertiary">Date of Birth</label>
                    <div className="relative">
                      <Input defaultValue={formatDateLong(dob)} className="h-8 text-xs pr-7" />
                      <CalendarBlank weight="regular" className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-text-tertiary pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-text-tertiary">Date of Service</label>
                    <div className="relative">
                      <Input defaultValue="March 26, 2026" className="h-8 text-xs pr-7" />
                      <CalendarBlank weight="regular" className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-text-tertiary pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-text-tertiary">Provider Credential</label>
                  <div className="flex items-center justify-between h-8 px-3 border border-border-secondary rounded-md text-xs text-text-primary cursor-pointer hover:bg-bg-secondary/30 transition-colors">
                    <span>Default · NPI 99999999999</span>
                    <CaretDown weight="regular" className="size-3 text-text-tertiary" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="h-8 rounded-md border border-border-secondary text-xs text-text-secondary hover:bg-bg-secondary transition-colors cursor-pointer">
                    Reset
                  </button>
                  <button className="h-8 rounded-md border border-border-secondary text-xs text-text-secondary hover:bg-bg-secondary transition-colors cursor-pointer">
                    {resolvedAction === 'action-1' ? 'Rerun checks' : 'Re-extract'}
                  </button>
                </div>
              </div>
            </div>

            {/* Insurance card */}
            <div className="px-4 md:px-5 py-4 space-y-3 border-b border-border-tertiary">
              <div className="border border-border-tertiary rounded-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-tertiary">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium lasso:wght-medium text-text-primary">{insuranceName}</span>
                    <span className="text-[11px] text-text-tertiary">Primary</span>
                  </div>
                  <button className="size-6 flex items-center justify-center rounded-md hover:bg-bg-secondary transition-colors cursor-pointer">
                    <Trash weight="regular" className="size-3.5 text-text-tertiary" />
                  </button>
                </div>

                <div className="px-4 py-3 space-y-2">
                  <p className="text-xs text-text-secondary">Select an option</p>
                  {[
                    { id: 'benefits' as RadioOption, label: 'Ready to enter benefits' },
                    { id: 'manual' as RadioOption, label: 'Manual check' },
                    { id: 'reach_out' as RadioOption, label: 'Reach out to patient' },
                    { id: 'phone_call' as RadioOption, label: 'Request a phone call' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={cn(
                        'flex items-center gap-2.5 w-full px-3 py-2.5 rounded-md border text-xs text-text-primary transition-colors cursor-pointer text-left',
                        selectedOption === option.id
                          ? 'border-border-brand-primary bg-bg-brand-secondary'
                          : 'border-border-tertiary hover:bg-bg-secondary/30'
                      )}
                    >
                      <span
                        className={cn(
                          'size-4 rounded-full border-2 shrink-0 flex items-center justify-center',
                          selectedOption === option.id ? 'border-border-brand-primary' : 'border-border-primary'
                        )}
                      >
                        {selectedOption === option.id && (
                          <span className="size-2 rounded-full bg-bg-brand-primary" />
                        )}
                      </span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                  <Plus weight="bold" className="size-3" />
                  Add Insurance
                </button>
                <button className="flex items-center gap-1.5 text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                  <ListBullets weight="regular" className="size-3" />
                  Re-order Insurance
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center gap-2.5 px-4 py-2 md:px-5 md:py-3 border-t border-border-tertiary bg-bg-white shrink-0">
            <div className="flex items-center gap-1.5 h-8 px-3 border border-border-secondary rounded-md text-xs text-text-tertiary cursor-pointer hover:bg-bg-secondary/30 transition-colors">
              <span>Select decision</span>
              <CaretDown weight="regular" className="size-3" />
            </div>
            <button className="flex-1 h-8 rounded-md bg-bg-brand-primary text-text-white text-xs font-medium lasso:wght-medium hover:bg-bg-brand-primary/90 transition-colors cursor-pointer flex items-center justify-center">
              {bottomButtonLabel[resolvedAction] ?? 'Everything looks right'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
