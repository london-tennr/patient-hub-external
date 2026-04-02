'use client';

import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SignOut } from '@phosphor-icons/react';
import { cn } from '@tennr/lasso/utils/cn';
import { Avatar, AvatarImage, AvatarFallback } from '@tennr/lasso/avatar';
import { Separator } from '@tennr/lasso/separator';

interface UserMenuPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export function UserMenuPopover({ isOpen, onClose, anchorRef }: UserMenuPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const updatePosition = () => {
        if (!anchorRef?.current) return;

        const rect = anchorRef.current.getBoundingClientRect();
        const sideOffset = 8;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = rect.right + sideOffset;
        let top = rect.top - 48;

        if (popoverRef.current) {
          const popoverRect = popoverRef.current.getBoundingClientRect();
          const popoverWidth = popoverRect.width;
          const popoverHeight = popoverRect.height;

          if (left + popoverWidth > viewportWidth) {
            left = rect.left - popoverWidth - sideOffset;
          }

          if (top + popoverHeight > viewportHeight) {
            top = viewportHeight - popoverHeight - 8;
          }

          if (top < 8) {
            top = 8;
          }
        } else {
          const approximateWidth = 240;
          if (left + approximateWidth > viewportWidth) {
            left = rect.left - approximateWidth - sideOffset;
          }
        }

        setPosition({ top, left });
      };

      updatePosition();

      requestAnimationFrame(() => {
        updatePosition();
        requestAnimationFrame(() => {
          updatePosition();
        });
      });

      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, [isOpen, anchorRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, anchorRef]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const popoverContent = (
    <div
      ref={popoverRef}
      className={cn(
        'fixed bg-popover border border-border rounded-md shadow-lg',
        'animate-in fade-in-0 zoom-in-95',
        'z-[9999] min-w-[240px]'
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="p-2">
        {/* User Info Section */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/images/avatar.png" alt="User avatar" />
              <AvatarFallback>BB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">Brittany Baxter</div>
              <div className="text-xs text-muted-foreground">brittbaxter@tennr.com</div>
            </div>
          </div>
        </div>

        <Separator className="my-1" />

        {/* Sign Out */}
        <button
          onClick={() => {
            console.log('Sign out');
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
        >
          <SignOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(popoverContent, document.body);
}
