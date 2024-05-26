import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useBalanceStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },
      balance: () =>
        get().transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        ),
      clearTransactions: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: "balance-storage",
      storage: createJSONStorage(() => AsyncStorage), // specifying AsyncStorage as the storage solution instead of mmkv
      onRehydrateStorage: () => (state) => {
        //keep it optional
        if (state.error) {
          console.error("Unable to update item 'balance-storage'", state.error);
        }
      },
    }
  )
);
