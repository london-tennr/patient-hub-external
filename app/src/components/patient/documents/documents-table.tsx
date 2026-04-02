'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tennr/lasso/table';
import { Badge } from '@tennr/lasso/badge';
import { Button } from '@tennr/lasso/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { Eye, DownloadSimple, CaretUpDown } from '@phosphor-icons/react';
import type { OrderDocument } from '@/types/order';

interface DocumentsTableProps {
  documents: (OrderDocument & { orderId?: string })[];
  onView: (doc: OrderDocument) => void;
}

const typeLabels: Record<string, string> = {
  sleep_study: 'Sleep Study',
  prior_auth: 'Prior Auth',
  cmn: 'CMN',
  other: 'Other',
};

type SortField = 'name' | 'dateAdded' | 'type';
type SortDirection = 'asc' | 'desc';

export function DocumentsTable({ documents, onView }: DocumentsTableProps) {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('dateAdded');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const uniqueOrders = [...new Set(documents.map(d => d.orderId).filter(Boolean))];

  const filteredDocs = documents
    .filter(doc => typeFilter === 'all' || doc.type === typeFilter)
    .filter(doc => orderFilter === 'all' || doc.orderId === orderFilter)
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'dateAdded') {
        return (new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()) * modifier;
      }
      return a[sortField].localeCompare(b[sortField]) * modifier;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sleep_study">Sleep Study</SelectItem>
            <SelectItem value="prior_auth">Prior Auth</SelectItem>
            <SelectItem value="cmn">CMN</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={orderFilter} onValueChange={setOrderFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            {uniqueOrders.map(orderId => (
              <SelectItem key={orderId} value={orderId!}>
                {orderId}
              </SelectItem>
            ))}
            <SelectItem value="unattached">Unattached</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No documents found</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('name')}>
                  Name
                  <CaretUpDown className="w-4 h-4 ml-1" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('type')}>
                  Type
                  <CaretUpDown className="w-4 h-4 ml-1" />
                </Button>
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('dateAdded')}>
                  Date Added
                  <CaretUpDown className="w-4 h-4 ml-1" />
                </Button>
              </TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocs.map(doc => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{typeLabels[doc.type] || doc.type}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{doc.orderId || '—'}</TableCell>
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
    </div>
  );
}
