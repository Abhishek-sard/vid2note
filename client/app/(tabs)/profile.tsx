import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";

import Button from "@/components/common/Button";
import { useAuthStore } from "@/store/authStore";
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "@/theme";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👤 Profile</Text>

      {isAuthenticated && user ? (
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user.role}</Text>

          <Button
            title="Logout"
            onPress={logout}
            style={styles.logoutButton}
          />
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.message}>
            You are not logged in yet.
          </Text>
          <Link href="/auth/login" style={styles.link}>
            <Text style={styles.linkText}>Login</Text>
          </Link>
          <Link href="/auth/register" style={styles.link}>
            <Text style={styles.linkText}>Create an account</Text>
          </Link>
        </View>
      )}
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
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  label: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
  },
  value: {
    ...Typography.h4,
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  message: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  link: {
    marginTop: Spacing.sm,
  },
  linkText: {
    ...Typography.body,
    color: Colors.primary,
  },
  logoutButton: {
    marginTop: Spacing.lg,
  },
});