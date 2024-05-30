import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyApp from "./src/MyApp";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { UserInactivityProvider } from "./context/UserInactivity";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <NavigationContainer>
        <UserInactivityProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MyApp />
          </GestureHandlerRootView>
        </UserInactivityProvider>
      </NavigationContainer>
    </ClerkProvider>
  );
}
