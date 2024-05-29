import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import Currencies from "../../constants/Currencies";
import Tickers from "../../constants/Tickers";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import { Circle, useFont } from "@shopify/react-native-skia";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import * as Haptics from "expo-haptics";
import { format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Graph.styles";

const categories = ["Overview", "News", "Orders", "Transactions"];

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }) {
  return <Circle cx={x.value} cy={y.value} r={8} fill={Colors.primary} />;
}

const Graph = ({ route, navigation }) => {
  const { currencyId } = route.params;
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
  const [currency, setCurrency] = useState({});
  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), 12);

  useLayoutEffect(() => {
    const currencyName = Currencies.find(
      (currency) => currency.id === currencyId
    ).name;

    navigation.setOptions({
      title: currencyName,
    });
  }, [currencyId, navigation]);

  useEffect(() => {
    const selectedCurrency = Currencies.find(
      (currency) => currency.id === currencyId
    );
    setCurrency(selectedCurrency);
  }, [currencyId]);

  useEffect(() => {
    console.log("---isActive---", isActive);
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} €`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: "",
    };
  });

  return (
    <React.Fragment>
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        // scrollEnabled={true}
        keyExtractor={(i) => i.title}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveIndex(index)}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
                marginVertical: 12,
              }}
            >
              <Text style={styles.subtitle}>{currency?.symbol}</Text>
              <Image
                source={{ uri: currency?.logo }}
                style={{ width: 60, height: 60 }}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 10, margin: 16 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="add" size={24} color={"#fff"} />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View style={[defaultStyles.block, { height: 500, marginTop: 8 }]}>
              {Tickers && (
                <>
                  {!isActive && (
                    <View>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: Colors.dark,
                        }}
                      >
                        {Tickers[Tickers.length - 1].price.toFixed(2)} €
                      </Text>
                      <Text style={{ fontSize: 18, color: Colors.gray }}>
                        Today
                      </Text>
                    </View>
                  )}
                  {isActive && (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: Colors.dark,
                        }}
                        animatedProps={animatedText}
                      ></AnimatedTextInput>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={{ fontSize: 18, color: Colors.gray }}
                        animatedProps={animatedDateText}
                      ></AnimatedTextInput>
                    </View>
                  )}
                  <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 6,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: Colors.gray,
                      formatYLabel: (v) => `${v} €`,
                      formatXLabel: (ms) => format(new Date(ms), "MM/yy"),
                    }}
                    data={Tickers}
                    xKey="timestamp"
                    yKeys={["price"]}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price}
                          color={Colors.primary}
                          strokeWidth={3}
                        />
                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </>
              )}
            </View>
            <View style={[defaultStyles.block, { marginTop: 16 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray, marginBottom: 44 }}>
                This crypto currency is a decentralized digital currency,
                without a central bank or single administrator, that can be sent
                from user to user on the peer-to-peer crypto network without the
                need for intermediaries.
              </Text>
            </View>
          </>
        )}
      ></SectionList>
    </React.Fragment>
  );
};

export default Graph;
