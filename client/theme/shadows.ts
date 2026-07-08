import { Platform } from "react-native";

const Shadows = {
  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    android: {
      elevation: 3,
    },
    default: {},
  }),

  button: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    android: {
      elevation: 5,
    },
    default: {},
  }),
};

export default Shadows;