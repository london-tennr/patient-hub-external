'use client';

import { useMemo } from 'react';
import { CommandPalette, KeyboardShortcutType, type Option } from '@tennr/lasso/command-palette';
import { Badge } from '@tennr/lasso/badge';
import type { SearchResult } from '@/types/search';

interface SearchOption {
  label: string;
  value: string;
  category?: string;
  resultType: 'patient' | 'order' | 'easter_egg';
  data: SearchResult;
  [key: string]: string | string[] | SearchResult | undefined;
}

interface SearchModalProps {
  onSelectPatient: (patientId: string) => void;
  onSelectOrder: (orderId: string) => void;
  onSelectEasterEgg?: () => void;
}

// Mock data for development
const mockPatients: SearchResult[] = [
  {
    type: 'patient',
    patient: {
      id: '1',
      patientId: '593107',
      mrn: 'MRN001',
      firstName: 'John',
      lastName: 'Smith',
      dob: '1965-04-22',
      phone: '(555) 555-5555',
      email: 'john.smith@example.com',
      address: { street: '42 Abbey Road', city: 'Liverpool', state: 'NY', zip: '10001' },
      primaryInsurance: {
        carrier: 'BlueCross BlueShield',
        plan: 'PPO',
        memberId: 'XYA123456789',
        groupNumber: 'GRP001',
        policyHolder: 'John Smith',
        relationship: 'self',
        eligibilityStatus: 'verified',
        effectiveDate: '2025-11-25',
        status: 'active',
        lastVerified: '2026-01-15',
      },
      status: 'on_track' as const,
      priority: 'p3' as const,
      stage: 'insurance_verification' as const,
      tennrStatus: 'processing' as const,
      syncStatus: { ehrSystem: 'BrightTree' as const, lastSynced: '2026-01-21T09:15:00Z' },
    },
    currentOrderStage: 'Eligibility & Benefits',
  },
];

const mockOrders: SearchResult[] = [
  {
    type: 'order',
    order: {
      id: 'ORD001',
      externalOrderId: 'ClH6A0xTUYS-bgJa',
      patientId: '1',
      patientName: 'John Smith',
      patientDob: '1985-03-15',
      orderName: 'CGM & Supplies',
      orderType: 'DME',
      status: 'on_track',
      statusUpdated: '2026-01-19',
      orderAge: '9 days',
      items: [{ id: 'LI001', description: 'CGM supply allowance', hcpcsCode: 'A4239', product: 'Freestyle Libre 3 sensors', quantity: 2 }],
      stage: 'eligibility',
      subStatus: 'in_progress',
      referringPractitioner: null,
      referringFacility: null,
      dateCreated: '2026-01-10',
      lastUpdated: '2026-01-19',
      documents: [],
      notes: [],
    },
  },
];

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  validation: 'outline',
  eligibility: 'secondary',
  qualification: 'default',
  complete: 'default',
};

export function SearchModal({ onSelectPatient, onSelectOrder, onSelectEasterEgg }: SearchModalProps) {
  const options: SearchOption[] = useMemo(() => {
    const allResults = [...mockPatients, ...mockOrders];

    const mapped = allResults.map((result): SearchOption => {
      if (result.type === 'patient') {
        const { patient } = result;
        return {
          label: `${patient.firstName} ${patient.lastName}`,
          value: patient.id,
          resultType: 'patient',
          data: result,
          category: 'Patient',
        };
      } else {
        const { order } = result;
        return {
          label: order.id,
          value: order.id,
          resultType: 'order',
          data: result,
          category: 'Order',
        };
      }
    });

    // Easter egg: hidden result that only appears when searching "illustration"
    mapped.push({
      label: 'illustration',
      value: 'easter-egg',
      resultType: 'easter_egg',
      data: mockPatients[0],
      category: 'Explore',
    });

    return mapped;
  }, []);

  const handleSelectOption = (option: SearchOption) => {
    if (option.resultType === 'easter_egg') {
      onSelectEasterEgg?.();
    } else if (option.resultType === 'patient') {
      onSelectPatient(option.value);
    } else {
      onSelectOrder(option.value);
    }
  };

  const renderOption = (option: SearchOption) => {
    if (option.resultType === 'patient' && option.data.type === 'patient') {
      const { patient, currentOrderStage } = option.data;
      return (
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-medium">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              DOB: {patient.dob} · MRN: {patient.mrn}
            </p>
            {patient.primaryInsurance && (
              <p className="text-sm text-muted-foreground">
                {patient.primaryInsurance.carrier} · {patient.primaryInsurance.memberId}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline">Patient</Badge>
            {currentOrderStage && (
              <span className="text-xs text-muted-foreground">{currentOrderStage}</span>
            )}
          </div>
        </div>
      );
    }

    if (option.data.type === 'order') {
      const { order } = option.data;
      return (
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-medium">{order.id}</p>
            <p className="text-sm text-muted-foreground">
              {order.patientName} · {order.orderName}
            </p>
            <p className="text-sm text-muted-foreground">Created: {order.dateCreated}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline">Order</Badge>
            <Badge variant={stageBadgeVariant[order.stage]}>
              {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
            </Badge>
          </div>
        </div>
      );
    }

    if (option.resultType === 'easter_egg') {
      return (
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-medium">Illustration Mode</p>
            <p className="text-sm text-muted-foreground">
              Explore the patient view with a different aesthetic
            </p>
          </div>
          <Badge variant="outline">Explore</Badge>
        </div>
      );
    }

    return option.label;
  };

  return (
    <CommandPalette
      options={options as unknown as Option[]}
      onSelectOption={handleSelectOption as (option: Option) => void}
      renderOption={renderOption as (option: Option) => React.ReactNode}
      placeholder="Search patients, orders, member IDs..."
      listHeading="Results"
      enableTriggerShortcut
      centered
      topPosition={50}
      keyboardShortcutsLeft={[KeyboardShortcutType.CLOSE]}
      keyboardShortcutsRight={[KeyboardShortcutType.NAVIGATE, KeyboardShortcutType.SELECT]}
    >
      <span className="hidden" />
    </CommandPalette>
  );
}
