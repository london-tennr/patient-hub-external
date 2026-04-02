'use client';

import { cn } from '@tennr/lasso/utils/cn';
import { Check } from '@phosphor-icons/react';
import type { OrderStage } from '@/types/order';

interface StageStepperProps {
  currentStage: OrderStage;
}

const stages: { key: OrderStage; label: string }[] = [
  { key: 'validation', label: 'Validation' },
  { key: 'eligibility', label: 'Eligibility & Benefits' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'complete', label: 'Complete' },
];

export function StageStepper({ currentStage }: StageStepperProps) {
  const currentIndex = stages.findIndex(s => s.key === currentStage);

  return (
    <div className="flex items-center justify-between">
      {stages.map((stage, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={stage.key} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  isComplete && 'bg-primary text-primary-foreground',
                  isCurrent && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                  !isComplete && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isComplete ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium text-center',
                  isCurrent ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {stage.label}
              </span>
            </div>
            {index < stages.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2',
                  index < currentIndex ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
