import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Typography,
  Radius,
  Spacing,
  Shadows,
} from "@/theme";

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({
  question,
  answer,
}: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setShowAnswer(!showAnswer)}
      style={styles.card}
    >
      <Text style={styles.label}>
        {showAnswer ? "Answer" : "Question"}
      </Text>

      <Text style={styles.text}>
        {showAnswer ? answer : question}
      </Text>

      <Text style={styles.tap}>
        Tap to {showAnswer ? "show question" : "reveal answer"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    minHeight: 180,
    justifyContent: "center",
    ...Shadows.card,
  },

  label: {
    color: Colors.primary,
    fontWeight: "700",
    marginBottom: 15,
  },

  text: {
    ...Typography.h3,
    color: Colors.text,
    textAlign: "center",
  },

  tap: {
    marginTop: 25,
    textAlign: "center",
    color: Colors.textSecondary,
  },
});