'use client';

import { Phone, ChatCircleDots, EnvelopeSimple, FileText } from '@phosphor-icons/react';
import { Button } from '@tennr/lasso/button';

interface EngagementChannel {
  id: string;
  type: 'phone' | 'sms' | 'email' | 'fax';
  summary: string;
  date: string;
}

interface EngagementCardProps {
  channels?: EngagementChannel[];
  lastContactDaysAgo?: number;
}

const channelConfig: Record<EngagementChannel['type'], { label: string; icon: typeof Phone; iconBg: string; iconColor: string }> = {
  phone: { label: 'Phone', icon: Phone, iconBg: 'bg-bg-secondary', iconColor: 'text-icon-primary' },
  sms: { label: 'SMS', icon: ChatCircleDots, iconBg: 'bg-bg-secondary', iconColor: 'text-icon-primary' },
  email: { label: 'Email', icon: EnvelopeSimple, iconBg: 'bg-bg-secondary', iconColor: 'text-icon-primary' },
  fax: { label: 'Fax', icon: FileText, iconBg: 'bg-bg-secondary', iconColor: 'text-icon-primary' },
};

const mockChannels: EngagementChannel[] = [
  { id: '1', type: 'phone', summary: '2 calls · 0 answered', date: '2026-03-23' },
  { id: '2', type: 'sms', summary: '1 sent · No reply', date: '2026-03-23' },
  { id: '3', type: 'email', summary: 'Portal invite · Not opened', date: '2026-03-15' },
  { id: '4', type: 'fax', summary: '3 received · 1 sent', date: '2026-03-23' },
];

export function EngagementCard({
  channels = mockChannels,
  lastContactDaysAgo = 6,
}: EngagementCardProps) {
  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">
            Engagement
          </p>
          <span className="text-sm text-text-secondary">
            Last contact: {lastContactDaysAgo}d ago
          </span>
        </div>

        {/* Channel Rows */}
        <div>
          {channels.map(channel => {
            const config = channelConfig[channel.type];
            const Icon = config.icon;
            const date = new Date(channel.date);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return (
              <div
                key={channel.id}
                className="flex items-center gap-3 px-4 py-3 border-t border-border-secondary"
              >
                {/* Icon */}
                <div className={`flex items-center justify-center size-9 rounded-md ${config.iconBg} shrink-0`}>
                  <Icon weight="regular" className={`size-4.5 ${config.iconColor}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium lasso:wght-medium text-text-primary">{config.label}</p>
                  <p className="text-xs text-text-secondary">{channel.summary}</p>
                </div>

                {/* Date */}
                <span className="text-sm text-text-secondary shrink-0">{dateStr}</span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border-tertiary">
          <span className="text-sm text-text-secondary">
            {channels.length} channels active
          </span>
          <Button variant="outline" size="sm">
            Contact Patient
          </Button>
        </div>
      </div>
  );
}
