import { QueryClient, dehydrate } from "@tanstack/react-query";
import TanStackProvider from "../../../components/TanStackProvider/TansTackProvider";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "../../../lib/api";

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient id={id} />
    </TanStackProvider>
  );
}
