export default async function NotesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = await params;
  // TODO: Use _id to fetch notes from API
  return (
    <div className="bg-bg-white border border-border-tertiary rounded-md shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-tertiary">
        <div className="text-base font-medium lasso:wght-medium leading-6 text-foreground">Notes</div>
      </div>
      <div className="p-4">
        <p className="text-sm text-text-secondary">No notes available</p>
      </div>
    </div>
  );
}
