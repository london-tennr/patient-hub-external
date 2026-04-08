'use client';

import { Phone, ChatCircleDots, EnvelopeSimple, FileText } from '@phosphor-icons/react';

interface EngagementChannel {
  id: string;
  type: 'phone' | 'sms' | 'email' | 'fax';
  summary: string;
  date: string;
}

interface EngagementCardProps {
  phone?: string;
  channels?: EngagementChannel[];
  lastContactDaysAgo?: number;
}

const channelConfig: Record<EngagementChannel['type'], { label: string; icon: typeof Phone }> = {
  phone: { label: 'Phone', icon: Phone },
  sms: { label: 'SMS', icon: ChatCircleDots },
  email: { label: 'Email', icon: EnvelopeSimple },
  fax: { label: 'Fax', icon: FileText },
};

const mockChannels: EngagementChannel[] = [
  { id: '1', type: 'phone', summary: '2 calls · 0 answered', date: '2026-03-23' },
  { id: '2', type: 'sms', summary: '1 sent · No reply', date: '2026-03-23' },
  { id: '3', type: 'email', summary: 'Portal invite · Not opened', date: '2026-03-15' },
  { id: '4', type: 'fax', summary: '3 received · 1 sent', date: '2026-03-23' },
];

export function EngagementCard({
  phone,
  channels = mockChannels,
  lastContactDaysAgo = 6,
}: EngagementCardProps) {
  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">
            Engagement
          </p>
          {phone && (
            <span className="text-[11px] text-text-tertiary">{phone}</span>
          )}
        </div>

        {/* Channel Rows */}
        <div className="border-t border-border-tertiary px-4 pt-2 pb-1.5">
          {channels.map(channel => {
            const config = channelConfig[channel.type];
            const Icon = config.icon;
            const date = new Date(channel.date);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return (
              <div
                key={channel.id}
                className="flex items-center gap-2.5 py-1.5"
              >
                {/* Icon */}
                <div className="size-5 rounded-full border border-border-secondary flex items-center justify-center bg-bg-white shrink-0">
                  <Icon weight="regular" className="size-3 text-text-tertiary" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] font-medium lasso:wght-medium text-text-primary">{config.label}</span>
                  <span className="text-[11px] text-text-tertiary ml-1.5">{channel.summary}</span>
                </div>

                {/* Date */}
                <span className="text-[11px] text-text-tertiary shrink-0">{dateStr}</span>
              </div>
            );
          })}
        </div>

      </div>
  );
}
