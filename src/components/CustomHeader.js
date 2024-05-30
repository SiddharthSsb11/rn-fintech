import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import styles from "./CustomHeader.styles";
import { FontAwesome } from "@expo/vector-icons/build/Icons";
import { useNavigation } from "@react-navigation/native";
import Currencies from "../../constants/Currencies";

const CustomHeader = () => {
  const navigation = useNavigation();
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
            backgroundColor: Colors.lightGray,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <FontAwesome name="user" size={24} color={Colors.dark} />
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
        <TouchableOpacity
          style={styles.circle}
          onPress={() =>
            navigation.navigate("Graph", { currencyId: Currencies[0].id })
          }
        >
          <Ionicons name={"stats-chart"} size={20} color={Colors.dark} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => navigation.navigate("Transactions")}
        >
          <Ionicons name={"card"} size={20} color={Colors.dark} />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default CustomHeader;
