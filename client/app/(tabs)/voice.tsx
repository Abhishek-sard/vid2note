import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { Colors, Typography, Spacing, Radius, Shadows } from "@/theme";
import Button from "@/components/common/Button";

export default function Voice() {
  const [recording, setRecording] = useState(false);

  const toggleRecording = () => {
    setRecording((current) => !current);
    Alert.alert(
      recording ? "Recording stopped" : "Recording started",
      recording
        ? "Voice notes will be processed and timestamped soon."
        : "Start speaking to capture voice notes."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎤 Voice Notes</Text>
      <Text style={styles.subtitle}>
        Record your audio while watching and convert it into timestamped notes.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recording Status</Text>
        <Text style={styles.cardText}>
          {recording ? "Active — capturing voice notes." : "Ready to record."}
        </Text>
      </View>

      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={toggleRecording}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Next step</Text>
        <Text style={styles.infoText}>
          After recording, your voice notes will be sent to the backend for speech-to-text processing.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    marginBottom: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  cardTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  cardText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  infoBox: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  infoTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  infoText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});