import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useVideoStore } from "@/store/videoStore";
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "@/theme";

export default function Upload() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const createNotes = useVideoStore((state) => state.createNotes);
  const loading = useVideoStore((state) => state.loading);

  const handleUpload = async () => {
    if (!youtubeUrl) {
      Alert.alert("Validation", "Please paste a YouTube URL.");
      return;
    }

    try {
      await createNotes(
        youtubeUrl,
        youtubeUrl,
        "Uploaded Video"
      );

      Alert.alert("Success", "Notes generated from the uploaded video URL.");
      setYoutubeUrl("");
    } catch (error: any) {
      console.error("Upload error:", error);
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Could not generate notes. Please try again.";
      Alert.alert("Upload Failed", errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.heading}>📤 Upload Video</Text>
      <Text style={styles.subtitle}>
        Paste a YouTube link to generate AI notes from your video.
      </Text>

      <Input
        placeholder="Enter YouTube URL"
        value={youtubeUrl}
        onChangeText={setYoutubeUrl}
        keyboardType="url"
      />

      <Button
        title="Generate Notes"
        loading={loading}
        onPress={handleUpload}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          This screen uses the same note generation workflow as the home page.
          Paste a video URL and the app will create notes for you.
        </Text>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: Spacing.sm,
    marginTop: 40,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
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