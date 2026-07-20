import React, { useEffect, useMemo, useState } from "react";
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

const sampleSearchResults = [
  {
    id: "1",
    timestamp: "02:15",
    text: "Binary Search explanation begins here with sorted array assumptions.",
  },
  {
    id: "2",
    timestamp: "05:40",
    text: "Example of useState hook and initial state setup.",
  },
  {
    id: "3",
    timestamp: "08:30",
    text: "How useEffect dependency array controls re-renders.",
  },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const notes = useNotesStore((state) => state.notes);
  const loading = useNotesStore((state) => state.loading);
  const fetchNotes = useNotesStore((state) => state.fetchNotes);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const filteredNotes = useMemo(
    () =>
      notes.filter((note) =>
        [note.title, note.summary]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [notes, query]
  );

  const showSearchResults = query.length > 2;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>🔎 Search Inside Video</Text>

      <Text style={styles.subtitle}>
        Ask a question or search across your generated video notes.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Where was Binary Search explained?"
        placeholderTextColor={Colors.placeholder}
        value={query}
        onChangeText={setQuery}
      />

      {loading && <Text style={styles.message}>Loading notes...</Text>}

      {!loading && showSearchResults && (
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>AI Answer Results</Text>
          {sampleSearchResults.map((result) => (
            <TouchableOpacity
              key={result.id}
              style={styles.resultCard}
              activeOpacity={0.85}
              onPress={() => router.push("/notes/flashcards")}
            >
              <Text style={styles.timestamp}>{result.timestamp}</Text>
              <Text style={styles.resultText}>{result.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!loading && !showSearchResults && (
        <Text style={styles.message}>
          Search your notes by question, topic, or keyword.
        </Text>
      )}

      {!loading && filteredNotes.length > 0 && (
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Related Notes</Text>
          {filteredNotes.map((note) => (
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
        </View>
      )}
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
    marginTop: 40,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
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
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  resultSection: {
    marginTop: Spacing.lg,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  timestamp: {
    color: Colors.primary,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  resultText: {
    color: Colors.text,
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