'use client';

import { useState } from 'react';
import { Paperclip, ArrowUp } from '@phosphor-icons/react';
import { Avatar, AvatarImage, AvatarFallback } from '@tennr/lasso/avatar';
import { cn } from '@tennr/lasso/utils/cn';

const imgAvatar = "https://www.figma.com/api/mcp/asset/77762ccd-cf45-40a3-8e54-d1c45040b201";

interface TimelineActivity {
  id: string;
  type: 'automated' | 'comment';
  title: string;
  description?: string;
  author?: {
    name: string;
    initials: string;
    avatar?: string;
  };
  timestamp: string;
}

interface TimelineProps {
  activities: TimelineActivity[];
  onAddComment?: (comment: string) => void;
}

export function Timeline({ activities, onAddComment }: TimelineProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim() && onAddComment) {
      onAddComment(comment);
      setComment('');
    }
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    if (isToday) {
      return `Today, ${timeStr}`;
    }
    if (isYesterday) {
      return `Yesterday, ${timeStr}`;
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
    <div className="bg-white border border-[#efede9] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2">
        <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">Timeline</div>
      </div>

      {/* Input Area */}
      <div className="bg-bg-secondary border-t border-border-tertiary px-4 pt-2 pb-1.5 flex flex-col items-end gap-1">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Leave a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && comment.trim()) {
                handleSubmit();
              }
            }}
            className="w-full h-9 pl-3 pr-10 text-sm bg-white border border-border-primary rounded-sm placeholder:text-text-placeholder focus:outline-none focus:border-brand-terracotta text-text-primary shadow-xs"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-brand-terracotta hover:bg-brand-terracotta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!comment.trim()}
          >
            <ArrowUp className="w-3.5 h-3.5 text-white" weight="bold" />
          </button>
        </div>
        <button className="flex items-center gap-2 text-xs font-medium text-text-tertiary hover:text-text-primary transition-colors px-2 py-1">
          <span>Attach file</span>
          <Paperclip className="h-4 w-4" />
        </button>
      </div>

      {/* Timeline Events */}
      <div className="flex flex-col border-t border-border-tertiary pt-3.5 pb-3.5">
        {activities.map((activity, index) => {
          const isLast = index === activities.length - 1;
          const hasDescription = !!activity.description;

          return (
            <div
              key={activity.id}
              className="flex gap-3 px-4"
            >
              {/* Avatar Column with Connector Line */}
              <div className="flex flex-col items-center w-[39px] shrink-0">
                <Avatar className="size-8 bg-bg-quartiary">
                  {activity.type === 'automated' ? (
                    <AvatarImage src={imgAvatar} />
                  ) : null}
                  <AvatarFallback className="text-sm text-text-primary">
                    {activity.type === 'automated' ? 'AU' : activity.author?.initials || 'U'}
                  </AvatarFallback>
                </Avatar>
                {!isLast && (
                  <div className="w-px bg-border-secondary mt-1 mb-1 min-h-[12px] flex-1" />
                )}
              </div>

              {/* Content */}
              <div className={cn(
                "flex flex-col gap-1 w-full",
                !isLast && "pb-6"
              )}>
                <div className="flex gap-1 text-sm text-text-primary">
                  <span className="font-medium">
                    {activity.type === 'automated' ? 'Automated' : activity.author?.name}
                  </span>
                  <span>
                    {activity.title.replace(activity.type === 'automated' ? 'Automated ' : (activity.author?.name || '') + ' ', '')}
                  </span>
                </div>

                {hasDescription && (
                  <div className="bg-bg-primary border border-border-secondary rounded-md p-3 w-full">
                    <p className="text-sm text-text-primary">
                      &ldquo;{activity.description}&rdquo;
                    </p>
                  </div>
                )}

                <span className="text-xs text-text-tertiary font-mono">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
