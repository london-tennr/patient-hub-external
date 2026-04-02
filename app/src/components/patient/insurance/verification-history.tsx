'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';

interface VerificationAttempt {
  id: string;
  date: string;
  result: 'success' | 'failed' | 'pending';
  runBy: string;
  notes?: string;
}

interface VerificationHistoryProps {
  history: VerificationAttempt[];
}

const resultConfig = {
  success: { variant: 'default' as const, label: 'Success' },
  failed: { variant: 'destructive' as const, label: 'Failed' },
  pending: { variant: 'secondary' as const, label: 'Pending' },
};

export function VerificationHistory({ history }: VerificationHistoryProps) {
  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-tertiary">
        <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">Verification History</div>
      </div>

      {/* Content */}
      <div className="p-4">
        {history.length === 0 ? (
          <p className="text-sm text-text-secondary">No verification attempts</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Run By</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map(attempt => (
                <TableRow key={attempt.id}>
                  <TableCell>{new Date(attempt.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={resultConfig[attempt.result].variant}>
                      {resultConfig[attempt.result].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{attempt.runBy}</TableCell>
                  <TableCell className="text-text-secondary">{attempt.notes || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
