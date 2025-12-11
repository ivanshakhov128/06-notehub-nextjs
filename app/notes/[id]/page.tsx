import { QueryClient, dehydrate } from "@tanstack/react-query";
import TanStackProvider from "../../../components/TanStackProvider/TansTackProvider";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface NotePageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  const noteId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <TanStackProvider dehydratedState={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </TanStackProvider>
  );
}
