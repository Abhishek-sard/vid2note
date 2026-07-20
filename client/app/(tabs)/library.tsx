import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

import { useNotesStore } from "@/store/notesStore";
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "@/theme";

export default function Library() {
  const notes = useNotesStore((state) => state.notes);
  const loading = useNotesStore((state) => state.loading);
  const fetchNotes = useNotesStore((state) => state.fetchNotes);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>📚 My Notes Library</Text>

      {loading && (
        <Text style={styles.message}>Loading notes...</Text>
      )}

      {!loading && notes.length === 0 && (
        <Text style={styles.message}>
          No notes found yet. Upload a video or generate notes to see them here.
        </Text>
      )}

      {!loading && notes.map((note) => (
        <TouchableOpacity
          key={note._id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push(`/notes/${note._id}`)}
        >
          <Text style={styles.cardTitle}>{note.title}</Text>
          <Text style={styles.cardSubtitle}>{note.summary}</Text>
          <Text style={styles.cardDate}>{note.createdAt}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  heading: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  message: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  cardTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  cardSubtitle: {
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
  },
  cardDate: {
    marginTop: Spacing.sm,
    color: Colors.gray500,
    fontSize: 12,
  },
});