'use client';

import React, { createContext, useContext } from 'react';
import { List } from '@phosphor-icons/react';
import { Avatar, AvatarImage, AvatarFallback } from '@tennr/lasso/avatar';
import { Sidebar } from './sidebar';
import { cn } from '@tennr/lasso/utils/cn';

// Context to allow children to opt-out of the default inset wrapper
interface AppShellContextValue {
  disableInsetWrapper: boolean;
  setDisableInsetWrapper: (value: boolean) => void;
}

const AppShellContext = createContext<AppShellContextValue>({
  disableInsetWrapper: false,
  setDisableInsetWrapper: () => {},
});

export function useAppShell() {
  return useContext(AppShellContext);
}

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [disableInsetWrapper, setDisableInsetWrapper] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <AppShellContext.Provider value={{ disableInsetWrapper, setDisableInsetWrapper }}>
      <div className="fixed inset-0 bg-[var(--neutral-3)] overflow-hidden">
        <div className="flex h-full flex-col md:flex-row">

          {/* Mobile top header bar — visible only below md */}
          <div className="flex md:hidden items-center justify-between px-3 h-12 border-b border-border-tertiary bg-[var(--neutral-3)] shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md hover:bg-[var(--neutral-4)] transition-colors"
              aria-label="Open menu"
            >
              <List className="w-5 h-5 text-[var(--neutral-11)]" />
            </button>
            <span className="text-sm font-semibold text-[var(--neutral-11)]">
              Best Doctors
            </span>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/images/avatar.png" alt="User avatar" />
              <AvatarFallback>LZ</AvatarFallback>
            </Avatar>
          </div>

          {/* Desktop sidebar — hidden on mobile */}
          <div className="hidden md:flex">
            <Sidebar
              collapsed={sidebarCollapsed}
              onCollapsedChange={setSidebarCollapsed}
            />
          </div>

          {/* Mobile overlay sidebar — shown when mobileMenuOpen is true */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />
              {/* Sidebar panel */}
              <div className="relative z-10 flex h-full w-72 max-w-[85vw]">
                <Sidebar
                  collapsed={false}
                  onCollapsedChange={() => {}}
                  isMobileOpen={mobileMenuOpen}
                  onMobileClose={() => setMobileMenuOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Main Content Area */}
          {disableInsetWrapper ? (
            <div className="flex-1 flex flex-col p-2 min-w-0">
              {children}
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-2 min-w-0">
              <main
                className={cn(
                  'flex-1 bg-[var(--neutral-1)] rounded-xs overflow-y-auto overflow-x-hidden',
                  'shadow-[0_0_6px_1px_rgba(0,0,0,0.03),0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]',
                  className
                )}
              >
                {children}
              </main>
            </div>
          )}
        </div>
      </div>
    </AppShellContext.Provider>
  );
}
