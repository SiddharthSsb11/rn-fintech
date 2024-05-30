import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { SIZE } from "./Config";
import Colors from "../../../constants/Colors";
import { useBalanceStore } from "../../../store/balanceStore";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    width: SIZE - 20,
    height: 156,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    padding: 14,
    alignSelf: "center",
  },
});

const Tile = ({ id, onLongPress }) => {
  const { transactions } = useBalanceStore();
  const getTotalSpentThisMonth = (transactions) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear &&
          transaction.amount < 0
        );
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalCreditsThisMonth = (transactions) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear &&
          transaction.amount > 0
        );
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  if (id === "recent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ color: Colors.gray, fontWeight: "700", fontSize: 16 }}>
            Recent Transaction:
          </Text>

          {transactions.length === 0 && (
            <>
              <Text
                style={{
                  color: Colors.gray,
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingTop: 10,
                }}
              >
                No recent transactions found
              </Text>
            </>
          )}

          {transactions.length > 0 && (
            <>
              <Text
                style={{
                  color: Colors.dark,
                  fontWeight: "bold",
                  fontSize: 24,
                  paddingVertical: 10,
                }}
              >
                ₹ {Math.abs(transactions[transactions.length - 1].amount)}
              </Text>
              <Text
                style={{ color: Colors.gray, fontWeight: "bold", fontSize: 16 }}
              >
                {transactions[transactions.length - 1].amount > 0
                  ? "Money Credited"
                  : "Money Debited"}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  if (id === "cashback") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: Colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              5%
            </Text>
          </View>
          <Text
            style={{ color: Colors.gray, fontWeight: "bold", fontSize: 18 }}
          >
            Cashback
          </Text>
        </View>
      </View>
    );
  }

  if (id === "cards") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text style={{ color: Colors.gray, fontWeight: "500", fontSize: 16 }}>
          Cards
        </Text>
        <Ionicons
          name="card"
          size={50}
          color={Colors.primaryMuted}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }

  if (id === "spent") {
    const totalSpent = getTotalSpentThisMonth(transactions);
    const totalCredits = getTotalCreditsThisMonth(transactions);

    return (
      <View
        style={[styles.container, { justifyContent: "center" }]}
        pointerEvents="none"
      >
        <Text style={{ color: Colors.gray, fontWeight: "700", fontSize: 16 }}>
          Month's Debits
        </Text>
        <Text
          style={{
            color: Colors.dark,
            fontWeight: "bold",
            fontSize: 24,
            paddingTop: 2,
            marginBottom: 8,
          }}
        >
          ₹ {Math.abs(totalSpent)}
        </Text>
        <Text style={{ color: Colors.gray, fontWeight: "700", fontSize: 16 }}>
          Month's Credits
        </Text>
        <Text
          style={{
            color: Colors.dark,
            fontWeight: "bold",
            fontSize: 24,
            paddingTop: 2,
          }}
        >
          ₹ {totalCredits}
        </Text>
      </View>
    );
  }
};

export default Tile;
