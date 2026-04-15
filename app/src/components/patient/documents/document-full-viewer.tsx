'use client';

import { useState } from 'react';
import {
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowClockwise,
  DownloadSimple,
  X,
  CaretDown,
} from '@phosphor-icons/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tennr/lasso/dropdown-menu';
import { cn } from '@tennr/lasso/utils/cn';
import type { Patient } from '@/types/patient';

export interface ViewableDocument {
  id: string;
  name: string;
  pages: number;
}

interface DocumentFullViewerProps {
  patient: Patient;
  document: ViewableDocument;
  documents: ViewableDocument[];
  onClose: () => void;
  onSelectDocument: (doc: ViewableDocument) => void;
}

function MockReferralDocument({ patient, currentPage, totalPages }: { patient: Patient; currentPage: number; totalPages: number }) {
  const order = patient.order;
  const referralDate = order ? new Date(order.receivedDate) : new Date();
  const formattedDate = referralDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const shortDate = referralDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  const facilityParts = order?.referredBy.split(', ') ?? [];
  const facilityName = facilityParts[0] ?? 'Medical Center';

  return (
    <div className="font-serif text-[15px] leading-relaxed text-neutral-900">
      {/* Fax header line */}
      <div className="flex items-baseline justify-between text-sm text-neutral-600 mb-10 font-mono">
        <span>{shortDate} 4:00 PM</span>
        <span>{facilityName.split(' - ')[0]} 337-470-3059</span>
        <span>{currentPage}/{totalPages}</span>
      </div>

      {/* Clinic letterhead */}
      <div className="mb-10 flex justify-between items-start">
        <div>
          <p className="font-bold text-lg">Lourdes Physician Group Pulmonology</p>
          <p>4811 Ambassador Caffery Parkway</p>
          <p>Suite 401A</p>
          <p className="font-bold">LAFAYETTE LA 70508-7266</p>
          <p>Phone: 337-470-3040</p>
          <p>Fax: 337-470-3052</p>
        </div>
        <div className="text-right">
          <p>
            <span className="font-bold">Date:</span> {formattedDate.replace(',', ',')}
          </p>
        </div>
      </div>

      {/* Patient info */}
      <div className="mb-10 flex justify-between">
        <div>
          <p>
            <span className="font-bold">Patient:</span>
            {patient.firstName} {patient.lastName}
          </p>
          <p>{patient.address.street},</p>
          <p>
            {patient.address.city}, {patient.address.state} {patient.address.zip}
          </p>
          <p>
            <span className="font-bold">Phone:</span>
            {patient.phone}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">MRN:</span> {patient.mrn}
          </p>
          <p>
            <span className="font-bold">DOB:</span>{' '}
            {new Date(patient.dob + 'T00:00:00').toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            })}
          </p>
          <p>
            <span className="font-bold">SSN:</span> xxx-xx-xxxx
          </p>
          <p>
            <span className="font-bold">Sex:</span> {Math.random() > 0.5 ? 'F' : 'M'}
          </p>
        </div>
      </div>

      {/* Coverage table */}
      <table className="w-full mb-10 border-collapse">
        <thead>
          <tr>
            <th className="text-left pb-1 pr-4 font-bold text-sm uppercase tracking-wide" />
            <th className="text-left pb-1 pr-4 font-bold text-sm uppercase tracking-wide">Payor</th>
            <th className="text-left pb-1 pr-4 font-bold text-sm uppercase tracking-wide">Plan</th>
            <th className="text-left pb-1 pr-4 font-bold text-sm uppercase tracking-wide">Group No.</th>
            <th className="text-left pb-1 font-bold text-sm uppercase tracking-wide">Subscriber ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pr-4 font-bold py-1">Visit Coverage:</td>
            <td className="pr-4 py-1">{patient.primaryInsurance?.carrier ?? '1120'}</td>
            <td className="pr-4 py-1">{patient.primaryInsurance?.plan ?? '10024'}</td>
            <td className="pr-4 py-1">{patient.primaryInsurance?.groupNumber ?? ''}</td>
            <td className="py-1">{patient.primaryInsurance?.memberId ?? '4DG7-52-91A'}</td>
          </tr>
        </tbody>
      </table>

      {/* Order section */}
      <div className="mb-6">
        <p className="mb-1">
          <span className="font-bold text-lg">{order?.category ?? 'Oxygen Therapy'}</span>
          {'    '}
          <span>(Order ID {order?.externalOrderId.slice(0, 10) ?? '198456749'})</span>
        </p>
        <p>
          <span className="font-bold">Diagnosis:</span> Centrilobular emphysema (HCC) (J43.2
          [ICD-10-CM] 492.8 [ICD-9-CM])
        </p>
        <p>
          <span className="font-bold">Quantity:</span>
        </p>
        <p>1Comments: Please supply patient with 2 L pulse dose oxygen via POC and NC</p>
        <p>O2 concentrator E1390</p>
        <p>Conserving device: E0431,</p>
        <p>POC: E1392,</p>
        <p className="italic">Oxygen Delivery: Nasal Cannula</p>
        <p className="italic">Liters per minute: 2 LPM</p>
        <p className="italic">Hours per day: 24</p>
      </div>
    </div>
  );
}

export function DocumentFullViewer({
  patient,
  document,
  documents,
  onClose,
  onSelectDocument,
}: DocumentFullViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 25, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 25, 50));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-neutral-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-border-secondary shrink-0">
        {/* Document selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 border border-border-secondary rounded-md hover:bg-bg-secondary transition-colors cursor-pointer min-w-[200px]">
              <span className="text-sm font-medium text-text-primary truncate">
                {document.name}
              </span>
              <CaretDown weight="regular" className="size-4 text-text-tertiary shrink-0 ml-auto" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            {documents.map((doc) => (
              <DropdownMenuItem
                key={doc.id}
                onClick={() => {
                  onSelectDocument(doc);
                  setCurrentPage(1);
                  setZoom(100);
                  setRotation(0);
                }}
                className={cn(doc.id === document.id && 'bg-bg-secondary')}
              >
                <span className="truncate">{doc.name}</span>
                <span className="ml-auto text-xs text-text-tertiary">{doc.pages}p</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomIn}
            className="flex items-center justify-center size-9 rounded-md border border-border-secondary bg-white hover:bg-bg-secondary transition-colors cursor-pointer"
            aria-label="Zoom in"
          >
            <MagnifyingGlassPlus weight="regular" className="size-[18px] text-text-primary" />
          </button>
          <button
            onClick={handleZoomOut}
            className="flex items-center justify-center size-9 rounded-md border border-border-secondary bg-white hover:bg-bg-secondary transition-colors cursor-pointer"
            aria-label="Zoom out"
          >
            <MagnifyingGlassMinus weight="regular" className="size-[18px] text-text-primary" />
          </button>
          <button
            onClick={handleRotate}
            className="flex items-center justify-center size-9 rounded-md border border-border-secondary bg-white hover:bg-bg-secondary transition-colors cursor-pointer"
            aria-label="Rotate"
          >
            <ArrowClockwise weight="regular" className="size-[18px] text-text-primary" />
          </button>
          <button
            className="flex items-center justify-center size-9 rounded-md hover:bg-bg-secondary transition-colors cursor-pointer"
            aria-label="Download"
          >
            <DownloadSimple weight="regular" className="size-[18px] text-text-primary" />
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-9 rounded-md border border-border-secondary bg-white hover:bg-bg-secondary transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X weight="regular" className="size-[18px] text-text-primary" />
          </button>
        </div>
      </div>

      {/* Document viewport */}
      <div className="flex-1 overflow-auto flex justify-center py-8 px-4">
        <div
          className="bg-white shadow-lg rounded-sm origin-top transition-transform duration-200"
          style={{
            width: `${8.5 * 96}px`,
            minHeight: `${11 * 96}px`,
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
          }}
        >
          <div className="p-16">
            <MockReferralDocument
              patient={patient}
              currentPage={currentPage}
              totalPages={document.pages}
            />
          </div>
        </div>
      </div>

      {/* Page navigation */}
      {document.pages > 1 && (
        <div className="flex items-center justify-center gap-3 py-3 bg-white border-t border-border-secondary shrink-0">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="px-2 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            Previous
          </button>
          <span className="text-sm text-text-primary font-medium">
            {currentPage} / {document.pages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(document.pages, p + 1))}
            disabled={currentPage >= document.pages}
            className="px-2 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
