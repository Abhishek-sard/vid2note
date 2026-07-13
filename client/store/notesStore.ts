import { create } from "zustand";

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

  fetchNotes: () => Promise<void>;

  removeNote: (id: string) => Promise<void>;
}

 const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  loading: false,

  fetchNotes: async () => {
    try {
      set({ loading: true });

      const data = await getNotes();

      set({
        notes: data.notes,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
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