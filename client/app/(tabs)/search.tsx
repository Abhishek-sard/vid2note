import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
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

export default function Search() {
  const [query, setQuery] = useState("");
  const notes = useNotesStore((state) => state.notes);
  const loading = useNotesStore((state) => state.loading);
  const fetchNotes = useNotesStore((state) => state.fetchNotes);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const filteredNotes = notes.filter((note) =>
    [note.title, note.summary]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>🔎 Search Notes</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or summary"
        placeholderTextColor={Colors.placeholder}
        value={query}
        onChangeText={setQuery}
      />

      {loading && (
        <Text style={styles.message}>Loading notes...</Text>
      )}

      {!loading && filteredNotes.length === 0 && (
        <Text style={styles.message}>
          No matching notes found. Try a different keyword.
        </Text>
      )}

      {!loading && filteredNotes.map((note) => (
        <TouchableOpacity
          key={note._id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push(`/notes/${note._id}`)}
        >
          <Text style={styles.cardTitle}>{note.title}</Text>
          <Text style={styles.cardSubtitle}>{note.summary}</Text>
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
    marginTop: 40,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    color: Colors.text,
    ...Shadows.card,
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
});