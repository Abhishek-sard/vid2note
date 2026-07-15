import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, router } from "expo-router";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import { useAuthStore } from "@/store/authStore";

import {
  Colors,
  Typography,
  Spacing,
} from "@/theme";

export default function RegisterScreen() {
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Validation", "Please fill all fields.");
        return;
      }

      await register(name, email, password);

      router.replace("/");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error?.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View>
        <Text style={styles.title}>Create Account 🚀</Text>

        <Text style={styles.subtitle}>
          Join Video Notes AI today.
        </Text>

        <Input
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <Input
          label="Password"
          placeholder="Create password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Button
          title="Register"
          loading={loading}
          onPress={handleRegister}
        />

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Link href="/auth/login" style={styles.link}>
            Login
          </Link>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.background,
    padding: Spacing.xl,
  },

  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },

  footer: {
    marginTop: Spacing.xl,
    textAlign: "center",
    color: Colors.textSecondary,
  },

  link: {
    color: Colors.primary,
    fontWeight: "600",
  },
});