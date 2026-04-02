'use client';

import { useState } from 'react';
import { Button } from '@tennr/lasso/button';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import { Input } from '@tennr/lasso/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tennr/lasso/select';
import { FloppyDisk, X, Plus } from '@phosphor-icons/react';
import type { Patient } from '@/types/patient';

interface DemographicsFormProps {
  patient: Patient;
  onSave: (patient: Partial<Patient>) => Promise<void>;
}

export function DemographicsForm({ patient, onSave }: DemographicsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: patient.firstName,
    lastName: patient.lastName,
    dob: patient.dob,
    gender: 'male',
    phone: patient.phone,
    secondaryPhone: '',
    email: patient.email,
    address: { ...patient.address },
    emergencyContact: patient.emergencyContact || { name: '', phone: '', relationship: '' },
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: patient.firstName,
      lastName: patient.lastName,
      dob: patient.dob,
      gender: 'male',
      phone: patient.phone,
      secondaryPhone: '',
      email: patient.email,
      address: { ...patient.address },
      emergencyContact: patient.emergencyContact || { name: '', phone: '', relationship: '' },
    });
    setIsEditing(false);
  };

  const cardClass = 'bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden';
  const headerClass = 'flex items-center justify-between px-4 py-2 border-b border-border-tertiary';
  const titleClass = 'text-base font-medium lasso:wght-medium leading-6 text-foreground';

  const editButton = isEditing ? (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" onClick={handleCancel}>
        <X className="w-4 h-4" />
        Cancel
      </Button>
      <ButtonV2 variant="primary" size="sm" onClick={handleSave} disabled={isSaving}>
        <FloppyDisk className="w-4 h-4" />
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
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Personal Information */}
      <div className={cardClass}>
        <div className={headerClass}>
          <div className={titleClass}>Personal Information</div>
          {editButton}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              {isEditing ? (
                <Input
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                />
              ) : (
                <p className="text-sm">{patient.firstName || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              {isEditing ? (
                <Input
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                />
              ) : (
                <p className="text-sm">{patient.lastName || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              {isEditing ? (
                <Input
                  type="date"
                  value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                />
              ) : (
                <p className="text-sm">{patient.dob ? new Date(patient.dob).toLocaleDateString() : <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              {isEditing ? (
                <Select
                  value={formData.gender}
                  onValueChange={value => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm capitalize">{formData.gender}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className={cardClass}>
        <div className={headerClass}>
          <div className={titleClass}>Contact Information</div>
          {editButton}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Phone</label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <p className="text-sm">{patient.phone || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Secondary Phone</label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={formData.secondaryPhone}
                  onChange={e => setFormData({ ...formData, secondaryPhone: e.target.value })}
                />
              ) : (
                <p className="text-sm">{formData.secondaryPhone || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Email</label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <p className="text-sm">{patient.email || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Street</label>
              {isEditing ? (
                <Input
                  value={formData.address.street}
                  onChange={e =>
                    setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })
                  }
                />
              ) : (
                <p className="text-sm">{patient.address.street || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              {isEditing ? (
                <Input
                  value={formData.address.city}
                  onChange={e =>
                    setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                  }
                />
              ) : (
                <p className="text-sm">{patient.address.city || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              {isEditing ? (
                <Input
                  value={formData.address.state}
                  onChange={e =>
                    setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })
                  }
                />
              ) : (
                <p className="text-sm">{patient.address.state || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ZIP Code</label>
              {isEditing ? (
                <Input
                  value={formData.address.zip}
                  onChange={e =>
                    setFormData({ ...formData, address: { ...formData.address, zip: e.target.value } })
                  }
                />
              ) : (
                <p className="text-sm">{patient.address.zip || <span className="text-text-tertiary">Not provided</span>}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className={cardClass}>
        <div className={headerClass}>
          <div className={titleClass}>Emergency Contact</div>
          {editButton}
        </div>
        <div className="p-4">
          {!isEditing && !patient.emergencyContact?.name && !patient.emergencyContact?.phone && !patient.emergencyContact?.relationship ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <Plus weight="bold" className="size-3.5" />
              Add Emergency Contact
            </button>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                {isEditing ? (
                  <Input
                    value={formData.emergencyContact.name}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, name: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.emergencyContact?.name || <span className="text-text-tertiary">Not provided</span>}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, phone: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.emergencyContact?.phone || <span className="text-text-tertiary">Not provided</span>}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Relationship</label>
                {isEditing ? (
                  <Input
                    value={formData.emergencyContact.relationship}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, relationship: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm">{patient.emergencyContact?.relationship || <span className="text-text-tertiary">Not provided</span>}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
