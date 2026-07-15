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

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Validation", "Please fill all fields.");
        return;
      }

      await login(email, password);

      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
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
        <Text style={styles.title}>Welcome Back 👋</Text>

        <Text style={styles.subtitle}>
          Login to continue learning.
        </Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <Input
          label="Password"
          placeholder="Enter password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Button
          title="Login"
          loading={loading}
          onPress={handleLogin}
        />

        <Text style={styles.footer}>
          Do not have an account?{" "}
          <Link href="/(auth)/register" style={styles.link}>
            Register
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