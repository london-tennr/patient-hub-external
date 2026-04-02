'use client';

import { Badge } from '@tennr/lasso/badge';
import { cn } from '@tennr/lasso/utils/cn';
import type { SearchResult } from '@/types/search';

interface SearchResultCardProps {
  result: SearchResult;
  isSelected: boolean;
  onClick: () => void;
}

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  validation: 'outline',
  eligibility: 'secondary',
  qualification: 'default',
  complete: 'default',
};

export function SearchResultCard({ result, isSelected, onClick }: SearchResultCardProps) {
  if (result.type === 'patient') {
    const { patient, currentOrderStage } = result;
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full text-left px-4 py-3 rounded-lg transition-colors',
          'hover:bg-muted/50',
          isSelected && 'bg-muted'
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              DOB: {patient.dob} · MRN: {patient.mrn}
            </p>
            {patient.primaryInsurance && (
              <p className="text-sm text-muted-foreground">
                {patient.primaryInsurance.carrier} · {patient.primaryInsurance.memberId}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline">Patient</Badge>
            {currentOrderStage && (
              <span className="text-xs text-muted-foreground">{currentOrderStage}</span>
            )}
          </div>
        </div>
      </button>
    );
  }

  const { order } = result;
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3 rounded-lg transition-colors',
        'hover:bg-muted/50',
        isSelected && 'bg-muted'
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{order.id}</p>
          <p className="text-sm text-muted-foreground">
            {order.patientName} · {order.orderName}
          </p>
          <p className="text-sm text-muted-foreground">Created: {order.dateCreated}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline">Order</Badge>
          <Badge variant={stageBadgeVariant[order.stage]}>
            {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
          </Badge>
        </div>
      </div>
    </button>
  );
}
