import React from "react";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";
import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import styles from "./Onboarding.styles";

const Onboarding = ({ navigation }) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.dark} barStyle="dark-content" />

      <View style={styles.container}>
        <Image
          source={require("../../assets/videos/intros.gif")}
          style={styles.video}
        />

        <View style={{ marginTop: 16, padding: 20 }}>
          <Text style={styles.header}>Ready to change the way you money?</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: Colors.dark },
            ]}
            onPress={() => navigation.navigate("Signin")}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Sign in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: "#fff" },
            ]}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Onboarding;
