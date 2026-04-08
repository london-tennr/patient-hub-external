'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@tennr/lasso/breadcrumb';
import { Button } from '@tennr/lasso/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tennr/lasso/dropdown-menu';
import { DotsThree } from '@phosphor-icons/react';
import type { Patient } from '@/types/patient';

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const formatSyncTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return `today at ${date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })}`;
    }

    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <header className="bg-bg-primary px-6 pt-4">
      <div className="flex items-start justify-between">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/explore" className="text-text-secondary text-xs">
                    Patients
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-2xl font-semibold text-text-primary">
            {patient.firstName} {patient.lastName}
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            {new Date(patient.dob).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} · MRN {patient.mrn}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">
            Last activity {formatSyncTime(patient.syncStatus.lastSynced)}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <DotsThree className="h-5 w-5" weight="bold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Sync now</DropdownMenuItem>
              <DropdownMenuItem>View in EHR</DropdownMenuItem>
              <DropdownMenuItem>Export patient data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
