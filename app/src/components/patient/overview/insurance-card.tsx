'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Badge } from '@tennr/lasso/badge';
import { ArrowRight, CheckCircle, Clock, XCircle } from '@phosphor-icons/react';
import type { Patient } from '@/types/patient';

interface InsuranceCardProps {
  patient: Patient;
}

const statusConfig = {
  verified: { icon: CheckCircle, variant: 'default' as const, label: 'Verified' },
  pending: { icon: Clock, variant: 'secondary' as const, label: 'Pending' },
  failed: { icon: XCircle, variant: 'destructive' as const, label: 'Failed' },
};

export function InsuranceCard({ patient }: InsuranceCardProps) {
  const insurance = patient.primaryInsurance;

  if (!insurance) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Insurance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No insurance on file</p>
        </CardContent>
      </Card>
    );
  }

  const status = statusConfig[insurance.eligibilityStatus];
  const StatusIcon = status.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/patients/${patient.id}/insurance`}>
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-medium">{insurance.carrier}</p>
          <p className="text-sm text-muted-foreground">{insurance.plan}</p>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Member ID:</span> {insurance.memberId}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={status.variant}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
          {insurance.lastVerified && (
            <span className="text-xs text-muted-foreground">
              Last verified: {new Date(insurance.lastVerified).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
