import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createAt: string;

}

type TransactionsInput = Omit<Transaction, 'id' | 'createAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextdata {
    transactions: Transaction[];
    createTransaction: (transactions: TransactionsInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextdata>({} as TransactionsContextdata);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const[transactions, setTransactions] = useState<Transaction[]> ([]);

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionsInput) {
       const response =  await api.post('/transactions', {
           ...transactionInput,
           createAt: new Date(),
        })

       const { transaction } = response.data;

       setTransactions([
           ...transactions,
           transaction,
       ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

     export function useTransactions() {
        const context = useContext(TransactionsContext);
      
         return context
}