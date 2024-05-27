import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";
import styles from "./Home.styles";
import RoundButton from "../components/UI/RoundButton";
import { useHeaderHeight } from "@react-navigation/elements";
import Dropdown from "../components/UI/Dropdown";
import menuItems from "../../constants/MenuItems";
import { useBalanceStore } from "../../store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "../components/SortableList/WidgetList";

const Home = ({ route }) => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();

  const headerHeight = useHeaderHeight();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: transactions.length < 2 ? 0 : 16,
      }}
    >
      <View style={styles.circle}>
        <Ionicons
          name={item.amount > 0 ? "add" : "remove"}
          size={24}
          color={Colors.dark}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "400" }}>
          {item.amount > 0 ? "Money Credited" : "Money Debited"}
        </Text>
        <Text style={{ color: Colors.gray, fontSize: 12 }}>
          {item.date.toLocaleString()}
        </Text>
      </View>
      <Text style={{ marginRight: 2 }}>₹ {Math.abs(item.amount)}</Text>
    </View>
  );

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance() || 0}</Text>
          <Text style={styles.currency}>₹</Text>
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.lightGray, marginVertical: 20 },
          ]}
        >
          <Text style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}>
            Accounts
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <RoundButton icon={"add"} text={"Add money"} onPress={onAddMoney} />
        <RoundButton
          icon={"refresh"}
          text={"Exchange"}
          onPress={clearTransactions}
        />
        <RoundButton icon={"list"} text={"Details"} />
        <Dropdown
          icon="ellipsis-horizontal"
          text="More"
          menuItems={menuItems}
        />
      </View>
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        <FlatList
          data={transactions.slice().reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ padding: 14, color: Colors.gray }}>
              No transactions yet
            </Text>
          }
        />
      </View>
      <Text style={[defaultStyles.sectionHeader, { marginVertical: 24 }]}>
        Widgets
      </Text>
      <WidgetList />
    </ScrollView>
  );
};

export default Home;
