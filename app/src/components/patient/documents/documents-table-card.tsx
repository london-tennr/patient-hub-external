'use client';

import { useState, useMemo, useCallback } from 'react';
import { CaretUp, CaretDown, Eye, DownloadSimple } from '@phosphor-icons/react';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@tennr/lasso/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tennr/lasso/popover';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@tennr/lasso/command';
import { cn } from '@tennr/lasso/utils/cn';
import type { OrderDocument } from '@/types/order';

interface PatientDocument extends OrderDocument {
  orderId?: string;
  orderNumber?: string;
}

interface DocumentsTableCardProps {
  documents: PatientDocument[];
  onViewDocument?: (doc: OrderDocument) => void;
  className?: string;
}

// Document type labels for display
const documentTypeLabels: Record<string, string> = {
  sleep_study: 'Sleep Study',
  prior_auth: 'Prior Auth',
  cmn: 'CMN',
  other: 'Other',
};

// Source labels for display
const sourceLabels: Record<string, string> = {
  ehr: 'EHR',
  tennr: 'Tennr',
  bright_tree: 'Bright Tree',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
}

type DocSortColumn = 'name' | 'type' | 'order' | 'date' | 'source';
type SortDirection = 'asc' | 'desc';

export function DocumentsTableCard({ documents, onViewDocument, className }: DocumentsTableCardProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<DocSortColumn>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = useCallback((column: DocSortColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  }, [sortColumn]);

  // Build filter options based on available documents
  const filterOptions = useMemo(() => {
    const documentTypes = [...new Set(documents.map(d => d.type))];
    return [
      { id: 'all', label: 'All' },
      ...documentTypes.map(type => ({
        id: type,
        label: documentTypeLabels[type] || type,
      })),
    ];
  }, [documents]);

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let result = selectedType === 'all' ? [...documents] : documents.filter(doc => doc.type === selectedType);

    const dir = sortDirection === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      switch (sortColumn) {
        case 'name':
          return dir * a.name.localeCompare(b.name);
        case 'type':
          return dir * (documentTypeLabels[a.type] || a.type).localeCompare(documentTypeLabels[b.type] || b.type);
        case 'order':
          return dir * ((a as PatientDocument).orderNumber || (a as PatientDocument).orderId || '').localeCompare((b as PatientDocument).orderNumber || (b as PatientDocument).orderId || '');
        case 'date':
          return dir * (new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        case 'source':
          return dir * (sourceLabels[a.source] || a.source).localeCompare(sourceLabels[b.source] || b.source);
        default:
          return 0;
      }
    });

    return result;
  }, [documents, selectedType, sortColumn, sortDirection]);

  const selectedLabel = filterOptions.find(opt => opt.id === selectedType)?.label || 'All';

  const columns: { key: DocSortColumn; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'order', label: 'Order' },
    { key: 'date', label: 'Date' },
    { key: 'source', label: 'Source' },
  ];

  return (
    <div
      className={cn(
        'bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden flex flex-col',
        className
      )}
    >
      {/* Filters Row */}
      <div className="flex items-center gap-2 px-2 py-2 bg-bg-white overflow-x-auto border-b border-border-tertiary">
        <div className="flex items-center">
          {/* Category pill */}
          <div className="flex items-center border border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-l-full">
            <span className="text-sm text-text-tertiary font-medium">Document type</span>
          </div>
          {/* Value pill with dropdown */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 border border-l-0 border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-r-full hover:bg-bg-tertiary transition-colors cursor-pointer">
                <span className="text-sm text-text-primary font-medium">{selectedLabel}</span>
                <CaretDown className="size-4 text-text-primary" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[200px]">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {filterOptions.map(option => (
                      <CommandItem
                        key={option.id}
                        onSelect={() => {
                          setSelectedType(option.id);
                          setFilterOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow className="bg-bg-secondary h-10 border-b border-border hover:bg-bg-secondary">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className="text-muted-foreground font-medium h-full cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  <span className="flex flex-col -space-y-1">
                    <CaretUp
                      weight="bold"
                      className={cn(
                        'size-3',
                        sortColumn === col.key && sortDirection === 'asc' ? 'text-foreground' : 'text-muted-foreground/40'
                      )}
                    />
                    <CaretDown
                      weight="bold"
                      className={cn(
                        'size-3',
                        sortColumn === col.key && sortDirection === 'desc' ? 'text-foreground' : 'text-muted-foreground/40'
                      )}
                    />
                  </span>
                </div>
              </TableHead>
            ))}
            <TableHead className="text-muted-foreground font-medium h-full w-[86px]">
              {/* Actions column */}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No documents found
              </TableCell>
            </TableRow>
          ) : (
            filteredDocuments.map(doc => (
              <TableRow
                key={doc.id}
                className="h-[52px] border-b border-border hover:bg-accent/50 transition-colors"
              >
                <TableCell className="text-foreground">
                  <span className="truncate block max-w-[200px]">{doc.name}</span>
                </TableCell>
                <TableCell className="text-foreground">
                  {documentTypeLabels[doc.type] || doc.type}
                </TableCell>
                <TableCell className="text-foreground">
                  {doc.orderNumber || doc.orderId || '—'}
                </TableCell>
                <TableCell className="text-foreground">
                  {formatDate(doc.dateAdded)}
                </TableCell>
                <TableCell className="text-foreground">
                  {sourceLabels[doc.source] || doc.source}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <ButtonV2
                      variant="outline"
                      size="icon"
                      className="rounded-full size-9 border-border-secondary hover:bg-accent/50"
                      onClick={() => onViewDocument?.(doc)}
                    >
                      <Eye className="size-4 text-foreground" />
                    </ButtonV2>
                    <ButtonV2
                      variant="outline"
                      size="icon"
                      className="rounded-full size-9 border-border-secondary hover:bg-accent/50"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = doc.url;
                        link.download = doc.name;
                        link.click();
                      }}
                    >
                      <DownloadSimple className="size-4 text-foreground" />
                    </ButtonV2>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <p className="text-sm text-text-secondary">
          Showing {filteredDocuments.length} of {documents.length} document{documents.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
