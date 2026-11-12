import { create } from "zustand";
import axios from "axios";

import {
  getNotes,
  deleteNote,
} from "@/services/noteApi";

interface Note {
  _id: string;
  title: string;
  summary: string;
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;

  fetchNotes: () => Promise<void>;

  removeNote: (id: string) => Promise<void>;
}

 const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    try {
      set({ loading: true, error: null });

      const data = await getNotes();

      set({
        notes: data.notes,
        loading: false,
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Could not load notes.";

      set({ loading: false, error: message });
    }
  },

  removeNote: async (id) => {
    await deleteNote(id);

    set((state) => ({
      notes: state.notes.filter(
        (note) => note._id !== id
      ),
    }));
  },
}));

export {useNotesStore} 