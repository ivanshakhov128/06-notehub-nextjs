"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

const PER_PAGE = 12;

export default function NotesClient() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
    staleTime: 60_000,
    placeholderData: { notes: [], totalPages: 0 },
  });

  const handleCreated = () => {
    setIsModalOpen(false);
    qc.invalidateQueries({ queryKey: ["notes"] });
  };

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error loading notes</p>}

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onCreated={handleCreated}
          />
        </Modal>
      )}
    </div>
  );
}
