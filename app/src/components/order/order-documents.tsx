'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { Eye, DownloadSimple } from '@phosphor-icons/react';
import type { OrderDocument } from '@/types/order';

interface OrderDocumentsProps {
  documents: OrderDocument[];
  onView: (doc: OrderDocument) => void;
}

const typeLabels: Record<string, string> = {
  sleep_study: 'Sleep Study',
  prior_auth: 'Prior Auth',
  cmn: 'CMN',
  other: 'Other',
};

export function OrderDocuments({ documents, onView }: OrderDocumentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No documents attached</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{typeLabels[doc.type] || doc.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(doc.dateAdded).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={doc.source === 'tennr' ? 'default' : 'secondary'}>
                      {doc.source === 'tennr' ? 'Tennr' : 'EHR'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => onView(doc)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={doc.url} download>
                          <DownloadSimple className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
