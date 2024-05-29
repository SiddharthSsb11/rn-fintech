import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import Currencies from "../../constants/Currencies";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "../../constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const Crypto = ({ navigation }) => {
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <Text
        style={[
          defaultStyles.sectionHeader,
          { marginBottom: 12, fontSize: 24 },
        ]}
      >
        Latest Crypto
      </Text>
      <View style={[defaultStyles.block, { paddingVertical: 20 }]}>
        {Currencies?.map((currency) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Graph", { currencyId: currency.id })
            }
            key={currency.id}
            style={{ flexDirection: "row", gap: 14, alignItems: "center" }}
          >
            <Image
              source={{ uri: currency.logo }}
              style={{ width: 48, height: 48 }}
            />
            <View style={{ flex: 1, gap: 6 }}>
              <Text
                style={{ fontWeight: "700", color: Colors.dark, fontSize: 16 }}
              >
                {currency.name}
              </Text>
              <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
            </View>
            <View style={{ gap: 6, alignItems: "flex-end" }}>
              <Text
                style={{ fontWeight: "700", color: Colors.dark, fontSize: 16 }}
              >
                {currency.quote.EUR.price.toFixed(2)} €
              </Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons
                  name={
                    currency.quote.EUR.percent_change_1h > 0
                      ? "caret-up"
                      : "caret-down"
                  }
                  size={16}
                  color={
                    currency.quote.EUR.percent_change_1h > 0 ? "green" : "red"
                  }
                />
                <Text
                  style={{
                    color:
                      currency.quote.EUR.percent_change_1h > 0
                        ? "green"
                        : "red",
                  }}
                >
                  {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Crypto;
