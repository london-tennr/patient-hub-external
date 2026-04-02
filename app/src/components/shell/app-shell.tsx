'use client';

import React, { createContext, useContext } from 'react';
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

  return (
    <AppShellContext.Provider value={{ disableInsetWrapper, setDisableInsetWrapper }}>
      <div className="fixed inset-0 bg-[var(--neutral-3)] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <Sidebar
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
          />

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
