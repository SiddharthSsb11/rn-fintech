import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  account: {
    marginTop: 20,
    marginBottom: 2,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    // paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    maxHeight: 236,
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionHeader: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonSmall: {
    paddingHorizontal: 12,
    height: 24,
    paddingVertical: 2,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginRight: 16,
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    marginRight: 4,
  },
});

export default styles;
