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

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Props {
  data: MCQ;
}

export default function MCQCard({ data }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const checkAnswer = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>
        {data.question}
      </Text>

      {data.options.map((option, index) => {
        const isCorrect =
          submitted &&
          option === data.correctAnswer;

        const isWrong =
          submitted &&
          selected === option &&
          option !== data.correctAnswer;

        return (
          <TouchableOpacity
            key={index}
            disabled={submitted}
            style={[
              styles.option,

              selected === option && styles.selected,

              isCorrect && styles.correct,

              isWrong && styles.wrong,
            ]}
            onPress={() => setSelected(option)}
          >
            <Text style={styles.optionText}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}

      {!submitted ? (
        <TouchableOpacity
          style={styles.button}
          onPress={checkAnswer}
        >
          <Text style={styles.buttonText}>
            Check Answer
          </Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={[
            styles.result,
            {
              color:
                selected === data.correctAnswer
                  ? "#2ecc71"
                  : "#e74c3c",
            },
          ]}
        >
          {selected === data.correctAnswer
            ? "✅ Correct!"
            : `❌ Correct Answer: ${data.correctAnswer}`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginBottom: 20,
    ...Shadows.card,
  },

  question: {
    ...Typography.h3,
    marginBottom: 15,
    color: Colors.text,
  },

  option: {
    padding: 15,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },

  selected: {
    borderColor: Colors.primary,
    backgroundColor: "#eef6ff",
  },

  correct: {
    backgroundColor: "#d4edda",
    borderColor: "#28a745",
  },

  wrong: {
    backgroundColor: "#f8d7da",
    borderColor: "#dc3545",
  },

  optionText: {
    ...Typography.body,
    color: Colors.text,
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: Radius.md,
    marginTop: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },

  result: {
    marginTop: 15,
    fontWeight: "700",
    fontSize: 16,
  },
});