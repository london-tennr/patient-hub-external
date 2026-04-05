'use client';

import { useState, useMemo } from 'react';
import { CaretDown, Eye, DownloadSimple } from '@phosphor-icons/react';
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

export function DocumentsTableCard({ documents, onViewDocument, className }: DocumentsTableCardProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [filterOpen, setFilterOpen] = useState(false);

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

  // Filter documents based on selected type
  const filteredDocuments = useMemo(() => {
    if (selectedType === 'all') return documents;
    return documents.filter(doc => doc.type === selectedType);
  }, [documents, selectedType]);

  const selectedLabel = filterOptions.find(opt => opt.id === selectedType)?.label || 'All';

  return (
    <div
      className={cn(
        'bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden flex flex-col',
        className
      )}
    >
      {/* Card Header */}
      <div className="flex items-center px-4 py-3 border-b border-border-tertiary">
        <p className="text-base font-medium lasso:wght-medium leading-6 text-text-primary">
          All documents
        </p>
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-2 px-2 py-2 bg-bg-white overflow-x-auto">
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
      <div className="border-t border-border-tertiary">
        <Table>
          <TableHeader>
            <TableRow className="bg-bg-secondary h-10 border-b border-border-secondary hover:bg-bg-secondary">
              <TableHead className="text-text-secondary font-medium h-full pl-4 pr-2 min-w-[200px]">
                Name
              </TableHead>
              <TableHead className="text-text-secondary font-medium h-full px-2">
                Type
              </TableHead>
              <TableHead className="text-text-secondary font-medium h-full px-2">
                Order
              </TableHead>
              <TableHead className="text-text-secondary font-medium h-full px-2">
                Date
              </TableHead>
              <TableHead className="text-text-secondary font-medium h-full px-2">
                Source
              </TableHead>
              <TableHead className="text-text-secondary font-medium h-full pl-2 pr-4 text-right w-[86px]">
                {/* Actions column - empty header */}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-text-secondary">
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map(doc => (
                <TableRow
                  key={doc.id}
                  className="h-[52px] border-b border-border-secondary hover:bg-bg-primary-hover transition-colors"
                >
                  <TableCell className="text-text-primary pl-4 pr-2 font-normal">
                    <span className="truncate block max-w-[200px]">{doc.name}</span>
                  </TableCell>
                  <TableCell className="text-text-primary px-2 font-normal">
                    {documentTypeLabels[doc.type] || doc.type}
                  </TableCell>
                  <TableCell className="text-text-primary px-2 font-normal">
                    {doc.orderNumber || doc.orderId || '—'}
                  </TableCell>
                  <TableCell className="text-text-primary px-2 font-normal">
                    {formatDate(doc.dateAdded)}
                  </TableCell>
                  <TableCell className="text-text-primary px-2 font-normal">
                    {sourceLabels[doc.source] || doc.source}
                  </TableCell>
                  <TableCell className="pl-2 pr-4">
                    <div className="flex justify-end gap-1">
                      <ButtonV2
                        variant="outline"
                        size="icon"
                        className="rounded-full size-9 border-border-secondary hover:bg-bg-primary-hover"
                        onClick={() => onViewDocument?.(doc)}
                      >
                        <Eye className="size-4 text-text-primary" />
                      </ButtonV2>
                      <ButtonV2
                        variant="outline"
                        size="icon"
                        className="rounded-full size-9 border-border-secondary hover:bg-bg-primary-hover"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = doc.url;
                          link.download = doc.name;
                          link.click();
                        }}
                      >
                        <DownloadSimple className="size-4 text-text-primary" />
                      </ButtonV2>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end px-4 py-2 bg-bg-secondary border-t border-border-tertiary">
        <p className="text-xs text-text-secondary">
          Total: {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
