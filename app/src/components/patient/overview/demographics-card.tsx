'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@tennr/lasso/card';
import { Button } from '@tennr/lasso/button';
import { Phone, Envelope, MapPin, ArrowRight } from '@phosphor-icons/react';
import type { Patient } from '@/types/patient';

interface DemographicsCardProps {
  patient: Patient;
}

export function DemographicsCard({ patient }: DemographicsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/patients/${patient.id}/demographics`}>
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Envelope className="w-4 h-4 text-muted-foreground" />
          <span>{patient.email}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
          <span>
            {patient.address.street}
            <br />
            {patient.address.city}, {patient.address.state} {patient.address.zip}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
