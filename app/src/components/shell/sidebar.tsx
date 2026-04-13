'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  MagnifyingGlass,
  Users,
  CaretUpDown,
  Question,
  DesktopTower,
  Wrench,
  ClockCounterClockwise,
  Bell,
  ChartLineUp,
  FileText,
  UsersFour,
  Gear,
  TreeStructure,
  Phone,
  Stethoscope,
  CreditCard,
  Tag,
  UserCircleGear,
  Faders,
  Robot,
  UsersThree,
  X,
} from '@phosphor-icons/react';
import { cn } from '@tennr/lasso/utils/cn';
import { Avatar, AvatarImage, AvatarFallback } from '@tennr/lasso/avatar';
import { UserMenuPopover } from './user-menu-popover';

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export function Sidebar({ collapsed = false, onCollapsedChange, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const userButtonRef = React.useRef<HTMLButtonElement>(null);

  const triggerSearch = React.useCallback(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  }, []);

  const navGroups: NavGroup[] = [
    {
      label: 'Main',
      items: [
        { label: 'My Workspace', href: '/workspace', icon: DesktopTower, disabled: true },
        { label: 'Workers', href: '/workers', icon: Wrench, disabled: true },
        { label: 'Patient Hub', href: '/explore', icon: Users },
        { label: 'Historical View', href: '/historical', icon: ClockCounterClockwise, disabled: true },
        { label: 'Notifications', href: '/notifications', icon: Bell, disabled: true },
        { label: 'Analytics', href: '/analytics', icon: ChartLineUp, disabled: true },
        { label: 'Help Center', href: '/help', icon: FileText, disabled: true },
      ],
    },
    {
      label: 'Workflow',
      items: [
        { label: 'Workspace Dashboard', href: '/workflows', icon: UserCircleGear, disabled: true },
        { label: 'Autopilot', href: '/autopilot', icon: Robot, disabled: true },
      ],
    },
    {
      label: 'Management',
      items: [
        { label: 'Team', href: '/team', icon: UsersThree, disabled: true },
        { label: 'Patient Pipeline', href: '/patients', icon: UsersFour, disabled: true },
        { label: 'Phone Calling', href: '/phone', icon: Phone, disabled: true },
        { label: 'Referring', href: '/referring', icon: Stethoscope, disabled: true },
        { label: 'Offerings', href: '/offerings', icon: Tag, disabled: true },
        { label: 'Qualifications', href: '/qualifications', icon: Users, disabled: true },
        { label: 'Payers', href: '/payers', icon: CreditCard, disabled: true },
        { label: 'Document Labeling', href: '/document-labeling', icon: Faders, disabled: true },
        { label: 'Settings', href: '/settings', icon: Gear, disabled: true },
      ],
    },
    {
      label: 'Configuration',
      items: [
        { label: 'Workflows', href: '/config/workflows', icon: TreeStructure, disabled: true },
      ],
    },
  ];

  const isItemActive = (item: NavItem) => {
    if (item.href === '/') {
      return pathname === '/';
    }
    // Patient Hub should stay active when viewing patient profiles
    if (item.href === '/explore') {
      return pathname === '/explore' || pathname.startsWith('/explore/') || pathname.startsWith('/patients/');
    }
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  return (
    <div
      className={cn(
        'bg-[var(--neutral-3)] flex flex-col h-full shrink-0 transition-all duration-300',
        collapsed ? 'w-12' : 'w-64'
      )}
    >
      {/* Sidebar Header */}
      <div
        className={cn(
          'bg-[var(--neutral-3)] flex items-center p-2',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <div
          className={cn(
            'flex items-center gap-2',
            collapsed ? 'p-0' : 'p-2 flex-1'
          )}
        >
          <Image
            src="/images/tennr-logo.svg"
            alt="Tennr Logo"
            width={32}
            height={32}
            className="shrink-0"
          />
          {!collapsed && (
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-[var(--neutral-11)]">
                DMEPOS Factory
              </span>
            </div>
          )}
        </div>
        {/* Mobile close button */}
        {isMobileOpen && onMobileClose && (
          <button
            onClick={onMobileClose}
            className="p-2 rounded-full hover:bg-[var(--neutral-4)] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-[var(--neutral-11)]" />
          </button>
        )}
        {/* Desktop collapse button */}
        {!collapsed && !isMobileOpen && (
          <button
            onClick={() => onCollapsedChange?.(!collapsed)}
            className="p-2 rounded-full hover:bg-[var(--neutral-4)] transition-colors"
          >
            <CaretDoubleLeft className="w-4 h-4 text-[var(--neutral-11)]" />
          </button>
        )}
      </div>

      {/* Search Button */}
      <div className="px-2 pb-2">
        <button
          onClick={triggerSearch}
          className={cn(
            'flex items-center gap-2 rounded-sm text-sm transition-colors w-full bg-[var(--neutral-1)] shadow-xs h-7',
            'text-[var(--neutral-10)] hover:text-[var(--neutral-12)]',
            collapsed ? 'justify-center p-2' : 'px-2'
          )}
          title={collapsed ? 'Search (⌘K)' : undefined}
        >
          <MagnifyingGlass className="w-4 h-4 shrink-0 text-[var(--neutral-10)]" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left text-[var(--neutral-10)]">Search</span>
              <kbd className="text-xs text-[var(--neutral-10)] bg-[var(--neutral-3)] px-1 py-0.5 rounded-sm font-medium">
                ⌘K
              </kbd>
            </>
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 flex flex-col gap-1 px-2 overflow-y-auto">
        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={() => onCollapsedChange?.(!collapsed)}
            className="flex items-center justify-center p-2 rounded-md hover:bg-[var(--neutral-4)] transition-colors mb-1"
            title="Expand sidebar"
          >
            <CaretDoubleRight className="w-4 h-4 text-[var(--neutral-11)]" />
          </button>
        )}

        {navGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-0.5">
            {/* Group Label */}
            {!collapsed && group.label !== 'Main' && (
              <div className="px-2 pt-4 pb-1">
                <span className="text-xs font-medium text-[var(--neutral-9)] uppercase tracking-wide">
                  {group.label}
                </span>
              </div>
            )}

            {/* Group Items */}
            <nav className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = isItemActive(item);
                const Icon = item.icon;

                if (item.disabled) {
                  return (
                    <div
                      key={item.label}
                      className={cn(
                        'flex items-center gap-2.5 rounded-md text-sm font-normal transition-colors cursor-default',
                        collapsed ? 'justify-center p-2' : 'px-2 py-1.5',
                        'min-h-[44px] md:min-h-0',
                        'text-[var(--neutral-11)]'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!collapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                      {!collapsed && item.badge && (
                        <span className="bg-[#8B4533] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => onMobileClose?.()}
                    className={cn(
                      'flex items-center gap-2.5 rounded-md text-sm font-normal transition-colors',
                      collapsed ? 'justify-center p-2' : 'px-2 py-1.5',
                      'min-h-[44px] md:min-h-0',
                      isActive
                        ? 'bg-[var(--neutral-5)] text-[var(--neutral-12)] font-medium'
                        : 'text-[var(--neutral-11)] hover:bg-[var(--neutral-4)] hover:text-[var(--neutral-12)]'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={cn('w-5 h-5 shrink-0', isActive && 'text-[var(--neutral-12)]')} />
                    {!collapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="bg-[#8B4533] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Sidebar Footer - User Profile */}
      <div className="p-2">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2 pb-2.5">
            <button
              className="p-2 rounded-md hover:bg-[var(--neutral-4)] transition-colors"
              title="Help"
            >
              <Question className="w-4 h-4 text-[var(--neutral-11)]" />
            </button>
            <button
              ref={userButtonRef}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-0 rounded-md hover:bg-[var(--neutral-4)] transition-colors"
              title="User Menu"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="/images/avatar.png" alt="User avatar" />
                <AvatarFallback>LZ</AvatarFallback>
              </Avatar>
            </button>
          </div>
        ) : (
          <button
            ref={userButtonRef}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-[var(--neutral-4)] transition-colors"
          >
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src="/images/avatar.png" alt="User avatar" />
              <AvatarFallback>LZ</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-semibold text-[var(--neutral-12)] truncate">
                London Zhang
              </div>
              <div className="text-xs text-[var(--neutral-9)] truncate">
                london.zhang@tennr.com
              </div>
            </div>
            <CaretUpDown className="w-4 h-4 text-[var(--neutral-9)]" />
          </button>
        )}
        <UserMenuPopover
          isOpen={isUserMenuOpen}
          onClose={() => setIsUserMenuOpen(false)}
          anchorRef={userButtonRef}
        />
      </div>
    </div>
  );
}
