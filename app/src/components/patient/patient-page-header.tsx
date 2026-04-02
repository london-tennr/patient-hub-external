'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { Tabs, TabsList, TabsTrigger } from '@tennr/lasso/tabs';
import type { Patient } from '@/types/patient';

const tabs = [
  { name: 'Summary', value: '', enabled: true },
  { name: 'Demographics', value: '/demographics', enabled: true },
  { name: 'Insurance', value: '/insurance', enabled: true },
  { name: 'Orders', value: '/orders', enabled: true },
  { name: 'Notes', value: '/notes', enabled: true },
  { name: 'Documents', value: '/documents', enabled: true },
];

interface PatientNavigationTabsProps {
  patientId: string;
}

function PatientNavigationTabs({ patientId }: PatientNavigationTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const basePath = `/patients/${patientId}`;

  // Determine active tab value from current pathname
  const activeTab = tabs.find(tab =>
    tab.value === ''
      ? pathname === basePath
      : pathname.startsWith(`${basePath}${tab.value}`)
  )?.value ?? '';

  return (
    <nav className="w-full mt-2">
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          router.push(`${basePath}${value}`);
        }}
      >
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.name}
              value={tab.value}
              disabled={!tab.enabled}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}

interface PatientPageHeaderProps {
  patient: Patient;
}

export function PatientPageHeader({ patient }: PatientPageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 pt-6 px-6 flex flex-col items-start w-full bg-bg-secondary">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2 items-start">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5">
            <Link href="/patients" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Patients
            </Link>
          </div>

          {/* Title */}
          <h2 className="text-[30px] leading-[36px] font-serif font-light text-text-primary">
            {patient.firstName} {patient.lastName}
          </h2>
        </div>

        {/* Sync Status */}
        <div className="flex items-center gap-2">
          <p className="text-xs text-text-tertiary">
            Last synced today at 9:15 AM
          </p>
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-bg-white border border-border-secondary shadow-xs hover:bg-bg-primary-hover transition-colors">
            <ArrowsClockwise className="w-4 h-4 text-text-primary" weight="bold" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <PatientNavigationTabs patientId={patient.id} />
    </div>
  );
}
