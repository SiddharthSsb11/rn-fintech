import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import styles from "./Lock.styles";

const OFFSET = 20;
const TIME = 80;

const Lock = ({ navigation, route }) => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [code, setCode] = useState([]);
  const [biometricSupported, setBiometricSupported] = useState(false);

  const codeLength = Array(6).fill(0);
  const offset = useSharedValue(0);
  const isFocused = useIsFocused();
  // console.log("---isFocused---", isFocused, "----route name---", route.name);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const onNumberPress = (number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
    // console.log("--code--", code);
  };

  const numberBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const onBiometricAuthPress = async () => {
    const { success, error } = await LocalAuthentication.authenticateAsync();
    // console.log({ success, error });

    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      if (error === "not_enrolled") {
        Alert.alert("Biometric authentication is not set up on this device.");
      } else if (error === "not_available") {
        Alert.alert(
          "Biometric authentication is not available on this device."
        );
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "000000") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricSupported(compatible && enrolled);
    })();
  }, []);

  useEffect(() => {
    const handleBackButtonPress = () => {
      // Prevent default behavior
      return true;
    };

    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      );

      return () => {
        backHandler.remove();
      };
    }
  }, [isFocused]);

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome back, {firstName}</Text>

      <Animated.View style={[styles.codeView, style]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[
              styles.codeEmpty,
              {
                backgroundColor:
                  code[index] !== undefined //including 0 number
                    ? Colors.primary
                    : Colors.lightGray,
              },
            ]}
          />
        ))}
      </Animated.View>

      <View style={styles.numbersView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onBiometricAuthPress}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={26}
              color={biometricSupported ? Colors.dark : Colors.lightGray}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text style={styles.number}>0</Text>
          </TouchableOpacity>

          <View style={{ minWidth: 30 }}>
            {code.length > 0 && (
              <TouchableOpacity onPress={numberBackspace}>
                <Text style={styles.number}>
                  <MaterialCommunityIcons
                    name="backspace-outline"
                    size={26}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text
          style={{
            alignSelf: "center",
            color: Colors.primary,
            fontWeight: "500",
            fontSize: 18,
          }}
        >
          Forgot your passcode?
        </Text>
        <Text
          style={{
            alignSelf: "center",
            color: Colors.lightGray,
            justifyContent: "flex-start",
            fontWeight: "400",
            fontSize: 10,
            marginTop: -56,
          }}
        >
          ( Test code: 000000 )
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Lock;
