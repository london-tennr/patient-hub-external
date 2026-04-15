'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { CaretUp, CaretDown, DownloadSimple } from '@phosphor-icons/react';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@tennr/lasso/pagination';
import { cn } from '@tennr/lasso/utils/cn';
import type { OrderDocument } from '@/types/order';

const DOCS_PER_PAGE = 10;

function getVisiblePages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages: (number | 'ellipsis')[] = [];
  const near = new Set<number>();
  near.add(current);
  if (current > 0) near.add(current - 1);
  if (current < total - 1) near.add(current + 1);
  near.add(0);
  near.add(total - 1);

  const sorted = Array.from(near).sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      pages.push('ellipsis');
    }
    pages.push(sorted[i]);
  }

  return pages;
}

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
  const [page, setPage] = useState(0);

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

  const totalPages = Math.ceil(filteredDocuments.length / DOCS_PER_PAGE);
  const pagedDocuments = filteredDocuments.slice(page * DOCS_PER_PAGE, (page + 1) * DOCS_PER_PAGE);

  useEffect(() => { setPage(0); }, [selectedType, sortColumn, sortDirection]);

  const selectedLabel = filterOptions.find(opt => opt.id === selectedType)?.label || 'All';

  const columns: { key: DocSortColumn | 'download'; label: string; sortable: boolean }[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'order', label: 'Order', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'download', label: 'Download', sortable: false },
  ];

  return (
    <div className={cn('flex flex-col', className)}>
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden flex flex-col">
      {/* Title Row */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-tertiary shrink-0">
        <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">All documents</div>
      </div>
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
              <button suppressHydrationWarning className="flex items-center gap-2 border border-l-0 border-border-secondary bg-bg-secondary px-2.5 py-1 rounded-r-full hover:bg-bg-tertiary transition-colors cursor-pointer">
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
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-bg-secondary h-10 border-b border-border hover:bg-bg-secondary">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  'text-muted-foreground font-medium h-full select-none transition-colors',
                  col.sortable && 'cursor-pointer hover:text-foreground',
                  (col.key === 'order' || col.key === 'source') && 'hidden md:table-cell',
                  col.key === 'download' && 'w-20',
                )}
                onClick={() => col.sortable && handleSort(col.key as DocSortColumn)}
              >
                {col.key === 'download' ? (
                  <span>{col.label}</span>
                ) : (
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
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
                    )}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedDocuments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No documents found
              </TableCell>
            </TableRow>
          ) : (
            pagedDocuments.map(doc => (
              <TableRow
                key={doc.id}
                onClick={() => onViewDocument?.(doc)}
                className="cursor-pointer border-b border-border hover:bg-accent/50 transition-colors"
              >
                <TableCell className="text-foreground text-sm">
                  <span className="break-words">{doc.name}</span>
                </TableCell>
                <TableCell className="text-foreground text-sm">
                  {documentTypeLabels[doc.type] || doc.type}
                </TableCell>
                <TableCell className="text-foreground text-sm hidden md:table-cell">
                  {doc.orderNumber || doc.orderId || '—'}
                </TableCell>
                <TableCell className="text-foreground text-sm">
                  {formatDate(doc.dateAdded)}
                </TableCell>
                <TableCell className="text-foreground text-sm hidden md:table-cell">
                  {sourceLabels[doc.source] || doc.source}
                </TableCell>
                <TableCell className="w-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="inline-flex items-center justify-center size-7 rounded-md hover:bg-bg-tertiary transition-colors cursor-pointer"
                    aria-label="Download"
                  >
                    <DownloadSimple weight="regular" className="size-4 text-text-secondary" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

    </div>

      {/* Pagination — outside the card */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-text-secondary">
            Showing {page * DOCS_PER_PAGE + 1}-{Math.min((page + 1) * DOCS_PER_PAGE, filteredDocuments.length)} of {filteredDocuments.length} results
          </span>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  className={cn(page === 0 && 'pointer-events-none opacity-40')}
                />
              </PaginationItem>
              {getVisiblePages(page, totalPages).map((p, i) =>
                p === 'ellipsis' ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  className={cn(page === totalPages - 1 && 'pointer-events-none opacity-40')}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
