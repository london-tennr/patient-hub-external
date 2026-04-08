'use client';

import { useRouter } from 'next/navigation';
import { SearchModal } from './search-modal';

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleSelectPatient = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  const handleSelectOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <>
      {children}
      <SearchModal
        onSelectPatient={handleSelectPatient}
        onSelectOrder={handleSelectOrder}
      />
    </>
  );
}
