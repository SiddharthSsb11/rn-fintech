import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const UserInactivityProvider = ({ children }) => {
  const appState = useRef(AppState.currentState);
  const { isSignedIn } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const recordStartTime = async () => {
    await AsyncStorage.setItem("startTime", Date.now().toString());
  };

  const handleAppStateChange = async (nextAppState) => {
    console.log("🚀 ~ handleAppStateChange ~ nextAppState", nextAppState);

    if (nextAppState === "background") {
      await recordStartTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const startTime = await AsyncStorage.getItem("startTime");
      const elapsed = Date.now() - (parseInt(startTime, 10) || 0);
      console.log("🚀 ~ handleAppStateChange ~ elapsed:", elapsed);

      if (elapsed > 3000 && isSignedIn) {
        navigation.navigate("Lock");
      }
    }
    appState.current = nextAppState;
  };

  return children;
};
