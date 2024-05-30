import {
  View,
  Text,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import styles from "./Signin.styles";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";

const SignInType = {
  Phone: "Phone",
  Email: "Email",
  Google: "Google",
};

const Signin = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { signIn } = useSignIn();

  const onSignIn = async (type) => {
    if (type === SignInType.Phone) {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      // navigation.navigate("Verify", {
      //   phone: fullPhoneNumber,
      //   signin: "true",
      // });
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor = supportedFirstFactors.find((factor) => {
          return factor.strategy === "phone_code";
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });
        navigation.navigate("Verify", {
          phone: fullPhoneNumber,
          signin: "true",
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        // Alert.alert("Error", err.errors[0].message);
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <React.Fragment>
      <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Welcome back</Text>
          <Text style={defaultStyles.descriptionText}>
            Enter the phone number associated with your account
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { flex: 0.2, alignItems: "center" }]}
              placeholder="Country code"
              placeholderTextColor={Colors.gray}
              value={countryCode}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Mobile number"
              placeholderTextColor={Colors.gray}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              phoneNumber !== "" ? styles.enabled : styles.disabled,
              { marginBottom: 20 },
            ]}
            onPress={() => onSignIn(SignInType.Phone)}
          >
            <Text style={defaultStyles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View
              style={{
                flex: 1,
                height: StyleSheet.hairlineWidth,
                backgroundColor: Colors.gray,
              }}
            />
            <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
            <View
              style={{
                flex: 1,
                height: StyleSheet.hairlineWidth,
                backgroundColor: Colors.gray,
                marginVertical: 32,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => onSignIn(SignInType.Email)}
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: "row",
                gap: 16,
                marginTop: 20,
                backgroundColor: "#fff",
              },
            ]}
          >
            <Ionicons name="mail" size={24} color={"#000"} />
            <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
              Continue with email{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSignIn(SignInType.Google)}
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: "row",
                gap: 16,
                marginTop: 20,
                backgroundColor: "#fff",
              },
            ]}
          >
            <Ionicons name="logo-google" size={24} color={"#000"} />
            <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
              Continue with email{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

export default Signin;
