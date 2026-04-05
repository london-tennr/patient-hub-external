'use client';

import { useState } from 'react';
import {
  X,
  ArrowSquareOut,
  CalendarBlank,
  Flag,
  CaretUp,
  CaretDown,
  CheckCircle,
  Plus,
  Trash,
  ListBullets,
} from '@phosphor-icons/react';
import { Input } from '@tennr/lasso/input';
import { cn } from '@tennr/lasso/utils/cn';
import type { Patient } from '@/types/patient';

// ─── Types ──────────────────────────────────────────────────────────────────

type RadioOption = 'benefits' | 'manual' | 'reach_out' | 'phone_call';

// ─── Info Row ───────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold text-text-primary">{label}</span>
      <span className="text-sm text-text-secondary">{value}</span>
    </div>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-8 gap-y-4">{children}</div>;
}

// ─── Active Coverage Badge ──────────────────────────────────────────────────

function ActiveCoverageBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-bg-success-primary text-text-success-secondary text-xs font-medium">
      <CheckCircle weight="fill" className="size-3 text-icon-success-primary" />
      Active Coverage
    </span>
  );
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
      className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-bg-secondary/30 transition-colors cursor-pointer border-t border-border-secondary"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-semibold text-text-primary">{title}</span>
        {badge}
      </div>
      {open ? (
        <CaretUp weight="regular" className="size-4 text-text-tertiary" />
      ) : (
        <CaretDown weight="regular" className="size-4 text-text-tertiary" />
      )}
    </button>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

interface WorkflowSheetProps {
  patient: Patient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkflowSheet({ patient, open, onOpenChange }: WorkflowSheetProps) {
  const [activeTab, setActiveTab] = useState<'eligibility' | 'documents'>('eligibility');
  const [selectedOption, setSelectedOption] = useState<RadioOption | null>(null);

  // Sub-section open states
  const [memberInfoOpen, setMemberInfoOpen] = useState(true);
  const [payerOpen, setPayerOpen] = useState(true);
  const [planInfoOpen, setPlanInfoOpen] = useState(true);
  const [electronicResultsOpen, setElectronicResultsOpen] = useState(true);

  if (!open || !patient) return null;

  const fullName = `${patient.firstName} ${patient.lastName}`;
  const insuranceName = patient.primaryInsurance?.carrier ?? 'AmeriHealth Caritas';
  const memberId = patient.primaryInsurance?.memberId ?? '49753732';
  const groupNumber = patient.primaryInsurance?.groupNumber ?? 'W32424';
  const dob = patient.dob;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatDateLong = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg-primary">
      <div className="flex flex-1 min-h-0">
        {/* ═══════════════════════════════════════════════════════ */}
        {/* LEFT PANEL — Electronic Check                          */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col min-w-0 bg-bg-primary">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 h-12 bg-white border-b border-border-secondary shrink-0">
            <span className="text-sm font-medium text-text-primary">Electronic Check</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-tertiary font-medium">10d</span>
              <button className="size-7 flex items-center justify-center rounded hover:bg-bg-secondary transition-colors cursor-pointer">
                <ArrowSquareOut weight="regular" className="size-4 text-text-tertiary" />
              </button>
              <button className="size-7 flex items-center justify-center rounded hover:bg-bg-secondary transition-colors cursor-pointer">
                <CalendarBlank weight="regular" className="size-4 text-text-tertiary" />
              </button>
              <button className="size-7 flex items-center justify-center rounded hover:bg-bg-secondary transition-colors cursor-pointer">
                <Flag weight="fill" className="size-4 text-red-500" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center px-5 bg-white border-b border-border-secondary shrink-0">
            <button
              onClick={() => setActiveTab('eligibility')}
              className={cn(
                'px-1 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer mr-5',
                activeTab === 'eligibility'
                  ? 'border-text-primary text-text-primary'
                  : 'border-transparent text-text-tertiary hover:text-text-secondary'
              )}
            >
              Eligibility Check
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={cn(
                'px-1 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer',
                activeTab === 'documents'
                  ? 'border-text-primary text-text-primary'
                  : 'border-transparent text-text-tertiary hover:text-text-secondary'
              )}
            >
              Patient Documents
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {activeTab === 'eligibility' ? (
              <div className="max-w-[900px] space-y-3">
                {/* ── Electronic Results (single card with sub-sections) ── */}
                <div className="border border-border-secondary rounded-lg overflow-hidden bg-white">
                  {/* Electronic Results header */}
                  <button
                    onClick={() => setElectronicResultsOpen(!electronicResultsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3.5 cursor-pointer hover:bg-bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-text-primary">Electronic Results</span>
                      <ActiveCoverageBadge />
                      <span className="text-xs text-text-tertiary">Verified: 03-26-2026 at 9:13:21 AM</span>
                    </div>
                    {electronicResultsOpen ? (
                      <CaretUp weight="regular" className="size-4 text-text-tertiary" />
                    ) : (
                      <CaretDown weight="regular" className="size-4 text-text-tertiary" />
                    )}
                  </button>

                  {electronicResultsOpen && (
                    <>
                      {/* ── Member Info ── */}
                      <SubSectionHeader
                        title="Member Info"
                        open={memberInfoOpen}
                        onToggle={() => setMemberInfoOpen(!memberInfoOpen)}
                      />
                      {memberInfoOpen && (
                        <div className="px-5 py-4 border-t border-border-secondary">
                          <p className="text-xs text-text-tertiary mb-4">Member</p>
                          <InfoGrid>
                            <InfoRow label="First Name" value={patient.firstName} />
                            <InfoRow label="Last Name" value={patient.lastName} />
                            <InfoRow label="Date of Birth" value={formatDate(dob)} />
                            <InfoRow label="Gender" value="M" />
                            <InfoRow
                              label="Address"
                              value={
                                <span>
                                  {patient.address.street}
                                  <br />
                                  {patient.address.city}, {patient.address.state}, {patient.address.zip}
                                </span>
                              }
                            />
                            <InfoRow label="Date of Service" value="01/01/2026" />
                            <InfoRow label="Member ID" value={memberId} />
                          </InfoGrid>
                        </div>
                      )}

                      {/* ── Payer ── */}
                      <SubSectionHeader
                        title="Payer"
                        open={payerOpen}
                        onToggle={() => setPayerOpen(!payerOpen)}
                      />
                      {payerOpen && (
                        <div className="px-5 py-4 border-t border-border-secondary">
                          <InfoGrid>
                            <InfoRow label="Payer Name" value="Unknown" />
                            <InfoRow
                              label="Payer Address"
                              value={
                                <span>
                                  {patient.address.street}
                                  <br />
                                  {patient.address.city}, {patient.address.state}
                                </span>
                              }
                            />
                          </InfoGrid>
                        </div>
                      )}

                      {/* ── Plan Info ── */}
                      <SubSectionHeader
                        title="Plan Info"
                        badge={<ActiveCoverageBadge />}
                        open={planInfoOpen}
                        onToggle={() => setPlanInfoOpen(!planInfoOpen)}
                      />
                      {planInfoOpen && (
                        <div className="px-5 py-4 border-t border-border-secondary">
                          <InfoGrid>
                            <InfoRow label="Plan Name" value="AmeriHealth" />
                            <InfoRow label="Plan Type" value="PPO" />
                            <InfoRow label="Group Number" value={groupNumber} />
                            <InfoRow label="Eligibility Start Date" value="01/01/2026" />
                          </InfoGrid>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* ── Admission Summary (collapsed) ── */}
                <div className="border border-border-secondary rounded-lg overflow-hidden bg-bg-secondary/30">
                  <button className="flex items-center justify-between w-full px-4 py-3 cursor-pointer hover:bg-bg-secondary/50 transition-colors">
                    <span className="text-sm font-medium text-text-primary">Admission Summary</span>
                    <CaretDown weight="regular" className="size-4 text-text-tertiary" />
                  </button>
                </div>

                {/* ── Benefit rows (collapsed with Active Coverage badges) ── */}
                {[
                  'Benefit - Health Benefit Plan Coverage',
                  'Benefit - Durable Medical Equipment',
                  'Benefit - Durable Medical Equipment Purchase',
                  'Benefit - Durable Medical Equipment Rental',
                ].map((title) => (
                  <div key={title} className="border border-border-secondary rounded-lg overflow-hidden bg-bg-secondary/30">
                    <button className="flex items-center justify-between w-full px-4 py-3 cursor-pointer hover:bg-bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-medium text-text-primary">{title}</span>
                        <ActiveCoverageBadge />
                      </div>
                      <CaretDown weight="regular" className="size-4 text-text-tertiary" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-sm text-text-tertiary">Patient documents will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* RIGHT PANEL — Patient Info & Payer sidebar             */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="w-[380px] shrink-0 border-l border-border-secondary bg-white flex flex-col">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 h-12 border-b border-border-secondary shrink-0">
            <span className="text-sm font-semibold text-text-primary">{fullName} | CPAP</span>
            <button
              onClick={() => onOpenChange(false)}
              className="size-7 flex items-center justify-center rounded hover:bg-bg-secondary transition-colors cursor-pointer"
            >
              <X weight="regular" className="size-4 text-text-tertiary" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* ── Provided Patient Info ── */}
            <div className="border-b border-border-secondary">
              <div className="border-l-2 border-border-brand-primary mx-5 my-4 pl-3">
                <p className="text-xs font-semibold text-text-primary">Provided Patient Info</p>
              </div>

              <div className="px-5 pb-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-secondary">First Name</label>
                    <Input defaultValue={patient.firstName} className="h-9 text-sm" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-secondary">Last Name</label>
                    <Input defaultValue={patient.lastName} className="h-9 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-secondary">Date of Birth</label>
                    <div className="relative">
                      <Input defaultValue={formatDateLong(dob)} className="h-9 text-sm pr-8" />
                      <CalendarBlank weight="regular" className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-text-tertiary pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-secondary">Date of Service</label>
                    <div className="relative">
                      <Input defaultValue="March 26, 2026" className="h-9 text-sm pr-8" />
                      <CalendarBlank weight="regular" className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-text-tertiary pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-text-secondary">Provider Credential</label>
                  <div className="flex items-center justify-between h-9 px-3 border border-border-secondary rounded-md bg-white text-sm text-text-primary cursor-pointer hover:bg-bg-secondary/30 transition-colors">
                    <span>Default • NPI 99999999999</span>
                    <CaretDown weight="regular" className="size-3.5 text-text-tertiary" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="h-9 rounded-md border border-border-secondary text-sm font-medium text-text-secondary hover:bg-bg-secondary transition-colors cursor-pointer">
                    Reset
                  </button>
                  <button className="h-9 rounded-md border border-border-secondary text-sm font-medium text-text-secondary hover:bg-bg-secondary transition-colors cursor-pointer">
                    Rerun all checks
                  </button>
                </div>
              </div>
            </div>

            {/* ── Payer card ── */}
            <div className="px-5 py-4 space-y-4 border-b border-border-secondary">
              <div className="border border-border-secondary rounded-lg overflow-hidden">
                {/* Payer header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-secondary">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-text-primary">{insuranceName}</span>
                    <span className="text-xs text-text-tertiary">Primary</span>
                  </div>
                  <button className="size-7 flex items-center justify-center rounded hover:bg-bg-secondary transition-colors cursor-pointer">
                    <Trash weight="regular" className="size-4 text-text-tertiary" />
                  </button>
                </div>

                {/* Select an option */}
                <div className="px-4 py-3 space-y-2.5">
                  <p className="text-sm font-medium text-text-primary">Select an option</p>

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
                        'flex items-center gap-3 w-full px-4 py-3 rounded-lg border text-sm text-text-primary transition-colors cursor-pointer text-left',
                        selectedOption === option.id
                          ? 'border-border-brand-primary bg-bg-brand-secondary'
                          : 'border-border-secondary hover:bg-bg-secondary/30'
                      )}
                    >
                      <span
                        className={cn(
                          'size-5 rounded-full border-2 shrink-0 flex items-center justify-center',
                          selectedOption === option.id
                            ? 'border-border-brand-primary'
                            : 'border-border-primary'
                        )}
                      >
                        {selectedOption === option.id && (
                          <span className="size-2.5 rounded-full bg-bg-brand-primary" />
                        )}
                      </span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Payer / Re-order Payers */}
              <div className="flex items-center gap-5">
                <button className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                  <Plus weight="bold" className="size-3.5" />
                  Add Payer
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                  <ListBullets weight="regular" className="size-3.5" />
                  Re-order Payers
                </button>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex items-center gap-3 px-5 py-3 border-t border-border-secondary bg-white shrink-0">
            <div className="flex items-center gap-1.5 h-9 px-3 border border-border-secondary rounded-md text-sm text-text-tertiary cursor-pointer hover:bg-bg-secondary/30 transition-colors">
              <span>Select decision</span>
              <CaretDown weight="regular" className="size-3.5" />
            </div>
            <button className="flex-1 h-9 rounded-md bg-bg-success-primary text-text-success-secondary text-sm font-medium hover:bg-bg-success-primary-hover transition-colors cursor-pointer flex items-center justify-center">
              Everything looks right
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
