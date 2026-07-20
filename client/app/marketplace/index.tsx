import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "@/theme";

const notes = [
  {
    id: "1",
    title: "React Hooks Complete Notes",
    author: "Abhishek",
    price: "Rs.199",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Binary Search Master Notes",
    author: "John",
    price: "Rs.149",
    rating: 4.6,
  },
  {
    id: "3",
    title: "Operating System Notes",
    author: "Sita",
    price: "Free",
    rating: 4.9,
  },
  {
    id: "4",
    title: "DBMS Interview Notes",
    author: "Ram",
    price: "Rs.99",
    rating: 4.7,
  },
];

export default function MarketplaceScreen() {
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/marketplace/note-details",
          params: { id: item.id },
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.author}>
        👤 {item.author}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>
          {item.price}
        </Text>

        <Text style={styles.rating}>
          ⭐ {item.rating}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        📚 Marketplace
      </Text>

      <TextInput
        placeholder="Search notes..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
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
    marginTop: 50,
    marginBottom: 20,
    color: Colors.text,
  },

  search: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    ...Shadows.card,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 18,
    marginBottom: 16,
    ...Shadows.card,
  },

  title: {
    ...Typography.h3,
    color: Colors.text,
  },

  author: {
    marginTop: 8,
    color: Colors.textSecondary,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  price: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },

  rating: {
    color: "#f39c12",
    fontWeight: "700",
  },
});