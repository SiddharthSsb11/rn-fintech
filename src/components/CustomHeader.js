import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import styles from "./CustomHeader.styles";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView intensity={80} tint={"extraLight"} style={{ paddingTop: top }}>
      <View
        style={[
          styles.container,
          {
            height: 60,
            gap: 10,
            paddingHorizontal: 20,
            backgroundColor: "transparent",
          },
        ]}
      >
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.gray,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16 }}>
            SG
          </Text>
        </TouchableOpacity>

        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View style={styles.circle}>
          <Ionicons name={"stats-chart"} size={20} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name={"card"} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export default CustomHeader;
