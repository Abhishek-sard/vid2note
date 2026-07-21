import { create } from "zustand";

import {
  addYoutubeVideo,
  generateNotes,
} from "@/services/videoApi";

interface Flashcard {
  question: string;
  answer: string;
}

interface MCQ {
  question: string;
  options: string[];
  answer: string;
}

interface VideoState {
  title: string;
  summary: string;
  keyPoints: string[];
  flashcards: Flashcard[];
  mcqs: MCQ[];

  loading: boolean;

  createNotes: (
    youtubeUrl: string,
    transcript: string,
    title: string
  ) => Promise<void>;

  clear: () => void;
}

 const useVideoStore = create<VideoState>((set) => ({
  title: "",
  summary: "",
  keyPoints: [],
  flashcards: [],
  mcqs: [],
  loading: false,

  createNotes: async (
    youtubeUrl,
    transcript,
    title
  ) => {
    try {
      set({ loading: true });

      // Try to add video, but ignore if it already exists
      try {
        await addYoutubeVideo(youtubeUrl);
      } catch (addError: any) {
        // Ignore "Video already exists" error
        if (!addError.response?.data?.message?.includes("already exists")) {
          throw addError;
        }
        console.log("Video already exists, proceeding with note generation");
      }

      const data = await generateNotes({
        youtubeUrl,
        title,
      });

      set({
        title: data.data.title,
        summary: data.data.summary,
        keyPoints: data.data.keyPoints,
        flashcards: data.data.flashcards,
        mcqs: data.data.mcqs,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  clear: () =>
    set({
      title: "",
      summary: "",
      keyPoints: [],
      flashcards: [],
      mcqs: [],
    }),
}));

export {useVideoStore};