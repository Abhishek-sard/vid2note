import Constants from "expo-constants";
import { Platform } from "react-native";

const expoHostUri = Constants.expoConfig?.hostUri;
const expoHost = expoHostUri
  ? new URL(`http://${expoHostUri}`).hostname
  : undefined;

const defaultHost =
  Platform.OS === "android"
    ? Constants.isDevice
      ? expoHost ?? "localhost"
      : "10.0.2.2"
    : Platform.OS === "web"
      ? "localhost"
      : expoHost ?? "localhost";

const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || `http://${defaultHost}:5000/api`,
};

export default ENV;