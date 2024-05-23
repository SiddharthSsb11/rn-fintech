import { View, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Onboarding from "./screens/Onboarding";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Invest from "./screens/Invest";
import Transfers from "./screens/Transfers";
import Crypto from "./screens/Crypto";
// import Lifestyle from "./screens/Lifestyle";
// import Help from "./screens/Help";
import Colors from "../constants/Colors";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome6,
  Feather,
} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

const BottomScreensOverview = () => {
  return (
    <React.Fragment>
      <BottomTabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SpaceMono-Regular",
            marginTop: -4,
            marginBottom: 2,
          },
          tabBarIconStyle: {
            marginBottom: -2,
          },
          tabBarStyle: {
            backgroundColor: "#161622",
            height: 60,
            borderWidth: 1,
            borderTopColor: "#232533",
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.primaryMuted,
        }}
      >
        <BottomTabs.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Invest"
          component={Invest}
          options={{
            title: "Invest",
            tabBarLabel: "Invest",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="finance"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Transfers"
          component={Transfers}
          options={{
            title: "Transfers",
            tabBarLabel: "Transfers",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="money-bill-transfer"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Crypto"
          component={Crypto}
          options={{
            title: "Crytpo",
            tabBarLabel: "Crypto",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bitcoin" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </React.Fragment>
  );
};

const MyApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded, error] = useFonts({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <React.Fragment>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <NavigationContainer>
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
                  // onPress={() => navigation.navigate("Help")}
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
          {/* <Stack.Screen
            name="Help"
            component={Help}
            options={{
              title: "Help",
              presentation: "modal",
              presentationOptions: {
                animationType: "slide-up-from-bottom",
              },
            }}
          /> */}
          <Stack.Screen
            name="BottomScreensOverview"
            component={BottomScreensOverview}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
};

export default MyApp;
