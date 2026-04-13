'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@tennr/lasso/utils/cn';

interface PatientTabsProps {
  patientId: string;
}

const tabs = [
  { name: 'Demographics', href: '/demographics' },
  { name: 'Payer', href: '/insurance' },
  { name: 'Orders', href: '/orders' },
  { name: 'Notes', href: '/notes' },
];

export function PatientTabs({ patientId }: PatientTabsProps) {
  const pathname = usePathname();
  const basePath = `/patients/${patientId}`;

  return (
    <nav className="bg-bg-primary px-6 border-b border-border-secondary">
      <div className="flex gap-6">
        {tabs.map(tab => {
          const href = `${basePath}${tab.href}`;
          const isActive = tab.href === ''
            ? pathname === basePath
            : pathname.startsWith(href);

          return (
            <Link
              key={tab.name}
              href={href}
              className={cn(
                'py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                isActive
                  ? 'border-text-primary text-text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
