'use client';

import { useState } from 'react';
import { Button } from '@tennr/lasso/button';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import { Input } from '@tennr/lasso/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { Badge } from '@tennr/lasso/badge';
import { CheckCircle, Clock, XCircle } from '@phosphor-icons/react';
import type { Insurance } from '@/types/patient';

interface InsuranceFormProps {
  insurance: Insurance | undefined;
  title: string;
  onSave: (insurance: Insurance) => Promise<void>;
}

const statusConfig = {
  verified: { icon: CheckCircle, variant: 'default' as const, label: 'Verified' },
  pending: { icon: Clock, variant: 'secondary' as const, label: 'Pending' },
  failed: { icon: XCircle, variant: 'destructive' as const, label: 'Failed' },
};

export function InsuranceForm({ insurance, title, onSave }: InsuranceFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Insurance>>(insurance || {});

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData as Insurance);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (!insurance && !isEditing) {
    return (
      <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-tertiary">
          <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">{title}</div>
          <ButtonV2 variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Add Insurance
          </ButtonV2>
        </div>
        <div className="p-4">
          <p className="text-sm text-text-secondary">No insurance on file</p>
        </div>
      </div>
    );
  }

  const status = insurance ? statusConfig[insurance.eligibilityStatus] : null;
  const StatusIcon = status?.icon;

  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-tertiary">
        <div className="flex items-center gap-2">
          <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">{title}</div>
          {status && (
            <Badge variant={status.variant}>
              {StatusIcon && <StatusIcon className="w-3 h-3 mr-1" />}
              {status.label}
            </Badge>
          )}
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <ButtonV2 variant="primary" size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </ButtonV2>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-text-primary hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Carrier</label>
            {isEditing ? (
              <Input
                value={formData.carrier || ''}
                onChange={e => setFormData({ ...formData, carrier: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.carrier}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Plan</label>
            {isEditing ? (
              <Input
                value={formData.plan || ''}
                onChange={e => setFormData({ ...formData, plan: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.plan}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Member ID</label>
            {isEditing ? (
              <Input
                value={formData.memberId || ''}
                onChange={e => setFormData({ ...formData, memberId: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.memberId}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Group Number</label>
            {isEditing ? (
              <Input
                value={formData.groupNumber || ''}
                onChange={e => setFormData({ ...formData, groupNumber: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.groupNumber}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Policy Holder</label>
            {isEditing ? (
              <Input
                value={formData.policyHolder || ''}
                onChange={e => setFormData({ ...formData, policyHolder: e.target.value })}
              />
            ) : (
              <p className="text-sm">{insurance?.policyHolder}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Relationship</label>
            {isEditing ? (
              <Select
                value={formData.relationship}
                onValueChange={value => setFormData({ ...formData, relationship: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">Self</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm capitalize">{insurance?.relationship}</p>
            )}
          </div>
        </div>
        {insurance?.lastVerified && (
          <p className="text-xs text-text-tertiary mt-4">
            Last verified: {new Date(insurance.lastVerified).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
