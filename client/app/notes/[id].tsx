import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import SummaryCard from "@/components/notes/SummaryCard";
import KeyPointsCard from "@/components/notes/KeyPointsCard";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "@/theme";

import { useVideoStore } from "@/store/videoStore";

export default function NoteDetailsScreen() {
  const { id } = useLocalSearchParams();

  const {
    title,
    summary,
    keyPoints,
  } = useVideoStore();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>
        📚 Video Notes
      </Text>

      <SummaryCard
        title={title || "AI Generated Notes"}
        summary={
          summary ||
          "No summary available."
        }
      />

      <KeyPointsCard
        points={
          keyPoints.length
            ? keyPoints
            : [
                "No key points found."
              ]
        }
      />

      <Text style={styles.section}>
        Continue Learning
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push("/notes/flashcards")
        }
      >
        <Text style={styles.cardTitle}>
          🧠 Flashcards
        </Text>

        <Text style={styles.cardText}>
          Revise using AI-generated flashcards.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push("/notes/mcqs")
        }
      >
        <Text style={styles.cardTitle}>
          ❓ Practice MCQs
        </Text>

        <Text style={styles.cardText}>
          Test your understanding.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push("/notes/mindmap")
        }
      >
        <Text style={styles.cardTitle}>
          🗺 Mind Map
        </Text>

        <Text style={styles.cardText}>
          Visualize concepts quickly.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  pageTitle: {
    ...Typography.h2,
    marginTop: 50,
    marginBottom: 20,
    color: Colors.text,
  },

  section: {
    ...Typography.h3,
    marginTop: 25,
    marginBottom: 15,
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
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 8,
  },

  cardText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});