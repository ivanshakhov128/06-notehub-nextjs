"use client";

import React from "react";
import TanStackProvider from "../../../components/TanStackProvider/TansTackProvider";
import NoteDetails from "@/components/NoteDetails/NoteDetails";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import type { DehydratedState } from "@tanstack/react-query";

interface NoteDetailsClientProps {
  dehydratedState: DehydratedState;
}

export default function NoteDetailsClient({
  dehydratedState,
}: NoteDetailsClientProps) {
  const params = useParams();
  const noteId = Array.isArray(params?.id) ? params.id[0] : params?.id || "";

  // Если нет id, можно вернуть ошибку
  if (!noteId) return <p>Invalid note ID</p>;

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsLoader noteId={noteId} />
    </TanStackProvider>
  );
}

function NoteDetailsLoader({ noteId }: { noteId: string }) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return <NoteDetails note={note} />;
}
