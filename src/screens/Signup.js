import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import styles from "./Signup.styles";

const Signup = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 60;
  const { signUp } = useSignUp();

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    // navigation.navigate("Verify", { phone: fullPhoneNumber });
    try {
      await signUp.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp.preparePhoneNumberVerification();
      navigation.navigate("Verify", { phone: fullPhoneNumber });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <React.Fragment>
      <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Let's get started!</Text>
          <Text style={defaultStyles.descriptionText}>
            Enter your phone number. We will send you a confirmation code there
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

          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              phoneNumber !== "" ? styles.enabled : styles.disabled,
              { marginBottom: 2 },
            ]}
            onPress={onSignup}
          >
            <Text style={defaultStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

export default Signup;
