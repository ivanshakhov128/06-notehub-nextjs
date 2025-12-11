import { QueryClient, dehydrate } from "@tanstack/react-query";
import TanStackProvider from "../../components/TanStackProvider/TanStackProvider";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../lib/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NotesClient />
    </TanStackProvider>
  );
}
