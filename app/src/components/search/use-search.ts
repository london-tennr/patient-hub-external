'use client';

import { useState, useCallback } from 'react';
import type { SearchResult, SearchState } from '@/types/search';

// Mock data for development
const mockPatients = [
  {
    type: 'patient' as const,
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
        eligibilityStatus: 'verified' as const,
        effectiveDate: '2025-11-25',
        status: 'active' as const,
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

const mockOrders = [
  {
    type: 'order' as const,
    order: {
      id: 'ORD001',
      externalOrderId: 'ClH6A0xTUYS-bgJa',
      patientId: '1',
      patientName: 'John Smith',
      patientDob: '1985-03-15',
      orderName: 'CGM & Supplies',
      orderType: 'DME',
      status: 'on_track' as const,
      statusUpdated: '2026-01-19',
      orderAge: '9 days',
      items: [{ id: 'LI001', description: 'CGM supply allowance', hcpcsCode: 'A4239', product: 'Freestyle Libre 3 sensors', quantity: 2 }],
      stage: 'eligibility' as const,
      subStatus: 'in_progress' as const,
      referringPractitioner: null,
      referringFacility: null,
      dateCreated: '2026-01-10',
      lastUpdated: '2026-01-19',
      documents: [],
      notes: [],
    },
  },
];

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    recentSearches: [],
    isLoading: false,
    selectedIndex: 0,
  });

  const search = useCallback((query: string) => {
    setState(prev => ({ ...prev, query, isLoading: true, selectedIndex: 0 }));

    // Simulate search delay
    setTimeout(() => {
      const q = query.toLowerCase();
      const patientResults = mockPatients.filter(
        p =>
          p.patient.firstName.toLowerCase().includes(q) ||
          p.patient.lastName.toLowerCase().includes(q) ||
          p.patient.mrn.toLowerCase().includes(q) ||
          p.patient.primaryInsurance?.memberId.toLowerCase().includes(q)
      );
      const orderResults = mockOrders.filter(
        o =>
          o.order.id.toLowerCase().includes(q) ||
          o.order.patientName.toLowerCase().includes(q) ||
          o.order.orderName.toLowerCase().includes(q)
      );

      setState(prev => ({
        ...prev,
        results: [...patientResults, ...orderResults],
        isLoading: false,
      }));
    }, 150);
  }, []);

  const selectNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedIndex: Math.min(prev.selectedIndex + 1, prev.results.length - 1),
    }));
  }, []);

  const selectPrev = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedIndex: Math.max(prev.selectedIndex - 1, 0),
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setState(prev => ({ ...prev, query: '', results: [], selectedIndex: 0 }));
  }, []);

  return {
    ...state,
    search,
    selectNext,
    selectPrev,
    clearSearch,
  };
}
