import { useAuth, useUser } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";
import styles from "./Profile.styles";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [edit, setEdit] = useState(false);

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName || "",
        lastName: lastName || "",
      });
      setEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result?.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      // console.log(base64);

      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <React.Fragment>
      <BlurView
        intensity={70}
        tint={"dark"}
        style={{ flex: 1, paddingTop: 100, backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
            {user?.imageUrl && (
              <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            )}
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 6 }}>
            {!edit && (
              <View style={styles.editRow}>
                <Text style={{ fontSize: 24, color: "#fff" }}>
                  {firstName || lastName ? (
                    `${firstName} ${lastName}`
                  ) : (
                    <Text style={{ fontSize: 16, color: "#fff" }}>
                      Edit Your Personal Info
                    </Text>
                  )}
                </Text>
                <TouchableOpacity
                  onPress={() => setEdit(true)}
                  style={{ marginLeft: 8 }}
                >
                  <FontAwesome name="edit" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
            {edit && (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={[styles.inputField]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={[styles.inputField]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={"#fff"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
            <Ionicons name="log-out" size={24} color={"#fff"} />
            <Text style={{ color: "#fff", fontSize: 18 }}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="person" size={24} color={"#fff"} />
            <Text style={{ color: "#fff", fontSize: 18 }}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="bulb" size={24} color={"#fff"} />
            <Text style={{ color: "#fff", fontSize: 18 }}>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="megaphone" size={24} color={"#fff"} />
            <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>Inbox</Text>
            <View
              style={{
                backgroundColor: Colors.primary,
                paddingHorizontal: 10,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BlurView>
    </React.Fragment>
  );
};

export default Profile;
