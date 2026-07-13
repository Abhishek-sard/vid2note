import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Typography,
} from "@/theme";

interface LoaderProps {
  message?: string;
}

export default function Loader({
  message = "Loading...",
}: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
      />

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    ...Typography.body,
    marginTop: 15,
    color: Colors.textSecondary,
  },
});