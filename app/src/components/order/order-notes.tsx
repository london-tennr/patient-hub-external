'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@tennr/lasso/card';
import { ButtonV2 } from '@tennr/lasso/buttonV2';
import { Textarea } from '@tennr/lasso/textarea';
import { Input } from '@tennr/lasso/input';
import { Avatar, AvatarFallback } from '@tennr/lasso/avatar';
import { MagnifyingGlass, PaperPlaneTilt } from '@phosphor-icons/react';
import type { OrderNote } from '@/types/order';

interface OrderNotesProps {
  notes: OrderNote[];
  onAddNote: (content: string) => Promise<void>;
}

export function OrderNotes({ notes, onAddNote }: OrderNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!newNote.trim()) return;
    setIsSubmitting(true);
    try {
      await onAddNote(newNote);
      setNewNote('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="pl-9"
          />
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              {notes.length === 0 ? 'No notes yet' : 'No matching notes'}
            </p>
          ) : (
            filteredNotes.map(note => (
              <div key={note.id} className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{note.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{note.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{note.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Add a note..."
            rows={2}
            className="flex-1"
          />
          <ButtonV2 variant="primary" onClick={handleSubmit} disabled={!newNote.trim() || isSubmitting}>
            <PaperPlaneTilt className="w-4 h-4" />
          </ButtonV2>
        </div>
      </CardContent>
    </Card>
  );
}
