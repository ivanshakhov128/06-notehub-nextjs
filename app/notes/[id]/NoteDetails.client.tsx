// app/notes/[id]/NoteDetails.client.tsx
"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import css from "./NoteDetails.module.css"; // якщо маєш стилі

interface Props {
  id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container ?? undefined}>
      <div className={css.item ?? undefined}>
        <div className={css.header ?? undefined}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content ?? undefined}>{note.content}</p>
        <p className={css.date ?? undefined}>
          {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
