import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  View,
} from "react-native";

import GreetingCard from "@/components/home/GreetingCard";
import HeroCard from "@/components/home/HeroCard";
import FeatureCard from "@/components/home/FeatureCard";
import RecentVideo from "@/components/home/RecentVideo";

import {
  Colors,
  Typography,
  Spacing,
} from "@/theme";

import { useVideoStore } from "@/store/videoStore";

export default function HomeScreen() {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const createNotes = useVideoStore(
    (state) => state.createNotes
  );

  const loading = useVideoStore(
    (state) => state.loading
  );

  const generateNotes = async () => {
    if (!youtubeUrl) {
      Alert.alert(
        "Validation",
        "Please paste a YouTube URL."
      );
      return;
    }

    try {
      await createNotes(
        youtubeUrl,
        "Temporary Transcript",
        "YouTube Video"
      );

      Alert.alert(
        "Success",
        "AI Notes Generated!"
      );
    } catch {
      Alert.alert(
        "Error",
        "Generation Failed"
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <GreetingCard username="Abhishek" />

      <HeroCard
        youtubeUrl={youtubeUrl}
        setYoutubeUrl={setYoutubeUrl}
        loading={loading}
        onGenerate={generateNotes}
      />

      <Text style={styles.section}>
        Quick Features
      </Text>

      <View style={styles.grid}>
        <FeatureCard
          icon="📄"
          title="Summary"
          onPress={() => {}}
        />

        <FeatureCard
          icon="🧠"
          title="Flashcards"
          onPress={() => {}}
        />
      </View>

      <View style={styles.grid}>
        <FeatureCard
          icon="❓"
          title="MCQs"
          onPress={() => {}}
        />

        <FeatureCard
          icon="🗺️"
          title="Mind Map"
          onPress={() => {}}
        />
      </View>

      <Text style={styles.section}>
        Recent Notes
      </Text>

      <RecentVideo
        title="Binary Search"
        createdAt="Today"
      />

      <RecentVideo
        title="React Hooks"
        createdAt="Yesterday"
      />

      <RecentVideo
        title="Operating Systems"
        createdAt="2 Days Ago"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  section: {
    ...Typography.h3,
    marginTop: 25,
    marginBottom: 15,
    color: Colors.text,
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});