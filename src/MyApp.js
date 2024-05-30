import {
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Onboarding from "./screens/Onboarding";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Crypto from "./screens/Crypto";
import Graph from "./screens/Graph";
import Verify from "./screens/Verify";
import Lock from "./screens/Lock";
import Transactions from "./screens/Transactions";
import CustomHeader from "./components/CustomHeader";
import Colors from "../constants/Colors";
import { BlurView } from "expo-blur";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import {
  FontAwesome,
  Ionicons,
  Feather,
  FontAwesome6,
} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

const MyApp = () => {
  const [fontsLoaded, error] = useFonts({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isLoaded, isSignedIn } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    console.log("---isSignedIn---", isSignedIn);
    if (!isLoaded) return;

    const navigateToScreen = (screenName) => {
      navigation.navigate(screenName);
    };
    if (isSignedIn) {
      navigateToScreen("Home");
    } else {
      navigateToScreen("Onboarding");
    }
  }, [isSignedIn]);

  if (!fontsLoaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <React.Fragment>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <>
        {!isSignedIn ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerBackTitle: "",
                headerShadowVisible: false,
                headerStyle: { backgroundColor: Colors.background },
                headerRight: () => (
                  <FontAwesome
                    name="question-circle-o"
                    size={34}
                    color={Colors.dark}
                  />
                ),
                headerLeft: () => (
                  <Feather
                    name="arrow-left"
                    size={34}
                    color={Colors.dark}
                    onPress={() => navigation.navigate("Onboarding")}
                  />
                ),
              })}
            />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen
              name="Verify"
              component={Verify}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerBackTitle: "",
                headerShadowVisible: false,
                headerStyle: { backgroundColor: Colors.background },
                headerLeft: () => (
                  <Feather
                    name="arrow-left"
                    size={34}
                    color={Colors.dark}
                    onPress={() => navigation.goBack()}
                  />
                ),
              })}
            />
            {/* <Stack.Screen
          name="BottomTabsScreensOverview"
          component={BottomTabsScreensOverview}
        /> */}
          </Stack.Navigator>
        ) : (
          <BottomTabs.Navigator
            screenOptions={{
              // headerShown: false,
              tabBarBackground: () => (
                <BlurView
                  intensity={100}
                  tint={"extraLight"}
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.05)",
                  }}
                />
              ),
              tabBarIconStyle: {
                marginBottom: -4,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                marginTop: 2,
                marginBottom: 2,
              },
              tabBarStyle: {
                backgroundColor: "transparent",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                borderTopWidth: 0,
                height: 50,
              },
              tabBarActiveTintColor: Colors.primary,
              // tabBarInactiveTintColor: Colors.gray,
            }}
          >
            <BottomTabs.Screen
              name="Home"
              component={Home}
              options={{
                title: "Home",
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="home" size={28} color={color} />
                ),
                header: () => <CustomHeader />,
                headerTransparent: true,
              }}
            />
            <BottomTabs.Screen
              name="Crypto"
              component={Crypto}
              options={{
                // headerShown: false,
                title: "Crytpo",
                tabBarLabel: "Crypto",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="bitcoin" size={28} color={color} />
                ),
                header: () => <CustomHeader />,
                headerTransparent: true,
              }}
            />
            <BottomTabs.Screen
              name="Graph"
              component={Graph}
              options={{
                tabBarButton: () => null,
                title: "",
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Crypto")}
                    style={{ marginLeft: 8 }}
                  >
                    <Ionicons name="arrow-back" size={34} color={Colors.dark} />
                  </TouchableOpacity>
                ),
                headerLargeTitle: true,
                headerTransparent: true,
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: Colors.background,
                },
                headerTitleStyle: {
                  fontSize: 28,
                  fontWeight: "bold",
                  color: Colors.dark,
                },
                headerRight: () => (
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity>
                      <Ionicons
                        name="notifications-outline"
                        color={Colors.dark}
                        size={30}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 8 }}>
                      <Ionicons
                        name="star-outline"
                        color={Colors.dark}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                ),
              }}
            />
            <BottomTabs.Screen
              name="Transactions"
              component={Transactions}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Transactions",
                headerBackTitle: "",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: Colors.background,
                },
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 28,
                  fontWeight: "bold",
                  color: Colors.dark,
                },
                headerLeft: () => (
                  <Feather
                    name="arrow-left"
                    size={28}
                    color={Colors.dark}
                    onPress={() => navigation.navigate("Home")}
                  />
                ),
                headerRight: () => (
                  <View style={{ marginRight: 4 }}>
                    <Feather name="download" size={28} color="black" />
                  </View>
                ),
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome6
                    name="money-bill-transfer"
                    size={28}
                    color={color}
                  />
                ),
              })}
            />
            <BottomTabs.Screen
              name="Profile"
              component={Profile}
              options={{
                // headerShown: false,
                tabBarStyle: { display: "none" }, // Hide tab bar
                title: "",
                tabBarLabel: "Profile",
                presentation: "transparentModal",
                animation: "fade",
                title: "",
                headerTransparent: true,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons name="close-outline" size={34} color={"#fff"} />
                  </TouchableOpacity>
                ),
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="user" size={28} color={color} />
                ),
              }}
            />
            <BottomTabs.Screen
              name="Lock"
              component={Lock}
              options={{
                tabBarButton: () => null,
                headerShown: false,
                tabBarStyle: { display: "none" }, // Hide tab bar
              }}
            />
          </BottomTabs.Navigator>
        )}
      </>
    </React.Fragment>
  );
};

export default MyApp;
