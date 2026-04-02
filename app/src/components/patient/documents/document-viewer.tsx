'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@tennr/lasso/sheet';
import { Button } from '@tennr/lasso/button';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import { Badge } from '@tennr/lasso/badge';
import { DownloadSimple, X } from '@phosphor-icons/react';
import type { OrderDocument } from '@/types/order';

interface DocumentViewerProps {
  document: OrderDocument | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeLabels: Record<string, string> = {
  sleep_study: 'Sleep Study',
  prior_auth: 'Prior Auth',
  cmn: 'CMN',
  other: 'Other',
};

const sourceLabels: Record<string, string> = {
  ehr: 'EHR',
  tennr: 'Tennr',
  bright_tree: 'Bright Tree',
};

export function DocumentViewer({ document, open, onOpenChange }: DocumentViewerProps) {
  if (!document) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] p-0 flex flex-col [&>button:last-of-type]:hidden">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle>{document.name}</SheetTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{typeLabels[document.type] || document.type}</Badge>
                <Badge variant={document.source === 'tennr' ? 'default' : 'secondary'}>
                  {sourceLabels[document.source] || document.source}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Added: {new Date(document.dateAdded).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ButtonV2 variant="outline" size="sm" asChild>
                <a href={document.url} download>
                  <DownloadSimple className="w-4 h-4" />
                  Download
                </a>
              </ButtonV2>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-auto p-6">
          {/* PDF Preview - in production would use react-pdf or similar */}
          <div className="aspect-[8.5/11] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">PDF Preview</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
