import { QueryClient, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface NotePageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  const noteId = params.id;

  // Предварительная загрузка заметки на сервере
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  // Генерируем dehydratedState для передачи клиенту
  const dehydratedState = dehydrate(queryClient);

  // Передаём в клиентский компонент
  return <NoteDetailsClient dehydratedState={dehydratedState} />;
}
