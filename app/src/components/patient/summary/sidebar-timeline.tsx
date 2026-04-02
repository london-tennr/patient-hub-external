'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { Avatar, AvatarImage, AvatarFallback } from '@tennr/lasso/avatar';
import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';

const imgAvatar = "https://www.figma.com/api/mcp/asset/77762ccd-cf45-40a3-8e54-d1c45040b201";

interface TimelineActivity {
  id: string;
  type: 'verification' | 'document' | 'referral' | 'order_complete' | 'prior_auth' | 'comment';
  title: string;
  description?: string;
  author?: {
    name: string;
    initials: string;
    avatar?: string;
  };
  timestamp: string;
}

interface SidebarTimelineProps {
  activities: TimelineActivity[];
  onAddComment?: (comment: string) => void;
}

type FilterType = 'all' | 'comments' | 'automated';

export function SidebarTimeline({ activities, onAddComment }: SidebarTimelineProps) {
  const [comment, setComment] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [comment]);

  const handleSubmit = () => {
    if (comment.trim() && onAddComment) {
      onAddComment(comment);
      setComment('');
      // Scroll to top after adding comment
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && comment.trim()) {
      e.preventDefault();
      handleSubmit();
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

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'comments') return activity.type === 'comment';
    if (filter === 'automated') return activity.type !== 'comment';
    return true;
  });

  const commentCount = activities.filter(a => a.type === 'comment').length;
  const automatedCount = activities.filter(a => a.type !== 'comment').length;

  return (
    <div className="flex flex-col h-full bg-bg-white relative">
      {/* Scrollable Timeline Content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {/* Timeline Events */}
        <div className="flex flex-col py-3 pb-8">
          {filteredActivities.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-text-tertiary">
                {filter === 'all'
                  ? 'No timeline events yet'
                  : `No ${filter === 'comments' ? 'comments' : 'automated events'} to display`}
              </p>
            </div>
          ) : (
            filteredActivities.map((activity, index) => {
              const isLast = index === filteredActivities.length - 1;
              const hasDescription = !!activity.description;
              const isComment = activity.type === 'comment';

              return (
                <div
                  key={activity.id}
                  className={cn(
                    "flex gap-2.5 px-4 group",
                    "transition-colors duration-150",
                    "hover:bg-bg-secondary/50"
                  )}
                >
                  {/* Avatar Column with Connector Line */}
                  <div className="flex flex-col items-center w-8 shrink-0">
                    <Avatar className={cn(
                      "size-7",
                      isComment ? "bg-bg-quartiary" : "bg-bg-tertiary"
                    )}>
                      {activity.type !== 'comment' ? (
                        <AvatarImage src={imgAvatar} />
                      ) : null}
                      <AvatarFallback className="text-xs text-text-primary">
                        {activity.type !== 'comment' ? 'AU' : activity.author?.initials || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {!isLast && (
                      <div className="w-px bg-border-secondary mt-1.5 mb-1.5 min-h-[8px] flex-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={cn(
                    "flex flex-col gap-1 flex-1 min-w-0",
                    !isLast && "pb-4"
                  )}>
                    {/* Header */}
                    <div className="flex items-start gap-1.5">
                      <span className={cn(
                        "text-[13px] leading-5",
                        isComment ? "text-text-primary font-medium" : "text-text-secondary"
                      )}>
                        {activity.type !== 'comment' ? 'Automated' : activity.author?.name}
                      </span>
                      <span className="text-[13px] leading-5 text-text-secondary truncate">
                        {activity.title.replace(
                          activity.type !== 'comment' ? 'Automated ' : (activity.author?.name || '') + ' ',
                          ''
                        )}
                      </span>
                    </div>

                    {/* Description - Comment content */}
                    {hasDescription && (
                      <div className="bg-bg-primary border border-border-secondary rounded-md px-2.5 py-2 mt-0.5">
                        <p className="text-[13px] leading-relaxed text-text-primary">
                          {activity.description}
                        </p>
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className="text-[11px] text-text-tertiary tabular-nums">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom fade gradient - content flows under this */}
      <div className="h-8 bg-gradient-to-t from-bg-white to-transparent -mt-8 relative z-10 pointer-events-none shrink-0" />

      {/* Floating Input Dock */}
      <div className="shrink-0 px-2 pt-1 pb-4 bg-bg-white">
        {/* Filter Pills */}
        <div className="flex gap-2 mb-2">
          <Badge
            variant="muted"
            className={cn(
              "cursor-pointer transition-colors",
              filter === 'all' && "bg-bg-tertiary-hover"
            )}
            onClick={() => setFilter('all')}
          >
            All
          </Badge>
          <Badge
            variant="muted"
            className={cn(
              "cursor-pointer transition-colors",
              filter === 'comments' && "bg-bg-tertiary-hover"
            )}
            onClick={() => setFilter('comments')}
          >
            Comments ({commentCount})
          </Badge>
          <Badge
            variant="muted"
            className={cn(
              "cursor-pointer transition-colors",
              filter === 'automated' && "bg-bg-tertiary-hover"
            )}
            onClick={() => setFilter('automated')}
          >
            Auto
          </Badge>
        </div>

        {/* Floating Input Card */}
        <div className="bg-bg-primary border border-border-secondary rounded-sm shadow-md">
          {/* Textarea */}
          <div className="min-h-[64px] p-3">
            <textarea
              ref={textareaRef}
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Leave a comment..."
              rows={1}
              className={cn(
                "w-full resize-none bg-transparent",
                "text-sm text-text-primary leading-5",
                "placeholder:text-text-placeholder",
                "focus:outline-none",
                "min-h-[20px] max-h-[100px]"
              )}
            />
          </div>

          {/* Addon Block */}
          <div className="flex items-center justify-between px-3 pt-1.5 pb-3">
            <div className="flex gap-2 items-center">
              {/* Left side actions can go here */}
            </div>
            <div className="flex gap-2 items-center">
              <button
                className={cn(
                  "size-7 rounded-full flex items-center justify-center transition-all duration-150 shadow-xs",
                  comment.trim()
                    ? "bg-brand-terracotta hover:bg-brand-terracotta/90 text-white"
                    : "bg-brand-terracotta/50 text-white/70 cursor-not-allowed"
                )}
                onClick={handleSubmit}
                disabled={!comment.trim()}
              >
                <ArrowUp className="size-4" weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
