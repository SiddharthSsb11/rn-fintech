import { View, Text, StatusBar, FlatList, SafeAreaView } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";
import { useBalanceStore } from "../../store/balanceStore";
import styles from "./Transactions.styles";
import { Ionicons } from "@expo/vector-icons";

const Transactions = () => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();

  const getTotalTransactions = (transactions) => {
    return transactions?.length;
  };

  const getTotalCredits = (transactions) => {
    return transactions?.filter((transaction) => transaction.amount > 0).length;
  };

  const getTotalDebits = (transactions) => {
    return transactions?.filter((transaction) => transaction.amount < 0).length;
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
    <React.Fragment>
      <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <Text style={defaultStyles.sectionHeader}>Summary </Text>
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <View style={styles.summary}>
            <Text style={{ color: Colors.gray, fontSize: 16, fontWeight: 600 }}>
              Balance:{" "}
              <Text
                style={{
                  color: Colors.gray,
                }}
              >
                ₹ {balance()}
              </Text>
            </Text>
          </View>
          <View style={styles.summary}>
            <Text style={{ color: Colors.gray, fontSize: 16, fontWeight: 600 }}>
              Transactions:{" "}
              <Text
                style={{
                  color: Colors.gray,
                }}
              >
                {getTotalTransactions(transactions)}
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.summary}>
            <Text style={{ color: Colors.gray, fontSize: 16, fontWeight: 600 }}>
              Credits:{" "}
              <Text
                style={{
                  color: Colors.gray,
                }}
              >
                {getTotalCredits(transactions)}
              </Text>
            </Text>
          </View>
          <View style={styles.summary}>
            <Text style={{ color: Colors.gray, fontSize: 16, fontWeight: 600 }}>
              Debits:{" "}
              <Text
                style={{
                  color: Colors.gray,
                }}
              >
                {getTotalDebits(transactions)}
              </Text>
            </Text>
          </View>
        </View>
        <Text style={defaultStyles.sectionHeader}>All Transactions </Text>
        <View style={styles.transactions}>
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={{ padding: 2, color: Colors.gray }}>
                No transactions yet
              </Text>
            }
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Transactions;
