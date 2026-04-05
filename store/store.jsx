import React, { createContext, useReducer, useContext } from 'react';

const fallbackTransactions = [
  { id: 1, date: '2026-04-01', amount: 50, category: 'Food', type: 'Expense' },
  { id: 2, date: '2026-04-02', amount: 200, category: 'Salary', type: 'Income' },
  { id: 3, date: '2026-04-03', amount: 30, category: 'Transport', type: 'Expense' },
  { id: 4, date: '2026-04-04', amount: 100, category: 'Freelance', type: 'Income' },
];

// Load from localStorage or fallback to mock data
const getInitialTransactions = () => {
  const saved = localStorage.getItem('transactions');
  if (!saved) return fallbackTransactions;

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return fallbackTransactions;

    return parsed
      .filter((t) => t && typeof t === 'object')
      .map((t, index) => ({
        id: Number.isFinite(Number(t.id)) ? Number(t.id) : Date.now() + index,
        date: typeof t.date === 'string' ? t.date : '',
        amount: Number.isFinite(Number(t.amount)) ? Number(t.amount) : 0,
        category: typeof t.category === 'string' ? t.category : '',
        type: t.type === 'Expense' ? 'Expense' : 'Income',
      }));
  } catch {
    return fallbackTransactions;
  }
};

// Load currency from localStorage or default to USD
const getInitialCurrency = () => {
  const saved = localStorage.getItem('currency');
  return saved || 'USD';
};

const initialState = {
  transactions: getInitialTransactions(),
  currency: getInitialCurrency(),

  // Advanced filters
  filters: {
    type: 'all',
    category: 'all',
    search: '',
    sortBy: 'date',
  },

  // Role-based UI
  userRole: 'Viewer', // Viewer | Admin
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRANSACTIONS': {
      const updated = { ...state, transactions: action.payload };
      localStorage.setItem('transactions', JSON.stringify(updated.transactions));
      return updated;
    }

    case 'ADD_TRANSACTION': {
      const updatedTransactions = [
        ...state.transactions,
        { id: Date.now(), ...action.payload },
      ];
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      return { ...state, transactions: updatedTransactions };
    }

    case 'EDIT_TRANSACTION': {
      const updatedTransactions = state.transactions.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      );
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      return { ...state, transactions: updatedTransactions };
    }

    case 'DELETE_TRANSACTION': {
      const updatedTransactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      return { ...state, transactions: updatedTransactions };
    }

    case 'SET_EDIT_TRANSACTION': {
      return { ...state, editTransaction: action.payload };
    }

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'SET_ROLE':
      return { ...state, userRole: action.payload };

    case 'SET_CURRENCY':
      localStorage.setItem('currency', action.payload);
      return { ...state, currency: action.payload };

    default:
      return state;
  }
};

// Context
const StoreContext = createContext();

// Provider
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook
export const useStore = () => useContext(StoreContext);