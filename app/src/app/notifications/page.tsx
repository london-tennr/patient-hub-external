'use client';

import { useState } from 'react';
import { WarningCircle, Gear } from '@phosphor-icons/react';
import { cn } from '@tennr/lasso/utils/cn';
import { Button } from '@tennr/lasso/button';

const TABS = ['Alerts', 'Outages'] as const;
type Tab = (typeof TABS)[number];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Alerts');

  return (
    <div className="flex flex-col w-full min-h-full px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="font-display font-light text-4xl text-text-primary">Notifications</h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <span className="size-1.5 rounded-full bg-red-500" />
            1 ongoing outage
          </span>
        </div>
        <Button variant="outline" size="sm">
          <Gear weight="regular" className="size-4 mr-1.5" />
          Preferences
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border-secondary mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'relative pb-2.5 text-sm font-medium transition-colors cursor-pointer',
              activeTab === tab
                ? 'text-text-primary'
                : 'text-text-tertiary hover:text-text-secondary'
            )}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center py-24">
        <WarningCircle weight="regular" className="size-12 text-text-tertiary mb-4" />
        <h2 className="text-xl font-medium text-text-primary mb-1.5">No alerts</h2>
        <p className="text-sm text-text-tertiary">There are no alerts to show</p>
      </div>
    </div>
  );
}
