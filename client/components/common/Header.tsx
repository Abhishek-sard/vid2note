import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  Colors,
  Typography,
  Spacing,
} from "@/theme";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({
  title,
  showBack = true,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.text}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={{ width: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    ...Typography.h3,
    color: Colors.text,
  },
});