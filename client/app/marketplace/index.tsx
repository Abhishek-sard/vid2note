import { useEffect } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

import { useAuthStore } from "@/store/authStore";
import { Colors } from "@/theme";

export default function Index() {
  const { loadUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await loadUser();

      if (isAuthenticated) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
      }
    };

    init();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
        color={Colors.primary}
      />
    </View>
  );
}