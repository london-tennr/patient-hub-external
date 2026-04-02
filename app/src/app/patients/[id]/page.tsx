export default async function PatientSummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = await params;
  return null;
}
