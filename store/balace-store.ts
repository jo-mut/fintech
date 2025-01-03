import { create } from 'zustand'
import { zustandStorage } from "@/store/mmkv-storage"
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  initials: string;
  title: string;
  type: string;
}

export interface BalanceState {
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}


export const useBalanceStore = create<BalanceState>()(
  persist((set, get) => ({
    transactions: [],
    runTransaction: (transaction: Transaction) => {
      set((state) => ({
        transactions: [...state.transactions, transaction]
      }));
    },
    balance: () => get().transactions.reduce((acc, txn) => acc + txn.amount, 0),
    clearTransactions: () => {
      set({ transactions: [] });
    },
  }), {
    name: "balance",
    storage: createJSONStorage(() => zustandStorage)
  })
)