import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Typography,
} from "@/theme";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export default function EmptyState({
  title,
  subtitle,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});